var Config = new function() {
    this.memoryAt0400 = false;
    this.memoryAt2000 = false;
    this.memoryAt4000 = false;
    this.memoryAt6000 = false;
    this.memoryAtA000 = false;
    this.speed = 1;
    this.soundChannel1Enabled = true;
    this.soundChannel2Enabled = true;
    this.soundChannel3Enabled = true;
    this.soundChannel4Enabled = true;
}
;
var useUint8Array = typeof (Uint8Array) != 'undefined';
var mem = useUint8Array ? new Uint8Array(65536) : new Array(65536);
var memExec = useUint8Array ? new Uint8Array(65536) : new Array(65536);
var memBp = useUint8Array ? new Uint8Array(65536) : new Array(65536);
var bincodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.!";
cmset = undefined;
function Vic20() {
    var self = this;
    $("body").click(function() {
        self.vic.initSound()
    });
    this.isPal = false;
    var readFuncs = new Array(65536 >> 4);
    var invisibleReadFuncs = new Array(65536 >> 4);
    var writeFuncs = new Array(65536 >> 4);
    var invisibleWriteFuncs = new Array(65536 >> 4);
    this.nextFrameTime = 0;
    this.readDebug = function(offset) {
        memExec[offset] = 8;
        return readFuncs[offset >> 4](offset);
    }
    this.readNormal = function(offset) {
        return readFuncs[offset >> 4](offset);
    }
    this.read = this.readDebug;
    this.invisibleRead = function(offset) {
        return invisibleReadFuncs[offset >> 4](offset);
    }
    this.writeDebug = function(offset, value) {
        memExec[offset] = 16;
        writeFuncs[offset >> 4](offset, value);
    }
    this.writeNormal = function(offset, value) {
        writeFuncs[offset >> 4](offset, value);
    }
    this.write = this.writeDebug;
    this.invisibleWrite = function(offset, value) {
        invisibleWriteFuncs[offset >> 4](offset, value);
    }
    function read0(offset) {
        return 0;
    }
    function readMem(offset) {
        return mem[offset];
    }
    function readVia1(offset) {
        return vic20.via1.read(offset);
    }
    function invisibleReadVia1(offset) {
        return vic20.via1.invisibleRead(offset);
    }
    function readVia2(offset) {
        return vic20.via2.read(offset);
    }
    function invisibleReadVia2(offset) {
        return vic20.via2.invisibleRead(offset);
    }
    function readVic(offset) {
        return vic20.vic.read(offset);
    }
    function invisibleReadVic(offset) {
        return vic20.vic.invisibleRead(offset);
    }
    function write0() {}
    function writeMem(offset, value) {
        mem[offset] = value;
    }
    function writeVia1(offset, value) {
        vic20.via1.write(offset, value);
    }
    function invisibleWriteVia1(offset, value) {
        vic20.via1.invisibleWrite(offset, value);
    }
    function writeVia2(offset, value) {
        vic20.via2.write(offset, value);
    }
    function invisibleWriteVia2(offset, value) {
        vic20.via2.invisibleWrite(offset, value);
    }
    function writeVic(offset, value) {
        vic20.vic.write(offset, value);
    }
    this.init = function() {
        KeyboardInit();
        this.cpu = new Cpu6502(this,this,this.hasIrq,this.hasNmi);
        this.tapedrive = new TapeDrive();
        this.via1 = new Via6522(0x9120,"VIA1");
        this.via1.tapedrive = this.tapedrive;
        this.via1.oldCycleDown = this.via1.cycleDown;
        this.via1.cycleDown = function() {
            if (Config.tapePlay) {
                this.ca1 = !this.tapedrive.readTapeBit();
            }
            this.oldCycleDown();
        }
        this.via1.oldRead = this.via1.read;
        this.via1.read = function(reg) {
            switch (reg & 0xF) {
            case 0x0:
            case 0x1:
            case 0xF:
                this.pins_ira = this.pins_irb = 0;
                var orb = this.getReg(0);
                var ddrb = this.getReg(2);
                var ora = this.getReg(1);
                var ddra = this.getReg(3);
                var column = ~(orb & ddrb) & 0xFF
                  , row = ~(ora & ddra) & 0xFF;
                for (var i = 0; i < 8; i++) {
                    if ((column & (1 << i)) != 0) {
                        this.pins_ira |= keysdown[i];
                    }
                    this.pins_irb |= (keysdown[i] & row) ? (1 << i) : 0;
                }
                if ((ddrb & 0x80) == 0 && right) {
                    this.pins_irb |= 0x80;
                }
                break;
            }
            var r = this.oldRead(reg);
            return r;
        }
        ;
        this.via2 = new Via6522(0x9110,"VIA2");
        this.via2.tapedrive = this.tapedrive;
        this.via2.oldCycleUp = this.via2.cycleUp;
        this.via2.cycleUp = function() {
            this.oldCycleUp();
            var pcrCa2 = (this.getReg(12) >> 1) & 7;
            if (pcrCa2 != this.lastPcrCa2) {
                if (pcrCa2 == 7) {
                    this.tapedrive.triggerTapeMotor(false);
                } else if (pcrCa2 == 6) {
                    this.tapedrive.triggerTapeMotor(true);
                }
                this.lastPcrCa2 = pcrCa2;
            }
        }
        this.via2.oldRead = this.via2.read;
        this.via2.read = function(reg) {
            this.pins_ira = 1;
            if (Config.tapePlay)
                this.pins_ira |= 64;
            else
                this.pins_ira &= ~64;
            this.pins_irb = 0xFF;
            if (fire) {
                this.pins_ira |= 32;
            } else {
                this.pins_ira &= ~32;
            }
            if (left) {
                this.pins_ira |= 16;
            } else {
                this.pins_ira &= ~16;
            }
            if (up) {
                this.pins_ira |= 4;
            } else {
                this.pins_ira &= ~4;
            }
            if (down) {
                this.pins_ira |= 8;
            } else {
                this.pins_ira &= ~8;
            }
            return this.oldRead(reg);
        }
        ;
        this.vic = new Vic6560(this);
        this.reset();
    }
    ;
    this.hasIrq = new function(machine) {
        this.test = function() {
            return machine.via1.hasInterrupt;
        }
    }
    (this);
    this.hasNmi = new function(machine) {
        this.test = function() {
            return machine.via2.hasInterrupt;
        }
    }
    (this);
    this.softreset = function() {
        console.debug("Vic20 soft reset");
        this.cpu.reset();
        this.loadPrgCntr = 5;
    }
    this.reset = function() {
        console.debug("Vic20 reset");
        for (var i = 0; i < 65536; i++) {
            mem[i] = 0xCE;
            memExec[i] = 0;
            memBp[i] = 0;
        }
        var bindata = binToArray(chardata);
        for (var i = 0; i < bindata.length; i++) {
            mem[0x8000 + i] = bindata[i];
        }
        bindata = binToArray(basicdata);
        for (var i = 0; i < bindata.length; i++) {
            mem[0xc000 + i] = bindata[i];
        }
        bindata = binToArray(kerneldata);
        for (var i = 0; i < bindata.length; i++) {
            mem[0xe000 + i] = bindata[i];
        }
        for (var i = 0; i < readFuncs.length; i++) {
            readFuncs[i] = readMem;
            invisibleReadFuncs[i] = readMem;
            writeFuncs[i] = writeMem;
            invisibleWriteFuncs[i] = writeMem;
        }
        for (var i = 0x9000; i < 0x9100; i += 16) {
            readFuncs[i >> 4] = readVic;
            invisibleReadFuncs[i >> 4] = invisibleReadVic;
            writeFuncs[i >> 4] = writeVic;
            invisibleWriteFuncs[i >> 4] = writeVic;
        }
        for (var i = 0x9110; i <= 0x93F0; i += 32) {
            readFuncs[i >> 4] = readVia2;
            invisibleReadFuncs[i >> 4] = invisibleReadVia2;
            writeFuncs[i >> 4] = writeVia2;
            invisibleWriteFuncs[i >> 4] = invisibleWriteVia2;
        }
        for (var i = 0x9120; i <= 0x93E0; i += 64) {
            readFuncs[i >> 4] = readVia1;
            invisibleReadFuncs[i >> 4] = invisibleReadVia1;
            writeFuncs[i >> 4] = writeVia1;
            invisibleWriteFuncs[i >> 4] = invisibleWriteVia1;
        }
        for (var i = 0x8000 >> 4; i < 0x9000 >> 4; i++) {
            writeFuncs[i] = write0;
            invisibleWriteFuncs[i] = write0;
        }
        for (var i = 0xA000 >> 4; i < 0x10000 >> 4; i++) {
            writeFuncs[i] = write0;
            invisibleWriteFuncs[i] = write0;
        }
        this.updateMemoryModules();
        this.cpu.reset();
        this.via1.reset();
        this.via2.reset();
        this.vic.reset();
        this.loadPrgCntr = 5;
    }
    this.updateMemoryModules = function() {
        for (var i = 0x400 >> 4; i < 0x1000 >> 4; i++) {
            writeFuncs[i] = Config.memoryAt0400 ? writeMem : write0;
            invisibleWriteFuncs[i] = Config.memoryAt0400 ? writeMem : write0;
        }
        for (var i = 0x2000 >> 4; i < 0x4000 >> 4; i++) {
            writeFuncs[i] = Config.memoryAt2000 ? writeMem : write0;
            invisibleWriteFuncs[i] = Config.memoryAt2000 ? writeMem : write0;
        }
        for (var i = 0x4000 >> 4; i < 0x6000 >> 4; i++) {
            writeFuncs[i] = Config.memoryAt4000 ? writeMem : write0;
            invisibleWriteFuncs[i] = Config.memoryAt4000 ? writeMem : write0;
        }
        for (var i = 0x6000 >> 4; i < 0x8000 >> 4; i++) {
            writeFuncs[i] = Config.memoryAt6000 ? writeMem : write0;
            invisibleWriteFuncs[i] = Config.memoryAt6000 ? writeMem : write0;
        }
        for (var i = 0xA000 >> 4; i < 0xC000 >> 4; i++) {
            writeFuncs[i] = Config.memoryAtA000 ? writeMem : write0;
            invisibleWriteFuncs[i] = Config.memoryAtA000 ? writeMem : write0;
        }
    }
    var hasStarted = false;
    this.execute = function() {
        console.debug("Vic20 execute");
        this.nextFrameTime = new Date().getTime();
        this.stop = false;
        this.running = true;
        if (!hasStarted) {
            hasStarted = true;
            this.oneFrame();
        }
    }
    this.stopExecution = function() {
        this.stop = true;
    }
    this.stepToInstruction = function() {
        while (!this.cpu.isNextInst()) {
            this.cycle();
        }
    }
    this.cycle = function() {
        this.via1.cycleUp();
        this.via2.cycleUp();
        this.cpu.cycle();
        this.via1.cycleDown();
        this.via2.cycleDown();
        this.vic.cycle();
    }
    var oneFrameTimeSum = 0;
    var timeloop = 100;
    var frameTimeEl = $("#frameTime");
    this.oneFrame = function() {
        var _vic = this.vic;
        var _cpu = this.cpu;
        var _via1 = this.via1;
        var _via2 = this.via2;
        var frameRate = this.isPal ? 25 : 29.97;
        var cyclesPerFrame = Math.round((this.isPal ? 1108404 : 1017900) / frameRate);
        var startTime = new Date().getTime();
        for (var j = 0; j < Config.speed; j++)
            if (!this.stop) {
                for (var i = cyclesPerFrame; i; --i) {
                    var pc = _cpu.getPc();
                    if (memBp[pc]) {
                        if (memBp[pc] == 1) {
                            memBp[pc] = 2;
                            memExec[pc] |= 2;
                            if (!isDebugging)
                                debug();
                            break;
                        }
                        if (memBp[pc] == 2)
                            memBp[pc] = 1;
                    }
                    _via1.cycleUp();
                    _via2.cycleUp();
                    _cpu.cycle();
                    _via1.cycleDown();
                    _via2.cycleDown();
                    _vic.cycle();
                }
                oneFrameTimeSum += new Date().getTime() - startTime;
                if (timeloop-- == 0) {
                    frameTimeEl.text((oneFrameTimeSum / 100) + " ms");
                    oneFrameTimeSum = 0;
                    timeloop = 100;
                }
            }
        if (typeof loadPrgSrc != 'undefined' && (mem[43] != 0 || mem[44] != 0) && this.loadPrgCntr-- == 0) {
            if (loadPrgSrc == "tape") {
                mem[631] = 131;
                mem[198] = 1;
                Config.tapePlay = 1;
            } else {
                loadPrgFileData(loadPrgSrc);
            }
            delete loadPrgSrc;
        }
        frameRate *= Config.speed;
        var timeWaitUntilNextFrame = this.nextFrameTime - new Date().getTime();
        if (timeWaitUntilNextFrame < 0) {
            timeWaitUntilNextFrame = 0;
            this.nextFrameTime = new Date().getTime() + (1000 / frameRate);
        } else {
            this.nextFrameTime += (1000 / frameRate);
        }
        setTimeout("vic20.oneFrame()", timeWaitUntilNextFrame);
    }
}
