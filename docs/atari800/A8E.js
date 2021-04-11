
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = 'A8E.data';
    var REMOTE_PACKAGE_NAME = (Module['filePackagePrefixURL'] || '') + 'A8E.data';
    var REMOTE_PACKAGE_SIZE = 485680;
    var PACKAGE_UUID = '9c8f51ff-4474-4914-b4a1-59e9c5bc456f';
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}
Module['FS_createPath']('/', 'data', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 38800, 0, 0).open('GET', '/data/agent usa.atr');
    new DataRequest(38800, 75424, 0, 0).open('GET', '/data/archon 2.atr');
    new DataRequest(75424, 103600, 0, 0).open('GET', '/data/archon.atr');
    new DataRequest(103600, 195776, 0, 0).open('GET', '/data/arkanoid (display list).atr');
    new DataRequest(195776, 205008, 0, 0).open('GET', '/data/asteroids.atr');
    new DataRequest(205008, 213200, 0, 0).open('GET', '/data/ATARIBAS.ROM');
    new DataRequest(213200, 229584, 0, 0).open('GET', '/data/ATARIXL.ROM');
    new DataRequest(229584, 321760, 0, 0).open('GET', '/data/bandits.atr');
    new DataRequest(321760, 355056, 0, 0).open('GET', '/data/behind jaggi lines.atr');
    new DataRequest(355056, 380288, 0, 0).open('GET', '/data/blue max.atr');
    new DataRequest(380288, 472464, 0, 0).open('GET', '/data/bruce lee.atr');
    new DataRequest(472464, 480800, 0, 0).open('GET', '/data/chicken.atr');
    new DataRequest(480800, 485680, 0, 0).open('GET', '/data/gridrunner.atr');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/data/agent usa.atr"].onload();
          DataRequest.prototype.requests["/data/archon 2.atr"].onload();
          DataRequest.prototype.requests["/data/archon.atr"].onload();
          DataRequest.prototype.requests["/data/arkanoid (display list).atr"].onload();
          DataRequest.prototype.requests["/data/asteroids.atr"].onload();
          DataRequest.prototype.requests["/data/ATARIBAS.ROM"].onload();
          DataRequest.prototype.requests["/data/ATARIXL.ROM"].onload();
          DataRequest.prototype.requests["/data/bandits.atr"].onload();
          DataRequest.prototype.requests["/data/behind jaggi lines.atr"].onload();
          DataRequest.prototype.requests["/data/blue max.atr"].onload();
          DataRequest.prototype.requests["/data/bruce lee.atr"].onload();
          DataRequest.prototype.requests["/data/chicken.atr"].onload();
          DataRequest.prototype.requests["/data/gridrunner.atr"].onload();
          Module['removeRunDependency']('datafile_A8E.data');

    };
    Module['addRunDependency']('datafile_A8E.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();

// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  Module['arguments'] = process['argv'].slice(2);

  module['exports'] = Module;
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  this['Module'] = Module;

  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Auto-generated preamble library stuff ===

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?\{ ?[^}]* ?\}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    code = Pointer_stringify(code);
    if (code[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (code.indexOf('"', 1) === code.length-1) {
        code = code.substr(1, code.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + code + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + code + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}

// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;

// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;

// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;

// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  var i = 3;
  // params, etc.
  var basicTypes = {
    'v': 'void',
    'b': 'bool',
    'c': 'char',
    's': 'short',
    'i': 'int',
    'l': 'long',
    'f': 'float',
    'd': 'double',
    'w': 'wchar_t',
    'a': 'signed char',
    'h': 'unsigned char',
    't': 'unsigned short',
    'j': 'unsigned int',
    'm': 'unsigned long',
    'x': 'long long',
    'y': 'unsigned long long',
    'z': '...'
  };
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
  function parseNested() {
    i++;
    if (func[i] === 'K') i++; // ignore const
    var parts = [];
    while (func[i] !== 'E') {
      if (func[i] === 'S') { // substitution
        i++;
        var next = func.indexOf('_', i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || '?');
        i = next+1;
        continue;
      }
      if (func[i] === 'C') { // constructor
        parts.push(parts[parts.length-1]);
        i += 2;
        continue;
      }
      var size = parseInt(func.substr(i));
      var pre = size.toString().length;
      if (!size || !pre) { i--; break; } // counter i++ below us
      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }
    i++; // skip E
    return parts;
  }
  function parse(rawList, limit, allowVoid) { // main parser
    limit = limit || Infinity;
    var ret = '', list = [];
    function flushList() {
      return '(' + list.join(', ') + ')';
    }
    var name;
    if (func[i] === 'N') {
      // namespaced N-E
      name = parseNested().join('::');
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      // not namespaced
      if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
      var size = parseInt(func.substr(i));
      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }
    first = false;
    if (func[i] === 'I') {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
    } else {
      ret = name;
    }
    paramLoop: while (i < func.length && limit-- > 0) {
      //dump('paramLoop');
      var c = func[i++];
      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
          case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
          case 'L': { // literal
            i++; // skip basic type
            var end = func.indexOf('E', i);
            var size = end - i;
            list.push(func.substr(i, size));
            i += size + 2; // size + 'EE'
            break;
          }
          case 'A': { // array
            var size = parseInt(func.substr(i));
            i += size.toString().length;
            if (func[i] !== '_') throw '?';
            i++; // skip _
            list.push(parse(true, 1, true)[0] + ' [' + size + ']');
            break;
          }
          case 'E': break paramLoop;
          default: ret += '?' + c; break paramLoop;
        }
      }
    }
    if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
    return rawList ? list : ret + flushList();
  }
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    return parse();
  } catch(e) {
    return func;
  }
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}

var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 64000000;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;

var totalMemory = 4096;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be more reasonable');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'JS engine does not provide full typed array support');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools

// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===





STATIC_BASE = 8;

STATICTOP = STATIC_BASE + Runtime.alignMemory(8371);
/* global initializers */ __ATINIT__.push();


/* memory initializer */ allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,138,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,97,116,97,47,100,49,46,97,116,114,0,0,0,0,0,64,0,0,0,0,0,0,0,32,3,0,0,0,0,0,0,88,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,68,76,95,83,101,116,86,105,100,101,111,77,111,100,101,40,41,32,102,97,105,108,101,100,58,32,37,115,33,10,0,65,56,69,32,48,46,49,98,32,40,99,41,32,83,97,115,99,104,97,32,83,112,114,105,110,103,101,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,8,0,0,0,1,0,0,0,10,0,0,0,8,0,0,0,2,0,0,0,8,0,0,0,8,0,0,0,3,0,0,0,16,0,0,0,8,0,0,0,4,0,0,0,8,0,0,0,16,0,0,0,5,0,0,0,16,0,0,0,16,0,0,0,6,0,0,0,8,0,0,0,32,0,0,0,7,0,0,0,4,0,0,0,32,0,0,0,8,0,0,0,4,0,0,0,16,0,0,0,9,0,0,0,2,0,0,0,16,0,0,0,10,0,0,0,1,0,0,0,16,0,0,0,11,0,0,0,2,0,0,0,8,0,0,0,12,0,0,0,1,0,0,0,8,0,0,0,13,0,0,0,1,0,0,0,8,0,0,0,14,0,0,0,0,208,0,0,1,0,0,0,1,208,0,0,2,0,0,0,2,208,0,0,3,0,0,0,3,208,0,0,4,0,0,0,4,208,0,0,5,0,0,0,5,208,0,0,6,0,0,0,6,208,0,0,7,0,0,0,7,208,0,0,8,0,0,0,8,208,0,0,9,0,0,0,9,208,0,0,10,0,0,0,10,208,0,0,11,0,0,0,11,208,0,0,12,0,0,0,12,208,0,0,13,0,0,0,13,208,0,0,14,0,0,0,14,208,0,0,15,0,0,0,15,208,0,0,16,0,0,0,16,208,0,1,17,0,0,0,17,208,0,1,18,0,0,0,18,208,0,1,19,0,0,0,19,208,0,0,20,0,0,0,20,208,0,1,21,0,0,0,21,208,0,15,22,0,0,0,22,208,0,15,23,0,0,0,23,208,0,15,24,0,0,0,24,208,0,15,25,0,0,0,25,208,0,15,26,0,0,0,26,208,0,15,27,0,0,0,27,208,0,255,28,0,0,0,28,208,0,255,29,0,0,0,29,208,0,255,30,0,0,0,30,208,0,255,31,0,0,0,31,208,0,7,32,0,0,0,0,210,0,255,33,0,0,0,1,210,0,255,34,0,0,0,2,210,0,255,35,0,0,0,3,210,0,255,36,0,0,0,4,210,0,255,37,0,0,0,5,210,0,255,38,0,0,0,6,210,0,255,39,0,0,0,7,210,0,255,40,0,0,0,8,210,0,255,41,0,0,0,9,210,0,255,40,0,0,0,10,210,0,255,42,0,0,0,11,210,0,255,43,0,0,0,13,210,0,255,44,0,0,0,14,210,0,255,45,0,0,0,15,210,0,255,46,0,0,0,0,211,255,255,47,0,0,0,1,211,253,253,48,0,0,0,2,211,0,60,49,0,0,0,3,211,0,60,50,0,0,0,0,212,0,255,51,0,0,0,1,212,0,255,52,0,0,0,2,212,0,255,53,0,0,0,3,212,0,255,54,0,0,0,4,212,0,255,55,0,0,0,5,212,0,255,56,0,0,0,7,212,0,255,57,0,0,0,9,212,0,255,58,0,0,0,10,212,0,255,59,0,0,0,11,212,0,0,60,0,0,0,12,212,0,255,61,0,0,0,13,212,0,255,62,0,0,0,14,212,0,255,63,0,0,0,15,212,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,97,116,97,47,65,84,65,82,73,66,65,83,46,82,79,77,0,0,0,0,0,0,0,114,98,0,0,0,0,0,0,100,97,116,97,47,65,84,65,82,73,88,76,46,82,79,77,0,0,0,0,0,0,0,0,100,97,116,97,47,100,49,0,255,255,255,255,255,255,255,255,52,44,255,255,255,12,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,33,255,255,255,255,255,255,6,255,255,255,255,32,54,34,38,50,31,30,26,24,29,27,51,53,48,255,2,255,55,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,14,7,15,255,255,28,63,21,18,58,42,56,61,57,13,1,5,0,37,35,8,10,47,40,62,45,11,16,46,22,43,23,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,17,255,255,255,255,60,39,255,255,255,255,255,255,255,255,255,255,255,255,60,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,96,100,64,0,0,0,0,0,192,98,64,0,0,0,0,0,64,91,64,0,0,0,0,0,0,69,64,0,0,0,0,0,0,49,64,0,0,0,0,0,0,8,192,0,0,0,0,0,0,44,192,0,0,0,0,0,0,58,192,0,0,0,0,0,128,74,192,0,0,0,0,0,0,84,192,0,0,0,0,0,192,90,192,0,0,0,0,0,192,96,192,0,0,0,0,0,32,100,192,0,0,0,0,0,128,103,192,0,0,0,0,0,160,104,192,0,1,2,4,0,0,0,0,1,2,4,8,0,0,0,0,83,68,76,95,67,114,101,97,116,101,82,71,66,83,117,114,102,97,99,101,40,41,32,102,97,105,108,101,100,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,56,69,32,48,46,49,98,32,40,99,41,32,83,97,115,99,104,97,32,83,112,114,105,110,103,101,114,32,32,91,37,100,93,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,56,69,32,48,46,49,98,32,40,99,41,32,83,97,115,99,104,97,32,83,112,114,105,110,103,101,114,32,32,91,45,93,0,0,0,0,0,0,0,85,110,115,117,112,112,111,114,116,101,100,32,83,73,79,32,99,111,109,109,97,110,100,32,36,37,48,50,88,33,10,0,0,0,0,0,0,0,0,0,169,0,2,0,173,0,4,1,165,0,3,2,161,0,6,5,177,0,5,6,181,0,4,7,189,0,4,9,185,0,4,10,162,1,2,0,174,1,4,1,166,1,3,2,182,1,4,8,190,1,4,10,160,2,2,0,172,2,4,1,164,2,3,2,180,2,4,7,188,2,4,9,141,3,4,1,133,3,3,2,129,3,6,5,145,3,6,6,149,3,4,7,157,3,5,9,153,3,5,10,142,4,4,1,134,4,3,2,150,4,4,8,140,5,4,1,132,5,3,2,148,5,4,7,170,6,2,4,168,7,2,4,186,8,2,4,138,9,2,4,154,10,2,4,152,11,2,4,105,12,2,0,109,12,4,1,101,12,3,2,97,12,6,5,113,12,5,6,117,12,4,7,125,12,4,9,121,12,4,10,41,13,2,0,45,13,4,1,37,13,3,2,33,13,6,5,49,13,5,6,53,13,4,7,61,13,4,9,57,13,4,10,73,14,2,0,77,14,4,1,69,14,3,2,65,14,6,5,81,14,5,6,85,14,4,7,93,14,4,9,89,14,4,10,9,15,2,0,13,15,4,1,5,15,3,2,1,15,6,5,17,15,5,6,21,15,4,7,29,15,4,9,25,15,4,10,233,16,2,0,237,16,4,1,229,16,3,2,225,16,6,5,241,16,5,6,245,16,4,7,253,16,4,9,249,16,4,10,206,17,6,1,198,17,5,2,214,17,6,7,222,17,7,9,202,18,2,4,136,19,2,4,238,20,6,1,230,20,5,2,246,20,6,7,254,20,7,9,232,21,2,4,200,22,2,4,14,23,6,1,6,23,5,2,10,23,2,3,22,23,6,7,30,23,7,9,78,24,6,1,70,24,5,2,74,24,2,3,86,24,6,7,94,24,7,9,46,25,6,1,38,25,5,2,42,25,2,3,54,25,6,7,62,25,7,9,110,26,6,1,102,26,5,2,106,26,2,3,118,26,6,7,126,26,7,9,44,27,4,1,36,27,3,2,201,28,2,0,205,28,4,1,197,28,3,2,193,28,6,5,209,28,5,6,213,28,4,7,221,28,4,9,217,28,4,10,224,29,2,0,236,29,4,1,228,29,3,2,192,30,2,0,204,30,4,1,196,30,3,2,144,31,2,11,176,32,2,11,240,33,2,11,48,34,2,11,208,35,2,11,16,36,2,11,80,37,2,11,112,38,2,11,0,39,7,4,76,40,3,1,108,40,5,12,32,41,6,1,234,42,2,4,64,43,6,4,96,44,6,4,24,45,2,4,216,46,2,4,88,47,2,4,184,48,2,4,56,49,2,4,248,50,2,4,120,51,2,4,72,52,3,4,8,53,3,4,104,54,4,4,40,55,4,4,167,57,3,2,183,57,4,8,175,57,4,1,191,57,4,10,163,57,6,5,179,57,5,6,7,58,5,2,23,58,6,7,15,58,6,1,31,58,7,9,27,58,7,10,3,58,8,5,19,58,8,6,26,42,2,4,58,42,2,4,90,42,2,4,122,42,2,4,218,42,2,4,250,42,2,4,171,59,2,0,135,60,3,2,151,60,4,8,131,60,6,5,143,60,4,1,4,61,3,2,20,61,4,7,52,61,4,7,68,61,3,2,84,61,4,7,100,61,3,2,116,61,4,7,128,61,2,0,130,61,2,0,137,61,2,0,194,61,2,0,212,61,4,7,226,61,2,0,244,61,4,7,12,62,4,1,28,62,4,9,60,62,4,9,92,62,4,9,124,62,4,9,220,62,4,9,252,62,4,9,75,63,2,0,231,64,5,2,247,64,6,7,239,64,6,1,255,64,7,9,251,64,7,10,227,64,8,5,243,64,8,6,71,65,5,2,87,65,6,7,79,65,6,1,95,65,7,9,91,65,7,10,67,65,8,5,83,65,8,6,39,66,5,2,55,66,6,7,47,66,6,1,63,66,7,9,59,66,7,10,35,66,8,5,51,66,8,6,11,67,2,0,43,67,2,0,139,68,2,0,0,0,0,0,76,68,65,0,0,0,0,0,76,68,88,0,0,0,0,0,76,68,89,0,0,0,0,0,83,84,65,0,0,0,0,0,83,84,88,0,0,0,0,0,83,84,89,0,0,0,0,0,84,65,88,0,0,0,0,0,84,65,89,0,0,0,0,0,84,83,88,0,0,0,0,0,84,88,65,0,0,0,0,0,84,88,83,0,0,0,0,0,84,89,65,0,0,0,0,0,65,68,67,0,0,0,0,0,65,78,68,0,0,0,0,0,69,79,82,0,0,0,0,0,79,82,65,0,0,0,0,0,83,66,67,0,0,0,0,0,68,69,67,0,0,0,0,0,68,69,88,0,0,0,0,0,68,69,89,0,0,0,0,0,73,78,67,0,0,0,0,0,73,78,88,0,0,0,0,0,73,78,89,0,0,0,0,0,65,83,76,0,0,0,0,0,76,83,82,0,0,0,0,0,82,79,76,0,0,0,0,0,82,79,82,0,0,0,0,0,66,73,84,0,0,0,0,0,67,77,80,0,0,0,0,0,67,80,88,0,0,0,0,0,67,80,89,0,0,0,0,0,66,67,67,0,0,0,0,0,66,67,83,0,0,0,0,0,66,69,81,0,0,0,0,0,66,77,73,0,0,0,0,0,66,78,69,0,0,0,0,0,66,80,76,0,0,0,0,0,66,86,67,0,0,0,0,0,66,86,83,0,0,0,0,0,66,82,75,0,0,0,0,0,74,77,80,0,0,0,0,0,74,83,82,0,0,0,0,0,78,79,80,0,0,0,0,0,82,84,73,0,0,0,0,0,82,84,83,0,0,0,0,0,67,76,67,0,0,0,0,0,67,76,68,0,0,0,0,0,67,76,73,0,0,0,0,0,67,76,86,0,0,0,0,0,83,69,67,0,0,0,0,0,83,69,68,0,0,0,0,0,83,69,73,0,0,0,0,0,80,72,65,0,0,0,0,0,80,72,80,0,0,0,0,0,80,76,65,0,0,0,0,0,80,76,80,0,0,0,0,0,63,63,63,0,0,0,0,0,208,18,0,0,216,18,0,0,224,18,0,0,232,18,0,0,240,18,0,0,248,18,0,0,0,19,0,0,8,19,0,0,16,19,0,0,24,19,0,0,32,19,0,0,40,19,0,0,48,19,0,0,56,19,0,0,64,19,0,0,72,19,0,0,80,19,0,0,88,19,0,0,96,19,0,0,104,19,0,0,112,19,0,0,120,19,0,0,128,19,0,0,136,19,0,0,144,19,0,0,152,19,0,0,160,19,0,0,168,19,0,0,176,19,0,0,184,19,0,0,192,19,0,0,200,19,0,0,208,19,0,0,216,19,0,0,224,19,0,0,232,19,0,0,240,19,0,0,248,19,0,0,0,20,0,0,8,20,0,0,16,20,0,0,24,20,0,0,32,20,0,0,40,20,0,0,48,20,0,0,56,20,0,0,64,20,0,0,72,20,0,0,80,20,0,0,88,20,0,0,96,20,0,0,104,20,0,0,112,20,0,0,120,20,0,0,128,20,0,0,136,20,0,0,144,20,0,0,96,30,0,0,104,30,0,0,112,30,0,0,120,30,0,0,128,30,0,0,136,30,0,0,144,30,0,0,152,30,0,0,160,30,0,0,168,30,0,0,176,30,0,0,184,30,0,0,0,0,0,0,15,0,0,0,16,0,0,0,17,0,0,0,18,0,0,0,19,0,0,0,20,0,0,0,21,0,0,0,22,0,0,0,23,0,0,0,24,0,0,0,25,0,0,0,26,0,0,0,27,0,0,0,28,0,0,0,29,0,0,0,30,0,0,0,31,0,0,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,37,0,0,0,38,0,0,0,39,0,0,0,40,0,0,0,41,0,0,0,42,0,0,0,43,0,0,0,44,0,0,0,45,0,0,0,46,0,0,0,47,0,0,0,48,0,0,0,49,0,0,0,50,0,0,0,51,0,0,0,52,0,0,0,53,0,0,0,54,0,0,0,55,0,0,0,56,0,0,0,57,0,0,0,58,0,0,0,59,0,0,0,60,0,0,0,61,0,0,0,62,0,0,0,63,0,0,0,64,0,0,0,65,0,0,0,66,0,0,0,67,0,0,0,68,0,0,0,69,0,0,0,70,0,0,0,71,0,0,0,72,0,0,0,73,0,0,0,74,0,0,0,75,0,0,0,76,0,0,0,77,0,0,0,78,0,0,0,79,0,0,0,80,0,0,0,81,0,0,0,82,0,0,0,83,0,0,0,0,0,0,0,84,0,0,0,85,0,0,0,86,0,0,0,87,0,0,0,88,0,0,0,89,0,0,0,90,0,0,0,91,0,0,0,92,0,0,0,93,0,0,0,94,0,0,0,95,0,0,0,96,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,0,0,0,0,0,0,10,11,12,13,14,15,16,17,18,19,0,0,0,0,0,0,20,21,22,23,24,25,26,27,28,29,0,0,0,0,0,0,30,31,32,33,34,35,36,37,38,39,0,0,0,0,0,0,40,41,42,43,44,45,46,47,48,49,0,0,0,0,0,0,50,51,52,53,54,55,56,57,58,59,0,0,0,0,0,0,60,61,62,63,64,65,66,67,68,69,0,0,0,0,0,0,70,71,72,73,74,75,76,77,78,79,0,0,0,0,0,0,80,81,82,83,84,85,86,87,88,89,0,0,0,0,0,0,90,91,92,93,94,95,96,97,98,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,16,17,18,19,20,21,22,23,24,25,32,33,34,35,36,37,38,39,40,41,48,49,50,51,52,53,54,55,56,57,64,65,66,67,68,69,70,71,72,73,80,81,82,83,84,85,86,87,88,89,96,97,98,99,100,101,102,103,104,105,112,113,114,115,116,117,118,119,120,121,128,129,130,131,132,133,134,135,136,137,144,145,146,147,148,149,150,151,152,153,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,48,52,88,58,32,37,48,50,88,32,0,0,0,0,0,37,48,50,88,32,32,32,32,32,37,115,32,35,36,37,48,50,88,10,0,0,0,0,0,37,48,50,88,32,37,48,50,88,32,32,37,115,32,36,37,48,52,88,10,0,0,0,0,37,48,50,88,32,32,32,32,32,37,115,32,36,37,48,50,88,10,0,0,0,0,0,0,32,32,32,32,32,32,32,37,115,32,65,10,0,0,0,0,37,48,50,88,32,32,32,32,32,37,115,32,40,36,37,48,50,88,44,88,41,10,0,0,37,48,50,88,32,32,32,32,32,37,115,32,40,36,37,48,50,88,41,44,89,10,0,0,37,48,50,88,32,32,32,32,32,37,115,32,36,37,48,50,88,44,88,10,0,0,0,0,37,48,50,88,32,32,32,32,32,37,115,32,36,37,48,50,88,44,89,10,0,0,0,0,37,48,50,88,32,37,48,50,88,32,32,37,115,32,36,37,48,52,88,44,88,10,0,0,37,48,50,88,32,37,48,50,88,32,32,37,115,32,36,37,48,52,88,44,89,10,0,0,37,48,50,88,32,32,32,32,32,37,115,32,36,37,48,52,88,10,0,0,0,0,0,0,37,48,50,88,32,37,48,50,88,32,32,37,115,32,40,36,37,48,52,88,41,10,0,0,32,32,32,32,32,32,32,37,115,10,0,0,0,0,0,0,37,48,50,88,32,37,48,50,88,32,32,37,115,32,36,37,48,52,88,32,32,32,40,36,37,48,50,88,41,10,0,0,37,48,50,88,32,32,32,32,32,37,115,32,36,37,48,50,88,32,32,32,32,32,40,36,37,48,50,88,41,10,0,0,37,48,50,88,32,32,32,32,32,37,115,32,40,36,37,48,50,88,44,88,41,32,40,36,37,48,52,88,58,36,37,48,50,88,41,10,0,0,0,0,37,48,50,88,32,32,32,32,32,37,115,32,40,36,37,48,50,88,41,44,89,32,40,36,37,48,52,88,58,36,37,48,50,88,41,10,0,0,0,0,37,48,50,88,32,32,32,32,32,37,115,32,36,37,48,50,88,44,88,32,32,32,40,36,37,48,52,88,58,36,37,48,50,88,41,10,0,0,0,0,37,48,50,88,32,32,32,32,32,37,115,32,36,37,48,50,88,44,89,32,32,32,40,36,37,48,52,88,58,36,37,48,50,88,41,10,0,0,0,0,37,48,50,88,32,37,48,50,88,32,32,37,115,32,36,37,48,50,88,37,48,50,88,44,88,32,40,36,37,48,52,88,58,36,37,48,50,88,41,10,0,0,0,0,0,0,0,0,37,48,50,88,32,37,48,50,88,32,32,37,115,32,36,37,48,50,88,37,48,50,88,44,89,32,40,36,37,48,52,88,58,36,37,48,50,88,41,10,0,0,0,0,0,0,0,0,110,118,95,98,100,105,122,99,0,0,0,0,0,0,0,0,80,67,58,37,48,52,88,32,65,58,37,48,50,88,32,88,58,37,48,50,88,32,89,58,37,48,50,88,32,83,80,58,49,37,48,50,88,32,80,83,58,37,48,50,88,32,40,0,37,115,41,0,0,0,0,0,10,80,67,32,61,32,36,37,48,52,88,44,32,83,80,32,61,32,36,48,49,37,48,50,88,10,0,0,0,0,0,0,36,48,49,37,48,50,88,58,32,36,37,48,50,88,10,0,10,0,0,0,0,0,0,0,76,65,88,0,0,0,0,0,83,76,79,0,0,0,0,0,65,84,88,0,0,0,0,0,65,65,88,0,0,0,0,0,68,79,80,0,0,0,0,0,84,79,80,0,0,0,0,0,65,83,82,0,0,0,0,0,73,83,67,0,0,0,0,0,83,82,69,0,0,0,0,0,82,76,65,0,0,0,0,0,65,65,67,0,0,0,0,0,88,65,65,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);




var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


  function _llvm_lifetime_end() {}

  
   
  Module["_rand_r"] = _rand_r;
  
  var ___rand_seed=allocate([0x0273459b, 0, 0, 0], "i32", ALLOC_STATIC); 
  Module["_rand"] = _rand;

  
  var GL={counter:1,lastError:0,buffers:[],programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],currArrayBuffer:0,currElementArrayBuffer:0,byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],programInfos:{},stringCache:{},packAlignment:4,unpackAlignment:4,init:function () {
        GL.createLog2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        Browser.moduleContextCreatedCallbacks.push(GL.initExtensions);
      },recordError:function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },getNewId:function (table) {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },MINI_TEMP_BUFFER_SIZE:16,miniTempBuffer:null,miniTempBufferViews:[0],MAX_TEMP_BUFFER_SIZE:2097152,tempVertexBuffers1:[],tempVertexBufferCounters1:[],tempVertexBuffers2:[],tempVertexBufferCounters2:[],numTempVertexBuffersPerSize:64,tempIndexBuffers:[],tempQuadIndexBuffer:null,log2ceilLookup:null,createLog2ceilLookup:function (maxValue) {
        GL.log2ceilLookup = new Uint8Array(maxValue+1);
        var log2 = 0;
        var pow2 = 1;
        GL.log2ceilLookup[0] = 0;
        for(var i = 1; i <= maxValue; ++i) {
          if (i > pow2) {
            pow2 <<= 1;
            ++log2;
          }
          GL.log2ceilLookup[i] = log2;
        }
      },generateTempBuffers:function (quads) {
        var largestIndex = GL.log2ceilLookup[GL.MAX_TEMP_BUFFER_SIZE];
        GL.tempVertexBufferCounters1.length = GL.tempVertexBufferCounters2.length = largestIndex+1;
        GL.tempVertexBuffers1.length = GL.tempVertexBuffers2.length = largestIndex+1;
        GL.tempIndexBuffers.length = largestIndex+1;
        for(var i = 0; i <= largestIndex; ++i) {
          GL.tempIndexBuffers[i] = null; // Created on-demand
          GL.tempVertexBufferCounters1[i] = GL.tempVertexBufferCounters2[i] = 0;
          var ringbufferLength = GL.numTempVertexBuffersPerSize;
          GL.tempVertexBuffers1[i] = [];
          GL.tempVertexBuffers2[i] = [];
          var ringbuffer1 = GL.tempVertexBuffers1[i];
          var ringbuffer2 = GL.tempVertexBuffers2[i];
          ringbuffer1.length = ringbuffer2.length = ringbufferLength;
          for(var j = 0; j < ringbufferLength; ++j) {
            ringbuffer1[j] = ringbuffer2[j] = null; // Created on-demand
          }
        }
  
        if (quads) {
          // GL_QUAD indexes can be precalculated
          GL.tempQuadIndexBuffer = GLctx.createBuffer();
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, quadIndexes, GLctx.STATIC_DRAW);
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, null);
        }
      },getTempVertexBuffer:function getTempVertexBuffer(sizeBytes) {
        var idx = GL.log2ceilLookup[sizeBytes];
        var ringbuffer = GL.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.tempVertexBufferCounters1[idx];
        GL.tempVertexBufferCounters1[idx] = (GL.tempVertexBufferCounters1[idx]+1) & (GL.numTempVertexBuffersPerSize-1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
          return vbo;
        }
        var prevVBO = GLctx.getParameter(GLctx.ARRAY_BUFFER_BINDING);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(GLctx.ARRAY_BUFFER, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(GLctx.ARRAY_BUFFER, 1 << idx, GLctx.DYNAMIC_DRAW);
        GLctx.bindBuffer(GLctx.ARRAY_BUFFER, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
      },getTempIndexBuffer:function getTempIndexBuffer(sizeBytes) {
        var idx = GL.log2ceilLookup[sizeBytes];
        var ibo = GL.tempIndexBuffers[idx];
        if (ibo) {
          return ibo;
        }
        var prevIBO = GLctx.getParameter(GLctx.ELEMENT_ARRAY_BUFFER_BINDING);
        GL.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.tempIndexBuffers[idx]);
        GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, 1 << idx, GLctx.DYNAMIC_DRAW);
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, prevIBO);
        return GL.tempIndexBuffers[idx];
      },newRenderingFrameStarted:function newRenderingFrameStarted() {
        var vb = GL.tempVertexBuffers1;
        GL.tempVertexBuffers1 = GL.tempVertexBuffers2;
        GL.tempVertexBuffers2 = vb;
        vb = GL.tempVertexBufferCounters1;
        GL.tempVertexBufferCounters1 = GL.tempVertexBufferCounters2;
        GL.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup[GL.MAX_TEMP_BUFFER_SIZE];
        for(var i = 0; i <= largestIndex; ++i) {
          GL.tempVertexBufferCounters1[i] = 0;
        }
      },findToken:function (source, token) {
        function isIdentChar(ch) {
          if (ch >= 48 && ch <= 57) // 0-9
            return true;
          if (ch >= 65 && ch <= 90) // A-Z
            return true;
          if (ch >= 97 && ch <= 122) // a-z
            return true;
          return false;
        }
        var i = -1;
        do {
          i = source.indexOf(token, i + 1);
          if (i < 0) {
            break;
          }
          if (i > 0 && isIdentChar(source[i - 1])) {
            continue;
          }
          i += token.length;
          if (i < source.length - 1 && isIdentChar(source[i + 1])) {
            continue;
          }
          return true;
        } while (true);
        return false;
      },getSource:function (shader, count, string, length) {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var frag;
          if (length) {
            var len = HEAP32[(((length)+(i*4))>>2)];
            if (len < 0) {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
            } else {
              frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)], len);
            }
          } else {
            frag = Pointer_stringify(HEAP32[(((string)+(i*4))>>2)]);
          }
          source += frag;
        }
        // Let's see if we need to enable the standard derivatives extension
        type = GLctx.getShaderParameter(GL.shaders[shader], 0x8B4F /* GL_SHADER_TYPE */);
        if (type == 0x8B30 /* GL_FRAGMENT_SHADER */) {
          if (GL.findToken(source, "dFdx") ||
              GL.findToken(source, "dFdy") ||
              GL.findToken(source, "fwidth")) {
            source = "#extension GL_OES_standard_derivatives : enable\n" + source;
            var extension = GLctx.getExtension("OES_standard_derivatives");
          }
        }
        return source;
      },computeImageSize:function (width, height, sizePerPixel, alignment) {
        function roundedToNextMultipleOf(x, y) {
          return Math.floor((x + y - 1) / y) * y
        }
        var plainRowSize = width * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
        return (height <= 0) ? 0 :
                 ((height - 1) * alignedRowSize + plainRowSize);
      },get:function (name_, p, type) {
        // Guard against user passing a null pointer.
        // Note that GLES2 spec does not say anything about how passing a null pointer should be treated.
        // Testing on desktop core GL 3, the application crashes on glGetIntegerv to a null pointer, but
        // better to report an error instead of doing anything random.
        if (!p) {
          GL.recordError(0x0501 /* GL_INVALID_VALUE */);
          return;
        }
        var ret = undefined;
        switch(name_) { // Handle a few trivial GLES values
          case 0x8DFA: // GL_SHADER_COMPILER
            ret = 1;
            break;
          case 0x8DF8: // GL_SHADER_BINARY_FORMATS
            if (type !== 'Integer') {
              GL.recordError(0x0500); // GL_INVALID_ENUM
            }
            return; // Do not write anything to the out pointer, since no binary formats are supported.
          case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
            ret = 0;
            break;
          case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
            // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be queried for length),
            // so implement it ourselves to allow C++ GLES2 code get the length.
            var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
            ret = formats.length;
            break;
          case 0x8B9A: // GL_IMPLEMENTATION_COLOR_READ_TYPE
            ret = 0x1401; // GL_UNSIGNED_BYTE
            break;
          case 0x8B9B: // GL_IMPLEMENTATION_COLOR_READ_FORMAT
            ret = 0x1908; // GL_RGBA
            break;
        }
  
        if (ret === undefined) {
          var result = GLctx.getParameter(name_);
          switch (typeof(result)) {
            case "number":
              ret = result;
              break;
            case "boolean":
              ret = result ? 1 : 0;
              break;
            case "string":
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
            case "object":
              if (result === null) {
                // null is a valid result for some (e.g., which buffer is bound - perhaps nothing is bound), but otherwise
                // can mean an invalid name_, which we need to report as an error
                switch(name_) {
                  case 0x8894: // ARRAY_BUFFER_BINDING
                  case 0x8B8D: // CURRENT_PROGRAM
                  case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                  case 0x8CA6: // FRAMEBUFFER_BINDING
                  case 0x8CA7: // RENDERBUFFER_BINDING
                  case 0x8069: // TEXTURE_BINDING_2D
                  case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                    ret = 0;
                    break;
                  }
                  default: {
                    GL.recordError(0x0500); // GL_INVALID_ENUM
                    return;
                  }
                }
              } else if (result instanceof Float32Array ||
                         result instanceof Uint32Array ||
                         result instanceof Int32Array ||
                         result instanceof Array) {
                for (var i = 0; i < result.length; ++i) {
                  switch (type) {
                    case 'Integer': HEAP32[(((p)+(i*4))>>2)]=result[i];   break;
                    case 'Float':   HEAPF32[(((p)+(i*4))>>2)]=result[i]; break;
                    case 'Boolean': HEAP8[(((p)+(i))|0)]=result[i] ? 1 : 0;    break;
                    default: throw 'internal glGet error, bad type: ' + type;
                  }
                }
                return;
              } else if (result instanceof WebGLBuffer ||
                         result instanceof WebGLProgram ||
                         result instanceof WebGLFramebuffer ||
                         result instanceof WebGLRenderbuffer ||
                         result instanceof WebGLTexture) {
                ret = result.name | 0;
              } else {
                GL.recordError(0x0500); // GL_INVALID_ENUM
                return;
              }
              break;
            default:
              GL.recordError(0x0500); // GL_INVALID_ENUM
              return;
          }
        }
  
        switch (type) {
          case 'Integer': HEAP32[((p)>>2)]=ret;    break;
          case 'Float':   HEAPF32[((p)>>2)]=ret;  break;
          case 'Boolean': HEAP8[(p)]=ret ? 1 : 0; break;
          default: throw 'internal glGet error, bad type: ' + type;
        }
      },getTexPixelData:function (type, format, width, height, pixels, internalFormat) {
        var sizePerPixel;
        switch (type) {
          case 0x1401 /* GL_UNSIGNED_BYTE */:
            switch (format) {
              case 0x1906 /* GL_ALPHA */:
              case 0x1909 /* GL_LUMINANCE */:
                sizePerPixel = 1;
                break;
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4;
                break;
              case 0x190A /* GL_LUMINANCE_ALPHA */:
                sizePerPixel = 2;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1403 /* GL_UNSIGNED_SHORT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 2;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x1405 /* GL_UNSIGNED_INT */:
            if (format == 0x1902 /* GL_DEPTH_COMPONENT */) {
              sizePerPixel = 4;
            } else {
              throw 'Invalid format (' + format + ')';
            }
            break;
          case 0x84FA /* UNSIGNED_INT_24_8_WEBGL */:
            sizePerPixel = 4;
            break;
          case 0x8363 /* GL_UNSIGNED_SHORT_5_6_5 */:
          case 0x8033 /* GL_UNSIGNED_SHORT_4_4_4_4 */:
          case 0x8034 /* GL_UNSIGNED_SHORT_5_5_5_1 */:
            sizePerPixel = 2;
            break;
          case 0x1406 /* GL_FLOAT */:
            switch (format) {
              case 0x1907 /* GL_RGB */:
                sizePerPixel = 3*4;
                break;
              case 0x1908 /* GL_RGBA */:
                sizePerPixel = 4*4;
                break;
              default:
                throw 'Invalid format (' + format + ')';
            }
            internalFormat = GLctx.RGBA;
            break;
          default:
            throw 'Invalid type (' + type + ')';
        }
        var bytes = GL.computeImageSize(width, height, sizePerPixel, GL.unpackAlignment);
        if (type == 0x1401 /* GL_UNSIGNED_BYTE */) {
          pixels = HEAPU8.subarray((pixels),(pixels+bytes));
        } else if (type == 0x1406 /* GL_FLOAT */) {
          pixels = HEAPF32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else if (type == 0x1405 /* GL_UNSIGNED_INT */ || type == 0x84FA /* UNSIGNED_INT_24_8_WEBGL */) {
          pixels = HEAPU32.subarray((pixels)>>2,(pixels+bytes)>>2);
        } else {
          pixels = HEAPU16.subarray((pixels)>>1,(pixels+bytes)>>1);
        }
        return {
          pixels: pixels,
          internalFormat: internalFormat
        }
      },initExtensions:function () {
        if (GL.initExtensions.done) return;
        GL.initExtensions.done = true;
  
        if (!Module.useWebGL) return; // an app might link both gl and 2d backends
  
        GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
          GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i+1);
        }
  
        GL.maxVertexAttribs = GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);
  
        // Detect the presence of a few extensions manually, this GL interop layer itself will need to know if they exist. 
        GL.compressionExt = GLctx.getExtension('WEBGL_compressed_texture_s3tc') ||
                            GLctx.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
                            GLctx.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
  
        GL.anisotropicExt = GLctx.getExtension('EXT_texture_filter_anisotropic') ||
                            GLctx.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
                            GLctx.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
  
        GL.floatExt = GLctx.getExtension('OES_texture_float');
        
        // Extension available from Firefox 26 and Google Chrome 30
        GL.instancedArraysExt = GLctx.getExtension('ANGLE_instanced_arrays');
        
        // Extension available from Firefox 25 and WebKit
        GL.vaoExt = Module.ctx.getExtension('OES_vertex_array_object');
  
        // These are the 'safe' feature-enabling extensions that don't add any performance impact related to e.g. debugging, and
        // should be enabled by default so that client GLES2/GL code will not need to go through extra hoops to get its stuff working.
        // As new extensions are ratified at http://www.khronos.org/registry/webgl/extensions/ , feel free to add your new extensions
        // here, as long as they don't produce a performance impact for users that might not be using those extensions.
        // E.g. debugging-related extensions should probably be off by default.
        var automaticallyEnabledExtensions = [ "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives",
                                               "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture",
                                               "OES_element_index_uint", "EXT_texture_filter_anisotropic", "ANGLE_instanced_arrays",
                                               "OES_texture_float_linear", "OES_texture_half_float_linear", "WEBGL_compressed_texture_atc",
                                               "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float",
                                               "EXT_frag_depth", "EXT_sRGB", "WEBGL_draw_buffers", "WEBGL_shared_resources" ];
  
        function shouldEnableAutomatically(extension) {
          for(var i in automaticallyEnabledExtensions) {
            var include = automaticallyEnabledExtensions[i];
            if (ext.indexOf(include) != -1) {
              return true;
            }
          }
          return false;
        }
  
        var extensions = GLctx.getSupportedExtensions();
        for(var e in extensions) {
          var ext = extensions[e].replace('MOZ_', '').replace('WEBKIT_', '');
          if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
            GLctx.getExtension(ext); // Calling .getExtension enables that extension permanently, no need to store the return value to be enabled.
          }
        }
      },populateUniformTable:function (program) {
        var p = GL.programs[program];
        GL.programInfos[program] = {
          uniforms: {},
          maxUniformLength: 0, // This is eagerly computed below, since we already enumerate all uniforms anyway.
          maxAttributeLength: -1 // This is lazily computed and cached, computed when/if first asked, "-1" meaning not computed yet.
        };
  
        var ptable = GL.programInfos[program];
        var utable = ptable.uniforms;
        // A program's uniform table maps the string name of an uniform to an integer location of that uniform.
        // The global GL.uniforms map maps integer locations to WebGLUniformLocations.
        var numUniforms = GLctx.getProgramParameter(p, GLctx.ACTIVE_UNIFORMS);
        for (var i = 0; i < numUniforms; ++i) {
          var u = GLctx.getActiveUniform(p, i);
  
          var name = u.name;
          ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length+1);
  
          // Strip off any trailing array specifier we might have got, e.g. "[0]".
          if (name.indexOf(']', name.length-1) !== -1) {
            var ls = name.lastIndexOf('[');
            name = name.slice(0, ls);
          }
  
          // Optimize memory usage slightly: If we have an array of uniforms, e.g. 'vec3 colors[3];', then 
          // only store the string 'colors' in utable, and 'colors[0]', 'colors[1]' and 'colors[2]' will be parsed as 'colors'+i.
          // Note that for the GL.uniforms table, we still need to fetch the all WebGLUniformLocations for all the indices.
          var loc = GLctx.getUniformLocation(p, name);
          var id = GL.getNewId(GL.uniforms);
          utable[name] = [u.size, id];
          GL.uniforms[id] = loc;
  
          for (var j = 1; j < u.size; ++j) {
            var n = name + '['+j+']';
            loc = GLctx.getUniformLocation(p, n);
            id = GL.getNewId(GL.uniforms);
  
            GL.uniforms[id] = loc;
          }
        }
      }};function _glTexCoord2f(u, v) {
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = u;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = v;
      GLImmediate.addRendererComponent(GLImmediate.TEXTURE0, 2, GLctx.FLOAT);
    }

  function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
      if (pixels) {
        var data = GL.getTexPixelData(type, format, width, height, pixels, internalFormat);
        pixels = data.pixels;
        internalFormat = data.internalFormat;
      } else {
        pixels = null;
      }
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
    }

  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

  
  
  
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          fileStore.createIndex('timestamp', 'timestamp', { unique: false });
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function() {
          callback(this.error);
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index('timestamp');
  
          index.openKeyCursor().onsuccess = function(event) {
            var cursor = event.target.result;
  
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries });
            }
  
            entries[cursor.primaryKey] = { timestamp: cursor.key };
  
            cursor.continue();
          };
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function() { callback(this.error); };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function() { done(this.error); };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          stream.position = position;
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },getStreamFromPtr:function (ptr) {
        return FS.streams[ptr - 1];
      },getPtrForStream:function (stream) {
        return stream ? stream.fd + 1 : 0;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            callback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=FS.getPtrForStream(stdin);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=FS.getPtrForStream(stdout);
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=FS.getPtrForStream(stderr);
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
  
              if (!hasByteServing) chunkSize = datalength;
  
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
  
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
  
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
  
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  var Browser={mainLoop:{scheduler:null,method:"",shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        
        // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
        // Module['forcedAspectRatio'] = 4 / 3;
        
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'] ||
                                    canvas['msRequestPointerLock'] ||
                                    function(){};
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 document['msExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
  
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        var errorInfo = '?';
        function onContextCreationError(event) {
          errorInfo = event.statusMessage || errorInfo;
        }
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
  
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
  
  
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
  
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          GLctx = Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        var canvasContainer = canvas.parentNode;
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement'] ||
               document['msFullScreenElement'] || document['msFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'] ||
                                      document['msExitFullscreen'] ||
                                      document['exitFullscreen'] ||
                                      function() {};
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else {
            
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            var canvasContainer = canvas.parentNode;
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            
            if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
          Browser.updateCanvasDimensions(canvas);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
          document.addEventListener('MSFullscreenChange', fullScreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullScreen = canvasContainer['requestFullScreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvasContainer.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        return Math.max(-1, Math.min(1, event.type === 'DOMMouseScroll' ? event.detail : -event.wheelDelta));
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (scrollX + rect.left);
              y = t.pageY - (scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (scrollX + rect.left);
            y = event.pageY - (scrollY + rect.top);
          }
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
             document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
             document['fullScreenElement'] || document['fullscreenElement'] ||
             document['msFullScreenElement'] || document['msFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      }};var SDL={defaults:{width:320,height:200,copyOnLock:true},version:null,surfaces:{},canvasPool:[],events:[],fonts:[null],audios:[null],rwops:[null],music:{audio:null,volume:1},mixerFrequency:22050,mixerFormat:32784,mixerNumChannels:2,mixerChunkSize:1024,channelMinimumNumber:0,GL:false,glAttributes:{0:3,1:3,2:2,3:0,4:0,5:1,6:16,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:1,16:0,17:0,18:0},keyboardState:null,keyboardMap:{},canRequestFullscreen:false,isRequestingFullscreen:false,textInput:false,startTime:null,initFlags:0,buttonState:0,modState:0,DOMButtons:[0,0,0],DOMEventToSDLEvent:{},keyCodes:{16:1249,17:1248,18:1250,33:1099,34:1102,37:1104,38:1106,39:1103,40:1105,46:127,96:1112,97:1113,98:1114,99:1115,100:1116,101:1117,102:1118,103:1119,104:1120,105:1121,112:1082,113:1083,114:1084,115:1085,116:1086,117:1087,118:1088,119:1089,120:1090,121:1091,122:1092,123:1093,173:45,188:44,190:46,191:47,192:96},scanCodes:{8:42,9:43,13:40,27:41,32:44,44:54,46:55,47:56,48:39,49:30,50:31,51:32,52:33,53:34,54:35,55:36,56:37,57:38,59:51,61:46,91:47,92:49,93:48,96:52,97:4,98:5,99:6,100:7,101:8,102:9,103:10,104:11,105:12,106:13,107:14,108:15,109:16,110:17,111:18,112:19,113:20,114:21,115:22,116:23,117:24,118:25,119:26,120:27,121:28,122:29,305:224,308:226},loadRect:function (rect) {
        return {
          x: HEAP32[((rect + 0)>>2)],
          y: HEAP32[((rect + 4)>>2)],
          w: HEAP32[((rect + 8)>>2)],
          h: HEAP32[((rect + 12)>>2)]
        };
      },loadColorToCSSRGB:function (color) {
        var rgba = HEAP32[((color)>>2)];
        return 'rgb(' + (rgba&255) + ',' + ((rgba >> 8)&255) + ',' + ((rgba >> 16)&255) + ')';
      },loadColorToCSSRGBA:function (color) {
        var rgba = HEAP32[((color)>>2)];
        return 'rgba(' + (rgba&255) + ',' + ((rgba >> 8)&255) + ',' + ((rgba >> 16)&255) + ',' + (((rgba >> 24)&255)/255) + ')';
      },translateColorToCSSRGBA:function (rgba) {
        return 'rgba(' + (rgba&0xff) + ',' + (rgba>>8 & 0xff) + ',' + (rgba>>16 & 0xff) + ',' + (rgba>>>24)/0xff + ')';
      },translateRGBAToCSSRGBA:function (r, g, b, a) {
        return 'rgba(' + (r&0xff) + ',' + (g&0xff) + ',' + (b&0xff) + ',' + (a&0xff)/255 + ')';
      },translateRGBAToColor:function (r, g, b, a) {
        return r | g << 8 | b << 16 | a << 24;
      },makeSurface:function (width, height, flags, usePageCanvas, source, rmask, gmask, bmask, amask) {
        flags = flags || 0;
        var is_SDL_HWSURFACE = flags & 0x00000001;
        var is_SDL_HWPALETTE = flags & 0x00200000;
        var is_SDL_OPENGL = flags & 0x04000000;
  
        var surf = _malloc(60);
        var pixelFormat = _malloc(44);
        //surface with SDL_HWPALETTE flag is 8bpp surface (1 byte)
        var bpp = is_SDL_HWPALETTE ? 1 : 4;
        var buffer = 0;
  
        // preemptively initialize this for software surfaces,
        // otherwise it will be lazily initialized inside of SDL_LockSurface
        if (!is_SDL_HWSURFACE && !is_SDL_OPENGL) {
          buffer = _malloc(width * height * 4);
        }
  
        HEAP32[((surf)>>2)]=flags;
        HEAP32[(((surf)+(4))>>2)]=pixelFormat;
        HEAP32[(((surf)+(8))>>2)]=width;
        HEAP32[(((surf)+(12))>>2)]=height;
        HEAP32[(((surf)+(16))>>2)]=width * bpp;  // assuming RGBA or indexed for now,
                                                                                          // since that is what ImageData gives us in browsers
        HEAP32[(((surf)+(20))>>2)]=buffer;
        HEAP32[(((surf)+(36))>>2)]=0;
        HEAP32[(((surf)+(56))>>2)]=1;
  
        HEAP32[((pixelFormat)>>2)]=0 /* XXX missing C define SDL_PIXELFORMAT_RGBA8888 */;
        HEAP32[(((pixelFormat)+(4))>>2)]=0;// TODO
        HEAP8[(((pixelFormat)+(8))|0)]=bpp * 8;
        HEAP8[(((pixelFormat)+(9))|0)]=bpp;
  
        HEAP32[(((pixelFormat)+(12))>>2)]=rmask || 0x000000ff;
        HEAP32[(((pixelFormat)+(16))>>2)]=gmask || 0x0000ff00;
        HEAP32[(((pixelFormat)+(20))>>2)]=bmask || 0x00ff0000;
        HEAP32[(((pixelFormat)+(24))>>2)]=amask || 0xff000000;
  
        // Decide if we want to use WebGL or not
        SDL.GL = SDL.GL || is_SDL_OPENGL;
        var canvas;
        if (!usePageCanvas) {
          if (SDL.canvasPool.length > 0) {
            canvas = SDL.canvasPool.pop();
          } else {
            canvas = document.createElement('canvas');
          }
          canvas.width = width;
          canvas.height = height;
        } else {
          canvas = Module['canvas'];
        }
  
        var webGLContextAttributes = {
          antialias: ((SDL.glAttributes[13 /*SDL_GL_MULTISAMPLEBUFFERS*/] != 0) && (SDL.glAttributes[14 /*SDL_GL_MULTISAMPLESAMPLES*/] > 1)),
          depth: (SDL.glAttributes[6 /*SDL_GL_DEPTH_SIZE*/] > 0),
          stencil: (SDL.glAttributes[7 /*SDL_GL_STENCIL_SIZE*/] > 0)
        };
        
        var ctx = Browser.createContext(canvas, is_SDL_OPENGL, usePageCanvas, webGLContextAttributes);
              
        SDL.surfaces[surf] = {
          width: width,
          height: height,
          canvas: canvas,
          ctx: ctx,
          surf: surf,
          buffer: buffer,
          pixelFormat: pixelFormat,
          alpha: 255,
          flags: flags,
          locked: 0,
          usePageCanvas: usePageCanvas,
          source: source,
  
          isFlagSet: function(flag) {
            return flags & flag;
          }
        };
  
        return surf;
      },copyIndexedColorData:function (surfData, rX, rY, rW, rH) {
        // HWPALETTE works with palette
        // setted by SDL_SetColors
        if (!surfData.colors) {
          return;
        }
        
        var fullWidth  = Module['canvas'].width;
        var fullHeight = Module['canvas'].height;
  
        var startX  = rX || 0;
        var startY  = rY || 0;
        var endX    = (rW || (fullWidth - startX)) + startX;
        var endY    = (rH || (fullHeight - startY)) + startY;
        
        var buffer  = surfData.buffer;
        var data    = surfData.image.data;
        var colors  = surfData.colors;
  
        for (var y = startY; y < endY; ++y) {
          var indexBase = y * fullWidth;
          var colorBase = indexBase * 4;
          for (var x = startX; x < endX; ++x) {
            // HWPALETTE have only 256 colors (not rgba)
            var index = HEAPU8[((buffer + indexBase + x)|0)] * 3;
            var colorOffset = colorBase + x * 4;
  
            data[colorOffset   ] = colors[index   ];
            data[colorOffset +1] = colors[index +1];
            data[colorOffset +2] = colors[index +2];
            //unused: data[colorOffset +3] = color[index +3];
          }
        }
      },freeSurface:function (surf) {
        var refcountPointer = surf + 56;
        var refcount = HEAP32[((refcountPointer)>>2)];
        if (refcount > 1) {
          HEAP32[((refcountPointer)>>2)]=refcount - 1;
          return;
        }
  
        var info = SDL.surfaces[surf];
        if (!info.usePageCanvas && info.canvas) SDL.canvasPool.push(info.canvas);
        if (info.buffer) _free(info.buffer);
        _free(info.pixelFormat);
        _free(surf);
        SDL.surfaces[surf] = null;
      },touchX:0,touchY:0,savedKeydown:null,receiveEvent:function (event) {
        switch(event.type) {
          case 'touchstart':
            event.preventDefault();
            var touch = event.touches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
            var event = {
              type: 'mousedown',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.DOMButtons[0] = 1;
            SDL.events.push(event);
            break;
          case 'touchmove':
            event.preventDefault();
            var touch = event.touches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
            event = {
              type: 'mousemove',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.events.push(event);
            break;
          case 'touchend':
            event.preventDefault();
            event = {
              type: 'mouseup',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.DOMButtons[0] = 0;
            SDL.events.push(event);
            break;
          case 'mousemove':
            if (Browser.pointerLock) {
              // workaround for firefox bug 750111
              if ('mozMovementX' in event) {
                event['movementX'] = event['mozMovementX'];
                event['movementY'] = event['mozMovementY'];
              }
              // workaround for Firefox bug 782777
              if (event['movementX'] == 0 && event['movementY'] == 0) {
                // ignore a mousemove event if it doesn't contain any movement info
                // (without pointer lock, we infer movement from pageX/pageY, so this check is unnecessary)
                event.preventDefault();
                return;
              }
            }
            // fall through
          case 'keydown': case 'keyup': case 'keypress': case 'mousedown': case 'mouseup': case 'DOMMouseScroll': case 'mousewheel':
            // If we preventDefault on keydown events, the subsequent keypress events
            // won't fire. However, it's fine (and in some cases necessary) to
            // preventDefault for keys that don't generate a character. Otherwise,
            // preventDefault is the right thing to do in general.
            if (event.type !== 'keydown' || (!SDL.unicode && !SDL.textInput) || (event.keyCode === 8 /* backspace */ || event.keyCode === 9 /* tab */)) {
              event.preventDefault();
            }
  
            if (event.type == 'DOMMouseScroll' || event.type == 'mousewheel') {
              var button = Browser.getMouseWheelDelta(event) > 0 ? 4 : 3;
              var event2 = {
                type: 'mousedown',
                button: button,
                pageX: event.pageX,
                pageY: event.pageY
              };
              SDL.events.push(event2);
              event = {
                type: 'mouseup',
                button: button,
                pageX: event.pageX,
                pageY: event.pageY
              };
            } else if (event.type == 'mousedown') {
              SDL.DOMButtons[event.button] = 1;
            } else if (event.type == 'mouseup') {
              // ignore extra ups, can happen if we leave the canvas while pressing down, then return,
              // since we add a mouseup in that case
              if (!SDL.DOMButtons[event.button]) {
                return;
              }
  
              SDL.DOMButtons[event.button] = 0;
            }
  
            // We can only request fullscreen as the result of user input.
            // Due to this limitation, we toggle a boolean on keydown which
            // SDL_WM_ToggleFullScreen will check and subsequently set another
            // flag indicating for us to request fullscreen on the following
            // keyup. This isn't perfect, but it enables SDL_WM_ToggleFullScreen
            // to work as the result of a keypress (which is an extremely
            // common use case).
            if (event.type === 'keydown') {
              SDL.canRequestFullscreen = true;
            } else if (event.type === 'keyup') {
              if (SDL.isRequestingFullscreen) {
                Module['requestFullScreen'](true, true);
                SDL.isRequestingFullscreen = false;
              }
              SDL.canRequestFullscreen = false;
            }
  
            // SDL expects a unicode character to be passed to its keydown events.
            // Unfortunately, the browser APIs only provide a charCode property on
            // keypress events, so we must backfill in keydown events with their
            // subsequent keypress event's charCode.
            if (event.type === 'keypress' && SDL.savedKeydown) {
              // charCode is read-only
              SDL.savedKeydown.keypressCharCode = event.charCode;
              SDL.savedKeydown = null;
            } else if (event.type === 'keydown') {
              SDL.savedKeydown = event;
            }
  
            // Don't push keypress events unless SDL_StartTextInput has been called.
            if (event.type !== 'keypress' || SDL.textInput) {
              SDL.events.push(event);
            }
            break;
          case 'mouseout':
            // Un-press all pressed mouse buttons, because we might miss the release outside of the canvas
            for (var i = 0; i < 3; i++) {
              if (SDL.DOMButtons[i]) {
                SDL.events.push({
                  type: 'mouseup',
                  button: i,
                  pageX: event.pageX,
                  pageY: event.pageY
                });
                SDL.DOMButtons[i] = 0;
              }
            }
            event.preventDefault();
            break;
          case 'blur':
          case 'visibilitychange': {
            // Un-press all pressed keys: TODO
            for (var code in SDL.keyboardMap) {
              SDL.events.push({
                type: 'keyup',
                keyCode: SDL.keyboardMap[code]
              });
            }
            event.preventDefault();
            break;
          }
          case 'unload':
            if (Browser.mainLoop.runner) {
              SDL.events.push(event);
              // Force-run a main event loop, since otherwise this event will never be caught!
              Browser.mainLoop.runner();
            }
            return;
          case 'resize':
            SDL.events.push(event);
            // manually triggered resize event doesn't have a preventDefault member
            if (event.preventDefault) {
              event.preventDefault();
            }
            break;
        }
        if (SDL.events.length >= 10000) {
          Module.printErr('SDL event queue full, dropping events');
          SDL.events = SDL.events.slice(0, 10000);
        }
        return;
      },handleEvent:function (event) {
        if (event.handled) return;
        event.handled = true;
  
        switch (event.type) {
          case 'keydown': case 'keyup': {
            var down = event.type === 'keydown';
            var code = event.keyCode;
            if (code >= 65 && code <= 90) {
              code += 32; // make lowercase for SDL
            } else {
              code = SDL.keyCodes[event.keyCode] || event.keyCode;
            }
  
            HEAP8[(((SDL.keyboardState)+(code))|0)]=down;
            // TODO: lmeta, rmeta, numlock, capslock, KMOD_MODE, KMOD_RESERVED
            SDL.modState = (HEAP8[(((SDL.keyboardState)+(1248))|0)] ? 0x0040 | 0x0080 : 0) | // KMOD_LCTRL & KMOD_RCTRL
              (HEAP8[(((SDL.keyboardState)+(1249))|0)] ? 0x0001 | 0x0002 : 0) | // KMOD_LSHIFT & KMOD_RSHIFT
              (HEAP8[(((SDL.keyboardState)+(1250))|0)] ? 0x0100 | 0x0200 : 0); // KMOD_LALT & KMOD_RALT
  
            if (down) {
              SDL.keyboardMap[code] = event.keyCode; // save the DOM input, which we can use to unpress it during blur
            } else {
              delete SDL.keyboardMap[code];
            }
  
            break;
          }
          case 'mousedown': case 'mouseup':
            if (event.type == 'mousedown') {
              // SDL_BUTTON(x) is defined as (1 << ((x)-1)).  SDL buttons are 1-3,
              // and DOM buttons are 0-2, so this means that the below formula is
              // correct.
              SDL.buttonState |= 1 << event.button;
            } else if (event.type == 'mouseup') {
              SDL.buttonState &= ~(1 << event.button);
            }
            // fall through
          case 'mousemove': {
            Browser.calculateMouseEvent(event);
            break;
          }
        }
      },makeCEvent:function (event, ptr) {
        if (typeof event === 'number') {
          // This is a pointer to a native C event that was SDL_PushEvent'ed
          _memcpy(ptr, event, 28); // XXX
          return;
        }
  
        SDL.handleEvent(event);
  
        switch (event.type) {
          case 'keydown': case 'keyup': {
            var down = event.type === 'keydown';
            //Module.print('Received key event: ' + event.keyCode);
            var key = event.keyCode;
            if (key >= 65 && key <= 90) {
              key += 32; // make lowercase for SDL
            } else {
              key = SDL.keyCodes[event.keyCode] || event.keyCode;
            }
            var scan;
            if (key >= 1024) {
              scan = key - 1024;
            } else {
              scan = SDL.scanCodes[key] || key;
            }
  
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(8))|0)]=down ? 1 : 0;
            HEAP8[(((ptr)+(9))|0)]=0; // TODO
            HEAP32[(((ptr)+(12))>>2)]=scan;
            HEAP32[(((ptr)+(16))>>2)]=key;
            HEAP16[(((ptr)+(20))>>1)]=SDL.modState;
            // some non-character keys (e.g. backspace and tab) won't have keypressCharCode set, fill in with the keyCode.
            HEAP32[(((ptr)+(24))>>2)]=event.keypressCharCode || key;
  
            break;
          }
          case 'keypress': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            // Not filling in windowID for now
            var cStr = intArrayFromString(String.fromCharCode(event.charCode));
            for (var i = 0; i < cStr.length; ++i) {
              HEAP8[(((ptr)+(8 + i))|0)]=cStr[i];
            }
            break;
          }
          case 'mousedown': case 'mouseup': case 'mousemove': {
            if (event.type != 'mousemove') {
              var down = event.type === 'mousedown';
              HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
              HEAP8[(((ptr)+(8))|0)]=event.button+1; // DOM buttons are 0-2, SDL 1-3
              HEAP8[(((ptr)+(9))|0)]=down ? 1 : 0;
              HEAP32[(((ptr)+(12))>>2)]=Browser.mouseX;
              HEAP32[(((ptr)+(16))>>2)]=Browser.mouseY;
            } else {
              HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
              HEAP8[(((ptr)+(8))|0)]=SDL.buttonState;
              HEAP32[(((ptr)+(12))>>2)]=Browser.mouseX;
              HEAP32[(((ptr)+(16))>>2)]=Browser.mouseY;
              HEAP32[(((ptr)+(20))>>2)]=Browser.mouseMovementX;
              HEAP32[(((ptr)+(24))>>2)]=Browser.mouseMovementY;
            }
            break;
          }
          case 'unload': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            break;
          }
          case 'resize': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP32[(((ptr)+(4))>>2)]=event.w;
            HEAP32[(((ptr)+(8))>>2)]=event.h;
            break;
          }
          case 'joystick_button_up': case 'joystick_button_down': {
            var state = event.type === 'joystick_button_up' ? 0 : 1;
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(4))|0)]=event.index;
            HEAP8[(((ptr)+(5))|0)]=event.button;
            HEAP8[(((ptr)+(6))|0)]=state;
            break;
          }
          case 'joystick_axis_motion': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(4))|0)]=event.index;
            HEAP8[(((ptr)+(5))|0)]=event.axis;
            HEAP32[(((ptr)+(8))>>2)]=SDL.joystickAxisValueConversion(event.value);
            break;
          }
          default: throw 'Unhandled SDL event: ' + event.type;
        }
      },estimateTextWidth:function (fontData, text) {
        var h = fontData.size;
        var fontString = h + 'px ' + fontData.name;
        var tempCtx = SDL.ttfContext;
        tempCtx.save();
        tempCtx.font = fontString;
        var ret = tempCtx.measureText(text).width | 0;
        tempCtx.restore();
        return ret;
      },allocateChannels:function (num) { // called from Mix_AllocateChannels and init
        if (SDL.numChannels && SDL.numChannels >= num && num != 0) return;
        SDL.numChannels = num;
        SDL.channels = [];
        for (var i = 0; i < num; i++) {
          SDL.channels[i] = {
            audio: null,
            volume: 1.0
          };
        }
      },setGetVolume:function (info, volume) {
        if (!info) return 0;
        var ret = info.volume * 128; // MIX_MAX_VOLUME
        if (volume != -1) {
          info.volume = volume / 128;
          if (info.audio) info.audio.volume = info.volume;
        }
        return ret;
      },fillWebAudioBufferFromHeap:function (heapPtr, sizeSamplesPerChannel, dstAudioBuffer) {
        // The input audio data is interleaved across the channels, i.e. [L, R, L, R, L, R, ...] and is either 8-bit or 16-bit as
        // supported by the SDL API. The output audio wave data for Web Audio API must be in planar buffers of [-1,1]-normalized Float32 data,
        // so perform a buffer conversion for the data.
        var numChannels = SDL.audio.channels;
        for(var c = 0; c < numChannels; ++c) {
          var channelData = dstAudioBuffer['getChannelData'](c);
          if (channelData.length != sizeSamplesPerChannel) {
            throw 'Web Audio output buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + sizeSamplesPerChannel + ' samples!';
          }
          if (SDL.audio.format == 0x8010 /*AUDIO_S16LSB*/) {
            for(var j = 0; j < sizeSamplesPerChannel; ++j) {
              channelData[j] = (HEAP16[(((heapPtr)+((j*numChannels + c)*2))>>1)]) / 0x8000;
            }
          } else if (SDL.audio.format == 0x0008 /*AUDIO_U8*/) {
            for(var j = 0; j < sizeSamplesPerChannel; ++j) {
              var v = (HEAP8[(((heapPtr)+(j*numChannels + c))|0)]);
              channelData[j] = ((v >= 0) ? v-128 : v+128) /128;
            }
          }
        }
      },debugSurface:function (surfData) {
        console.log('dumping surface ' + [surfData.surf, surfData.source, surfData.width, surfData.height]);
        var image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
        var data = image.data;
        var num = Math.min(surfData.width, surfData.height);
        for (var i = 0; i < num; i++) {
          console.log('   diagonal ' + i + ':' + [data[i*surfData.width*4 + i*4 + 0], data[i*surfData.width*4 + i*4 + 1], data[i*surfData.width*4 + i*4 + 2], data[i*surfData.width*4 + i*4 + 3]]);
        }
      },joystickEventState:1,lastJoystickState:{},joystickNamePool:{},recordJoystickState:function (joystick, state) {
        // Standardize button state.
        var buttons = new Array(state.buttons.length);
        for (var i = 0; i < state.buttons.length; i++) {
          buttons[i] = SDL.getJoystickButtonState(state.buttons[i]);
        }
  
        SDL.lastJoystickState[joystick] = {
          buttons: buttons,
          axes: state.axes.slice(0),
          timestamp: state.timestamp,
          index: state.index,
          id: state.id
        };
      },getJoystickButtonState:function (button) {
        if (typeof button === 'object') {
          // Current gamepad API editor's draft (Firefox Nightly)
          // https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html#idl-def-GamepadButton
          return button.pressed;
        } else {
          // Current gamepad API working draft (Firefox / Chrome Stable)
          // http://www.w3.org/TR/2012/WD-gamepad-20120529/#gamepad-interface
          return button > 0;
        }
      },queryJoysticks:function () {
        for (var joystick in SDL.lastJoystickState) {
          var state = SDL.getGamepad(joystick - 1);
          var prevState = SDL.lastJoystickState[joystick];
          // Check only if the timestamp has differed.
          // NOTE: Timestamp is not available in Firefox.
          if (typeof state.timestamp !== 'number' || state.timestamp !== prevState.timestamp) {
            var i;
            for (i = 0; i < state.buttons.length; i++) {
              var buttonState = SDL.getJoystickButtonState(state.buttons[i]);
              // NOTE: The previous state already has a boolean representation of
              //       its button, so no need to standardize its button state here.
              if (buttonState !== prevState.buttons[i]) {
                // Insert button-press event.
                SDL.events.push({
                  type: buttonState ? 'joystick_button_down' : 'joystick_button_up',
                  joystick: joystick,
                  index: joystick - 1,
                  button: i
                });
              }
            }
            for (i = 0; i < state.axes.length; i++) {
              if (state.axes[i] !== prevState.axes[i]) {
                // Insert axes-change event.
                SDL.events.push({
                  type: 'joystick_axis_motion',
                  joystick: joystick,
                  index: joystick - 1,
                  axis: i,
                  value: state.axes[i]
                });
              }
            }
  
            SDL.recordJoystickState(joystick, state);
          }
        }
      },joystickAxisValueConversion:function (value) {
        // Ensures that 0 is 0, 1 is 32767, and -1 is 32768.
        return Math.ceil(((value+1) * 32767.5) - 32768);
      },getGamepads:function () {
        var fcn = navigator.getGamepads || navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || navigator.webkitGetGamepads;
        if (fcn !== undefined) {
          // The function must be applied on the navigator object.
          return fcn.apply(navigator);
        } else {
          return [];
        }
      },getGamepad:function (deviceIndex) {
        var gamepads = SDL.getGamepads();
        if (gamepads.length > deviceIndex && deviceIndex >= 0) {
          return gamepads[deviceIndex];
        }
        return null;
      }};function _SDL_SetColors(surf, colors, firstColor, nColors) {
      var surfData = SDL.surfaces[surf];
  
      // we should create colors array
      // only once cause client code
      // often wants to change portion 
      // of palette not all palette.
      if (!surfData.colors) {
        surfData.colors = new Uint8Array(256 * 3); //256 RGB colors
      } 
  
      for (var i = 0; i < nColors; ++i) {
        var index = (firstColor + i) * 3;
        surfData.colors[index] = HEAPU8[(((colors)+(i*4))|0)];
        surfData.colors[index + 1] = HEAPU8[(((colors)+(i*4 + 1))|0)];
        surfData.colors[index + 2] = HEAPU8[(((colors)+(i*4 + 2))|0)];
      }
  
      return 1;
    }function _SDL_SetPalette(surf, flags, colors, firstColor, nColors) {
      return _SDL_SetColors(surf, colors, firstColor, nColors);
    }

  function _srand(seed) {
      HEAP32[((___rand_seed)>>2)]=seed
    }

  
  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        FS.close(stream);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  
  function _fsync(fildes) {
      // int fsync(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fsync.html
      var stream = FS.getStream(fildes);
      if (stream) {
        // We write directly to the file system, so there's nothing to do here.
        return 0;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }
  
  function _fileno(stream) {
      // int fileno(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fileno.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) return -1;
      return stream.fd;
    }function _fclose(stream) {
      // int fclose(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fclose.html
      var fd = _fileno(stream);
      _fsync(fd);
      return _close(fd);
    }

  
   
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i32=_memset;

  function _glVertex2i(x, y, z) {
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = x;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = y;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = z || 0;
      GLImmediate.addRendererComponent(GLImmediate.VERTEX, 3, GLctx.FLOAT);
    }

  
  
  
  
  function _mkport() { throw 'TODO' }var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return 0;
      }
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)|0)]=streamObj.ungotten.pop();
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(streamObj.fd, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return Math.floor(bytesRead / size);
    }

  function _glGenTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = GL.getNewId(GL.textures);
        var texture = GLctx.createTexture();
        texture.name = id;
        GL.textures[id] = texture;
        HEAP32[(((textures)+(i*4))>>2)]=id;
      }
    }

  
  
  
  
  function _glEnable(x0) { GLctx.enable(x0) }
  
  function _glDisable(x0) { GLctx.disable(x0) }
  
  function _glIsEnabled(x0) { return GLctx.isEnabled(x0) }
  
  function _glGetBooleanv(name_, p) {
      return GL.get(name_, p, 'Boolean');
    }
  
  function _glGetIntegerv(name_, p) {
      return GL.get(name_, p, 'Integer');
    }
  
  function _glGetString(name_) {
      if (GL.stringCache[name_]) return GL.stringCache[name_];
      var ret; 
      switch(name_) {
        case 0x1F00 /* GL_VENDOR */:
        case 0x1F01 /* GL_RENDERER */:
        case 0x1F02 /* GL_VERSION */:
          ret = allocate(intArrayFromString(GLctx.getParameter(name_)), 'i8', ALLOC_NORMAL);
          break;
        case 0x1F03 /* GL_EXTENSIONS */:
          var exts = GLctx.getSupportedExtensions();
          var gl_exts = [];
          for (i in exts) {
            gl_exts.push(exts[i]);
            gl_exts.push("GL_" + exts[i]);
          }
          ret = allocate(intArrayFromString(gl_exts.join(' ')), 'i8', ALLOC_NORMAL);
          break;
        case 0x8B8C /* GL_SHADING_LANGUAGE_VERSION */:
          ret = allocate(intArrayFromString('OpenGL ES GLSL 1.00 (WebGL)'), 'i8', ALLOC_NORMAL);
          break;
        default:
          GL.recordError(0x0500/*GL_INVALID_ENUM*/);
          return 0;
      }
      GL.stringCache[name_] = ret;
      return ret;
    }
  
  function _glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
      return id;
    }
  
  function _glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length);
      GLctx.shaderSource(GL.shaders[shader], source);
    }
  
  function _glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader]);
    }
  
  function _glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program],
                              GL.shaders[shader]);
    }
  
  function _glDetachShader(program, shader) {
      GLctx.detachShader(GL.programs[program],
                              GL.shaders[shader]);
    }
  
  function _glUseProgram(program) {
      GLctx.useProgram(program ? GL.programs[program] : null);
    }
  
  function _glDeleteProgram(program) {
      var program = GL.programs[program];
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[program] = null;
      GL.programInfos[program] = null;
    }
  
  function _glBindAttribLocation(program, index, name) {
      name = Pointer_stringify(name);
      GLctx.bindAttribLocation(GL.programs[program], index, name);
    }
  
  function _glLinkProgram(program) {
      GLctx.linkProgram(GL.programs[program]);
      GL.programInfos[program] = null; // uniforms no longer keep the same names after linking
      GL.populateUniformTable(program);
    }
  
  function _glBindBuffer(target, buffer) {
      var bufferObj = buffer ? GL.buffers[buffer] : null;
  
      if (target == GLctx.ARRAY_BUFFER) {
        GLImmediate.lastArrayBuffer = GL.currArrayBuffer = buffer;
      } else if (target == GLctx.ELEMENT_ARRAY_BUFFER) {
        GL.currElementArrayBuffer = buffer;
      }
  
      GLctx.bindBuffer(target, bufferObj);
    }
  
  function _glGetFloatv(name_, p) {
      return GL.get(name_, p, 'Float');
    }
  
  function _glHint(x0, x1) { GLctx.hint(x0, x1) }
  
  function _glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index);
    }
  
  function _glDisableVertexAttribArray(index) {
      GLctx.disableVertexAttribArray(index);
    }
  
  function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, normalized, stride, ptr);
    }
  
  function _glActiveTexture(x0) { GLctx.activeTexture(x0) }var GLEmulation={fogStart:0,fogEnd:1,fogDensity:1,fogColor:null,fogMode:2048,fogEnabled:false,vaos:[],currentVao:null,enabledVertexAttribArrays:{},hasRunInit:false,init:function () {
        // Do not activate immediate/emulation code (e.g. replace glDrawElements) when in FULL_ES2 mode.
        // We do not need full emulation, we instead emulate client-side arrays etc. in FULL_ES2 code in
        // a straightforward manner, and avoid not having a bound buffer be ambiguous between es2 emulation
        // code and legacy gl emulation code.
  
        if (GLEmulation.hasRunInit) {
          return;
        }
        GLEmulation.hasRunInit = true;
  
        GLEmulation.fogColor = new Float32Array(4);
  
        // Add some emulation workarounds
        Module.printErr('WARNING: using emscripten GL emulation. This is a collection of limited workarounds, do not expect it to work.');
        Module.printErr('WARNING: using emscripten GL emulation unsafe opts. If weirdness happens, try -s GL_UNSAFE_OPTS=0');
  
        // XXX some of the capabilities we don't support may lead to incorrect rendering, if we do not emulate them in shaders
        var validCapabilities = {
          0x0B44: 1, // GL_CULL_FACE
          0x0BE2: 1, // GL_BLEND
          0x0BD0: 1, // GL_DITHER,
          0x0B90: 1, // GL_STENCIL_TEST
          0x0B71: 1, // GL_DEPTH_TEST
          0x0C11: 1, // GL_SCISSOR_TEST
          0x8037: 1, // GL_POLYGON_OFFSET_FILL
          0x809E: 1, // GL_SAMPLE_ALPHA_TO_COVERAGE
          0x80A0: 1  // GL_SAMPLE_COVERAGE
        };
  
        var glEnable = _glEnable;
        _glEnable = _emscripten_glEnable = function _glEnable(cap) {
          // Clean up the renderer on any change to the rendering state. The optimization of
          // skipping renderer setup is aimed at the case of multiple glDraw* right after each other
          if (GLImmediate.lastRenderer) GLImmediate.lastRenderer.cleanup();
          if (cap == 0x0B60 /* GL_FOG */) {
            if (GLEmulation.fogEnabled != true) {
              GLImmediate.currentRenderer = null; // Fog parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.fogEnabled = true;
            }
            return;
          } else if (cap == 0x0de1 /* GL_TEXTURE_2D */) {
            // XXX not according to spec, and not in desktop GL, but works in some GLES1.x apparently, so support
            // it by forwarding to glEnableClientState
            /* Actually, let's not, for now. (This sounds exceedingly broken)
             * This is in gl_ps_workaround2.c.
            _glEnableClientState(cap);
            */
            return;
          } else if (!(cap in validCapabilities)) {
            return;
          }
          glEnable(cap);
        };
  
        var glDisable = _glDisable;
        _glDisable = _emscripten_glDisable = function _glDisable(cap) {
          if (GLImmediate.lastRenderer) GLImmediate.lastRenderer.cleanup();
          if (cap == 0x0B60 /* GL_FOG */) {
            if (GLEmulation.fogEnabled != false) {
              GLImmediate.currentRenderer = null; // Fog parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.fogEnabled = false;
            }
            return;
          } else if (cap == 0x0de1 /* GL_TEXTURE_2D */) {
            // XXX not according to spec, and not in desktop GL, but works in some GLES1.x apparently, so support
            // it by forwarding to glDisableClientState
            /* Actually, let's not, for now. (This sounds exceedingly broken)
             * This is in gl_ps_workaround2.c.
            _glDisableClientState(cap);
            */
            return;
          } else if (!(cap in validCapabilities)) {
            return;
          }
          glDisable(cap);
        };
        _glIsEnabled = _emscripten_glIsEnabled = function _glIsEnabled(cap) {
          if (cap == 0x0B60 /* GL_FOG */) {
            return GLEmulation.fogEnabled ? 1 : 0;
          } else if (!(cap in validCapabilities)) {
            return 0;
          }
          return GLctx.isEnabled(cap);
        };
  
        var glGetBooleanv = _glGetBooleanv;
        _glGetBooleanv = _emscripten_glGetBooleanv = function _glGetBooleanv(pname, p) {
          var attrib = GLEmulation.getAttributeFromCapability(pname);
          if (attrib !== null) {
            var result = GLImmediate.enabledClientAttributes[attrib];
            HEAP8[(p)]=result === true ? 1 : 0;
            return;
          }
          glGetBooleanv(pname, p);
        };
  
        var glGetIntegerv = _glGetIntegerv;
        _glGetIntegerv = _emscripten_glGetIntegerv = function _glGetIntegerv(pname, params) {
          switch (pname) {
            case 0x84E2: pname = GLctx.MAX_TEXTURE_IMAGE_UNITS /* fake it */; break; // GL_MAX_TEXTURE_UNITS
            case 0x8B4A: { // GL_MAX_VERTEX_UNIFORM_COMPONENTS_ARB
              var result = GLctx.getParameter(GLctx.MAX_VERTEX_UNIFORM_VECTORS);
              HEAP32[((params)>>2)]=result*4; // GLES gives num of 4-element vectors, GL wants individual components, so multiply
              return;
            }
            case 0x8B49: { // GL_MAX_FRAGMENT_UNIFORM_COMPONENTS_ARB
              var result = GLctx.getParameter(GLctx.MAX_FRAGMENT_UNIFORM_VECTORS);
              HEAP32[((params)>>2)]=result*4; // GLES gives num of 4-element vectors, GL wants individual components, so multiply
              return;
            }
            case 0x8B4B: { // GL_MAX_VARYING_FLOATS_ARB
              var result = GLctx.getParameter(GLctx.MAX_VARYING_VECTORS);
              HEAP32[((params)>>2)]=result*4; // GLES gives num of 4-element vectors, GL wants individual components, so multiply
              return;
            }
            case 0x8871: pname = GLctx.MAX_COMBINED_TEXTURE_IMAGE_UNITS /* close enough */; break; // GL_MAX_TEXTURE_COORDS
            case 0x807A: { // GL_VERTEX_ARRAY_SIZE
              var attribute = GLImmediate.clientAttributes[GLImmediate.VERTEX];
              HEAP32[((params)>>2)]=attribute ? attribute.size : 0;
              return;
            }
            case 0x807B: { // GL_VERTEX_ARRAY_TYPE
              var attribute = GLImmediate.clientAttributes[GLImmediate.VERTEX];
              HEAP32[((params)>>2)]=attribute ? attribute.type : 0;
              return;
            }
            case 0x807C: { // GL_VERTEX_ARRAY_STRIDE
              var attribute = GLImmediate.clientAttributes[GLImmediate.VERTEX];
              HEAP32[((params)>>2)]=attribute ? attribute.stride : 0;
              return;
            }
            case 0x8081: { // GL_COLOR_ARRAY_SIZE
              var attribute = GLImmediate.clientAttributes[GLImmediate.COLOR];
              HEAP32[((params)>>2)]=attribute ? attribute.size : 0;
              return;
            }
            case 0x8082: { // GL_COLOR_ARRAY_TYPE
              var attribute = GLImmediate.clientAttributes[GLImmediate.COLOR];
              HEAP32[((params)>>2)]=attribute ? attribute.type : 0;
              return;
            }
            case 0x8083: { // GL_COLOR_ARRAY_STRIDE
              var attribute = GLImmediate.clientAttributes[GLImmediate.COLOR];
              HEAP32[((params)>>2)]=attribute ? attribute.stride : 0;
              return;
            }
            case 0x8088: { // GL_TEXTURE_COORD_ARRAY_SIZE
              var attribute = GLImmediate.clientAttributes[GLImmediate.TEXTURE0 + GLImmediate.clientActiveTexture];
              HEAP32[((params)>>2)]=attribute ? attribute.size : 0;
              return;
            }
            case 0x8089: { // GL_TEXTURE_COORD_ARRAY_TYPE
              var attribute = GLImmediate.clientAttributes[GLImmediate.TEXTURE0 + GLImmediate.clientActiveTexture];
              HEAP32[((params)>>2)]=attribute ? attribute.type : 0;
              return;
            }
            case 0x808A: { // GL_TEXTURE_COORD_ARRAY_STRIDE
              var attribute = GLImmediate.clientAttributes[GLImmediate.TEXTURE0 + GLImmediate.clientActiveTexture];
              HEAP32[((params)>>2)]=attribute ? attribute.stride : 0;
              return;
            }
          }
          glGetIntegerv(pname, params);
        };
  
        var glGetString = _glGetString;
        _glGetString = _emscripten_glGetString = function _glGetString(name_) {
          if (GL.stringCache[name_]) return GL.stringCache[name_];
          switch(name_) {
            case 0x1F03 /* GL_EXTENSIONS */: // Add various extensions that we can support
              var ret = allocate(intArrayFromString(GLctx.getSupportedExtensions().join(' ') +
                     ' GL_EXT_texture_env_combine GL_ARB_texture_env_crossbar GL_ATI_texture_env_combine3 GL_NV_texture_env_combine4 GL_EXT_texture_env_dot3 GL_ARB_multitexture GL_ARB_vertex_buffer_object GL_EXT_framebuffer_object GL_ARB_vertex_program GL_ARB_fragment_program GL_ARB_shading_language_100 GL_ARB_shader_objects GL_ARB_vertex_shader GL_ARB_fragment_shader GL_ARB_texture_cube_map GL_EXT_draw_range_elements' +
                     (GL.compressionExt ? ' GL_ARB_texture_compression GL_EXT_texture_compression_s3tc' : '') +
                     (GL.anisotropicExt ? ' GL_EXT_texture_filter_anisotropic' : '')
              ), 'i8', ALLOC_NORMAL);
              GL.stringCache[name_] = ret;
              return ret;
          }
          return glGetString(name_);
        };
  
        // Do some automatic rewriting to work around GLSL differences. Note that this must be done in
        // tandem with the rest of the program, by itself it cannot suffice.
        // Note that we need to remember shader types for this rewriting, saving sources makes it easier to debug.
        GL.shaderInfos = {};
        var glCreateShader = _glCreateShader;
        _glCreateShader = _emscripten_glCreateShader = function _glCreateShader(shaderType) {
          var id = glCreateShader(shaderType);
          GL.shaderInfos[id] = {
            type: shaderType,
            ftransform: false
          };
          return id;
        };
  
        function ensurePrecision(source) {
          if (!/precision +(low|medium|high)p +float *;/.test(source)) {
            source = 'precision mediump float;\n' + source;
          }
          return source;
        }
  
        var glShaderSource = _glShaderSource;
        _glShaderSource = _emscripten_glShaderSource = function _glShaderSource(shader, count, string, length) {
          var source = GL.getSource(shader, count, string, length);
          // XXX We add attributes and uniforms to shaders. The program can ask for the # of them, and see the
          // ones we generated, potentially confusing it? Perhaps we should hide them.
          if (GL.shaderInfos[shader].type == GLctx.VERTEX_SHADER) {
            // Replace ftransform() with explicit project/modelview transforms, and add position and matrix info.
            var has_pm = source.search(/u_projection/) >= 0;
            var has_mm = source.search(/u_modelView/) >= 0;
            var has_pv = source.search(/a_position/) >= 0;
            var need_pm = 0, need_mm = 0, need_pv = 0;
            var old = source;
            source = source.replace(/ftransform\(\)/g, '(u_projection * u_modelView * a_position)');
            if (old != source) need_pm = need_mm = need_pv = 1;
            old = source;
            source = source.replace(/gl_ProjectionMatrix/g, 'u_projection');
            if (old != source) need_pm = 1;
            old = source;
            source = source.replace(/gl_ModelViewMatrixTranspose\[2\]/g, 'vec4(u_modelView[0][2], u_modelView[1][2], u_modelView[2][2], u_modelView[3][2])'); // XXX extremely inefficient
            if (old != source) need_mm = 1;
            old = source;
            source = source.replace(/gl_ModelViewMatrix/g, 'u_modelView');
            if (old != source) need_mm = 1;
            old = source;
            source = source.replace(/gl_Vertex/g, 'a_position');
            if (old != source) need_pv = 1;
            old = source;
            source = source.replace(/gl_ModelViewProjectionMatrix/g, '(u_projection * u_modelView)');
            if (old != source) need_pm = need_mm = 1;
            if (need_pv && !has_pv) source = 'attribute vec4 a_position; \n' + source;
            if (need_mm && !has_mm) source = 'uniform mat4 u_modelView; \n' + source;
            if (need_pm && !has_pm) source = 'uniform mat4 u_projection; \n' + source;
            GL.shaderInfos[shader].ftransform = need_pm || need_mm || need_pv; // we will need to provide the fixed function stuff as attributes and uniforms
            for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
              // XXX To handle both regular texture mapping and cube mapping, we use vec4 for tex coordinates.
              var old = source;
              var need_vtc = source.search('v_texCoord' + i) == -1;
              source = source.replace(new RegExp('gl_TexCoord\\[' + i + '\\]', 'g'), 'v_texCoord' + i)
                             .replace(new RegExp('gl_MultiTexCoord' + i, 'g'), 'a_texCoord' + i);
              if (source != old) {
                source = 'attribute vec4 a_texCoord' + i + '; \n' + source;
                if (need_vtc) {
                  source = 'varying vec4 v_texCoord' + i + ';   \n' + source;
                }
              }
  
              old = source;
              source = source.replace(new RegExp('gl_TextureMatrix\\[' + i + '\\]', 'g'), 'u_textureMatrix' + i);
              if (source != old) {
                source = 'uniform mat4 u_textureMatrix' + i + '; \n' + source;
              }
            }
            if (source.indexOf('gl_FrontColor') >= 0) {
              source = 'varying vec4 v_color; \n' +
                       source.replace(/gl_FrontColor/g, 'v_color');
            }
            if (source.indexOf('gl_Color') >= 0) {
              source = 'attribute vec4 a_color; \n' +
                       source.replace(/gl_Color/g, 'a_color');
            }
            if (source.indexOf('gl_Normal') >= 0) {
              source = 'attribute vec3 a_normal; \n' +
                       source.replace(/gl_Normal/g, 'a_normal');
            }
            // fog
            if (source.indexOf('gl_FogFragCoord') >= 0) {
              source = 'varying float v_fogFragCoord;   \n' +
                       source.replace(/gl_FogFragCoord/g, 'v_fogFragCoord');
            }
            source = ensurePrecision(source);
          } else { // Fragment shader
            for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
              var old = source;
              source = source.replace(new RegExp('gl_TexCoord\\[' + i + '\\]', 'g'), 'v_texCoord' + i);
              if (source != old) {
                source = 'varying vec4 v_texCoord' + i + ';   \n' + source;
              }
            }
            if (source.indexOf('gl_Color') >= 0) {
              source = 'varying vec4 v_color; \n' + source.replace(/gl_Color/g, 'v_color');
            }
            if (source.indexOf('gl_Fog.color') >= 0) {
              source = 'uniform vec4 u_fogColor;   \n' +
                       source.replace(/gl_Fog.color/g, 'u_fogColor');
            }
            if (source.indexOf('gl_Fog.end') >= 0) {
              source = 'uniform float u_fogEnd;   \n' +
                       source.replace(/gl_Fog.end/g, 'u_fogEnd');
            }
            if (source.indexOf('gl_Fog.scale') >= 0) {
              source = 'uniform float u_fogScale;   \n' +
                       source.replace(/gl_Fog.scale/g, 'u_fogScale');
            }
            if (source.indexOf('gl_Fog.density') >= 0) {
              source = 'uniform float u_fogDensity;   \n' +
                       source.replace(/gl_Fog.density/g, 'u_fogDensity');
            }
            if (source.indexOf('gl_FogFragCoord') >= 0) {
              source = 'varying float v_fogFragCoord;   \n' +
                       source.replace(/gl_FogFragCoord/g, 'v_fogFragCoord');
            }
            source = ensurePrecision(source);
          }
          GLctx.shaderSource(GL.shaders[shader], source);
        };
  
        var glCompileShader = _glCompileShader;
        _glCompileShader = _emscripten_glCompileShader = function _glCompileShader(shader) {
          GLctx.compileShader(GL.shaders[shader]);
        };
  
        GL.programShaders = {};
        var glAttachShader = _glAttachShader;
        _glAttachShader = _emscripten_glAttachShader = function _glAttachShader(program, shader) {
          if (!GL.programShaders[program]) GL.programShaders[program] = [];
          GL.programShaders[program].push(shader);
          glAttachShader(program, shader);
        };
  
        var glDetachShader = _glDetachShader;
        _glDetachShader = _emscripten_glDetachShader = function _glDetachShader(program, shader) {
          var programShader = GL.programShaders[program];
          if (!programShader) {
            Module.printErr('WARNING: _glDetachShader received invalid program: ' + program);
            return;
          }
          var index = programShader.indexOf(shader);
          programShader.splice(index, 1);
          glDetachShader(program, shader);
        };
  
        var glUseProgram = _glUseProgram;
        _glUseProgram = _emscripten_glUseProgram = function _glUseProgram(program) {
          if (GL.currProgram != program) {
            GLImmediate.currentRenderer = null; // This changes the FFP emulation shader program, need to recompute that.
            GL.currProgram = program;
            GLImmediate.fixedFunctionProgram = 0;
            glUseProgram(program);
          }
        }
  
        var glDeleteProgram = _glDeleteProgram;
        _glDeleteProgram = _emscripten_glDeleteProgram = function _glDeleteProgram(program) {
          glDeleteProgram(program);
          if (program == GL.currProgram) {
            GLImmediate.currentRenderer = null; // This changes the FFP emulation shader program, need to recompute that.
            GL.currProgram = 0;
          }
        };
  
        // If attribute 0 was not bound, bind it to 0 for WebGL performance reasons. Track if 0 is free for that.
        var zeroUsedPrograms = {};
        var glBindAttribLocation = _glBindAttribLocation;
        _glBindAttribLocation = _emscripten_glBindAttribLocation = function _glBindAttribLocation(program, index, name) {
          if (index == 0) zeroUsedPrograms[program] = true;
          glBindAttribLocation(program, index, name);
        };
        var glLinkProgram = _glLinkProgram;
        _glLinkProgram = _emscripten_glLinkProgram = function _glLinkProgram(program) {
          if (!(program in zeroUsedPrograms)) {
            GLctx.bindAttribLocation(GL.programs[program], 0, 'a_position');
          }
          glLinkProgram(program);
        };
  
        var glBindBuffer = _glBindBuffer;
        _glBindBuffer = _emscripten_glBindBuffer = function _glBindBuffer(target, buffer) {
          glBindBuffer(target, buffer);
          if (target == GLctx.ARRAY_BUFFER) {
            if (GLEmulation.currentVao) {
              GLEmulation.currentVao.arrayBuffer = buffer;
            }
          } else if (target == GLctx.ELEMENT_ARRAY_BUFFER) {
            if (GLEmulation.currentVao) GLEmulation.currentVao.elementArrayBuffer = buffer;
          }
        };
  
        var glGetFloatv = _glGetFloatv;
        _glGetFloatv = _emscripten_glGetFloatv = function _glGetFloatv(pname, params) {
          if (pname == 0x0BA6) { // GL_MODELVIEW_MATRIX
            HEAPF32.set(GLImmediate.matrix[0/*m*/], params >> 2);
          } else if (pname == 0x0BA7) { // GL_PROJECTION_MATRIX
            HEAPF32.set(GLImmediate.matrix[1/*p*/], params >> 2);
          } else if (pname == 0x0BA8) { // GL_TEXTURE_MATRIX
            HEAPF32.set(GLImmediate.matrix[2/*t*/ + GLImmediate.clientActiveTexture], params >> 2);
          } else if (pname == 0x0B66) { // GL_FOG_COLOR
            HEAPF32.set(GLEmulation.fogColor, params >> 2);
          } else if (pname == 0x0B63) { // GL_FOG_START
            HEAPF32[((params)>>2)]=GLEmulation.fogStart;
          } else if (pname == 0x0B64) { // GL_FOG_END
            HEAPF32[((params)>>2)]=GLEmulation.fogEnd;
          } else if (pname == 0x0B62) { // GL_FOG_DENSITY
            HEAPF32[((params)>>2)]=GLEmulation.fogDensity;
          } else if (pname == 0x0B65) { // GL_FOG_MODE
            HEAPF32[((params)>>2)]=GLEmulation.fogMode;
          } else {
            glGetFloatv(pname, params);
          }
        };
  
        var glHint = _glHint;
        _glHint = _emscripten_glHint = function _glHint(target, mode) {
          if (target == 0x84EF) { // GL_TEXTURE_COMPRESSION_HINT
            return;
          }
          glHint(target, mode);
        };
  
        var glEnableVertexAttribArray = _glEnableVertexAttribArray;
        _glEnableVertexAttribArray = _emscripten_glEnableVertexAttribArray = function _glEnableVertexAttribArray(index) {
          glEnableVertexAttribArray(index);
          GLEmulation.enabledVertexAttribArrays[index] = 1;
          if (GLEmulation.currentVao) GLEmulation.currentVao.enabledVertexAttribArrays[index] = 1;
        };
  
        var glDisableVertexAttribArray = _glDisableVertexAttribArray;
        _glDisableVertexAttribArray = _emscripten_glDisableVertexAttribArray = function _glDisableVertexAttribArray(index) {
          glDisableVertexAttribArray(index);
          delete GLEmulation.enabledVertexAttribArrays[index];
          if (GLEmulation.currentVao) delete GLEmulation.currentVao.enabledVertexAttribArrays[index];
        };
  
        var glVertexAttribPointer = _glVertexAttribPointer;
        _glVertexAttribPointer = _emscripten_glVertexAttribPointer = function _glVertexAttribPointer(index, size, type, normalized, stride, pointer) {
          glVertexAttribPointer(index, size, type, normalized, stride, pointer);
          if (GLEmulation.currentVao) { // TODO: avoid object creation here? likely not hot though
            GLEmulation.currentVao.vertexAttribPointers[index] = [index, size, type, normalized, stride, pointer];
          }
        };
      },getAttributeFromCapability:function (cap) {
        var attrib = null;
        switch (cap) {
          case 0x0de1: // GL_TEXTURE_2D - XXX not according to spec, and not in desktop GL, but works in some GLES1.x apparently, so support it
            // Fall through:
          case 0x8078: // GL_TEXTURE_COORD_ARRAY
            attrib = GLImmediate.TEXTURE0 + GLImmediate.clientActiveTexture; break;
          case 0x8074: // GL_VERTEX_ARRAY
            attrib = GLImmediate.VERTEX; break;
          case 0x8075: // GL_NORMAL_ARRAY
            attrib = GLImmediate.NORMAL; break;
          case 0x8076: // GL_COLOR_ARRAY
            attrib = GLImmediate.COLOR; break;
        }
        return attrib;
      }};var GLImmediate={MapTreeLib:null,spawnMapTreeLib:function () {
        /* A naive implementation of a map backed by an array, and accessed by
         * naive iteration along the array. (hashmap with only one bucket)
         */
        function CNaiveListMap() {
          var list = [];
  
          this.insert = function CNaiveListMap_insert(key, val) {
            if (this.contains(key|0)) return false;
            list.push([key, val]);
            return true;
          };
  
          var __contains_i;
          this.contains = function CNaiveListMap_contains(key) {
            for (__contains_i = 0; __contains_i < list.length; ++__contains_i) {
              if (list[__contains_i][0] === key) return true;
            }
            return false;
          };
  
          var __get_i;
          this.get = function CNaiveListMap_get(key) {
            for (__get_i = 0; __get_i < list.length; ++__get_i) {
              if (list[__get_i][0] === key) return list[__get_i][1];
            }
            return undefined;
          };
        };
  
        /* A tree of map nodes.
          Uses `KeyView`s to allow descending the tree without garbage.
          Example: {
            // Create our map object.
            var map = new ObjTreeMap();
  
            // Grab the static keyView for the map.
            var keyView = map.GetStaticKeyView();
  
            // Let's make a map for:
            // root: <undefined>
            //   1: <undefined>
            //     2: <undefined>
            //       5: "Three, sir!"
            //       3: "Three!"
  
            // Note how we can chain together `Reset` and `Next` to
            // easily descend based on multiple key fragments.
            keyView.Reset().Next(1).Next(2).Next(5).Set("Three, sir!");
            keyView.Reset().Next(1).Next(2).Next(3).Set("Three!");
          }
        */
        function CMapTree() {
          function CNLNode() {
            var map = new CNaiveListMap();
  
            this.child = function CNLNode_child(keyFrag) {
              if (!map.contains(keyFrag|0)) {
                map.insert(keyFrag|0, new CNLNode());
              }
              return map.get(keyFrag|0);
            };
  
            this.value = undefined;
            this.get = function CNLNode_get() {
              return this.value;
            };
  
            this.set = function CNLNode_set(val) {
              this.value = val;
            };
          }
  
          function CKeyView(root) {
            var cur;
  
            this.reset = function CKeyView_reset() {
              cur = root;
              return this;
            };
            this.reset();
  
            this.next = function CKeyView_next(keyFrag) {
              cur = cur.child(keyFrag);
              return this;
            };
  
            this.get = function CKeyView_get() {
              return cur.get();
            };
  
            this.set = function CKeyView_set(val) {
              cur.set(val);
            };
          };
  
          var root;
          var staticKeyView;
  
          this.createKeyView = function CNLNode_createKeyView() {
            return new CKeyView(root);
          }
  
          this.clear = function CNLNode_clear() {
            root = new CNLNode();
            staticKeyView = this.createKeyView();
          };
          this.clear();
  
          this.getStaticKeyView = function CNLNode_getStaticKeyView() {
            staticKeyView.reset();
            return staticKeyView;
          };
        };
  
        // Exports:
        return {
          create: function() {
            return new CMapTree();
          },
        };
      },TexEnvJIT:null,spawnTexEnvJIT:function () {
        // GL defs:
        var GL_TEXTURE0 = 0x84C0;
        var GL_TEXTURE_1D = 0x0DE0;
        var GL_TEXTURE_2D = 0x0DE1;
        var GL_TEXTURE_3D = 0x806f;
        var GL_TEXTURE_CUBE_MAP = 0x8513;
        var GL_TEXTURE_ENV = 0x2300;
        var GL_TEXTURE_ENV_MODE = 0x2200;
        var GL_TEXTURE_ENV_COLOR = 0x2201;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
        var GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
        var GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
        var GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
  
        var GL_SRC0_RGB = 0x8580;
        var GL_SRC1_RGB = 0x8581;
        var GL_SRC2_RGB = 0x8582;
  
        var GL_SRC0_ALPHA = 0x8588;
        var GL_SRC1_ALPHA = 0x8589;
        var GL_SRC2_ALPHA = 0x858A;
  
        var GL_OPERAND0_RGB = 0x8590;
        var GL_OPERAND1_RGB = 0x8591;
        var GL_OPERAND2_RGB = 0x8592;
  
        var GL_OPERAND0_ALPHA = 0x8598;
        var GL_OPERAND1_ALPHA = 0x8599;
        var GL_OPERAND2_ALPHA = 0x859A;
  
        var GL_COMBINE_RGB = 0x8571;
        var GL_COMBINE_ALPHA = 0x8572;
  
        var GL_RGB_SCALE = 0x8573;
        var GL_ALPHA_SCALE = 0x0D1C;
  
        // env.mode
        var GL_ADD      = 0x0104;
        var GL_BLEND    = 0x0BE2;
        var GL_REPLACE  = 0x1E01;
        var GL_MODULATE = 0x2100;
        var GL_DECAL    = 0x2101;
        var GL_COMBINE  = 0x8570;
  
        // env.color/alphaCombiner
        //var GL_ADD         = 0x0104;
        //var GL_REPLACE     = 0x1E01;
        //var GL_MODULATE    = 0x2100;
        var GL_SUBTRACT    = 0x84E7;
        var GL_INTERPOLATE = 0x8575;
  
        // env.color/alphaSrc
        var GL_TEXTURE       = 0x1702;
        var GL_CONSTANT      = 0x8576;
        var GL_PRIMARY_COLOR = 0x8577;
        var GL_PREVIOUS      = 0x8578;
  
        // env.color/alphaOp
        var GL_SRC_COLOR           = 0x0300;
        var GL_ONE_MINUS_SRC_COLOR = 0x0301;
        var GL_SRC_ALPHA           = 0x0302;
        var GL_ONE_MINUS_SRC_ALPHA = 0x0303;
  
        var GL_RGB  = 0x1907;
        var GL_RGBA = 0x1908;
  
        // Our defs:
        var TEXENVJIT_NAMESPACE_PREFIX = "tej_";
        // Not actually constant, as they can be changed between JIT passes:
        var TEX_UNIT_UNIFORM_PREFIX = "uTexUnit";
        var TEX_COORD_VARYING_PREFIX = "vTexCoord";
        var PRIM_COLOR_VARYING = "vPrimColor";
        var TEX_MATRIX_UNIFORM_PREFIX = "uTexMatrix";
  
        // Static vars:
        var s_texUnits = null; //[];
        var s_activeTexture = 0;
  
        var s_requiredTexUnitsForPass = [];
  
        // Static funcs:
        function abort(info) {
          assert(false, "[TexEnvJIT] ABORT: " + info);
        }
  
        function abort_noSupport(info) {
          abort("No support: " + info);
        }
  
        function abort_sanity(info) {
          abort("Sanity failure: " + info);
        }
  
        function genTexUnitSampleExpr(texUnitID) {
          var texUnit = s_texUnits[texUnitID];
          var texType = texUnit.getTexType();
  
          var func = null;
          switch (texType) {
            case GL_TEXTURE_1D:
              func = "texture2D";
              break;
            case GL_TEXTURE_2D:
              func = "texture2D";
              break;
            case GL_TEXTURE_3D:
              return abort_noSupport("No support for 3D textures.");
            case GL_TEXTURE_CUBE_MAP:
              func = "textureCube";
              break;
            default:
              return abort_sanity("Unknown texType: 0x" + texType.toString(16));
          }
  
          var texCoordExpr = TEX_COORD_VARYING_PREFIX + texUnitID;
          if (TEX_MATRIX_UNIFORM_PREFIX != null) {
            texCoordExpr = "(" + TEX_MATRIX_UNIFORM_PREFIX + texUnitID + " * " + texCoordExpr + ")";
          }
          return func + "(" + TEX_UNIT_UNIFORM_PREFIX + texUnitID + ", " + texCoordExpr + ".xy)";
        }
  
        function getTypeFromCombineOp(op) {
          switch (op) {
            case GL_SRC_COLOR:
            case GL_ONE_MINUS_SRC_COLOR:
              return "vec3";
            case GL_SRC_ALPHA:
            case GL_ONE_MINUS_SRC_ALPHA:
              return "float";
          }
  
          return abort_noSupport("Unsupported combiner op: 0x" + op.toString(16));
        }
  
        function getCurTexUnit() {
          return s_texUnits[s_activeTexture];
        }
  
        function genCombinerSourceExpr(texUnitID, constantExpr, previousVar,
                                       src, op)
        {
          var srcExpr = null;
          switch (src) {
            case GL_TEXTURE:
              srcExpr = genTexUnitSampleExpr(texUnitID);
              break;
            case GL_CONSTANT:
              srcExpr = constantExpr;
              break;
            case GL_PRIMARY_COLOR:
              srcExpr = PRIM_COLOR_VARYING;
              break;
            case GL_PREVIOUS:
              srcExpr = previousVar;
              break;
            default:
                return abort_noSupport("Unsupported combiner src: 0x" + src.toString(16));
          }
  
          var expr = null;
          switch (op) {
            case GL_SRC_COLOR:
              expr = srcExpr + ".rgb";
              break;
            case GL_ONE_MINUS_SRC_COLOR:
              expr = "(vec3(1.0) - " + srcExpr + ".rgb)";
              break;
            case GL_SRC_ALPHA:
              expr = srcExpr + ".a";
              break;
            case GL_ONE_MINUS_SRC_ALPHA:
              expr = "(1.0 - " + srcExpr + ".a)";
              break;
            default:
              return abort_noSupport("Unsupported combiner op: 0x" + op.toString(16));
          }
  
          return expr;
        }
  
        function valToFloatLiteral(val) {
          if (val == Math.round(val)) return val + '.0';
          return val;
        }
  
  
        // Classes:
        function CTexEnv() {
          this.mode = GL_MODULATE;
          this.colorCombiner = GL_MODULATE;
          this.alphaCombiner = GL_MODULATE;
          this.colorScale = 1;
          this.alphaScale = 1;
          this.envColor = [0, 0, 0, 0];
  
          this.colorSrc = [
            GL_TEXTURE,
            GL_PREVIOUS,
            GL_CONSTANT
          ];
          this.alphaSrc = [
            GL_TEXTURE,
            GL_PREVIOUS,
            GL_CONSTANT
          ];
          this.colorOp = [
            GL_SRC_COLOR,
            GL_SRC_COLOR,
            GL_SRC_ALPHA
          ];
          this.alphaOp = [
            GL_SRC_ALPHA,
            GL_SRC_ALPHA,
            GL_SRC_ALPHA
          ];
  
          // Map GLenums to small values to efficiently pack the enums to bits for tighter access.
          this.traverseKey = {
            // mode
            0x1E01 /* GL_REPLACE */: 0,
            0x2100 /* GL_MODULATE */: 1,
            0x0104 /* GL_ADD */: 2,
            0x0BE2 /* GL_BLEND */: 3,
            0x2101 /* GL_DECAL */: 4,
            0x8570 /* GL_COMBINE */: 5,
  
            // additional color and alpha combiners
            0x84E7 /* GL_SUBTRACT */: 3,
            0x8575 /* GL_INTERPOLATE */: 4,
  
            // color and alpha src
            0x1702 /* GL_TEXTURE */: 0,
            0x8576 /* GL_CONSTANT */: 1,
            0x8577 /* GL_PRIMARY_COLOR */: 2,
            0x8578 /* GL_PREVIOUS */: 3,
  
            // color and alpha op
            0x0300 /* GL_SRC_COLOR */: 0,
            0x0301 /* GL_ONE_MINUS_SRC_COLOR */: 1,
            0x0302 /* GL_SRC_ALPHA */: 2,
            0x0300 /* GL_ONE_MINUS_SRC_ALPHA */: 3
          };
  
          // The tuple (key0,key1,key2) uniquely identifies the state of the variables in CTexEnv.
          // -1 on key0 denotes 'the whole cached key is dirty'
          this.key0 = -1;
          this.key1 = 0;
          this.key2 = 0;
  
          this.computeKey0 = function() {
            var k = this.traverseKey;
            var key = k[this.mode] * 1638400; // 6 distinct values.
            key += k[this.colorCombiner] * 327680; // 5 distinct values.
            key += k[this.alphaCombiner] * 65536; // 5 distinct values.
            // The above three fields have 6*5*5=150 distinct values -> 8 bits.
            key += (this.colorScale-1) * 16384; // 10 bits used.
            key += (this.alphaScale-1) * 4096; // 12 bits used.
            key += k[this.colorSrc[0]] * 1024; // 14
            key += k[this.colorSrc[1]] * 256; // 16
            key += k[this.colorSrc[2]] * 64; // 18
            key += k[this.alphaSrc[0]] * 16; // 20
            key += k[this.alphaSrc[1]] * 4; // 22
            key += k[this.alphaSrc[2]]; // 24 bits used total.
            return key;
          }
          this.computeKey1 = function() {
            var k = this.traverseKey;
            key = k[this.colorOp[0]] * 4096;
            key += k[this.colorOp[1]] * 1024;             
            key += k[this.colorOp[2]] * 256;
            key += k[this.alphaOp[0]] * 16;
            key += k[this.alphaOp[1]] * 4;
            key += k[this.alphaOp[2]];
            return key;            
          }
          // TODO: remove this. The color should not be part of the key!
          this.computeKey2 = function() {
            return this.envColor[0] * 16777216 + this.envColor[1] * 65536 + this.envColor[2] * 256 + 1 + this.envColor[3];
          }
          this.recomputeKey = function() {
            this.key0 = this.computeKey0();
            this.key1 = this.computeKey1();
            this.key2 = this.computeKey2();
          }
          this.invalidateKey = function() {
            this.key0 = -1; // The key of this texture unit must be recomputed when rendering the next time.
            GLImmediate.currentRenderer = null; // The currently used renderer must be re-evaluated at next render.
          }
        }
  
        function CTexUnit() {
          this.env = new CTexEnv();
          this.enabled_tex1D   = false;
          this.enabled_tex2D   = false;
          this.enabled_tex3D   = false;
          this.enabled_texCube = false;
          this.texTypesEnabled = 0; // A bitfield combination of the four flags above, used for fast access to operations.
  
          this.traverseState = function CTexUnit_traverseState(keyView) {
            if (this.texTypesEnabled) {
              if (this.env.key0 == -1) {
                this.env.recomputeKey();
              }
              keyView.next(this.texTypesEnabled | (this.env.key0 << 4));
              keyView.next(this.env.key1);
              keyView.next(this.env.key2);
            } else {
              // For correctness, must traverse a zero value, theoretically a subsequent integer key could collide with this value otherwise.
              keyView.next(0);
            }
          };
        };
  
        // Class impls:
        CTexUnit.prototype.enabled = function CTexUnit_enabled() {
          return this.texTypesEnabled;
        }
  
        CTexUnit.prototype.genPassLines = function CTexUnit_genPassLines(passOutputVar, passInputVar, texUnitID) {
          if (!this.enabled()) {
            return ["vec4 " + passOutputVar + " = " + passInputVar + ";"];
          }
          var lines = this.env.genPassLines(passOutputVar, passInputVar, texUnitID).join('\n');
  
          var texLoadLines = '';
          var texLoadRegex = /(texture.*?\(.*?\))/g;
          var loadCounter = 0;
          var load;
  
          // As an optimization, merge duplicate identical texture loads to one var.
          while(load = texLoadRegex.exec(lines)) {
            var texLoadExpr = load[1];
            var secondOccurrence = lines.slice(load.index+1).indexOf(texLoadExpr);
            if (secondOccurrence != -1) { // And also has a second occurrence of same load expression..
              // Create new var to store the common load.
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var texLoadVar = prefix + 'texload' + loadCounter++;
              var texLoadLine = 'vec4 ' + texLoadVar + ' = ' + texLoadExpr + ';\n';
              texLoadLines += texLoadLine + '\n'; // Store the generated texture load statements in a temp string to not confuse regex search in progress.
              lines = lines.split(texLoadExpr).join(texLoadVar);
              // Reset regex search, since we modified the string.
              texLoadRegex = /(texture.*\(.*\))/g;
            }
          }
          return [texLoadLines + lines];
        }
  
        CTexUnit.prototype.getTexType = function CTexUnit_getTexType() {
          if (this.enabled_texCube) {
            return GL_TEXTURE_CUBE_MAP;
          } else if (this.enabled_tex3D) {
            return GL_TEXTURE_3D;
          } else if (this.enabled_tex2D) {
            return GL_TEXTURE_2D;
          } else if (this.enabled_tex1D) {
            return GL_TEXTURE_1D;
          }
          return 0;
        }
  
        CTexEnv.prototype.genPassLines = function CTexEnv_genPassLines(passOutputVar, passInputVar, texUnitID) {
          switch (this.mode) {
            case GL_REPLACE: {
              /* RGB:
               * Cv = Cs
               * Av = Ap // Note how this is different, and that we'll
               *            need to track the bound texture internalFormat
               *            to get this right.
               *
               * RGBA:
               * Cv = Cs
               * Av = As
               */
              return [
                "vec4 " + passOutputVar + " = " + genTexUnitSampleExpr(texUnitID) + ";",
              ];
            }
            case GL_ADD: {
              /* RGBA:
               * Cv = Cp + Cs
               * Av = ApAs
               */
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var texVar = prefix + "tex";
              var colorVar = prefix + "color";
              var alphaVar = prefix + "alpha";
  
              return [
                "vec4 " + texVar + " = " + genTexUnitSampleExpr(texUnitID) + ";",
                "vec3 " + colorVar + " = " + passInputVar + ".rgb + " + texVar + ".rgb;",
                "float " + alphaVar + " = " + passInputVar + ".a * " + texVar + ".a;",
                "vec4 " + passOutputVar + " = vec4(" + colorVar + ", " + alphaVar + ");",
              ];
            }
            case GL_MODULATE: {
              /* RGBA:
               * Cv = CpCs
               * Av = ApAs
               */
              var line = [
                "vec4 " + passOutputVar,
                " = ",
                  passInputVar,
                  " * ",
                  genTexUnitSampleExpr(texUnitID),
                ";",
              ];
              return [line.join("")];
            }
            case GL_DECAL: {
              /* RGBA:
               * Cv = Cp(1 - As) + CsAs
               * Av = Ap
               */
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var texVar = prefix + "tex";
              var colorVar = prefix + "color";
              var alphaVar = prefix + "alpha";
  
              return [
                "vec4 " + texVar + " = " + genTexUnitSampleExpr(texUnitID) + ";",
                [
                  "vec3 " + colorVar + " = ",
                    passInputVar + ".rgb * (1.0 - " + texVar + ".a)",
                      " + ",
                    texVar + ".rgb * " + texVar + ".a",
                  ";"
                ].join(""),
                "float " + alphaVar + " = " + passInputVar + ".a;",
                "vec4 " + passOutputVar + " = vec4(" + colorVar + ", " + alphaVar + ");",
              ];
            }
            case GL_BLEND: {
              /* RGBA:
               * Cv = Cp(1 - Cs) + CcCs
               * Av = As
               */
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var texVar = prefix + "tex";
              var colorVar = prefix + "color";
              var alphaVar = prefix + "alpha";
  
              return [
                "vec4 " + texVar + " = " + genTexUnitSampleExpr(texUnitID) + ";",
                [
                  "vec3 " + colorVar + " = ",
                    passInputVar + ".rgb * (1.0 - " + texVar + ".rgb)",
                      " + ",
                    PRIM_COLOR_VARYING + ".rgb * " + texVar + ".rgb",
                  ";"
                ].join(""),
                "float " + alphaVar + " = " + texVar + ".a;",
                "vec4 " + passOutputVar + " = vec4(" + colorVar + ", " + alphaVar + ");",
              ];
            }
            case GL_COMBINE: {
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var colorVar = prefix + "color";
              var alphaVar = prefix + "alpha";
              var colorLines = this.genCombinerLines(true, colorVar,
                                                     passInputVar, texUnitID,
                                                     this.colorCombiner, this.colorSrc, this.colorOp);
              var alphaLines = this.genCombinerLines(false, alphaVar,
                                                     passInputVar, texUnitID,
                                                     this.alphaCombiner, this.alphaSrc, this.alphaOp);
  
              // Generate scale, but avoid generating an identity op that multiplies by one.
              var scaledColor = (this.colorScale == 1) ? colorVar : (colorVar + " * " + valToFloatLiteral(this.colorScale));
              var scaledAlpha = (this.alphaScale == 1) ? alphaVar : (alphaVar + " * " + valToFloatLiteral(this.alphaScale));
  
              var line = [
                "vec4 " + passOutputVar,
                " = ",
                  "vec4(",
                      scaledColor,
                      ", ",
                      scaledAlpha,
                  ")",
                ";",
              ].join("");
              return [].concat(colorLines, alphaLines, [line]);
            }
          }
  
          return abort_noSupport("Unsupported TexEnv mode: 0x" + this.mode.toString(16));
        }
  
        CTexEnv.prototype.genCombinerLines = function CTexEnv_getCombinerLines(isColor, outputVar,
                                                                               passInputVar, texUnitID,
                                                                               combiner, srcArr, opArr)
        {
          var argsNeeded = null;
          switch (combiner) {
            case GL_REPLACE:
              argsNeeded = 1;
              break;
  
            case GL_MODULATE:
            case GL_ADD:
            case GL_SUBTRACT:
              argsNeeded = 2;
              break;
  
            case GL_INTERPOLATE:
              argsNeeded = 3;
              break;
  
            default:
              return abort_noSupport("Unsupported combiner: 0x" + combiner.toString(16));
          }
  
          var constantExpr = [
            "vec4(",
              valToFloatLiteral(this.envColor[0]),
              ", ",
              valToFloatLiteral(this.envColor[1]),
              ", ",
              valToFloatLiteral(this.envColor[2]),
              ", ",
              valToFloatLiteral(this.envColor[3]),
            ")",
          ].join("");
          var src0Expr = (argsNeeded >= 1) ? genCombinerSourceExpr(texUnitID, constantExpr, passInputVar, srcArr[0], opArr[0])
                                           : null;
          var src1Expr = (argsNeeded >= 2) ? genCombinerSourceExpr(texUnitID, constantExpr, passInputVar, srcArr[1], opArr[1])
                                           : null;
          var src2Expr = (argsNeeded >= 3) ? genCombinerSourceExpr(texUnitID, constantExpr, passInputVar, srcArr[2], opArr[2])
                                           : null;
  
          var outputType = isColor ? "vec3" : "float";
          var lines = null;
          switch (combiner) {
            case GL_REPLACE: {
              var line = [
                outputType + " " + outputVar,
                " = ",
                  src0Expr,
                ";",
              ];
              lines = [line.join("")];
              break;
            }
            case GL_MODULATE: {
              var line = [
                outputType + " " + outputVar + " = ",
                  src0Expr + " * " + src1Expr,
                ";",
              ];
              lines = [line.join("")];
              break;
            }
            case GL_ADD: {
              var line = [
                outputType + " " + outputVar + " = ",
                  src0Expr + " + " + src1Expr,
                ";",
              ];
              lines = [line.join("")];
              break;
            }
            case GL_SUBTRACT: {
              var line = [
                outputType + " " + outputVar + " = ",
                  src0Expr + " - " + src1Expr,
                ";",
              ];
              lines = [line.join("")];
              break;
            }
            case GL_INTERPOLATE: {
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var arg2Var = prefix + "colorSrc2";
              var arg2Line = getTypeFromCombineOp(this.colorOp[2]) + " " + arg2Var + " = " + src2Expr + ";";
  
              var line = [
                outputType + " " + outputVar,
                " = ",
                  src0Expr + " * " + arg2Var,
                  " + ",
                  src1Expr + " * (1.0 - " + arg2Var + ")",
                ";",
              ];
              lines = [
                arg2Line,
                line.join(""),
              ];
              break;
            }
  
            default:
              return abort_sanity("Unmatched TexEnv.colorCombiner?");
          }
  
          return lines;
        }
  
        return {
          // Exports:
          init: function(gl, specifiedMaxTextureImageUnits) {
            var maxTexUnits = 0;
            if (specifiedMaxTextureImageUnits) {
              maxTexUnits = specifiedMaxTextureImageUnits;
            } else if (gl) {
              maxTexUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            }
            s_texUnits = [];
            for (var i = 0; i < maxTexUnits; i++) {
              s_texUnits.push(new CTexUnit());
            }
          },
  
          setGLSLVars: function(uTexUnitPrefix, vTexCoordPrefix, vPrimColor, uTexMatrixPrefix) {
            TEX_UNIT_UNIFORM_PREFIX   = uTexUnitPrefix;
            TEX_COORD_VARYING_PREFIX  = vTexCoordPrefix;
            PRIM_COLOR_VARYING        = vPrimColor;
            TEX_MATRIX_UNIFORM_PREFIX = uTexMatrixPrefix;
          },
  
          genAllPassLines: function(resultDest, indentSize) {
            indentSize = indentSize || 0;
  
            s_requiredTexUnitsForPass.length = 0; // Clear the list.
            var lines = [];
            var lastPassVar = PRIM_COLOR_VARYING;
            for (var i = 0; i < s_texUnits.length; i++) {
              if (!s_texUnits[i].enabled()) continue;
  
              s_requiredTexUnitsForPass.push(i);
  
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + i + "_";
              var passOutputVar = prefix + "result";
  
              var newLines = s_texUnits[i].genPassLines(passOutputVar, lastPassVar, i);
              lines = lines.concat(newLines, [""]);
  
              lastPassVar = passOutputVar;
            }
            lines.push(resultDest + " = " + lastPassVar + ";");
  
            var indent = "";
            for (var i = 0; i < indentSize; i++) indent += " ";
  
            var output = indent + lines.join("\n" + indent);
  
            return output;
          },
  
          getUsedTexUnitList: function() {
            return s_requiredTexUnitsForPass;
          },
  
          traverseState: function(keyView) {
            for (var i = 0; i < s_texUnits.length; i++) {
              s_texUnits[i].traverseState(keyView);
            }
          },
  
          getTexUnitType: function(texUnitID) {
            return s_texUnits[texUnitID].getTexType();
          },
  
          // Hooks:
          hook_activeTexture: function(texture) {
            s_activeTexture = texture - GL_TEXTURE0;
          },
  
          hook_enable: function(cap) {
            var cur = getCurTexUnit();
            switch (cap) {
              case GL_TEXTURE_1D:
                if (!cur.enabled_tex1D) {
                  GLImmediate.currentRenderer = null; // Renderer state changed, and must be recreated or looked up again.
                  cur.enabled_tex1D = true;
                  cur.texTypesEnabled |= 1;
                }
                break;
              case GL_TEXTURE_2D:
                if (!cur.enabled_tex2D) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_tex2D = true;
                  cur.texTypesEnabled |= 2;
                }
                break;
              case GL_TEXTURE_3D:
                if (!cur.enabled_tex3D) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_tex3D = true;
                  cur.texTypesEnabled |= 4;
                }
                break;
              case GL_TEXTURE_CUBE_MAP:
                if (!cur.enabled_texCube) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_texCube = true;
                  cur.texTypesEnabled |= 8;
                }
                break;
            }
          },
  
          hook_disable: function(cap) {
            var cur = getCurTexUnit();
            switch (cap) {
              case GL_TEXTURE_1D:
                if (cur.enabled_tex1D) {
                  GLImmediate.currentRenderer = null; // Renderer state changed, and must be recreated or looked up again.
                  cur.enabled_tex1D = false;
                  cur.texTypesEnabled &= ~1;
                }
                break;
              case GL_TEXTURE_2D:
                if (cur.enabled_tex2D) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_tex2D = false;
                  cur.texTypesEnabled &= ~2;
                }
                break;
              case GL_TEXTURE_3D:
                if (cur.enabled_tex3D) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_tex3D = false;
                  cur.texTypesEnabled &= ~4;
                }
                break;
              case GL_TEXTURE_CUBE_MAP:
                if (cur.enabled_texCube) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_texCube = false;
                  cur.texTypesEnabled &= ~8;
                }
                break;
            }
          },
  
          hook_texEnvf: function(target, pname, param) {
            if (target != GL_TEXTURE_ENV)
              return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_RGB_SCALE:
                if (env.colorScale != param) {
                  env.invalidateKey(); // We changed FFP emulation renderer state.
                  env.colorScale = param;
                }
                break;
              case GL_ALPHA_SCALE:
                if (env.alphaScale != param) {
                  env.invalidateKey();
                  env.alphaScale = param;
                }
                break;
  
              default:
                Module.printErr('WARNING: Unhandled `pname` in call to `glTexEnvf`.');
            }
          },
  
          hook_texEnvi: function(target, pname, param) {
            if (target != GL_TEXTURE_ENV)
              return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_TEXTURE_ENV_MODE:
                if (env.mode != param) {
                  env.invalidateKey(); // We changed FFP emulation renderer state.
                  env.mode = param;
                }
                break;
  
              case GL_COMBINE_RGB:
                if (env.colorCombiner != param) {
                  env.invalidateKey();
                  env.colorCombiner = param;
                }
                break;
              case GL_COMBINE_ALPHA:
                if (env.alphaCombiner != param) {
                  env.invalidateKey();
                  env.alphaCombiner = param;
                }
                break;
  
              case GL_SRC0_RGB:
                if (env.colorSrc[0] != param) {
                  env.invalidateKey();
                  env.colorSrc[0] = param;
                }
                break;
              case GL_SRC1_RGB:
                if (env.colorSrc[1] != param) {
                  env.invalidateKey();
                  env.colorSrc[1] = param;
                }
                break;
              case GL_SRC2_RGB:
                if (env.colorSrc[2] != param) {
                  env.invalidateKey();
                  env.colorSrc[2] = param;
                }
                break;
  
              case GL_SRC0_ALPHA:
                if (env.alphaSrc[0] != param) {
                  env.invalidateKey();
                  env.alphaSrc[0] = param;
                }
                break;
              case GL_SRC1_ALPHA:
                if (env.alphaSrc[1] != param) {
                  env.invalidateKey();
                  env.alphaSrc[1] = param;
                }
                break;
              case GL_SRC2_ALPHA:
                if (env.alphaSrc[2] != param) {
                  env.invalidateKey();
                  env.alphaSrc[2] = param;
                }
                break;
  
              case GL_OPERAND0_RGB:
                if (env.colorOp[0] != param) {
                  env.invalidateKey();
                  env.colorOp[0] = param;
                }
                break;
              case GL_OPERAND1_RGB:
                if (env.colorOp[1] != param) {
                  env.invalidateKey();
                  env.colorOp[1] = param;
                }
                break;
              case GL_OPERAND2_RGB:
                if (env.colorOp[2] != param) {
                  env.invalidateKey();
                  env.colorOp[2] = param;
                }
                break;
  
              case GL_OPERAND0_ALPHA:
                if (env.alphaOp[0] != param) {
                  env.invalidateKey();
                  env.alphaOp[0] = param;
                }
                break;
              case GL_OPERAND1_ALPHA:
                if (env.alphaOp[1] != param) {
                  env.invalidateKey();
                  env.alphaOp[1] = param;
                }
                break;
              case GL_OPERAND2_ALPHA:
                if (env.alphaOp[2] != param) {
                  env.invalidateKey();
                  env.alphaOp[2] = param;
                }
                break;
  
              case GL_RGB_SCALE:
                if (env.colorScale != param) {
                  env.invalidateKey();
                  env.colorScale = param;
                }
                break;
              case GL_ALPHA_SCALE:
                if (env.alphaScale != param) {
                  env.invalidateKey();
                  env.alphaScale = param;
                }
                break;
  
              default:
                Module.printErr('WARNING: Unhandled `pname` in call to `glTexEnvi`.');
            }
          },
  
          hook_texEnvfv: function(target, pname, params) {
            if (target != GL_TEXTURE_ENV) return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_TEXTURE_ENV_COLOR: {
                for (var i = 0; i < 4; i++) {
                  var param = HEAPF32[(((params)+(i*4))>>2)];
                  if (env.envColor[i] != param) {
                    env.invalidateKey(); // We changed FFP emulation renderer state.
                    env.envColor[i] = param;
                  }
                }
                break
              }
              default:
                Module.printErr('WARNING: Unhandled `pname` in call to `glTexEnvfv`.');
            }
          },
  
          hook_getTexEnviv: function(target, pname, param) {
            if (target != GL_TEXTURE_ENV)
              return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_TEXTURE_ENV_MODE:
                HEAP32[((param)>>2)]=env.mode;
                return;
  
              case GL_TEXTURE_ENV_COLOR:
                HEAP32[((param)>>2)]=Math.max(Math.min(env.envColor[0]*255, 255, -255));
                HEAP32[(((param)+(1))>>2)]=Math.max(Math.min(env.envColor[1]*255, 255, -255));
                HEAP32[(((param)+(2))>>2)]=Math.max(Math.min(env.envColor[2]*255, 255, -255));
                HEAP32[(((param)+(3))>>2)]=Math.max(Math.min(env.envColor[3]*255, 255, -255));
                return;
  
              case GL_COMBINE_RGB:
                HEAP32[((param)>>2)]=env.colorCombiner;
                return;
  
              case GL_COMBINE_ALPHA:
                HEAP32[((param)>>2)]=env.alphaCombiner;
                return;
  
              case GL_SRC0_RGB:
                HEAP32[((param)>>2)]=env.colorSrc[0];
                return;
  
              case GL_SRC1_RGB:
                HEAP32[((param)>>2)]=env.colorSrc[1];
                return;
  
              case GL_SRC2_RGB:
                HEAP32[((param)>>2)]=env.colorSrc[2];
                return;
  
              case GL_SRC0_ALPHA:
                HEAP32[((param)>>2)]=env.alphaSrc[0];
                return;
  
              case GL_SRC1_ALPHA:
                HEAP32[((param)>>2)]=env.alphaSrc[1];
                return;
  
              case GL_SRC2_ALPHA:
                HEAP32[((param)>>2)]=env.alphaSrc[2];
                return;
  
              case GL_OPERAND0_RGB:
                HEAP32[((param)>>2)]=env.colorOp[0];
                return;
  
              case GL_OPERAND1_RGB:
                HEAP32[((param)>>2)]=env.colorOp[1];
                return;
  
              case GL_OPERAND2_RGB:
                HEAP32[((param)>>2)]=env.colorOp[2];
                return;
  
              case GL_OPERAND0_ALPHA:
                HEAP32[((param)>>2)]=env.alphaOp[0];
                return;
  
              case GL_OPERAND1_ALPHA:
                HEAP32[((param)>>2)]=env.alphaOp[1];
                return;
  
              case GL_OPERAND2_ALPHA:
                HEAP32[((param)>>2)]=env.alphaOp[2];
                return;
  
              case GL_RGB_SCALE:
                HEAP32[((param)>>2)]=env.colorScale;
                return;
  
              case GL_ALPHA_SCALE:
                HEAP32[((param)>>2)]=env.alphaScale;
                return;
  
              default:
                Module.printErr('WARNING: Unhandled `pname` in call to `glGetTexEnvi`.');
            }
          },
  
          hook_getTexEnvfv: function(target, pname, param) {
            if (target != GL_TEXTURE_ENV)
              return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_TEXTURE_ENV_COLOR:
                HEAPF32[((param)>>2)]=env.envColor[0];
                HEAPF32[(((param)+(4))>>2)]=env.envColor[1];
                HEAPF32[(((param)+(8))>>2)]=env.envColor[2];
                HEAPF32[(((param)+(12))>>2)]=env.envColor[3];
                return;
            }
          }
        };
      },vertexData:null,vertexDataU8:null,tempData:null,indexData:null,vertexCounter:0,mode:-1,rendererCache:null,rendererComponents:[],rendererComponentPointer:0,lastRenderer:null,lastArrayBuffer:null,lastProgram:null,lastStride:-1,matrix:[],matrixStack:[],currentMatrix:0,tempMatrix:null,matricesModified:false,useTextureMatrix:false,VERTEX:0,NORMAL:1,COLOR:2,TEXTURE0:3,NUM_ATTRIBUTES:-1,MAX_TEXTURES:-1,totalEnabledClientAttributes:0,enabledClientAttributes:[0,0],clientAttributes:[],liveClientAttributes:[],currentRenderer:null,modifiedClientAttributes:false,clientActiveTexture:0,clientColor:null,usedTexUnitList:[],fixedFunctionProgram:null,setClientAttribute:function setClientAttribute(name, size, type, stride, pointer) {
        var attrib = GLImmediate.clientAttributes[name];
        if (!attrib) {
          for (var i = 0; i <= name; i++) { // keep flat
            if (!GLImmediate.clientAttributes[i]) {
              GLImmediate.clientAttributes[i] = {
                name: name,
                size: size,
                type: type,
                stride: stride,
                pointer: pointer,
                offset: 0
              };
            }
          }
        } else {
          attrib.name = name;
          attrib.size = size;
          attrib.type = type;
          attrib.stride = stride;
          attrib.pointer = pointer;
          attrib.offset = 0;
        }
        GLImmediate.modifiedClientAttributes = true;
      },addRendererComponent:function addRendererComponent(name, size, type) {
        if (!GLImmediate.rendererComponents[name]) {
          GLImmediate.rendererComponents[name] = 1;
          GLImmediate.enabledClientAttributes[name] = true;
          GLImmediate.setClientAttribute(name, size, type, 0, GLImmediate.rendererComponentPointer);
          GLImmediate.rendererComponentPointer += size * GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
        } else {
          GLImmediate.rendererComponents[name]++;
        }
      },disableBeginEndClientAttributes:function disableBeginEndClientAttributes() {
        for (var i = 0; i < GLImmediate.NUM_ATTRIBUTES; i++) {
          if (GLImmediate.rendererComponents[i]) GLImmediate.enabledClientAttributes[i] = false;
        }
      },getRenderer:function getRenderer() {
        // If no FFP state has changed that would have forced to re-evaluate which FFP emulation shader to use,
        // we have the currently used renderer in cache, and can immediately return that.
        if (GLImmediate.currentRenderer) {
          return GLImmediate.currentRenderer;
        }
        // return a renderer object given the liveClientAttributes
        // we maintain a cache of renderers, optimized to not generate garbage
        var attributes = GLImmediate.liveClientAttributes;
        var cacheMap = GLImmediate.rendererCache;
        var keyView = cacheMap.getStaticKeyView().reset();
  
        // By attrib state:
        var enabledAttributesKey = 0;
        for (var i = 0; i < attributes.length; i++) {
          enabledAttributesKey |= 1 << attributes[i].name;
        }
  
        // By fog state:
        var fogParam = 0;
        if (GLEmulation.fogEnabled) {
          switch (GLEmulation.fogMode) {
            case 0x0801: // GL_EXP2
              fogParam = 1;
              break;
            case 0x2601: // GL_LINEAR
              fogParam = 2;
              break;
            default: // default to GL_EXP
              fogParam = 3;
              break;
          }
        }
        keyView.next((enabledAttributesKey << 2) | fogParam);
  
        // By cur program:
        keyView.next(GL.currProgram);
        if (!GL.currProgram) {
          GLImmediate.TexEnvJIT.traverseState(keyView);
        }
  
        // If we don't already have it, create it.
        var renderer = keyView.get();
        if (!renderer) {
          renderer = GLImmediate.createRenderer();
          GLImmediate.currentRenderer = renderer;
          keyView.set(renderer);
          return renderer;
        }
        GLImmediate.currentRenderer = renderer; // Cache the currently used renderer, so later lookups without state changes can get this fast.
        return renderer;
      },createRenderer:function createRenderer(renderer) {
        var useCurrProgram = !!GL.currProgram;
        var hasTextures = false;
        for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
          var texAttribName = GLImmediate.TEXTURE0 + i;
          if (!GLImmediate.enabledClientAttributes[texAttribName])
            continue;
  
  
          hasTextures = true;
        }
  
        var ret = {
          init: function init() {
            // For fixed-function shader generation.
            var uTexUnitPrefix = 'u_texUnit';
            var aTexCoordPrefix = 'a_texCoord';
            var vTexCoordPrefix = 'v_texCoord';
            var vPrimColor = 'v_color';
            var uTexMatrixPrefix = GLImmediate.useTextureMatrix ? 'u_textureMatrix' : null;
  
            if (useCurrProgram) {
              if (GL.shaderInfos[GL.programShaders[GL.currProgram][0]].type == GLctx.VERTEX_SHADER) {
                this.vertexShader = GL.shaders[GL.programShaders[GL.currProgram][0]];
                this.fragmentShader = GL.shaders[GL.programShaders[GL.currProgram][1]];
              } else {
                this.vertexShader = GL.shaders[GL.programShaders[GL.currProgram][1]];
                this.fragmentShader = GL.shaders[GL.programShaders[GL.currProgram][0]];
              }
              this.program = GL.programs[GL.currProgram];
              this.usedTexUnitList = [];
            } else {
              // IMPORTANT NOTE: If you parameterize the shader source based on any runtime values
              // in order to create the least expensive shader possible based on the features being
              // used, you should also update the code in the beginning of getRenderer to make sure
              // that you cache the renderer based on the said parameters.
              if (GLEmulation.fogEnabled) {
                switch (GLEmulation.fogMode) {
                  case 0x0801: // GL_EXP2
                    // fog = exp(-(gl_Fog.density * gl_FogFragCoord)^2)
                    var fogFormula = '  float fog = exp(-u_fogDensity * u_fogDensity * ecDistance * ecDistance); \n';
                    break;
                  case 0x2601: // GL_LINEAR
                    // fog = (gl_Fog.end - gl_FogFragCoord) * gl_fog.scale
                    var fogFormula = '  float fog = (u_fogEnd - ecDistance) * u_fogScale; \n';
                    break;
                  default: // default to GL_EXP
                    // fog = exp(-gl_Fog.density * gl_FogFragCoord)
                    var fogFormula = '  float fog = exp(-u_fogDensity * ecDistance); \n';
                    break;
                }
              }
  
              GLImmediate.TexEnvJIT.setGLSLVars(uTexUnitPrefix, vTexCoordPrefix, vPrimColor, uTexMatrixPrefix);
              var fsTexEnvPass = GLImmediate.TexEnvJIT.genAllPassLines('gl_FragColor', 2);
  
              var texUnitAttribList = '';
              var texUnitVaryingList = '';
              var texUnitUniformList = '';
              var vsTexCoordInits = '';
              this.usedTexUnitList = GLImmediate.TexEnvJIT.getUsedTexUnitList();
              for (var i = 0; i < this.usedTexUnitList.length; i++) {
                var texUnit = this.usedTexUnitList[i];
                texUnitAttribList += 'attribute vec4 ' + aTexCoordPrefix + texUnit + ';\n';
                texUnitVaryingList += 'varying vec4 ' + vTexCoordPrefix + texUnit + ';\n';
                texUnitUniformList += 'uniform sampler2D ' + uTexUnitPrefix + texUnit + ';\n';
                vsTexCoordInits += '  ' + vTexCoordPrefix + texUnit + ' = ' + aTexCoordPrefix + texUnit + ';\n';
  
                if (GLImmediate.useTextureMatrix) {
                  texUnitUniformList += 'uniform mat4 ' + uTexMatrixPrefix + texUnit + ';\n';
                }
              }
  
              var vsFogVaryingInit = null;
              if (GLEmulation.fogEnabled) {
                vsFogVaryingInit = '  v_fogFragCoord = abs(ecPosition.z);\n';
              }
  
              var vsSource = [
                'attribute vec4 a_position;',
                'attribute vec4 a_color;',
                'varying vec4 v_color;',
                texUnitAttribList,
                texUnitVaryingList,
                (GLEmulation.fogEnabled ? 'varying float v_fogFragCoord;' : null),
                'uniform mat4 u_modelView;',
                'uniform mat4 u_projection;',
                'void main()',
                '{',
                '  vec4 ecPosition = u_modelView * a_position;', // eye-coordinate position
                '  gl_Position = u_projection * ecPosition;',
                '  v_color = a_color;',
                vsTexCoordInits,
                vsFogVaryingInit,
                '}',
                ''
              ].join('\n').replace(/\n\n+/g, '\n');
  
              this.vertexShader = GLctx.createShader(GLctx.VERTEX_SHADER);
              GLctx.shaderSource(this.vertexShader, vsSource);
              GLctx.compileShader(this.vertexShader);
  
              var fogHeaderIfNeeded = null;
              if (GLEmulation.fogEnabled) {
                fogHeaderIfNeeded = [
                  '',
                  'varying float v_fogFragCoord; ',
                  'uniform vec4 u_fogColor;      ',
                  'uniform float u_fogEnd;       ',
                  'uniform float u_fogScale;     ',
                  'uniform float u_fogDensity;   ',
                  'float ffog(in float ecDistance) { ',
                  fogFormula,
                  '  fog = clamp(fog, 0.0, 1.0); ',
                  '  return fog;                 ',
                  '}',
                  '',
                ].join("\n");
              }
  
              var fogPass = null;
              if (GLEmulation.fogEnabled) {
                fogPass = 'gl_FragColor = vec4(mix(u_fogColor.rgb, gl_FragColor.rgb, ffog(v_fogFragCoord)), gl_FragColor.a);\n';
              }
  
              var fsSource = [
                'precision mediump float;',
                texUnitVaryingList,
                texUnitUniformList,
                'varying vec4 v_color;',
                fogHeaderIfNeeded,
                'void main()',
                '{',
                fsTexEnvPass,
                fogPass,
                '}',
                ''
              ].join("\n").replace(/\n\n+/g, '\n');
  
              this.fragmentShader = GLctx.createShader(GLctx.FRAGMENT_SHADER);
              GLctx.shaderSource(this.fragmentShader, fsSource);
              GLctx.compileShader(this.fragmentShader);
  
              this.program = GLctx.createProgram();
              GLctx.attachShader(this.program, this.vertexShader);
              GLctx.attachShader(this.program, this.fragmentShader);
  
              // As optimization, bind all attributes to prespecified locations, so that the FFP emulation
              // code can submit attributes to any generated FFP shader without having to examine each shader in turn.
              // These prespecified locations are only assumed if GL_FFP_ONLY is specified, since user could also create their
              // own shaders that didn't have attributes in the same locations.
              GLctx.bindAttribLocation(this.program, GLImmediate.VERTEX, 'a_position');
              GLctx.bindAttribLocation(this.program, GLImmediate.COLOR, 'a_color');
              GLctx.bindAttribLocation(this.program, GLImmediate.NORMAL, 'a_normal');
              var maxVertexAttribs = GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);
              for (var i = 0; i < GLImmediate.MAX_TEXTURES && GLImmediate.TEXTURE0 + i < maxVertexAttribs; i++) {
                GLctx.bindAttribLocation(this.program, GLImmediate.TEXTURE0 + i, 'a_texCoord'+i);
                GLctx.bindAttribLocation(this.program, GLImmediate.TEXTURE0 + i, aTexCoordPrefix+i);
              }
              GLctx.linkProgram(this.program);
            }
  
            // Stores an array that remembers which matrix uniforms are up-to-date in this FFP renderer, so they don't need to be resubmitted
            // each time we render with this program.
            this.textureMatrixVersion = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  
            this.positionLocation = GLctx.getAttribLocation(this.program, 'a_position');
  
            this.texCoordLocations = [];
  
            for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
              if (!GLImmediate.enabledClientAttributes[GLImmediate.TEXTURE0 + i]) {
                this.texCoordLocations[i] = -1;
                continue;
              }
  
              if (useCurrProgram) {
                this.texCoordLocations[i] = GLctx.getAttribLocation(this.program, 'a_texCoord' + i);
              } else {
                this.texCoordLocations[i] = GLctx.getAttribLocation(this.program, aTexCoordPrefix + i);
              }
            }
            this.colorLocation = GLctx.getAttribLocation(this.program, 'a_color');
            if (!useCurrProgram) {
              // Temporarily switch to the program so we can set our sampler uniforms early.
              var prevBoundProg = GLctx.getParameter(GLctx.CURRENT_PROGRAM);
              GLctx.useProgram(this.program);
              {
                for (var i = 0; i < this.usedTexUnitList.length; i++) {
                  var texUnitID = this.usedTexUnitList[i];
                  var texSamplerLoc = GLctx.getUniformLocation(this.program, uTexUnitPrefix + texUnitID);
                  GLctx.uniform1i(texSamplerLoc, texUnitID);
                }
              }
              // The default color attribute value is not the same as the default for all other attribute streams (0,0,0,1) but (1,1,1,1),
              // so explicitly set it right at start.
              GLctx.vertexAttrib4fv(this.colorLocation, [1,1,1,1]);
              GLctx.useProgram(prevBoundProg);
            }
  
            this.textureMatrixLocations = [];
            for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
              this.textureMatrixLocations[i] = GLctx.getUniformLocation(this.program, 'u_textureMatrix' + i);
            }
            this.normalLocation = GLctx.getAttribLocation(this.program, 'a_normal');
  
            this.modelViewLocation = GLctx.getUniformLocation(this.program, 'u_modelView');
            this.projectionLocation = GLctx.getUniformLocation(this.program, 'u_projection');
  
            this.hasTextures = hasTextures;
            this.hasNormal = GLImmediate.enabledClientAttributes[GLImmediate.NORMAL] &&
                             GLImmediate.clientAttributes[GLImmediate.NORMAL].size > 0 &&
                             this.normalLocation >= 0;
            this.hasColor = (this.colorLocation === 0) || this.colorLocation > 0;
  
            this.floatType = GLctx.FLOAT; // minor optimization
  
            this.fogColorLocation = GLctx.getUniformLocation(this.program, 'u_fogColor');
            this.fogEndLocation = GLctx.getUniformLocation(this.program, 'u_fogEnd');
            this.fogScaleLocation = GLctx.getUniformLocation(this.program, 'u_fogScale');
            this.fogDensityLocation = GLctx.getUniformLocation(this.program, 'u_fogDensity');
            this.hasFog = !!(this.fogColorLocation || this.fogEndLocation ||
                             this.fogScaleLocation || this.fogDensityLocation);
          },
  
          prepare: function prepare() {
            // Calculate the array buffer
            var arrayBuffer;
            if (!GL.currArrayBuffer) {
              var start = GLImmediate.firstVertex*GLImmediate.stride;
              var end = GLImmediate.lastVertex*GLImmediate.stride;
              arrayBuffer = GL.getTempVertexBuffer(end);
              // TODO: consider using the last buffer we bound, if it was larger. downside is larger buffer, but we might avoid rebinding and preparing
            } else {
              arrayBuffer = GL.currArrayBuffer;
            }
  
            // If the array buffer is unchanged and the renderer as well, then we can avoid all the work here
            // XXX We use some heuristics here, and this may not work in all cases. Try disabling GL_UNSAFE_OPTS if you
            // have odd glitches
            var lastRenderer = GLImmediate.lastRenderer;
            var canSkip = this == lastRenderer &&
                          arrayBuffer == GLImmediate.lastArrayBuffer &&
                          (GL.currProgram || this.program) == GLImmediate.lastProgram &&
                          GLImmediate.stride == GLImmediate.lastStride &&
                          !GLImmediate.matricesModified;
            if (!canSkip && lastRenderer) lastRenderer.cleanup();
            if (!GL.currArrayBuffer) {
              // Bind the array buffer and upload data after cleaning up the previous renderer
  
              if (arrayBuffer != GLImmediate.lastArrayBuffer) {
                GLctx.bindBuffer(GLctx.ARRAY_BUFFER, arrayBuffer);
                GLImmediate.lastArrayBuffer = arrayBuffer;
              }
  
              GLctx.bufferSubData(GLctx.ARRAY_BUFFER, start, GLImmediate.vertexData.subarray(start >> 2, end >> 2));
            }
            if (canSkip) return;
            GLImmediate.lastRenderer = this;
            GLImmediate.lastProgram = GL.currProgram || this.program;
            GLImmediate.lastStride == GLImmediate.stride;
            GLImmediate.matricesModified = false;
  
            if (!GL.currProgram) {
              if (GLImmediate.fixedFunctionProgram != this.program) {
                GLctx.useProgram(this.program);
                GLImmediate.fixedFunctionProgram = this.program;
              }
            }
  
            if (this.modelViewLocation && this.modelViewMatrixVersion != GLImmediate.matrixVersion[0/*m*/]) {
              this.modelViewMatrixVersion = GLImmediate.matrixVersion[0/*m*/];
              GLctx.uniformMatrix4fv(this.modelViewLocation, false, GLImmediate.matrix[0/*m*/]);
            }
            if (this.projectionLocation && this.projectionMatrixVersion != GLImmediate.matrixVersion[1/*p*/]) {
              this.projectionMatrixVersion = GLImmediate.matrixVersion[1/*p*/];
              GLctx.uniformMatrix4fv(this.projectionLocation, false, GLImmediate.matrix[1/*p*/]);
            }
  
            var clientAttributes = GLImmediate.clientAttributes;
            var posAttr = clientAttributes[GLImmediate.VERTEX];
  
  
            GLctx.vertexAttribPointer(this.positionLocation, posAttr.size, posAttr.type, false, GLImmediate.stride, posAttr.offset);
            GLctx.enableVertexAttribArray(this.positionLocation);
            if (this.hasNormal) {
              var normalAttr = clientAttributes[GLImmediate.NORMAL];
              GLctx.vertexAttribPointer(this.normalLocation, normalAttr.size, normalAttr.type, true, GLImmediate.stride, normalAttr.offset);
              GLctx.enableVertexAttribArray(this.normalLocation);
            }
            if (this.hasTextures) {
              for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
                var attribLoc = this.texCoordLocations[i];
                if (attribLoc === undefined || attribLoc < 0) continue;
                var texAttr = clientAttributes[GLImmediate.TEXTURE0+i];
  
                if (texAttr.size) {
                  GLctx.vertexAttribPointer(attribLoc, texAttr.size, texAttr.type, false, GLImmediate.stride, texAttr.offset);
                  GLctx.enableVertexAttribArray(attribLoc);
                } else {
                  // These two might be dangerous, but let's try them.
                  GLctx.vertexAttrib4f(attribLoc, 0, 0, 0, 1);
                  GLctx.disableVertexAttribArray(attribLoc);
                }
                var t = 2/*t*/+i;
                if (this.textureMatrixLocations[i] && this.textureMatrixVersion[t] != GLImmediate.matrixVersion[t]) { // XXX might we need this even without the condition we are currently in?
                  this.textureMatrixVersion[t] = GLImmediate.matrixVersion[t];
                  GLctx.uniformMatrix4fv(this.textureMatrixLocations[i], false, GLImmediate.matrix[t]);
                }
              }
            }
            if (GLImmediate.enabledClientAttributes[GLImmediate.COLOR]) {
              var colorAttr = clientAttributes[GLImmediate.COLOR];
              GLctx.vertexAttribPointer(this.colorLocation, colorAttr.size, colorAttr.type, true, GLImmediate.stride, colorAttr.offset);
              GLctx.enableVertexAttribArray(this.colorLocation);
            }
            else if (this.hasColor) {
              GLctx.disableVertexAttribArray(this.colorLocation);
              GLctx.vertexAttrib4fv(this.colorLocation, GLImmediate.clientColor);
            }
            if (this.hasFog) {
              if (this.fogColorLocation) GLctx.uniform4fv(this.fogColorLocation, GLEmulation.fogColor);
              if (this.fogEndLocation) GLctx.uniform1f(this.fogEndLocation, GLEmulation.fogEnd);
              if (this.fogScaleLocation) GLctx.uniform1f(this.fogScaleLocation, 1/(GLEmulation.fogEnd - GLEmulation.fogStart));
              if (this.fogDensityLocation) GLctx.uniform1f(this.fogDensityLocation, GLEmulation.fogDensity);
            }
          },
  
          cleanup: function cleanup() {
            GLctx.disableVertexAttribArray(this.positionLocation);
            if (this.hasTextures) {
              for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
                if (GLImmediate.enabledClientAttributes[GLImmediate.TEXTURE0+i] && this.texCoordLocations[i] >= 0) {
                  GLctx.disableVertexAttribArray(this.texCoordLocations[i]);
                }
              }
            }
            if (this.hasColor) {
              GLctx.disableVertexAttribArray(this.colorLocation);
            }
            if (this.hasNormal) {
              GLctx.disableVertexAttribArray(this.normalLocation);
            }
            if (!GL.currProgram) {
              GLctx.useProgram(null);
              GLImmediate.fixedFunctionProgram = 0;
            }
            if (!GL.currArrayBuffer) {
              GLctx.bindBuffer(GLctx.ARRAY_BUFFER, null);
              GLImmediate.lastArrayBuffer = null;
            }
  
            GLImmediate.lastRenderer = null;
            GLImmediate.lastProgram = null;
            GLImmediate.matricesModified = true;
          }
        };
        ret.init();
        return ret;
      },setupFuncs:function () {
        // Replace some functions with immediate-mode aware versions. If there are no client
        // attributes enabled, and we use webgl-friendly modes (no GL_QUADS), then no need
        // for emulation
        _glDrawArrays = _emscripten_glDrawArrays = function _glDrawArrays(mode, first, count) {
          if (GLImmediate.totalEnabledClientAttributes == 0 && mode <= 6) {
            GLctx.drawArrays(mode, first, count);
            return;
          }
          GLImmediate.prepareClientAttributes(count, false);
          GLImmediate.mode = mode;
          if (!GL.currArrayBuffer) {
            GLImmediate.vertexData = HEAPF32.subarray((GLImmediate.vertexPointer)>>2,(GLImmediate.vertexPointer + (first+count)*GLImmediate.stride)>>2); // XXX assuming float
            GLImmediate.firstVertex = first;
            GLImmediate.lastVertex = first + count;
          }
          GLImmediate.flush(null, first);
          GLImmediate.mode = -1;
        };
  
        _glDrawElements = _emscripten_glDrawElements = function _glDrawElements(mode, count, type, indices, start, end) { // start, end are given if we come from glDrawRangeElements
          if (GLImmediate.totalEnabledClientAttributes == 0 && mode <= 6 && GL.currElementArrayBuffer) {
            GLctx.drawElements(mode, count, type, indices);
            return;
          }
          GLImmediate.prepareClientAttributes(count, false);
          GLImmediate.mode = mode;
          if (!GL.currArrayBuffer) {
            GLImmediate.firstVertex = end ? start : TOTAL_MEMORY; // if we don't know the start, set an invalid value and we will calculate it later from the indices
            GLImmediate.lastVertex = end ? end+1 : 0;
            GLImmediate.vertexData = HEAPF32.subarray((GLImmediate.vertexPointer)>>2,((end ? GLImmediate.vertexPointer + (end+1)*GLImmediate.stride : TOTAL_MEMORY))>>2); // XXX assuming float
          }
          GLImmediate.flush(count, 0, indices);
          GLImmediate.mode = -1;
        };
  
        // TexEnv stuff needs to be prepared early, so do it here.
        // init() is too late for -O2, since it freezes the GL functions
        // by that point.
        GLImmediate.MapTreeLib = GLImmediate.spawnMapTreeLib();
        GLImmediate.spawnMapTreeLib = null;
  
        GLImmediate.TexEnvJIT = GLImmediate.spawnTexEnvJIT();
        GLImmediate.spawnTexEnvJIT = null;
  
        GLImmediate.setupHooks();
      },setupHooks:function () {
        if (!GLEmulation.hasRunInit) {
          GLEmulation.init();
        }
  
        var glActiveTexture = _glActiveTexture;
        _glActiveTexture = _emscripten_glActiveTexture = function _glActiveTexture(texture) {
          GLImmediate.TexEnvJIT.hook_activeTexture(texture);
          glActiveTexture(texture);
        };
  
        var glEnable = _glEnable;
        _glEnable = _emscripten_glEnable = function _glEnable(cap) {
          GLImmediate.TexEnvJIT.hook_enable(cap);
          glEnable(cap);
        };
        var glDisable = _glDisable;
        _glDisable = _emscripten_glDisable = function _glDisable(cap) {
          GLImmediate.TexEnvJIT.hook_disable(cap);
          glDisable(cap);
        };
  
        var glTexEnvf = (typeof(_glTexEnvf) != 'undefined') ? _glTexEnvf : function(){};
        _glTexEnvf = _emscripten_glTexEnvf = function _glTexEnvf(target, pname, param) {
          GLImmediate.TexEnvJIT.hook_texEnvf(target, pname, param);
          // Don't call old func, since we are the implementor.
          //glTexEnvf(target, pname, param);
        };
        var glTexEnvi = (typeof(_glTexEnvi) != 'undefined') ? _glTexEnvi : function(){};
        _glTexEnvi = _emscripten_glTexEnvi = function _glTexEnvi(target, pname, param) {
          GLImmediate.TexEnvJIT.hook_texEnvi(target, pname, param);
          // Don't call old func, since we are the implementor.
          //glTexEnvi(target, pname, param);
        };
        var glTexEnvfv = (typeof(_glTexEnvfv) != 'undefined') ? _glTexEnvfv : function(){};
        _glTexEnvfv = _emscripten_glTexEnvfv = function _glTexEnvfv(target, pname, param) {
          GLImmediate.TexEnvJIT.hook_texEnvfv(target, pname, param);
          // Don't call old func, since we are the implementor.
          //glTexEnvfv(target, pname, param);
        };
  
        _glGetTexEnviv = function _glGetTexEnviv(target, pname, param) {
          GLImmediate.TexEnvJIT.hook_getTexEnviv(target, pname, param);
        };
  
        _glGetTexEnvfv = function _glGetTexEnvfv(target, pname, param) {
          GLImmediate.TexEnvJIT.hook_getTexEnvfv(target, pname, param);
        };
  
        var glGetIntegerv = _glGetIntegerv;
        _glGetIntegerv = _emscripten_glGetIntegerv = function _glGetIntegerv(pname, params) {
          switch (pname) {
            case 0x8B8D: { // GL_CURRENT_PROGRAM
              // Just query directly so we're working with WebGL objects.
              var cur = GLctx.getParameter(GLctx.CURRENT_PROGRAM);
              if (cur == GLImmediate.fixedFunctionProgram) {
                // Pretend we're not using a program.
                HEAP32[((params)>>2)]=0;
                return;
              }
              break;
            }
          }
          glGetIntegerv(pname, params);
        };
      },initted:false,init:function () {
        Module.printErr('WARNING: using emscripten GL immediate mode emulation. This is very limited in what it supports');
        GLImmediate.initted = true;
  
        if (!Module.useWebGL) return; // a 2D canvas may be currently used TODO: make sure we are actually called in that case
  
        // User can override the maximum number of texture units that we emulate. Using fewer texture units increases runtime performance
        // slightly, so it is advantageous to choose as small value as needed.
        GLImmediate.MAX_TEXTURES = Module['GL_MAX_TEXTURE_IMAGE_UNITS'] || GLctx.getParameter(GLctx.MAX_TEXTURE_IMAGE_UNITS);
  
        GLImmediate.TexEnvJIT.init(GLctx, GLImmediate.MAX_TEXTURES);
  
        GLImmediate.NUM_ATTRIBUTES = 3 /*pos+normal+color attributes*/ + GLImmediate.MAX_TEXTURES;
        GLImmediate.clientAttributes = [];
        GLEmulation.enabledClientAttribIndices = [];
        for (var i = 0; i < GLImmediate.NUM_ATTRIBUTES; i++) {
          GLImmediate.clientAttributes.push({});
          GLEmulation.enabledClientAttribIndices.push(false);
        }
  
        // Initialize matrix library
        // When user sets a matrix, increment a 'version number' on the new data, and when rendering, submit
        // the matrices to the shader program only if they have an old version of the data.
        GLImmediate.matrix = [];
        GLImmediate.matrixStack = [];
        GLImmediate.matrixVersion = [];
        for (var i = 0; i < 2 + GLImmediate.MAX_TEXTURES; i++) { // Modelview, Projection, plus one matrix for each texture coordinate.
          GLImmediate.matrixStack.push([]);
          GLImmediate.matrixVersion.push(0);
          GLImmediate.matrix.push(GLImmediate.matrixLib.mat4.create());
          GLImmediate.matrixLib.mat4.identity(GLImmediate.matrix[i]);
        }
  
        // Renderer cache
        GLImmediate.rendererCache = GLImmediate.MapTreeLib.create();
  
        // Buffers for data
        GLImmediate.tempData = new Float32Array(GL.MAX_TEMP_BUFFER_SIZE >> 2);
        GLImmediate.indexData = new Uint16Array(GL.MAX_TEMP_BUFFER_SIZE >> 1);
  
        GLImmediate.vertexDataU8 = new Uint8Array(GLImmediate.tempData.buffer);
  
        GL.generateTempBuffers(true);
  
        GLImmediate.clientColor = new Float32Array([1, 1, 1, 1]);
      },prepareClientAttributes:function prepareClientAttributes(count, beginEnd) {
        // If no client attributes were modified since we were last called, do nothing. Note that this
        // does not work for glBegin/End, where we generate renderer components dynamically and then
        // disable them ourselves, but it does help with glDrawElements/Arrays.
        if (!GLImmediate.modifiedClientAttributes) {
          GLImmediate.vertexCounter = (GLImmediate.stride * count) / 4; // XXX assuming float
          return;
        }
        GLImmediate.modifiedClientAttributes = false;
  
        // The role of prepareClientAttributes is to examine the set of client-side vertex attribute buffers
        // that user code has submitted, and to prepare them to be uploaded to a VBO in GPU memory
        // (since WebGL does not support client-side rendering, i.e. rendering from vertex data in CPU memory)
        // User can submit vertex data generally in three different configurations:
        // 1. Fully planar: all attributes are in their own separate tightly-packed arrays in CPU memory.
        // 2. Fully interleaved: all attributes share a single array where data is interleaved something like (pos,uv,normal), (pos,uv,normal), ...
        // 3. Complex hybrid: Multiple separate arrays that either are sparsely strided, and/or partially interleave vertex attributes.
  
        // For simplicity, we support the case (2) as the fast case. For (1) and (3), we do a memory copy of the
        // vertex data here to prepare a relayouted buffer that is of the structure in case (2). The reason
        // for this is that it allows the emulation code to get away with using just one VBO buffer for rendering,
        // and not have to maintain multiple ones. Therefore cases (1) and (3) will be very slow, and case (2) is fast.
  
        // Detect which case we are in by using a quick heuristic by examining the strides of the buffers. If all the buffers have identical 
        // stride, we assume we have case (2), otherwise we have something more complex.
        var clientStartPointer = 0x7FFFFFFF;
        var bytes = 0; // Total number of bytes taken up by a single vertex.
        var minStride = 0x7FFFFFFF;
        var maxStride = 0;
        var attributes = GLImmediate.liveClientAttributes;
        attributes.length = 0;
        for (var i = 0; i < 3+GLImmediate.MAX_TEXTURES; i++) {
          if (GLImmediate.enabledClientAttributes[i]) {
            var attr = GLImmediate.clientAttributes[i];
            attributes.push(attr);
            clientStartPointer = Math.min(clientStartPointer, attr.pointer);
            attr.sizeBytes = attr.size * GL.byteSizeByType[attr.type - GL.byteSizeByTypeRoot];
            bytes += attr.sizeBytes;
            minStride = Math.min(minStride, attr.stride);
            maxStride = Math.max(maxStride, attr.stride);
          }
        }
  
        if ((minStride != maxStride || maxStride < bytes) && !beginEnd) {
          // We are in cases (1) or (3): slow path, shuffle the data around into a single interleaved vertex buffer.
          // The immediate-mode glBegin()/glEnd() vertex submission gets automatically generated in appropriate layout,
          // so never need to come down this path if that was used.
          if (!GLImmediate.restrideBuffer) GLImmediate.restrideBuffer = _malloc(GL.MAX_TEMP_BUFFER_SIZE);
          var start = GLImmediate.restrideBuffer;
          bytes = 0;
          // calculate restrided offsets and total size
          for (var i = 0; i < attributes.length; i++) {
            var attr = attributes[i];
            var size = attr.sizeBytes;
            if (size % 4 != 0) size += 4 - (size % 4); // align everything
            attr.offset = bytes;
            bytes += size;
          }
          // copy out the data (we need to know the stride for that, and define attr.pointer)
          for (var i = 0; i < attributes.length; i++) {
            var attr = attributes[i];
            var srcStride = Math.max(attr.sizeBytes, attr.stride);
            if ((srcStride & 3) == 0 && (attr.sizeBytes & 3) == 0) {
              var size4 = attr.sizeBytes>>2;
              var srcStride4 = Math.max(attr.sizeBytes, attr.stride)>>2;
              for (var j = 0; j < count; j++) {
                for (var k = 0; k < size4; k++) { // copy in chunks of 4 bytes, our alignment makes this possible
                  HEAP32[((start + attr.offset + bytes*j)>>2) + k] = HEAP32[(attr.pointer>>2) + j*srcStride4 + k];
                }
              }
            } else {
              for (var j = 0; j < count; j++) {
                for (var k = 0; k < attr.sizeBytes; k++) { // source data was not aligned to multiples of 4, must copy byte by byte.
                  HEAP8[start + attr.offset + bytes*j + k] = HEAP8[attr.pointer + j*srcStride + k];
                }
              }
            }
            attr.pointer = start + attr.offset;
          }
          GLImmediate.stride = bytes;
          GLImmediate.vertexPointer = start;
        } else {
          // case (2): fast path, all data is interleaved to a single vertex array so we can get away with a single VBO upload.
          if (GL.currArrayBuffer) {
            GLImmediate.vertexPointer = 0;
          } else {
            GLImmediate.vertexPointer = clientStartPointer;
          }
          for (var i = 0; i < attributes.length; i++) {
            var attr = attributes[i];
            attr.offset = attr.pointer - GLImmediate.vertexPointer; // Compute what will be the offset of this attribute in the VBO after we upload.
          }
          GLImmediate.stride = Math.max(maxStride, bytes);
        }
        if (!beginEnd) {
          GLImmediate.vertexCounter = (GLImmediate.stride * count) / 4; // XXX assuming float
        }
      },flush:function flush(numProvidedIndexes, startIndex, ptr) {
        startIndex = startIndex || 0;
        ptr = ptr || 0;
  
        var renderer = GLImmediate.getRenderer();
  
        // Generate index data in a format suitable for GLES 2.0/WebGL
        var numVertexes = 4 * GLImmediate.vertexCounter / GLImmediate.stride;
        var emulatedElementArrayBuffer = false;
        var numIndexes = 0;
        if (numProvidedIndexes) {
          numIndexes = numProvidedIndexes;
          if (!GL.currArrayBuffer && GLImmediate.firstVertex > GLImmediate.lastVertex) {
            // Figure out the first and last vertex from the index data
            for (var i = 0; i < numProvidedIndexes; i++) {
              var currIndex = HEAPU16[(((ptr)+(i*2))>>1)];
              GLImmediate.firstVertex = Math.min(GLImmediate.firstVertex, currIndex);
              GLImmediate.lastVertex = Math.max(GLImmediate.lastVertex, currIndex+1);
            }
          }
          if (!GL.currElementArrayBuffer) {
            // If no element array buffer is bound, then indices is a literal pointer to clientside data
            var indexBuffer = GL.getTempIndexBuffer(numProvidedIndexes << 1);
            GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, indexBuffer);
            GLctx.bufferSubData(GLctx.ELEMENT_ARRAY_BUFFER, 0, HEAPU16.subarray((ptr)>>1,(ptr + (numProvidedIndexes << 1))>>1));
            ptr = 0;
            emulatedElementArrayBuffer = true;
          }
        } else if (GLImmediate.mode > 6) { // above GL_TRIANGLE_FAN are the non-GL ES modes
          if (GLImmediate.mode != 7) throw 'unsupported immediate mode ' + GLImmediate.mode; // GL_QUADS
          // GLImmediate.firstVertex is the first vertex we want. Quad indexes are in the pattern
          // 0 1 2, 0 2 3, 4 5 6, 4 6 7, so we need to look at index firstVertex * 1.5 to see it.
          // Then since indexes are 2 bytes each, that means 3
          ptr = GLImmediate.firstVertex*3;
          var numQuads = numVertexes / 4;
          numIndexes = numQuads * 6; // 0 1 2, 0 2 3 pattern
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.tempQuadIndexBuffer);
          emulatedElementArrayBuffer = true;
        }
  
        renderer.prepare();
  
        if (numIndexes) {
          GLctx.drawElements(GLctx.TRIANGLES, numIndexes, GLctx.UNSIGNED_SHORT, ptr);
        } else {
          GLctx.drawArrays(GLImmediate.mode, startIndex, numVertexes);
        }
  
        if (emulatedElementArrayBuffer) {
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.buffers[GL.currElementArrayBuffer] || null);
        }
  
      }};
  GLImmediate.matrixLib = (function() {
  
  /**
   * @fileoverview gl-matrix - High performance matrix and vector operations for WebGL
   * @author Brandon Jones
   * @version 1.2.4
   */
  
  // Modifed for emscripten: Global scoping etc.
  
  /*
   * Copyright (c) 2011 Brandon Jones
   *
   * This software is provided 'as-is', without any express or implied
   * warranty. In no event will the authors be held liable for any damages
   * arising from the use of this software.
   *
   * Permission is granted to anyone to use this software for any purpose,
   * including commercial applications, and to alter it and redistribute it
   * freely, subject to the following restrictions:
   *
   *    1. The origin of this software must not be misrepresented; you must not
   *    claim that you wrote the original software. If you use this software
   *    in a product, an acknowledgment in the product documentation would be
   *    appreciated but is not required.
   *
   *    2. Altered source versions must be plainly marked as such, and must not
   *    be misrepresented as being the original software.
   *
   *    3. This notice may not be removed or altered from any source
   *    distribution.
   */
  
  
  /**
   * @class 3 Dimensional Vector
   * @name vec3
   */
  var vec3 = {};
  
  /**
   * @class 3x3 Matrix
   * @name mat3
   */
  var mat3 = {};
  
  /**
   * @class 4x4 Matrix
   * @name mat4
   */
  var mat4 = {};
  
  /**
   * @class Quaternion
   * @name quat4
   */
  var quat4 = {};
  
  var MatrixArray = Float32Array;
  
  /*
   * vec3
   */
   
  /**
   * Creates a new instance of a vec3 using the default array type
   * Any javascript array-like objects containing at least 3 numeric elements can serve as a vec3
   *
   * @param {vec3} [vec] vec3 containing values to initialize with
   *
   * @returns {vec3} New vec3
   */
  vec3.create = function (vec) {
      var dest = new MatrixArray(3);
  
      if (vec) {
          dest[0] = vec[0];
          dest[1] = vec[1];
          dest[2] = vec[2];
      } else {
          dest[0] = dest[1] = dest[2] = 0;
      }
  
      return dest;
  };
  
  /**
   * Copies the values of one vec3 to another
   *
   * @param {vec3} vec vec3 containing values to copy
   * @param {vec3} dest vec3 receiving copied values
   *
   * @returns {vec3} dest
   */
  vec3.set = function (vec, dest) {
      dest[0] = vec[0];
      dest[1] = vec[1];
      dest[2] = vec[2];
  
      return dest;
  };
  
  /**
   * Performs a vector addition
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.add = function (vec, vec2, dest) {
      if (!dest || vec === dest) {
          vec[0] += vec2[0];
          vec[1] += vec2[1];
          vec[2] += vec2[2];
          return vec;
      }
  
      dest[0] = vec[0] + vec2[0];
      dest[1] = vec[1] + vec2[1];
      dest[2] = vec[2] + vec2[2];
      return dest;
  };
  
  /**
   * Performs a vector subtraction
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.subtract = function (vec, vec2, dest) {
      if (!dest || vec === dest) {
          vec[0] -= vec2[0];
          vec[1] -= vec2[1];
          vec[2] -= vec2[2];
          return vec;
      }
  
      dest[0] = vec[0] - vec2[0];
      dest[1] = vec[1] - vec2[1];
      dest[2] = vec[2] - vec2[2];
      return dest;
  };
  
  /**
   * Performs a vector multiplication
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.multiply = function (vec, vec2, dest) {
      if (!dest || vec === dest) {
          vec[0] *= vec2[0];
          vec[1] *= vec2[1];
          vec[2] *= vec2[2];
          return vec;
      }
  
      dest[0] = vec[0] * vec2[0];
      dest[1] = vec[1] * vec2[1];
      dest[2] = vec[2] * vec2[2];
      return dest;
  };
  
  /**
   * Negates the components of a vec3
   *
   * @param {vec3} vec vec3 to negate
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.negate = function (vec, dest) {
      if (!dest) { dest = vec; }
  
      dest[0] = -vec[0];
      dest[1] = -vec[1];
      dest[2] = -vec[2];
      return dest;
  };
  
  /**
   * Multiplies the components of a vec3 by a scalar value
   *
   * @param {vec3} vec vec3 to scale
   * @param {number} val Value to scale by
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.scale = function (vec, val, dest) {
      if (!dest || vec === dest) {
          vec[0] *= val;
          vec[1] *= val;
          vec[2] *= val;
          return vec;
      }
  
      dest[0] = vec[0] * val;
      dest[1] = vec[1] * val;
      dest[2] = vec[2] * val;
      return dest;
  };
  
  /**
   * Generates a unit vector of the same direction as the provided vec3
   * If vector length is 0, returns [0, 0, 0]
   *
   * @param {vec3} vec vec3 to normalize
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.normalize = function (vec, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2],
          len = Math.sqrt(x * x + y * y + z * z);
  
      if (!len) {
          dest[0] = 0;
          dest[1] = 0;
          dest[2] = 0;
          return dest;
      } else if (len === 1) {
          dest[0] = x;
          dest[1] = y;
          dest[2] = z;
          return dest;
      }
  
      len = 1 / len;
      dest[0] = x * len;
      dest[1] = y * len;
      dest[2] = z * len;
      return dest;
  };
  
  /**
   * Generates the cross product of two vec3s
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.cross = function (vec, vec2, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2],
          x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];
  
      dest[0] = y * z2 - z * y2;
      dest[1] = z * x2 - x * z2;
      dest[2] = x * y2 - y * x2;
      return dest;
  };
  
  /**
   * Caclulates the length of a vec3
   *
   * @param {vec3} vec vec3 to calculate length of
   *
   * @returns {number} Length of vec
   */
  vec3.length = function (vec) {
      var x = vec[0], y = vec[1], z = vec[2];
      return Math.sqrt(x * x + y * y + z * z);
  };
  
  /**
   * Caclulates the dot product of two vec3s
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   *
   * @returns {number} Dot product of vec and vec2
   */
  vec3.dot = function (vec, vec2) {
      return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
  };
  
  /**
   * Generates a unit vector pointing from one vector to another
   *
   * @param {vec3} vec Origin vec3
   * @param {vec3} vec2 vec3 to point to
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.direction = function (vec, vec2, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0] - vec2[0],
          y = vec[1] - vec2[1],
          z = vec[2] - vec2[2],
          len = Math.sqrt(x * x + y * y + z * z);
  
      if (!len) {
          dest[0] = 0;
          dest[1] = 0;
          dest[2] = 0;
          return dest;
      }
  
      len = 1 / len;
      dest[0] = x * len;
      dest[1] = y * len;
      dest[2] = z * len;
      return dest;
  };
  
  /**
   * Performs a linear interpolation between two vec3
   *
   * @param {vec3} vec First vector
   * @param {vec3} vec2 Second vector
   * @param {number} lerp Interpolation amount between the two inputs
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.lerp = function (vec, vec2, lerp, dest) {
      if (!dest) { dest = vec; }
  
      dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
      dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
      dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);
  
      return dest;
  };
  
  /**
   * Calculates the euclidian distance between two vec3
   *
   * Params:
   * @param {vec3} vec First vector
   * @param {vec3} vec2 Second vector
   *
   * @returns {number} Distance between vec and vec2
   */
  vec3.dist = function (vec, vec2) {
      var x = vec2[0] - vec[0],
          y = vec2[1] - vec[1],
          z = vec2[2] - vec[2];
          
      return Math.sqrt(x*x + y*y + z*z);
  };
  
  /**
   * Projects the specified vec3 from screen space into object space
   * Based on the <a href="http://webcvs.freedesktop.org/mesa/Mesa/src/glu/mesa/project.c?revision=1.4&view=markup">Mesa gluUnProject implementation</a>
   *
   * @param {vec3} vec Screen-space vector to project
   * @param {mat4} view View matrix
   * @param {mat4} proj Projection matrix
   * @param {vec4} viewport Viewport as given to gl.viewport [x, y, width, height]
   * @param {vec3} [dest] vec3 receiving unprojected result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  vec3.unproject = function (vec, view, proj, viewport, dest) {
      if (!dest) { dest = vec; }
  
      var m = mat4.create();
      var v = new MatrixArray(4);
      
      v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
      v[1] = (vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0;
      v[2] = 2.0 * vec[2] - 1.0;
      v[3] = 1.0;
      
      mat4.multiply(proj, view, m);
      if(!mat4.inverse(m)) { return null; }
      
      mat4.multiplyVec4(m, v);
      if(v[3] === 0.0) { return null; }
  
      dest[0] = v[0] / v[3];
      dest[1] = v[1] / v[3];
      dest[2] = v[2] / v[3];
      
      return dest;
  };
  
  /**
   * Returns a string representation of a vector
   *
   * @param {vec3} vec Vector to represent as a string
   *
   * @returns {string} String representation of vec
   */
  vec3.str = function (vec) {
      return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']';
  };
  
  /*
   * mat3
   */
  
  /**
   * Creates a new instance of a mat3 using the default array type
   * Any javascript array-like object containing at least 9 numeric elements can serve as a mat3
   *
   * @param {mat3} [mat] mat3 containing values to initialize with
   *
   * @returns {mat3} New mat3
   */
  mat3.create = function (mat) {
      var dest = new MatrixArray(9);
  
      if (mat) {
          dest[0] = mat[0];
          dest[1] = mat[1];
          dest[2] = mat[2];
          dest[3] = mat[3];
          dest[4] = mat[4];
          dest[5] = mat[5];
          dest[6] = mat[6];
          dest[7] = mat[7];
          dest[8] = mat[8];
      }
  
      return dest;
  };
  
  /**
   * Copies the values of one mat3 to another
   *
   * @param {mat3} mat mat3 containing values to copy
   * @param {mat3} dest mat3 receiving copied values
   *
   * @returns {mat3} dest
   */
  mat3.set = function (mat, dest) {
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[3];
      dest[4] = mat[4];
      dest[5] = mat[5];
      dest[6] = mat[6];
      dest[7] = mat[7];
      dest[8] = mat[8];
      return dest;
  };
  
  /**
   * Sets a mat3 to an identity matrix
   *
   * @param {mat3} dest mat3 to set
   *
   * @returns dest if specified, otherwise a new mat3
   */
  mat3.identity = function (dest) {
      if (!dest) { dest = mat3.create(); }
      dest[0] = 1;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 1;
      dest[5] = 0;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = 1;
      return dest;
  };
  
  /**
   * Transposes a mat3 (flips the values over the diagonal)
   *
   * Params:
   * @param {mat3} mat mat3 to transpose
   * @param {mat3} [dest] mat3 receiving transposed values. If not specified result is written to mat
   *
   * @returns {mat3} dest is specified, mat otherwise
   */
  mat3.transpose = function (mat, dest) {
      // If we are transposing ourselves we can skip a few steps but have to cache some values
      if (!dest || mat === dest) {
          var a01 = mat[1], a02 = mat[2],
              a12 = mat[5];
  
          mat[1] = mat[3];
          mat[2] = mat[6];
          mat[3] = a01;
          mat[5] = mat[7];
          mat[6] = a02;
          mat[7] = a12;
          return mat;
      }
  
      dest[0] = mat[0];
      dest[1] = mat[3];
      dest[2] = mat[6];
      dest[3] = mat[1];
      dest[4] = mat[4];
      dest[5] = mat[7];
      dest[6] = mat[2];
      dest[7] = mat[5];
      dest[8] = mat[8];
      return dest;
  };
  
  /**
   * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
   *
   * @param {mat3} mat mat3 containing values to copy
   * @param {mat4} [dest] mat4 receiving copied values
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat3.toMat4 = function (mat, dest) {
      if (!dest) { dest = mat4.create(); }
  
      dest[15] = 1;
      dest[14] = 0;
      dest[13] = 0;
      dest[12] = 0;
  
      dest[11] = 0;
      dest[10] = mat[8];
      dest[9] = mat[7];
      dest[8] = mat[6];
  
      dest[7] = 0;
      dest[6] = mat[5];
      dest[5] = mat[4];
      dest[4] = mat[3];
  
      dest[3] = 0;
      dest[2] = mat[2];
      dest[1] = mat[1];
      dest[0] = mat[0];
  
      return dest;
  };
  
  /**
   * Returns a string representation of a mat3
   *
   * @param {mat3} mat mat3 to represent as a string
   *
   * @param {string} String representation of mat
   */
  mat3.str = function (mat) {
      return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] +
          ', ' + mat[3] + ', ' + mat[4] + ', ' + mat[5] +
          ', ' + mat[6] + ', ' + mat[7] + ', ' + mat[8] + ']';
  };
  
  /*
   * mat4
   */
  
  /**
   * Creates a new instance of a mat4 using the default array type
   * Any javascript array-like object containing at least 16 numeric elements can serve as a mat4
   *
   * @param {mat4} [mat] mat4 containing values to initialize with
   *
   * @returns {mat4} New mat4
   */
  mat4.create = function (mat) {
      var dest = new MatrixArray(16);
  
      if (mat) {
          dest[0] = mat[0];
          dest[1] = mat[1];
          dest[2] = mat[2];
          dest[3] = mat[3];
          dest[4] = mat[4];
          dest[5] = mat[5];
          dest[6] = mat[6];
          dest[7] = mat[7];
          dest[8] = mat[8];
          dest[9] = mat[9];
          dest[10] = mat[10];
          dest[11] = mat[11];
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      return dest;
  };
  
  /**
   * Copies the values of one mat4 to another
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat4} dest mat4 receiving copied values
   *
   * @returns {mat4} dest
   */
  mat4.set = function (mat, dest) {
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[3];
      dest[4] = mat[4];
      dest[5] = mat[5];
      dest[6] = mat[6];
      dest[7] = mat[7];
      dest[8] = mat[8];
      dest[9] = mat[9];
      dest[10] = mat[10];
      dest[11] = mat[11];
      dest[12] = mat[12];
      dest[13] = mat[13];
      dest[14] = mat[14];
      dest[15] = mat[15];
      return dest;
  };
  
  /**
   * Sets a mat4 to an identity matrix
   *
   * @param {mat4} dest mat4 to set
   *
   * @returns {mat4} dest
   */
  mat4.identity = function (dest) {
      if (!dest) { dest = mat4.create(); }
      dest[0] = 1;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 0;
      dest[5] = 1;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = 0;
      dest[9] = 0;
      dest[10] = 1;
      dest[11] = 0;
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = 0;
      dest[15] = 1;
      return dest;
  };
  
  /**
   * Transposes a mat4 (flips the values over the diagonal)
   *
   * @param {mat4} mat mat4 to transpose
   * @param {mat4} [dest] mat4 receiving transposed values. If not specified result is written to mat
   *
   * @param {mat4} dest is specified, mat otherwise
   */
  mat4.transpose = function (mat, dest) {
      // If we are transposing ourselves we can skip a few steps but have to cache some values
      if (!dest || mat === dest) {
          var a01 = mat[1], a02 = mat[2], a03 = mat[3],
              a12 = mat[6], a13 = mat[7],
              a23 = mat[11];
  
          mat[1] = mat[4];
          mat[2] = mat[8];
          mat[3] = mat[12];
          mat[4] = a01;
          mat[6] = mat[9];
          mat[7] = mat[13];
          mat[8] = a02;
          mat[9] = a12;
          mat[11] = mat[14];
          mat[12] = a03;
          mat[13] = a13;
          mat[14] = a23;
          return mat;
      }
  
      dest[0] = mat[0];
      dest[1] = mat[4];
      dest[2] = mat[8];
      dest[3] = mat[12];
      dest[4] = mat[1];
      dest[5] = mat[5];
      dest[6] = mat[9];
      dest[7] = mat[13];
      dest[8] = mat[2];
      dest[9] = mat[6];
      dest[10] = mat[10];
      dest[11] = mat[14];
      dest[12] = mat[3];
      dest[13] = mat[7];
      dest[14] = mat[11];
      dest[15] = mat[15];
      return dest;
  };
  
  /**
   * Calculates the determinant of a mat4
   *
   * @param {mat4} mat mat4 to calculate determinant of
   *
   * @returns {number} determinant of mat
   */
  mat4.determinant = function (mat) {
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
          a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
          a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
          a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
  
      return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
              a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
              a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
              a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
              a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
              a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
  };
  
  /**
   * Calculates the inverse matrix of a mat4
   *
   * @param {mat4} mat mat4 to calculate inverse of
   * @param {mat4} [dest] mat4 receiving inverse matrix. If not specified result is written to mat
   *
   * @param {mat4} dest is specified, mat otherwise, null if matrix cannot be inverted
   */
  mat4.inverse = function (mat, dest) {
      if (!dest) { dest = mat; }
  
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
          a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
          a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
          a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],
  
          b00 = a00 * a11 - a01 * a10,
          b01 = a00 * a12 - a02 * a10,
          b02 = a00 * a13 - a03 * a10,
          b03 = a01 * a12 - a02 * a11,
          b04 = a01 * a13 - a03 * a11,
          b05 = a02 * a13 - a03 * a12,
          b06 = a20 * a31 - a21 * a30,
          b07 = a20 * a32 - a22 * a30,
          b08 = a20 * a33 - a23 * a30,
          b09 = a21 * a32 - a22 * a31,
          b10 = a21 * a33 - a23 * a31,
          b11 = a22 * a33 - a23 * a32,
  
          d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
          invDet;
  
          // Calculate the determinant
          if (!d) { return null; }
          invDet = 1 / d;
  
      dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
      dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
      dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
      dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
      dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
      dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
      dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
      dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
      dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
      dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
      dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
      dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
      dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
      dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
      dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
      dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
  
      return dest;
  };
  
  /**
   * Copies the upper 3x3 elements of a mat4 into another mat4
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat4} [dest] mat4 receiving copied values
   *
   * @returns {mat4} dest is specified, a new mat4 otherwise
   */
  mat4.toRotationMat = function (mat, dest) {
      if (!dest) { dest = mat4.create(); }
  
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[3];
      dest[4] = mat[4];
      dest[5] = mat[5];
      dest[6] = mat[6];
      dest[7] = mat[7];
      dest[8] = mat[8];
      dest[9] = mat[9];
      dest[10] = mat[10];
      dest[11] = mat[11];
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = 0;
      dest[15] = 1;
  
      return dest;
  };
  
  /**
   * Copies the upper 3x3 elements of a mat4 into a mat3
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat3} [dest] mat3 receiving copied values
   *
   * @returns {mat3} dest is specified, a new mat3 otherwise
   */
  mat4.toMat3 = function (mat, dest) {
      if (!dest) { dest = mat3.create(); }
  
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[4];
      dest[4] = mat[5];
      dest[5] = mat[6];
      dest[6] = mat[8];
      dest[7] = mat[9];
      dest[8] = mat[10];
  
      return dest;
  };
  
  /**
   * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
   * The resulting matrix is useful for calculating transformed normals
   *
   * Params:
   * @param {mat4} mat mat4 containing values to invert and copy
   * @param {mat3} [dest] mat3 receiving values
   *
   * @returns {mat3} dest is specified, a new mat3 otherwise, null if the matrix cannot be inverted
   */
  mat4.toInverseMat3 = function (mat, dest) {
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat[0], a01 = mat[1], a02 = mat[2],
          a10 = mat[4], a11 = mat[5], a12 = mat[6],
          a20 = mat[8], a21 = mat[9], a22 = mat[10],
  
          b01 = a22 * a11 - a12 * a21,
          b11 = -a22 * a10 + a12 * a20,
          b21 = a21 * a10 - a11 * a20,
  
          d = a00 * b01 + a01 * b11 + a02 * b21,
          id;
  
      if (!d) { return null; }
      id = 1 / d;
  
      if (!dest) { dest = mat3.create(); }
  
      dest[0] = b01 * id;
      dest[1] = (-a22 * a01 + a02 * a21) * id;
      dest[2] = (a12 * a01 - a02 * a11) * id;
      dest[3] = b11 * id;
      dest[4] = (a22 * a00 - a02 * a20) * id;
      dest[5] = (-a12 * a00 + a02 * a10) * id;
      dest[6] = b21 * id;
      dest[7] = (-a21 * a00 + a01 * a20) * id;
      dest[8] = (a11 * a00 - a01 * a10) * id;
  
      return dest;
  };
  
  /**
   * Performs a matrix multiplication
   *
   * @param {mat4} mat First operand
   * @param {mat4} mat2 Second operand
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  mat4.multiply = function (mat, mat2, dest) {
      if (!dest) { dest = mat; }
  
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
          a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
          a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
          a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],
  
          b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3],
          b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7],
          b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11],
          b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];
  
      dest[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
      dest[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
      dest[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
      dest[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
      dest[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
      dest[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
      dest[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
      dest[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
      dest[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
      dest[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
      dest[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
      dest[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
      dest[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
      dest[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
      dest[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
      dest[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
  
      return dest;
  };
  
  /**
   * Transforms a vec3 with the given matrix
   * 4th vector component is implicitly '1'
   *
   * @param {mat4} mat mat4 to transform the vector with
   * @param {vec3} vec vec3 to transform
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  mat4.multiplyVec3 = function (mat, vec, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2];
  
      dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
      dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
      dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
  
      return dest;
  };
  
  /**
   * Transforms a vec4 with the given matrix
   *
   * @param {mat4} mat mat4 to transform the vector with
   * @param {vec4} vec vec4 to transform
   * @param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec4} dest if specified, vec otherwise
   */
  mat4.multiplyVec4 = function (mat, vec, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
  
      dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
      dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
      dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
      dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;
  
      return dest;
  };
  
  /**
   * Translates a matrix by the given vector
   *
   * @param {mat4} mat mat4 to translate
   * @param {vec3} vec vec3 specifying the translation
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  mat4.translate = function (mat, vec, dest) {
      var x = vec[0], y = vec[1], z = vec[2],
          a00, a01, a02, a03,
          a10, a11, a12, a13,
          a20, a21, a22, a23;
  
      if (!dest || mat === dest) {
          mat[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
          mat[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
          mat[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
          mat[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
          return mat;
      }
  
      a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
      a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
      a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];
  
      dest[0] = a00; dest[1] = a01; dest[2] = a02; dest[3] = a03;
      dest[4] = a10; dest[5] = a11; dest[6] = a12; dest[7] = a13;
      dest[8] = a20; dest[9] = a21; dest[10] = a22; dest[11] = a23;
  
      dest[12] = a00 * x + a10 * y + a20 * z + mat[12];
      dest[13] = a01 * x + a11 * y + a21 * z + mat[13];
      dest[14] = a02 * x + a12 * y + a22 * z + mat[14];
      dest[15] = a03 * x + a13 * y + a23 * z + mat[15];
      return dest;
  };
  
  /**
   * Scales a matrix by the given vector
   *
   * @param {mat4} mat mat4 to scale
   * @param {vec3} vec vec3 specifying the scale for each axis
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @param {mat4} dest if specified, mat otherwise
   */
  mat4.scale = function (mat, vec, dest) {
      var x = vec[0], y = vec[1], z = vec[2];
  
      if (!dest || mat === dest) {
          mat[0] *= x;
          mat[1] *= x;
          mat[2] *= x;
          mat[3] *= x;
          mat[4] *= y;
          mat[5] *= y;
          mat[6] *= y;
          mat[7] *= y;
          mat[8] *= z;
          mat[9] *= z;
          mat[10] *= z;
          mat[11] *= z;
          return mat;
      }
  
      dest[0] = mat[0] * x;
      dest[1] = mat[1] * x;
      dest[2] = mat[2] * x;
      dest[3] = mat[3] * x;
      dest[4] = mat[4] * y;
      dest[5] = mat[5] * y;
      dest[6] = mat[6] * y;
      dest[7] = mat[7] * y;
      dest[8] = mat[8] * z;
      dest[9] = mat[9] * z;
      dest[10] = mat[10] * z;
      dest[11] = mat[11] * z;
      dest[12] = mat[12];
      dest[13] = mat[13];
      dest[14] = mat[14];
      dest[15] = mat[15];
      return dest;
  };
  
  /**
   * Rotates a matrix by the given angle around the specified axis
   * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {vec3} axis vec3 representing the axis to rotate around 
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  mat4.rotate = function (mat, angle, axis, dest) {
      var x = axis[0], y = axis[1], z = axis[2],
          len = Math.sqrt(x * x + y * y + z * z),
          s, c, t,
          a00, a01, a02, a03,
          a10, a11, a12, a13,
          a20, a21, a22, a23,
          b00, b01, b02,
          b10, b11, b12,
          b20, b21, b22;
  
      if (!len) { return null; }
      if (len !== 1) {
          len = 1 / len;
          x *= len;
          y *= len;
          z *= len;
      }
  
      s = Math.sin(angle);
      c = Math.cos(angle);
      t = 1 - c;
  
      a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
      a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
      a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];
  
      // Construct the elements of the rotation matrix
      b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
      b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
      b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;
  
      if (!dest) {
          dest = mat;
      } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      // Perform rotation-specific matrix multiplication
      dest[0] = a00 * b00 + a10 * b01 + a20 * b02;
      dest[1] = a01 * b00 + a11 * b01 + a21 * b02;
      dest[2] = a02 * b00 + a12 * b01 + a22 * b02;
      dest[3] = a03 * b00 + a13 * b01 + a23 * b02;
  
      dest[4] = a00 * b10 + a10 * b11 + a20 * b12;
      dest[5] = a01 * b10 + a11 * b11 + a21 * b12;
      dest[6] = a02 * b10 + a12 * b11 + a22 * b12;
      dest[7] = a03 * b10 + a13 * b11 + a23 * b12;
  
      dest[8] = a00 * b20 + a10 * b21 + a20 * b22;
      dest[9] = a01 * b20 + a11 * b21 + a21 * b22;
      dest[10] = a02 * b20 + a12 * b21 + a22 * b22;
      dest[11] = a03 * b20 + a13 * b21 + a23 * b22;
      return dest;
  };
  
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  mat4.rotateX = function (mat, angle, dest) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a10 = mat[4],
          a11 = mat[5],
          a12 = mat[6],
          a13 = mat[7],
          a20 = mat[8],
          a21 = mat[9],
          a22 = mat[10],
          a23 = mat[11];
  
      if (!dest) {
          dest = mat;
      } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
          dest[0] = mat[0];
          dest[1] = mat[1];
          dest[2] = mat[2];
          dest[3] = mat[3];
  
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      // Perform axis-specific matrix multiplication
      dest[4] = a10 * c + a20 * s;
      dest[5] = a11 * c + a21 * s;
      dest[6] = a12 * c + a22 * s;
      dest[7] = a13 * c + a23 * s;
  
      dest[8] = a10 * -s + a20 * c;
      dest[9] = a11 * -s + a21 * c;
      dest[10] = a12 * -s + a22 * c;
      dest[11] = a13 * -s + a23 * c;
      return dest;
  };
  
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  mat4.rotateY = function (mat, angle, dest) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a00 = mat[0],
          a01 = mat[1],
          a02 = mat[2],
          a03 = mat[3],
          a20 = mat[8],
          a21 = mat[9],
          a22 = mat[10],
          a23 = mat[11];
  
      if (!dest) {
          dest = mat;
      } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
          dest[4] = mat[4];
          dest[5] = mat[5];
          dest[6] = mat[6];
          dest[7] = mat[7];
  
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      // Perform axis-specific matrix multiplication
      dest[0] = a00 * c + a20 * -s;
      dest[1] = a01 * c + a21 * -s;
      dest[2] = a02 * c + a22 * -s;
      dest[3] = a03 * c + a23 * -s;
  
      dest[8] = a00 * s + a20 * c;
      dest[9] = a01 * s + a21 * c;
      dest[10] = a02 * s + a22 * c;
      dest[11] = a03 * s + a23 * c;
      return dest;
  };
  
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  mat4.rotateZ = function (mat, angle, dest) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a00 = mat[0],
          a01 = mat[1],
          a02 = mat[2],
          a03 = mat[3],
          a10 = mat[4],
          a11 = mat[5],
          a12 = mat[6],
          a13 = mat[7];
  
      if (!dest) {
          dest = mat;
      } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
          dest[8] = mat[8];
          dest[9] = mat[9];
          dest[10] = mat[10];
          dest[11] = mat[11];
  
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      // Perform axis-specific matrix multiplication
      dest[0] = a00 * c + a10 * s;
      dest[1] = a01 * c + a11 * s;
      dest[2] = a02 * c + a12 * s;
      dest[3] = a03 * c + a13 * s;
  
      dest[4] = a00 * -s + a10 * c;
      dest[5] = a01 * -s + a11 * c;
      dest[6] = a02 * -s + a12 * c;
      dest[7] = a03 * -s + a13 * c;
  
      return dest;
  };
  
  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.frustum = function (left, right, bottom, top, near, far, dest) {
      if (!dest) { dest = mat4.create(); }
      var rl = (right - left),
          tb = (top - bottom),
          fn = (far - near);
      dest[0] = (near * 2) / rl;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 0;
      dest[5] = (near * 2) / tb;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = (right + left) / rl;
      dest[9] = (top + bottom) / tb;
      dest[10] = -(far + near) / fn;
      dest[11] = -1;
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = -(far * near * 2) / fn;
      dest[15] = 0;
      return dest;
  };
  
  /**
   * Generates a perspective projection matrix with the given bounds
   *
   * @param {number} fovy Vertical field of view
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.perspective = function (fovy, aspect, near, far, dest) {
      var top = near * Math.tan(fovy * Math.PI / 360.0),
          right = top * aspect;
      return mat4.frustum(-right, right, -top, top, near, far, dest);
  };
  
  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.ortho = function (left, right, bottom, top, near, far, dest) {
      if (!dest) { dest = mat4.create(); }
      var rl = (right - left),
          tb = (top - bottom),
          fn = (far - near);
      dest[0] = 2 / rl;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 0;
      dest[5] = 2 / tb;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = 0;
      dest[9] = 0;
      dest[10] = -2 / fn;
      dest[11] = 0;
      dest[12] = -(left + right) / rl;
      dest[13] = -(top + bottom) / tb;
      dest[14] = -(far + near) / fn;
      dest[15] = 1;
      return dest;
  };
  
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis
   *
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing "up"
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.lookAt = function (eye, center, up, dest) {
      if (!dest) { dest = mat4.create(); }
  
      var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
          eyex = eye[0],
          eyey = eye[1],
          eyez = eye[2],
          upx = up[0],
          upy = up[1],
          upz = up[2],
          centerx = center[0],
          centery = center[1],
          centerz = center[2];
  
      if (eyex === centerx && eyey === centery && eyez === centerz) {
          return mat4.identity(dest);
      }
  
      //vec3.direction(eye, center, z);
      z0 = eyex - centerx;
      z1 = eyey - centery;
      z2 = eyez - centerz;
  
      // normalize (no check needed for 0 because of early return)
      len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;
  
      //vec3.normalize(vec3.cross(up, z, x));
      x0 = upy * z2 - upz * z1;
      x1 = upz * z0 - upx * z2;
      x2 = upx * z1 - upy * z0;
      len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
      if (!len) {
          x0 = 0;
          x1 = 0;
          x2 = 0;
      } else {
          len = 1 / len;
          x0 *= len;
          x1 *= len;
          x2 *= len;
      }
  
      //vec3.normalize(vec3.cross(z, x, y));
      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;
  
      len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
      if (!len) {
          y0 = 0;
          y1 = 0;
          y2 = 0;
      } else {
          len = 1 / len;
          y0 *= len;
          y1 *= len;
          y2 *= len;
      }
  
      dest[0] = x0;
      dest[1] = y0;
      dest[2] = z0;
      dest[3] = 0;
      dest[4] = x1;
      dest[5] = y1;
      dest[6] = z1;
      dest[7] = 0;
      dest[8] = x2;
      dest[9] = y2;
      dest[10] = z2;
      dest[11] = 0;
      dest[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      dest[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      dest[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      dest[15] = 1;
  
      return dest;
  };
  
  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     var quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *
   * @param {quat4} quat Rotation quaternion
   * @param {vec3} vec Translation vector
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to a new mat4
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.fromRotationTranslation = function (quat, vec, dest) {
      if (!dest) { dest = mat4.create(); }
  
      // Quaternion math
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
          x2 = x + x,
          y2 = y + y,
          z2 = z + z,
  
          xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;
  
      dest[0] = 1 - (yy + zz);
      dest[1] = xy + wz;
      dest[2] = xz - wy;
      dest[3] = 0;
      dest[4] = xy - wz;
      dest[5] = 1 - (xx + zz);
      dest[6] = yz + wx;
      dest[7] = 0;
      dest[8] = xz + wy;
      dest[9] = yz - wx;
      dest[10] = 1 - (xx + yy);
      dest[11] = 0;
      dest[12] = vec[0];
      dest[13] = vec[1];
      dest[14] = vec[2];
      dest[15] = 1;
      
      return dest;
  };
  
  /**
   * Returns a string representation of a mat4
   *
   * @param {mat4} mat mat4 to represent as a string
   *
   * @returns {string} String representation of mat
   */
  mat4.str = function (mat) {
      return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] +
          ', ' + mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] +
          ', ' + mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] +
          ', ' + mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
  };
  
  /*
   * quat4
   */
  
  /**
   * Creates a new instance of a quat4 using the default array type
   * Any javascript array containing at least 4 numeric elements can serve as a quat4
   *
   * @param {quat4} [quat] quat4 containing values to initialize with
   *
   * @returns {quat4} New quat4
   */
  quat4.create = function (quat) {
      var dest = new MatrixArray(4);
  
      if (quat) {
          dest[0] = quat[0];
          dest[1] = quat[1];
          dest[2] = quat[2];
          dest[3] = quat[3];
      }
  
      return dest;
  };
  
  /**
   * Copies the values of one quat4 to another
   *
   * @param {quat4} quat quat4 containing values to copy
   * @param {quat4} dest quat4 receiving copied values
   *
   * @returns {quat4} dest
   */
  quat4.set = function (quat, dest) {
      dest[0] = quat[0];
      dest[1] = quat[1];
      dest[2] = quat[2];
      dest[3] = quat[3];
  
      return dest;
  };
  
  /**
   * Calculates the W component of a quat4 from the X, Y, and Z components.
   * Assumes that quaternion is 1 unit in length. 
   * Any existing W component will be ignored. 
   *
   * @param {quat4} quat quat4 to calculate W component of
   * @param {quat4} [dest] quat4 receiving calculated values. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  quat4.calculateW = function (quat, dest) {
      var x = quat[0], y = quat[1], z = quat[2];
  
      if (!dest || quat === dest) {
          quat[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
          return quat;
      }
      dest[0] = x;
      dest[1] = y;
      dest[2] = z;
      dest[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
      return dest;
  };
  
  /**
   * Calculates the dot product of two quaternions
   *
   * @param {quat4} quat First operand
   * @param {quat4} quat2 Second operand
   *
   * @return {number} Dot product of quat and quat2
   */
  quat4.dot = function(quat, quat2){
      return quat[0]*quat2[0] + quat[1]*quat2[1] + quat[2]*quat2[2] + quat[3]*quat2[3];
  };
  
  /**
   * Calculates the inverse of a quat4
   *
   * @param {quat4} quat quat4 to calculate inverse of
   * @param {quat4} [dest] quat4 receiving inverse values. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  quat4.inverse = function(quat, dest) {
      var q0 = quat[0], q1 = quat[1], q2 = quat[2], q3 = quat[3],
          dot = q0*q0 + q1*q1 + q2*q2 + q3*q3,
          invDot = dot ? 1.0/dot : 0;
      
      // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
      
      if(!dest || quat === dest) {
          quat[0] *= -invDot;
          quat[1] *= -invDot;
          quat[2] *= -invDot;
          quat[3] *= invDot;
          return quat;
      }
      dest[0] = -quat[0]*invDot;
      dest[1] = -quat[1]*invDot;
      dest[2] = -quat[2]*invDot;
      dest[3] = quat[3]*invDot;
      return dest;
  };
  
  
  /**
   * Calculates the conjugate of a quat4
   * If the quaternion is normalized, this function is faster than quat4.inverse and produces the same result.
   *
   * @param {quat4} quat quat4 to calculate conjugate of
   * @param {quat4} [dest] quat4 receiving conjugate values. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  quat4.conjugate = function (quat, dest) {
      if (!dest || quat === dest) {
          quat[0] *= -1;
          quat[1] *= -1;
          quat[2] *= -1;
          return quat;
      }
      dest[0] = -quat[0];
      dest[1] = -quat[1];
      dest[2] = -quat[2];
      dest[3] = quat[3];
      return dest;
  };
  
  /**
   * Calculates the length of a quat4
   *
   * Params:
   * @param {quat4} quat quat4 to calculate length of
   *
   * @returns Length of quat
   */
  quat4.length = function (quat) {
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
      return Math.sqrt(x * x + y * y + z * z + w * w);
  };
  
  /**
   * Generates a unit quaternion of the same direction as the provided quat4
   * If quaternion length is 0, returns [0, 0, 0, 0]
   *
   * @param {quat4} quat quat4 to normalize
   * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  quat4.normalize = function (quat, dest) {
      if (!dest) { dest = quat; }
  
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
          len = Math.sqrt(x * x + y * y + z * z + w * w);
      if (len === 0) {
          dest[0] = 0;
          dest[1] = 0;
          dest[2] = 0;
          dest[3] = 0;
          return dest;
      }
      len = 1 / len;
      dest[0] = x * len;
      dest[1] = y * len;
      dest[2] = z * len;
      dest[3] = w * len;
  
      return dest;
  };
  
  /**
   * Performs quaternion addition
   *
   * @param {quat4} quat First operand
   * @param {quat4} quat2 Second operand
   * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  quat4.add = function (quat, quat2, dest) {
      if(!dest || quat === dest) {
          quat[0] += quat2[0];
          quat[1] += quat2[1];
          quat[2] += quat2[2];
          quat[3] += quat2[3];
          return quat;
      }
      dest[0] = quat[0]+quat2[0];
      dest[1] = quat[1]+quat2[1];
      dest[2] = quat[2]+quat2[2];
      dest[3] = quat[3]+quat2[3];
      return dest;
  };
  
  /**
   * Performs a quaternion multiplication
   *
   * @param {quat4} quat First operand
   * @param {quat4} quat2 Second operand
   * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  quat4.multiply = function (quat, quat2, dest) {
      if (!dest) { dest = quat; }
  
      var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3],
          qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];
  
      dest[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      dest[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      dest[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      dest[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
  
      return dest;
  };
  
  /**
   * Transforms a vec3 with the given quaternion
   *
   * @param {quat4} quat quat4 to transform the vector with
   * @param {vec3} vec vec3 to transform
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns dest if specified, vec otherwise
   */
  quat4.multiplyVec3 = function (quat, vec, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2],
          qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3],
  
          // calculate quat * vec
          ix = qw * x + qy * z - qz * y,
          iy = qw * y + qz * x - qx * z,
          iz = qw * z + qx * y - qy * x,
          iw = -qx * x - qy * y - qz * z;
  
      // calculate result * inverse quat
      dest[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      dest[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      dest[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  
      return dest;
  };
  
  /**
   * Multiplies the components of a quaternion by a scalar value
   *
   * @param {quat4} quat to scale
   * @param {number} val Value to scale by
   * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  quat4.scale = function (quat, val, dest) {
      if(!dest || quat === dest) {
          quat[0] *= val;
          quat[1] *= val;
          quat[2] *= val;
          quat[3] *= val;
          return quat;
      }
      dest[0] = quat[0]*val;
      dest[1] = quat[1]*val;
      dest[2] = quat[2]*val;
      dest[3] = quat[3]*val;
      return dest;
  };
  
  /**
   * Calculates a 3x3 matrix from the given quat4
   *
   * @param {quat4} quat quat4 to create matrix from
   * @param {mat3} [dest] mat3 receiving operation result
   *
   * @returns {mat3} dest if specified, a new mat3 otherwise
   */
  quat4.toMat3 = function (quat, dest) {
      if (!dest) { dest = mat3.create(); }
  
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
          x2 = x + x,
          y2 = y + y,
          z2 = z + z,
  
          xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;
  
      dest[0] = 1 - (yy + zz);
      dest[1] = xy + wz;
      dest[2] = xz - wy;
  
      dest[3] = xy - wz;
      dest[4] = 1 - (xx + zz);
      dest[5] = yz + wx;
  
      dest[6] = xz + wy;
      dest[7] = yz - wx;
      dest[8] = 1 - (xx + yy);
  
      return dest;
  };
  
  /**
   * Calculates a 4x4 matrix from the given quat4
   *
   * @param {quat4} quat quat4 to create matrix from
   * @param {mat4} [dest] mat4 receiving operation result
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  quat4.toMat4 = function (quat, dest) {
      if (!dest) { dest = mat4.create(); }
  
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
          x2 = x + x,
          y2 = y + y,
          z2 = z + z,
  
          xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;
  
      dest[0] = 1 - (yy + zz);
      dest[1] = xy + wz;
      dest[2] = xz - wy;
      dest[3] = 0;
  
      dest[4] = xy - wz;
      dest[5] = 1 - (xx + zz);
      dest[6] = yz + wx;
      dest[7] = 0;
  
      dest[8] = xz + wy;
      dest[9] = yz - wx;
      dest[10] = 1 - (xx + yy);
      dest[11] = 0;
  
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = 0;
      dest[15] = 1;
  
      return dest;
  };
  
  /**
   * Performs a spherical linear interpolation between two quat4
   *
   * @param {quat4} quat First quaternion
   * @param {quat4} quat2 Second quaternion
   * @param {number} slerp Interpolation amount between the two inputs
   * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  quat4.slerp = function (quat, quat2, slerp, dest) {
      if (!dest) { dest = quat; }
  
      var cosHalfTheta = quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3],
          halfTheta,
          sinHalfTheta,
          ratioA,
          ratioB;
  
      if (Math.abs(cosHalfTheta) >= 1.0) {
          if (dest !== quat) {
              dest[0] = quat[0];
              dest[1] = quat[1];
              dest[2] = quat[2];
              dest[3] = quat[3];
          }
          return dest;
      }
  
      halfTheta = Math.acos(cosHalfTheta);
      sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
  
      if (Math.abs(sinHalfTheta) < 0.001) {
          dest[0] = (quat[0] * 0.5 + quat2[0] * 0.5);
          dest[1] = (quat[1] * 0.5 + quat2[1] * 0.5);
          dest[2] = (quat[2] * 0.5 + quat2[2] * 0.5);
          dest[3] = (quat[3] * 0.5 + quat2[3] * 0.5);
          return dest;
      }
  
      ratioA = Math.sin((1 - slerp) * halfTheta) / sinHalfTheta;
      ratioB = Math.sin(slerp * halfTheta) / sinHalfTheta;
  
      dest[0] = (quat[0] * ratioA + quat2[0] * ratioB);
      dest[1] = (quat[1] * ratioA + quat2[1] * ratioB);
      dest[2] = (quat[2] * ratioA + quat2[2] * ratioB);
      dest[3] = (quat[3] * ratioA + quat2[3] * ratioB);
  
      return dest;
  };
  
  /**
   * Returns a string representation of a quaternion
   *
   * @param {quat4} quat quat4 to represent as a string
   *
   * @returns {string} String representation of quat
   */
  quat4.str = function (quat) {
      return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']';
  };
  
  
  return {
    vec3: vec3,
    mat3: mat3,
    mat4: mat4,
    quat4: quat4
  };
  
  })();
  
  ;
  var GLImmediateSetup={};function _glBegin(mode) {
      // Push the old state:
      GLImmediate.enabledClientAttributes_preBegin = GLImmediate.enabledClientAttributes;
      GLImmediate.enabledClientAttributes = [];
  
      GLImmediate.clientAttributes_preBegin = GLImmediate.clientAttributes;
      GLImmediate.clientAttributes = []
      for (var i = 0; i < GLImmediate.clientAttributes_preBegin.length; i++) {
        GLImmediate.clientAttributes.push({});
      }
  
      GLImmediate.mode = mode;
      GLImmediate.vertexCounter = 0;
      var components = GLImmediate.rendererComponents = [];
      for (var i = 0; i < GLImmediate.NUM_ATTRIBUTES; i++) {
        components[i] = 0;
      }
      GLImmediate.rendererComponentPointer = 0;
      GLImmediate.vertexData = GLImmediate.tempData;
    }

  
  
  
  
  function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var fd = _fileno(stream);
      var bytesWritten = _write(fd, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  
  
   
  Module["_strlen"] = _strlen;
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = (HEAP32[((tempDoublePtr)>>2)]=HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((varargs)+((argIndex)+(4)))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Runtime.getNativeFieldSize(type);
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          }
          if (precision < 0) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }function _printf(format, varargs) {
      // int printf(const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var stdout = HEAP32[((_stdout)>>2)];
      return _fprintf(stdout, format, varargs);
    }

  function _glBindTexture(target, texture) {
      GLctx.bindTexture(target, texture ? GL.textures[texture] : null);
    }

  function _SDL_SetVideoMode(width, height, depth, flags) {
      ['mousedown', 'mouseup', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mouseout'].forEach(function(event) {
        Module['canvas'].addEventListener(event, SDL.receiveEvent, true);
      });
  
      // (0,0) means 'use fullscreen' in native; in Emscripten, use the current canvas size.
      if (width == 0 && height == 0) {
        var canvas = Module['canvas'];
        width = canvas.width;
        height = canvas.height;
      }
  
      Browser.setCanvasSize(width, height, true);
      // Free the old surface first.
      if (SDL.screen) {
        SDL.freeSurface(SDL.screen);
        SDL.screen = null;
      }
      SDL.screen = SDL.makeSurface(width, height, flags, true, 'screen');
      if (!SDL.addedResizeListener) {
        SDL.addedResizeListener = true;
        Browser.resizeListeners.push(function(w, h) {
          SDL.receiveEvent({
            type: 'resize',
            w: w,
            h: h
          });
        });
      }
      return SDL.screen;
    }

  
  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 512;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 1024;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var fd = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return fd === -1 ? 0 : FS.getPtrForStream(FS.getStream(fd));
    }


  function _SDL_GL_SetAttribute(attr, value) {
      if (!(attr in SDL.glAttributes)) {
        abort('Unknown SDL GL attribute (' + attr + '). Please check if your SDL version is supported.');
      }
  
      SDL.glAttributes[attr] = value;
    }


   
  Module["_i64Add"] = _i64Add;

  function _SDL_PollEvent(ptr) {
      if (SDL.initFlags & 0x200 && SDL.joystickEventState) {
        // If SDL_INIT_JOYSTICK was supplied AND the joystick system is configured
        // to automatically query for events, query for joystick events.
        SDL.queryJoysticks();
      }
      if (SDL.events.length === 0) return 0;
      if (ptr) {
        SDL.makeCEvent(SDL.events.shift(), ptr);
      }
      return 1;
    }

  function _SDL_Flip(surf) {
      // We actually do this in Unlock, since the screen surface has as its canvas
      // backing the page canvas element
    }

  
  function _SDL_LockSurface(surf) {
      var surfData = SDL.surfaces[surf];
  
      surfData.locked++;
      if (surfData.locked > 1) return 0;
  
      if (!surfData.buffer) {
        surfData.buffer = _malloc(surfData.width * surfData.height * 4);
        HEAP32[(((surf)+(20))>>2)]=surfData.buffer;
      }
  
      // Mark in C/C++-accessible SDL structure
      // SDL_Surface has the following fields: Uint32 flags, SDL_PixelFormat *format; int w, h; Uint16 pitch; void *pixels; ...
      // So we have fields all of the same size, and 5 of them before us.
      // TODO: Use macros like in library.js
      HEAP32[(((surf)+(20))>>2)]=surfData.buffer;
  
      if (surf == SDL.screen && Module.screenIsReadOnly && surfData.image) return 0;
  
      surfData.image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
      if (surf == SDL.screen) {
        var data = surfData.image.data;
        var num = data.length;
        for (var i = 0; i < num/4; i++) {
          data[i*4+3] = 255; // opacity, as canvases blend alpha
        }
      }
  
      if (SDL.defaults.copyOnLock) {
        // Copy pixel data to somewhere accessible to 'C/C++'
        if (surfData.isFlagSet(0x00200000 /* SDL_HWPALETTE */)) {
          // If this is neaded then
          // we should compact the data from 32bpp to 8bpp index.
          // I think best way to implement this is use
          // additional colorMap hash (color->index).
          // Something like this:
          //
          // var size = surfData.width * surfData.height;
          // var data = '';
          // for (var i = 0; i<size; i++) {
          //   var color = SDL.translateRGBAToColor(
          //     surfData.image.data[i*4   ], 
          //     surfData.image.data[i*4 +1], 
          //     surfData.image.data[i*4 +2], 
          //     255);
          //   var index = surfData.colorMap[color];
          //   HEAP8[(((surfData.buffer)+(i))|0)]=index;
          // }
          throw 'CopyOnLock is not supported for SDL_LockSurface with SDL_HWPALETTE flag set' + new Error().stack;
        } else {
        HEAPU8.set(surfData.image.data, surfData.buffer);
        }
      }
  
      return 0;
    }function _SDL_UpperBlit(src, srcrect, dst, dstrect) {
      var srcData = SDL.surfaces[src];
      var dstData = SDL.surfaces[dst];
      var sr, dr;
      if (srcrect) {
        sr = SDL.loadRect(srcrect);
      } else {
        sr = { x: 0, y: 0, w: srcData.width, h: srcData.height };
      }
      if (dstrect) {
        dr = SDL.loadRect(dstrect);
      } else {
        dr = { x: 0, y: 0, w: -1, h: -1 };
      }
      var oldAlpha = dstData.ctx.globalAlpha;
      dstData.ctx.globalAlpha = srcData.alpha/255;
      dstData.ctx.drawImage(srcData.canvas, sr.x, sr.y, sr.w, sr.h, dr.x, dr.y, sr.w, sr.h);
      dstData.ctx.globalAlpha = oldAlpha;
      if (dst != SDL.screen) {
        // XXX As in IMG_Load, for compatibility we write out |pixels|
        Runtime.warnOnce('WARNING: copying canvas data to memory for compatibility');
        _SDL_LockSurface(dst);
        dstData.locked--; // The surface is not actually locked in this hack
      }
      return 0;
    }


  
  
  function _malloc(bytes) {
      /* Over-allocate to make sure it is byte-aligned by 8.
       * This will leak memory, but this is only the dummy
       * implementation (replaced by dlmalloc normally) so
       * not an issue.
       */
      var ptr = Runtime.dynamicAlloc(bytes + 8);
      return (ptr+8) & 0xFFFFFFF8;
    }
  Module["_malloc"] = _malloc;function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }

  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }

  function _SDL_GetError() {
      if (!SDL.errorMessage) {
        SDL.errorMessage = allocate(intArrayFromString("unknown SDL-emscripten error"), 'i8', ALLOC_NORMAL);
      }
      return SDL.errorMessage;
    }

  var _sin=Math_sin;


  
  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;

  function _glViewport(x0, x1, x2, x3) { GLctx.viewport(x0, x1, x2, x3) }

  function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg) {
      Module['noExitRuntime'] = true;
  
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from non-main loop sources
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
        GL.newRenderingFrameStarted();
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          Module.printErr('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        if (Module['preMainLoop']) {
          Module['preMainLoop']();
        }
  
        try {
          if (typeof arg !== 'undefined') {
            Runtime.dynCall('vi', func, [arg]);
          } else {
            Runtime.dynCall('v', func);
          }
        } catch (e) {
          if (e instanceof ExitStatus) {
            return;
          } else {
            if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
            throw e;
          }
        }
  
        if (Module['postMainLoop']) {
          Module['postMainLoop']();
        }
  
        if (Browser.mainLoop.shouldPause) {
          // catch pauses from the main loop itself
          Browser.mainLoop.paused = true;
          Browser.mainLoop.shouldPause = false;
          return;
        }
        Browser.mainLoop.scheduler();
      }
      if (fps && fps > 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          setTimeout(Browser.mainLoop.runner, 1000/fps); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      }
      Browser.mainLoop.scheduler();
  
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }

  function _SDL_GL_SwapBuffers() {}

  function _glTexParameteri(x0, x1, x2) { GLctx.texParameteri(x0, x1, x2) }

  function _glLoadIdentity() {
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrixLib.mat4.identity(GLImmediate.matrix[GLImmediate.currentMatrix]);
    }

  function _SDL_WM_SetCaption(title, icon) {
      title = title && Pointer_stringify(title);
      icon = icon && Pointer_stringify(icon);
    }

  function _SDL_GetTicks() {
      return Math.floor(Date.now() - SDL.startTime);
    }


  var _cos=Math_cos;

  
  function _fputc(c, stream) {
      // int fputc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
      var chr = unSign(c & 0xFF);
      HEAP8[((_fputc.ret)|0)]=chr;
      var fd = _fileno(stream);
      var ret = _write(fd, _fputc.ret, 1);
      if (ret == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return -1;
      } else {
        return chr;
      }
    }function _putchar(c) {
      // int putchar(int c);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/putchar.html
      return _fputc(c, HEAP32[((_stdout)>>2)]);
    }

  
  function _fputs(s, stream) {
      // int fputs(const char *restrict s, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputs.html
      var fd = _fileno(stream);
      return _write(fd, s, _strlen(s));
    }function _puts(s) {
      // int puts(const char *s);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/puts.html
      // NOTE: puts() always writes an extra newline.
      var stdout = HEAP32[((_stdout)>>2)];
      var ret = _fputs(s, stdout);
      if (ret < 0) {
        return ret;
      } else {
        var newlineRet = _fputc(10, stdout);
        return (newlineRet < 0) ? -1 : ret + 1;
      }
    }

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

  function _SDL_Init(initFlags) {
      SDL.startTime = Date.now();
      SDL.initFlags = initFlags;
  
      // capture all key events. we just keep down and up, but also capture press to prevent default actions
      if (!Module['doNotCaptureKeyboard']) {
        document.addEventListener("keydown", SDL.receiveEvent);
        document.addEventListener("keyup", SDL.receiveEvent);
        document.addEventListener("keypress", SDL.receiveEvent);
        window.addEventListener("blur", SDL.receiveEvent);
        document.addEventListener("visibilitychange", SDL.receiveEvent);
      }
  
      if (initFlags & 0x200) {
        // SDL_INIT_JOYSTICK
        // Firefox will not give us Joystick data unless we register this NOP
        // callback.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=936104
        addEventListener("gamepadconnected", function() {});
      }
  
      window.addEventListener("unload", SDL.receiveEvent);
      SDL.keyboardState = _malloc(0x10000); // Our SDL needs 512, but 64K is safe for older SDLs
      _memset(SDL.keyboardState, 0, 0x10000);
      // Initialize this structure carefully for closure
      SDL.DOMEventToSDLEvent['keydown'] = 0x300 /* SDL_KEYDOWN */;
      SDL.DOMEventToSDLEvent['keyup'] = 0x301 /* SDL_KEYUP */;
      SDL.DOMEventToSDLEvent['keypress'] = 0x303 /* SDL_TEXTINPUT */;
      SDL.DOMEventToSDLEvent['mousedown'] = 0x401 /* SDL_MOUSEBUTTONDOWN */;
      SDL.DOMEventToSDLEvent['mouseup'] = 0x402 /* SDL_MOUSEBUTTONUP */;
      SDL.DOMEventToSDLEvent['mousemove'] = 0x400 /* SDL_MOUSEMOTION */;
      SDL.DOMEventToSDLEvent['unload'] = 0x100 /* SDL_QUIT */;
      SDL.DOMEventToSDLEvent['resize'] = 0x7001 /* SDL_VIDEORESIZE/SDL_EVENT_COMPAT2 */;
      // These are not technically DOM events; the HTML gamepad API is poll-based.
      // However, we define them here, as the rest of the SDL code assumes that
      // all SDL events originate as DOM events.
      SDL.DOMEventToSDLEvent['joystick_axis_motion'] = 0x600 /* SDL_JOYAXISMOTION */;
      SDL.DOMEventToSDLEvent['joystick_button_down'] = 0x603 /* SDL_JOYBUTTONDOWN */;
      SDL.DOMEventToSDLEvent['joystick_button_up'] = 0x604 /* SDL_JOYBUTTONUP */;
      return 0; // success
    }

  function _SDL_CreateRGBSurface(flags, width, height, depth, rmask, gmask, bmask, amask) {
      return SDL.makeSurface(width, height, flags, false, 'CreateRGBSurface', rmask, gmask, bmask, amask);
    }

  function _glMatrixMode(mode) {
      if (mode == 0x1700 /* GL_MODELVIEW */) {
        GLImmediate.currentMatrix = 0/*m*/;
      } else if (mode == 0x1701 /* GL_PROJECTION */) {
        GLImmediate.currentMatrix = 1/*p*/;
      } else if (mode == 0x1702) { // GL_TEXTURE
        GLImmediate.useTextureMatrix = true;
        GLImmediate.currentMatrix = 2/*t*/ + GLImmediate.clientActiveTexture;
      } else {
        throw "Wrong mode " + mode + " passed to glMatrixMode";
      }
    }

  function ___errno_location() {
      return ___errno_state;
    }

  function _glEnd() {
      GLImmediate.prepareClientAttributes(GLImmediate.rendererComponents[GLImmediate.VERTEX], true);
      GLImmediate.firstVertex = 0;
      GLImmediate.lastVertex = GLImmediate.vertexCounter / (GLImmediate.stride >> 2);
      GLImmediate.flush();
      GLImmediate.disableBeginEndClientAttributes();
      GLImmediate.mode = -1;
  
      // Pop the old state:
      GLImmediate.enabledClientAttributes = GLImmediate.enabledClientAttributes_preBegin;
      GLImmediate.clientAttributes = GLImmediate.clientAttributes_preBegin;
      GLImmediate.currentRenderer = null; // The set of active client attributes changed, we must re-lookup the renderer to use.
      GLImmediate.modifiedClientAttributes = true;
    }

  function _glOrtho(left, right, bottom, top_, nearVal, farVal) {
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrixLib.mat4.multiply(GLImmediate.matrix[GLImmediate.currentMatrix],
          GLImmediate.matrixLib.mat4.ortho(left, right, bottom, top_, nearVal, farVal));
    }

  function _llvm_lifetime_start() {}

  function _abort() {
      Module['abort']();
    }

  function _SDL_FreeSurface(surf) {
      if (surf) SDL.freeSurface(surf);
    }

  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

var GLctx; GL.init()
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
GLImmediate.setupFuncs(); Browser.moduleContextCreatedCallbacks.push(function() { GLImmediate.init() });
GLEmulation.init();
_fputc.ret = allocate([0], "i8", ALLOC_STATIC);
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + 5242880;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_DYNAMIC);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);

var Math_min = Math.min;
function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env.___rand_seed|0;var p=0;var q=0;var r=0;var s=0;var t=+env.NaN,u=+env.Infinity;var v=0,w=0,x=0,y=0,z=0.0,A=0,B=0,C=0,D=0.0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=0;var O=global.Math.floor;var P=global.Math.abs;var Q=global.Math.sqrt;var R=global.Math.pow;var S=global.Math.cos;var T=global.Math.sin;var U=global.Math.tan;var V=global.Math.acos;var W=global.Math.asin;var X=global.Math.atan;var Y=global.Math.atan2;var Z=global.Math.exp;var _=global.Math.log;var $=global.Math.ceil;var aa=global.Math.imul;var ba=env.abort;var ca=env.assert;var da=env.asmPrintInt;var ea=env.asmPrintFloat;var fa=env.min;var ga=env.invoke_vi;var ha=env.invoke_iii;var ia=env.invoke_v;var ja=env._glUseProgram;var ka=env._fread;var la=env._glDeleteProgram;var ma=env._glBindBuffer;var na=env._SDL_GetError;var oa=env._sbrk;var pa=env._glDisableVertexAttribArray;var qa=env._glCreateShader;var ra=env._sysconf;var sa=env._close;var ta=env._glTexCoord2f;var ua=env._cos;var va=env._puts;var wa=env._glLoadIdentity;var xa=env._write;var ya=env._fsync;var za=env._glShaderSource;var Aa=env._glOrtho;var Ba=env._SDL_WM_SetCaption;var Ca=env._glGetBooleanv;var Da=env._llvm_lifetime_end;var Ea=env._glVertexAttribPointer;var Fa=env._glHint;var Ga=env._send;var Ha=env._SDL_GL_SetAttribute;var Ia=env._glBegin;var Ja=env._SDL_GetTicks;var Ka=env._SDL_LockSurface;var La=env._glViewport;var Ma=env.___setErrNo;var Na=env._srand;var Oa=env._putchar;var Pa=env._SDL_SetPalette;var Qa=env._glEnable;var Ra=env._printf;var Sa=env._glGenTextures;var Ta=env._sprintf;var Ua=env._glGetIntegerv;var Va=env._glGetString;var Wa=env._glAttachShader;var Xa=env._SDL_CreateRGBSurface;var Ya=env._read;var Za=env._SDL_SetVideoMode;var _a=env._fwrite;var $a=env._time;var ab=env._fprintf;var bb=env._glDetachShader;var cb=env._exit;var db=env._glVertex2i;var eb=env._sin;var fb=env._pwrite;var gb=env._glBindTexture;var hb=env._open;var ib=env._glIsEnabled;var jb=env._SDL_Init;var kb=env._snprintf;var lb=env._SDL_FreeSurface;var mb=env._glGetFloatv;var nb=env._emscripten_memcpy_big;var ob=env._fclose;var pb=env._glActiveTexture;var qb=env._recv;var rb=env._glCompileShader;var sb=env._glEnableVertexAttribArray;var tb=env._abort;var ub=env._SDL_Flip;var vb=env._glTexImage2D;var wb=env._fopen;var xb=env._llvm_lifetime_start;var yb=env._fflush;var zb=env.__reallyNegative;var Ab=env._SDL_PollEvent;var Bb=env._fileno;var Cb=env._glMatrixMode;var Db=env.__exit;var Eb=env._glBindAttribLocation;var Fb=env._SDL_SetColors;var Gb=env._pread;var Hb=env._mkport;var Ib=env._glEnd;var Jb=env._glLinkProgram;var Kb=env._emscripten_set_main_loop;var Lb=env.___errno_location;var Mb=env._fputc;var Nb=env._SDL_GL_SwapBuffers;var Ob=env._glDisable;var Pb=env._glTexParameteri;var Qb=env.__formatString;var Rb=env._fputs;var Sb=env._SDL_UpperBlit;var Tb=0.0;
// EMSCRIPTEN_START_FUNCS
function Xb(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7&-8;return b|0}function Yb(){return i|0}function Zb(a){a=a|0;i=a}function _b(a,b){a=a|0;b=b|0;if((p|0)==0){p=a;q=b}}function $b(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function ac(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function bc(a){a=a|0;E=a}function cc(a){a=a|0;F=a}function dc(a){a=a|0;G=a}function ec(a){a=a|0;H=a}function fc(a){a=a|0;I=a}function gc(a){a=a|0;J=a}function hc(a){a=a|0;K=a}function ic(a){a=a|0;L=a}function jc(a){a=a|0;M=a}function kc(a){a=a|0;N=a}function lc(){var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;if((a[40]|0)==0){f=48;ef(c[34]|0,c[f>>2]|0,c[f+4>>2]|0)|0;f=48;g=Uf(c[f>>2]|0,c[f+4>>2]|0,35568,0)|0;f=48;c[f>>2]=g;c[f+4>>2]=E}else{c[32]=11856;do{f=c[34]|0;g=f+40|0;h=Uf(c[g>>2]|0,c[g+4>>2]|0,1,0)|0;ef(f,h,E)|0;af(c[34]|0);Oa(32)|0;h=c[34]|0;$e(h,b[h+12>>1]|0)|0;h=(c[32]|0)+ -1|0;c[32]=h;}while((h|0)!=0)}h=c[34]|0;if((a[104]|0)==0){tc(h,c[2]|0,c[22]|0,c[24]|0);ub(c[2]|0)|0}else{f=c[(c[(c[h+72>>2]|0)+96>>2]|0)+20>>2]|0;h=c[30]|0;g=0;do{j=(g*456|0)+3744|0;k=g<<9;l=0;do{m=d[f+(j+l)|0]|0;c[h+(l+k<<2)>>2]=d[993+(m<<2)|0]<<8|d[992+(m<<2)|0]|d[994+(m<<2)|0]<<16;l=l+1|0;}while((l|0)!=320);g=g+1|0;}while((g|0)!=240);vb(3553,0,6408,512,512,0,6408,5121,h|0);Qa(3553);gb(3553,c[36]|0);Ia(7);ta(0.0,0.0);db(0,0);ta(1.0,0.0);db((c[22]<<9>>>0)/320|0|0,0);ta(1.0,1.0);db((c[22]<<9>>>0)/320|0|0,(c[24]<<9>>>0)/240|0|0);ta(0.0,1.0);db(0,(c[24]<<9>>>0)/240|0|0);Ib();Nb()}if((Ab(152)|0)==0){n=Ja()|0;c[8]=n;i=e;return}do{h=c[38]|0;if((h|0)==768){g=c[168>>2]|0;if((g|0)==1092){a[24]=1}else if((g|0)==1093){a[40]=1}if((h|0)==769){o=18}}else if((h|0)==769){o=18}do{if((o|0)==18){o=0;if((c[168>>2]|0)!=1092){break}a[24]=0}}while(0);xc(c[34]|0,152);}while((Ab(152)|0)!=0);n=Ja()|0;c[8]=n;i=e;return}function mc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;e=i;i=i+8|0;f=e;c[30]=Nf(1048576)|0;jb(33)|0;c[50]=1;if(b>>>0>1){g=1;do{h=c[d+(g<<2)>>2]|0;a:do{if((a[h]|0)==45){switch(a[h+1|0]|0){case 70:case 102:{c[28]=c[28]|8388608;break a;break};case 66:case 98:{c[14]=1;break a;break};case 79:case 111:{a[104]=1;break a;break};default:{break a}}}else{c[20]=h}}while(0);g=g+1|0;c[50]=g;}while(g>>>0<b>>>0)}b=c[28]|0;do{if((a[104]|0)==0){c[28]=b|138412033;g=b>>>19&16^336;c[22]=g;c[24]=240;j=240;k=g}else{c[28]=b|67108864;Ha(5,1)|0;g=c[22]|0;d=c[24]|0;if(!((g|0)==0|(d|0)==0)){j=d;k=g;break}c[22]=1024;c[24]=768;j=768;k=1024}}while(0);b=Za(k|0,j|0,16,c[28]|0)|0;c[2]=b;if((b|0)==0){c[f>>2]=na()|0;Ra(208,f|0)|0;cb(-1)}if((a[104]|0)==0){Ba(240,0);Se();l=Te()|0;c[34]=l;m=c[14]|0;n=c[20]|0;uc(l,m,n);o=c[34]|0;cf(o);Kb(1,50,1);p=c[34]|0;wc(p);q=c[34]|0;Ve(q);i=e;return 0}c[4]=Xa(0,512,512,32,255,65280,16711680,-16777216)|0;Sa(1,144);gb(3553,c[36]|0);Pb(3553,10241,9729);Pb(3553,10240,9729);La(0,0,c[22]|0,c[24]|0);Cb(5889);wa();Aa(0.0,+(+((c[22]|0)>>>0)),+(+((c[24]|0)>>>0)),0.0,-1.0,1.0);Cb(5888);wa();Ba(240,0);Se();l=Te()|0;c[34]=l;m=c[14]|0;n=c[20]|0;uc(l,m,n);o=c[34]|0;cf(o);Kb(1,50,1);p=c[34]|0;wc(p);q=c[34]|0;Ve(q);i=e;return 0}function nc(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0;g=i;h=f+72|0;j=c[h>>2]|0;k=f+16|0;l=(c[k>>2]|0)+54287|0;a[l]=a[l]&127;l=f+48|0;m=l;n=c[m>>2]|0;o=c[m+4>>2]|0;m=f+40|0;p=m;q=Uf(c[p>>2]|0,c[p+4>>2]|0,9,0)|0;p=E;r=o>>>0>p>>>0|(o|0)==(p|0)&n>>>0>q>>>0;s=l;c[s>>2]=r?n:q;c[s+4>>2]=r?o:p;p=j+88|0;o=j+92|0;r=c[o>>2]|0;do{if((r|0)==248){c[j+76>>2]=8;t=3}else if((r|0)==249){s=f+20|0;if((a[(c[s>>2]|0)+54286|0]&64)==0){u=s;break}q=(c[k>>2]|0)+54287|0;a[q]=d[q]|0|64;bf(f);u=s}else{t=3}}while(0);if((t|0)==3){u=f+20|0}if((a[(c[u>>2]|0)+54272|0]&32)==0){i=g;return}r=c[o>>2]|0;o=j+76|0;if((r|0)!=(c[o>>2]|0)){i=g;return}s=j+72|0;q=a[s]|0;n=j+80|0;v=e[n>>1]|0;a[s]=a[(c[k>>2]|0)+v|0]|0;w=v+1&1023|v&64512;b[n>>1]=w;v=l;x=c[v>>2]|0;y=c[v+4>>2]|0;v=m;m=c[v>>2]|0;z=c[v+4>>2]|0;v=Uf(m|0,z|0,1,0)|0;A=E;B=y>>>0>A>>>0|(y|0)==(A|0)&x>>>0>v>>>0;C=l;c[C>>2]=B?x:v;c[C+4>>2]=B?y:A;A=a[s]|0;y=A&255;B=y&15;if(B>>>0<2){D=(y>>>4&7)+1+r|0}else{D=r+(c[272+(B*12|0)>>2]|0)|0}c[o>>2]=D;if(A<<24>>24<0){A=Uf(((D-r|0)*114|0)+ -114|0,0,m|0,z|0)|0;z=j+16|0;c[z>>2]=A;c[z+4>>2]=E;z=c[h>>2]|0;h=f+56|0;f=h;c[f>>2]=-1;c[f+4>>2]=-1;f=z;A=c[f>>2]|0;m=c[f+4>>2]|0;f=h;c[f>>2]=A;c[f+4>>2]=m;f=z+8|0;B=c[f>>2]|0;y=c[f+4>>2]|0;f=y>>>0<m>>>0|(y|0)==(m|0)&B>>>0<A>>>0;C=f?B:A;A=f?y:m;m=h;c[m>>2]=C;c[m+4>>2]=A;m=z+16|0;y=c[m>>2]|0;f=c[m+4>>2]|0;m=f>>>0<A>>>0|(f|0)==(A|0)&y>>>0<C>>>0;B=m?y:C;C=m?f:A;A=h;c[A>>2]=B;c[A+4>>2]=C;A=z+32|0;f=c[A>>2]|0;m=c[A+4>>2]|0;A=m>>>0<C>>>0|(m|0)==(C|0)&f>>>0<B>>>0;y=A?f:B;B=A?m:C;C=h;c[C>>2]=y;c[C+4>>2]=B;C=z+24|0;m=c[C>>2]|0;A=c[C+4>>2]|0;C=A>>>0<B>>>0|(A|0)==(B|0)&m>>>0<y>>>0;f=C?m:y;y=C?A:B;B=h;c[B>>2]=f;c[B+4>>2]=y;B=z+40|0;A=c[B>>2]|0;C=c[B+4>>2]|0;B=C>>>0<y>>>0|(C|0)==(y|0)&A>>>0<f>>>0;m=B?A:f;f=B?C:y;y=h;c[y>>2]=m;c[y+4>>2]=f;y=z+48|0;C=c[y>>2]|0;B=c[y+4>>2]|0;y=B>>>0<f>>>0|(B|0)==(f|0)&C>>>0<m>>>0;A=y?C:m;m=y?B:f;f=h;c[f>>2]=A;c[f+4>>2]=m;f=z+56|0;B=c[f>>2]|0;y=c[f+4>>2]|0;f=y>>>0<m>>>0|(y|0)==(m|0)&B>>>0<A>>>0;C=f?B:A;A=f?y:m;m=h;c[m>>2]=C;c[m+4>>2]=A;m=z+64|0;z=c[m>>2]|0;y=c[m+4>>2]|0;m=y>>>0<A>>>0|(y|0)==(A|0)&z>>>0<C>>>0;f=h;c[f>>2]=m?z:C;c[f+4>>2]=m?y:A}A=q&47;q=a[s]|0;do{if(A>>>0<34){if((q&46)>>>0>33){s=r+1|0;y=D-(d[(c[u>>2]|0)+54277|0]|0)|0;c[o>>2]=s>>>0>y>>>0?s:y;c[p>>2]=0;break}else{if(A>>>0>33){t=17;break}else{t=19;break}}}else{t=17}}while(0);do{if((t|0)==17){if(!((q&46)>>>0<34)){t=19;break}A=r+1+(d[(c[u>>2]|0)+54277|0]|0)|0;y=D>>>0<A>>>0?D:A;c[o>>2]=y;c[p>>2]=D-y}}while(0);if((t|0)==19){c[p>>2]=0}if((q&15)==1){p=c[k>>2]|0;t=(d[p+(w+1)|0]|0)<<8|(d[p+w|0]|0);b[n>>1]=t;F=t}else{F=w}if(q<<24>>24==65){c[o>>2]=8}if(!((q&78)>>>0>65)){i=g;return}q=c[k>>2]|0;k=a[q+(F&65535)|0]|0;o=j+82|0;b[o>>1]=k&255;j=F&64512;w=F+1&1023|j;b[n>>1]=w;b[o>>1]=k&255|(d[q+w|0]|0)<<8;b[n>>1]=F+2&1023|j;i=g;return}function oc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0;b=c[a+72>>2]|0;d=a+56|0;a=d;c[a>>2]=-1;c[a+4>>2]=-1;a=b;e=c[a>>2]|0;f=c[a+4>>2]|0;a=d;c[a>>2]=e;c[a+4>>2]=f;a=b+8|0;g=c[a>>2]|0;h=c[a+4>>2]|0;a=h>>>0<f>>>0|(h|0)==(f|0)&g>>>0<e>>>0;j=a?g:e;e=a?h:f;f=d;c[f>>2]=j;c[f+4>>2]=e;f=b+16|0;h=c[f>>2]|0;a=c[f+4>>2]|0;f=a>>>0<e>>>0|(a|0)==(e|0)&h>>>0<j>>>0;g=f?h:j;j=f?a:e;e=d;c[e>>2]=g;c[e+4>>2]=j;e=b+32|0;a=c[e>>2]|0;f=c[e+4>>2]|0;e=f>>>0<j>>>0|(f|0)==(j|0)&a>>>0<g>>>0;h=e?a:g;g=e?f:j;j=d;c[j>>2]=h;c[j+4>>2]=g;j=b+24|0;f=c[j>>2]|0;e=c[j+4>>2]|0;j=e>>>0<g>>>0|(e|0)==(g|0)&f>>>0<h>>>0;a=j?f:h;h=j?e:g;g=d;c[g>>2]=a;c[g+4>>2]=h;g=b+40|0;e=c[g>>2]|0;j=c[g+4>>2]|0;g=j>>>0<h>>>0|(j|0)==(h|0)&e>>>0<a>>>0;f=g?e:a;a=g?j:h;h=d;c[h>>2]=f;c[h+4>>2]=a;h=b+48|0;j=c[h>>2]|0;g=c[h+4>>2]|0;h=g>>>0<a>>>0|(g|0)==(a|0)&j>>>0<f>>>0;e=h?j:f;f=h?g:a;a=d;c[a>>2]=e;c[a+4>>2]=f;a=b+56|0;g=c[a>>2]|0;h=c[a+4>>2]|0;a=h>>>0<f>>>0|(h|0)==(f|0)&g>>>0<e>>>0;j=a?g:e;e=a?h:f;f=d;c[f>>2]=j;c[f+4>>2]=e;f=b+64|0;b=c[f>>2]|0;h=c[f+4>>2]|0;f=h>>>0<e>>>0|(h|0)==(e|0)&b>>>0<j>>>0;a=d;c[a>>2]=f?b:j;c[a+4>>2]=f?h:e;i=i;return}function pc(e){e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;f=i;i=i+8|0;g=f;h=c[e+72>>2]|0;j=e+20|0;k=c[j>>2]|0;l=d[k+54272|0]|0;m=(l<<6&192)+192|0;n=a[k+53274|0]|0;a[g]=n;a[g+1|0]=n;a[g+2|0]=a[k+53266|0]|0;a[g+3|0]=n&240;n=a[g+((d[k+53275|0]|0)>>>6)|0]|0;k=h+92|0;g=c[k>>2]|0;if((g+ -8|0)>>>0>239){i=f;return}if((l&32|0)==0|(l&3|0)==0){Sf((c[(c[h+96>>2]|0)+20>>2]|0)+(g*456|0)|0,n|0,456)|0;i=f;return}l=h+72|0;o=d[l]|0;p=h+96|0;q=c[(c[p>>2]|0)+20>>2]|0;r=g*456|0;g=q+r|0;if((o&14)>>>0<2){Sf(g|0,n|0,456)|0;i=f;return}s=h+104|0;c[s>>2]=g;t=c[h+100>>2]|0;u=t+r|0;v=h+108|0;c[v>>2]=u;w=a[(c[j>>2]|0)+54272|0]&3;if((w|0)==2){x=q+(r+96)|0;c[s>>2]=x;y=t+(r+96)|0;c[v>>2]=y;z=y;A=x;B=96;C=40}else if((w|0)==3){x=q+(r+64)|0;c[s>>2]=x;y=t+(r+64)|0;c[v>>2]=y;z=y;A=x;B=88;C=16}else if((w|0)==1){w=q+(r+128)|0;c[s>>2]=w;q=t+(r+128)|0;c[v>>2]=q;z=q;A=w;B=128;C=72}else{z=u;A=g;B=0;C=0}g=(m>>>0)/((c[276+((o&15)*12|0)>>2]|0)>>>0)|0;o=h+116|0;c[o>>2]=g;u=e+48|0;w=u;q=c[w>>2]|0;r=c[w+4>>2]|0;w=e+40|0;t=Uf(c[w>>2]|0,c[w+4>>2]|0,g|0,0)|0;w=E;x=r>>>0>w>>>0|(r|0)==(w|0)&q>>>0>t>>>0;y=u;c[y>>2]=x?q:t;c[y+4>>2]=x?r:w;w=a[l]|0;do{if(!((w&16)==0)){l=c[j>>2]|0;r=(d[l+54276|0]|0)<<1;if((a[l+54272|0]&3)==3){c[s>>2]=A+r;c[v>>2]=z+((d[(c[j>>2]|0)+54276|0]|0)<<1);break}else{c[s>>2]=A+(r+ -32);c[v>>2]=z+(((d[(c[j>>2]|0)+54276|0]|0)<<1)+ -32);c[o>>2]=g+8;break}}}while(0);b[h+112>>1]=b[h+82>>1]|0;Ub[c[280+((w&255&15)*12|0)>>2]&127](e);if((B|0)!=0){Sf((c[(c[p>>2]|0)+20>>2]|0)+((c[k>>2]|0)*456|0)|0,n|0,B|0)|0}if((C|0)==0){i=f;return}Sf((c[(c[p>>2]|0)+20>>2]|0)+(B+m+((c[k>>2]|0)*456|0))|0,n|0,C|0)|0;i=f;return}function qc(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;e=i;f=c[b+72>>2]|0;g=f+92|0;h=c[g>>2]|0;if(h>>>0>247){i=e;return}j=b+20|0;k=c[j>>2]|0;l=a[k+54272|0]|0;m=l&255;do{if((m&8|0)==0){n=7}else{if((a[k+53277|0]&2)==0){n=7;break}o=(d[k+54279|0]|0)<<8;if((m&16|0)==0){p=(c[b+16>>2]|0)+((o|896)+(h>>>1)-((d[k+53276|0]|0)>>>7&255))|0;break}else{p=(c[b+16>>2]|0)+((o|1792)+h)|0;break}}}while(0);if((n|0)==7){p=k+53264|0}m=a[p]|0;do{if(m<<24>>24==0){q=l;r=k}else{p=a[k+53251|0]|0;if(p<<24>>24==0){q=l;r=k;break}o=(h*456|0)+((p&255)<<1)|0;p=(c[(c[f+96>>2]|0)+20>>2]|0)+o|0;s=(c[f+100>>2]|0)+o|0;o=a[k+53275|0]|0;t=o&255;do{if((t&1|0)==0){if((t&6|0)!=0){u=127;break}u=(t&8|0)==0?0:115}else{u=112}}while(0);t=a[f+72|0]&15;if((t|0)==15|(t|0)==3|(t|0)==2){v=(o&255)<64|0}else{v=0}t=(rc(a[k+53269|0]|0,a[k+53259|0]|0,m,u,-128,s,p,v,0)|0)&15;w=(c[b+16>>2]|0)+53255|0;a[w]=d[w]|0|t;t=c[j>>2]|0;q=a[t+54272|0]|0;r=t}}while(0);v=q&255;do{if((v&8|0)==0){n=21}else{if((a[r+53277|0]&2)==0){n=21;break}u=(d[r+54279|0]|0)<<8;if((v&16|0)==0){x=(c[b+16>>2]|0)+(((c[g>>2]|0)>>>1)+(u|768)-((d[r+53276|0]|0)>>>6&1))|0;break}else{x=(c[b+16>>2]|0)+((c[g>>2]|0)+(u&63488|1536))|0;break}}}while(0);if((n|0)==21){x=r+53263|0}v=a[x]|0;do{if(v<<24>>24==0){y=q;z=r}else{x=a[r+53250|0]|0;if(x<<24>>24==0){y=q;z=r;break}u=((c[g>>2]|0)*456|0)+((x&255)<<1)|0;x=(c[(c[f+96>>2]|0)+20>>2]|0)+u|0;m=(c[f+100>>2]|0)+u|0;u=a[r+53275|0]|0;k=u&255;do{if((k&1|0)==0){if((k&6|0)!=0){A=63;break}A=(k&8|0)==0?0:51}else{A=48}}while(0);k=a[f+72|0]&15;if((k|0)==15|(k|0)==3|(k|0)==2){B=(u&255)<64|0}else{B=0}k=(rc(a[r+53268|0]|0,a[r+53258|0]|0,v,A,64,m,x,B,u<<2&255&-128)|0)&255;p=b+16|0;s=(c[p>>2]|0)+53254|0;a[s]=d[s]|0|k&15;if((k&128|0)!=0){s=(c[p>>2]|0)+53263|0;a[s]=d[s]|0|4}s=(c[p>>2]|0)+53262|0;a[s]=d[s]|0|k>>>4&11;k=c[j>>2]|0;y=a[k+54272|0]|0;z=k}}while(0);B=y&255;do{if((B&8|0)==0){n=37}else{if((a[z+53277|0]&2)==0){n=37;break}A=(d[z+54279|0]|0)<<8;if((B&16|0)==0){C=(c[b+16>>2]|0)+(((c[g>>2]|0)>>>1)+(A&64512|640)-((d[z+53276|0]|0)>>>5&1))|0;break}else{C=(c[b+16>>2]|0)+((c[g>>2]|0)+(A&63488|1280))|0;break}}}while(0);if((n|0)==37){C=z+53262|0}B=a[C]|0;do{if(B<<24>>24==0){D=y;E=z}else{C=a[z+53249|0]|0;if(C<<24>>24==0){D=y;E=z;break}A=((c[g>>2]|0)*456|0)+((C&255)<<1)|0;C=(c[(c[f+96>>2]|0)+20>>2]|0)+A|0;v=(c[f+100>>2]|0)+A|0;A=a[z+53275|0]|0;r=A&255;do{if((r&3|0)==0){if((r&4|0)!=0){F=31;break}F=(r&8|0)==0?0:19}else{F=16}}while(0);r=a[f+72|0]&15;if((r|0)==15|(r|0)==3|(r|0)==2){G=(A&255)<64|0}else{G=0}r=(rc(a[z+53267|0]|0,a[z+53257|0]|0,B,F,32,v,C,G,0)|0)&255;u=b+16|0;x=(c[u>>2]|0)+53253|0;a[x]=d[x]|0|r&15;if((r&128|0)!=0){x=(c[u>>2]|0)+53263|0;a[x]=d[x]|0|2}if((r&64|0)!=0){x=(c[u>>2]|0)+53262|0;a[x]=d[x]|0|2}x=(c[u>>2]|0)+53261|0;a[x]=d[x]|0|r>>>4&13;r=c[j>>2]|0;D=a[r+54272|0]|0;E=r}}while(0);G=D&255;do{if((G&8|0)==0){n=55}else{if((a[E+53277|0]&2)==0){n=55;break}F=(d[E+54279|0]|0)<<8;if((G&16|0)==0){H=(c[b+16>>2]|0)+(((c[g>>2]|0)>>>1)+(F&64512|512)-((d[E+53276|0]|0)>>>4&1))|0;break}else{H=(c[b+16>>2]|0)+((c[g>>2]|0)+(F&63488|1024))|0;break}}}while(0);if((n|0)==55){H=E+53261|0}G=a[H]|0;do{if(G<<24>>24==0){I=D;J=E}else{H=a[E+53248|0]|0;if(H<<24>>24==0){I=D;J=E;break}F=((c[g>>2]|0)*456|0)+((H&255)<<1)|0;H=(c[(c[f+96>>2]|0)+20>>2]|0)+F|0;B=(c[f+100>>2]|0)+F|0;F=a[E+53275|0]|0;z=F&255;do{if((z&3|0)==0){if((z&4|0)!=0){K=15;break}K=(z&8|0)==0?0:3}else{K=0}}while(0);z=a[f+72|0]&15;if((z|0)==15|(z|0)==3|(z|0)==2){L=(F&255)<64|0}else{L=0}z=(rc(a[E+53266|0]|0,a[E+53256|0]|0,G,K,16,B,H,L,F&32)|0)&255;C=b+16|0;v=(c[C>>2]|0)+53252|0;a[v]=d[v]|0|z&15;if((z&128|0)!=0){v=(c[C>>2]|0)+53263|0;a[v]=d[v]|0|1}if((z&64|0)!=0){v=(c[C>>2]|0)+53262|0;a[v]=d[v]|0|1}if((z&32|0)!=0){v=(c[C>>2]|0)+53261|0;a[v]=d[v]|0|1}v=(c[C>>2]|0)+53260|0;a[v]=d[v]|0|z>>>4&14;z=c[j>>2]|0;I=a[z+54272|0]|0;J=z}}while(0);L=I&255;do{if((L&4|0)==0){n=75}else{if((a[J+53277|0]&1)==0){n=75;break}I=(d[J+54279|0]|0)<<8;if((L&16|0)==0){M=(c[b+16>>2]|0)+(((c[g>>2]|0)>>>1)+(I&64512|384)-((d[J+53276|0]|0)>>>3&1))|0;break}else{M=(c[b+16>>2]|0)+((c[g>>2]|0)+(I&63488|768))|0;break}}}while(0);if((n|0)==75){M=J+53265|0}n=a[M]|0;M=n&255;do{if((M&192|0)!=0){L=a[J+53255|0]|0;if(L<<24>>24==0){break}I=((c[g>>2]|0)*456|0)+((L&255)<<1)|0;L=(c[(c[f+96>>2]|0)+20>>2]|0)+I|0;K=(c[f+100>>2]|0)+I|0;I=a[J+53275|0]|0;G=I&255;do{if((G&1|0)==0){if((G&2|0)!=0){N=(G&16|0)==0?127:48;break}if((G&4|0)!=0){N=(G&16|0)==0?127:0;break}if((G&8|0)==0){N=0;break}N=(G&16|0)==0?115:-16}else{N=(G&16|0)==0?112:-16}}while(0);G=a[f+72|0]&15;if((G|0)==15|(G|0)==3|(G|0)==2){O=(I&255)<64|0}else{O=0}G=(sc(3,a[(I&16)==0?J+53269|0:J+53273|0]|0,a[J+53260|0]|0,n,N,K,L,O)|0)&255;F=b+16|0;H=(c[F>>2]|0)+53251|0;a[H]=d[H]|0|G&15;H=(c[F>>2]|0)+53259|0;a[H]=d[H]|0|G>>>4}}while(0);do{if((M&48|0)!=0){O=c[j>>2]|0;N=a[O+53254|0]|0;if(N<<24>>24==0){break}J=((c[g>>2]|0)*456|0)+((N&255)<<1)|0;N=(c[(c[f+96>>2]|0)+20>>2]|0)+J|0;G=(c[f+100>>2]|0)+J|0;J=a[O+53275|0]|0;H=J&255;do{if((H&1|0)==0){if((H&2|0)!=0){P=(H&16|0)==0?63:48;break}if((H&4|0)!=0){P=(H&16|0)==0?63:0;break}if((H&8|0)==0){P=0;break}P=(H&16|0)==0?51:-16}else{P=(H&16|0)==0?48:-16}}while(0);H=a[f+72|0]&15;if((H|0)==15|(H|0)==3|(H|0)==2){Q=(J&255)<64|0}else{Q=0}H=(sc(2,a[(J&16)==0?O+53268|0:O+53273|0]|0,a[O+53260|0]|0,n,P,G,N,Q)|0)&255;L=b+16|0;K=(c[L>>2]|0)+53250|0;a[K]=d[K]|0|H&15;K=(c[L>>2]|0)+53258|0;a[K]=d[K]|0|H>>>4}}while(0);do{if((M&12|0)!=0){Q=c[j>>2]|0;P=a[Q+53253|0]|0;if(P<<24>>24==0){break}H=((c[g>>2]|0)*456|0)+((P&255)<<1)|0;P=(c[(c[f+96>>2]|0)+20>>2]|0)+H|0;K=(c[f+100>>2]|0)+H|0;H=a[Q+53275|0]|0;L=H&255;do{if((L&1|0)==0){if((L&2|0)!=0){R=(L&16|0)==0?16:48;break}if((L&4|0)!=0){R=(L&16|0)==0?31:0;break}if((L&8|0)==0){R=0;break}R=(L&16|0)==0?19:-16}else{R=(L&16|0)==0?16:-16}}while(0);L=a[f+72|0]&15;if((L|0)==15|(L|0)==3|(L|0)==2){S=(H&255)<64|0}else{S=0}L=(sc(1,a[(H&16)==0?Q+53267|0:Q+53273|0]|0,a[Q+53260|0]|0,n,R,K,P,S)|0)&255;N=b+16|0;G=(c[N>>2]|0)+53249|0;a[G]=d[G]|0|L&15;G=(c[N>>2]|0)+53257|0;a[G]=d[G]|0|L>>>4}}while(0);if((M&3|0)==0){i=e;return}M=c[j>>2]|0;j=a[M+53252|0]|0;if(j<<24>>24==0){i=e;return}S=((c[g>>2]|0)*456|0)+((j&255)<<1)|0;j=(c[(c[f+96>>2]|0)+20>>2]|0)+S|0;g=(c[f+100>>2]|0)+S|0;S=a[M+53275|0]|0;R=S&255;do{if((R&1|0)==0){if((R&2|0)!=0){T=(R&16|0)==0?0:48;break}if((R&4|0)!=0){T=(R&16|0)==0?15:0;break}if((R&8|0)==0){T=0;break}T=(R&16|0)==0?3:-16}else{T=(R&16|0)==0?0:-16}}while(0);R=a[f+72|0]&15;if((R|0)==15|(R|0)==3|(R|0)==2){U=(S&255)<64|0}else{U=0}R=(sc(0,a[(S&16)==0?M+53266|0:M+53273|0]|0,a[M+53260|0]|0,n,T,g,j,U)|0)&255;U=b+16|0;b=(c[U>>2]|0)+53248|0;a[b]=d[b]|0|R&15;b=(c[U>>2]|0)+53256|0;a[b]=d[b]|0|R>>>4;i=e;return}function rc(b,c,e,f,g,h,j,k,l){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;m=i;n=c&3;if((n|0)==1){c=l<<24>>24!=0;o=k<<24>>24==0;p=b&240;q=j;r=h;s=0;t=-128;while(1){if((t&e)<<24>>24==0){u=s}else{a:do{if(c){v=a[r]|0;if((v&l)<<24>>24==0){w=13;break}do{if(!o){if((v&2)==0){break}a[q]=d[q]|0|p;break a}}while(0);if(!((v&f)<<24>>24==0)){break}a[q]=a[q]|b}else{w=13}}while(0);b:do{if((w|0)==13){w=0;x=a[r]|0;do{if(!o){if((x&2)==0){break}a[q]=a[q]&15|p;break b}}while(0);if(!((x&f)<<24>>24==0)){break}a[q]=b}}while(0);c:do{if(c){v=a[r+1|0]|0;if((v&l)<<24>>24==0){w=25;break}do{if(!o){if((v&2)==0){break}y=q+1|0;a[y]=d[y]|0|p;break c}}while(0);if(!((v&f)<<24>>24==0)){break}x=q+1|0;a[x]=a[x]|b}else{w=25}}while(0);d:do{if((w|0)==25){w=0;x=a[r+1|0]|0;do{if(!o){if((x&2)==0){break}y=q+1|0;a[y]=a[y]&15|p;break d}}while(0);if(!((x&f)<<24>>24==0)){break}a[q+1|0]=b}}while(0);e:do{if(c){v=a[r+2|0]|0;if((v&l)<<24>>24==0){w=37;break}do{if(!o){if((v&2)==0){break}y=q+2|0;a[y]=d[y]|0|p;break e}}while(0);if(!((v&f)<<24>>24==0)){break}x=q+2|0;a[x]=a[x]|b}else{w=37}}while(0);f:do{if((w|0)==37){w=0;x=a[r+2|0]|0;do{if(!o){if((x&2)==0){break}y=q+2|0;a[y]=a[y]&15|p;break f}}while(0);if(!((x&f)<<24>>24==0)){break}a[q+2|0]=b}}while(0);g:do{if(c){v=a[r+3|0]|0;if((v&l)<<24>>24==0){w=49;break}do{if(!o){if((v&2)==0){break}y=q+3|0;a[y]=d[y]|0|p;break g}}while(0);if(!((v&f)<<24>>24==0)){break}x=q+3|0;a[x]=a[x]|b}else{w=49}}while(0);h:do{if((w|0)==49){w=0;x=a[r+3|0]|0;do{if(!o){if((x&2)==0){break}y=q+3|0;a[y]=a[y]&15|p;break h}}while(0);if(!((x&f)<<24>>24==0)){break}a[q+3|0]=b}}while(0);v=a[r]|g;a[r]=v;y=r+1|0;z=a[y]|0;a[y]=z|g;y=r+2|0;A=a[y]|g;a[y]=A;y=r+3|0;B=a[y]|0;a[y]=B|g;u=z|(B|(v|s))|A}A=(t&255)>>>1;if(A<<24>>24==0){C=u;break}else{q=q+4|0;r=r+4|0;s=u;t=A}}}else if((n|0)==3){n=l<<24>>24!=0;t=k<<24>>24==0;u=b&240;s=j;r=h;q=0;p=-128;while(1){if((p&e)<<24>>24==0){D=q}else{i:do{if(n){o=a[r]|0;if((o&l)<<24>>24==0){w=64;break}do{if(!t){if((o&2)==0){break}a[s]=d[s]|0|u;break i}}while(0);if(!((o&f)<<24>>24==0)){break}a[s]=a[s]|b}else{w=64}}while(0);j:do{if((w|0)==64){w=0;x=a[r]|0;do{if(!t){if((x&2)==0){break}a[s]=a[s]&15|u;break j}}while(0);if(!((x&f)<<24>>24==0)){break}a[s]=b}}while(0);k:do{if(n){o=a[r+1|0]|0;if((o&l)<<24>>24==0){w=76;break}do{if(!t){if((o&2)==0){break}c=s+1|0;a[c]=d[c]|0|u;break k}}while(0);if(!((o&f)<<24>>24==0)){break}x=s+1|0;a[x]=a[x]|b}else{w=76}}while(0);l:do{if((w|0)==76){w=0;x=a[r+1|0]|0;do{if(!t){if((x&2)==0){break}c=s+1|0;a[c]=a[c]&15|u;break l}}while(0);if(!((x&f)<<24>>24==0)){break}a[s+1|0]=b}}while(0);m:do{if(n){o=a[r+2|0]|0;if((o&l)<<24>>24==0){w=88;break}do{if(!t){if((o&2)==0){break}c=s+2|0;a[c]=d[c]|0|u;break m}}while(0);if(!((o&f)<<24>>24==0)){break}x=s+2|0;a[x]=a[x]|b}else{w=88}}while(0);n:do{if((w|0)==88){w=0;x=a[r+2|0]|0;do{if(!t){if((x&2)==0){break}c=s+2|0;a[c]=a[c]&15|u;break n}}while(0);if(!((x&f)<<24>>24==0)){break}a[s+2|0]=b}}while(0);o:do{if(n){o=a[r+3|0]|0;if((o&l)<<24>>24==0){w=100;break}do{if(!t){if((o&2)==0){break}c=s+3|0;a[c]=d[c]|0|u;break o}}while(0);if(!((o&f)<<24>>24==0)){break}x=s+3|0;a[x]=a[x]|b}else{w=100}}while(0);p:do{if((w|0)==100){w=0;x=a[r+3|0]|0;do{if(!t){if((x&2)==0){break}c=s+3|0;a[c]=a[c]&15|u;break p}}while(0);if(!((x&f)<<24>>24==0)){break}a[s+3|0]=b}}while(0);q:do{if(n){o=a[r+4|0]|0;if((o&l)<<24>>24==0){w=112;break}do{if(!t){if((o&2)==0){break}c=s+4|0;a[c]=d[c]|0|u;break q}}while(0);if(!((o&f)<<24>>24==0)){break}x=s+4|0;a[x]=a[x]|b}else{w=112}}while(0);r:do{if((w|0)==112){w=0;x=a[r+4|0]|0;do{if(!t){if((x&2)==0){break}c=s+4|0;a[c]=a[c]&15|u;break r}}while(0);if(!((x&f)<<24>>24==0)){break}a[s+4|0]=b}}while(0);s:do{if(n){o=a[r+5|0]|0;if((o&l)<<24>>24==0){w=124;break}do{if(!t){if((o&2)==0){break}c=s+5|0;a[c]=d[c]|0|u;break s}}while(0);if(!((o&f)<<24>>24==0)){break}x=s+5|0;a[x]=a[x]|b}else{w=124}}while(0);t:do{if((w|0)==124){w=0;x=a[r+5|0]|0;do{if(!t){if((x&2)==0){break}c=s+5|0;a[c]=a[c]&15|u;break t}}while(0);if(!((x&f)<<24>>24==0)){break}a[s+5|0]=b}}while(0);u:do{if(n){o=a[r+6|0]|0;if((o&l)<<24>>24==0){w=136;break}do{if(!t){if((o&2)==0){break}c=s+6|0;a[c]=d[c]|0|u;break u}}while(0);if(!((o&f)<<24>>24==0)){break}x=s+6|0;a[x]=a[x]|b}else{w=136}}while(0);v:do{if((w|0)==136){w=0;x=a[r+6|0]|0;do{if(!t){if((x&2)==0){break}c=s+6|0;a[c]=a[c]&15|u;break v}}while(0);if(!((x&f)<<24>>24==0)){break}a[s+6|0]=b}}while(0);w:do{if(n){o=a[r+7|0]|0;if((o&l)<<24>>24==0){w=148;break}do{if(!t){if((o&2)==0){break}c=s+7|0;a[c]=d[c]|0|u;break w}}while(0);if(!((o&f)<<24>>24==0)){break}x=s+7|0;a[x]=a[x]|b}else{w=148}}while(0);x:do{if((w|0)==148){w=0;x=a[r+7|0]|0;do{if(!t){if((x&2)==0){break}c=s+7|0;a[c]=a[c]&15|u;break x}}while(0);if(!((x&f)<<24>>24==0)){break}a[s+7|0]=b}}while(0);o=a[r]|g;a[r]=o;c=r+1|0;A=a[c]|0;a[c]=A|g;c=r+2|0;v=a[c]|g;a[c]=v;c=r+3|0;B=a[c]|0;a[c]=B|g;c=r+4|0;z=a[c]|0;a[c]=z|g;c=r+5|0;y=a[c]|g;a[c]=y;c=r+6|0;E=a[c]|0;a[c]=E|g;c=r+7|0;F=a[c]|0;a[c]=F|g;D=E|(z|(B|(A|(F|(o|q))|v))|y)}y=(p&255)>>>1;if(y<<24>>24==0){C=D;break}else{s=s+8|0;r=r+8|0;q=D;p=y}}}else{p=l<<24>>24!=0;D=k<<24>>24==0;q=b&240;r=j;j=h;h=0;s=-128;while(1){if((s&e)<<24>>24==0){G=h}else{y:do{if(p){u=a[j]|0;if((u&l)<<24>>24==0){w=163;break}do{if(!D){if((u&2)==0){break}a[r]=d[r]|0|q;break y}}while(0);if(!((u&f)<<24>>24==0)){break}a[r]=a[r]|b}else{w=163}}while(0);z:do{if((w|0)==163){w=0;x=a[j]|0;do{if(!D){if((x&2)==0){break}a[r]=a[r]&15|q;break z}}while(0);if(!((x&f)<<24>>24==0)){break}a[r]=b}}while(0);A:do{if(p){u=a[j+1|0]|0;if((u&l)<<24>>24==0){w=175;break}do{if(!D){if((u&2)==0){break}t=r+1|0;a[t]=d[t]|0|q;break A}}while(0);if(!((u&f)<<24>>24==0)){break}x=r+1|0;a[x]=a[x]|b}else{w=175}}while(0);B:do{if((w|0)==175){w=0;x=a[j+1|0]|0;do{if(!D){if((x&2)==0){break}t=r+1|0;a[t]=a[t]&15|q;break B}}while(0);if(!((x&f)<<24>>24==0)){break}a[r+1|0]=b}}while(0);u=a[j]|g;a[j]=u;t=j+1|0;n=a[t]|0;a[t]=n|g;G=n|(u|h)}u=(s&255)>>>1;if(u<<24>>24==0){C=G;break}else{r=r+2|0;j=j+2|0;h=G;s=u}}}if(k<<24>>24==0){H=C;i=m;return H|0}k=C&255;H=(k<<1&4|k&249)&255;i=m;return H|0}function sc(b,c,d,e,f,g,h,j){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;k=i;l=(b&255)<<1&254;b=2<<l;m=3<<l;n=m&(d&255);do{if((n|0)==(1<<l|0)){d=e&255;if((b&d|0)==0){o=0}else{p=j<<24>>24!=0;q=a[g]|0;do{if(p){if((q&2)==0){r=6;break}a[h]=a[h]&15|c&240;r=10}else{r=6}}while(0);do{if((r|0)==6){if((q&f)<<24>>24==0){a[h]=c}if(p){r=10;break}s=a[g+1|0]|0;r=12}}while(0);do{if((r|0)==10){q=a[g+1|0]|0;if((q&2)==0){s=q;r=12;break}q=h+1|0;a[q]=a[q]&15|c&240}}while(0);do{if((r|0)==12){if(!((s&f)<<24>>24==0)){break}a[h+1|0]=c}}while(0);q=a[g+2|0]|0;do{if(p){if((q&2)==0){r=17;break}t=h+2|0;a[t]=a[t]&15|c&240;r=21}else{r=17}}while(0);do{if((r|0)==17){if((q&f)<<24>>24==0){a[h+2|0]=c}if(p){r=21;break}u=a[g+3|0]|0;r=23}}while(0);do{if((r|0)==21){p=a[g+3|0]|0;if((p&2)==0){u=p;r=23;break}p=h+3|0;a[p]=a[p]&15|c&240}}while(0);do{if((r|0)==23){if(!((u&f)<<24>>24==0)){break}a[h+3|0]=c}}while(0);o=a[g+1|0]|a[g]|a[g+2|0]|a[g+3|0]}if((b>>>1&127&d|0)==0){v=o;break}p=j<<24>>24!=0;q=a[g+4|0]|0;do{if(p){if((q&2)==0){r=30;break}t=h+4|0;a[t]=a[t]&15|c&240;r=34}else{r=30}}while(0);do{if((r|0)==30){if((q&f)<<24>>24==0){a[h+4|0]=c}if(p){r=34;break}w=a[g+5|0]|0;r=36}}while(0);do{if((r|0)==34){q=a[g+5|0]|0;if((q&2)==0){w=q;r=36;break}q=h+5|0;a[q]=a[q]&15|c&240}}while(0);do{if((r|0)==36){if(!((w&f)<<24>>24==0)){break}a[h+5|0]=c}}while(0);q=a[g+6|0]|0;do{if(p){if((q&2)==0){r=41;break}d=h+6|0;a[d]=a[d]&15|c&240;r=45}else{r=41}}while(0);do{if((r|0)==41){if((q&f)<<24>>24==0){a[h+6|0]=c}if(p){r=45;break}x=a[g+7|0]|0;r=47}}while(0);do{if((r|0)==45){p=a[g+7|0]|0;if((p&2)==0){x=p;r=47;break}p=h+7|0;a[p]=a[p]&15|c&240}}while(0);do{if((r|0)==47){if(!((x&f)<<24>>24==0)){break}a[h+7|0]=c}}while(0);v=a[g+4|0]|o|a[g+5|0]|a[g+6|0]|a[g+7|0]}else{p=e&255;q=b&255;d=(b&p|0)!=0;if((n|0)!=(m|0)){if(d){t=j<<24>>24!=0;y=a[g]|0;do{if(t){if((y&2)==0){r=147;break}a[h]=a[h]&15|c&240;r=151}else{r=147}}while(0);do{if((r|0)==147){if((y&f)<<24>>24==0){a[h]=c}if(t){r=151;break}z=a[g+1|0]|0;r=153}}while(0);do{if((r|0)==151){t=a[g+1|0]|0;if((t&2)==0){z=t;r=153;break}t=h+1|0;a[t]=a[t]&15|c&240}}while(0);do{if((r|0)==153){if(!((z&f)<<24>>24==0)){break}a[h+1|0]=c}}while(0);A=a[g+1|0]|a[g]}else{A=0}if((q>>>1&p|0)==0){v=A;break}t=j<<24>>24!=0;y=a[g+2|0]|0;do{if(t){if((y&2)==0){r=160;break}B=h+2|0;a[B]=a[B]&15|c&240;r=164}else{r=160}}while(0);do{if((r|0)==160){if((y&f)<<24>>24==0){a[h+2|0]=c}if(t){r=164;break}C=a[g+3|0]|0;r=166}}while(0);do{if((r|0)==164){t=a[g+3|0]|0;if((t&2)==0){C=t;r=166;break}t=h+3|0;a[t]=a[t]&15|c&240}}while(0);do{if((r|0)==166){if(!((C&f)<<24>>24==0)){break}a[h+3|0]=c}}while(0);v=a[g+2|0]|A|a[g+3|0];break}if(d){t=j<<24>>24!=0;y=a[g]|0;do{if(t){if((y&2)==0){r=55;break}a[h]=a[h]&15|c&240;r=59}else{r=55}}while(0);do{if((r|0)==55){if((y&f)<<24>>24==0){a[h]=c}if(t){r=59;break}D=a[g+1|0]|0;r=61}}while(0);do{if((r|0)==59){y=a[g+1|0]|0;if((y&2)==0){D=y;r=61;break}y=h+1|0;a[y]=a[y]&15|c&240}}while(0);do{if((r|0)==61){if(!((D&f)<<24>>24==0)){break}a[h+1|0]=c}}while(0);y=a[g+2|0]|0;do{if(t){if((y&2)==0){r=66;break}d=h+2|0;a[d]=a[d]&15|c&240;r=70}else{r=66}}while(0);do{if((r|0)==66){if((y&f)<<24>>24==0){a[h+2|0]=c}if(t){r=70;break}E=a[g+3|0]|0;r=72}}while(0);do{if((r|0)==70){y=a[g+3|0]|0;if((y&2)==0){E=y;r=72;break}y=h+3|0;a[y]=a[y]&15|c&240}}while(0);do{if((r|0)==72){if(!((E&f)<<24>>24==0)){break}a[h+3|0]=c}}while(0);y=a[g+4|0]|0;do{if(t){if((y&2)==0){r=77;break}d=h+4|0;a[d]=a[d]&15|c&240;r=81}else{r=77}}while(0);do{if((r|0)==77){if((y&f)<<24>>24==0){a[h+4|0]=c}if(t){r=81;break}F=a[g+5|0]|0;r=83}}while(0);do{if((r|0)==81){y=a[g+5|0]|0;if((y&2)==0){F=y;r=83;break}y=h+5|0;a[y]=a[y]&15|c&240}}while(0);do{if((r|0)==83){if(!((F&f)<<24>>24==0)){break}a[h+5|0]=c}}while(0);y=a[g+6|0]|0;do{if(t){if((y&2)==0){r=88;break}d=h+6|0;a[d]=a[d]&15|c&240;r=92}else{r=88}}while(0);do{if((r|0)==88){if((y&f)<<24>>24==0){a[h+6|0]=c}if(t){r=92;break}G=a[g+7|0]|0;r=94}}while(0);do{if((r|0)==92){t=a[g+7|0]|0;if((t&2)==0){G=t;r=94;break}t=h+7|0;a[t]=a[t]&15|c&240}}while(0);do{if((r|0)==94){if(!((G&f)<<24>>24==0)){break}a[h+7|0]=c}}while(0);H=a[g+1|0]|a[g]|a[g+2|0]|a[g+3|0]|a[g+4|0]|a[g+5|0]|a[g+6|0]|a[g+7|0]}else{H=0}if((q>>>1&p|0)==0){v=H;break}t=j<<24>>24!=0;y=a[g+8|0]|0;do{if(t){if((y&2)==0){r=101;break}d=h+8|0;a[d]=a[d]&15|c&240;r=105}else{r=101}}while(0);do{if((r|0)==101){if((y&f)<<24>>24==0){a[h+8|0]=c}if(t){r=105;break}I=a[g+9|0]|0;r=107}}while(0);do{if((r|0)==105){y=a[g+9|0]|0;if((y&2)==0){I=y;r=107;break}y=h+9|0;a[y]=a[y]&15|c&240}}while(0);do{if((r|0)==107){if(!((I&f)<<24>>24==0)){break}a[h+9|0]=c}}while(0);y=a[g+10|0]|0;do{if(t){if((y&2)==0){r=112;break}p=h+10|0;a[p]=a[p]&15|c&240;r=116}else{r=112}}while(0);do{if((r|0)==112){if((y&f)<<24>>24==0){a[h+10|0]=c}if(t){r=116;break}J=a[g+11|0]|0;r=118}}while(0);do{if((r|0)==116){y=a[g+11|0]|0;if((y&2)==0){J=y;r=118;break}y=h+11|0;a[y]=a[y]&15|c&240}}while(0);do{if((r|0)==118){if(!((J&f)<<24>>24==0)){break}a[h+11|0]=c}}while(0);y=a[g+12|0]|0;do{if(t){if((y&2)==0){r=123;break}p=h+12|0;a[p]=a[p]&15|c&240;r=127}else{r=123}}while(0);do{if((r|0)==123){if((y&f)<<24>>24==0){a[h+12|0]=c}if(t){r=127;break}K=a[g+13|0]|0;r=129}}while(0);do{if((r|0)==127){y=a[g+13|0]|0;if((y&2)==0){K=y;r=129;break}y=h+13|0;a[y]=a[y]&15|c&240}}while(0);do{if((r|0)==129){if(!((K&f)<<24>>24==0)){break}a[h+13|0]=c}}while(0);y=a[g+14|0]|0;do{if(t){if((y&2)==0){r=134;break}p=h+14|0;a[p]=a[p]&15|c&240;r=138}else{r=134}}while(0);do{if((r|0)==134){if((y&f)<<24>>24==0){a[h+14|0]=c}if(t){r=138;break}L=a[g+15|0]|0;r=140}}while(0);do{if((r|0)==138){t=a[g+15|0]|0;if((t&2)==0){L=t;r=140;break}t=h+15|0;a[t]=a[t]&15|c&240}}while(0);do{if((r|0)==140){if(!((L&f)<<24>>24==0)){break}a[h+15|0]=c}}while(0);v=a[g+8|0]|H|a[g+9|0]|a[g+10|0]|a[g+11|0]|a[g+12|0]|a[g+13|0]|a[g+14|0]|a[g+15|0]}}while(0);if(j<<24>>24==0){M=v;i=k;return M|0}j=v&255;M=(j<<1&4|j&249)&255;i=k;return M|0}function tc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f;h=c[a+72>>2]|0;c[g>>2]=256-(d>>>1);c[g+4>>2]=8;c[g+8>>2]=d;c[g+12>>2]=e;Sb(c[h+96>>2]|0,g|0,b|0,0)|0;i=f;return}function uc(d,f,g){d=d|0;f=f|0;g=g|0;var j=0,k=0,l=0.0,m=0.0,n=0.0,o=0,p=0,q=0.0,r=0.0,s=0.0,t=0.0,u=0.0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;j=i;if((f&1|0)!=0){a[7872]=7}f=Xa(0,456,312,8,255,65280,16711680,-16777216)|0;if((f|0)==0){va(2736)|0;cb(-1)}else{k=0}do{l=+(k>>>0);m=l/15.0;n=(l+.9)/15.9;o=0;do{p=(o|0)==0;l=p?m:n;q=p?0.0:.5;r=+h[2592+(o<<3)>>3]/180.0*3.141592653589793;s=+T(+r);t=+S(+r);r=l-q*.5094339622641509*s-q*.18867924528301888*t;u=l+q*t;t=(l+q*s)*256.0;do{if(t>255.0){v=-1}else{p=t<0.0;if(p){v=(p^1)<<31>>31;break}v=~~t&255}}while(0);p=(o<<4)+k|0;a[992+(p<<2)|0]=v;t=r*256.0;do{if(t>255.0){w=-1}else{x=t<0.0;if(x){w=(x^1)<<31>>31;break}w=~~t&255}}while(0);a[993+(p<<2)|0]=w;t=u*256.0;do{if(t>255.0){y=-1}else{x=t<0.0;if(x){y=(x^1)<<31>>31;break}y=~~t&255}}while(0);a[994+(p<<2)|0]=y;o=o+1|0;}while((o|0)!=16);k=k+1|0;}while((k|0)!=16);Pa(f|0,3,992,0,256)|0;k=Nf(152)|0;y=d+72|0;c[y>>2]=k;Sf(k|0,0,152)|0;w=k+132|0;c[w>>2]=Nf(8192)|0;v=k+136|0;c[v>>2]=Nf(4096)|0;o=k+140|0;c[o>>2]=Nf(2048)|0;x=k+144|0;c[x>>2]=Nf(10240)|0;z=wb(2016,2040)|0;ka(c[w>>2]|0,8192,1,z|0)|0;A=d+16|0;Vf((c[A>>2]|0)+40960|0,c[w>>2]|0,8192)|0;ob(z|0)|0;z=wb(2048,2040)|0;ka(c[v>>2]|0,4096,1,z|0)|0;Vf((c[A>>2]|0)+49152|0,c[v>>2]|0,4096)|0;ka(c[o>>2]|0,2048,1,z|0)|0;ka(c[x>>2]|0,10240,1,z|0)|0;Vf((c[A>>2]|0)+55296|0,c[x>>2]|0,10240)|0;ob(z|0)|0;We(d,-24576,-16385);We(d,-16384,-12289);We(d,-12288,-10241);We(d,-10240,-1);z=k;c[z>>2]=130;c[z+4>>2]=0;z=k+8|0;c[z>>2]=114;c[z+4>>2]=0;z=k+16|0;x=z+56|0;do{c[z>>2]=-1;z=z+4|0}while((z|0)<(x|0));z=c[y>>2]|0;y=d+56|0;x=y;c[x>>2]=-1;c[x+4>>2]=-1;x=z;o=c[x>>2]|0;v=c[x+4>>2]|0;x=y;c[x>>2]=o;c[x+4>>2]=v;x=z+8|0;w=c[x>>2]|0;B=c[x+4>>2]|0;x=B>>>0<v>>>0|(B|0)==(v|0)&w>>>0<o>>>0;C=x?w:o;o=x?B:v;v=y;c[v>>2]=C;c[v+4>>2]=o;v=z+16|0;B=c[v>>2]|0;x=c[v+4>>2]|0;v=x>>>0<o>>>0|(x|0)==(o|0)&B>>>0<C>>>0;w=v?B:C;C=v?x:o;o=y;c[o>>2]=w;c[o+4>>2]=C;o=z+32|0;x=c[o>>2]|0;v=c[o+4>>2]|0;o=v>>>0<C>>>0|(v|0)==(C|0)&x>>>0<w>>>0;B=o?x:w;w=o?v:C;C=y;c[C>>2]=B;c[C+4>>2]=w;C=z+24|0;v=c[C>>2]|0;o=c[C+4>>2]|0;C=o>>>0<w>>>0|(o|0)==(w|0)&v>>>0<B>>>0;x=C?v:B;B=C?o:w;w=y;c[w>>2]=x;c[w+4>>2]=B;w=z+40|0;o=c[w>>2]|0;C=c[w+4>>2]|0;w=C>>>0<B>>>0|(C|0)==(B|0)&o>>>0<x>>>0;v=w?o:x;x=w?C:B;B=y;c[B>>2]=v;c[B+4>>2]=x;B=z+48|0;C=c[B>>2]|0;w=c[B+4>>2]|0;B=w>>>0<x>>>0|(w|0)==(x|0)&C>>>0<v>>>0;o=B?C:v;v=B?w:x;x=y;c[x>>2]=o;c[x+4>>2]=v;x=z+56|0;w=c[x>>2]|0;B=c[x+4>>2]|0;x=B>>>0<v>>>0|(B|0)==(v|0)&w>>>0<o>>>0;C=x?w:o;o=x?B:v;v=y;c[v>>2]=C;c[v+4>>2]=o;v=z+64|0;z=c[v>>2]|0;B=c[v+4>>2]|0;v=B>>>0<o>>>0|(B|0)==(o|0)&z>>>0<C>>>0;x=y;c[x>>2]=v?z:C;c[x+4>>2]=v?B:o;c[k+96>>2]=f;f=d+20|0;o=-12288;B=464;do{a[(c[f>>2]|0)+(o&65535)|0]=a[B+2|0]|0;a[(c[A>>2]|0)+(e[B>>1]|0)|0]=a[B+3|0]|0;Ze(d,b[B>>1]|0,c[B+4>>2]|0);B=B+8|0;o=b[B>>1]|0;}while(!(o<<16>>16==0));o=Nf(1048576)|0;B=k+124|0;c[B>>2]=o;Sf(o|0,0,1048576)|0;do{if((g|0)!=0){o=wb(g|0,2040)|0;if((o|0)==0){break}c[k+128>>2]=ka(c[B>>2]|0,1,1048576,o|0)|0;ob(o|0)|0}}while(0);B=Nf(142272)|0;c[k+100>>2]=B;if((B|0)==0){i=j;return}Sf(B|0,0,142272)|0;c[d+64>>2]=97;Na($a(0)|0);i=j;return}function vc(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0;e=i;f=b+72|0;g=c[f>>2]|0;h=b+40|0;j=h;k=c[j>>2]|0;l=c[j+4>>2]|0;j=g+8|0;m=j;n=c[m+4>>2]|0;if(l>>>0<n>>>0|(l|0)==(n|0)&k>>>0<(c[m>>2]|0)>>>0){o=k;p=l}else{l=g+92|0;k=(c[l>>2]|0)+1|0;c[l>>2]=k;if(k>>>0>311){c[l>>2]=0;c[g+76>>2]=8;q=0}else{q=k}a[(c[b+16>>2]|0)+54283|0]=q>>>1;nc(b);q=j;k=Uf(c[q>>2]|0,c[q+4>>2]|0,114,0)|0;q=j;c[q>>2]=k;c[q+4>>2]=E;q=h;o=c[q>>2]|0;p=c[q+4>>2]|0}q=g+16|0;k=q;j=c[k+4>>2]|0;if(p>>>0<j>>>0|(p|0)==(j|0)&o>>>0<(c[k>>2]|0)>>>0){r=o;s=p}else{if((a[(c[b+20>>2]|0)+54286|0]|0)<0){p=(c[b+16>>2]|0)+54287|0;a[p]=d[p]|128;bf(b)}p=q;c[p>>2]=-1;c[p+4>>2]=-1;p=h;r=c[p>>2]|0;s=c[p+4>>2]|0}p=g;q=p;o=c[q+4>>2]|0;if(s>>>0<o>>>0|(s|0)==(o|0)&r>>>0<(c[q>>2]|0)>>>0){t=r;u=s}else{if((c[g+92>>2]|0)==0){Sf(c[g+100>>2]|0,0,142272)|0}pc(b);qc(b);s=p;r=Uf(c[s>>2]|0,c[s+4>>2]|0,114,0)|0;s=p;c[s>>2]=r;c[s+4>>2]=E;s=h;t=c[s>>2]|0;u=c[s+4>>2]|0}s=g+32|0;r=s;p=c[r+4>>2]|0;if(u>>>0<p>>>0|(u|0)==(p|0)&t>>>0<(c[r>>2]|0)>>>0){v=t;w=u}else{if(!((a[(c[b+20>>2]|0)+53774|0]&8)==0)){u=(c[b+16>>2]|0)+53774|0;a[u]=a[u]&247;df(b)}u=s;c[u>>2]=-1;c[u+4>>2]=-1;u=h;v=c[u>>2]|0;w=c[u+4>>2]|0}u=g+24|0;s=u;t=c[s+4>>2]|0;if(w>>>0<t>>>0|(w|0)==(t|0)&v>>>0<(c[s>>2]|0)>>>0){x=v;y=w}else{if(!((a[(c[b+20>>2]|0)+53774|0]&16)==0)){w=(c[b+16>>2]|0)+53774|0;a[w]=a[w]&239;df(b)}w=u;c[w>>2]=-1;c[w+4>>2]=-1;w=h;x=c[w>>2]|0;y=c[w+4>>2]|0}w=g+40|0;u=w;v=c[u+4>>2]|0;if(y>>>0<v>>>0|(y|0)==(v|0)&x>>>0<(c[u>>2]|0)>>>0){z=x;A=y}else{if(!((a[(c[b+20>>2]|0)+53774|0]&32)==0)){y=(c[b+16>>2]|0)+53774|0;a[y]=a[y]&223;df(b)}y=w;c[y>>2]=-1;c[y+4>>2]=-1;y=h;z=c[y>>2]|0;A=c[y+4>>2]|0}y=g+48|0;w=y;x=c[w+4>>2]|0;if(A>>>0<x>>>0|(A|0)==(x|0)&z>>>0<(c[w>>2]|0)>>>0){B=z;C=A}else{if(!((a[(c[b+20>>2]|0)+53774|0]&1)==0)){A=(c[b+16>>2]|0)+53774|0;a[A]=a[A]&254;df(b)}A=y;c[A>>2]=-1;c[A+4>>2]=-1;A=h;B=c[A>>2]|0;C=c[A+4>>2]|0}A=g+56|0;y=A;z=c[y+4>>2]|0;if(C>>>0<z>>>0|(C|0)==(z|0)&B>>>0<(c[y>>2]|0)>>>0){D=B;F=C}else{if(!((a[(c[b+20>>2]|0)+53774|0]&2)==0)){C=(c[b+16>>2]|0)+53774|0;a[C]=a[C]&253;df(b)}C=A;c[C>>2]=-1;c[C+4>>2]=-1;C=h;D=c[C>>2]|0;F=c[C+4>>2]|0}C=g+64|0;g=C;h=c[g+4>>2]|0;if(!(F>>>0<h>>>0|(F|0)==(h|0)&D>>>0<(c[g>>2]|0)>>>0)){if(!((a[(c[b+20>>2]|0)+53774|0]&4)==0)){g=(c[b+16>>2]|0)+53774|0;a[g]=a[g]&251;df(b)}g=C;c[g>>2]=-1;c[g+4>>2]=-1}g=c[f>>2]|0;f=b+56|0;b=f;c[b>>2]=-1;c[b+4>>2]=-1;b=g;C=c[b>>2]|0;D=c[b+4>>2]|0;b=f;c[b>>2]=C;c[b+4>>2]=D;b=g+8|0;h=c[b>>2]|0;F=c[b+4>>2]|0;b=F>>>0<D>>>0|(F|0)==(D|0)&h>>>0<C>>>0;A=b?h:C;C=b?F:D;D=f;c[D>>2]=A;c[D+4>>2]=C;D=g+16|0;F=c[D>>2]|0;b=c[D+4>>2]|0;D=b>>>0<C>>>0|(b|0)==(C|0)&F>>>0<A>>>0;h=D?F:A;A=D?b:C;C=f;c[C>>2]=h;c[C+4>>2]=A;C=g+32|0;b=c[C>>2]|0;D=c[C+4>>2]|0;C=D>>>0<A>>>0|(D|0)==(A|0)&b>>>0<h>>>0;F=C?b:h;h=C?D:A;A=f;c[A>>2]=F;c[A+4>>2]=h;A=g+24|0;D=c[A>>2]|0;C=c[A+4>>2]|0;A=C>>>0<h>>>0|(C|0)==(h|0)&D>>>0<F>>>0;b=A?D:F;F=A?C:h;h=f;c[h>>2]=b;c[h+4>>2]=F;h=g+40|0;C=c[h>>2]|0;A=c[h+4>>2]|0;h=A>>>0<F>>>0|(A|0)==(F|0)&C>>>0<b>>>0;D=h?C:b;b=h?A:F;F=f;c[F>>2]=D;c[F+4>>2]=b;F=g+48|0;A=c[F>>2]|0;h=c[F+4>>2]|0;F=h>>>0<b>>>0|(h|0)==(b|0)&A>>>0<D>>>0;C=F?A:D;D=F?h:b;b=f;c[b>>2]=C;c[b+4>>2]=D;b=g+56|0;h=c[b>>2]|0;F=c[b+4>>2]|0;b=F>>>0<D>>>0|(F|0)==(D|0)&h>>>0<C>>>0;A=b?h:C;C=b?F:D;D=f;c[D>>2]=A;c[D+4>>2]=C;D=g+64|0;g=c[D>>2]|0;F=c[D+4>>2]|0;D=F>>>0<C>>>0|(F|0)==(C|0)&g>>>0<A>>>0;b=f;c[b>>2]=D?g:A;c[b+4>>2]=D?F:C;i=e;return}function wc(a){a=a|0;var b=0,d=0;b=i;d=c[a+72>>2]|0;lb(c[d+96>>2]|0);Of(c[d+100>>2]|0);Of(c[d+124>>2]|0);Of(c[d+132>>2]|0);Of(c[d+136>>2]|0);Of(c[d+140>>2]|0);Of(c[d+144>>2]|0);i=b;return}function xc(e,f){e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;h=c[e+72>>2]|0;j=c[f>>2]|0;if((j|0)==768){k=c[f+16>>2]|0;switch(k|0){case 1106:{l=(c[e+16>>2]|0)+54016|0;a[l]=a[l]&254;i=g;return};case 1105:{l=(c[e+16>>2]|0)+54016|0;a[l]=a[l]&253;i=g;return};case 1104:{l=(c[e+16>>2]|0)+54016|0;a[l]=a[l]&251;i=g;return};case 1103:{l=(c[e+16>>2]|0)+54016|0;a[l]=a[l]&247;i=g;return};case 1253:case 1249:{l=(c[e+16>>2]|0)+53775|0;a[l]=a[l]&247;i=g;return};case 1092:{l=wb(2072,2040)|0;if((l|0)==0){i=g;return}c[h+128>>2]=ka(c[h+124>>2]|0,1,1048576,l|0)|0;ob(l|0)|0;i=g;return};case 1089:{if((a[(c[e+20>>2]|0)+53774|0]|0)>=0){i=g;return}l=(c[e+16>>2]|0)+53774|0;a[l]=a[l]&127;df(e);i=g;return};case 1086:{cf(e);i=g;return};case 1085:{l=(c[e+16>>2]|0)+53279|0;a[l]=a[l]&254;i=g;return};case 1084:{l=(c[e+16>>2]|0)+53279|0;a[l]=a[l]&253;i=g;return};case 1250:{a[(c[e+16>>2]|0)+53264|0]=0;i=g;return};case 1083:{l=(c[e+16>>2]|0)+53279|0;a[l]=a[l]&251;i=g;return};default:{l=a[2080+k|0]|0;if(l<<24>>24==-1){i=g;return}k=b[f+20>>1]|0;if((k&192)==0){m=l}else{m=(l&255|128)&255}if((k&3)==0){n=m}else{n=(m&255|64)&255}m=e+16|0;a[(c[m>>2]|0)+53769|0]=n;if(!((a[(c[e+20>>2]|0)+53774|0]&64)==0)){n=(c[m>>2]|0)+53774|0;a[n]=a[n]&191;df(e)}n=h+120|0;c[n>>2]=(c[n>>2]|0)+1;n=(c[m>>2]|0)+53775|0;a[n]=a[n]&251;i=g;return}}}else if((j|0)==769){j=c[f+16>>2]|0;switch(j|0){case 1253:case 1249:{f=(c[e+16>>2]|0)+53775|0;a[f]=d[f]|8;i=g;return};case 1085:{f=(c[e+16>>2]|0)+53279|0;a[f]=d[f]|1;i=g;return};case 1084:{f=(c[e+16>>2]|0)+53279|0;a[f]=d[f]|2;i=g;return};case 1083:{f=(c[e+16>>2]|0)+53279|0;a[f]=d[f]|4;i=g;return};case 1250:{a[(c[e+16>>2]|0)+53264|0]=1;i=g;return};case 1103:{f=(c[e+16>>2]|0)+54016|0;a[f]=d[f]|8;i=g;return};case 1104:{f=(c[e+16>>2]|0)+54016|0;a[f]=d[f]|4;i=g;return};case 1105:{f=(c[e+16>>2]|0)+54016|0;a[f]=d[f]|2;i=g;return};case 1106:{f=(c[e+16>>2]|0)+54016|0;a[f]=d[f]|1;i=g;return};default:{if((a[2080+j|0]|0)==-1){i=g;return}j=h+120|0;h=c[j>>2]|0;do{if((h|0)!=0){f=h+ -1|0;c[j>>2]=f;if((f|0)==0){break}i=g;return}}while(0);j=(c[e+16>>2]|0)+53775|0;a[j]=d[j]|4;i=g;return}}}else{i=g;return}}function yc(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;g=i;i=i+16|0;h=g;j=c[f+72>>2]|0;k=c[j+76>>2]|0;l=c[j+92>>2]|0;m=8-k+l-(c[j+88>>2]|0)|0;n=f+20|0;o=c[n>>2]|0;a[h]=a[o+53266|0]|0;a[h+1|0]=a[o+53267|0]|0;a[h+2|0]=a[o+53268|0]|0;a[h+3|0]=a[o+53269|0]|0;p=a[o+53270|0]|0;a[h+4|0]=p;q=a[o+53271|0]|0;a[h+5|0]=q;r=a[o+53272|0]|0;a[h+6|0]=r;s=a[o+53273|0]|0;a[h+7|0]=s;Sf(h+8|0,a[o+53274|0]|0,4)|0;a[h+12|0]=p;a[h+13|0]=q;a[h+14|0]=r;a[h+15|0]=s;if((k-l|0)==1){l=j+82|0;k=e[l>>1]|0;b[l>>1]=k+(c[j+116>>2]|0)&4095|k&61440}k=(d[o+53275|0]|0)>>>6;if((k|0)==3){o=j+116|0;l=c[o>>2]|0;c[o>>2]=l+ -1;if((l|0)==0){i=g;return}l=j+112|0;s=f+16|0;r=j+104|0;do{q=e[l>>1]|0;p=c[s>>2]|0;t=a[p+q|0]|0;b[l>>1]=q+1&4095|q&61440;q=t&255;if((q&128|0)==0){u=t}else{u=q&127}q=c[n>>2]|0;t=d[p+(((u&255)<<3)+m+((d[q+54281|0]|0)<<8&64512))|0]|0;p=t&240;v=d[q+53274|0]|0;q=((p|0)==0?v&240:v|p)&255;p=c[r>>2]|0;c[r>>2]=p+1;a[p]=q;p=c[r>>2]|0;c[r>>2]=p+1;a[p]=q;p=c[r>>2]|0;c[r>>2]=p+1;a[p]=q;p=c[r>>2]|0;c[r>>2]=p+1;a[p]=q;q=d[(c[n>>2]|0)+53274|0]|0;if((t&15|0)==0){w=q&240}else{w=q|t<<4}t=w&255;q=c[r>>2]|0;c[r>>2]=q+1;a[q]=t;q=c[r>>2]|0;c[r>>2]=q+1;a[q]=t;q=c[r>>2]|0;c[r>>2]=q+1;a[q]=t;q=c[r>>2]|0;c[r>>2]=q+1;a[q]=t;t=c[o>>2]|0;c[o>>2]=t+ -1;}while((t|0)!=0);i=g;return}else if((k|0)==2){o=j+116|0;r=c[o>>2]|0;c[o>>2]=r+ -1;if((r|0)==0){i=g;return}r=j+112|0;w=f+16|0;u=j+104|0;do{l=e[r>>1]|0;s=c[w>>2]|0;t=a[s+l|0]|0;b[r>>1]=l+1&4095|l&61440;l=t&255;if((l&128|0)==0){x=t}else{x=l&127}l=d[s+(((x&255)<<3)+m+((d[(c[n>>2]|0)+54281|0]|0)<<8&64512))|0]|0;s=a[h+(l>>>4)|0]|0;t=c[u>>2]|0;c[u>>2]=t+1;a[t]=s;t=c[u>>2]|0;c[u>>2]=t+1;a[t]=s;t=c[u>>2]|0;c[u>>2]=t+1;a[t]=s;t=c[u>>2]|0;c[u>>2]=t+1;a[t]=s;s=a[h+(l&15)|0]|0;l=c[u>>2]|0;c[u>>2]=l+1;a[l]=s;l=c[u>>2]|0;c[u>>2]=l+1;a[l]=s;l=c[u>>2]|0;c[u>>2]=l+1;a[l]=s;l=c[u>>2]|0;c[u>>2]=l+1;a[l]=s;s=c[o>>2]|0;c[o>>2]=s+ -1;}while((s|0)!=0);i=g;return}else if((k|0)==1){o=j+116|0;u=c[o>>2]|0;c[o>>2]=u+ -1;if((u|0)==0){i=g;return}u=j+112|0;h=f+16|0;x=j+104|0;do{r=e[u>>1]|0;w=c[h>>2]|0;s=a[w+r|0]|0;b[u>>1]=r+1&4095|r&61440;r=s&255;if((r&128|0)==0){y=s}else{y=r&127}r=c[n>>2]|0;s=d[w+(((y&255)<<3)+m+((d[r+54281|0]|0)<<8&64512))|0]|0;w=(d[r+53274|0]|0|s>>>4)&255;r=c[x>>2]|0;c[x>>2]=r+1;a[r]=w;r=c[x>>2]|0;c[x>>2]=r+1;a[r]=w;r=c[x>>2]|0;c[x>>2]=r+1;a[r]=w;r=c[x>>2]|0;c[x>>2]=r+1;a[r]=w;w=(d[(c[n>>2]|0)+53274|0]|0|s&15)&255;s=c[x>>2]|0;c[x>>2]=s+1;a[s]=w;s=c[x>>2]|0;c[x>>2]=s+1;a[s]=w;s=c[x>>2]|0;c[x>>2]=s+1;a[s]=w;s=c[x>>2]|0;c[x>>2]=s+1;a[s]=w;w=c[o>>2]|0;c[o>>2]=w+ -1;}while((w|0)!=0);i=g;return}else if((k|0)==0){k=j+116|0;o=c[k>>2]|0;c[k>>2]=o+ -1;if((o|0)==0){i=g;return}o=j+112|0;x=f+16|0;f=j+104|0;y=j+108|0;do{j=e[o>>1]|0;u=c[x>>2]|0;h=a[u+j|0]|0;b[o>>1]=j+1&4095|j&61440;j=h&255;if((j&128|0)==0){w=c[n>>2]|0;s=a[w+53272|0]|0;z=w;A=h;B=s;C=(a[w+53271|0]&15|s&240)&255;D=4;E=2}else{s=c[n>>2]|0;w=a[s+53272|0]|0;z=s;A=j&127;B=(a[s+53271|0]&15|w&240)&255;C=w;D=2;E=4}w=a[u+(((A&255)<<3)+m+((d[z+54281|0]|0)<<8&64512))|0]|0;u=0;while(1){s=w&255;j=c[f>>2]|0;c[f>>2]=j+1;if((s&128|0)==0){a[j]=B;h=c[y>>2]|0;c[y>>2]=h+1;a[h]=D}else{a[j]=C;j=c[y>>2]|0;c[y>>2]=j+1;a[j]=E}j=u+1|0;if((j|0)==8){break}else{w=s<<1&255;u=j}}u=c[k>>2]|0;c[k>>2]=u+ -1;}while((u|0)!=0);i=g;return}else{i=g;return}}function zc(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;g=i;h=c[f+72>>2]|0;j=h+76|0;k=h+92|0;l=c[h+116>>2]|0;if(((c[j>>2]|0)-(c[k>>2]|0)|0)==1){m=h+82|0;b[m>>1]=(e[m>>1]|0)+l}m=h+116|0;c[m>>2]=l+ -1;if((l|0)==0){i=g;return}l=h+112|0;n=f+16|0;o=f+20|0;f=h+104|0;p=h+108|0;do{h=e[l>>1]|0;q=c[n>>2]|0;r=a[q+h|0]|0;b[l>>1]=h+1&4095|h&61440;h=r&255;if((h&128|0)==0){s=c[o>>2]|0;t=a[s+53272|0]|0;u=s;v=r;w=t;x=(a[s+53271|0]&15|t&240)&255;y=4;z=2}else{t=c[o>>2]|0;s=a[t+53272|0]|0;u=t;v=h&127;w=(a[t+53271|0]&15|s&240)&255;x=s;y=2;z=4}s=v&255;t=(c[j>>2]|0)-(c[k>>2]|0)|0;if((v&255)<96){if(t>>>0>2){A=a[q+((s<<3)+10-t+((d[u+54281|0]|0)<<8&64512))|0]|0;B=0}else{A=0;B=0}while(1){h=A&255;r=c[f>>2]|0;c[f>>2]=r+1;if((h&128|0)==0){a[r]=w;C=c[p>>2]|0;c[p>>2]=C+1;a[C]=y}else{a[r]=x;r=c[p>>2]|0;c[p>>2]=r+1;a[r]=z}r=B+1|0;if((r|0)==8){break}else{A=h<<1&255;B=r}}}else{do{if(t>>>0>8){D=0;E=0}else{r=((d[u+54281|0]|0)<<8)+(s<<3)|0;if(t>>>0>2){D=a[q+(10-t+r)|0]|0;E=0;break}else{D=a[q+(2-t+r)|0]|0;E=0;break}}}while(0);while(1){t=D&255;q=c[f>>2]|0;c[f>>2]=q+1;if((t&128|0)==0){a[q]=w;s=c[p>>2]|0;c[p>>2]=s+1;a[s]=y}else{a[q]=x;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=z}q=E+1|0;if((q|0)==8){break}else{D=t<<1&255;E=q}}}q=c[m>>2]|0;c[m>>2]=q+ -1;}while((q|0)!=0);i=g;return}function Ac(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;g=i;i=i+32|0;h=g;j=g+8|0;k=g+16|0;l=g+24|0;m=c[f+72>>2]|0;n=h;o=f+20|0;p=c[o>>2]|0;q=a[p+53274|0]|0;a[n]=q;r=a[p+53270|0]|0;a[h+1|0]=r;s=a[p+53271|0]|0;a[h+2|0]=s;a[h+3|0]=a[p+53272|0]|0;h=j;a[h]=q;a[j+1|0]=r;a[j+2|0]=s;a[j+3|0]=a[p+53273|0]|0;c[k>>2]=67240192;c[l>>2]=134349056;p=(c[m+76>>2]|0)-(c[m+92>>2]|0)|0;j=8-p-(c[m+88>>2]|0)|0;if((p|0)==1){p=m+82|0;s=e[p>>1]|0;r=c[m+116>>2]|0;b[p>>1]=s+r&4095|s&61440;t=r}else{t=c[m+116>>2]|0}r=m+116|0;c[r>>2]=t+ -1;if((t|0)==0){i=g;return}t=m+112|0;s=f+16|0;f=m+104|0;p=m+108|0;do{m=e[t>>1]|0;q=c[s>>2]|0;u=a[q+m|0]|0;b[t>>1]=m+1&4095|m&61440;m=u&255;if((m&128|0)==0){v=u;w=n;x=k}else{v=m&127;w=h;x=l}m=x;u=d[q+(j+((v&255)<<3)+((d[(c[o>>2]|0)+54281|0]|0)<<8&64512))|0]|0;q=u>>>6;y=a[w+q|0]|0;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=y;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=y;y=a[m+q|0]|0;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=y;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=y;y=u>>>4&3;q=a[w+y|0]|0;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=q;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=q;q=a[m+y|0]|0;y=c[p>>2]|0;c[p>>2]=y+1;a[y]=q;y=c[p>>2]|0;c[p>>2]=y+1;a[y]=q;q=u>>>2&3;y=a[w+q|0]|0;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=y;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=y;y=a[m+q|0]|0;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=y;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=y;y=u&3;u=a[w+y|0]|0;q=c[f>>2]|0;c[f>>2]=q+1;a[q]=u;q=c[f>>2]|0;c[f>>2]=q+1;a[q]=u;u=a[m+y|0]|0;y=c[p>>2]|0;c[p>>2]=y+1;a[y]=u;y=c[p>>2]|0;c[p>>2]=y+1;a[y]=u;u=c[r>>2]|0;c[r>>2]=u+ -1;}while((u|0)!=0);i=g;return}function Bc(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;g=i;i=i+32|0;h=g;j=g+8|0;k=g+16|0;l=g+24|0;m=c[f+72>>2]|0;n=h;o=f+20|0;p=c[o>>2]|0;q=a[p+53274|0]|0;a[n]=q;r=a[p+53270|0]|0;a[h+1|0]=r;s=a[p+53271|0]|0;a[h+2|0]=s;a[h+3|0]=a[p+53272|0]|0;h=j;a[h]=q;a[j+1|0]=r;a[j+2|0]=s;a[j+3|0]=a[p+53273|0]|0;c[k>>2]=67240192;c[l>>2]=134349056;p=(c[m+76>>2]|0)-(c[m+92>>2]|0)|0;j=(16-p-(c[m+88>>2]|0)|0)>>>1;if((p|0)==1){p=m+82|0;s=e[p>>1]|0;r=c[m+116>>2]|0;b[p>>1]=s+r&4095|s&61440;t=r}else{t=c[m+116>>2]|0}r=m+116|0;c[r>>2]=t+ -1;if((t|0)==0){i=g;return}t=m+112|0;s=f+16|0;f=m+104|0;p=m+108|0;do{m=e[t>>1]|0;q=c[s>>2]|0;u=a[q+m|0]|0;b[t>>1]=m+1&4095|m&61440;m=u&255;if((m&128|0)==0){v=u;w=n;x=k}else{v=m&127;w=h;x=l}m=x;u=d[q+(((v&255)<<3)+j+((d[(c[o>>2]|0)+54281|0]|0)<<8&65024))|0]|0;q=u>>>6;y=a[w+q|0]|0;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=y;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=y;y=a[m+q|0]|0;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=y;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=y;y=u>>>4&3;q=a[w+y|0]|0;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=q;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=q;q=a[m+y|0]|0;y=c[p>>2]|0;c[p>>2]=y+1;a[y]=q;y=c[p>>2]|0;c[p>>2]=y+1;a[y]=q;q=u>>>2&3;y=a[w+q|0]|0;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=y;z=c[f>>2]|0;c[f>>2]=z+1;a[z]=y;y=a[m+q|0]|0;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=y;q=c[p>>2]|0;c[p>>2]=q+1;a[q]=y;y=u&3;u=a[w+y|0]|0;q=c[f>>2]|0;c[f>>2]=q+1;a[q]=u;q=c[f>>2]|0;c[f>>2]=q+1;a[q]=u;u=a[m+y|0]|0;y=c[p>>2]|0;c[p>>2]=y+1;a[y]=u;y=c[p>>2]|0;c[p>>2]=y+1;a[y]=u;u=c[r>>2]|0;c[r>>2]=u+ -1;}while((u|0)!=0);i=g;return}function Cc(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;g=i;i=i+8|0;h=g;j=c[f+72>>2]|0;k=f+20|0;l=c[k>>2]|0;a[h]=a[l+53270|0]|0;a[h+1|0]=a[l+53271|0]|0;a[h+2|0]=a[l+53272|0]|0;a[h+3|0]=a[l+53273|0]|0;m=a[l+53274|0]|0;n=(c[j+76>>2]|0)-(c[j+92>>2]|0)|0;o=8-n-(c[j+88>>2]|0)|0;if((n|0)==1){n=j+82|0;p=e[n>>1]|0;q=c[j+116>>2]|0;b[n>>1]=p+q&4095|p&61440;r=q}else{r=c[j+116>>2]|0}q=j+116|0;c[q>>2]=r+ -1;if((r|0)==0){i=g;return}r=j+112|0;p=f+16|0;f=j+104|0;n=j+108|0;j=l;while(1){l=e[r>>1]|0;s=c[p>>2]|0;t=a[s+l|0]|0;b[r>>1]=l+1&4095|l&61440;l=t&255;t=l>>>6;u=a[h+t|0]|0;v=a[2728+t|0]|0;t=a[s+(o+((d[j+54281|0]|0)<<8&65024|l<<3&504))|0]|0;l=0;while(1){s=t&255;w=c[f>>2]|0;c[f>>2]=w+1;if((s&128|0)==0){a[w]=m;x=c[f>>2]|0;c[f>>2]=x+1;a[x]=m;x=c[n>>2]|0;c[n>>2]=x+1;a[x]=0;x=c[n>>2]|0;c[n>>2]=x+1;a[x]=0}else{a[w]=u;w=c[f>>2]|0;c[f>>2]=w+1;a[w]=u;w=c[n>>2]|0;c[n>>2]=w+1;a[w]=v;w=c[n>>2]|0;c[n>>2]=w+1;a[w]=v}w=l+1|0;if((w|0)==8){break}else{t=s<<1&255;l=w}}l=c[q>>2]|0;c[q>>2]=l+ -1;if((l|0)==0){break}j=c[k>>2]|0}i=g;return}function Dc(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;g=i;i=i+8|0;h=g;j=c[f+72>>2]|0;k=f+20|0;l=c[k>>2]|0;a[h]=a[l+53270|0]|0;a[h+1|0]=a[l+53271|0]|0;a[h+2|0]=a[l+53272|0]|0;a[h+3|0]=a[l+53273|0]|0;m=a[l+53274|0]|0;n=(c[j+76>>2]|0)-(c[j+92>>2]|0)|0;o=(16-n-(c[j+88>>2]|0)|0)>>>1;if((n|0)==1){n=j+82|0;p=e[n>>1]|0;q=c[j+116>>2]|0;b[n>>1]=p+q&4095|p&61440;r=q}else{r=c[j+116>>2]|0}q=j+116|0;c[q>>2]=r+ -1;if((r|0)==0){i=g;return}r=j+112|0;p=f+16|0;f=j+104|0;n=j+108|0;j=l;while(1){l=e[r>>1]|0;s=c[p>>2]|0;t=a[s+l|0]|0;b[r>>1]=l+1&4095|l&61440;l=t&255;t=l>>>6;u=a[h+t|0]|0;v=a[2728+t|0]|0;t=a[s+(((d[j+54281|0]|0)<<8&65024|l<<3&504)+o)|0]|0;l=0;while(1){s=t&255;w=c[f>>2]|0;c[f>>2]=w+1;if((s&128|0)==0){a[w]=m;x=c[f>>2]|0;c[f>>2]=x+1;a[x]=m;x=c[n>>2]|0;c[n>>2]=x+1;a[x]=0;x=c[n>>2]|0;c[n>>2]=x+1;a[x]=0}else{a[w]=u;w=c[f>>2]|0;c[f>>2]=w+1;a[w]=u;w=c[n>>2]|0;c[n>>2]=w+1;a[w]=v;w=c[n>>2]|0;c[n>>2]=w+1;a[w]=v}w=l+1|0;if((w|0)==8){break}else{t=s<<1&255;l=w}}l=c[q>>2]|0;c[q>>2]=l+ -1;if((l|0)==0){break}j=c[k>>2]|0}i=g;return}function Ec(d){d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;i=i+8|0;g=f;h=c[d+72>>2]|0;j=c[d+20>>2]|0;a[g]=a[j+53274|0]|0;a[g+1|0]=a[j+53270|0]|0;a[g+2|0]=a[j+53271|0]|0;a[g+3|0]=a[j+53272|0]|0;if(((c[h+76>>2]|0)-(c[h+92>>2]|0)|0)==1){j=h+82|0;k=e[j>>1]|0;l=c[h+116>>2]|0;b[j>>1]=k+l&4095|k&61440;m=l}else{m=c[h+116>>2]|0}l=h+116|0;c[l>>2]=m+ -1;if((m|0)==0){i=f;return}m=h+112|0;k=d+16|0;d=h+104|0;j=h+108|0;do{h=e[m>>1]|0;n=a[(c[k>>2]|0)+h|0]|0;b[m>>1]=h+1&4095|h&61440;h=n&255;n=0;do{o=h>>>(6-n|0)&3;p=a[g+o|0]|0;q=c[d>>2]|0;c[d>>2]=q+1;a[q]=p;q=c[d>>2]|0;c[d>>2]=q+1;a[q]=p;q=c[d>>2]|0;c[d>>2]=q+1;a[q]=p;q=c[d>>2]|0;c[d>>2]=q+1;a[q]=p;q=c[d>>2]|0;c[d>>2]=q+1;a[q]=p;q=c[d>>2]|0;c[d>>2]=q+1;a[q]=p;q=c[d>>2]|0;c[d>>2]=q+1;a[q]=p;q=c[d>>2]|0;c[d>>2]=q+1;a[q]=p;p=a[2720+o|0]|0;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=p;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=p;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=p;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=p;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=p;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=p;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=p;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=p;n=n+2|0;}while(n>>>0<8);n=c[l>>2]|0;c[l>>2]=n+ -1;}while((n|0)!=0);i=f;return}function Fc(d){d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;g=c[d+72>>2]|0;if(((c[g+76>>2]|0)-(c[g+92>>2]|0)|0)==1){h=g+82|0;j=e[h>>1]|0;k=c[g+116>>2]|0;b[h>>1]=j+k&4095|j&61440;l=k}else{l=c[g+116>>2]|0}k=g+116|0;c[k>>2]=l+ -1;if((l|0)==0){i=f;return}l=g+112|0;j=d+16|0;h=d+20|0;d=g+104|0;m=g+108|0;do{g=e[l>>1]|0;n=a[(c[j>>2]|0)+g|0]|0;b[l>>1]=g+1&4095|g&61440;g=n;n=0;while(1){o=g&255;p=c[h>>2]|0;q=(o>>>7^1)&255^1;r=a[(o&128|0)==0?p+53274|0:p+53270|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=r;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=r;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=r;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=r;r=c[m>>2]|0;c[m>>2]=r+1;a[r]=q;r=c[m>>2]|0;c[m>>2]=r+1;a[r]=q;r=c[m>>2]|0;c[m>>2]=r+1;a[r]=q;r=c[m>>2]|0;c[m>>2]=r+1;a[r]=q;q=n+1|0;if((q|0)==8){break}else{n=q;g=o<<1&255}}g=c[k>>2]|0;c[k>>2]=g+ -1;}while((g|0)!=0);i=f;return}function Gc(d){d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+8|0;g=f;h=c[d+72>>2]|0;j=c[d+20>>2]|0;a[g]=a[j+53274|0]|0;a[g+1|0]=a[j+53270|0]|0;a[g+2|0]=a[j+53271|0]|0;a[g+3|0]=a[j+53272|0]|0;if(((c[h+76>>2]|0)-(c[h+92>>2]|0)|0)==1){j=h+82|0;k=e[j>>1]|0;l=c[h+116>>2]|0;b[j>>1]=k+l&4095|k&61440;m=l}else{m=c[h+116>>2]|0}l=h+116|0;c[l>>2]=m+ -1;if((m|0)==0){i=f;return}m=h+112|0;k=d+16|0;d=h+104|0;j=h+108|0;do{h=e[m>>1]|0;n=a[(c[k>>2]|0)+h|0]|0;b[m>>1]=h+1&4095|h&61440;h=n&255;n=h>>>6;o=a[g+n|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;o=a[2720+n|0]|0;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;o=h>>>4&3;n=a[g+o|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=n;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=n;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=n;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=n;n=a[2720+o|0]|0;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=n;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=n;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=n;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=n;n=h>>>2&3;o=a[g+n|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;o=a[2720+n|0]|0;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;o=h&3;h=a[g+o|0]|0;n=c[d>>2]|0;c[d>>2]=n+1;a[n]=h;n=c[d>>2]|0;c[d>>2]=n+1;a[n]=h;n=c[d>>2]|0;c[d>>2]=n+1;a[n]=h;n=c[d>>2]|0;c[d>>2]=n+1;a[n]=h;h=a[2720+o|0]|0;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=h;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=h;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=h;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=h;h=c[l>>2]|0;c[l>>2]=h+ -1;}while((h|0)!=0);i=f;return}function Hc(d){d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;g=c[d+72>>2]|0;if(((c[g+76>>2]|0)-(c[g+92>>2]|0)|0)==1){h=g+82|0;j=e[h>>1]|0;k=c[g+116>>2]|0;b[h>>1]=j+k&4095|j&61440;l=k}else{l=c[g+116>>2]|0}k=g+116|0;c[k>>2]=l+ -1;if((l|0)==0){i=f;return}l=g+112|0;j=d+16|0;h=d+20|0;d=g+104|0;m=g+108|0;do{g=e[l>>1]|0;n=a[(c[j>>2]|0)+g|0]|0;b[l>>1]=g+1&4095|g&61440;g=n;n=0;while(1){o=g&255;p=c[h>>2]|0;q=(o>>>7^1)&255^1;r=a[(o&128|0)==0?p+53274|0:p+53270|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=r;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=r;r=c[m>>2]|0;c[m>>2]=r+1;a[r]=q;r=c[m>>2]|0;c[m>>2]=r+1;a[r]=q;q=n+1|0;if((q|0)==8){break}else{n=q;g=o<<1&255}}g=c[k>>2]|0;c[k>>2]=g+ -1;}while((g|0)!=0);i=f;return}function Ic(d){d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;g=c[d+72>>2]|0;if(((c[g+76>>2]|0)-(c[g+92>>2]|0)|0)==1){h=g+82|0;j=e[h>>1]|0;k=c[g+116>>2]|0;b[h>>1]=j+k&4095|j&61440;l=k}else{l=c[g+116>>2]|0}k=g+116|0;c[k>>2]=l+ -1;if((l|0)==0){i=f;return}l=g+112|0;j=d+16|0;h=d+20|0;d=g+104|0;m=g+108|0;do{g=e[l>>1]|0;n=a[(c[j>>2]|0)+g|0]|0;b[l>>1]=g+1&4095|g&61440;g=n;n=0;while(1){o=g&255;p=c[h>>2]|0;q=(o>>>7^1)&255^1;r=a[(o&128|0)==0?p+53274|0:p+53270|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=r;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=r;r=c[m>>2]|0;c[m>>2]=r+1;a[r]=q;r=c[m>>2]|0;c[m>>2]=r+1;a[r]=q;q=n+1|0;if((q|0)==8){break}else{n=q;g=o<<1&255}}g=c[k>>2]|0;c[k>>2]=g+ -1;}while((g|0)!=0);i=f;return}function Jc(d){d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+8|0;g=f;h=c[d+72>>2]|0;j=c[d+20>>2]|0;a[g]=a[j+53274|0]|0;a[g+1|0]=a[j+53270|0]|0;a[g+2|0]=a[j+53271|0]|0;a[g+3|0]=a[j+53272|0]|0;if(((c[h+76>>2]|0)-(c[h+92>>2]|0)|0)==1){j=h+82|0;k=e[j>>1]|0;l=c[h+116>>2]|0;b[j>>1]=k+l&4095|k&61440;m=l}else{m=c[h+116>>2]|0}l=h+116|0;c[l>>2]=m+ -1;if((m|0)==0){i=f;return}m=h+112|0;k=d+16|0;d=h+104|0;j=h+108|0;do{h=e[m>>1]|0;n=a[(c[k>>2]|0)+h|0]|0;b[m>>1]=h+1&4095|h&61440;h=n&255;n=h>>>6;o=a[g+n|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;o=a[2720+n|0]|0;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;o=h>>>4&3;n=a[g+o|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=n;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=n;n=a[2720+o|0]|0;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=n;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=n;n=h>>>2&3;o=a[g+n|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;o=a[2720+n|0]|0;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;o=h&3;h=a[g+o|0]|0;n=c[d>>2]|0;c[d>>2]=n+1;a[n]=h;n=c[d>>2]|0;c[d>>2]=n+1;a[n]=h;h=a[2720+o|0]|0;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=h;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=h;h=c[l>>2]|0;c[l>>2]=h+ -1;}while((h|0)!=0);i=f;return}function Kc(d){d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+8|0;g=f;h=c[d+72>>2]|0;j=c[d+20>>2]|0;a[g]=a[j+53274|0]|0;a[g+1|0]=a[j+53270|0]|0;a[g+2|0]=a[j+53271|0]|0;a[g+3|0]=a[j+53272|0]|0;if(((c[h+76>>2]|0)-(c[h+92>>2]|0)|0)==1){j=h+82|0;k=e[j>>1]|0;l=c[h+116>>2]|0;b[j>>1]=k+l&4095|k&61440;m=l}else{m=c[h+116>>2]|0}l=h+116|0;c[l>>2]=m+ -1;if((m|0)==0){i=f;return}m=h+112|0;k=d+16|0;d=h+104|0;j=h+108|0;do{h=e[m>>1]|0;n=a[(c[k>>2]|0)+h|0]|0;b[m>>1]=h+1&4095|h&61440;h=n&255;n=h>>>6;o=a[g+n|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;o=a[2720+n|0]|0;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;o=h>>>4&3;n=a[g+o|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=n;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=n;n=a[2720+o|0]|0;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=n;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=n;n=h>>>2&3;o=a[g+n|0]|0;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;p=c[d>>2]|0;c[d>>2]=p+1;a[p]=o;o=a[2720+n|0]|0;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;n=c[j>>2]|0;c[j>>2]=n+1;a[n]=o;o=h&3;h=a[g+o|0]|0;n=c[d>>2]|0;c[d>>2]=n+1;a[n]=h;n=c[d>>2]|0;c[d>>2]=n+1;a[n]=h;h=a[2720+o|0]|0;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=h;o=c[j>>2]|0;c[j>>2]=o+1;a[o]=h;h=c[l>>2]|0;c[l>>2]=h+ -1;}while((h|0)!=0);i=f;return}function Lc(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;g=i;i=i+16|0;h=g;j=c[f+72>>2]|0;k=f+20|0;l=c[k>>2]|0;m=a[l+53272|0]|0;n=a[l+53271|0]|0;o=(n&15|m&240)&255;a[h]=a[l+53266|0]|0;a[h+1|0]=a[l+53267|0]|0;a[h+2|0]=a[l+53268|0]|0;a[h+3|0]=a[l+53269|0]|0;p=a[l+53270|0]|0;a[h+4|0]=p;a[h+5|0]=n;a[h+6|0]=m;q=a[l+53273|0]|0;a[h+7|0]=q;Sf(h+8|0,a[l+53274|0]|0,4)|0;a[h+12|0]=p;a[h+13|0]=n;a[h+14|0]=m;a[h+15|0]=q;if(((c[j+76>>2]|0)-(c[j+92>>2]|0)|0)==1){q=j+82|0;n=e[q>>1]|0;b[q>>1]=n+(c[j+116>>2]|0)&4095|n&61440}n=(d[l+53275|0]|0)>>>6;if((n|0)==2){q=j+116|0;p=c[q>>2]|0;c[q>>2]=p+ -1;if((p|0)==0){i=g;return}p=j+112|0;r=f+16|0;s=j+104|0;do{t=e[p>>1]|0;u=a[(c[r>>2]|0)+t|0]|0;b[p>>1]=t+1&4095|t&61440;t=u&255;u=a[h+(t>>>4)|0]|0;v=c[s>>2]|0;c[s>>2]=v+1;a[v]=u;v=c[s>>2]|0;c[s>>2]=v+1;a[v]=u;v=c[s>>2]|0;c[s>>2]=v+1;a[v]=u;v=c[s>>2]|0;c[s>>2]=v+1;a[v]=u;u=a[h+(t&15)|0]|0;t=c[s>>2]|0;c[s>>2]=t+1;a[t]=u;t=c[s>>2]|0;c[s>>2]=t+1;a[t]=u;t=c[s>>2]|0;c[s>>2]=t+1;a[t]=u;t=c[s>>2]|0;c[s>>2]=t+1;a[t]=u;u=c[q>>2]|0;c[q>>2]=u+ -1;}while((u|0)!=0);i=g;return}else if((n|0)==1){q=j+116|0;s=c[q>>2]|0;c[q>>2]=s+ -1;if((s|0)==0){i=g;return}s=j+112|0;h=f+16|0;p=j+104|0;r=l;while(1){u=e[s>>1]|0;t=a[(c[h>>2]|0)+u|0]|0;b[s>>1]=u+1&4095|u&61440;u=t&255;t=(d[r+53274|0]|0|u>>>4)&255;v=c[p>>2]|0;c[p>>2]=v+1;a[v]=t;v=c[p>>2]|0;c[p>>2]=v+1;a[v]=t;v=c[p>>2]|0;c[p>>2]=v+1;a[v]=t;v=c[p>>2]|0;c[p>>2]=v+1;a[v]=t;t=(d[(c[k>>2]|0)+53274|0]|0|u&15)&255;u=c[p>>2]|0;c[p>>2]=u+1;a[u]=t;u=c[p>>2]|0;c[p>>2]=u+1;a[u]=t;u=c[p>>2]|0;c[p>>2]=u+1;a[u]=t;u=c[p>>2]|0;c[p>>2]=u+1;a[u]=t;t=c[q>>2]|0;c[q>>2]=t+ -1;if((t|0)==0){break}r=c[k>>2]|0}i=g;return}else if((n|0)==3){r=j+116|0;q=c[r>>2]|0;c[r>>2]=q+ -1;if((q|0)==0){i=g;return}q=j+112|0;p=f+16|0;s=j+104|0;h=l;while(1){l=e[q>>1]|0;t=a[(c[p>>2]|0)+l|0]|0;b[q>>1]=l+1&4095|l&61440;l=t&255;t=l&240;u=d[h+53274|0]|0;v=((t|0)==0?u&240:u|t)&255;t=c[s>>2]|0;c[s>>2]=t+1;a[t]=v;t=c[s>>2]|0;c[s>>2]=t+1;a[t]=v;t=c[s>>2]|0;c[s>>2]=t+1;a[t]=v;t=c[s>>2]|0;c[s>>2]=t+1;a[t]=v;v=d[(c[k>>2]|0)+53274|0]|0;if((l&15|0)==0){w=v&240}else{w=v|l<<4}l=w&255;v=c[s>>2]|0;c[s>>2]=v+1;a[v]=l;v=c[s>>2]|0;c[s>>2]=v+1;a[v]=l;v=c[s>>2]|0;c[s>>2]=v+1;a[v]=l;v=c[s>>2]|0;c[s>>2]=v+1;a[v]=l;l=c[r>>2]|0;c[r>>2]=l+ -1;if((l|0)==0){break}h=c[k>>2]|0}i=g;return}else if((n|0)==0){n=j+116|0;k=c[n>>2]|0;c[n>>2]=k+ -1;if((k|0)==0){i=g;return}k=j+112|0;h=f+16|0;f=j+104|0;r=j+108|0;do{j=e[k>>1]|0;s=a[(c[h>>2]|0)+j|0]|0;b[k>>1]=j+1&4095|j&61440;j=s;s=0;while(1){w=j&255;q=c[f>>2]|0;c[f>>2]=q+1;if((w&128|0)==0){a[q]=m;p=c[r>>2]|0;c[r>>2]=p+1;a[p]=4}else{a[q]=o;q=c[r>>2]|0;c[r>>2]=q+1;a[q]=2}q=s+1|0;if((q|0)==8){break}else{j=w<<1&255;s=q}}s=c[n>>2]|0;c[n>>2]=s+ -1;}while((s|0)!=0);i=g;return}else{i=g;return}}function Mc(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+54272|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+54272|0}function Nc(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+54273|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+54273|0}function Oc(a,e){a=a|0;e=e|0;var f=0;if((e|0)!=0){f=(c[a+72>>2]|0)+80|0;b[f>>1]=b[f>>1]&65280|(d[e]|0)}i=i;return(c[a+16>>2]|0)+54274|0}function Pc(a,e){a=a|0;e=e|0;var f=0;if((e|0)!=0){f=(c[a+72>>2]|0)+80|0;b[f>>1]=(d[e]|0)<<8|b[f>>1]&255}i=i;return(c[a+16>>2]|0)+54275|0}function Qc(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+54276|0]=a[d]&15}i=i;return(c[b+16>>2]|0)+54276|0}function Rc(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+54277|0]=a[d]&15}i=i;return(c[b+16>>2]|0)+54277|0}function Sc(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+54279|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+54279|0}function Tc(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+54281|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+54281|0}function Uc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;if((b|0)==0){e=a+16|0;f=c[e>>2]|0;g=f+54282|0;i=d;return g|0}b=(c[a+72>>2]|0)+8|0;h=c[b>>2]|0;j=c[b+4>>2]|0;b=a+48|0;k=b;l=c[k>>2]|0;m=c[k+4>>2]|0;k=j>>>0>m>>>0|(j|0)==(m|0)&h>>>0>l>>>0;n=b;c[n>>2]=k?h:l;c[n+4>>2]=k?j:m;e=a+16|0;f=c[e>>2]|0;g=f+54282|0;i=d;return g|0}function Vc(a,b){a=a|0;b=b|0;i=i;return(c[a+16>>2]|0)+54283|0}function Wc(a,b){a=a|0;b=b|0;i=i;return(c[a+16>>2]|0)+54284|0}function Xc(a,b){a=a|0;b=b|0;i=i;return(c[a+16>>2]|0)+54285|0}function Yc(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+54286|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+54286|0}function Zc(b,d){b=b|0;d=d|0;var e=0;e=b+16|0;if((d|0)!=0){a[(c[e>>2]|0)+54287|0]=0}i=i;return(c[e>>2]|0)+54287|0}function _c(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;f=c[b+72>>2]|0;g=c[b+20>>2]|0;h=(d|0)!=0;if(!((a[g+54018|0]&4)==0)){if(h){a[g+54016|0]=a[d]|0}j=(c[b+16>>2]|0)+54016|0;i=e;return j|0}if(h){h=f+84|0;a[h]=a[d]|0;j=h;i=e;return j|0}else{j=f+84|0;i=e;return j|0}return 0}function $c(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;g=c[b+72>>2]|0;h=b+20|0;j=c[h>>2]|0;k=(e|0)!=0;if((a[j+54019|0]&4)==0){if(k){l=g+85|0;a[l]=a[e]|0;m=l;i=f;return m|0}else{m=g+85|0;i=f;return m|0}}if(k){k=a[e]&1;do{if((a[j+54017|0]&1|0)!=(k|0)){if((k|0)==0){l=b+16|0;Vf((c[l>>2]|0)+49152|0,j+49152|0,4096)|0;Ye(b,-16384,-12289);Vf((c[l>>2]|0)+55296|0,(c[h>>2]|0)+55296|0,10240)|0;Ye(b,-10240,-1);break}else{l=b+16|0;Vf(j+49152|0,(c[l>>2]|0)+49152|0,4096)|0;We(b,-16384,-12289);Vf((c[l>>2]|0)+49152|0,c[g+136>>2]|0,4096)|0;Vf((c[h>>2]|0)+55296|0,(c[l>>2]|0)+55296|0,10240)|0;We(b,-10240,-1);Vf((c[l>>2]|0)+55296|0,c[g+144>>2]|0,10240)|0;break}}}while(0);j=c[h>>2]|0;k=a[e]&2;do{if((a[j+54017|0]&2|0)!=(k|0)){if((k|0)==0){l=b+16|0;Vf(j+40960|0,(c[l>>2]|0)+40960|0,8192)|0;We(b,-24576,-16385);Vf((c[l>>2]|0)+40960|0,c[g+132>>2]|0,8192)|0;break}else{Vf((c[b+16>>2]|0)+40960|0,j+40960|0,8192)|0;Ye(b,-24576,-16385);break}}}while(0);j=c[h>>2]|0;k=a[e]&128;do{if((a[j+54017|0]&128|0)==(k|0)){n=b+16|0}else{if((k|0)==0){l=b+16|0;Vf(j+20480|0,(c[l>>2]|0)+20480|0,2048)|0;We(b,20480,22527);Vf((c[l>>2]|0)+20480|0,c[g+140>>2]|0,2048)|0;n=l;break}else{l=b+16|0;Vf((c[l>>2]|0)+20480|0,j+20480|0,2048)|0;Ye(b,20480,22527);n=l;break}}}while(0);j=(d[e]|0|124)&255;a[(c[h>>2]|0)+54017|0]=j;a[(c[n>>2]|0)+54017|0]=j;o=n}else{o=b+16|0}m=(c[o>>2]|0)+54017|0;i=f;return m|0}function ad(b,d){b=b|0;d=d|0;var e=0,f=0;if((d|0)==0){e=b+16|0}else{a[(c[b+20>>2]|0)+54018|0]=a[d]|0;f=b+16|0;a[(c[f>>2]|0)+54018|0]=a[d]&13|48;e=f}i=i;return(c[e>>2]|0)+54018|0}function bd(b,d){b=b|0;d=d|0;var e=0,f=0;if((d|0)==0){e=b+16|0}else{a[(c[b+20>>2]|0)+54019|0]=a[d]|0;f=b+16|0;a[(c[f>>2]|0)+54019|0]=a[d]&13|48;e=f}i=i;return(c[e>>2]|0)+54019|0}function cd(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53760|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53760|0}function dd(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53761|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53761|0}function ed(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53762|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53762|0}function fd(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53763|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53763|0}function gd(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53764|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53764|0}function hd(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53765|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53765|0}function id(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53766|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53766|0}function jd(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53768|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53768|0}function kd(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;if((d|0)==0){f=b+16|0;g=c[f>>2]|0;h=g+53769|0;i=e;return h|0}j=c[b+72>>2]|0;k=b+20|0;a[(c[k>>2]|0)+53769|0]=a[d]|0;d=c[k>>2]|0;l=a[d+53760|0]|0;if(l<<24>>24==0){m=d}else{d=b+40|0;n=Uf(c[d>>2]|0,c[d+4>>2]|0,l&255|0,0)|0;l=j+48|0;c[l>>2]=n;c[l+4>>2]=E;oc(b);m=c[k>>2]|0}l=a[m+53762|0]|0;if(l<<24>>24==0){o=m}else{m=b+40|0;n=Uf(c[m>>2]|0,c[m+4>>2]|0,l&255|0,0)|0;l=j+56|0;c[l>>2]=n;c[l+4>>2]=E;oc(b);o=c[k>>2]|0}k=a[o+53766|0]|0;if(k<<24>>24==0){f=b+16|0;g=c[f>>2]|0;h=g+53769|0;i=e;return h|0}o=b+40|0;l=Uf(c[o>>2]|0,c[o+4>>2]|0,k&255|0,0)|0;k=j+64|0;c[k>>2]=l;c[k+4>>2]=E;oc(b);f=b+16|0;g=c[f>>2]|0;h=g+53769|0;i=e;return h|0}function ld(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;if((d|0)!=0){a[(c[b+20>>2]|0)+53770|0]=a[d]|0}d=(Rf()|0)&255;f=b+16|0;a[(c[f>>2]|0)+53770|0]=d;i=e;return(c[f>>2]|0)+53770|0}function md(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53771|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53771|0}function nd(e,f){e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;g=i;i=i+8|0;h=g;j=i;i=i+8|0;k=i;i=i+104|0;l=c[e+72>>2]|0;if((f|0)==0){m=b[1960]|0;b[1960]=m+1<<16>>16;a[(c[e+16>>2]|0)+53773|0]=a[2776+(m&65535)|0]|0;m=(b[1920]|0)+ -1<<16>>16;b[1920]=m;if(m<<16>>16==0){b[1960]=0;n=e+16|0;o=c[n>>2]|0;p=o+53773|0;i=g;return p|0}else{m=e+40|0;q=Uf(c[m>>2]|0,c[m+4>>2]|0,900,0)|0;m=l+40|0;c[m>>2]=q;c[m+4>>2]=E;oc(e);n=e+16|0;o=c[n>>2]|0;p=o+53773|0;i=g;return p|0}}m=e+40|0;q=m;r=Uf(c[q>>2]|0,c[q+4>>2]|0,900,0)|0;q=l+24|0;c[q>>2]=r;c[q+4>>2]=E;oc(e);q=b[1384]|0;r=q&65535;s=a[f]|0;if(q<<16>>16==0){if(s<<24>>24==-1|s<<24>>24==0){n=e+16|0;o=c[n>>2]|0;p=o+53773|0;i=g;return p|0}b[1384]=1;a[2776+r|0]=s;n=e+16|0;o=c[n>>2]|0;p=o+53773|0;i=g;return p|0}f=q+1<<16>>16;b[1384]=f;a[2776+r|0]=s;if(!(f<<16>>16==5)){n=e+16|0;o=c[n>>2]|0;p=o+53773|0;i=g;return p|0}f=(d[2777|0]|0)+(d[2776]|0)|0;s=(d[2778|0]|0)+((f>>>8)+f&255)|0;f=(d[2779|0]|0)+((s>>>8)+s&255)|0;do{if(((f>>>8)+f&255)<<24>>24==(a[2780|0]|0)){s=k;r=l+124|0;q=b[(c[r>>2]|0)+4>>1]|0;t=m;u=Uf(c[t>>2]|0,c[t+4>>2]|0,1500,0)|0;t=l+32|0;c[t>>2]=u;c[t+4>>2]=E;oc(e);t=d[2777|0]|0;if((t|0)==83){Ba(3848,0);if(q<<16>>16==128){a[2776]=65;a[2777|0]=67;a[2778|0]=16;a[2779|0]=0;a[2780|0]=1;a[2781|0]=0;a[2782|0]=17}else if(q<<16>>16==256){a[2776]=65;a[2777|0]=67;a[2778|0]=48;a[2779|0]=0;a[2780|0]=1;a[2781|0]=0;a[2782|0]=49}b[1920]=7;if((a[c[r>>2]|0]|0)==0){break}u=m;v=Uf(c[u>>2]|0,c[u+4>>2]|0,3e3,0)|0;u=l+40|0;c[u>>2]=v;c[u+4>>2]=E;oc(e);break}else if((t|0)==82){u=d[2779|0]<<8|d[2778|0];c[j>>2]=u;Ta(s|0,3800,j|0)|0;Ba(s|0,0);if(u>>>0<4){w=(u<<7)+ -128|0;x=128}else{w=(aa(u+ -4|0,q&65535)|0)+384|0;x=q}q=w+16|0;if(q>>>0<(c[l+128>>2]|0)>>>0){a[2776]=65;a[2777|0]=67;u=x&65535;Vf(2778|0,(c[r>>2]|0)+q|0,u|0)|0;if(x<<16>>16==0){y=0}else{q=2778|0;r=u;s=0;while(1){v=r+ -1|0;z=(d[q]|0)+(s&255)|0;A=(z>>>8)+z|0;if((v|0)==0){break}else{s=A;r=v;q=q+1|0}}y=A&255}a[u+2778|0]=y;b[1920]=u+3;q=m;r=Uf(c[q>>2]|0,c[q+4>>2]|0,3e3,0)|0;q=l+40|0;c[q>>2]=r;c[q+4>>2]=E}else{a[2776]=78;b[1920]=1}oc(e);break}else{c[h>>2]=t;Ra(3888,h|0)|0;break}}}while(0);b[1384]=0;n=e+16|0;o=c[n>>2]|0;p=o+53773|0;i=g;return p|0}function od(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;if((e|0)==0){g=b+16|0;h=c[g>>2]|0;j=h+53774|0;i=f;return j|0}else{k=b+20|0;a[(c[k>>2]|0)+53774|0]=a[e]|0;e=b+16|0;b=(c[e>>2]|0)+53774|0;a[b]=d[b]|0|(d[(c[k>>2]|0)+53774|0]|0)^255;g=e;h=c[g>>2]|0;j=h+53774|0;i=f;return j|0}return 0}function pd(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53775|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53775|0}function qd(b){b=b|0;var d=0,e=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;a[b]=e;a[b+9|0]=e<<24>>24==0|0;a[b+4|0]=e&128;i=d;return}function rd(b){b=b|0;var d=0,e=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;a[b+1|0]=e;a[b+9|0]=e<<24>>24==0|0;a[b+4|0]=e&128;i=d;return}function sd(b){b=b|0;var d=0,e=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;a[b+2|0]=e;a[b+9|0]=e<<24>>24==0|0;a[b+4|0]=e&128;i=d;return}function td(a){a=a|0;var b=0;b=i;Vb[c[a+28>>2]&127](a,a)|0;i=b;return}function ud(a){a=a|0;var b=0;b=i;Vb[c[a+28>>2]&127](a,a+1|0)|0;i=b;return}function vd(a){a=a|0;var b=0;b=i;Vb[c[a+28>>2]&127](a,a+2|0)|0;i=b;return}function wd(b){b=b|0;var c=0;c=a[b]|0;a[b+1|0]=c;a[b+9|0]=c<<24>>24==0|0;a[b+4|0]=c&128;i=i;return}function xd(b){b=b|0;var c=0;c=a[b]|0;a[b+2|0]=c;a[b+9|0]=c<<24>>24==0|0;a[b+4|0]=c&128;i=i;return}function yd(b){b=b|0;var c=0;c=a[b+3|0]|0;a[b+1|0]=c;a[b+9|0]=c<<24>>24==0|0;a[b+4|0]=c&128;i=i;return}function zd(b){b=b|0;var c=0;c=a[b+1|0]|0;a[b]=c;a[b+9|0]=c<<24>>24==0|0;a[b+4|0]=c&128;i=i;return}function Ad(b){b=b|0;a[b+3|0]=a[b+1|0]|0;i=i;return}function Bd(b){b=b|0;var c=0;c=a[b+2|0]|0;a[b]=c;a[b+9|0]=c<<24>>24==0|0;a[b+4|0]=c&128;i=i;return}function Cd(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;if((a[b+7|0]|0)!=0){f=b;g=d[5888+(d[f]|0)|0]|0;h=(d[5888+(d[Vb[c[b+28>>2]&127](b,0)|0]|0)|0]|0)+g|0;g=b+10|0;j=h+((a[g]|0)!=0)&65535;a[f]=a[6144+((j>>>0)%100|0)|0]|0;a[g]=j>>>0>99|0;i=e;return}j=a[Vb[c[b+28>>2]&127](b,0)|0]|0;g=b;f=a[g]|0;h=f&255;k=b+10|0;l=(h+(j&255)&65535)+((a[k]|0)!=0)<<16>>16;if((f^j)<<24>>24<0){m=0}else{m=(l&65535^h)>>>7&1}a[b+5|0]=m;m=l&255;a[g]=m;a[k]=(l&65535)>>>8;a[b+9|0]=m<<24>>24==0|0;a[b+4|0]=l&128;i=e;return}function Dd(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=b;g=a[f]&e;a[f]=g;a[b+9|0]=g<<24>>24==0|0;a[b+4|0]=g&128;i=d;return}function Ed(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=b;g=a[f]|0;h=g^e;a[f]=h;a[b+9|0]=g<<24>>24==e<<24>>24|0;a[b+4|0]=h&128;i=d;return}function Fd(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=b;g=a[f]|e;a[f]=g;a[b+9|0]=g<<24>>24==0|0;a[b+4|0]=g&128;i=d;return}function Gd(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;if((a[b+7|0]|0)!=0){f=b;g=(d[5888+(d[f]|0)|0]|0)+100|0;h=g-(d[5888+(d[Vb[c[b+28>>2]&127](b,0)|0]|0)|0]|0)|0;g=b+10|0;j=h+(((a[g]|0)==0)<<31>>31)|0;a[f]=a[6144+((j|0)%100|0)|0]|0;a[g]=(j|0)>99|0;i=e;return}j=d[Vb[c[b+28>>2]&127](b,0)|0]^255;g=b;f=d[g]|0;h=b+10|0;k=(f+j&65535)+((a[h]|0)!=0)<<16>>16;if(((f^j)&128|0)==0){l=(k&65535^f)>>>7&1}else{l=0}a[b+5|0]=l;l=k&255;a[g]=l;a[h]=(k&65535)>>>8;a[b+9|0]=l<<24>>24==0|0;a[b+4|0]=k&128;i=e;return}function Hd(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;i=i+8|0;e=d;f=b+28|0;a[e]=(a[Vb[c[f>>2]&127](b,0)|0]|0)+ -1<<24>>24;g=a[Vb[c[f>>2]&127](b,e)|0]|0;a[b+9|0]=g<<24>>24==0|0;a[b+4|0]=g&128;i=d;return}function Id(b){b=b|0;var c=0,d=0;c=b+1|0;d=(a[c]|0)+ -1<<24>>24;a[c]=d;a[b+9|0]=d<<24>>24==0|0;a[b+4|0]=d&128;i=i;return}function Jd(b){b=b|0;var c=0,d=0;c=b+2|0;d=(a[c]|0)+ -1<<24>>24;a[c]=d;a[b+9|0]=d<<24>>24==0|0;a[b+4|0]=d&128;i=i;return}function Kd(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;i=i+8|0;e=d;f=b+28|0;a[e]=(a[Vb[c[f>>2]&127](b,0)|0]|0)+1<<24>>24;g=a[Vb[c[f>>2]&127](b,e)|0]|0;a[b+9|0]=g<<24>>24==0|0;a[b+4|0]=g&128;i=d;return}function Ld(b){b=b|0;var c=0,d=0;c=b+1|0;d=(a[c]|0)+1<<24>>24;a[c]=d;a[b+9|0]=d<<24>>24==0|0;a[b+4|0]=d&128;i=i;return}function Md(b){b=b|0;var c=0,d=0;c=b+2|0;d=(a[c]|0)+1<<24>>24;a[c]=d;a[b+9|0]=d<<24>>24==0|0;a[b+4|0]=d&128;i=i;return}function Nd(b){b=b|0;var e=0,f=0,g=0,h=0;e=i;i=i+8|0;f=e;g=b+28|0;h=d[Vb[c[g>>2]&127](b,0)|0]|0;a[b+10|0]=h&128;a[f]=h<<1;h=a[Vb[c[g>>2]&127](b,f)|0]|0;a[b+9|0]=h<<24>>24==0|0;a[b+4|0]=h&128;i=e;return}function Od(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;i=i+8|0;e=d;f=b+28|0;g=a[Vb[c[f>>2]&127](b,0)|0]|0;a[b+10|0]=g&1;a[e]=(g&255)>>>1;g=a[Vb[c[f>>2]&127](b,e)|0]|0;a[b+9|0]=g<<24>>24==0|0;a[b+4|0]=g&128;i=d;return}function Pd(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;i=i+8|0;f=e;g=b+10|0;h=a[g]|0;j=b+28|0;k=d[Vb[c[j>>2]&127](b,0)|0]|0;a[g]=k&128;a[f]=k<<1|h<<24>>24!=0;h=a[Vb[c[j>>2]&127](b,f)|0]|0;a[b+9|0]=h<<24>>24==0|0;a[b+4|0]=h&128;i=e;return}function Qd(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;i=i+8|0;e=d;f=b+10|0;g=a[f]|0;h=b+28|0;j=a[Vb[c[h>>2]&127](b,0)|0]|0;a[e]=j;a[f]=j&1;f=(j&255)>>>1;if(g<<24>>24==0){k=f}else{k=(f&255|128)&255}a[e]=k;k=a[Vb[c[h>>2]&127](b,e)|0]|0;a[b+9|0]=k<<24>>24==0|0;a[b+4|0]=k&128;i=d;return}function Rd(b){b=b|0;var d=0,e=0,f=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=e&255;a[b+9|0]=(a[b]&e)<<24>>24==0|0;a[b+5|0]=f&64;a[b+4|0]=f&128;i=d;return}function Sd(b){b=b|0;var d=0,e=0,f=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=a[b]|0;a[b+9|0]=f<<24>>24==e<<24>>24|0;a[b+4|0]=(f&255)-(e&255)&128;a[b+10|0]=(f&255)>=(e&255)|0;i=d;return}function Td(b){b=b|0;var d=0,e=0,f=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=a[b+1|0]|0;a[b+9|0]=f<<24>>24==e<<24>>24|0;a[b+4|0]=(f&255)-(e&255)&128;a[b+10|0]=(f&255)>=(e&255)|0;i=d;return}function Ud(b){b=b|0;var d=0,e=0,f=0;d=i;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=a[b+2|0]|0;a[b+9|0]=f<<24>>24==e<<24>>24|0;a[b+4|0]=(f&255)-(e&255)&128;a[b+10|0]=(f&255)>=(e&255)|0;i=d;return}function Vd(d){d=d|0;var f=0,g=0,h=0;f=i;if((a[d+10|0]|0)!=0){i=f;return}g=a[Vb[c[d+28>>2]&127](d,0)|0]|0;h=d+12|0;b[h>>1]=(e[h>>1]|0)+g;i=f;return}function Wd(d){d=d|0;var f=0,g=0,h=0;f=i;if((a[d+10|0]|0)==0){i=f;return}g=a[Vb[c[d+28>>2]&127](d,0)|0]|0;h=d+12|0;b[h>>1]=(e[h>>1]|0)+g;i=f;return}function Xd(d){d=d|0;var f=0,g=0,h=0;f=i;if((a[d+9|0]|0)==0){i=f;return}g=a[Vb[c[d+28>>2]&127](d,0)|0]|0;h=d+12|0;b[h>>1]=(e[h>>1]|0)+g;i=f;return}function Yd(d){d=d|0;var f=0,g=0,h=0;f=i;if((a[d+4|0]|0)==0){i=f;return}g=a[Vb[c[d+28>>2]&127](d,0)|0]|0;h=d+12|0;b[h>>1]=(e[h>>1]|0)+g;i=f;return}function Zd(d){d=d|0;var f=0,g=0,h=0;f=i;if((a[d+9|0]|0)!=0){i=f;return}g=a[Vb[c[d+28>>2]&127](d,0)|0]|0;h=d+12|0;b[h>>1]=(e[h>>1]|0)+g;i=f;return}function _d(d){d=d|0;var f=0,g=0,h=0;f=i;if((a[d+4|0]|0)!=0){i=f;return}g=a[Vb[c[d+28>>2]&127](d,0)|0]|0;h=d+12|0;b[h>>1]=(e[h>>1]|0)+g;i=f;return}function $d(d){d=d|0;var f=0,g=0,h=0;f=i;if((a[d+5|0]|0)!=0){i=f;return}g=a[Vb[c[d+28>>2]&127](d,0)|0]|0;h=d+12|0;b[h>>1]=(e[h>>1]|0)+g;i=f;return}function ae(d){d=d|0;var f=0,g=0,h=0;f=i;if((a[d+5|0]|0)==0){i=f;return}g=a[Vb[c[d+28>>2]&127](d,0)|0]|0;h=d+12|0;b[h>>1]=(e[h>>1]|0)+g;i=f;return}function be(b){b=b|0;var c=0;c=i;df(b);a[b+6|0]=1;i=c;return}function ce(a){a=a|0;var d=0,e=0;d=i;e=Vb[c[a+28>>2]&127](a,0)|0;b[a+12>>1]=e-(c[a+16>>2]|0);i=d;return}function de(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;h=f+12|0;j=(e[h>>1]|0)+65535|0;k=f+3|0;l=f+16|0;a[(c[l>>2]|0)+(d[k]|0|256)|0]=j>>>8;m=(a[k]|0)+ -1<<24>>24;a[k]=m;a[(c[l>>2]|0)+(m&255|256)|0]=j;a[k]=(a[k]|0)+ -1<<24>>24;k=Vb[c[f+28>>2]&127](f,0)|0;b[h>>1]=k-(c[l>>2]|0);i=g;return}function ee(a){a=a|0;i=i;return}function fe(e){e=e|0;var f=0,g=0,h=0,j=0,k=0;f=e+3|0;g=a[f]|0;h=g+1<<24>>24;a[f]=h;j=c[e+16>>2]|0;k=d[j+(h&255|256)|0]|0;a[e+4|0]=k&128;a[e+5|0]=k&64;a[e+6|0]=k&16;a[e+7|0]=k&8;a[e+8|0]=k&4;a[e+9|0]=k&2;a[e+10|0]=k&1;k=g+2<<24>>24;a[f]=k;h=a[j+(k&255|256)|0]|0;k=e+12|0;b[k>>1]=h&255;e=g+3<<24>>24;a[f]=e;b[k>>1]=h&255|(d[j+(e&255|256)|0]|0)<<8;i=i;return}function ge(e){e=e|0;var f=0,g=0,h=0,j=0,k=0;f=e+3|0;g=a[f]|0;h=g+1<<24>>24;a[f]=h;j=c[e+16>>2]|0;k=a[j+(h&255|256)|0]|0;h=e+12|0;b[h>>1]=k&255;e=g+2<<24>>24;a[f]=e;b[h>>1]=((k&255|(d[j+(e&255|256)|0]|0)<<8)&65535)+1<<16>>16;i=i;return}function he(b){b=b|0;a[b+10|0]=0;i=i;return}function ie(b){b=b|0;a[b+7|0]=0;i=i;return}function je(b){b=b|0;a[b+8|0]=0;i=i;return}function ke(b){b=b|0;a[b+5|0]=0;i=i;return}function le(b){b=b|0;a[b+10|0]=1;i=i;return}function me(b){b=b|0;a[b+7|0]=1;i=i;return}function ne(b){b=b|0;a[b+8|0]=1;i=i;return}function oe(b){b=b|0;var e=0;e=b+3|0;a[(c[b+16>>2]|0)+(d[e]|0|256)|0]=a[b]|0;a[e]=(a[e]|0)+ -1<<24>>24;i=i;return}function pe(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=(a[b+4|0]|0)==0?32:-96;if((a[b+5|0]|0)==0){f=e}else{f=(e&255|64)&255}if((a[b+6|0]|0)==0){g=f}else{g=(f&255|16)&255}if((a[b+7|0]|0)==0){h=g}else{h=(g&255|8)&255}if((a[b+8|0]|0)==0){j=h}else{j=(h&255|4)&255}if((a[b+9|0]|0)==0){k=j}else{k=(j&255|2)&255}if((a[b+10|0]|0)==0){l=k}else{l=(k&255|1)&255}k=b+3|0;a[(c[b+16>>2]|0)+(d[k]|256)|0]=l;a[k]=(a[k]|0)+ -1<<24>>24;i=i;return}function qe(b){b=b|0;var d=0,e=0;d=b+3|0;e=(a[d]|0)+1<<24>>24;a[d]=e;d=a[(c[b+16>>2]|0)+(e&255|256)|0]|0;a[b]=d;a[b+9|0]=d<<24>>24==0|0;a[b+4|0]=d&128;i=i;return}function re(b){b=b|0;var e=0,f=0;e=b+3|0;f=(a[e]|0)+1<<24>>24;a[e]=f;e=d[(c[b+16>>2]|0)+(f&255|256)|0]|0;a[b+4|0]=e&128;a[b+5|0]=e&64;a[b+6|0]=e&16;a[b+7|0]=e&8;a[b+8|0]=e&4;a[b+9|0]=e&2;a[b+10|0]=e&1;i=i;return}function se(a){a=a|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+8|0;g=f;f=i;i=i+8|0;h=a+12|0;j=a+3|0;k=d[j]|0;c[f>>2]=(e[h>>1]|0)+ -1;c[f+4>>2]=k;Ra(7720,f|0)|0;f=a+16|0;k=(d[j]|0)+ -10|0;while(1){l=k&255;m=d[(c[f>>2]|0)+(l|256)|0]|0;c[g>>2]=l;c[g+4>>2]=m;Ra(7752,g|0)|0;if((k|0)<((d[j]|0)+9|0)){k=k+1|0}else{break}}k=b[h>>1]|0;j=(k&65535)+ -30|0;if((j|0)<65536){n=k;o=j}else{va(7768)|0;cb(-1)}while(1){if((o|0)>=((n&65535)+30|0)){p=7;break}j=((_e(a,o&65535)|0)&65535)+o|0;if((j|0)>=65536){p=7;break}n=b[h>>1]|0;o=j}if((p|0)==7){va(7768)|0;cb(-1)}}function te(b){b=b|0;var d=0,e=0;d=i;va(7776)|0;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;a[b+1|0]=e;a[b]=e;a[b+9|0]=e<<24>>24==0|0;a[b+4|0]=e&128;i=d;return}function ue(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+8|0;e=d;f=b+28|0;g=a[Vb[c[f>>2]&127](b,0)|0]|0;va(7784)|0;h=g&255;a[b+10|0]=h&128;a[e]=h<<1;h=a[Vb[c[f>>2]&127](b,e)|0]|0;e=b;f=a[e]|h;a[e]=f;a[b+9|0]=f<<24>>24==0|0;a[b+4|0]=f&128;i=d;return}function ve(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;va(7792)|0;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=b;g=a[f]&e;a[f]=g;a[b+1|0]=g;a[b+9|0]=g<<24>>24==0|0;a[b+4|0]=g&128;i=d;return}function we(b){b=b|0;var d=0,e=0,f=0;d=i;i=i+8|0;e=d;va(7800)|0;a[e]=a[b]&a[b+1|0];Vb[c[b+28>>2]&127](b,e)|0;f=a[e]|0;a[b+9|0]=f<<24>>24==0|0;a[b+4|0]=f&128;i=d;return}function xe(a){a=a|0;var b=0;b=i;va(7808)|0;Vb[c[a+28>>2]&127](a,0)|0;i=b;return}function ye(a){a=a|0;var b=0;b=i;va(7816)|0;Vb[c[a+28>>2]&127](a,0)|0;i=b;return}function ze(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;va(7824)|0;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=b;g=a[f]&e;a[b+10|0]=g&1;e=(g&255)>>>1;a[f]=e;a[b+9|0]=e<<24>>24==0|0;a[b+4|0]=0;i=d;return}function Ae(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;i=i+8|0;f=e;g=b+28|0;a[f]=a[Vb[c[g>>2]&127](b,0)|0]|0;va(7832)|0;a[f]=(a[f]|0)+1<<24>>24;Vb[c[g>>2]&127](b,f)|0;f=b;h=d[f]|0;if((a[b+7|0]|0)!=0){j=(d[5888+h|0]|0)+100|0;k=j-(d[5888+(d[Vb[c[g>>2]&127](b,0)|0]|0)|0]|0)|0;j=b+10|0;l=k+(((a[j]|0)==0)<<31>>31)|0;a[f]=a[6144+((l|0)%100|0)|0]|0;a[j]=(l|0)>99|0;i=e;return}l=(d[Vb[c[g>>2]&127](b,0)|0]^255)+h|0;h=l&65535;g=b+10|0;if((a[g]|0)==0){m=l&255;n=(h&65535)>>>8&255}else{l=h+1<<16>>16;m=l&255;n=(l&65535)>>>8&255}a[f]=m;a[g]=n;a[b+9|0]=m<<24>>24==0|0;g=m&255;a[b+4|0]=g&128;a[b+5|0]=n<<24>>24!=0^g>>>7;i=e;return}function Be(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+8|0;e=d;f=b+28|0;g=a[Vb[c[f>>2]&127](b,0)|0]|0;va(7840)|0;a[b+10|0]=g&1;a[e]=(g&255)>>>1;g=a[Vb[c[f>>2]&127](b,e)|0]|0;e=b;f=a[e]|0;h=f^g;a[e]=h;a[b+9|0]=f<<24>>24==g<<24>>24|0;a[b+4|0]=h&128;i=d;return}function Ce(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+8|0;e=d;f=b+28|0;g=a[Vb[c[f>>2]&127](b,0)|0]|0;va(7848)|0;h=g&255;a[b+10|0]=h&128;a[e]=h<<1;h=a[Vb[c[f>>2]&127](b,e)|0]|0;e=b;f=a[e]&h;a[e]=f;a[b+9|0]=f<<24>>24==0|0;a[b+4|0]=f&128;i=d;return}function De(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;va(7856)|0;e=a[Vb[c[b+28>>2]&127](b,0)|0]|0;f=b;g=a[f]&e;a[f]=g;a[b+9|0]=g<<24>>24==0|0;f=g&255&128;a[b+4|0]=f;a[b+10|0]=f;i=d;return}function Ee(b){b=b|0;var d=0,e=0,f=0,g=0;d=i;va(7864)|0;e=b;a[e]=a[b+1|0]|0;f=a[Vb[c[b+28>>2]&127](b,0)|0]|0;g=a[e]&f;a[e]=g;a[b+9|0]=g<<24>>24==0|0;a[b+4|0]=g&128;i=d;return}function Fe(a){a=a|0;var c=0,d=0;c=a+12|0;d=b[c>>1]|0;b[c>>1]=d+1<<16>>16;b[a+32>>1]=d;i=i;return}function Ge(e){e=e|0;var f=0,g=0,h=0,j=0,k=0;f=e+12|0;g=b[f>>1]|0;h=g+1<<16>>16;b[f>>1]=h;j=c[e+16>>2]|0;k=a[j+(g&65535)|0]|0;b[f>>1]=g+2<<16>>16;b[e+32>>1]=(d[j+(h&65535)|0]|0)<<8|k&255;i=i;return}function He(a){a=a|0;var e=0,f=0;e=a+12|0;f=b[e>>1]|0;b[e>>1]=f+1<<16>>16;b[a+32>>1]=d[(c[a+16>>2]|0)+(f&65535)|0]|0;i=i;return}function Ie(a){a=a|0;c[a+28>>2]=65;i=i;return}function Je(a){a=a|0;c[a+28>>2]=66;i=i;return}function Ke(a){a=a|0;var e=0,f=0,g=0;e=a+12|0;f=b[e>>1]|0;b[e>>1]=f+1<<16>>16;e=c[a+16>>2]|0;g=(d[a+1|0]|0)+(d[e+(f&65535)|0]|0)|0;b[a+32>>1]=(d[e+(g+1&255)|0]|0)<<8|(d[e+(g&255)|0]|0);i=i;return}function Le(a){a=a|0;var e=0,f=0,g=0;e=a+12|0;f=b[e>>1]|0;b[e>>1]=f+1<<16>>16;e=c[a+16>>2]|0;g=d[e+(f&65535)|0]|0;b[a+32>>1]=((d[e+(g+1&255)|0]|0)<<8|(d[e+g|0]|0))+(d[a+2|0]|0);i=i;return}function Me(a){a=a|0;var e=0,f=0;e=a+12|0;f=b[e>>1]|0;b[e>>1]=f+1<<16>>16;b[a+32>>1]=(d[a+1|0]|0)+(d[(c[a+16>>2]|0)+(f&65535)|0]|0)&255;i=i;return}function Ne(a){a=a|0;var e=0,f=0;e=a+12|0;f=b[e>>1]|0;b[e>>1]=f+1<<16>>16;b[a+32>>1]=(d[a+2|0]|0)+(d[(c[a+16>>2]|0)+(f&65535)|0]|0)&255;i=i;return}function Oe(e){e=e|0;var f=0,g=0,h=0,j=0,k=0;f=e+12|0;g=b[f>>1]|0;h=g+1<<16>>16;b[f>>1]=h;j=c[e+16>>2]|0;k=a[j+(g&65535)|0]|0;b[f>>1]=g+2<<16>>16;b[e+32>>1]=((d[j+(h&65535)|0]|0)<<8|k&255)+(d[e+1|0]|0);i=i;return}function Pe(e){e=e|0;var f=0,g=0,h=0,j=0,k=0;f=e+12|0;g=b[f>>1]|0;h=g+1<<16>>16;b[f>>1]=h;j=c[e+16>>2]|0;k=a[j+(g&65535)|0]|0;b[f>>1]=g+2<<16>>16;b[e+32>>1]=((d[j+(h&65535)|0]|0)<<8|k&255)+(d[e+2|0]|0);i=i;return}function Qe(a){a=a|0;var c=0,d=0;c=a+12|0;d=b[c>>1]|0;b[c>>1]=d+1<<16>>16;b[a+32>>1]=d;i=i;return}function Re(e){e=e|0;var f=0,g=0,h=0,j=0,k=0;f=e+12|0;g=b[f>>1]|0;h=g+1<<16>>16;b[f>>1]=h;j=c[e+16>>2]|0;k=a[j+(g&65535)|0]|0;b[f>>1]=g+2<<16>>16;g=(d[j+(h&65535)|0]|0)<<8;h=k&255;b[e+32>>1]=(d[j+(g|h+1&255)|0]|0)<<8|(d[j+(g|h)|0]|0);i=i;return}function Se(){var b=0,c=0,e=0,f=0;b=i;c=0;while(1){a[6248+(c*3|0)|0]=56;a[6249+(c*3|0)|0]=4;a[6250+(c*3|0)|0]=2;e=c+1|0;if((e|0)==256){f=0;break}else{c=e}}do{c=d[3928+(f<<2)|0]|0;a[6248+(c*3|0)|0]=a[3929+(f<<2)|0]|0;a[6249+(c*3|0)|0]=a[3931+(f<<2)|0]|0;a[6250+(c*3|0)|0]=a[3930+(f<<2)|0]|0;f=f+1|0;}while((f|0)!=221);i=b;return}function Te(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0,j=0;a=i;b=Nf(80)|0;d=b;if((b|0)==0){e=0;i=a;return e|0}f=b+0|0;g=f+80|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=b+56|0;c[f>>2]=-1;c[f+4>>2]=-1;f=Nf(65536)|0;c[b+16>>2]=f;if((f|0)==0){Of(b);e=0;i=a;return e|0}Sf(f|0,0,65536)|0;g=Nf(65536)|0;c[b+20>>2]=g;if((g|0)==0){Of(f);Of(b);e=0;i=a;return e|0}Sf(g|0,0,65536)|0;h=Nf(262144)|0;j=h;c[b+24>>2]=j;if((h|0)==0){Of(g);Of(f);Of(b);e=0;i=a;return e|0}else{b=0;while(1){c[j+(b<<2)>>2]=66;f=b+1|0;if((f|0)==65536){e=d;break}else{b=f}}i=a;return e|0}return 0}function Ue(b,d){b=b|0;d=d|0;var f=0,g=0,h=0,j=0;if((d|0)==0){f=b+16|0;g=b+32|0}else{h=b+32|0;j=b+16|0;a[(c[j>>2]|0)+(e[h>>1]|0)|0]=a[d]|0;f=j;g=h}i=i;return(c[f>>2]|0)+(e[g>>1]|0)|0}function Ve(a){a=a|0;var b=0,d=0;b=i;d=c[a+72>>2]|0;if((d|0)!=0){Of(d)}Of(c[a+24>>2]|0);Of(c[a+20>>2]|0);Of(c[a+16>>2]|0);Of(a);i=b;return}function We(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;if((b&65535)>(d&65535)){i=e;return}f=a+24|0;a=d&65535;d=b&65535;while(1){c[(c[f>>2]|0)+(d<<2)>>2]=67;if((d|0)==(a|0)){break}else{d=d+1|0}}i=e;return}function Xe(a,b){a=a|0;b=b|0;i=i;return(c[a+16>>2]|0)+(e[a+32>>1]|0)|0}function Ye(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;if((b&65535)>(d&65535)){i=e;return}f=a+24|0;a=d&65535;d=b&65535;while(1){c[(c[f>>2]|0)+(d<<2)>>2]=66;if((d|0)==(a|0)){break}else{d=d+1|0}}i=e;return}function Ze(a,b,d){a=a|0;b=b|0;d=d|0;c[(c[a+24>>2]|0)+((b&65535)<<2)>>2]=d;i=i;return}function _e(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;f=i;i=i+8|0;g=f;h=i;i=i+16|0;j=i;i=i+16|0;k=i;i=i+16|0;l=i;i=i+16|0;m=i;i=i+16|0;n=i;i=i+16|0;o=i;i=i+16|0;p=i;i=i+16|0;q=i;i=i+8|0;r=i;i=i+16|0;s=i;i=i+16|0;t=i;i=i+16|0;u=i;i=i+8|0;v=e&65535;e=c[b+16>>2]|0;b=e+v|0;w=d[b]|0;c[u>>2]=v;c[u+4>>2]=w;Ra(7016,u|0)|0;u=d[b]|0;b=c[5272+((d[6248+(u*3|0)|0]|0)<<2)>>2]|0;switch(d[6249+(u*3|0)|0]|0|0){case 3:{c[q>>2]=b;Ra(7104,q|0)|0;x=1;i=f;return x|0};case 10:{q=d[e+(v+1)|0]|0;u=d[e+(v+2)|0]|0;c[k>>2]=q;c[k+4>>2]=u;c[k+8>>2]=b;c[k+12>>2]=u<<8|q;Ra(7240,k|0)|0;x=3;i=f;return x|0};case 5:{k=d[e+(v+1)|0]|0;c[p>>2]=k;c[p+4>>2]=b;c[p+8>>2]=k;Ra(7120,p|0)|0;x=2;i=f;return x|0};case 1:{p=d[e+(v+1)|0]|0;k=d[e+(v+2)|0]|0;c[s>>2]=p;c[s+4>>2]=k;c[s+8>>2]=b;c[s+12>>2]=k<<8|p;Ra(7056,s|0)|0;x=3;i=f;return x|0};case 8:{s=d[e+(v+1)|0]|0;c[m>>2]=s;c[m+4>>2]=b;c[m+8>>2]=s;Ra(7192,m|0)|0;x=2;i=f;return x|0};case 6:{m=d[e+(v+1)|0]|0;c[o>>2]=m;c[o+4>>2]=b;c[o+8>>2]=m;Ra(7144,o|0)|0;x=2;i=f;return x|0};case 0:{o=d[e+(v+1)|0]|0;c[t>>2]=o;c[t+4>>2]=b;c[t+8>>2]=o;Ra(7032,t|0)|0;x=2;i=f;return x|0};case 2:{t=d[e+(v+1)|0]|0;c[r>>2]=t;c[r+4>>2]=b;c[r+8>>2]=t;Ra(7080,r|0)|0;x=2;i=f;return x|0};case 7:{r=d[e+(v+1)|0]|0;c[n>>2]=r;c[n+4>>2]=b;c[n+8>>2]=r;Ra(7168,n|0)|0;x=2;i=f;return x|0};case 9:{n=d[e+(v+1)|0]|0;r=d[e+(v+2)|0]|0;c[l>>2]=n;c[l+4>>2]=r;c[l+8>>2]=b;c[l+12>>2]=r<<8|n;Ra(7216,l|0)|0;x=3;i=f;return x|0};case 12:{l=d[e+(v+1)|0]|0;n=d[e+(v+2)|0]|0;c[h>>2]=l;c[h+4>>2]=n;c[h+8>>2]=b;c[h+12>>2]=n<<8|l;Ra(7288,h|0)|0;x=3;i=f;return x|0};case 11:{h=a[e+(v+1)|0]|0;c[j>>2]=h&255;c[j+4>>2]=b;c[j+8>>2]=v+2+(h<<24>>24)&65535;Ra(7264,j|0)|0;x=2;i=f;return x|0};default:{c[g>>2]=b;Ra(7312,g|0)|0;x=1;i=f;return x|0}}return 0}function $e(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;f=i;i=i+8|0;g=f;h=i;i=i+16|0;j=i;i=i+16|0;k=i;i=i+32|0;l=i;i=i+32|0;m=i;i=i+24|0;n=i;i=i+24|0;o=i;i=i+24|0;p=i;i=i+24|0;q=i;i=i+8|0;r=i;i=i+16|0;s=i;i=i+24|0;t=i;i=i+16|0;u=i;i=i+8|0;v=e&65535;e=b+16|0;w=c[e>>2]|0;x=w+v|0;y=d[x]|0;c[u>>2]=v;c[u+4>>2]=y;Ra(7016,u|0)|0;u=d[x]|0;x=c[5272+((d[6248+(u*3|0)|0]|0)<<2)>>2]|0;switch(d[6249+(u*3|0)|0]|0|0){case 12:{u=d[w+(v+1)|0]|0;y=d[w+(v+2)|0]|0;c[h>>2]=u;c[h+4>>2]=y;c[h+8>>2]=x;c[h+12>>2]=y<<8|u;Ra(7288,h|0)|0;z=3;i=f;return z|0};case 11:{h=a[w+(v+1)|0]|0;c[j>>2]=h&255;c[j+4>>2]=x;c[j+8>>2]=v+2+(h<<24>>24)&65535;Ra(7264,j|0)|0;z=2;i=f;return z|0};case 10:{j=d[w+(v+1)|0]|0;h=d[w+(v+2)|0]|0;u=(h<<8|j)+(d[b+2|0]|0)|0;y=d[(c[e>>2]|0)+u|0]|0;c[k>>2]=j;c[k+4>>2]=h;c[k+8>>2]=x;c[k+12>>2]=h;c[k+16>>2]=j;c[k+20>>2]=u;c[k+24>>2]=y;Ra(7600,k|0)|0;z=3;i=f;return z|0};case 9:{k=d[w+(v+1)|0]|0;y=d[w+(v+2)|0]|0;u=(y<<8|k)+(d[b+1|0]|0)|0;j=d[(c[e>>2]|0)+u|0]|0;c[l>>2]=k;c[l+4>>2]=y;c[l+8>>2]=x;c[l+12>>2]=y;c[l+16>>2]=k;c[l+20>>2]=u;c[l+24>>2]=j;Ra(7552,l|0)|0;z=3;i=f;return z|0};case 6:{l=d[w+(v+1)|0]|0;j=c[e>>2]|0;u=((d[j+(l+1)|0]|0)<<8|(d[j+l|0]|0))+(d[b+2|0]|0)|0;k=d[j+u|0]|0;c[o>>2]=l;c[o+4>>2]=x;c[o+8>>2]=l;c[o+12>>2]=u;c[o+16>>2]=k;Ra(7432,o|0)|0;z=2;i=f;return z|0};case 1:{o=d[w+(v+1)|0]|0;k=d[w+(v+2)|0]|0;u=k<<8|o;l=d[(c[e>>2]|0)+u|0]|0;c[s>>2]=o;c[s+4>>2]=k;c[s+8>>2]=x;c[s+12>>2]=u;c[s+16>>2]=l;Ra(7328,s|0)|0;z=3;i=f;return z|0};case 2:{s=d[w+(v+1)|0]|0;l=d[(c[e>>2]|0)+s|0]|0;c[r>>2]=s;c[r+4>>2]=x;c[r+8>>2]=s;c[r+12>>2]=l;Ra(7360,r|0)|0;z=2;i=f;return z|0};case 0:{r=d[w+(v+1)|0]|0;c[t>>2]=r;c[t+4>>2]=x;c[t+8>>2]=r;Ra(7032,t|0)|0;z=2;i=f;return z|0};case 3:{c[q>>2]=x;Ra(7104,q|0)|0;z=1;i=f;return z|0};case 8:{q=d[w+(v+1)|0]|0;t=(d[b+2|0]|0)+q&255;r=d[(c[e>>2]|0)+t|0]|0;c[m>>2]=q;c[m+4>>2]=x;c[m+8>>2]=q;c[m+12>>2]=t;c[m+16>>2]=r;Ra(7512,m|0)|0;z=2;i=f;return z|0};case 7:{m=d[w+(v+1)|0]|0;r=(d[b+1|0]|0)+m&255;t=d[(c[e>>2]|0)+r|0]|0;c[n>>2]=m;c[n+4>>2]=x;c[n+8>>2]=m;c[n+12>>2]=r;c[n+16>>2]=t;Ra(7472,n|0)|0;z=2;i=f;return z|0};case 5:{n=d[w+(v+1)|0]|0;v=(d[b+1|0]|0)+n&255;b=c[e>>2]|0;e=(d[b+(v+1)|0]|0)<<8|(d[b+v|0]|0);v=d[b+e|0]|0;c[p>>2]=n;c[p+4>>2]=x;c[p+8>>2]=n;c[p+12>>2]=e;c[p+16>>2]=v;Ra(7392,p|0)|0;z=2;i=f;return z|0};default:{c[g>>2]=x;Ra(7312,g|0)|0;z=1;i=f;return z|0}}return 0}function af(b){b=b|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;f=i;i=i+8|0;g=f;h=i;i=i+24|0;j=i;i=i+16|0;k=j;l=k+0|0;m=7648|0;n=l+9|0;do{a[l]=a[m]|0;l=l+1|0;m=m+1|0}while((l|0)<(n|0));m=d[b]|0;l=d[b+1|0]|0;n=d[b+2|0]|0;o=d[b+3|0]|0;p=b+4|0;q=(a[p]|0)==0?32:-96;r=b+5|0;if((a[r]|0)==0){s=q}else{s=(q&255|64)&255}q=b+6|0;if((a[q]|0)==0){t=s}else{t=(s&255|16)&255}s=b+7|0;if((a[s]|0)==0){u=t}else{u=(t&255|8)&255}t=b+8|0;if((a[t]|0)==0){v=u}else{v=(u&255|4)&255}u=b+9|0;if((a[u]|0)==0){w=v}else{w=(v&255|2)&255}v=b+10|0;if((a[v]|0)==0){x=w}else{x=(w&255|1)&255}c[h>>2]=e[b+12>>1]|0;c[h+4>>2]=m;c[h+8>>2]=l;c[h+12>>2]=n;c[h+16>>2]=o;c[h+20>>2]=x&255;Ra(7664,h|0)|0;if((a[p]|0)!=0){a[k]=78}if((a[r]|0)!=0){a[j+1|0]=86}if((a[q]|0)!=0){a[j+3|0]=66}if((a[s]|0)!=0){a[j+4|0]=68}if((a[t]|0)!=0){a[j+5|0]=73}if((a[u]|0)!=0){a[j+6|0]=90}if((a[v]|0)==0){y=g;c[y>>2]=k;Ra(7712,g|0)|0;i=f;return}a[j+7|0]=67;y=g;c[y>>2]=k;Ra(7712,g|0)|0;i=f;return}function bf(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;h=f+12|0;j=f+3|0;k=f+16|0;a[(c[k>>2]|0)+(d[j]|256)|0]=(e[h>>1]|0)>>>8;l=(a[j]|0)+ -1<<24>>24;a[j]=l;a[(c[k>>2]|0)+(l&255|256)|0]=b[h>>1];l=(a[j]|0)+ -1<<24>>24;a[j]=l;m=(a[f+4|0]|0)==0?32:-96;if((a[f+5|0]|0)==0){n=m}else{n=(m&255|64)&255}if((a[f+6|0]|0)==0){o=n}else{o=(n&255|16)&255}if((a[f+7|0]|0)==0){p=o}else{p=(o&255|8)&255}o=f+8|0;if((a[o]|0)==0){q=p}else{q=(p&255|4)&255}if((a[f+9|0]|0)==0){r=q}else{r=(q&255|2)&255}if((a[f+10|0]|0)==0){s=r}else{s=(r&255|1)&255}a[(c[k>>2]|0)+(l&255|256)|0]=s;a[j]=(a[j]|0)+ -1<<24>>24;a[o]=1;o=c[k>>2]|0;b[h>>1]=d[o+65531|0]<<8|d[o+65530|0];o=f+40|0;f=o;h=Uf(c[f>>2]|0,c[f+4>>2]|0,7,0)|0;f=o;c[f>>2]=h;c[f+4>>2]=E;i=g;return}function cf(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;h=f+12|0;j=f+3|0;k=f+16|0;a[(c[k>>2]|0)+(d[j]|256)|0]=(e[h>>1]|0)>>>8;l=(a[j]|0)+ -1<<24>>24;a[j]=l;a[(c[k>>2]|0)+(l&255|256)|0]=b[h>>1];l=(a[j]|0)+ -1<<24>>24;a[j]=l;m=(a[f+4|0]|0)==0?32:-96;if((a[f+5|0]|0)==0){n=m}else{n=(m&255|64)&255}if((a[f+6|0]|0)==0){o=n}else{o=(n&255|16)&255}if((a[f+7|0]|0)==0){p=o}else{p=(o&255|8)&255}o=f+8|0;if((a[o]|0)==0){q=p}else{q=(p&255|4)&255}if((a[f+9|0]|0)==0){r=q}else{r=(q&255|2)&255}if((a[f+10|0]|0)==0){s=r}else{s=(r&255|1)&255}a[(c[k>>2]|0)+(l&255|256)|0]=s;a[j]=(a[j]|0)+ -1<<24>>24;a[o]=1;o=c[k>>2]|0;b[h>>1]=d[o+65533|0]<<8|d[o+65532|0];o=f+40|0;f=o;h=Uf(c[f>>2]|0,c[f+4>>2]|0,7,0)|0;f=o;c[f>>2]=h;c[f+4>>2]=E;i=g;return}function df(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;g=i;h=f+8|0;j=f+68|0;k=a[j]|0;if((a[h]|0)!=0){a[j]=k+1<<24>>24;i=g;return}if(!(k<<24>>24==0)){a[j]=k+ -1<<24>>24}k=f+12|0;j=f+3|0;l=f+16|0;a[(c[l>>2]|0)+(d[j]|256)|0]=(e[k>>1]|0)>>>8;m=(a[j]|0)+ -1<<24>>24;a[j]=m;a[(c[l>>2]|0)+(m&255|256)|0]=b[k>>1];m=(a[j]|0)+ -1<<24>>24;a[j]=m;n=(a[f+4|0]|0)==0?32:-96;if((a[f+5|0]|0)==0){o=n}else{o=(n&255|64)&255}if((a[f+6|0]|0)==0){p=o}else{p=(o&255|16)&255}if((a[f+7|0]|0)==0){q=p}else{q=(p&255|8)&255}if((a[h]|0)==0){r=q}else{r=(q&255|4)&255}if((a[f+9|0]|0)==0){s=r}else{s=(r&255|2)&255}if((a[f+10|0]|0)==0){t=s}else{t=(s&255|1)&255}a[(c[l>>2]|0)+(m&255|256)|0]=t;a[j]=(a[j]|0)+ -1<<24>>24;a[h]=1;h=c[l>>2]|0;b[k>>1]=d[h+65535|0]<<8|d[h+65534|0];h=f+40|0;f=h;k=Uf(c[f>>2]|0,c[f+4>>2]|0,7,0)|0;f=h;c[f>>2]=k;c[f+4>>2]=E;i=g;return}function ef(f,g,h){f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;j=i;k=f+40|0;l=k;m=c[l>>2]|0;n=c[l+4>>2]|0;if(!(n>>>0<h>>>0|(n|0)==(h|0)&m>>>0<g>>>0)){o=m;p=n;E=p;i=j;return o|0}l=f+56|0;q=f+48|0;r=f+64|0;s=f+68|0;t=f+12|0;u=f+16|0;v=f+28|0;w=f+32|0;x=f+24|0;y=f+8|0;z=m;m=n;while(1){n=l;A=c[n+4>>2]|0;if(m>>>0<A>>>0|(m|0)==(A|0)&z>>>0<(c[n>>2]|0)>>>0){B=z;C=m}else{Ub[c[r>>2]&127](f);n=k;B=c[n>>2]|0;C=c[n+4>>2]|0}n=q;A=c[n+4>>2]|0;if(C>>>0<A>>>0|(C|0)==(A|0)&B>>>0<(c[n>>2]|0)>>>0){n=Uf(B|0,C|0,1,0)|0;A=E;D=k;c[D>>2]=n;c[D+4>>2]=A;z=n;m=A;continue}do{if((a[s]|0)!=0){if((a[y]|0)!=0){break}df(f)}}while(0);A=b[t>>1]|0;b[t>>1]=A+1<<16>>16;n=a[(c[u>>2]|0)+(A&65535)|0]|0;c[v>>2]=0;A=n&255;Ub[c[5832+((a[6249+(A*3|0)|0]&255)<<2)>>2]&127](f);if((c[v>>2]|0)==0){c[v>>2]=c[(c[x>>2]|0)+(e[w>>1]<<2)>>2]}Ub[c[5552+((a[6248+(A*3|0)|0]&255)<<2)>>2]&127](f);n=k;D=Uf(c[n>>2]|0,c[n+4>>2]|0,d[6250+(A*3|0)|0]|0,0)|0;A=E;n=k;c[n>>2]=D;c[n+4>>2]=A;if(A>>>0<h>>>0|(A|0)==(h|0)&D>>>0<g>>>0){z=D;m=A}else{o=D;p=A;break}}E=p;i=j;return o|0}function ff(b,c){b=b|0;c=c|0;var d=0,e=0;if((c|0)==0){d=b}else{e=b;a[e]=a[c]|0;d=e}i=i;return d|0}function gf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53248|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53248|0}function hf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53249|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53249|0}function jf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53250|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53250|0}function kf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53251|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53251|0}function lf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53252|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53252|0}function mf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53253|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53253|0}function nf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53254|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53254|0}function of(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53255|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53255|0}function pf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53256|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53256|0}function qf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53257|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53257|0}function rf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53258|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53258|0}function sf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53259|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53259|0}function tf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53260|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53260|0}function uf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53261|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53261|0}function vf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53262|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53262|0}function wf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53263|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53263|0}function xf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53264|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53264|0}function yf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53265|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53265|0}function zf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53266|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53266|0}function Af(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53267|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53267|0}function Bf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53268|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53268|0}function Cf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53269|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53269|0}function Df(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53270|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53270|0}function Ef(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53271|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53271|0}function Ff(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53272|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53272|0}function Gf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53273|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53273|0}function Hf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53274|0]=a[d]&254}i=i;return(c[b+16>>2]|0)+53274|0}function If(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53275|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53275|0}function Jf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53276|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53276|0}function Kf(b,d){b=b|0;d=d|0;if((d|0)!=0){a[(c[b+20>>2]|0)+53277|0]=a[d]|0}i=i;return(c[b+16>>2]|0)+53277|0}function Lf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;f=b+16|0;if((d|0)==0){g=c[f>>2]|0;h=g+53278|0;i=e;return h|0}a[(c[f>>2]|0)+53248|0]=0;a[(c[f>>2]|0)+53249|0]=0;a[(c[f>>2]|0)+53250|0]=0;a[(c[f>>2]|0)+53251|0]=0;a[(c[f>>2]|0)+53252|0]=0;a[(c[f>>2]|0)+53253|0]=0;a[(c[f>>2]|0)+53254|0]=0;a[(c[f>>2]|0)+53255|0]=0;a[(c[f>>2]|0)+53256|0]=0;a[(c[f>>2]|0)+53257|0]=0;a[(c[f>>2]|0)+53258|0]=0;a[(c[f>>2]|0)+53259|0]=0;a[(c[f>>2]|0)+53260|0]=0;a[(c[f>>2]|0)+53261|0]=0;a[(c[f>>2]|0)+53262|0]=0;a[(c[f>>2]|0)+53263|0]=0;a[(c[b+20>>2]|0)+53278|0]=a[d]|0;g=c[f>>2]|0;h=g+53278|0;i=e;return h|0}function Mf(d,e){d=d|0;e=e|0;var f=0,g=0;f=i;do{if((e|0)==0){if((b[d+12>>1]|0)==-15203){g=7872}else{break}i=f;return g|0}else{a[(c[d+20>>2]|0)+53279|0]=a[e]|0}}while(0);g=(c[d+16>>2]|0)+53279|0;i=f;return g|0}function Nf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,pa=0,qa=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0;b=i;do{if(a>>>0<245){if(a>>>0<11){d=16}else{d=a+11&-8}e=d>>>3;f=c[1970]|0;g=f>>>e;if((g&3|0)!=0){h=(g&1^1)+e|0;j=h<<1;k=7920+(j<<2)|0;l=7920+(j+2<<2)|0;j=c[l>>2]|0;m=j+8|0;n=c[m>>2]|0;do{if((k|0)==(n|0)){c[1970]=f&~(1<<h)}else{if(n>>>0<(c[7896>>2]|0)>>>0){tb()}o=n+12|0;if((c[o>>2]|0)==(j|0)){c[o>>2]=k;c[l>>2]=n;break}else{tb()}}}while(0);n=h<<3;c[j+4>>2]=n|3;l=j+(n|4)|0;c[l>>2]=c[l>>2]|1;p=m;i=b;return p|0}if(!(d>>>0>(c[7888>>2]|0)>>>0)){q=d;break}if((g|0)!=0){l=2<<e;n=g<<e&(l|0-l);l=(n&0-n)+ -1|0;n=l>>>12&16;k=l>>>n;l=k>>>5&8;o=k>>>l;k=o>>>2&4;r=o>>>k;o=r>>>1&2;s=r>>>o;r=s>>>1&1;t=(l|n|k|o|r)+(s>>>r)|0;r=t<<1;s=7920+(r<<2)|0;o=7920+(r+2<<2)|0;r=c[o>>2]|0;k=r+8|0;n=c[k>>2]|0;do{if((s|0)==(n|0)){c[1970]=f&~(1<<t)}else{if(n>>>0<(c[7896>>2]|0)>>>0){tb()}l=n+12|0;if((c[l>>2]|0)==(r|0)){c[l>>2]=s;c[o>>2]=n;break}else{tb()}}}while(0);n=t<<3;o=n-d|0;c[r+4>>2]=d|3;s=r;f=s+d|0;c[s+(d|4)>>2]=o|1;c[s+n>>2]=o;n=c[7888>>2]|0;if((n|0)!=0){s=c[7900>>2]|0;e=n>>>3;n=e<<1;g=7920+(n<<2)|0;m=c[1970]|0;j=1<<e;do{if((m&j|0)==0){c[1970]=m|j;u=7920+(n+2<<2)|0;v=g}else{e=7920+(n+2<<2)|0;h=c[e>>2]|0;if(!(h>>>0<(c[7896>>2]|0)>>>0)){u=e;v=h;break}tb()}}while(0);c[u>>2]=s;c[v+12>>2]=s;c[s+8>>2]=v;c[s+12>>2]=g}c[7888>>2]=o;c[7900>>2]=f;p=k;i=b;return p|0}n=c[7884>>2]|0;if((n|0)==0){q=d;break}j=(n&0-n)+ -1|0;n=j>>>12&16;m=j>>>n;j=m>>>5&8;r=m>>>j;m=r>>>2&4;t=r>>>m;r=t>>>1&2;h=t>>>r;t=h>>>1&1;e=c[8184+((j|n|m|r|t)+(h>>>t)<<2)>>2]|0;t=(c[e+4>>2]&-8)-d|0;h=e;r=e;while(1){e=c[h+16>>2]|0;if((e|0)==0){m=c[h+20>>2]|0;if((m|0)==0){break}else{w=m}}else{w=e}e=(c[w+4>>2]&-8)-d|0;m=e>>>0<t>>>0;t=m?e:t;h=w;r=m?w:r}h=r;k=c[7896>>2]|0;if(h>>>0<k>>>0){tb()}f=h+d|0;o=f;if(!(h>>>0<f>>>0)){tb()}f=c[r+24>>2]|0;g=c[r+12>>2]|0;do{if((g|0)==(r|0)){s=r+20|0;m=c[s>>2]|0;if((m|0)==0){e=r+16|0;n=c[e>>2]|0;if((n|0)==0){x=0;break}else{y=n;z=e}}else{y=m;z=s}while(1){s=y+20|0;m=c[s>>2]|0;if((m|0)!=0){z=s;y=m;continue}m=y+16|0;s=c[m>>2]|0;if((s|0)==0){break}else{y=s;z=m}}if(z>>>0<k>>>0){tb()}else{c[z>>2]=0;x=y;break}}else{m=c[r+8>>2]|0;if(m>>>0<k>>>0){tb()}s=m+12|0;if((c[s>>2]|0)!=(r|0)){tb()}e=g+8|0;if((c[e>>2]|0)==(r|0)){c[s>>2]=g;c[e>>2]=m;x=g;break}else{tb()}}}while(0);a:do{if((f|0)!=0){g=c[r+28>>2]|0;k=8184+(g<<2)|0;do{if((r|0)==(c[k>>2]|0)){c[k>>2]=x;if((x|0)!=0){break}c[7884>>2]=c[7884>>2]&~(1<<g);break a}else{if(f>>>0<(c[7896>>2]|0)>>>0){tb()}m=f+16|0;if((c[m>>2]|0)==(r|0)){c[m>>2]=x}else{c[f+20>>2]=x}if((x|0)==0){break a}}}while(0);if(x>>>0<(c[7896>>2]|0)>>>0){tb()}c[x+24>>2]=f;g=c[r+16>>2]|0;do{if((g|0)!=0){if(g>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[x+16>>2]=g;c[g+24>>2]=x;break}}}while(0);g=c[r+20>>2]|0;if((g|0)==0){break}if(g>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[x+20>>2]=g;c[g+24>>2]=x;break}}}while(0);if(t>>>0<16){f=t+d|0;c[r+4>>2]=f|3;g=h+(f+4)|0;c[g>>2]=c[g>>2]|1}else{c[r+4>>2]=d|3;c[h+(d|4)>>2]=t|1;c[h+(t+d)>>2]=t;g=c[7888>>2]|0;if((g|0)!=0){f=c[7900>>2]|0;k=g>>>3;g=k<<1;m=7920+(g<<2)|0;e=c[1970]|0;s=1<<k;do{if((e&s|0)==0){c[1970]=e|s;A=7920+(g+2<<2)|0;B=m}else{k=7920+(g+2<<2)|0;n=c[k>>2]|0;if(!(n>>>0<(c[7896>>2]|0)>>>0)){A=k;B=n;break}tb()}}while(0);c[A>>2]=f;c[B+12>>2]=f;c[f+8>>2]=B;c[f+12>>2]=m}c[7888>>2]=t;c[7900>>2]=o}p=r+8|0;i=b;return p|0}else{if(a>>>0>4294967231){q=-1;break}g=a+11|0;s=g&-8;e=c[7884>>2]|0;if((e|0)==0){q=s;break}h=0-s|0;n=g>>>8;do{if((n|0)==0){C=0}else{if(s>>>0>16777215){C=31;break}g=(n+1048320|0)>>>16&8;k=n<<g;j=(k+520192|0)>>>16&4;l=k<<j;k=(l+245760|0)>>>16&2;D=14-(j|g|k)+(l<<k>>>15)|0;C=s>>>(D+7|0)&1|D<<1}}while(0);n=c[8184+(C<<2)>>2]|0;b:do{if((n|0)==0){E=h;F=0;G=0}else{if((C|0)==31){H=0}else{H=25-(C>>>1)|0}r=h;o=0;t=s<<H;m=n;f=0;while(1){D=c[m+4>>2]&-8;k=D-s|0;if(k>>>0<r>>>0){if((D|0)==(s|0)){E=k;F=m;G=m;break b}else{I=k;J=m}}else{I=r;J=f}k=c[m+20>>2]|0;D=c[m+(t>>>31<<2)+16>>2]|0;l=(k|0)==0|(k|0)==(D|0)?o:k;if((D|0)==0){E=I;F=l;G=J;break}else{r=I;o=l;t=t<<1;m=D;f=J}}}}while(0);if((F|0)==0&(G|0)==0){n=2<<C;h=e&(n|0-n);if((h|0)==0){q=s;break}n=(h&0-h)+ -1|0;h=n>>>12&16;f=n>>>h;n=f>>>5&8;m=f>>>n;f=m>>>2&4;t=m>>>f;m=t>>>1&2;o=t>>>m;t=o>>>1&1;K=c[8184+((n|h|f|m|t)+(o>>>t)<<2)>>2]|0}else{K=F}if((K|0)==0){L=E;M=G}else{t=E;o=K;m=G;while(1){f=(c[o+4>>2]&-8)-s|0;h=f>>>0<t>>>0;n=h?f:t;f=h?o:m;h=c[o+16>>2]|0;if((h|0)!=0){N=f;O=n;m=N;o=h;t=O;continue}h=c[o+20>>2]|0;if((h|0)==0){L=n;M=f;break}else{N=f;O=n;o=h;m=N;t=O}}}if((M|0)==0){q=s;break}if(!(L>>>0<((c[7888>>2]|0)-s|0)>>>0)){q=s;break}t=M;m=c[7896>>2]|0;if(t>>>0<m>>>0){tb()}o=t+s|0;e=o;if(!(t>>>0<o>>>0)){tb()}h=c[M+24>>2]|0;n=c[M+12>>2]|0;do{if((n|0)==(M|0)){f=M+20|0;r=c[f>>2]|0;if((r|0)==0){D=M+16|0;l=c[D>>2]|0;if((l|0)==0){P=0;break}else{Q=l;R=D}}else{Q=r;R=f}while(1){f=Q+20|0;r=c[f>>2]|0;if((r|0)!=0){R=f;Q=r;continue}r=Q+16|0;f=c[r>>2]|0;if((f|0)==0){break}else{Q=f;R=r}}if(R>>>0<m>>>0){tb()}else{c[R>>2]=0;P=Q;break}}else{r=c[M+8>>2]|0;if(r>>>0<m>>>0){tb()}f=r+12|0;if((c[f>>2]|0)!=(M|0)){tb()}D=n+8|0;if((c[D>>2]|0)==(M|0)){c[f>>2]=n;c[D>>2]=r;P=n;break}else{tb()}}}while(0);c:do{if((h|0)!=0){n=c[M+28>>2]|0;m=8184+(n<<2)|0;do{if((M|0)==(c[m>>2]|0)){c[m>>2]=P;if((P|0)!=0){break}c[7884>>2]=c[7884>>2]&~(1<<n);break c}else{if(h>>>0<(c[7896>>2]|0)>>>0){tb()}r=h+16|0;if((c[r>>2]|0)==(M|0)){c[r>>2]=P}else{c[h+20>>2]=P}if((P|0)==0){break c}}}while(0);if(P>>>0<(c[7896>>2]|0)>>>0){tb()}c[P+24>>2]=h;n=c[M+16>>2]|0;do{if((n|0)!=0){if(n>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[P+16>>2]=n;c[n+24>>2]=P;break}}}while(0);n=c[M+20>>2]|0;if((n|0)==0){break}if(n>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[P+20>>2]=n;c[n+24>>2]=P;break}}}while(0);d:do{if(L>>>0<16){h=L+s|0;c[M+4>>2]=h|3;n=t+(h+4)|0;c[n>>2]=c[n>>2]|1}else{c[M+4>>2]=s|3;c[t+(s|4)>>2]=L|1;c[t+(L+s)>>2]=L;n=L>>>3;if(L>>>0<256){h=n<<1;m=7920+(h<<2)|0;r=c[1970]|0;D=1<<n;do{if((r&D|0)==0){c[1970]=r|D;S=7920+(h+2<<2)|0;T=m}else{n=7920+(h+2<<2)|0;f=c[n>>2]|0;if(!(f>>>0<(c[7896>>2]|0)>>>0)){S=n;T=f;break}tb()}}while(0);c[S>>2]=e;c[T+12>>2]=e;c[t+(s+8)>>2]=T;c[t+(s+12)>>2]=m;break}h=o;D=L>>>8;do{if((D|0)==0){U=0}else{if(L>>>0>16777215){U=31;break}r=(D+1048320|0)>>>16&8;f=D<<r;n=(f+520192|0)>>>16&4;l=f<<n;f=(l+245760|0)>>>16&2;k=14-(n|r|f)+(l<<f>>>15)|0;U=L>>>(k+7|0)&1|k<<1}}while(0);D=8184+(U<<2)|0;c[t+(s+28)>>2]=U;c[t+(s+20)>>2]=0;c[t+(s+16)>>2]=0;m=c[7884>>2]|0;k=1<<U;if((m&k|0)==0){c[7884>>2]=m|k;c[D>>2]=h;c[t+(s+24)>>2]=D;c[t+(s+12)>>2]=h;c[t+(s+8)>>2]=h;break}k=c[D>>2]|0;if((U|0)==31){V=0}else{V=25-(U>>>1)|0}e:do{if((c[k+4>>2]&-8|0)==(L|0)){W=k}else{D=L<<V;m=k;while(1){X=m+(D>>>31<<2)+16|0;f=c[X>>2]|0;if((f|0)==0){break}if((c[f+4>>2]&-8|0)==(L|0)){W=f;break e}else{D=D<<1;m=f}}if(X>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[X>>2]=h;c[t+(s+24)>>2]=m;c[t+(s+12)>>2]=h;c[t+(s+8)>>2]=h;break d}}}while(0);k=W+8|0;D=c[k>>2]|0;f=c[7896>>2]|0;if(W>>>0<f>>>0){tb()}if(D>>>0<f>>>0){tb()}else{c[D+12>>2]=h;c[k>>2]=h;c[t+(s+8)>>2]=D;c[t+(s+12)>>2]=W;c[t+(s+24)>>2]=0;break}}}while(0);p=M+8|0;i=b;return p|0}}while(0);M=c[7888>>2]|0;if(!(q>>>0>M>>>0)){W=M-q|0;X=c[7900>>2]|0;if(W>>>0>15){L=X;c[7900>>2]=L+q;c[7888>>2]=W;c[L+(q+4)>>2]=W|1;c[L+M>>2]=W;c[X+4>>2]=q|3}else{c[7888>>2]=0;c[7900>>2]=0;c[X+4>>2]=M|3;W=X+(M+4)|0;c[W>>2]=c[W>>2]|1}p=X+8|0;i=b;return p|0}X=c[7892>>2]|0;if(q>>>0<X>>>0){W=X-q|0;c[7892>>2]=W;X=c[7904>>2]|0;M=X;c[7904>>2]=M+q;c[M+(q+4)>>2]=W|1;c[X+4>>2]=q|3;p=X+8|0;i=b;return p|0}do{if((c[2088]|0)==0){X=ra(30)|0;if((X+ -1&X|0)==0){c[8360>>2]=X;c[8356>>2]=X;c[8364>>2]=-1;c[8368>>2]=-1;c[8372>>2]=0;c[8324>>2]=0;c[2088]=($a(0)|0)&-16^1431655768;break}else{tb()}}}while(0);X=q+48|0;W=c[8360>>2]|0;M=q+47|0;L=W+M|0;V=0-W|0;W=L&V;if(!(W>>>0>q>>>0)){p=0;i=b;return p|0}U=c[8320>>2]|0;do{if((U|0)!=0){T=c[8312>>2]|0;S=T+W|0;if(S>>>0<=T>>>0|S>>>0>U>>>0){p=0}else{break}i=b;return p|0}}while(0);f:do{if((c[8324>>2]&4|0)==0){U=c[7904>>2]|0;g:do{if((U|0)==0){Y=182}else{S=U;T=8328|0;while(1){Z=T;P=c[Z>>2]|0;if(!(P>>>0>S>>>0)){_=T+4|0;if((P+(c[_>>2]|0)|0)>>>0>S>>>0){break}}P=c[T+8>>2]|0;if((P|0)==0){Y=182;break g}else{T=P}}if((T|0)==0){Y=182;break}S=L-(c[7892>>2]|0)&V;if(!(S>>>0<2147483647)){$=0;break}h=oa(S|0)|0;P=(h|0)==((c[Z>>2]|0)+(c[_>>2]|0)|0);aa=h;ba=S;ca=P?h:-1;da=P?S:0;Y=191}}while(0);do{if((Y|0)==182){U=oa(0)|0;if((U|0)==(-1|0)){$=0;break}S=U;P=c[8356>>2]|0;h=P+ -1|0;if((h&S|0)==0){ea=W}else{ea=W-S+(h+S&0-P)|0}P=c[8312>>2]|0;S=P+ea|0;if(!(ea>>>0>q>>>0&ea>>>0<2147483647)){$=0;break}h=c[8320>>2]|0;if((h|0)!=0){if(S>>>0<=P>>>0|S>>>0>h>>>0){$=0;break}}h=oa(ea|0)|0;S=(h|0)==(U|0);aa=h;ba=ea;ca=S?U:-1;da=S?ea:0;Y=191}}while(0);h:do{if((Y|0)==191){S=0-ba|0;if((ca|0)!=(-1|0)){fa=ca;ga=da;Y=202;break f}do{if((aa|0)!=(-1|0)&ba>>>0<2147483647&ba>>>0<X>>>0){U=c[8360>>2]|0;h=M-ba+U&0-U;if(!(h>>>0<2147483647)){ha=ba;break}if((oa(h|0)|0)==(-1|0)){oa(S|0)|0;$=da;break h}else{ha=h+ba|0;break}}else{ha=ba}}while(0);if((aa|0)==(-1|0)){$=da}else{fa=aa;ga=ha;Y=202;break f}}}while(0);c[8324>>2]=c[8324>>2]|4;ia=$;Y=199}else{ia=0;Y=199}}while(0);do{if((Y|0)==199){if(!(W>>>0<2147483647)){break}$=oa(W|0)|0;ha=oa(0)|0;if(!((ha|0)!=(-1|0)&($|0)!=(-1|0)&$>>>0<ha>>>0)){break}aa=ha-$|0;ha=aa>>>0>(q+40|0)>>>0;if(ha){fa=$;ga=ha?aa:ia;Y=202}}}while(0);do{if((Y|0)==202){ia=(c[8312>>2]|0)+ga|0;c[8312>>2]=ia;if(ia>>>0>(c[8316>>2]|0)>>>0){c[8316>>2]=ia}ia=c[7904>>2]|0;i:do{if((ia|0)==0){W=c[7896>>2]|0;if((W|0)==0|fa>>>0<W>>>0){c[7896>>2]=fa}c[8328>>2]=fa;c[8332>>2]=ga;c[8340>>2]=0;c[7916>>2]=c[2088];c[7912>>2]=-1;W=0;do{aa=W<<1;ha=7920+(aa<<2)|0;c[7920+(aa+3<<2)>>2]=ha;c[7920+(aa+2<<2)>>2]=ha;W=W+1|0;}while((W|0)!=32);W=fa+8|0;if((W&7|0)==0){ja=0}else{ja=0-W&7}W=ga+ -40-ja|0;c[7904>>2]=fa+ja;c[7892>>2]=W;c[fa+(ja+4)>>2]=W|1;c[fa+(ga+ -36)>>2]=40;c[7908>>2]=c[8368>>2]}else{W=8328|0;while(1){ka=c[W>>2]|0;la=W+4|0;ma=c[la>>2]|0;if((fa|0)==(ka+ma|0)){Y=214;break}ha=c[W+8>>2]|0;if((ha|0)==0){break}else{W=ha}}do{if((Y|0)==214){if((c[W+12>>2]&8|0)!=0){break}ha=ia;if(!(ha>>>0>=ka>>>0&ha>>>0<fa>>>0)){break}c[la>>2]=ma+ga;aa=(c[7892>>2]|0)+ga|0;$=ia+8|0;if(($&7|0)==0){na=0}else{na=0-$&7}$=aa-na|0;c[7904>>2]=ha+na;c[7892>>2]=$;c[ha+(na+4)>>2]=$|1;c[ha+(aa+4)>>2]=40;c[7908>>2]=c[8368>>2];break i}}while(0);if(fa>>>0<(c[7896>>2]|0)>>>0){c[7896>>2]=fa}W=fa+ga|0;aa=8328|0;while(1){pa=aa;if((c[pa>>2]|0)==(W|0)){Y=224;break}ha=c[aa+8>>2]|0;if((ha|0)==0){break}else{aa=ha}}do{if((Y|0)==224){if((c[aa+12>>2]&8|0)!=0){break}c[pa>>2]=fa;W=aa+4|0;c[W>>2]=(c[W>>2]|0)+ga;W=fa+8|0;if((W&7|0)==0){qa=0}else{qa=0-W&7}W=fa+(ga+8)|0;if((W&7|0)==0){sa=0}else{sa=0-W&7}W=fa+(sa+ga)|0;ha=W;$=qa+q|0;da=fa+$|0;ba=da;M=W-(fa+qa)-q|0;c[fa+(qa+4)>>2]=q|3;j:do{if((ha|0)==(c[7904>>2]|0)){X=(c[7892>>2]|0)+M|0;c[7892>>2]=X;c[7904>>2]=ba;c[fa+($+4)>>2]=X|1}else{if((ha|0)==(c[7900>>2]|0)){X=(c[7888>>2]|0)+M|0;c[7888>>2]=X;c[7900>>2]=ba;c[fa+($+4)>>2]=X|1;c[fa+(X+$)>>2]=X;break}X=ga+4|0;ca=c[fa+(X+sa)>>2]|0;if((ca&3|0)==1){ea=ca&-8;_=ca>>>3;k:do{if(ca>>>0<256){Z=c[fa+((sa|8)+ga)>>2]|0;V=c[fa+(ga+12+sa)>>2]|0;L=7920+(_<<1<<2)|0;do{if((Z|0)!=(L|0)){if(Z>>>0<(c[7896>>2]|0)>>>0){tb()}if((c[Z+12>>2]|0)==(ha|0)){break}tb()}}while(0);if((V|0)==(Z|0)){c[1970]=c[1970]&~(1<<_);break}do{if((V|0)==(L|0)){ta=V+8|0}else{if(V>>>0<(c[7896>>2]|0)>>>0){tb()}S=V+8|0;if((c[S>>2]|0)==(ha|0)){ta=S;break}tb()}}while(0);c[Z+12>>2]=V;c[ta>>2]=Z}else{L=W;S=c[fa+((sa|24)+ga)>>2]|0;T=c[fa+(ga+12+sa)>>2]|0;do{if((T|0)==(L|0)){h=sa|16;U=fa+(X+h)|0;P=c[U>>2]|0;if((P|0)==0){Q=fa+(h+ga)|0;h=c[Q>>2]|0;if((h|0)==0){ua=0;break}else{va=h;wa=Q}}else{va=P;wa=U}while(1){U=va+20|0;P=c[U>>2]|0;if((P|0)!=0){wa=U;va=P;continue}P=va+16|0;U=c[P>>2]|0;if((U|0)==0){break}else{va=U;wa=P}}if(wa>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[wa>>2]=0;ua=va;break}}else{P=c[fa+((sa|8)+ga)>>2]|0;if(P>>>0<(c[7896>>2]|0)>>>0){tb()}U=P+12|0;if((c[U>>2]|0)!=(L|0)){tb()}Q=T+8|0;if((c[Q>>2]|0)==(L|0)){c[U>>2]=T;c[Q>>2]=P;ua=T;break}else{tb()}}}while(0);if((S|0)==0){break}T=c[fa+(ga+28+sa)>>2]|0;Z=8184+(T<<2)|0;do{if((L|0)==(c[Z>>2]|0)){c[Z>>2]=ua;if((ua|0)!=0){break}c[7884>>2]=c[7884>>2]&~(1<<T);break k}else{if(S>>>0<(c[7896>>2]|0)>>>0){tb()}V=S+16|0;if((c[V>>2]|0)==(L|0)){c[V>>2]=ua}else{c[S+20>>2]=ua}if((ua|0)==0){break k}}}while(0);if(ua>>>0<(c[7896>>2]|0)>>>0){tb()}c[ua+24>>2]=S;L=sa|16;T=c[fa+(L+ga)>>2]|0;do{if((T|0)!=0){if(T>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[ua+16>>2]=T;c[T+24>>2]=ua;break}}}while(0);T=c[fa+(X+L)>>2]|0;if((T|0)==0){break}if(T>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[ua+20>>2]=T;c[T+24>>2]=ua;break}}}while(0);xa=fa+((ea|sa)+ga)|0;ya=ea+M|0}else{xa=ha;ya=M}X=xa+4|0;c[X>>2]=c[X>>2]&-2;c[fa+($+4)>>2]=ya|1;c[fa+(ya+$)>>2]=ya;X=ya>>>3;if(ya>>>0<256){_=X<<1;ca=7920+(_<<2)|0;T=c[1970]|0;S=1<<X;do{if((T&S|0)==0){c[1970]=T|S;za=7920+(_+2<<2)|0;Aa=ca}else{X=7920+(_+2<<2)|0;Z=c[X>>2]|0;if(!(Z>>>0<(c[7896>>2]|0)>>>0)){za=X;Aa=Z;break}tb()}}while(0);c[za>>2]=ba;c[Aa+12>>2]=ba;c[fa+($+8)>>2]=Aa;c[fa+($+12)>>2]=ca;break}_=da;S=ya>>>8;do{if((S|0)==0){Ba=0}else{if(ya>>>0>16777215){Ba=31;break}T=(S+1048320|0)>>>16&8;ea=S<<T;Z=(ea+520192|0)>>>16&4;X=ea<<Z;ea=(X+245760|0)>>>16&2;V=14-(Z|T|ea)+(X<<ea>>>15)|0;Ba=ya>>>(V+7|0)&1|V<<1}}while(0);S=8184+(Ba<<2)|0;c[fa+($+28)>>2]=Ba;c[fa+($+20)>>2]=0;c[fa+($+16)>>2]=0;ca=c[7884>>2]|0;V=1<<Ba;if((ca&V|0)==0){c[7884>>2]=ca|V;c[S>>2]=_;c[fa+($+24)>>2]=S;c[fa+($+12)>>2]=_;c[fa+($+8)>>2]=_;break}V=c[S>>2]|0;if((Ba|0)==31){Ca=0}else{Ca=25-(Ba>>>1)|0}l:do{if((c[V+4>>2]&-8|0)==(ya|0)){Da=V}else{S=ya<<Ca;ca=V;while(1){Ea=ca+(S>>>31<<2)+16|0;ea=c[Ea>>2]|0;if((ea|0)==0){break}if((c[ea+4>>2]&-8|0)==(ya|0)){Da=ea;break l}else{S=S<<1;ca=ea}}if(Ea>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[Ea>>2]=_;c[fa+($+24)>>2]=ca;c[fa+($+12)>>2]=_;c[fa+($+8)>>2]=_;break j}}}while(0);V=Da+8|0;S=c[V>>2]|0;L=c[7896>>2]|0;if(Da>>>0<L>>>0){tb()}if(S>>>0<L>>>0){tb()}else{c[S+12>>2]=_;c[V>>2]=_;c[fa+($+8)>>2]=S;c[fa+($+12)>>2]=Da;c[fa+($+24)>>2]=0;break}}}while(0);p=fa+(qa|8)|0;i=b;return p|0}}while(0);aa=ia;$=8328|0;while(1){Fa=c[$>>2]|0;if(!(Fa>>>0>aa>>>0)){Ga=c[$+4>>2]|0;Ha=Fa+Ga|0;if(Ha>>>0>aa>>>0){break}}$=c[$+8>>2]|0}$=Fa+(Ga+ -39)|0;if(($&7|0)==0){Ia=0}else{Ia=0-$&7}$=Fa+(Ga+ -47+Ia)|0;da=$>>>0<(ia+16|0)>>>0?aa:$;$=da+8|0;ba=$;M=fa+8|0;if((M&7|0)==0){Ja=0}else{Ja=0-M&7}M=ga+ -40-Ja|0;c[7904>>2]=fa+Ja;c[7892>>2]=M;c[fa+(Ja+4)>>2]=M|1;c[fa+(ga+ -36)>>2]=40;c[7908>>2]=c[8368>>2];c[da+4>>2]=27;c[$+0>>2]=c[8328>>2];c[$+4>>2]=c[8332>>2];c[$+8>>2]=c[8336>>2];c[$+12>>2]=c[8340>>2];c[8328>>2]=fa;c[8332>>2]=ga;c[8340>>2]=0;c[8336>>2]=ba;ba=da+28|0;c[ba>>2]=7;if((da+32|0)>>>0<Ha>>>0){$=ba;while(1){ba=$+4|0;c[ba>>2]=7;if(($+8|0)>>>0<Ha>>>0){$=ba}else{break}}}if((da|0)==(aa|0)){break}$=da-ia|0;ba=aa+($+4)|0;c[ba>>2]=c[ba>>2]&-2;c[ia+4>>2]=$|1;c[aa+$>>2]=$;ba=$>>>3;if($>>>0<256){M=ba<<1;ha=7920+(M<<2)|0;W=c[1970]|0;m=1<<ba;do{if((W&m|0)==0){c[1970]=W|m;Ka=7920+(M+2<<2)|0;La=ha}else{ba=7920+(M+2<<2)|0;S=c[ba>>2]|0;if(!(S>>>0<(c[7896>>2]|0)>>>0)){Ka=ba;La=S;break}tb()}}while(0);c[Ka>>2]=ia;c[La+12>>2]=ia;c[ia+8>>2]=La;c[ia+12>>2]=ha;break}M=ia;m=$>>>8;do{if((m|0)==0){Ma=0}else{if($>>>0>16777215){Ma=31;break}W=(m+1048320|0)>>>16&8;aa=m<<W;da=(aa+520192|0)>>>16&4;S=aa<<da;aa=(S+245760|0)>>>16&2;ba=14-(da|W|aa)+(S<<aa>>>15)|0;Ma=$>>>(ba+7|0)&1|ba<<1}}while(0);m=8184+(Ma<<2)|0;c[ia+28>>2]=Ma;c[ia+20>>2]=0;c[ia+16>>2]=0;ha=c[7884>>2]|0;ba=1<<Ma;if((ha&ba|0)==0){c[7884>>2]=ha|ba;c[m>>2]=M;c[ia+24>>2]=m;c[ia+12>>2]=ia;c[ia+8>>2]=ia;break}ba=c[m>>2]|0;if((Ma|0)==31){Na=0}else{Na=25-(Ma>>>1)|0}m:do{if((c[ba+4>>2]&-8|0)==($|0)){Oa=ba}else{m=$<<Na;ha=ba;while(1){Pa=ha+(m>>>31<<2)+16|0;aa=c[Pa>>2]|0;if((aa|0)==0){break}if((c[aa+4>>2]&-8|0)==($|0)){Oa=aa;break m}else{m=m<<1;ha=aa}}if(Pa>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[Pa>>2]=M;c[ia+24>>2]=ha;c[ia+12>>2]=ia;c[ia+8>>2]=ia;break i}}}while(0);$=Oa+8|0;ba=c[$>>2]|0;m=c[7896>>2]|0;if(Oa>>>0<m>>>0){tb()}if(ba>>>0<m>>>0){tb()}else{c[ba+12>>2]=M;c[$>>2]=M;c[ia+8>>2]=ba;c[ia+12>>2]=Oa;c[ia+24>>2]=0;break}}}while(0);ia=c[7892>>2]|0;if(!(ia>>>0>q>>>0)){break}ba=ia-q|0;c[7892>>2]=ba;ia=c[7904>>2]|0;$=ia;c[7904>>2]=$+q;c[$+(q+4)>>2]=ba|1;c[ia+4>>2]=q|3;p=ia+8|0;i=b;return p|0}}while(0);c[(Lb()|0)>>2]=12;p=0;i=b;return p|0}



function Of(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0;b=i;if((a|0)==0){i=b;return}d=a+ -8|0;e=d;f=c[7896>>2]|0;if(d>>>0<f>>>0){tb()}g=c[a+ -4>>2]|0;h=g&3;if((h|0)==1){tb()}j=g&-8;k=a+(j+ -8)|0;l=k;a:do{if((g&1|0)==0){m=c[d>>2]|0;if((h|0)==0){i=b;return}n=-8-m|0;o=a+n|0;p=o;q=m+j|0;if(o>>>0<f>>>0){tb()}if((p|0)==(c[7900>>2]|0)){r=a+(j+ -4)|0;if((c[r>>2]&3|0)!=3){s=p;t=q;break}c[7888>>2]=q;c[r>>2]=c[r>>2]&-2;c[a+(n+4)>>2]=q|1;c[k>>2]=q;i=b;return}r=m>>>3;if(m>>>0<256){m=c[a+(n+8)>>2]|0;u=c[a+(n+12)>>2]|0;v=7920+(r<<1<<2)|0;do{if((m|0)!=(v|0)){if(m>>>0<f>>>0){tb()}if((c[m+12>>2]|0)==(p|0)){break}tb()}}while(0);if((u|0)==(m|0)){c[1970]=c[1970]&~(1<<r);s=p;t=q;break}do{if((u|0)==(v|0)){w=u+8|0}else{if(u>>>0<f>>>0){tb()}x=u+8|0;if((c[x>>2]|0)==(p|0)){w=x;break}tb()}}while(0);c[m+12>>2]=u;c[w>>2]=m;s=p;t=q;break}v=o;r=c[a+(n+24)>>2]|0;x=c[a+(n+12)>>2]|0;do{if((x|0)==(v|0)){y=a+(n+20)|0;z=c[y>>2]|0;if((z|0)==0){A=a+(n+16)|0;B=c[A>>2]|0;if((B|0)==0){C=0;break}else{D=B;E=A}}else{D=z;E=y}while(1){y=D+20|0;z=c[y>>2]|0;if((z|0)!=0){E=y;D=z;continue}z=D+16|0;y=c[z>>2]|0;if((y|0)==0){break}else{D=y;E=z}}if(E>>>0<f>>>0){tb()}else{c[E>>2]=0;C=D;break}}else{z=c[a+(n+8)>>2]|0;if(z>>>0<f>>>0){tb()}y=z+12|0;if((c[y>>2]|0)!=(v|0)){tb()}A=x+8|0;if((c[A>>2]|0)==(v|0)){c[y>>2]=x;c[A>>2]=z;C=x;break}else{tb()}}}while(0);if((r|0)==0){s=p;t=q;break}x=c[a+(n+28)>>2]|0;o=8184+(x<<2)|0;do{if((v|0)==(c[o>>2]|0)){c[o>>2]=C;if((C|0)!=0){break}c[7884>>2]=c[7884>>2]&~(1<<x);s=p;t=q;break a}else{if(r>>>0<(c[7896>>2]|0)>>>0){tb()}m=r+16|0;if((c[m>>2]|0)==(v|0)){c[m>>2]=C}else{c[r+20>>2]=C}if((C|0)==0){s=p;t=q;break a}}}while(0);if(C>>>0<(c[7896>>2]|0)>>>0){tb()}c[C+24>>2]=r;v=c[a+(n+16)>>2]|0;do{if((v|0)!=0){if(v>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[C+16>>2]=v;c[v+24>>2]=C;break}}}while(0);v=c[a+(n+20)>>2]|0;if((v|0)==0){s=p;t=q;break}if(v>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[C+20>>2]=v;c[v+24>>2]=C;s=p;t=q;break}}else{s=e;t=j}}while(0);e=s;if(!(e>>>0<k>>>0)){tb()}C=a+(j+ -4)|0;f=c[C>>2]|0;if((f&1|0)==0){tb()}do{if((f&2|0)==0){if((l|0)==(c[7904>>2]|0)){D=(c[7892>>2]|0)+t|0;c[7892>>2]=D;c[7904>>2]=s;c[s+4>>2]=D|1;if((s|0)!=(c[7900>>2]|0)){i=b;return}c[7900>>2]=0;c[7888>>2]=0;i=b;return}if((l|0)==(c[7900>>2]|0)){D=(c[7888>>2]|0)+t|0;c[7888>>2]=D;c[7900>>2]=s;c[s+4>>2]=D|1;c[e+D>>2]=D;i=b;return}D=(f&-8)+t|0;E=f>>>3;b:do{if(f>>>0<256){w=c[a+j>>2]|0;h=c[a+(j|4)>>2]|0;d=7920+(E<<1<<2)|0;do{if((w|0)!=(d|0)){if(w>>>0<(c[7896>>2]|0)>>>0){tb()}if((c[w+12>>2]|0)==(l|0)){break}tb()}}while(0);if((h|0)==(w|0)){c[1970]=c[1970]&~(1<<E);break}do{if((h|0)==(d|0)){F=h+8|0}else{if(h>>>0<(c[7896>>2]|0)>>>0){tb()}g=h+8|0;if((c[g>>2]|0)==(l|0)){F=g;break}tb()}}while(0);c[w+12>>2]=h;c[F>>2]=w}else{d=k;g=c[a+(j+16)>>2]|0;v=c[a+(j|4)>>2]|0;do{if((v|0)==(d|0)){r=a+(j+12)|0;x=c[r>>2]|0;if((x|0)==0){o=a+(j+8)|0;m=c[o>>2]|0;if((m|0)==0){G=0;break}else{H=m;I=o}}else{H=x;I=r}while(1){r=H+20|0;x=c[r>>2]|0;if((x|0)!=0){I=r;H=x;continue}x=H+16|0;r=c[x>>2]|0;if((r|0)==0){break}else{H=r;I=x}}if(I>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[I>>2]=0;G=H;break}}else{x=c[a+j>>2]|0;if(x>>>0<(c[7896>>2]|0)>>>0){tb()}r=x+12|0;if((c[r>>2]|0)!=(d|0)){tb()}o=v+8|0;if((c[o>>2]|0)==(d|0)){c[r>>2]=v;c[o>>2]=x;G=v;break}else{tb()}}}while(0);if((g|0)==0){break}v=c[a+(j+20)>>2]|0;w=8184+(v<<2)|0;do{if((d|0)==(c[w>>2]|0)){c[w>>2]=G;if((G|0)!=0){break}c[7884>>2]=c[7884>>2]&~(1<<v);break b}else{if(g>>>0<(c[7896>>2]|0)>>>0){tb()}h=g+16|0;if((c[h>>2]|0)==(d|0)){c[h>>2]=G}else{c[g+20>>2]=G}if((G|0)==0){break b}}}while(0);if(G>>>0<(c[7896>>2]|0)>>>0){tb()}c[G+24>>2]=g;d=c[a+(j+8)>>2]|0;do{if((d|0)!=0){if(d>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[G+16>>2]=d;c[d+24>>2]=G;break}}}while(0);d=c[a+(j+12)>>2]|0;if((d|0)==0){break}if(d>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[G+20>>2]=d;c[d+24>>2]=G;break}}}while(0);c[s+4>>2]=D|1;c[e+D>>2]=D;if((s|0)!=(c[7900>>2]|0)){J=D;break}c[7888>>2]=D;i=b;return}else{c[C>>2]=f&-2;c[s+4>>2]=t|1;c[e+t>>2]=t;J=t}}while(0);t=J>>>3;if(J>>>0<256){e=t<<1;f=7920+(e<<2)|0;C=c[1970]|0;G=1<<t;do{if((C&G|0)==0){c[1970]=C|G;K=7920+(e+2<<2)|0;L=f}else{t=7920+(e+2<<2)|0;j=c[t>>2]|0;if(!(j>>>0<(c[7896>>2]|0)>>>0)){K=t;L=j;break}tb()}}while(0);c[K>>2]=s;c[L+12>>2]=s;c[s+8>>2]=L;c[s+12>>2]=f;i=b;return}f=s;L=J>>>8;do{if((L|0)==0){M=0}else{if(J>>>0>16777215){M=31;break}K=(L+1048320|0)>>>16&8;e=L<<K;G=(e+520192|0)>>>16&4;C=e<<G;e=(C+245760|0)>>>16&2;j=14-(G|K|e)+(C<<e>>>15)|0;M=J>>>(j+7|0)&1|j<<1}}while(0);L=8184+(M<<2)|0;c[s+28>>2]=M;c[s+20>>2]=0;c[s+16>>2]=0;j=c[7884>>2]|0;e=1<<M;c:do{if((j&e|0)==0){c[7884>>2]=j|e;c[L>>2]=f;c[s+24>>2]=L;c[s+12>>2]=s;c[s+8>>2]=s}else{C=c[L>>2]|0;if((M|0)==31){N=0}else{N=25-(M>>>1)|0}d:do{if((c[C+4>>2]&-8|0)==(J|0)){O=C}else{K=J<<N;G=C;while(1){P=G+(K>>>31<<2)+16|0;t=c[P>>2]|0;if((t|0)==0){break}if((c[t+4>>2]&-8|0)==(J|0)){O=t;break d}else{K=K<<1;G=t}}if(P>>>0<(c[7896>>2]|0)>>>0){tb()}else{c[P>>2]=f;c[s+24>>2]=G;c[s+12>>2]=s;c[s+8>>2]=s;break c}}}while(0);C=O+8|0;D=c[C>>2]|0;K=c[7896>>2]|0;if(O>>>0<K>>>0){tb()}if(D>>>0<K>>>0){tb()}else{c[D+12>>2]=f;c[C>>2]=f;c[s+8>>2]=D;c[s+12>>2]=O;c[s+24>>2]=0;break}}}while(0);s=(c[7912>>2]|0)+ -1|0;c[7912>>2]=s;if((s|0)==0){Q=8336|0}else{i=b;return}while(1){s=c[Q>>2]|0;if((s|0)==0){break}else{Q=s+8|0}}c[7912>>2]=-1;i=b;return}function Pf(){}function Qf(a){a=a|0;var b=0;b=(aa(c[a>>2]|0,31010991)|0)+1735287159&2147483647;c[a>>2]=b;return b|0}function Rf(){return Qf(o)|0}function Sf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;i=f&~3;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b]=d;b=b+1|0}}while((b|0)<(i|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}return b-e|0}function Tf(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function Uf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return(E=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function Vf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return nb(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function Wf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return(E=e,a-c>>>0|0)|0}function Xf(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}E=a<<c-32;return 0}function Yf(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}E=0;return b>>>c-32|0}function Zf(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}E=(b|0)<0?-1:0;return b>>c-32|0}function _f(b){b=b|0;var c=0;c=a[n+(b>>>24)|0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)|0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)|0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)|0]|0)+24|0}function $f(b){b=b|0;var c=0;c=a[m+(b&255)|0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)|0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)|0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)|0]|0)+24|0}function ag(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=aa(d,c)|0;f=a>>>16;a=(e>>>16)+(aa(d,f)|0)|0;d=b>>>16;b=aa(d,c)|0;return(E=(a>>>16)+(aa(d,f)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|e&65535|0)|0}function bg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=Wf(e^a,f^b,e,f)|0;b=E;a=g^e;e=h^f;f=Wf((gg(i,b,Wf(g^c,h^d,g,h)|0,E,0)|0)^a,E^e,a,e)|0;return(E=E,f)|0}function cg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=Wf(h^a,j^b,h,j)|0;b=E;gg(m,b,Wf(k^d,l^e,k,l)|0,E,g)|0;l=Wf(c[g>>2]^h,c[g+4>>2]^j,h,j)|0;j=E;i=f;return(E=j,l)|0}function dg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=ag(e,a)|0;f=E;return(E=(aa(b,a)|0)+(aa(d,e)|0)+f|f&0,c|0|0)|0}function eg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=gg(a,b,c,d,0)|0;return(E=E,e)|0}function fg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;gg(a,b,d,e,g)|0;i=f;return(E=c[g+4>>2]|0,c[g>>2]|0)|0}function gg(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;g=a;h=b;i=h;j=d;k=e;l=k;if((i|0)==0){m=(f|0)!=0;if((l|0)==0){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return(E=n,o)|0}else{if(!m){n=0;o=0;return(E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;o=0;return(E=n,o)|0}}m=(l|0)==0;do{if((j|0)==0){if(m){if((f|0)!=0){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return(E=n,o)|0}if((g|0)==0){if((f|0)!=0){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return(E=n,o)|0}p=l-1|0;if((p&l|0)==0){if((f|0)!=0){c[f>>2]=a|0;c[f+4>>2]=p&i|b&0}n=0;o=i>>>(($f(l|0)|0)>>>0);return(E=n,o)|0}p=(_f(l|0)|0)-(_f(i|0)|0)|0;if(p>>>0<=30){q=p+1|0;r=31-p|0;s=q;t=i<<r|g>>>(q>>>0);u=i>>>(q>>>0);v=0;w=g<<r;break}if((f|0)==0){n=0;o=0;return(E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(E=n,o)|0}else{if(!m){r=(_f(l|0)|0)-(_f(i|0)|0)|0;if(r>>>0<=31){q=r+1|0;p=31-r|0;x=r-31>>31;s=q;t=g>>>(q>>>0)&x|i<<p;u=i>>>(q>>>0)&x;v=0;w=g<<p;break}if((f|0)==0){n=0;o=0;return(E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(E=n,o)|0}p=j-1|0;if((p&j|0)!=0){x=(_f(j|0)|0)+33-(_f(i|0)|0)|0;q=64-x|0;r=32-x|0;y=r>>31;z=x-32|0;A=z>>31;s=x;t=r-1>>31&i>>>(z>>>0)|(i<<r|g>>>(x>>>0))&A;u=A&i>>>(x>>>0);v=g<<q&y;w=(i<<q|g>>>(z>>>0))&y|g<<r&x-33>>31;break}if((f|0)!=0){c[f>>2]=p&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=a|0|0;return(E=n,o)|0}else{p=$f(j|0)|0;n=i>>>(p>>>0)|0;o=i<<32-p|g>>>(p>>>0)|0;return(E=n,o)|0}}}while(0);if((s|0)==0){B=w;C=v;D=u;F=t;G=0;H=0}else{g=d|0|0;d=k|e&0;e=Uf(g,d,-1,-1)|0;k=E;i=w;w=v;v=u;u=t;t=s;s=0;while(1){I=w>>>31|i<<1;J=s|w<<1;j=u<<1|i>>>31|0;a=u>>>31|v<<1|0;Wf(e,k,j,a)|0;b=E;h=b>>31|((b|0)<0?-1:0)<<1;K=h&1;L=Wf(j,a,h&g,(((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1)&d)|0;M=E;b=t-1|0;if((b|0)==0){break}else{i=I;w=J;v=M;u=L;t=b;s=K}}B=I;C=J;D=M;F=L;G=0;H=K}K=C;C=0;if((f|0)!=0){c[f>>2]=F;c[f+4>>2]=D}n=(K|0)>>>31|(B|C)<<1|(C<<1|K>>>31)&0|G;o=(K<<1|0>>>31)&-2|H;return(E=n,o)|0}function hg(a,b){a=a|0;b=b|0;Ub[a&127](b|0)}function ig(a,b,c){a=a|0;b=b|0;c=c|0;return Vb[a&127](b|0,c|0)|0}function jg(a){a=a|0;Wb[a&1]()}function kg(a){a=a|0;ba(0)}function lg(a,b){a=a|0;b=b|0;ba(1);return 0}function mg(){ba(2)}




// EMSCRIPTEN_END_FUNCS
var Ub=[kg,yc,zc,Ac,Bc,Cc,Dc,Ec,Fc,Gc,Hc,Ic,Jc,Kc,Lc,qd,rd,sd,td,ud,vd,wd,xd,yd,zd,Ad,Bd,Cd,Dd,Ed,Fd,Gd,Hd,Id,Jd,Kd,Ld,Md,Nd,Od,Pd,Qd,Rd,Sd,Td,Ud,Vd,Wd,Xd,Yd,Zd,_d,$d,ae,be,ce,de,ee,fe,ge,he,ie,je,ke,le,me,ne,oe,pe,qe,re,se,te,ue,ve,we,xe,ye,ze,Ae,Be,Ce,De,Ee,Fe,Ge,He,Ie,Je,Ke,Le,Me,Ne,Oe,Pe,Qe,Re,vc,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg,kg];var Vb=[lg,gf,hf,jf,kf,lf,mf,nf,of,pf,qf,rf,sf,tf,uf,vf,wf,xf,yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,cd,dd,ed,fd,gd,hd,id,kd,jd,ld,md,nd,od,pd,_c,$c,ad,bd,Mc,Nc,Oc,Pc,Qc,Rc,Sc,Tc,Uc,Vc,Wc,Xc,Yc,Zc,ff,Ue,Xe,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg,lg];var Wb=[mg,lc];return{_strlen:Tf,_free:Of,_main:mc,_rand_r:Qf,_i64Add:Uf,_memset:Sf,_malloc:Nf,_memcpy:Vf,_rand:Rf,runPostSets:Pf,stackAlloc:Xb,stackSave:Yb,stackRestore:Zb,setThrew:_b,setTempRet0:bc,setTempRet1:cc,setTempRet2:dc,setTempRet3:ec,setTempRet4:fc,setTempRet5:gc,setTempRet6:hc,setTempRet7:ic,setTempRet8:jc,setTempRet9:kc,dynCall_vi:hg,dynCall_iii:ig,dynCall_v:jg}})


// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_vi": invoke_vi, "invoke_iii": invoke_iii, "invoke_v": invoke_v, "_glUseProgram": _glUseProgram, "_fread": _fread, "_glDeleteProgram": _glDeleteProgram, "_glBindBuffer": _glBindBuffer, "_SDL_GetError": _SDL_GetError, "_sbrk": _sbrk, "_glDisableVertexAttribArray": _glDisableVertexAttribArray, "_glCreateShader": _glCreateShader, "_sysconf": _sysconf, "_close": _close, "_glTexCoord2f": _glTexCoord2f, "_cos": _cos, "_puts": _puts, "_glLoadIdentity": _glLoadIdentity, "_write": _write, "_fsync": _fsync, "_glShaderSource": _glShaderSource, "_glOrtho": _glOrtho, "_SDL_WM_SetCaption": _SDL_WM_SetCaption, "_glGetBooleanv": _glGetBooleanv, "_llvm_lifetime_end": _llvm_lifetime_end, "_glVertexAttribPointer": _glVertexAttribPointer, "_glHint": _glHint, "_send": _send, "_SDL_GL_SetAttribute": _SDL_GL_SetAttribute, "_glBegin": _glBegin, "_SDL_GetTicks": _SDL_GetTicks, "_SDL_LockSurface": _SDL_LockSurface, "_glViewport": _glViewport, "___setErrNo": ___setErrNo, "_srand": _srand, "_putchar": _putchar, "_SDL_SetPalette": _SDL_SetPalette, "_glEnable": _glEnable, "_printf": _printf, "_glGenTextures": _glGenTextures, "_sprintf": _sprintf, "_glGetIntegerv": _glGetIntegerv, "_glGetString": _glGetString, "_glAttachShader": _glAttachShader, "_SDL_CreateRGBSurface": _SDL_CreateRGBSurface, "_read": _read, "_SDL_SetVideoMode": _SDL_SetVideoMode, "_fwrite": _fwrite, "_time": _time, "_fprintf": _fprintf, "_glDetachShader": _glDetachShader, "_exit": _exit, "_glVertex2i": _glVertex2i, "_sin": _sin, "_pwrite": _pwrite, "_glBindTexture": _glBindTexture, "_open": _open, "_glIsEnabled": _glIsEnabled, "_SDL_Init": _SDL_Init, "_snprintf": _snprintf, "_SDL_FreeSurface": _SDL_FreeSurface, "_glGetFloatv": _glGetFloatv, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_fclose": _fclose, "_glActiveTexture": _glActiveTexture, "_recv": _recv, "_glCompileShader": _glCompileShader, "_glEnableVertexAttribArray": _glEnableVertexAttribArray, "_abort": _abort, "_SDL_Flip": _SDL_Flip, "_glTexImage2D": _glTexImage2D, "_fopen": _fopen, "_llvm_lifetime_start": _llvm_lifetime_start, "_fflush": _fflush, "__reallyNegative": __reallyNegative, "_SDL_PollEvent": _SDL_PollEvent, "_fileno": _fileno, "_glMatrixMode": _glMatrixMode, "__exit": __exit, "_glBindAttribLocation": _glBindAttribLocation, "_SDL_SetColors": _SDL_SetColors, "_pread": _pread, "_mkport": _mkport, "_glEnd": _glEnd, "_glLinkProgram": _glLinkProgram, "_emscripten_set_main_loop": _emscripten_set_main_loop, "___errno_location": ___errno_location, "_fputc": _fputc, "_SDL_GL_SwapBuffers": _SDL_GL_SwapBuffers, "_glDisable": _glDisable, "_glTexParameteri": _glTexParameteri, "__formatString": __formatString, "_fputs": _fputs, "_SDL_UpperBlit": _SDL_UpperBlit, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "___rand_seed": ___rand_seed, "NaN": NaN, "Infinity": Infinity }, buffer);
var _strlen = Module["_strlen"] = asm["_strlen"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _rand_r = Module["_rand_r"] = asm["_rand_r"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _rand = Module["_rand"] = asm["_rand"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];

Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };


// TODO: strip out parts of this we do not need

//======= begin closure i64 code =======

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */

var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };


  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.

    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };


  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.


  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};


  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }

    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };


  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };


  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };


  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }

    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));

    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };


  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.


  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;


  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);


  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);


  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);


  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);


  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);


  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);


  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };


  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };


  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (this.isZero()) {
      return '0';
    }

    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));

    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);

      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };


  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };


  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };


  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };


  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };


  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };


  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };


  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };


  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }

    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }

    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };


  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };


  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };


  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }

    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }

      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }

      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };


  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };


  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };


  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };


  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };


  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };


  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };

  //======= begin jsbn =======

  var navigator = { appName: 'Modern Browser' }; // polyfill a little

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/

  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);

  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }

  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }

  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // jsbn2 stuff

  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }

  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }

  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }

  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;

  //======= end jsbn =======

  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();

//======= end closure i64 code =======



// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    var data = Module['readBinary'](memoryInitializer);
    HEAPU8.set(data, STATIC_BASE);
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      HEAPU8.set(data, STATIC_BASE);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    ensureInitRuntime();

    preMain();

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371

  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.';

  throw 'abort() at ' + stackTrace() + extra;
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}


run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}






