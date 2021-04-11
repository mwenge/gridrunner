function maskedEval(scr, labels) {
    var mask = {};
    for (p in this)
        mask[p] = undefined;
    for (l in labels)
        mask[l] = labels[l];
    scr = scr.toLowerCase();
    return (new Function("with(this) { return " + scr + "; }")).call(mask);
}
function Cpu6502assembler() {
    var feedbackArray = new Array();
    var inError = false;
    var m = new Array(65536);
    var linenum = 0
      , oline = "";
    function error(str) {
        feedbackArray.push({
            type: "Error",
            line: linenum + 1,
            message: str + "\nLine " + (linenum + 1) + ": " + str + "\nCompile aborted"
        });
        console.debug("ERRORERRORERRORERROR", str);
        inError = true;
    }
    function info(str) {
        feedbackArray.push({
            type: "Info",
            message: str
        });
    }
    function getNumberOrLabelValue(line, pass, labels) {
        line = $.trim(line);
        line = line.toLowerCase();
        line = line.replace(/\$([0-9a-f]+)/gi, "0x$1");
        line = line.replace(/\%([01]+)/gi, "parseInt('$1',2)");
        var lg = line[0];
        if (lg == '<' || lg == '>')
            line = line.substring(1);
        var num;
        try {
            num = maskedEval(line, labels);
            console.debug(line, num);
            if ((typeof num) == 'string') {
                if (num.length < 1) {
                    error("String constant too short '" + line + "'");
                    num = 0;
                } else if (num.length > 1) {
                    error("String constant too long '" + line + "'");
                    num = 0;
                } else
                    num = num.charCodeAt(0);
            }
        } catch (e) {
            console.debug("exception ", e);
            num = 0;
            if (pass == 2) {
                error("Cannot evaluate(1) '" + line + "'");
                debugger ;
            }
        }
        if (num == undefined) {
            num = 0;
            if (pass == 2) {
                error("Cannot evaluate(2) '" + line + "'");
            }
        }
        if (lg == '<')
            num &= 255;
        if (lg == '>')
            num >>= 8;
        return num;
    }
    var nems = ["BRKs", "ORA(z,x)", "JAMi", "SLO(z,x)", "NOPz", "ORAz", "ASLz", "SLOz", "PHPs", "ORA#", "ASLi", "ANC#", "NOPa", "ORAa", "ASLa", "SLOa", "BPLr", "ORA(z),y", "JAMi", "SLO(z),y", "NOPz,x", "ORAz,x", "ASLz,x", "SLOz,x", "CLCi", "ORAa,y", "NOPi", "SLOa,y", "NOPa,x", "ORAa,x", "ASLa,x", "SLOa,x", "JSRa", "AND(z,x)", "JAMi", "RLA(z,x)", "BITz", "ANDz", "ROLz", "RLAz", "PLPs", "AND#", "ROLi", "ANC#", "BITa", "ANDa", "ROLa", "RLAa", "BMIr", "AND(z),y", "JAMi", "RLA(z),y", "NOPz,x", "ANDz,x", "ROLz,x", "RLAz,x", "SECi", "ANDa,y", "NOPi", "RLAa,y", "NOPa,x", "ANDa,x", "ROLa,x", "RLAa,x", "RTIs", "EOR(z,x)", "JAMi", "SRE(z,x)", "NOPz", "EORz", "LSRz", "SREz", "PHAs", "EOR#", "LSRi", "ASR#", "JMPa", "EORa", "LSRa", "SREa", "BVCr", "EOR(z),y", "JAMi", "SRE(z),y", "NOPz,x", "EORz,x", "LSRz,x", "SREz,x", "CLIi", "EORa,y", "NOPi", "SREa,y", "NOPa,x", "EORa,x", "LSRa,x", "SREa,x", "RTSs", "ADC(z,x)", "JAMi", "RRA(z,x)", "NOPz", "ADCz", "RORz", "RRAz", "PLAs", "ADC#", "RORi", "ARR#", "JMP(a)", "ADCa", "RORa", "RRAa", "BVSr", "ADC(z),y", "JAMi", "RRA(z),y", "NOPz,x", "ADCz,x", "RORz,x", "RRAz,x", "SEIi", "ADCa,y", "NOPi", "RRAa,y", "NOPa,x", "ADCa,x", "RORa,x", "RRAa,x", "NOP#", "STA(z,x)", "NOP#", "SAX(z,x)", "STYz", "STAz", "STXz", "SAXz", "DEYi", "NOP#", "TXAi", "ANE#", "STYa", "STAa", "STXa", "SAXa", "BCCr", "STA(z),y", "JAMi", "SHAa,x", "STYz,x", "STAz,x", "STXz,y", "SAXz,y", "TYAi", "STAa,y", "TXSi", "SHSa,x", "SHYa,y", "STAa,x", "SHXa,y", "SHAa,y", "LDY#", "LDA(z,x)", "LDX#", "LAX(z,x)", "LDYz", "LDAz", "LDXz", "LAXz", "TAYi", "LDA#", "TAXi", "LXA#", "LDYa", "LDAa", "LDXa", "LAXa", "BCSr", "LDA(z),y", "JAMi", "LAX(z),y", "LDYz,x", "LDAz,x", "LDXz,y", "LAXz,y", "CLVi", "LDAa,y", "TSXi", "LAEa,y", "LDYa,x", "LDAa,x", "LDXa,y", "LAXa,y", "CPY#", "CMP(z,x)", "NOP#", "DCP(z,x)", "CPYz", "CMPz", "DECz", "DCPz", "INYi", "CMP#", "DEXi", "SBX#", "CPYa", "CMPa", "DECa", "DCPa", "BNEr", "CMP(z),y", "JAMi", "DCP(z),y", "NOPz,x", "CMPz,x", "DECz,x", "DCPz,x", "CLDi", "CMPa,y", "NOPi", "DCPa,y", "NOPa,x", "CMPa,x", "DECa,x", "DCPa,x", "CPX#", "SBC(z,x)", "NOP#", "ISB(z,x)", "CPXz", "SBCz", "INCz", "ISBz", "INXi", "SBC#", "NOPi", "SBC#", "CPXa", "SBCa", "INCa", "ISBa", "BEQr", "SBC(z),y", "JAMi", "ISB(z),y", "NOPz,x", "SBCz,x", "INCz,x", "ISBz,x", "SEDi", "SBCa,y", "NOPi", "ISBa,y", "NOPa,x", "SBCa,x", "INCa,x", "ISBa,x"];
    var datanems = ["DB", "DCB", "BYTE", "\\.BYTE", "EQUB", "DCW", "WORD", "\\.WORD", "EQUW", "DCL", "LONG", "\\.LONG", "EQUL"];
    var label1 = "(?:\\.([a-z_][a-z0-9_\\$\\.]*))?";
    var label2 = "([a-z_][a-z0-9_\\$\\.]*):";
    var label3 = "([a-z_][a-z0-9_\\$\\.]*)";
    var comment = "(?:;.*)?";
    var regexps = {
        ORG: /^(?:\*=|org)[ \\t]*([\$%0-9A-Za-z_\-\+]+)/i,
        LABEL1: /^\.([a-z_][a-z0-9_\$\.]*)/i,
        LABEL2: /^([a-z_][a-z0-9_\$\.]*):/i,
        LABEL3: /^([a-z_][a-z0-9_\$\.]*)[ \t]*\r?\n?$/i,
        IGNORE1: /^#.*/,
        COMMENT: /^[ \t]*;.*/,
        ASSIGNMENT: [/^([a-z_][a-z0-9_\$]*)[ \t]*eqm[ \t]*([^;\r\n]*)/i, /^([a-z_][a-z0-9_\$]*)[ \t]*=[ \t]*([^;\r\n]*)/i, /^([a-z_][a-z0-9_\$]*)[ \t]*equ[ \t]*([^;\r\n]*)/i]
    };
    var nemlut = {};
    for (var i = 0; i < nems.length; i++) {
        var nem = nems[i];
        var onem = nem;
        nemlut[onem] = i;
        nem = nem.replace(/\(/g, "[ \\t]+\\(");
        nem = nem.replace(/\)/g, "\\)");
        if (nem.indexOf("s") != -1 || nem.indexOf("i") != -1) {
            nem = nem.replace(/[si]/g, "");
        } else if (nem.indexOf("z") != -1 || nem.indexOf("a") != -1) {
            if (nem.indexOf("(") == -1) {
                nem = nem.replace(/[az]/g, "[ \\t]+([\\$%0-9a-z_\\-\\+]+)");
            } else {
                nem = nem.replace(/[az]/g, "[ \\t]*([\\$%0-9a-z_\\-\\+]+)");
            }
        } else if (nem.indexOf("#") != -1) {
            nem = nem.replace(/[#]/g, "[ \\t]*#([^ \\t;]+)");
        } else if (nem.indexOf("r") != -1) {
            nem = nem.replace(/[r]/g, "[ \\t]+([\\$%0-9a-z_\\-\\+]*)");
        }
        nem1 = "/^(?:" + label1 + ")?[ \\t]*" + nem + "[ \\t]*" + comment + "/i";
        nem2 = "/^(?:" + label2 + ")?[ \\t]*" + nem + "[ \\t]*" + comment + "/i";
        nem3 = "/^(?:" + label3 + ")?[ \\t]*" + nem + "[ \\t]*" + comment + "/i";
        regexps[onem] = [];
        regexps[onem][0] = eval(nem1);
        regexps[onem][1] = eval(nem2);
        regexps[onem][2] = eval(nem3);
    }
    for (var i = 0; i < datanems.length; i++)
        regexps[datanems[i]] = eval("/^" + datanems[i] + "[ \\t]*([^\\r\\n;]*)[ \\t]*" + comment + "/i");
    function nextToken(text) {
        if (text.length == 0)
            return null;
        while (text.charCodeAt(0) > 128 || text[0] == ' ' || text[0] == '\r' || text[0] == '\n' || text[0] == '\t') {
            text = text.substring(1);
            if (text.length == 0)
                return null;
        }
        var result;
        for (var key in regexps) {
            var match;
            if (regexps[key].length) {
                for (var i = 0; i < regexps[key].length; i++) {
                    if (match = regexps[key][i].exec(text)) {
                        if (result === undefined || match[0].length > result.match[0].length) {
                            result = {
                                match: match,
                                type: key
                            };
                        }
                    }
                }
            } else {
                if (match = regexps[key].exec(text)) {
                    if (result === undefined || match[0].length > result.match[0].length) {
                        result = {
                            match: match,
                            type: key
                        };
                    }
                }
            }
        }
        if (result)
            return result;
        alert("error no match '" + text + "'");
        exit;
    }
    this.compile = function(compileText) {
        if (typeof (compileText) == 'function') {
            compileText = fnToText(compileText);
        }
        feedbackArray = new Array();
        info("Compile start at " + new Date());
        var labels = {};
        inError = false;
        for (var i = 0; i < m.length; i++)
            m[i] = undefined;
        for (var pass = 1; !inError && pass <= 2; pass++) {
            console.debug(">> PASS", pass);
            var pc = -1;
            var test = compileText.split("\n");
            linenum = -1;
            while ((++linenum) != test.length) {
                var result = nextToken(test[linenum]);
                if (result == null)
                    continue;
                console.debug(result.type, result.match);
                if (result.type == "IGNORE1")
                    continue;
                if (result.type == "ORG") {
                    pc = getNumberOrLabelValue(result.match[1], pass, labels);
                    if (pc > 65535) {
                        pc = -1;
                        error("ORIGIN exceeds 64KB");
                    } else if (pc < 0) {
                        error("ORIGIN must be greater than or equal to 0");
                    }
                    continue;
                }
                if (result.type == "LABEL1" || result.type == "LABEL2" || result.type == "LABEL3") {
                    labels[result.match[1].toLowerCase()] = pc;
                    continue;
                }
                if (result.type == "ASSIGNMENT") {
                    var num = getNumberOrLabelValue(result.match[2], pass, labels);
                    labels[result.match[1].toLowerCase()] = num;
                    continue;
                }
                if (pc == -1) {
                    error("Origin not set");
                    break;
                }
                if (result.match[1]) {
                    labels[result.match[1].toLowerCase()] = pc;
                }
                if (result.type == 'DB' || result.type == 'DCB' || result.type == 'BYTE' || result.type == 'EQUB' || result.type == '\\.BYTE') {
                    var vals = result.match[1].split(",");
                    for (var i = 0; i < vals.length; i++) {
                        var num = getNumberOrLabelValue(vals[i], pass, labels);
                        if (num > 255 || num < -128) {
                            error("byte constant too big");
                            break;
                        }
                        m[pc++] = num & 0xFF;
                    }
                    continue;
                }
                if (result.type == 'DCW' || result.type == 'WORD' || result.type == 'EQUW') {
                    var vals = result.match[1].split(",");
                    for (var i = 0; i < vals.length; i++) {
                        var num = getNumberOrLabelValue(vals[i], pass, labels);
                        if (num > 65535 || num < -32768) {
                            error("word constant too big");
                            break;
                        }
                        m[pc++] = num & 255;
                        m[pc++] = (num >> 8) & 0xFF;
                    }
                    continue;
                }
                if (result.type == 'DCL' || result.type == 'LONG' || result.type == 'EQUL') {
                    var vals = result.match[1].split(",");
                    for (var i = 0; i < vals.length; i++) {
                        var num = getNumberOrLabelValue(vals[i], pass, labels);
                        if (num > 4294967295 || num < -214783648) {
                            error("word constant too big");
                            break;
                        }
                        m[pc++] = num & 255;
                        m[pc++] = (num >> 8) & 255;
                        m[pc++] = (num >> 16) & 255;
                        m[pc++] = (num >> 24) & 255;
                    }
                    continue;
                }
                if (result.type.indexOf("z") != -1 || result.type.indexOf("a") != -1) {
                    var num = getNumberOrLabelValue(result.match[2], pass, labels);
                    if (num < 0 || num > 65535) {
                        if (pass == 1)
                            continue;
                        else
                            error("Absolute constant out of 16 bit range '" + result.text + "'");
                        break;
                    }
                    if (result.type.indexOf("z") != -1) {
                        if (num > 255) {
                            if (result.type.indexOf("(") != -1) {
                                error("ZP constant out of 8 bit range '" + num + "'" + result.text);
                                break;
                            }
                            result.type = result.type.replace(/z/g, "a");
                        }
                    }
                    if (result.type.indexOf("a") != -1) {
                        if (num < 256) {
                            var newType = result.type.replace(/a/g, "z");
                            if (nemlut[newType] !== undefined) {
                                result.type = newType;
                            }
                        }
                    }
                }
                m[pc++] = nemlut[result.type];
                if (result.match === undefined) {
                    continue;
                }
                if (result.type.indexOf("i") != -1 || result.type.indexOf("s") != -1) {
                    continue;
                }
                var num = getNumberOrLabelValue(result.match[2], pass, labels);
                if (result.type.indexOf("r") != -1) {
                    var diff = num - pc - 1;
                    if (diff > 127 || diff < -128) {
                        if (pass == 2) {
                            error("Branch out of range " + num);
                            break;
                        } else
                            diff = 0;
                    }
                    m[pc++] = (diff >= 0) ? diff : (256 + diff);
                    continue;
                }
                if (result.type.indexOf("#") != -1) {
                    if (num < -128 || num > 255) {
                        error("Constant out of 8 bit range '" + num + "'");
                        break;
                    }
                    m[pc++] = num & 0xFF;
                    continue;
                }
                if (result.type.indexOf("z") != -1) {
                    m[pc++] = num & 0xFF;
                    continue;
                }
                if (result.type.indexOf("a") != -1) {
                    m[pc++] = num & 0xFF;
                    m[pc++] = (num >> 8) & 0xFF;
                    continue;
                }
            }
        }
        if (!inError) {
            info("Compile success");
        } else {
            info("Compile failed");
        }
        for (var i = 0; i < 256; i++) {
            var str = "";
            var po = false;
            for (var j = 0; j < 256; j++) {
                var vv = m[(i << 8) + j];
                if (vv !== undefined) {
                    if (!po) {
                        str = toHex4((i << 8) + j) + ": " + str;
                        po = true;
                    }
                    str += toHex2(vv) + " ";
                }
            }
            console.debug(str);
        }
        return {
            feedback: feedbackArray,
            m: m,
            success: !inError
        };
    }
}
