function loadPrgFromBasicString(basic) {
    var prgData = new Array();
    var startAddress = 0x1001;
    if (Config.memoryAt0400) {
        startAddress = 0x0401;
    } else if (Config.memoryAt2000) {
        startAddress = 0x1201;
    }
    prgData.push(basicToPrg(startAddress, basic));
    loadPrgFromData(prgData);
}
var escCodes = {
    "SPACE": 0x20,
    "WHT": 0x05,
    "RED": 0x1C,
    "GRN": 0x1E,
    "BLU": 0x1F,
    "BLK": 0x90,
    "PUR": 0x9C,
    "YEL": 0x9E,
    "CYN": 0x9F,
    "HOME": 0x13,
    "DOWN": 0x11,
    "LEFT": 0x9D,
    "RIGHT": 0x1D,
    "UP": 0x91,
    "CLR": 0x93,
    "RVS ON": 0x12,
    "RVS OFF": 0x92,
    "RVS": 0x12
};
var tokens = {
    "END": 128,
    "FOR": 129,
    "NEXT": 130,
    "DATA": 131,
    "INPUT#": 132,
    "INPUT": 133,
    "DIM": 134,
    "READ": 135,
    "LET": 136,
    "GOTO": 137,
    "RUN": 138,
    "IF": 139,
    "RESTORE": 140,
    "GOSUB": 141,
    "RETURN": 142,
    "REM": 143,
    "STOP": 144,
    "ON": 145,
    "WAIT": 146,
    "LOAD": 147,
    "SAVE": 148,
    "VERIFY": 149,
    "DEF": 150,
    "POKE": 151,
    "PRINT#": 152,
    "PRINT": 153,
    "CONT": 154,
    "LIST": 155,
    "CLR": 156,
    "CMD": 157,
    "SYS": 158,
    "OPEN": 159,
    "CLOSE": 160,
    "GET": 161,
    "NEW": 162,
    "TAB(": 163,
    "TO": 164,
    "FN": 165,
    "SPC(": 166,
    "THEN": 167,
    "NOT": 168,
    "STEP": 169,
    "+": 170,
    "-": 171,
    "*": 172,
    "/": 173,
    "^": 174,
    "AND": 175,
    "OR": 176,
    ">": 177,
    "=": 178,
    "<": 179,
    "SGN": 180,
    "INT": 181,
    "ABS": 182,
    "USR": 183,
    "FRE": 184,
    "POS": 185,
    "SQR": 186,
    "RND": 187,
    "LOG": 188,
    "EXP": 189,
    "COS": 190,
    "SIN": 191,
    "TAN": 192,
    "ATN": 193,
    "PEEK": 194,
    "LEN": 195,
    "STR$": 196,
    "VAL": 197,
    "ASC": 198,
    "CHR$": 199,
    "LEFT$": 200,
    "RIGHT$": 201,
    "MID$": 202,
    "GO": 203,
    "PRINT": 153,
    "~": 255
};
var vicmap = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ' ', '!', '"', '#', '$', '%', '&', '.', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '', ']', '', ''];
var reverseTokens = {}
  , reverseTokensEsc = {};
for (var key in tokens) {
    reverseTokens[tokens[key]] = " <b>" + key + "</b> ";
}
for (var key in escCodes) {
    reverseTokensEsc[escCodes[key]] = "[" + key + "]";
}
for (var i = 0; i < vicmap.length; i++) {
    if (vicmap[i] != '') {
        reverseTokens[i] = (vicmap[i] == '?') ? 'PRINT' : vicmap[i];
        reverseTokensEsc[i] = vicmap[i];
    }
}
var asciimap = new Array(256);
for (var i = 0; i < vicmap.length; i++)
    asciimap[vicmap[i]] = i;
var databasic = new Array();
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
function memoryToAsciiBasic(mem) {
    var basicStart = mem[43] + (mem[44] << 8);
    console.debug("basic start", basicStart.toString(16));
    var nextLineOffset = basicStart;
    result = "";
    for (; ; ) {
        nextLineOffset = mem[basicStart++] + (mem[basicStart++] << 8);
        console.debug("nextLineOffset", nextLineOffset.toString(16));
        if (nextLineOffset == 0)
            break;
        var lineNumber = mem[basicStart++] + (mem[basicStart++] << 8);
        console.debug("lineNumber", lineNumber);
        result += "<div><span style='width:2em;display:inline-block;text-align:right'>" + lineNumber + "</span> ";
        var ch;
        var inQuotes = false;
        while (ch = mem[basicStart++]) {
            if (!inQuotes) {
                var rt = reverseTokens[ch];
                result += rt;
                if (rt == '"') {
                    inQuotes = true;
                }
            } else {
                var rt = reverseTokensEsc[ch];
                if (rt == undefined) {
                    console.debug(ch, "undefined");
                }
                result += rt;
                if (rt == '"') {
                    inQuotes = false;
                }
            }
        }
        result += "</div>\n";
    }
    return result;
}
var rvson = false;
function asiiToChar(ch) {
    if (ch < 0x20) {
        if (ch == 0x12)
            rvson = true;
        return ch | 0x80;
    } else {
        if (ch >= 0x60) {
            ch &= 0xDF;
        } else {
            ch &= 0x3F;
        }
    }
    return ch;
}
function memoryToAsciiBasic2(mem) {
    var basicStart = mem[43] + (mem[44] << 8);
    var nextLineOffset = basicStart;
    var lineCount = 0;
    for (; ; ) {
        nextLineOffset = mem[nextLineOffset] + (mem[nextLineOffset + 1] << 8);
        console.debug("nextLineOffset", nextLineOffset.toString(16));
        if (nextLineOffset == 0)
            break;
        lineCount++;
    }
    var canvas = $("#debugContent_basicprogram_canvas")[0];
    canvas.height = lineCount * 8;
    var context = canvas.getContext("2d");
    var data = context.getImageData(0, 0, canvas.width, canvas.height);
    for (var loop = 0; loop < data.width * data.height * 4; loop++)
        data.data[loop] = 0xFF;
    var basicStart = mem[43] + (mem[44] << 8);
    console.debug("basic start", basicStart.toString(16));
    var nextLineOffset = basicStart;
    result = "";
    var funcBase = 0xC09E;
    var ox = 0;
    var oy = 0;
    for (; ; ) {
        rvson = false;
        nextLineOffset = mem[basicStart++] + (mem[basicStart++] << 8);
        console.debug("nextLineOffset", nextLineOffset.toString(16));
        if (nextLineOffset == 0)
            break;
        var lineNumber = mem[basicStart++] + (mem[basicStart++] << 8);
        var st = "" + lineNumber;
        for (var n = 0; n < st.length; n++) {
            drawChar(data, st.charCodeAt(n), ox++, oy);
        }
        drawChar(data, 0x60, ox++, oy);
        var ch;
        var inQuotes = false;
        while (ch = mem[basicStart++]) {
            if (!inQuotes) {
                if (ch < 128) {
                    ch = asiiToChar(ch);
                    if (ch != -1)
                        drawChar(data, ch, ox++, oy);
                } else {
                    var dex = funcBase;
                    ch &= 127;
                    while (ch-- > 0) {
                        while (mem[dex++] < 128)
                            ;
                    }
                    var endloop = false;
                    for (; endloop == false; dex++) {
                        var ch2 = mem[dex];
                        if (ch2 >= 128) {
                            ch2 &= 0x7F;
                            endloop = true;
                        }
                        ch2 = asiiToChar(ch2);
                        if (ch2 != -1)
                            drawChar(data, ch2, ox++, oy);
                    }
                }
                if (ch == 0x22) {
                    inQuotes = true;
                }
            } else {
                if (ch == 0x22) {
                    inQuotes = false;
                    rvson = false;
                }
                if (ch < 128) {
                    ch = asiiToChar(ch);
                    if (ch != -1)
                        drawChar(data, ch, ox++, oy);
                }
            }
        }
        oy++;
        ox = 0;
    }
    context.putImageData(data, 0, 0);
}
function drawChar(data, ch, ox, oy) {
    var charMap = 0x8000 + ch * 8;
    var onColour = 0X2713D0;
    var offColour = 0xFFFFFF;
    for (var y = 0; y < 8; y++) {
        var bite = mem[charMap + y];
        for (var x = 0; x < 8; x++) {
            var bit = (bite & 128) ? onColour : offColour;
            var xx = ox * 8 + x;
            var yy = oy * 8 + y;
            data.data[yy * 4 * data.width + xx * 4] = bit >> 16;
            data.data[yy * 4 * data.width + xx * 4 + 1] = (bit >> 8) & 0xFF;
            data.data[yy * 4 * data.width + xx * 4 + 2] = bit & 0xFF;
            bite <<= 1;
        }
    }
}
function basicToPrg(startAddress, basic) {
    var cnt = 0;
    var databasic = new Array();
    databasic[cnt++] = startAddress & 255;
    databasic[cnt++] = startAddress >> 8;
    basic = basic.replace(/\r/g, "\n").replace(/\n\n/g, "\n");
    var lines = basic.toUpperCase().split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = trim(lines[i]);
        var lineNumber = parseInt(lines[i]);
        if (lineNumber == null || lineNumber.toString() == "NaN") {} else {
            var lineAddressBase = cnt;
            databasic[cnt++] = 0;
            databasic[cnt++] = 0;
            databasic[cnt++] = lineNumber & 255;
            databasic[cnt++] = lineNumber >> 8;
            line = trim(line.substring(lineNumber.toString().length));
            var inQuotes = false
              , inCurls = false
              , inData = false;
            while (line.length != 0) {
                var addedToken = false;
                if (inQuotes && inCurls) {
                    for (escCode in escCodes) {
                        if (line.indexOf(escCode) == 0) {
                            addedToken = true;
                            databasic[cnt++] = escCodes[escCode];
                            line = line.substring(escCode.length);
                        }
                    }
                } else if (!inQuotes) {
                    for (token in tokens) {
                        if (line.indexOf(token) == 0) {
                            if (token == '-' && inData)
                                continue;
                            addedToken = true;
                            if (token == 'DATA')
                                inData = true;
                            databasic[cnt++] = tokens[token];
                            line = line.substring(token.length);
                        }
                    }
                }
                if (!addedToken) {
                    var rch = line.charCodeAt(0);
                    if (inCurls) {
                        if (rch == '}'.charCodeAt(0)) {
                            inCurls = false;
                        }
                    } else {
                        if (!inCurls && rch == '{'.charCodeAt(0)) {
                            inCurls = true;
                        } else {
                            if (rch == ':'.charCodeAt(0))
                                inData = false;
                            if (rch == '"'.charCodeAt(0))
                                inQuotes = !inQuotes;
                            var ch = vicmap[rch];
                            if (typeof (ch) != 'undefined' && ch != '')
                                databasic[cnt++] = ch.charCodeAt(0);
                        }
                    }
                    line = line.substring(1);
                }
            }
            databasic[cnt++] = 0;
            var lineAddress = startAddress + databasic.length - 2;
            databasic[lineAddressBase++] = lineAddress & 255;
            databasic[lineAddressBase++] = lineAddress >> 8;
        }
    }
    databasic[cnt++] = 0;
    databasic[cnt++] = 0;
    return databasic;
}
