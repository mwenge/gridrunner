function Via6522(startAddress, vianame) {
    console.log("Init VIA at " + startAddress.toString(16));
    var ORA = 1;
    var DDRA = 3;
    var SR = 10;
    var t1c, t1l, t2l_l, t2c;
    var reg = new Array(16);
    var hasPreCycled = false;
    var inhibitT1Interrupt, inhibitT2Interrupt, acrTimedCountdown;
    var ca2, lastca1, cb1, cb2;
    this.reset = function() {
        console.log("Vic reset");
        for (var i = 0; i < reg.length; i++)
            reg[i] = 0;
        for (var i = 4; i < 10; i++)
            reg[i] = 0xFF;
        t1l = t1c = t2c = 0xFFFF;
        t2l_l = 0xFF;
        inhibitT1Interrupt = inhibitT2Interrupt = true;
        this.pins_ira = 0;
        this.pins_irb = 0;
        this.ca1 = true;
        this.lastca1 = true;
        ca2 = true;
        newca1 = true;
        newca2 = true;
        cb1 = false;
        cb2 = false;
        acrTimedCountdown = true;
        this.hasInterrupt = 0;
        hasPreCycled = false;
    }
    ;
    this.debugInformation = function() {
        var html = "";
        html += "<table id='debug'>";
        html += "<tr><th colspan='2'>" + vianame + "(" + startAddress.toString(16) + ")</th></tr>";
        html += "<tr><td>ORB:</td><td>" + toBin8(this.invisibleRead(0)) + "</td></tr>";
        html += "<tr><td>ORA:</td><td>" + toBin8(this.invisibleRead(1)) + "</td></tr>";
        html += "<tr><td>DDRB:</td><td>" + toBin8(this.invisibleRead(2)) + "</td></tr>";
        html += "<tr><td>DDRB:</td><td>" + toBin8(this.invisibleRead(3)) + "</td></tr>";
        html += "<tr><td>T1C:</td><td>" + toHex4(t1c) + "</td></tr>";
        html += "<tr><td>T1L:</td><td>" + toHex4(t1l) + "</td></tr>";
        html += "<tr><td>T2C:</td><td>" + toHex4(t2c) + "</td></tr>";
        html += "<tr><td>T2L:</td><td>" + toHex2(t2l_l) + "</td></tr>";
        html += "<tr><td>SR:</td><td>" + toHex2(this.invisibleRead(10)) + "</td></tr>";
        var reg11 = this.invisibleRead(11);
        var t1control = ["Timed Int.", "Cont. Int", "Timed Int. + PB7 One shot", "Cont. Int. + PB7 Square wave"];
        var t2control = ["Timed Int.", "Count Down PB6"];
        var srControl = ["Disabled ", "Shift in T2", "Shift in PHI2", "Shift in ext. clock", "Shift out free run T2", "Shift out T2", "Shift out PHI2", "Shift out ext. clock"];
        html += "<tr><td>ACR:</td><td>" + toBin8(this.invisibleRead(11)) + "</td></tr>";
        html += "<tr><td>ACR-T1 Control:</td><td>" + t1control[reg11 >> 6] + "</td></tr>";
        html += "<tr><td>ACR-T2 Control:</td><td>" + t2control[(reg11 >> 5) & 1] + "</td></tr>";
        html += "<tr><td>ACR-SR Control:</td><td>" + srControl[(reg11 >> 2) & 7] + "</td></tr>";
        html += "<tr><td>ACR-PA Latch:</td><td>" + (((reg11 >> 1) & 1) ? "Yes" : "No") + "</td></tr>";
        html += "<tr><td>ACR-PB Latch:</td><td>" + ((reg11 & 1) ? "Yes" : "No") + "</td></tr>";
        var reg12 = this.invisibleRead(12);
        var cb2Control = reg12 >> 5;
        var cb1Control = (reg12 >> 4) & 1;
        var ca2Control = (reg12 >> 1) & 7;
        var ca1Control = reg12 & 1;
        var ca2andcb2Strings = ["Input-negative active edge", "Independent interrupt input-negative edge*", "Input-positive active edge", "Independent interrupt input-positive edge*", "Handshake output", "Pulse output", "Low output", "High output"];
        var ca1andcb1Strings = ["Interrupt -ve edge", "Interrupt +ve edge"];
        html += "<tr><td>PCR:</td><td>" + toHex2(reg12) + "</td></tr>";
        html += "<tr><td>PCR-CB1:</td><td>" + ca1andcb1Strings[cb1Control] + "</td></tr>";
        html += "<tr><td>PCR-CB2:</td><td>" + ca2andcb2Strings[cb2Control] + "</td></tr>";
        html += "<tr><td>PCR-CA1:</td><td>" + ca1andcb1Strings[ca1Control] + "</td></tr>";
        html += "<tr><td>PCR-CA2:</td><td>" + ca2andcb2Strings[ca2Control] + "</td></tr>";
        html += "<tr><td>IFR:</td><td>" + toBin8(this.invisibleRead(13)) + "</td></tr>";
        html += "<tr><td>IER:</td><td>" + toBin8(this.invisibleRead(14)) + "</td></tr>";
        html += "</table>";
        return html;
    }
    this.cycleUp = function() {
        if (t1c == -1) {
            if (!inhibitT1Interrupt) {
                reg[13] |= 0x40;
                inhibitT1Interrupt = true;
            }
        }
        if (t2c == -1) {
            if (acrTimedCountdown && !inhibitT2Interrupt) {
                reg[13] |= 0x20;
                inhibitT2Interrupt = true;
            }
        }
        if (reg[12] & 1) {
            if (this.ca1 != this.lastca1) {
                console.debug(this.ca1);
                this.lastca1 = this.ca1;
                if (this.ca1) {
                    reg[13] |= 2;
                }
            }
        }
        this.hasInterrupt = reg[14] & reg[13] & 0x7F;
    }
    ;
    this.cycleDown = function() {
        if (hasPreCycled) {
            hasPreCycled = false;
            return;
        }
        if (t1c-- == -1) {
            if (reg[11] & 0x40) {
                t1c = t1l;
                inhibitT1Interrupt = false;
            } else {
                t1c = 0xFFFE;
            }
        }
        if (t2c-- == -1) {
            t2c = 0xFFFE;
        }
        if ((~reg[12]) & 1) {
            if (this.ca1 != this.lastca1) {
                this.lastca1 = this.ca1;
                if (!this.ca1) {
                    reg[13] |= 2;
                }
            }
        }
    }
    ;
    this.read = function(regnum) {
        regnum &= 0xF;
        switch (regnum) {
        case 0:
            {
                var ddrb = reg[2];
                var pins_in = (~this.pins_irb) & (~ddrb);
                var reg_in = reg[0] & ddrb;
                return (pins_in | reg_in) & 0xFF;
            }
        case 1:
            var ic = (reg[12] >> 1) & 7;
            reg[13] &= (ic != 1 && ic != 3) ? ~3 : ~1;
        case 15:
            return (~this.pins_ira) & (~reg[DDRA]) & 0xFF;
        case 4:
            {
                reg[13] &= ~0x40;
                inhibitT1Interrupt = false;
                return t1c & 0xFF;
            }
        case 5:
            {
                return (t1c >> 8) & 0xFF;
            }
        case 6:
            {
                return t1l & 0xFF;
            }
        case 7:
            {
                return (t1l >> 8) & 0xFF;
            }
        case 8:
            {
                reg[13] &= ~0x20;
                inhibitT2Interrupt = false;
                return t2c & 0xFF;
            }
        case 9:
            {
                return (t2c >> 8) & 0xFF;
            }
        case 13:
            {
                var result = reg[13] & 0x7F;
                return result ? (result | 0x80) : result;
            }
        case 14:
            return reg[14] | 0x80;
        default:
            return reg[regnum];
        }
    }
    ;
    this.getReg = function(regnum) {
        return reg[regnum];
    }
    ;
    this.invisibleRead = function(regnum) {
        regnum &= 15;
        switch (regnum) {
        case 4:
            {
                return t1c & 0xFF;
            }
        case 5:
            {
                return (t1c >> 8) & 0xFF;
            }
        case 6:
            {
                return t1l & 0xFF;
            }
        case 7:
            {
                return (t1l >> 8) & 0xFF;
            }
        case 8:
            {
                return t2c & 0xFF;
            }
        case 9:
            {
                return (t2c >> 8) & 0xFF;
            }
        case 15:
            {
                return reg[1];
            }
        default:
            return reg[regnum];
        }
    }
    this.write = function(regnum, value) {
        this.cycleDown();
        hasPreCycled = true;
        switch (regnum & 15) {
        case 0:
            reg[0] = value;
            break;
        case 1:
            var ic = (reg[12] >> 1) & 7;
            reg[13] &= (ic != 1 && ic != 3) ? ~3 : ~1;
        case 15:
            reg[ORA] = value;
            break;
        case 2:
            reg[2] = value;
            break;
        case 3:
            reg[3] = value;
            break;
        case 4:
            t1l = (t1l & ~0xFF) | value;
            break;
        case 5:
            value <<= 8;
            t1l = (t1l & 0xFF) | value;
            t1c = t1l;
            reg[13] &= ~0x40;
            inhibitT1Interrupt = false;
            break;
        case 6:
            t1l = (t1l & 0xFF00) | value;
            break;
        case 7:
            value <<= 8;
            t1l = (t1l & 0xFF) | value;
            reg[13] &= ~0x40;
            break;
        case 8:
            t2l_l = value;
            break;
        case 9:
            t2c = (value << 8) | t2l_l;
            reg[13] &= ~0x20;
            inhibitT2Interrupt = false;
            break;
        case 10:
            reg[10] = value;
            break;
        case 11:
            reg[11] = value;
            acrTimedCountdown = (reg[11] & 0x20) == 0;
            break;
        case 12:
            reg[12] = value;
            break;
        case 13:
            reg[13] &= ~value;
            break;
        case 14:
            if (value & 0x80) {
                reg[14] |= value;
            } else {
                reg[14] &= ~value;
            }
            break;
        default:
            reg[1] = value;
            break;
        }
    }
    this.reset();
}
