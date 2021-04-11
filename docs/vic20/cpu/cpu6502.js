function Cpu6502(memory, resetSource, irqSource, nmiSource) {
    var N = 1 << 7
      , V = 1 << 6
      , R = 1 << 5
      , B = 1 << 4
      , D = 1 << 3
      , I = 1 << 2
      , Z = 1 << 1
      , C = 1;
    var _N = ~N
      , _C = ~C
      , _I = ~I;
    var NZ = N | Z
      , NC = N | C
      , NV = N | V
      , NCZ = NZ | C
      , NCZV = NCZ | V
      , NVZ = N | V | Z;
    var _NZ = ~NZ
      , _NC = ~NC
      , _NV = ~NV
      , _NCZ = ~NCZ
      , _NCZV = ~NCZV
      , _NVZ = ~NVZ;
    var pc, sp, a, x, y, p, np;
    this.getRegisters = function() {
        return {
            "pc": pc,
            "sp": sp,
            "a": a,
            "x": x,
            "y": y,
            "p": p
        };
    }
    this.setA = function(_a) {
        a = parseInt(_a, 16);
    }
    this.setX = function(_x) {
        x = parseInt(_x, 16);
    }
    this.setY = function(_y) {
        y = parseInt(_y, 16);
    }
    this.toggle = function(value) {
        p ^= value;
        debug();
    }
    function genTogglePBit(bit) {
        return "<a href='javascript:vic20.cpu.toggle(" + bit + ");'>";
    }
    this.debugInformation = function() {
        var regs = vic20.cpu.getRegisters();
        var html = "<div id='cpuregs'>";
        html += "<b>CPU Registers</b><br/>";
        html += "<table id='debug'><tr><th>PC</th><th>A</th><th>X</th><th>Y</th><th>P</th></tr>";
        html += "<tr><td>" + regs.pc.toString(16).toUpperCase() + "</td>";
        html += "<td><input type='text' style='width:20px;text-align:right' value='" + regs.a.toString(16).toUpperCase() + "' onchange='vic20.cpu.setA(this.value)'/></td>";
        html += "<td><input type='text' style='width:20px;text-align:right' value='" + regs.x.toString(16).toUpperCase() + "' onchange='vic20.cpu.setX(this.value)'/></td>";
        html += "<td><input type='text' style='width:20px;text-align:right' value='" + regs.y.toString(16).toUpperCase() + "' onchange='vic20.cpu.setY(this.value)'/></td>";
        html += "<td>";
        html += genTogglePBit(N) + ((regs.p & (1 << 7)) ? "N" : "n") + "</a> ";
        html += genTogglePBit(V) + ((regs.p & (1 << 6)) ? "V" : "v") + "</a> ";
        html += genTogglePBit(B) + ((regs.p & (1 << 4)) ? "B" : "b") + "</a> ";
        html += genTogglePBit(D) + ((regs.p & (1 << 3)) ? "D" : "d") + "</a> ";
        html += genTogglePBit(I) + ((regs.p & (1 << 2)) ? "I" : "i") + "</a> ";
        html += genTogglePBit(Z) + ((regs.p & (1 << 1)) ? "Z" : "z") + "</a> ";
        html += genTogglePBit(C) + ((regs.p & (1 << 0)) ? "C" : "c") + "</a> ";
        html += "</td></tr>";
        html += "</table>";
        html += "</div>";
        return html;
    }
    var currentInst;
    var currentInstOffset;
    var instruction;
    var b, offset;
    var prevNmi = 0;
    var irqBits = 0;
    var nmiBits = 0;
    function push(value) {
        memory.write(0x100 + sp, value);
        sp = (sp - 1) & 0xFF;
    }
    function pop() {
        sp = (sp + 1) & 0xFF;
        return memory.read(0x100 + sp);
    }
    function nz(value) {
        p = value ? ((p & _NZ) | (value & N)) : ((p & _N) | Z);
    }
    function nzc(reg, value) {
        p &= ~(Z | C | N);
        reg -= value;
        p = ((reg == 0) ? ((p & ~N) | Z) : (p & ~(N | Z) | (reg & N)));
        if (reg >= 0) {
            p |= C;
        }
    }
    this.getPc = function() {
        return pc;
    }
    var colour = 1;
    this.incColour = function() {
        colour <<= 1;
    }
    function nextInst() {
        if ((nmiBits & 4) ^ prevNmi) {
            prevNmi = (nmiBits & 4);
            if (prevNmi) {
                currentInst = INST_NMI;
                currentInstOffset = 0;
            }
        }
        if (currentInstOffset != 0) {
            if (irqBits & 2) {
                currentInst = INST_IRQ;
            } else {
                instruction = memory.read(pc);
                currentInst = instfunc[instruction];
                memExec[pc] = 2 | (p & I);
                pc = (pc + 1) & 0xFFFF;
            }
            currentInstOffset = 0;
        }
        if (np != null) {
            p = np;
            np = null;
        }
    }
    function badInst() {
        alert("Bad instruction pc=$" + pc.toString(16) + " instruction = $" + instruction.toString(16));
        resetSource.reset();
    }
    function jamInst() {
        alert("Jam instruction pc=$" + pc.toString(16) + " instruction = $" + instruction.toString(16));
        resetSource.reset();
    }
    function halt() {
        exit();
    }
    function nullOp() {}
    ;function pcNull() {
        pc = (pc + 1) & 0xFFFF;
    }
    ;function pushA() {
        push(a);
    }
    ;function pushP() {
        push(p);
    }
    ;function pushPcH() {
        push(pc >> 8);
    }
    ;function pushPcL() {
        push(pc & 0xFF);
    }
    ;function pushPorBsetI() {
        push(p | B);
        p |= I;
    }
    ;function pushPsetI() {
        push(p);
        p |= I;
    }
    ;function plp() {
        p = (pop() & ~B) | R;
    }
    ;function pla() {
        nz(a = pop());
    }
    ;function popPcL() {
        pc = pop();
    }
    ;function popPcH() {
        pc |= (pop() << 8);
    }
    ;function popPcHaddOne() {
        pc = ((pop() << 8) | pc) + 1;
        pc &= 0xFFFF;
    }
    ;function loadPCResetL() {
        pc = memory.read(0xFFFC);
    }
    ;function loadPCResetH() {
        pc |= memory.read(0xFFFD) << 8;
    }
    ;function loadPCInterruptL() {
        pc = memory.read(0xFFFE);
    }
    ;function loadPCInterruptH() {
        pc |= memory.read(0xFFFF) << 8;
    }
    ;function loadPCNmiL() {
        pc = memory.read(0xFFFA);
    }
    ;function loadPCNmiH() {
        pc |= memory.read(0xFFFB) << 8;
    }
    ;function zp_x_from_pc() {
        offset = (memory.read(pc) + x) & 0xFF;
        pc = (pc + 1) & 0xFFFF;
    }
    ;function load_offset_zp_l() {
        b = memory.read(offset++);
    }
    ;function load_offset_zp_h() {
        offset = b | (memory.read(offset & 0xFF) << 8);
    }
    ;function load_offset_zp_h_plus_y() {
        offset = ((b | (memory.read(offset & 0xFF) << 8)) + y) & 0xFFFF;
        if ((offset & 0xFF) >= y) {
            currentInstOffset++;
        }
    }
    ;function op_offset() {
        b = memory.read(offset);
        op[instruction]();
    }
    ;function op_offset_rmw() {
        b = memory.read(offset);
    }
    ;function op_offset_w() {
        op[instruction]();
        memory.write(offset, b);
    }
    ;function zp_from_pc() {
        offset = memory.read(pc);
        pc = (pc + 1) & 0xFFFF;
    }
    ;function pc_from_zp_and_pc() {
        pc = (memory.read(pc) << 8) | offset;
    }
    ;function offset_plus_y() {
        offset = (offset + y) & 0xFFFF;
        if ((offset & 0xFF) >= y) {
            currentInst[currentInstOffset++]();
        }
    }
    ;function offset_plus_x() {
        offset = (offset + x) & 0xFFFF;
        if ((offset & 0xFF) >= x) {
            currentInst[currentInstOffset++]();
        }
    }
    ;function offset_plus_x_w() {
        offset = (offset + x) & 0xFFFF;
    }
    ;function offset_plus_y_w() {
        offset = (offset + y) & 0xFFFF;
    }
    function b_offset_cond_from_pc() {
        var diff = memory.read(pc);
        if (diff > 127)
            diff = diff - 256;
        var pp = ((instruction & 0x20) != 0) ? (p ^ 0xFF) : p;
        var mask = ((Z << 24) | (C << 16) | (V << 8) | N) >>> ((instruction >> 6) << 3);
        if ((pp & mask) != 0) {
            pc++;
            irqBits = 0;
            currentInstOffset += 2;
        } else {
            offset = (pc + (diff) + 1);
        }
    }
    function bra_diff_page() {
        if (((offset ^ pc) >> 8) == 0) {
            currentInstOffset++;
        }
        pc = offset;
    }
    ;function logic_imm() {
        b = memory.read(pc);
        pc = (pc + 1) & 0xFFFF;
        op[instruction]();
    }
    ;function logic_imm_sbx() {
        x = (x & a) - memory.read(pc);
        if (x < 0)
            p &= ~C;
        else
            p |= C;
        nz(x &= 0xFF);
        pc = (pc + 1) & 0xFFFF;
    }
    ;function logic_zp() {
        b = memory.read(offset);
        op[instruction]();
    }
    ;function nullread_offset() {
        memory.read(offset);
    }
    ;function logic_zp_w() {
        op[instruction]();
        memory.write(offset, b);
    }
    ;function zp_y_from_pc() {
        offset = (memory.read(pc) + y) & 0xFF;
        pc = (pc + 1) & 0xFFFF;
    }
    ;function temp_to_zp() {
        memory.write(offset, b);
    }
    ;function clc() {
        p &= _C;
    }
    ;function sec() {
        p |= C;
    }
    ;function cli() {
        np = p & _I;
    }
    ;function sei() {
        np = p | I;
    }
    ;function clv() {
        p &= ~V;
    }
    ;function cld() {
        p &= ~D;
    }
    ;function sed() {
        p |= D;
    }
    ;function dey() {
        nz(y = (y - 1) & 0xFF);
    }
    ;function dex() {
        nz(x = (x - 1) & 0xFF);
    }
    ;function iny() {
        nz(y = (y + 1) & 0xFF);
    }
    ;function inx() {
        nz(x = (x + 1) & 0xFF);
    }
    ;function tya() {
        nz(a = y);
    }
    ;function tay() {
        nz(y = a);
    }
    ;function txa() {
        nz(a = x);
    }
    ;function tax() {
        nz(x = a);
    }
    ;function txs() {
        sp = x;
    }
    ;function tsx() {
        nz(x = sp);
    }
    ;function load_offset_abs_l() {
        offset = memory.read(pc);
        pc = (pc + 1) & 0xFFFF;
    }
    ;function load_offset_abs_h() {
        offset |= (memory.read(pc) << 8);
        pc = (pc + 1) & 0xFFFF;
    }
    ;function op_offset_plus_x() {
        offset = (offset + x) & 0xFFFF;
        if ((offset & 0xFF) >= x) {
            b = memory.read(offset);
            op[instruction]();
            currentInstOffset++;
        }
    }
    function op_offset_plus_y() {
        offset = (offset + y) & 0xFFFF;
        if ((offset & 0xFF) >= y) {
            b = memory.read(offset);
            op[instruction]();
            currentInstOffset++;
        }
    }
    function load_offset_abs_h_plus_y() {
        offset = (offset | (memory.read(pc) << 8)) + y;
        pc = (pc + 1) & 0xFFFF;
        if ((offset & 0xFF) >= y) {
            currentInstOffset++;
        }
    }
    function opa() {
        b = a;
        op[instruction]();
        a = b;
    }
    ;function load_pc_abs_l() {
        b = memory.read(pc);
        pc = (pc + 1) & 0xFFFF;
    }
    ;function load_pc_abs_h() {
        pc = (memory.read(pc) << 8) | b;
    }
    ;function load_pc_offset_l() {
        pc = memory.read(offset++);
        if ((offset & 0xFF) == 0) {
            offset -= 0x100;
        }
        offset &= 0xFFFF;
    }
    ;function load_pc_offset_h() {
        pc |= (memory.read(offset++) << 8);
    }
    function temp_to_offset() {
        memory.write(offset, b);
    }
    function nullProc() {}
    function ora() {
        nz(a |= b);
    }
    function sre() {
        if (b & C) {
            p |= C;
        } else {
            p &= ~C;
        }
        b >>= 1;
        nz(a ^= b);
    }
    function rra() {
        ror();
        adc();
    }
    function rla() {
        var oldCarry = p & C;
        p &= ~C;
        p |= (b >> 7);
        b = (b << 1) | oldCarry;
        b &= 0xFF;
        nz(a &= b);
    }
    function slo() {
        if ((b & N) != 0) {
            p |= C;
        } else {
            p &= ~C;
        }
        b = (b << 1) & 0xFF;
        nz(a |= b);
    }
    function and() {
        nz(a &= b);
    }
    function eor() {
        nz(a ^= b);
    }
    function adc() {
        if ((p & D) != 0) {
            var sum = (a & 0xF) + (b & 0xF) + (p & C);
            p &= ~(N | Z | C | V);
            if (sum > 0x09) {
                sum += 0x06;
            }
            if (sum > 0x1F) {
                sum -= 0x10;
            }
            sum += (a & 0xF0) + (b & 0xF0);
            p |= (sum & N);
            p |= ((~(a ^ b) & (a ^ sum)) & N) >> 1;
            a = (sum & 0xFF);
            if (a == 0) {
                p |= Z;
            }
            if (sum >= 0xA0) {
                a += 0x60;
                a &= 0xFF;
                p |= C;
            }
        } else {
            var sum2 = a + b + (p & C);
            p &= ~(N | Z | C | V);
            p |= ((~(a ^ b) & (a ^ sum2)) & N) >> 1;
            p |= ((sum2 >> 8) & C);
            a = (sum2 & 0xFF);
            if (a == 0) {
                p |= Z;
            }
            p |= (a & N);
        }
    }
    function sbc() {
        if ((p & D) != 0) {
            var sumadd = 0
              , sum = (a & 0xF) - (b & 0xF) - (~p & C);
            p &= ~(N | Z | C | V);
            if (sum < -10) {
                sumadd = 10;
            } else if (sum < 0) {
                sumadd = -6;
            }
            sum += (a & 0xF0) - (b & 0xF0);
            if ((sum & 0xFF) == 0) {
                p |= Z;
            }
            p |= (sum & N);
            p |= (((a ^ b) & (a ^ sum)) & N) >> 1;
            sum += sumadd;
            if (sum < 0) {
                sum += 0xA0;
            } else {
                if (sum >= 0xA0) {
                    sum -= 0x60;
                }
                p |= C;
            }
            a = (sum & 0xFF);
        } else {
            var sum2 = a - b - (~p & C);
            p &= ~(N | Z | C | V);
            p |= (((a ^ b) & (a ^ sum2)) & N) >> 1;
            a = (sum2 & 0xFF);
            p |= ((~sum2 >> 8) & C);
            p |= (a & N);
            if (a == 0) {
                p |= Z;
            }
        }
    }
    function cmp() {
        nzc(a, b);
    }
    function cpx() {
        nzc(x, b);
    }
    ;function cpy() {
        nzc(y, b);
    }
    function bit() {
        p &= _NVZ;
        if ((a & b) == 0)
            p |= Z;
        p |= (b & NV);
    }
    function lda() {
        nz(a = b);
    }
    function ldx() {
        nz(x = b);
    }
    function ldy() {
        nz(y = b);
    }
    function sta() {
        b = a;
    }
    function sax() {
        b = a & x;
    }
    function stx() {
        b = x;
    }
    function sty() {
        b = y;
    }
    function asl() {
        p &= ~C;
        p |= (b >> 7);
        nz(b = (b << 1) & 0xFF);
    }
    function rol() {
        var oldCarry = p & C;
        p &= ~C;
        p |= (b >> 7);
        nz(b = ((b << 1) | oldCarry) & 0xFF);
    }
    function lsr() {
        p &= ~(C | NZ);
        p |= (b & C);
        if ((b >>= 1) == 0) {
            p |= Z;
        }
    }
    function ror() {
        var newN = (p & C) << 7;
        p &= ~(C | NZ);
        p |= (b & C) | newN;
        b = ((b >> 1) | newN);
        if (b == 0) {
            p |= Z;
        }
    }
    function anc() {
        nz(a &= b);
        p &= ~C;
        p |= (a >> 7);
    }
    function ane() {
        a = (a | 0xEE) & x;
        nz(a &= b);
    }
    function lxa() {
        a = x = ((a | 0xEE) & b);
        nz(a);
    }
    function arr() {
        and();
        ror();
        p &= ~(C | V);
        p |= (b >> 5) & C;
        p |= ((b << 2) | (b << 1)) & V;
    }
    function asr() {
        and();
        lsr();
    }
    function dec() {
        nz(b = (b - 1) & 0xFF);
    }
    function inc() {
        nz(b = (b + 1) & 0xFF);
    }
    function dcp() {
        dec();
        cmp();
    }
    function isb() {
        inc();
        sbc();
    }
    function lae() {
        a &= b;
        nz(x = a);
        sp = x;
    }
    function lax() {
        a = b;
        nz(x = a);
    }
    var INST_RESET = [nullOp, nullOp, loadPCResetL, loadPCResetH, nextInst];
    var INST_IRQ = [nullOp, nullOp, pushPcH, pushPcL, pushPsetI, loadPCInterruptL, loadPCInterruptH, nextInst];
    var INST_NMI = [nullOp, nullOp, pushPcH, pushPcL, pushPsetI, loadPCNmiL, loadPCNmiH, nextInst];
    var INST_BAD = [badInst, halt];
    var INST_JAM = [jamInst, halt];
    var BRK = [pcNull, pushPcH, pushPcL, pushPorBsetI, loadPCInterruptL, loadPCInterruptH, nextInst];
    var INST_X_IND = [zp_x_from_pc, nullOp, load_offset_zp_l, load_offset_zp_h, op_offset, nextInst];
    var INST_X_IND_RMW = [zp_x_from_pc, nullOp, load_offset_zp_l, load_offset_zp_h, op_offset_rmw, nullOp, op_offset_w, nextInst];
    var INST_X_IND_W = [zp_x_from_pc, nullOp, load_offset_zp_l, load_offset_zp_h, op_offset_w, nextInst];
    var INST_X_IND_I = [zp_x_from_pc, nullOp, load_offset_zp_l, load_offset_zp_h, op_offset, nullOp, op_offset_w, nextInst];
    var INST_Y_IND_I = [zp_y_from_pc, nullOp, load_offset_zp_l, load_offset_zp_h, op_offset, nullOp, op_offset_w, nextInst];
    var INST_IND_Y = [zp_from_pc, load_offset_zp_l, load_offset_zp_h_plus_y, nullOp, op_offset, nextInst];
    var INST_IND_Y_RMW = [zp_from_pc, load_offset_zp_l, load_offset_zp_h_plus_y, nullOp, op_offset_rmw, nullOp, op_offset_w, nextInst];
    var INST_IND_Y_W = [zp_from_pc, load_offset_zp_l, load_offset_zp_h, offset_plus_y_w, op_offset_w, nextInst];
    var INST_BCOND = [b_offset_cond_from_pc, bra_diff_page, nullOp, nextInst];
    var INST_JSR = [zp_from_pc, nullOp, pushPcH, pushPcL, pc_from_zp_and_pc, nextInst];
    var INST_RTI = [nullOp, nullOp, plp, popPcL, popPcH, nextInst];
    var INST_RTS = [nullOp, nullOp, popPcL, popPcHaddOne, nullOp, nextInst];
    var INST_LOGIC_IMM = [logic_imm, nextInst];
    var INST_LOGIC_IMM_SBX = [logic_imm_sbx, nextInst];
    var INST_ZPG = [zp_from_pc, logic_zp, nextInst];
    var INST_ZPG_W = [zp_from_pc, logic_zp_w, nextInst];
    var INST_ZPG_X = [zp_x_from_pc, logic_zp, nullOp, nextInst];
    var INST_ZPG_Y = [zp_y_from_pc, logic_zp, nextInst];
    var INST_ZPG_X_W = [zp_x_from_pc, nullOp, logic_zp_w, nextInst];
    var INST_ZPG_Y_W = [zp_y_from_pc, nullOp, logic_zp_w, nextInst];
    var INST_ZPGs = [zp_from_pc, logic_zp, nullOp, temp_to_zp, nextInst];
    var INST_ZPGs_X = [zp_x_from_pc, nullOp, logic_zp, nullOp, temp_to_zp, nextInst];
    var INST_PUSH_P = [nullOp, pushP, nextInst];
    var INST_PHA = [nullOp, pushA, nextInst];
    var INST_PLP = [nullOp, nullOp, plp, nextInst];
    var INST_PLA = [nullOp, nullOp, pla, nextInst];
    var INST_FLAG_CLC = [clc, nextInst];
    var INST_FLAG_SEC = [sec, nextInst];
    var INST_FLAG_CLI = [cli, nextInst];
    var INST_FLAG_SEI = [sei, nextInst];
    var INST_FLAG_CLV = [clv, nextInst];
    var INST_FLAG_CLD = [cld, nextInst];
    var INST_FLAG_SED = [sed, nextInst];
    var INST_DEY = [dey, nextInst];
    var INST_DEX = [dex, nextInst];
    var INST_INY = [iny, nextInst];
    var INST_INX = [inx, nextInst];
    var INST_TYA = [tya, nextInst];
    var INST_TAY = [tay, nextInst];
    var INST_TXA = [txa, nextInst];
    var INST_TAX = [tax, nextInst];
    var INST_TXS = [txs, nextInst];
    var INST_TSX = [tsx, nextInst];
    var INST_LOGIC_ABS_Y = [load_offset_abs_l, load_offset_abs_h_plus_y, nullOp, op_offset, nextInst];
    var INST_LOGIC_ABS_Y_RMW = [load_offset_abs_l, load_offset_abs_h, offset_plus_y, op_offset_rmw, nullOp, op_offset_w, nextInst];
    var INST_LOGIC_ABS_Y_W = [load_offset_abs_l, load_offset_abs_h, offset_plus_y_w, op_offset_w, nextInst];
    var INST_OP_A = [opa, nextInst];
    var INST_NOP = [nullOp, nextInst];
    var INST_ABS = [load_offset_abs_l, load_offset_abs_h, op_offset, nextInst];
    var INST_ABS_W = [load_offset_abs_l, load_offset_abs_h, op_offset_w, nextInst];
    var INST_JMP = [load_pc_abs_l, load_pc_abs_h, nextInst];
    var INST_JMP_IND = [load_offset_abs_l, load_offset_abs_h, load_pc_offset_l, load_pc_offset_h, nextInst];
    var INST_ABS_X = [load_offset_abs_l, load_offset_abs_h, op_offset_plus_x, op_offset, nextInst];
    var INST_ABS_Y = [load_offset_abs_l, load_offset_abs_h, op_offset_plus_y, op_offset, nextInst];
    var INST_ABS_X_W = [load_offset_abs_l, load_offset_abs_h, offset_plus_x_w, op_offset_w, nextInst];
    var INST_ABSs = [load_offset_abs_l, load_offset_abs_h, op_offset, nullOp, temp_to_offset, nextInst];
    var INST_ABS_Xs = [load_offset_abs_l, load_offset_abs_h, offset_plus_x_w, op_offset, nullOp, temp_to_offset, nextInst];
    var INST_ABS_Ys = [load_offset_abs_l, load_offset_abs_h, offset_plus_y_w, op_offset, nullOp, temp_to_offset, nextInst];
    var instfunc = [BRK, INST_X_IND, INST_JAM, INST_X_IND_RMW, INST_ZPG, INST_ZPG, INST_ZPGs, INST_ZPGs, INST_PUSH_P, INST_LOGIC_IMM, INST_OP_A, INST_LOGIC_IMM, INST_ABS, INST_ABS, INST_ABSs, INST_ABSs, INST_BCOND, INST_IND_Y, INST_JAM, INST_IND_Y_RMW, INST_ZPG_X, INST_ZPG_X, INST_ZPGs_X, INST_ZPGs_X, INST_FLAG_CLC, INST_LOGIC_ABS_Y, INST_NOP, INST_LOGIC_ABS_Y_RMW, INST_ABS_X, INST_ABS_X, INST_ABS_Xs, INST_ABS_Xs, INST_JSR, INST_X_IND, INST_JAM, INST_X_IND_RMW, INST_ZPG, INST_ZPG, INST_ZPGs, INST_ZPGs, INST_PLP, INST_LOGIC_IMM, INST_OP_A, INST_LOGIC_IMM, INST_ABS, INST_ABS, INST_ABSs, INST_ABSs, INST_BCOND, INST_IND_Y, INST_JAM, INST_IND_Y_RMW, INST_ZPG_X, INST_ZPG_X, INST_ZPGs_X, INST_ZPGs_X, INST_FLAG_SEC, INST_LOGIC_ABS_Y, INST_NOP, INST_LOGIC_ABS_Y_RMW, INST_ABS_X, INST_ABS_X, INST_ABS_Xs, INST_ABS_Xs, INST_RTI, INST_X_IND, INST_JAM, INST_X_IND_RMW, INST_ZPG, INST_ZPG, INST_ZPGs, INST_ZPGs, INST_PHA, INST_LOGIC_IMM, INST_OP_A, INST_LOGIC_IMM, INST_JMP, INST_ABS, INST_ABSs, INST_ABSs, INST_BCOND, INST_IND_Y, INST_JAM, INST_IND_Y_RMW, INST_ZPG_X, INST_ZPG_X, INST_ZPGs_X, INST_ZPGs_X, INST_FLAG_CLI, INST_LOGIC_ABS_Y, INST_NOP, INST_LOGIC_ABS_Y_RMW, INST_ABS_X, INST_ABS_X, INST_ABS_Xs, INST_ABS_Xs, INST_RTS, INST_X_IND, INST_JAM, INST_X_IND_RMW, INST_ZPG, INST_ZPG, INST_ZPGs, INST_ZPGs, INST_PLA, INST_LOGIC_IMM, INST_OP_A, INST_LOGIC_IMM, INST_JMP_IND, INST_ABS, INST_ABSs, INST_ABSs, INST_BCOND, INST_IND_Y, INST_JAM, INST_IND_Y_RMW, INST_ZPG_X, INST_ZPG_X, INST_ZPGs_X, INST_ZPGs_X, INST_FLAG_SEI, INST_LOGIC_ABS_Y, INST_NOP, INST_LOGIC_ABS_Y_RMW, INST_ABS_X, INST_ABS_X, INST_ABS_Xs, INST_ABS_Xs, INST_LOGIC_IMM, INST_X_IND_W, INST_LOGIC_IMM, INST_X_IND_W, INST_ZPG_W, INST_ZPG_W, INST_ZPG_W, INST_ZPG_W, INST_DEY, INST_LOGIC_IMM, INST_TXA, INST_LOGIC_IMM, INST_ABS_W, INST_ABS_W, INST_ABS_W, INST_ABS_W, INST_BCOND, INST_IND_Y_W, INST_JAM, INST_BAD, INST_ZPG_X_W, INST_ZPG_X_W, INST_ZPG_Y_W, INST_ZPG_Y_W, INST_TYA, INST_LOGIC_ABS_Y_W, INST_TXS, INST_BAD, INST_BAD, INST_ABS_X_W, INST_BAD, INST_BAD, INST_LOGIC_IMM, INST_X_IND, INST_LOGIC_IMM, INST_X_IND, INST_ZPG, INST_ZPG, INST_ZPG, INST_ZPG, INST_TAY, INST_LOGIC_IMM, INST_TAX, INST_LOGIC_IMM, INST_ABS, INST_ABS, INST_ABS, INST_ABS, INST_BCOND, INST_IND_Y, INST_JAM, INST_IND_Y, INST_ZPG_X, INST_ZPG_X, INST_ZPG_Y, INST_ZPG_Y, INST_FLAG_CLV, INST_LOGIC_ABS_Y, INST_TSX, INST_LOGIC_ABS_Y, INST_ABS_X, INST_ABS_X, INST_ABS_Y, INST_ABS_Y, INST_LOGIC_IMM, INST_X_IND, INST_LOGIC_IMM, INST_X_IND_I, INST_ZPG, INST_ZPG, INST_ZPGs, INST_ZPGs, INST_INY, INST_LOGIC_IMM, INST_DEX, INST_LOGIC_IMM_SBX, INST_ABS, INST_ABS, INST_ABSs, INST_ABSs, INST_BCOND, INST_IND_Y, INST_JAM, INST_Y_IND_I, INST_ZPG_X, INST_ZPG_X, INST_ZPGs_X, INST_ZPGs_X, INST_FLAG_CLD, INST_LOGIC_ABS_Y, INST_NOP, INST_ABS_Ys, INST_ABS_X, INST_ABS_X, INST_ABS_Xs, INST_ABS_Xs, INST_LOGIC_IMM, INST_X_IND, INST_LOGIC_IMM, INST_X_IND_I, INST_ZPG, INST_ZPG, INST_ZPGs, INST_ZPGs, INST_INX, INST_LOGIC_IMM, INST_NOP, INST_LOGIC_IMM, INST_ABS, INST_ABS, INST_ABSs, INST_ABSs, INST_BCOND, INST_IND_Y, INST_JAM, INST_Y_IND_I, INST_ZPG_X, INST_ZPG_X, INST_ZPGs_X, INST_ZPGs_X, INST_FLAG_SED, INST_LOGIC_ABS_Y, INST_NOP, INST_ABS_Ys, INST_ABS_X, INST_ABS_X, INST_ABS_Xs, INST_ABS_Xs];
    var op = [null, ora, null, slo, nullProc, ora, asl, slo, null, ora, asl, anc, nullProc, ora, asl, slo, null, ora, null, slo, nullProc, ora, asl, slo, null, ora, null, slo, nullProc, ora, asl, slo, null, and, null, rla, bit, and, rol, rla, null, and, rol, anc, bit, and, rol, rla, null, and, null, rla, nullProc, and, rol, rla, null, and, null, rla, nullProc, and, rol, rla, null, eor, null, sre, nullProc, eor, lsr, sre, null, eor, lsr, asr, null, eor, lsr, sre, null, eor, null, sre, nullProc, eor, lsr, sre, null, eor, null, sre, nullProc, eor, lsr, sre, null, adc, null, rra, nullProc, adc, ror, rra, null, adc, ror, arr, null, adc, ror, rra, null, adc, null, rra, nullProc, adc, ror, rra, null, adc, null, rra, nullProc, adc, ror, rra, nullProc, sta, nullProc, sax, sty, sta, stx, sax, null, nullProc, null, ane, sty, sta, stx, sax, null, sta, null, null, sty, sta, stx, sax, null, sta, null, null, null, sta, null, null, ldy, lda, ldx, lax, ldy, lda, ldx, lax, null, lda, null, lxa, ldy, lda, ldx, lax, null, lda, null, lax, ldy, lda, ldx, lax, null, lda, null, lae, ldy, lda, ldx, lax, cpy, cmp, nullProc, dcp, cpy, cmp, dec, dcp, null, cmp, null, null, cpy, cmp, dec, dcp, null, cmp, null, dcp, nullProc, cmp, dec, dcp, null, cmp, null, dcp, nullProc, cmp, dec, dcp, cpx, sbc, nullProc, isb, cpx, sbc, inc, isb, null, sbc, null, sbc, cpx, sbc, inc, isb, null, sbc, null, isb, nullProc, sbc, inc, isb, null, sbc, null, isb, nullProc, sbc, inc, isb];
    this.isNextInst = function() {
        return currentInst[currentInstOffset] == nextInst;
    }
    this.cycle = function() {
        currentInst[currentInstOffset++]();
        nmiBits = (nmiBits << 1) | (nmiSource.test() ? 1 : 0);
        irqBits = (irqBits << 1) | (((p & I) || !irqSource.test()) ? 0 : 1);
    }
    this.reset = function() {
        currentInst = INST_RESET;
        currentInstOffset = 0;
        prevNmi = 0;
        irqBits = 0;
        nmiBits = 0;
        a = x = y = sp = pc = b = 0;
        np = null;
        p = R;
    }
    this.reset();
}
