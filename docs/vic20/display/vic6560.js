function Vic6560(machine) {
    var colourPalette = [0XFF000000, 0XFFFFFFFF, 0XFF001089, 0XFFCFBF46, 0XFFC61486, 0XFF05B745, 0XFFD01327, 0XFF15D2BE, 0XFF00469A, 0XFF0099FF, 0XFFCBC0FF, 0XF0FFFFFE, 0XFFD87093, 0XFF90EE90, 0XFFE6D8AD, 0XFFE0FFFF];
    var PAL_DEFAULT_REGISTER_VALUES = [12, 38, 150, 174, 73, 240, 0, 0, 255, 255, 0, 0, 0, 0, 0, 27];
    var NTSC_DEFAULT_REGISTER_VALUES = [5, 25, 150, 174, 27, 240, 87, 234, 0, 0, 0, 0, 0, 0, 0, 27];
    var noisepattern = [7, 30, 30, 28, 28, 62, 60, 56, 120, 248, 124, 30, 31, 143, 7, 7, 193, 192, 224, 241, 224, 240, 227, 225, 192, 224, 120, 126, 60, 56, 224, 225, 195, 195, 135, 199, 7, 30, 28, 31, 14, 14, 30, 14, 15, 15, 195, 195, 241, 225, 227, 193, 227, 195, 195, 252, 60, 30, 15, 131, 195, 193, 193, 195, 195, 199, 135, 135, 199, 15, 14, 60, 124, 120, 60, 60, 60, 56, 62, 28, 124, 30, 60, 15, 14, 62, 120, 240, 240, 224, 225, 241, 193, 195, 199, 195, 225, 241, 224, 225, 240, 241, 227, 192, 240, 224, 248, 112, 227, 135, 135, 192, 240, 224, 241, 225, 225, 199, 131, 135, 131, 143, 135, 135, 199, 131, 195, 131, 195, 241, 225, 195, 199, 129, 207, 135, 3, 135, 199, 199, 135, 131, 225, 195, 7, 195, 135, 135, 7, 135, 195, 135, 131, 225, 195, 199, 195, 135, 135, 143, 15, 135, 135, 15, 207, 31, 135, 142, 14, 7, 129, 195, 227, 193, 224, 240, 224, 227, 131, 135, 7, 135, 142, 30, 15, 7, 135, 143, 31, 7, 135, 193, 240, 225, 225, 227, 199, 15, 3, 143, 135, 14, 30, 30, 15, 135, 135, 15, 135, 31, 15, 195, 195, 240, 248, 240, 112, 241, 240, 240, 225, 240, 224, 120, 124, 120, 124, 112, 113, 225, 225, 195, 195, 199, 135, 28, 60, 60, 28, 60, 124, 30, 30, 30, 28, 60, 120, 248, 248, 225, 195, 135, 30, 30, 60, 62, 15, 15, 135, 31, 142, 15, 15, 142, 30, 30, 30, 30, 15, 15, 143, 135, 135, 195, 131, 193, 225, 195, 193, 195, 199, 143, 15, 15, 15, 15, 131, 199, 195, 193, 225, 224, 248, 62, 60, 60, 60, 60, 60, 120, 62, 30, 30, 30, 15, 15, 15, 30, 14, 30, 30, 15, 15, 135, 31, 135, 135, 28, 62, 31, 15, 15, 142, 62, 14, 62, 30, 28, 60, 124, 252, 56, 120, 120, 56, 120, 112, 248, 124, 30, 60, 60, 48, 241, 240, 112, 112, 224, 248, 240, 248, 120, 120, 113, 225, 240, 227, 193, 240, 113, 227, 199, 135, 142, 62, 14, 30, 62, 15, 7, 135, 12, 62, 15, 135, 15, 30, 60, 60, 56, 120, 241, 231, 195, 195, 199, 142, 60, 56, 240, 224, 126, 30, 62, 14, 15, 15, 15, 3, 195, 195, 199, 135, 31, 14, 30, 28, 60, 60, 15, 7, 7, 199, 199, 135, 135, 143, 15, 192, 240, 248, 96, 240, 240, 225, 227, 227, 195, 195, 195, 135, 15, 135, 142, 30, 30, 63, 30, 14, 28, 60, 126, 30, 60, 56, 120, 120, 120, 56, 120, 60, 225, 227, 143, 31, 28, 120, 112, 126, 15, 135, 7, 195, 199, 15, 30, 60, 14, 15, 14, 30, 3, 240, 240, 241, 227, 193, 199, 192, 225, 225, 225, 225, 224, 112, 225, 240, 120, 112, 227, 199, 15, 193, 225, 227, 195, 192, 240, 252, 28, 60, 112, 248, 112, 248, 120, 60, 112, 240, 120, 112, 124, 124, 60, 56, 30, 62, 60, 126, 7, 131, 199, 193, 193, 225, 195, 195, 195, 225, 225, 240, 120, 124, 62, 15, 31, 7, 143, 15, 131, 135, 193, 227, 227, 195, 195, 225, 240, 248, 240, 60, 124, 60, 15, 142, 14, 31, 31, 14, 60, 56, 120, 112, 112, 240, 240, 248, 112, 112, 120, 56, 60, 112, 224, 240, 120, 241, 240, 120, 62, 60, 15, 7, 14, 62, 30, 63, 30, 14, 15, 135, 135, 7, 15, 7, 199, 143, 15, 135, 30, 30, 31, 30, 30, 60, 30, 28, 62, 15, 3, 195, 129, 224, 240, 252, 56, 60, 62, 14, 30, 28, 124, 30, 31, 14, 62, 28, 120, 120, 124, 30, 62, 30, 60, 31, 15, 31, 15, 15, 143, 28, 60, 120, 248, 240, 248, 112, 240, 120, 120, 60, 60, 120, 60, 31, 15, 7, 134, 28, 30, 28, 30, 30, 31, 3, 195, 199, 142, 60, 60, 28, 24, 240, 225, 195, 225, 193, 225, 227, 195, 195, 227, 195, 131, 135, 131, 135, 15, 7, 7, 225, 225, 224, 124, 120, 56, 120, 120, 60, 31, 15, 143, 14, 7, 15, 7, 131, 195, 195, 129, 240, 248, 241, 224, 227, 199, 28, 62, 30, 15, 15, 195, 240, 240, 227, 131, 195, 199, 7, 15, 15, 15, 15, 15, 7, 135, 15, 15, 14, 15, 15, 30, 15, 15, 135, 135, 135, 143, 199, 199, 131, 131, 195, 199, 143, 135, 7, 195, 142, 30, 56, 62, 60, 56, 124, 31, 28, 56, 60, 120, 124, 30, 28, 60, 63, 30, 14, 62, 28, 60, 31, 15, 7, 195, 227, 131, 135, 129, 193, 227, 207, 14, 15, 30, 62, 30, 31, 15, 143, 195, 135, 14, 3, 240, 240, 112, 224, 225, 225, 199, 142, 15, 15, 30, 14, 30, 31, 28, 120, 240, 241, 241, 224, 241, 225, 225, 224, 224, 241, 193, 240, 113, 225, 195, 131, 199, 131, 225, 225, 248, 112, 240, 240, 240, 240, 240, 112, 248, 112, 112, 97, 224, 240, 225, 224, 120, 113, 224, 240, 248, 56, 30, 28, 56, 112, 248, 96, 120, 56, 60, 63, 31, 15, 31, 15, 31, 135, 135, 131, 135, 131, 225, 225, 240, 120, 241, 240, 112, 56, 56, 112, 224, 227, 192, 224, 248, 120, 120, 248, 56, 241, 225, 225, 195, 135, 135, 14, 30, 31, 14, 14, 15, 15, 135, 195, 135, 7, 131, 192, 240, 56, 60, 60, 56, 240, 252, 62, 30, 28, 28, 56, 112, 240, 241, 224, 240, 224, 224, 241, 227, 224, 225, 240, 240, 120, 124, 120, 60, 120, 120, 56, 120, 120, 120, 120, 112, 227, 131, 131, 224, 195, 193, 225, 193, 193, 193, 227, 195, 199, 30, 14, 31, 30, 30, 15, 15, 14, 14, 14, 7, 131, 135, 135, 14, 7, 143, 15, 15, 15, 14, 28, 112, 225, 224, 113, 193, 131, 131, 135, 15, 30, 24, 120, 120, 124, 62, 28, 56, 240, 225, 224, 120, 112, 56, 60, 62, 30, 60, 30, 28, 112, 60, 56, 63];
    var noiseOffset = 0;
    var VERTICAL_BLANK_LAST_ROW;
    var VISIBLE_SCAN_LINE_CYCLES;
    var HORIZONTAL_BLANK_CYCLES;
    var BLANK_LEFT_CYCLES;
    var TOTAL_SCAN_LINES;
    var SCAN_LINE_DELAY;
    var TOTAL_LINE_CYCLES;
    this.SCREEN_WIDTH;
    this.SCREEN_HEIGHT;
    var reg = new Array(16);
    var soundCount0 = 0;
    var soundCount1 = 0;
    var soundCount2 = 0;
    var soundCount3 = 0;
    var soundState0 = 0;
    var soundState1 = 0;
    var soundState2 = 0;
    var soundState3 = 0;
    var maxValue0, maxValue1, maxValue2, maxValue3;
    var volume = 0
      , soundStateOff = 9
      , volume1 = volume
      , volume2 = volume
      , volume3 = volume
      , volume4 = volume;
    var isBlanking;
    var ptr;
    var chptr;
    var resetchptr;
    var scanLine;
    var scanCol;
    var charLineCount;
    var displayColCount;
    var displayRowCount;
    var chdata;
    var nextchdata;
    var col;
    var nextcol;
    var nextnextcol;
    var ch;
    var precount;
    var hasPreCycled = false;
    var base;
    var colbase;
    var charrom;
    var borderColour;
    var backColour;
    var bmp;
    var multicol = [0, 0, 0, 0];
    var charHeightShift;
    var scanLineCounterDelay = 0;
    var sndCount = 0;
    var sndReadCount = 0;
    var cs = 0;
    var renderingBufferSize = 8192;
    var mask = renderingBufferSize - 1;
    var renderingBuffer;
    var vicSoundRenderRate = 1017900 >> 4;
    var sampleRate;
    var screenCanvas, screenContext, bufferCanvas;
    this.initSound = function() {
        if (this.audioContext) {
            if (this.audioContext.state == 'suspended') {
                this.audioContext.resume();
                document.getElementById("audioContextMessage").style.display = "none";
            }
        }
    }
    this.initCanvas = function() {
        screenCanvas = document.getElementById("canvas");
        if (!$(screenCanvas).is(":visible")) {
            screenCanvas = document.getElementById("canvasDebug");
        }
        if (!screenCanvas.getContext) {
            alert("Your web browser does not support the 'canvas' tag.\nPlease upgrade/change your browser.");
        }
        screenContext = screenCanvas.getContext("2d");
        bufferCanvas = undefined;
        if (this.displayFrame)
            this.displayFrame();
    }
    this.initCanvas();
    try {
        if (typeof webkitAudioContext != "undefined") {
            console.debug("webkitAudioContext found");
            this.audioContext = new webkitAudioContext();
            sampleRate = this.audioContext.sampleRate;
            this.jsNode = this.audioContext.createScriptProcessor(2048);
            this.jsNode.connect(this.audioContext.destination);
            this.jsNode.onaudioprocess = function(event) {
                var diff = (sndCount - sndReadCount) & mask;
                if (diff >= 2048) {
                    var o = event.outputBuffer;
                    var l = o.getChannelData(0);
                    var r = o.getChannelData(1);
                    for (var i = 0; i < 2048; ) {
                        l[i] = r[i++] = renderingBuffer[sndReadCount++];
                        l[i] = r[i++] = renderingBuffer[sndReadCount++];
                        l[i] = r[i++] = renderingBuffer[sndReadCount++];
                        l[i] = r[i++] = renderingBuffer[sndReadCount++];
                    }
                    sndReadCount &= mask;
                } else {}
            }
            this.hasAudio = true;
        } else if (typeof AudioContext != "undefined") {
            console.debug("AudioContext found");
            this.audioContext = new AudioContext();
            sampleRate = this.audioContext.sampleRate;
            this.jsNode = this.audioContext.createScriptProcessor(2048);
            this.jsNode.connect(this.audioContext.destination);
            this.jsNode.onaudioprocess = function(event) {
                var diff = (sndCount - sndReadCount) & mask;
                if (diff >= 2048) {
                    var o = event.outputBuffer;
                    var l = o.getChannelData(0);
                    var r = o.getChannelData(1);
                    for (var i = 0; i < 2048; ) {
                        l[i] = r[i++] = renderingBuffer[sndReadCount++];
                        l[i] = r[i++] = renderingBuffer[sndReadCount++];
                        l[i] = r[i++] = renderingBuffer[sndReadCount++];
                        l[i] = r[i++] = renderingBuffer[sndReadCount++];
                    }
                    sndReadCount &= mask;
                } else {}
            }
            this.hasAudio = true;
            if (this.audioContext.state == 'suspended') {
                document.getElementById("audioContextMessage").style.display = "";
            }
        } else if (typeof Audio != "undefined") {
            console.debug("Audio found");
            audio = new Audio();
            sampleRate = 32000;
            if (audio.mozSetup) {
                audio.mozSetup(1, sampleRate);
                setInterval(function() {
                    var diff = (sndCount - sndReadCount) & mask;
                    if (diff >= 2048) {
                        audio.mozWriteAudio(renderingBuffer.subarray(sndReadCount, sndReadCount + 2048));
                        sndReadCount = (sndReadCount + 2048) & mask;
                    }
                }, 21);
                this.hasAudio = true;
            } else {
                console.debug("But no mozSetup found");
            }
        }
        ;
    } catch (e) {
        console.debug("Unabled to init sound due to", e);
    }
    if (this.hasAudio) {
        renderingBuffer = new Float32Array(renderingBufferSize);
    }
    var soundDivider = 0;
    var evenFrame = false;
    this.debugInformation = function() {
        var html = "<table id='debug'>";
        html += "<tr><th colspan='2'>VIC</th></tr>";
        var reg0 = this.invisibleRead(0);
        html += "<tr><td>Interlace Scan Mode:</td><td>" + ((reg0 & 128) ? "On" : "Off") + "</td></tr>";
        html += "<tr><td>Screen Origin X:</td><td>" + (reg0 & 127) + "</td></tr>";
        var reg1 = this.invisibleRead(1);
        html += "<tr><td>Screen Origin Y:</td><td>" + reg1 + "</td></tr>";
        var reg2 = this.invisibleRead(2);
        var reg3 = this.invisibleRead(3);
        html += "<tr><td>Screen Dimensions:</td><td>" + (reg2 & 127) + " cols x " + ((reg3 & 127) >> 1) + " rows</td></tr>";
        html += "<tr><td>Character Height:</td><td>" + ((reg3 & 1) ? "16" : "8") + "</td></tr>";
        html += "<tr><td>Matrix Base:</td><td>" + toHex4(getMatrixBase()) + "</td></tr>";
        html += "<tr><td>Colour Base:</td><td>" + toHex4(getColorBase()) + "</td></tr>";
        html += "<tr><td>Char-map Base:</td><td>" + toHex4(getCharMapBase()) + "</td></tr>";
        var reg4 = this.invisibleRead(4);
        html += "<tr><td>Raster:</td><td>" + ((reg4 << 1) + (reg3 >> 7)) + "</td></tr>";
        var reg5 = this.invisibleRead(5);
        var reg6 = this.invisibleRead(6);
        var reg7 = this.invisibleRead(7);
        html += "<tr><td>Light Pen Position(x,y):</td><td>" + reg6 + "," + reg7 + "</td></tr>";
        var reg8 = this.invisibleRead(8);
        var reg9 = this.invisibleRead(9);
        html += "<tr><td>Pot Position(x,y):</td><td>" + reg8 + "," + reg9 + "</td></tr>";
        var reg10 = this.invisibleRead(10);
        html += "<tr><td>Sound channel 0: <input type=\"checkbox\" id=\"soundchan1\" onclick=\"{Config.soundChannel1Enabled=!Config.soundChannel1Enabled;vic20.vic.updateVolumes();updateMenuState();}\"/></td><td>" + ((reg10 & 128) ? "On" : "Off") + " " + (reg10 & 127) + "</td></tr>";
        var reg11 = this.invisibleRead(11);
        html += "<tr><td>Sound channel 1: <input type=\"checkbox\" id=\"soundchan1\" onclick=\"{Config.soundChannel2Enabled=!Config.soundChannel2Enabled;vic20.vic.updateVolumes();updateMenuState();}\"/></td><td>" + ((reg11 & 128) ? "On" : "Off") + " " + (reg11 & 127) + "</td></tr>";
        var reg12 = this.invisibleRead(12);
        html += "<tr><td>Sound channel 2: <input type=\"checkbox\" id=\"soundchan1\" onclick=\"{Config.soundChannel3Enabled=!Config.soundChannel3Enabled;vic20.vic.updateVolumes();updateMenuState();}\"/></td><td>" + ((reg12 & 128) ? "On" : "Off") + " " + (reg12 & 127) + "</td></tr>";
        var reg13 = this.invisibleRead(13);
        html += "<tr><td>Sound channel 3: <input type=\"checkbox\" id=\"soundchan1\" onclick=\"{Config.soundChannel4Enabled=!Config.soundChannel4Enabled;vic20.vic.updateVolumes();updateMenuState();}\"/></td><td>" + ((reg13 & 128) ? "On" : "Off") + " " + (reg13 & 127) + "</td></tr>";
        var reg14 = this.invisibleRead(14);
        html += "<tr><td>Volume:</td><td>" + (reg14 & 15) + "</td></tr>";
        html += "<tr><td>Aux Colour:</td><td style='background-color:#" + toHexColour(colourPalette[(reg14 >> 4)]) + "'>&nbsp;</td></tr>";
        var reg15 = this.invisibleRead(15);
        html += "<tr><td>Background Colour:</td><td style='background-color:#" + toHexColour(colourPalette[(reg15 >> 4)]) + "'>&nbsp;</td></tr>";
        html += "<tr><td>Border Colour:</td><td style='background-color:#" + toHexColour(colourPalette[(reg15 & 7)]) + "'>&nbsp;</td></tr>";
        html += "<tr><td>Reverse Colour:</td><td>" + ((reg15 & 8) ? "Off" : "On") + "</td></tr>";
        html += "</table>";
        html += "<br/>";
        return html;
    }
    function getMatrixBase() {
        return (base & 0x1fff) | ~((base & 0x2000) << 2) & 0x8000;
    }
    function getColorBase() {
        return (colbase & 0x1fff) | ~((colbase & 0x2000) << 2) & 0x8000;
    }
    function getCharMapBase() {
        return (charrom & 0x1fff) | ~((charrom & 0x2000) << 2) & 0x8000;
    }
    this.reset = function() {
        console.debug("VIC reset in " + (machine.isPal ? "PAL" : "NTSC") + " mode");
        vicSoundRenderRate = (vic20.isPal ? 1108404 : 1017900) >> 4;
        if (!machine.isPal) {
            VERTICAL_BLANK_LAST_ROW = 7;
            VISIBLE_SCAN_LINE_CYCLES = 50;
            HORIZONTAL_BLANK_CYCLES = 15;
            BLANK_LEFT_CYCLES = 2;
            TOTAL_SCAN_LINES = 261;
            SCAN_LINE_DELAY = 32;
            this.cycle = this.cycleNtsc;
        } else {
            VERTICAL_BLANK_LAST_ROW = 27;
            VISIBLE_SCAN_LINE_CYCLES = 56;
            HORIZONTAL_BLANK_CYCLES = 15;
            BLANK_LEFT_CYCLES = 8;
            TOTAL_SCAN_LINES = 312;
            SCAN_LINE_DELAY = 0;
            this.cycle = this.cyclePal;
        }
        TOTAL_LINE_CYCLES = (HORIZONTAL_BLANK_CYCLES + VISIBLE_SCAN_LINE_CYCLES);
        this.SCREEN_WIDTH = (VISIBLE_SCAN_LINE_CYCLES * 4);
        this.SCREEN_HEIGHT = (TOTAL_SCAN_LINES - VERTICAL_BLANK_LAST_ROW);
        for (var i = 0; i < 16; i++) {
            this.write(i, (machine.isPal ? PAL_DEFAULT_REGISTER_VALUES : NTSC_DEFAULT_REGISTER_VALUES)[i]);
        }
        this.videoBegin();
    }
    ;
    this.getEvenFrame = function() {
        return evenFrame;
    }
    this.cyclePal = function() {
        if (hasPreCycled) {
            hasPreCycled = false;
            return;
        }
        scanCol++;
        if (isBlanking) {
            if (scanCol == HORIZONTAL_BLANK_CYCLES) {
                isBlanking = false;
            } else if (scanCol == HORIZONTAL_BLANK_CYCLES - 8) {
                displayColCount = -1;
                if (charLineCount != (1 << charHeightShift) && (charLineCount != 16)) {
                    chptr = resetchptr;
                } else {
                    if (displayColCount == 0) {
                        resetchptr = chptr & scanLine;
                    } else {
                        resetchptr = chptr;
                    }
                    charLineCount = 0;
                }
            }
        } else if (scanCol == TOTAL_LINE_CYCLES) {
            if (++scanLine == TOTAL_SCAN_LINES) {
                this.videoBegin();
            } else {
                displayRowCount--;
                isBlanking = true;
                scanCol = 0;
                charLineCount++;
            }
            reg[4] = scanLine >> 1;
            reg[3] = (reg[3] & 0x7F) | ((scanLine & 1) << 7);
        }
        if (evenFrame) {
            if (displayColCount < 0 || displayRowCount < 0) {
                var startFirstLine = ((reg[1] << 1) == scanLine) && ((HORIZONTAL_BLANK_CYCLES - 4) == scanCol);
                if (startFirstLine) {
                    displayRowCount = ((reg[3] >> 1) & 0x3F) << charHeightShift;
                    chptr = resetchptr = charLineCount = 0;
                }
                var startFirstCol = (HORIZONTAL_BLANK_CYCLES + (reg[0] & 0x7f) - BLANK_LEFT_CYCLES - 2) == scanCol;
                if (startFirstCol && displayRowCount > 0) {
                    displayColCount = ((reg[2] & 0x7F) + 1) << 1;
                    precount = 2;
                }
            }
            var stageOne = (displayColCount & 1) == 0;
            if (stageOne) {
                var addr = base + chptr;
                ch = mem[(addr & 0x1fff) | ~((addr & 0x2000) << 2) & 0x8000];
                addr = colbase + chptr;
                nextnextcol = mem[(addr & 0x1fff) | ~((addr & 0x2000) << 2) & 0x8000];
                col = nextcol;
                chdata = nextchdata;
            } else {
                var addr = (charrom + (ch << charHeightShift) + charLineCount);
                nextchdata = mem[(addr & 0x1fff) | ~((addr & 0x2000) << 2) & 0x8000];
                nextcol = nextnextcol;
                if (~nextcol & 8 & ~reg[0xf]) {
                    nextchdata = ~nextchdata;
                }
                chdata <<= 4;
            }
            if (scanLine > VERTICAL_BLANK_LAST_ROW) {
                if (displayColCount > 0 && displayRowCount > 0) {
                    if (precount > 0) {
                        precount--;
                        if (!isBlanking) {
                            bmp[ptr++] = bmp[ptr++] = bmp[ptr++] = bmp[ptr++] = borderColour;
                        }
                    } else if (!isBlanking) {
                        if (col & 8) {
                            multicol[2] = colourPalette[col & 7];
                            bmp[ptr++] = bmp[ptr++] = multicol[(chdata >> 6) & 3];
                            bmp[ptr++] = bmp[ptr++] = multicol[(chdata >> 4) & 3];
                        } else {
                            var colour = colourPalette[col & 7]
                            bmp[ptr++] = (chdata & 0x80) ? colour : backColour;
                            bmp[ptr++] = (chdata & 0x40) ? colour : backColour;
                            bmp[ptr++] = (chdata & 0x20) ? colour : backColour;
                            bmp[ptr++] = (chdata & 0x10) ? colour : backColour;
                        }
                    }
                    if (--displayColCount > 1 && stageOne) {
                        chptr++;
                    }
                } else if (!isBlanking) {
                    bmp[ptr++] = bmp[ptr++] = bmp[ptr++] = bmp[ptr++] = borderColour;
                }
            } else {
                if (--displayColCount > 0 && displayRowCount > 0) {
                    if (stageOne && displayColCount > 1) {
                        chptr++;
                    }
                    precount--;
                }
            }
        }
        this.genAudio();
    }
    ;
    this.cycleNtsc = function() {
        if (hasPreCycled) {
            hasPreCycled = false;
            return;
        }
        if (scanLineCounterDelay-- == 0) {
            if (scanLine == 260) {
                reg[4] = 0;
                reg[3] &= 0x7F;
            } else {
                reg[4] = (scanLine + 1) >> 1;
                reg[3] = (reg[3] & 0x7F) | (((scanLine + 1) & 1) << 7);
            }
        }
        scanCol++;
        if (isBlanking) {
            if (scanCol == HORIZONTAL_BLANK_CYCLES) {
                isBlanking = false;
            } else if (scanCol == HORIZONTAL_BLANK_CYCLES - 8) {
                displayColCount = -1;
                if (charLineCount != (1 << charHeightShift) && (charLineCount != 16)) {
                    chptr = resetchptr;
                } else {
                    if (displayColCount == 0) {
                        resetchptr = chptr & scanLine;
                    } else {
                        resetchptr = chptr;
                    }
                    charLineCount = 0;
                }
            }
        } else if (scanCol == TOTAL_LINE_CYCLES) {
            if (++scanLine == TOTAL_SCAN_LINES) {
                this.videoBegin();
            } else {
                displayRowCount--;
                isBlanking = true;
                scanCol = 0;
                charLineCount++;
                scanLineCounterDelay = SCAN_LINE_DELAY;
            }
        }
        if (evenFrame) {
            if (displayColCount < 0 || displayRowCount < 0) {
                var startFirstLine = ((reg[1] << 1) == scanLine) && ((HORIZONTAL_BLANK_CYCLES - 4) == scanCol);
                if (startFirstLine) {
                    displayRowCount = ((reg[3] >> 1) & 0x3F) << charHeightShift;
                    chptr = resetchptr = charLineCount = 0;
                }
                var startFirstCol = (HORIZONTAL_BLANK_CYCLES + (reg[0] & 0x7f) - BLANK_LEFT_CYCLES - 2) == scanCol;
                if (startFirstCol && displayRowCount > 0) {
                    displayColCount = ((reg[2] & 0x7F) + 1) << 1;
                    precount = 2;
                }
            }
            var stageOne = (displayColCount & 1) == 0;
            if (stageOne) {
                var addr = base + chptr;
                ch = mem[(addr & 0x1fff) | ~((addr & 0x2000) << 2) & 0x8000];
                addr = colbase + chptr;
                nextnextcol = mem[(addr & 0x1fff) | ~((addr & 0x2000) << 2) & 0x8000];
                col = nextcol;
                chdata = nextchdata;
            } else {
                var addr = (charrom + (ch << charHeightShift) + charLineCount);
                nextchdata = mem[(addr & 0x1fff) | ~((addr & 0x2000) << 2) & 0x8000];
                nextcol = nextnextcol;
                if (~nextcol & 8 & ~reg[0xf]) {
                    nextchdata = ~nextchdata;
                }
                chdata <<= 4;
            }
            if (scanLine > VERTICAL_BLANK_LAST_ROW) {
                if (displayColCount > 0 && displayRowCount > 0) {
                    if (precount > 0) {
                        precount--;
                        if (!isBlanking) {
                            bmp[ptr++] = bmp[ptr++] = bmp[ptr++] = bmp[ptr++] = borderColour;
                        }
                    } else if (!isBlanking) {
                        if (col & 8) {
                            multicol[2] = colourPalette[col & 7];
                            bmp[ptr++] = bmp[ptr++] = multicol[(chdata >> 6) & 3];
                            bmp[ptr++] = bmp[ptr++] = multicol[(chdata >> 4) & 3];
                        } else {
                            var colour = colourPalette[col & 7]
                            bmp[ptr++] = (chdata & 0x80) ? colour : backColour;
                            bmp[ptr++] = (chdata & 0x40) ? colour : backColour;
                            bmp[ptr++] = (chdata & 0x20) ? colour : backColour;
                            bmp[ptr++] = (chdata & 0x10) ? colour : backColour;
                        }
                    }
                    if (--displayColCount > 1 && stageOne) {
                        chptr++;
                    }
                } else if (!isBlanking) {
                    bmp[ptr++] = bmp[ptr++] = bmp[ptr++] = bmp[ptr++] = borderColour;
                }
            } else {
                if (--displayColCount > 0 && displayRowCount > 0) {
                    if (stageOne && displayColCount > 1) {
                        chptr++;
                    }
                    precount--;
                }
            }
        }
        this.genAudio();
    }
    this.genAudio = function() {
        if (++soundDivider >= 16) {
            soundDivider = 0;
            if (this.hasAudio) {
                var sound = volume;
                if (maxValue0 != -1) {
                    if (++soundCount0 >= maxValue0) {
                        soundCount0 = 0;
                        soundState0 = soundState0 ? 0 : volume1;
                    }
                    sound += soundState0;
                } else {}
                if (maxValue1 != -1) {
                    if (++soundCount1 >= maxValue1) {
                        soundCount1 = 0;
                        soundState1 = soundState1 ? 0 : volume2;
                    }
                    sound += soundState1;
                } else {}
                if (maxValue2 != -1) {
                    if (++soundCount2 >= maxValue2) {
                        soundCount2 = 0;
                        soundState2 = soundState2 ? 0 : volume3;
                    }
                    sound += soundState2;
                } else {}
                if (maxValue3 != -1) {
                    if (++soundCount3 >= maxValue3) {
                        soundCount3 = 0;
                        soundState3 = (((noisepattern[((noiseOffset++) & 1023) >> 3] >> (noiseOffset & 7)) & 1) ? volume4 : 0);
                    }
                    sound += soundState3;
                }
                cs += sampleRate;
                if (cs >= vicSoundRenderRate) {
                    cs -= vicSoundRenderRate;
                    var plus1 = (sndCount + 1) & mask;
                    if (plus1 != sndReadCount) {
                        renderingBuffer[sndCount] = sound;
                        sndCount = plus1;
                    }
                }
            }
        }
    }
    ;
    this.cycle = this.cycleNtsc;
    this.videoBegin = function() {
        isBlanking = true;
        scanLine = scanCol = ptr = 0;
        displayRowCount = displayColCount = -1;
        scanLineCounterDelay = SCAN_LINE_DELAY;
        if (evenFrame)
            this.displayFrame();
        evenFrame = !evenFrame;
    }
    ;
    var w, h, buf8, data2;
    var usingPackedBuffer = false;
    this.displayFrame = function() {
        if (bufferCanvas === undefined || this.SCREEN_WIDTH != w || this.SCREEN_HEIGHT != h) {
            bufferCanvas = document.createElement("canvas");
            w = bufferCanvas.width = this.SCREEN_WIDTH;
            h = bufferCanvas.height = this.SCREEN_HEIGHT;
            bufferContext = bufferCanvas.getContext("2d");
            cvsDat = bufferContext.getImageData(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
            screenCanvas.width = bufferCanvas.width * 1.67;
            screenCanvas.height = bufferCanvas.height * 1;
            usingPackedBuffer = (typeof Uint8ClampedArray !== "undefined") && (cvsDat.data.buffer);
            if (usingPackedBuffer) {
                console.debug("Using native packed graphics");
                var bmp2 = cvsDat.data.buffer;
                buf8 = new Uint8ClampedArray(bmp2);
                bmp = new Uint32Array(bmp2);
            } else {
                console.debug("Using manually unpacked graphics");
                buf8 = cvsDat.data;
                for (var loop = 0; loop < buf8.length; loop++)
                    buf8[loop] = 0xFF;
                bmp = typeof (Int32Array) != "undefined" ? new Int32Array(this.SCREEN_WIDTH * this.SCREEN_HEIGHT) : new Array(this.SCREEN_WIDTH * this.SCREEN_HEIGHT);
            }
        }
        if (!usingPackedBuffer) {
            var fc;
            for (var i = 0, ix = 0; i < bmp.length; i++) {
                fc = bmp[i];
                buf8[ix + 0] = fc & 0xFF;
                buf8[ix + 1] = (fc >> 8) & 0xFF;
                buf8[ix + 2] = (fc >> 16) & 0xFF;
                ix += 4;
            }
        }
        bufferContext.putImageData(cvsDat, 0, 0);
        screenContext.drawImage(bufferCanvas, 0, 0, screenCanvas.width, screenCanvas.height);
    }
    this.cycleStep = function() {
        this.cycle();
        displayFrame();
    }
    this.read = function(regnum) {
        this.cycle();
        hasPreCycled = true;
        return reg[regnum & 0xF];
    }
    ;
    this.invisibleRead = function(regnum) {
        return reg[regnum & 0xF];
    }
    ;
    this.updateVolumes = function() {
        volume1 = Config.soundChannel1Enabled ? volume : 0;
        volume2 = Config.soundChannel2Enabled ? volume : 0;
        volume3 = Config.soundChannel3Enabled ? volume : 0;
        volume4 = Config.soundChannel4Enabled ? volume : 0;
    }
    this.write = function(regnum, value) {
        this.cycle();
        hasPreCycled = true;
        regnum &= 0xF;
        if (regnum != 4) {
            var preValue = reg[regnum];
            reg[regnum] = value;
            switch (regnum) {
            case 0x02:
                base = ((reg[5] >> 4) << 10) | ((value & 0x80) << 2);
                colbase = 0x1400 + ((value & 128) << 2);
                break;
            case 0x03:
                charHeightShift = 3 + (value & 1);
                reg[regnum] = (value & 0x7F) | (preValue & 0x80);
                break;
            case 0x05:
                base = ((value >> 4) << 10) | ((reg[2] & 0x80) << 2);
                charrom = (value & 0xF) << 10;
                break;
            case 0x0A:
                maxValue0 = value < 128 ? -1 : (128 - ((value + 1) & 0x7F)) << 3;
                break;
            case 0x0B:
                maxValue1 = value < 128 ? -1 : (128 - ((value + 1) & 0x7F)) << 2;
                break;
            case 0x0C:
                maxValue2 = value < 128 ? -1 : (128 - ((value + 1) & 0x7F)) << 1;
                break;
            case 0x0D:
                maxValue3 = value < 128 ? -1 : (128 - ((value + 1) & 0x7F));
                break;
            case 0x0E:
                volume = (value & 0xF) / 64;
                this.updateVolumes();
                soundStateOff = volume * .45;
                multicol[3] = colourPalette[value >> 4];
                break;
            case 0x0F:
                borderColour = colourPalette[value & 7];
                backColour = colourPalette[value >> 4];
                multicol[1] = borderColour;
                multicol[0] = backColour;
                break;
            }
        }
    }
    ;
    this.reset();
}
