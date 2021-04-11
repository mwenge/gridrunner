$.extend(Config, new function() {
    this.EXCESS = 0;
    this.S = ((0x30 + this.EXCESS) * 8);
    this.M = ((0x42 + this.EXCESS) * 8);
    this.L = ((0x56 + this.EXCESS) * 8);
    this.tapePlay = false;
}
);
EventTape = {
    createEjectEvent: function() {
        return {
            type: "EventTape",
            rewind: false,
            filepath: ""
        };
    },
    createInsertEvent: function(filepath) {
        return {
            type: "EventTape",
            rewind: false,
            filepath: filepath
        };
    },
    createRewindEvent: function() {
        return {
            type: "EventTape",
            rewind: true,
            filepath: ""
        };
    }
};
function EOFException(message) {
    this.message = message;
    console.debug("EOFException", message);
}
function InvalidFormatException(message) {
    this.message = message;
    console.debug("InvalidFormatException", message);
}
function TapeDrive() {
    var tapeDatasource = null;
    this.isTapeLoaded = function() {
        return tapeDatasource != null;
    }
    var pulseClock = 0;
    var pulseWidth = 0;
    var tapeDriveMotor = false;
    this.triggerTapeMotor = function(isTapeMotorGoing) {
        tapeDriveMotor = isTapeMotorGoing;
        console.log("Tape drive motor " + (isTapeMotorGoing ? "on" : "off"));
    }
    this.readTapeBit = function() {
        if (tapeDatasource != null && tapeDriveMotor) {
            if (++pulseClock > pulseWidth) {
                try {
                    pulseWidth = tapeDatasource.nextPulseWidth();
                } catch (e) {
                    if (e instanceof EOFException) {
                        pulseWidth = -1;
                    } else {
                        throw e;
                    }
                }
                if (pulseWidth == -1) {
                    console.log("Tape end");
                    Config.tapePlay = false;
                    return true;
                }
                pulseClock = 0;
            }
            return pulseClock < (pulseWidth >> 1);
        }
        return true;
    }
    this.handleEvent = function(event) {
        if (event.rewind) {
            console.debug("rewind tape");
            tapeDatasource.rewind();
        } else if (event.filepath == null) {
            tapeDatasource = null;
            console.debug("eject tape");
        } else {
            try {
                console.debug("load tape");
                tapeDatasource = new TapFile(event.filepath);
            } catch (e) {
                if (e instanceof InvalidFormatException) {
                    tapeDatasource = new CsmFile(event.filepath);
                } else {
                    throw e;
                }
            }
        }
        return true;
    }
    EventManager.listen("EventTape", this.handleEvent);
}
function PulseWidthsFromBitData(bitData) {
    var bit = false;
    var count = 0;
    this.reset = function() {
        count = 1;
    }
    this.reset();
    this.nextPulseWidth = function() {
        if (--count == 0) {
            count = 20;
            return Config.L;
        }
        if (count == 19) {
            return bitData.hasNextBit() ? Config.M : Config.S;
        }
        bit = ((count & 1) != 0) ? !bit : bitData.nextBit();
        return bit ? Config.M : Config.S;
    }
}
function PulseWidthSyncGenerator() {
    var value = 0;
    var count = 0;
    var bit = false;
    var xor = 0;
    this.reset = function(isRepeat) {
        value = isRepeat ? 0x0A : 0x8A;
        count = 0;
    }
    this.nextPulseWidth = function() {
        if (--count < 0) {
            if ((--value & 0xF) == 0) {
                throw new EOFException();
            }
            count = 19;
            xor = 1;
            return Config.L;
        }
        if (count == 18) {
            return Config.M;
        }
        if (count < 1) {
            return ((xor ^ count) != 0) ? Config.S : Config.M;
        }
        if ((count & 1) != 0) {
            bit = ((value >> (8 - (count >> 1))) & 1) != 0;
            xor ^= bit ? 1 : 0;
        } else {
            bit = !bit;
        }
        return bit ? Config.M : Config.S;
    }
}
function TapeBitDataStream() {
    var data = null;
    var offset = 0;
    var datum = 0;
    var xor = 0;
    var xorbyte = 0;
    var bitpos = 0;
    var hasAddedByteChecksum = false;
    this.nextBit = function() {
        datum >>= 1;
        bitpos++;
        if (bitpos == 8) {
            return xor > 0;
        }
        if (bitpos > 8) {
            if (++offset >= data.length) {
                if (!hasAddedByteChecksum) {
                    hasAddedByteChecksum = true;
                    datum = xorbyte;
                } else {
                    throw new EOFException();
                }
            } else {
                datum = data[offset] & 0xFF;
                xorbyte ^= datum;
            }
            bitpos = 0;
            xor = 1;
        }
        var result = datum & 1;
        xor ^= result;
        return result != 0;
    }
    this.hasNextBit = function() {
        return offset < data.length;
    }
    this.setData = function(srcdata, offsetsrc, length) {
        data = new Array();
        for (var i = 0; i < length; i++)
            data.push(srcdata[offsetsrc + i]);
        offset = -1;
        bitpos = 10;
        xorbyte = 0;
        hasAddedByteChecksum = false;
    }
}
function TapFile(data) {
    var FILE_MAGIC = "C64-TAPE-RAW";
    var HEADER_LENGTH = 0x15;
    var offset = 0;
    var rewindOffset = 0;
    var tapVersion = 0;
    var fileDataSize = 0;
    this.skipBytes = function(count) {
        offset += count;
        if (offset > data.length) {
            offset = data.length;
        }
    }
    this.nextByte = function() {
        if (offset == data.length) {
            return -1;
        }
        return data[offset++] & 0xFF;
    }
    this.rewind = function() {
        offset = rewindOffset;
    }
    this.nextPulseWidth = function() {
        var datum = this.nextByte();
        if (datum == 0) {
            if (tapVersion != 1) {
                datum = 512 << 8;
            } else {
                var nextByte = this.nextByte();
                if (nextByte == -1) {
                    console.log("Unexpected end of tape encountered during extended pulse");
                    return -1;
                }
                datum = nextByte;
                nextByte = this.nextByte();
                if (nextByte == -1) {
                    console.log("Unexpected end of tape encountered during extended pulse");
                    return -1;
                }
                datum |= nextByte << 8;
                nextByte = this.nextByte();
                if (nextByte == -1) {
                    console.log("Unexpected end of tape encountered during extended pulse");
                    return -1;
                }
                datum |= nextByte << 16;
            }
        } else if (datum != -1) {
            datum <<= 3;
        }
        return datum;
    }
    if (FILE_MAGIC != bin2String(data, 0, FILE_MAGIC.length)) {
        throw new InvalidFormatException("File is not a TAP file: Header magic is incorrect");
    }
    this.skipBytes(FILE_MAGIC.length);
    tapVersion = this.nextByte();
    if (tapVersion != 0 && tapVersion != 1) {
        alert("Tap version is not understood, version=" + tapVersion + ", should be either 0 or 1");
    }
    this.skipBytes(3);
    fileDataSize = this.nextByte() + (this.nextByte() << 8) + (this.nextByte() << 16) + (this.nextByte() << 24);
    rewindOffset = offset;
}
function CsmFile(filedata) {
    var HEADER_SIZE = 192;
    var TapeState = {
        PILOT_HEADER: 0,
        SYNC_HEADER: 1,
        HEADER: 2,
        HEADER_END_OF_DATA: 3,
        PILOT_HEADER_END: 4,
        SYNC_HEADER_REPEAT: 5,
        HEADER_REPEAT: 6,
        HEADER_REPEAT_END_OF_DATA: 7,
        PILOT_HEADER_TRAILER: 8,
        SILENCE: 9,
        PILOT_DATA: 10,
        SYNC_DATA: 11,
        DATA: 12,
        DATA_END_OF_DATA: 13,
        PILOT_DATA_END: 14,
        SYNC_DATA_REPEAT: 15,
        DATA_REPEAT: 16,
        DATA_REPEAT_END_OF_DATA: 17,
        PILOT_DATA_TRAILER: 18,
        END_TAPE: 19
    }
    var currentOffset = 0;
    var data = filedata;
    var dataSize = 0;
    var bitData = null;
    var pulseData = null;
    var pulseDataSync = null;
    var state = 0;
    var count = 0;
    this.rewind = function() {
        pulseDataSync = new PulseWidthSyncGenerator();
        bitData = new TapeBitDataStream();
        pulseData = new PulseWidthsFromBitData(bitData);
        state = TapeState.PILOT_HEADER;
        count = 0x600;
        currentOffset = 0;
    }
    this.nextPulseWidth = function() {
        if (state == TapeState.PILOT_HEADER) {
            if (--count == 0) {
                state = TapeState.SYNC_HEADER;
                console.log(state);
                pulseDataSync.reset(false);
            } else {
                return Config.S;
            }
        }
        if (state == TapeState.SYNC_HEADER) {
            try {
                return pulseDataSync.nextPulseWidth();
            } catch (ex) {
                if (!(ex instanceof EOFException))
                    throw ex;
                state = TapeState.HEADER;
                console.log(state);
                pulseData.reset();
                bitData.setData(data, currentOffset, HEADER_SIZE);
                console.log("header currentOffset = " + currentOffset.toString(16));
                var startAddress = (data[currentOffset + 1] & 0xFF) | ((data[currentOffset + 2] & 0xFF) << 8);
                console.log("start address = " + startAddress.toString(16));
                var endAddress = (data[currentOffset + 3] & 0xFF) | ((data[currentOffset + 4] & 0xFF) << 8);
                console.log("end address = " + endAddress.toString(16));
                dataSize = endAddress - startAddress;
                console.log("dataSize = " + dataSize.toString(16));
            }
        }
        if (state == TapeState.HEADER) {
            try {
                return pulseData.nextPulseWidth();
            } catch (ex) {
                if (!(ex instanceof EOFException))
                    throw ex;
                state = TapeState.HEADER_END_OF_DATA;
                console.log(state);
                count = 3;
            }
        }
        if (state == TapeState.HEADER_END_OF_DATA) {
            state = TapeState.PILOT_HEADER_END;
            console.log(state);
            count = 0x4F;
        }
        if (state == TapeState.PILOT_HEADER_END) {
            if (--count == 0) {
                state = TapeState.SYNC_HEADER_REPEAT;
                console.log(state);
                pulseDataSync.reset(true);
            } else
                return Config.S;
        }
        if (state == TapeState.SYNC_HEADER_REPEAT) {
            try {
                return pulseDataSync.nextPulseWidth();
            } catch (ex) {
                if (!(ex instanceof EOFException))
                    throw ex;
                state = TapeState.HEADER_REPEAT;
                console.log(state);
                pulseData.reset();
                bitData.setData(data, currentOffset, HEADER_SIZE);
                currentOffset += HEADER_SIZE;
            }
        }
        if (state == TapeState.HEADER_REPEAT) {
            try {
                return pulseData.nextPulseWidth();
            } catch (ex) {
                if (!(ex instanceof EOFException))
                    throw ex;
                state = TapeState.HEADER_REPEAT_END_OF_DATA;
                console.log(state);
                count = 3;
            }
        }
        if (state == TapeState.HEADER_REPEAT_END_OF_DATA) {
            state = TapeState.PILOT_HEADER_TRAILER;
            console.log(state);
            count = 0x4E;
        }
        if (state == TapeState.PILOT_HEADER_TRAILER) {
            if (--count == 0) {
                state = TapeState.SILENCE;
                console.log(state);
                count = 400000;
            }
            return Config.S;
        }
        if (state == TapeState.SILENCE) {
            if (--count == 0) {
                state = TapeState.PILOT_DATA;
                console.log(state);
                count = 0x1A00;
            }
            return 0;
        }
        if (state == TapeState.PILOT_DATA) {
            if (--count == 0) {
                state = TapeState.SYNC_DATA;
                console.log(state);
                pulseDataSync.reset(false);
            }
            return Config.S;
        }
        if (state == TapeState.SYNC_DATA) {
            try {
                return pulseDataSync.nextPulseWidth();
            } catch (ex) {
                if (!(ex instanceof EOFException))
                    throw ex;
                state = TapeState.DATA;
                console.log(state);
                pulseData.reset();
                console.log("data currentOffset = " + currentOffset.toString(16));
                bitData.setData(data, currentOffset, dataSize);
            }
        }
        if (state == TapeState.DATA) {
            try {
                return pulseData.nextPulseWidth();
            } catch (ex) {
                if (!(ex instanceof EOFException))
                    throw ex;
                state = TapeState.DATA_END_OF_DATA;
                console.log(state);
                count = 3;
            }
        }
        if (state == TapeState.DATA_END_OF_DATA) {
            state = TapeState.PILOT_DATA_END;
            console.log(state);
            count = 0x4F;
        }
        if (state == TapeState.PILOT_DATA_END) {
            if (--count == 0) {
                state = TapeState.PILOT_DATA_TRAILER;
                console.log(state);
                count = 0x4E;
            }
            return Config.S;
        }
        if (state == TapeState.PILOT_DATA_TRAILER) {
            if (--count == 0) {
                state = TapeState.SYNC_DATA_REPEAT;
                console.log(state);
                pulseDataSync.reset(true);
            }
            return Config.S;
        }
        if (state == TapeState.SYNC_DATA_REPEAT) {
            try {
                return pulseDataSync.nextPulseWidth();
            } catch (ex) {
                if (!(ex instanceof EOFException))
                    throw ex;
                state = TapeState.DATA_REPEAT;
                console.log(state);
                pulseData.reset();
                bitData.setData(data, currentOffset, dataSize);
                currentOffset += dataSize;
            }
        }
        if (state == TapeState.DATA_REPEAT) {
            try {
                return pulseData.nextPulseWidth();
            } catch (ex) {
                if (!(ex instanceof EOFException))
                    throw ex;
                state = TapeState.DATA_REPEAT_END_OF_DATA;
                console.log(state);
            }
        }
        if (state == TapeState.DATA_REPEAT_END_OF_DATA) {
            if (currentOffset == data.length) {
                state = TapeState.END_TAPE;
                console.log(state);
            } else {
                console.log("next file: " + currentOffset.toString(16) + "/" + data.length.toString(16));
                state = TapeState.PILOT_HEADER;
                console.log(state);
                count = 0x1000;
            }
            return 0;
        }
        if (state == TapeState.END_TAPE) {
            return -1;
        }
        throw new RuntimeException("CsmFile::nextPulseWidth INVALID STATE");
    }
    this.rewind();
}
