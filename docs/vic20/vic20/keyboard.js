$.extend(Config, new function() {
    this.joykeys = true;
}
);
var keysdown = [0, 0, 0, 0, 0, 0, 0, 0];
var up, down, left, right, fire;
var pageup = 0;
keymap = [[50], [52], [54], [56], [48], [187, 107, 61], [36], [118], [81], [69], [84], [85], [79], [219, 91], [-1], [116], [17], [83], [70], [72], [75], [186, 59], [220, 92], [114], [32], [90], [67], [66], [77], [190, 46], [16], [112], [20], [16], [88], [86], [78], [188, 44], [191, 47], [40], [9], [65], [68], [71], [74], [76], [222], [39], [192, 96], [87], [82], [89], [73], [80], [221, 93], [13], [49], [51], [53], [55], [57], [189, 109], [220, 92], [8]];
function KeyboardInit() {
    Config.joykeys = 1;
    up = down = left = right = fire = 0;
    KeyboardHook();
    document.onhelp = function() {
        return (false);
    }
    window.onhelp = function() {
        return (false);
    }
}
function KeyboardHook() {
    document.onkeypress = function() {
        return false
    }
    ;
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
}
function KeyboardUnhook() {
    document.onkeypress = null
    document.onkeydown = null;
    document.onkeyup = null;
}
function keyDown(e) {
    var keyCode = document.all ? event.keyCode : e.which;
    cancelKeyEvent(e);
    applyKey(keyCode, false);
    return false;
}
function cancelKeyEvent(e) {
    if (window.event) {
        try {
            window.event.keyCode = 0;
        } catch (e) {}
        window.event.returnValue = false;
        window.event.cancelBubble = true;
    }
    if (e.preventDefault)
        e.preventDefault();
    if (e.stopPropagation)
        e.stopPropagation();
}
function keyUp(e) {
    var keyCode = document.all ? event.keyCode : e.which;
    cancelKeyEvent(e);
    applyKey(keyCode, true);
    return false;
}
function applyKey(sym, keyup) {
    if (Config.joykeys) {
        var isJoystick = true;
        if (sym == 37)
            left = !keyup;
        else if (sym == 39)
            right = !keyup;
        else if (sym == 38)
            up = !keyup;
        else if (sym == 40)
            down = !keyup;
        else if (sym == 192 || sym == 96 || sym == 17)
            fire = !keyup;
        else
            isJoystick = false;
        if (isJoystick)
            return;
    }
    if (sym == 33) {
        pageup = keyup ? 1 : 0;
        vic20.via2.ca1 = pageup;
    }
    for (var i = 0; i < 64; i++) {
        var kml = keymap[i].length;
        for (var j = 0; j < kml; j++) {
            if (keymap[i][j] == sym) {
                if (keyup)
                    keysdown[7 - (i >> 3)] &= ~(1 << (i & 7));
                else
                    keysdown[7 - (i >> 3)] |= (1 << (i & 7));
            }
        }
    }
    if (sym == 113) {
        if (keyup) {
            keysdown[3] &= ~0x02;
            keysdown[4] &= ~0x80;
        } else {
            keysdown[3] |= 0x02;
            keysdown[4] |= 0x80;
        }
    } else if (sym == 115) {
        if (keyup) {
            keysdown[3] &= ~0x02;
            keysdown[5] &= ~0x80;
        } else {
            keysdown[3] |= 0x02;
            keysdown[5] |= 0x80;
        }
    } else if (sym == 117) {
        if (keyup) {
            keysdown[3] &= ~0x02;
            keysdown[6] &= ~0x80;
        } else {
            keysdown[3] |= 0x02;
            keysdown[6] |= 0x80;
        }
    } else if (sym == 119) {
        if (keyup) {
            keysdown[3] &= ~0x02;
            keysdown[7] &= ~0x80;
        } else {
            keysdown[3] |= 0x02;
            keysdown[7] |= 0x80;
        }
    } else if (sym == 37) {
        if (keyup) {
            keysdown[3] &= ~0x02;
            keysdown[2] &= ~0x80;
        } else {
            keysdown[3] |= 0x02;
            keysdown[2] |= 0x80;
        }
    } else if (sym == 38) {
        if (keyup) {
            keysdown[3] &= ~0x02;
            keysdown[3] &= ~0x80;
        } else {
            keysdown[3] |= 0x02;
            keysdown[3] |= 0x80;
        }
    }
}
