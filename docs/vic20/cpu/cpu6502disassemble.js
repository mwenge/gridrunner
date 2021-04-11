var nems = ["BRK", "ORA X,i", "JAM", "SLO X,i", "NOP z", "ORA z", "ASL z", "SLO z", "PHP", "ORA #", "ASL", "ANC #", "NOP a", "ORA a", "ASL a", "SLO a", "BPL r", "ORA i,Y", "JAM", "SLO i,Y", "NOP z,X", "ORA z,X", "ASL z,X", "SLO z,X", "CLC", "ORA a,Y", "NOP", "SLO a,Y", "NOP a,X", "ORA a,X", "ASL a,X", "SLO a,X", "JSR a", "AND X,i", "JAM", "RLA X,i", "BIT z", "AND z", "ROL z", "RLA z", "BIT a", "AND #", "ROL", "ANC #", "BIT a", "AND a", "ROL a", "RLA a", "BMI r", "AND i,Y", "JAM", "RAL i,Y", "NOP z,X", "AND z,X", "ROL z,X", "RLA z,X", "SEC", "AND a,Y", "NOP", "RLA a,Y", "NOP a,X", "AND a,X", "ROL a,X", "RLA a,X", "RTI", "EOR X,i", "JAM", "SRE X,i", "NOP z", "EOR z", "LSR z", "SRE z", "PHA", "EOR #", "LSR", "ASR #", "JMP a", "EOR a", "LSR a", "SRA a", "BVC r", "EOR i,Y", "JAM", "SRE i,Y", "NOP z,X", "EOR z,X", "LSR z,X", "SRE z,X", "CLI", "EOR a,Y", "NOP", "SRE a,Y", "NOP a,X", "EOR a,X", "LSR a,X", "SRE a,X", "RTS", "ADC X,i", "JAM", "RRA X,i", "NOP z", "ADC z", "ROR z", "RRA z", "PLA", "ADC #", "ROR", "ARR #", "JMP i", "ADC a", "ROR a", "RRA a", "BVS r", "ADC i,Y", "JAM", "RRA i,Y", "NOP z,X", "ADC z,X", "ROR z,X", "SAX z", "SEI", "ADC a,Y", "NOP", "RRA a,Y", "NOP a,X", "ADC a,X", "ROR a,X", "RRA a,X", "NOP #", "STA X,i", "NOP #", "SAX X,i", "STY z", "STA z", "STX z", "SAX z,X", "DEY", "NOP #", "TXA", "ANE #", "STY a", "STA a", "STX a", "SAX a", "BCC r", "STA i,Y", "JAM", "SHA a,X", "STY z,X", "STA z,X", "STX z,Y", "LAX z", "TYA", "STA a,Y", "TXS", "SHS a,X", "SHY a,Y", "STA a,X", "SHX a,Y", "SHA a,Y", "LDY #", "LDA X,i", "LDX #", "LAX X,i", "LDY z", "LDA z", "LDX z", "LAX z,X", "TAY", "LDA #", "TAX", "LXA #", "LDY a", "LDA a", "LDX a", "LAX a", "BCS r", "LDA i,Y", "JAM", "LAX i,Y", "LDY z,X", "LDA z,X", "LDX z,Y", "DCP z", "CLV", "LDA a,Y", "TSX", "LAE a,Y", "LDY a,X", "LDA a,X", "LDX a,Y", "LAX a,Y", "CPY #", "CMP X,i", "NOP #", "DCP X,i", "CPY z", "CMP z", "DEC z", "DCP z,X", "INY", "CMP #", "DEX", "SBX #", "CPY a", "CMP a", "DEC a", "DCP a", "BNE r", "CMP i,Y", "JAM", "DCP i,Y", "NOP z,X", "CMP z,X", "DEC z,X", "DCP a,Y", "CLD", "CMP a,Y", "NOP", "DCP a,Y", "NOP a,X", "CMP a,X", "DEC a,X", "DCP a,X", "CPX #", "SBC X,i", "NOP #", "ISB X,i", "CPX z", "SBC z", "INC z", "ISB z", "INX", "SBC #", "NOP", "SBC #", "CPX a", "SBC a", "INC a", "ISB a", "BEQ r", "SBC i,Y", "JAM", "ISB i,Y", "NOP z,X", "SBC z,X", "INC z,X", "ISB z,X", "SED", "SBC a,Y", "NOP", "ISB a,Y", "NOP a,X", "SBC a,X", "INC a,X", "ISB a,X"];
var instructionLength = [2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 3, 1, 3, 3, 3, 3, 3, 3, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 3, 1, 3, 3, 3, 3, 3, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 3, 1, 3, 3, 3, 3, 3, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 3, 1, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3, 2, 2, 1, 3, 2, 2, 2, 2, 1, 3, 1, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 3, 1, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 3, 1, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 3, 1, 3, 3, 3, 3, 3, ];
var BRK = 0;
var RTI = 0x40;
var RTS = 0x60;
var JMP = 0x4C;
var JMPi = 0x6C;
var JSR = 0x20;
function isJumpInstruction(inst) {
    return (inst == JSR || inst == JMP);
}
function disassemble(pc, mem) {
    var originalPc = pc;
    var inst = mem[pc++];
    if (inst === undefined) {
        inst = 0;
    }
    var n = nems[inst];
    var nl = n.length > 4 ? n.substring(0, 4) : n;
    var result = "";
    result += nl;
    var branch = -1;
    var reference = -1;
    if (n.length == 3) {} else if (n.indexOf(" A") != -1) {
        result += " A";
    } else if (n.indexOf(" z,X") != -1) {
        var zp = mem[pc++ & 0xFFFF];
        result += "$" + mem[zp].toString(16) + ",X";
    } else if (n.indexOf(" z") != -1) {
        reference = mem[pc++ & 0xFFFF];
        result += "$" + reference.toString(16);
    } else if (n.indexOf(" #") != -1) {
        result += "#$" + mem[pc++ & 0xFFFF].toString(16);
    } else if (n.indexOf(" a,X") != -1) {
        reference = mem[pc++ & 0xFFFF] | (mem[pc++ & 0xFFFF] << 8);
        result += "$" + reference.toString(16) + ",X";
    } else if (n.indexOf(" a,Y") != -1) {
        reference = (mem[pc++ & 0xFFFF] | (mem[pc++ & 0xFFFF] << 8));
        result += "$" + reference.toString(16) + ",Y";
    } else if (n.indexOf(" a") != -1) {
        var val = (mem[pc++ & 0xFFFF] | (mem[pc++ & 0xFFFF] << 8));
        result += "$" + val.toString(16);
        if (isJumpInstruction(inst)) {
            branch = val;
        } else {
            reference = val;
        }
    } else if (n.indexOf(" X,i") != -1) {
        result += "($" + mem[pc++ & 0xFFFF].toString(16) + ",X)";
    } else if (n.indexOf(" i,Y") != -1) {
        result += "($" + mem[pc++ & 0xFFFF].toString(16) + "),Y";
    } else if (n.indexOf(" i") != -1) {
        reference = (mem[pc++ & 0xFFFF] | (mem[pc++ & 0xFFFF] << 8));
        result += "($" + reference.toString(16) + ")";
    } else if (n.indexOf(" r") != -1) {
        var diff = mem[pc++ & 0xFFFF];
        if (diff > 127)
            diff -= 256;
        result += "*" + diff;
        branch = (pc + diff) & 0xFFFF;
    } else {
        result += "Unknown instruction " + inst.toString(16);
    }
    var byteCount = pc - originalPc;
    var bytes = new Array(byteCount);
    var cnt = 0;
    for (var i = originalPc; i < pc; i++) {
        bytes[cnt++] = mem[i & 0xFFFF];
    }
    if (inst == RTS || inst == RTI) {
        result = "<html><b>" + result + "</b></html>";
    }
    return {
        "pc": originalPc,
        "bytes": bytes,
        "result": result,
        "branch": branch,
        "reference": reference
    };
}
function disassembleToString(pc, mem) {
    var v = disassemble(pc, mem);
    return toHex4(v.pc) + " " + v.result + "\n";
}
