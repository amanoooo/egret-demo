let pressTime



class KeyBoard {
    inputs = [];
	/**
	 * 同一时刻按下多个键：则返回多个键的字符串数组。
	 */
    static onkeydown = "KeyBoardonkeydown";

    static NumLock = "NumLock";
    static Num_Slash = "num_/";
    static Num_Mul = "num_*";
    static Num_Sub = "num_-";
    static Num_7 = "num_7";
    static Num_8 = "num_8";
    static Num_9 = "num_9";
    static Num_Plus = "num_+";
    static Num_4 = "num_4";
    static Num_5 = "num_5";
    static Num_6 = "num_6";
    static Num_1 = "num_1";
    static Num_2 = "num_2";
    static Num_3 = "num_3";
    static Num_Enter = "num_Enter";
    static Num_0 = "num_0";
    static Num_dot = "num_.";

    //第一行
    static Esc = "Esc";//27
    static F1 = "F1";
    static F2 = "F2";
    static F3 = "F3";
    static F4 = "F4";
    static F5 = "F5";
    static F6 = "F6";
    static F7 = "F7";
    static F8 = "F8";
    static F9 = "F9";
    static F10 = "F10";
    static F11 = "F11";
    static F12 = "F12";
    static PrintScreen = "PrintScreen";
    static ScrollLock = "ScrollLock";
    static PauseBreak = "PauseBreak";
    //第二行
    static key_Points = "`";
    static key_1 = "1";
    static key_2 = "2";
    static key_3 = "3";
    static key_4 = "4";
    static key_5 = "5";
    static key_6 = "6";
    static key_7 = "7";
    static key_8 = "8";
    static key_9 = "9";
    static key_0 = "0";
    static key_Sub = "-";
    static key_Plus = "=";
    static Backspace = "Backspace";
    static Insert = "Insert";
    static Home = "Home";
    static PageUp = "PageUp";

    //第三行
    static Tab = "Tab";
    static Q = "Q";
    static W = "W";
    static E = "E";
    static R = "R";
    static T = "T";
    static Y = "Y";
    static U = "U";
    static I = "I";
    static O = "O";
    static P = "P";
    static brace1 = "[";
    static brace2 = "]";
    static CnterEnter = "Enter";
    static Delete = "Delete";
    static End = "End";
    static PageDown = "PageDown";

    //第四行
    static CapsLock = "CapsLock";
    static A = "A";
    static S = "S";
    static D = "D";
    static F = "F";
    static G = "G";
    static H = "H";
    static J = "J";
    static K = "K";
    static L = "L";
    static semicolon = ";";
    static quotes = ",";
    static bar = "|";

    //第五行
    static key_Shift = "Shift";
    static Z = "Z";
    static X = "X";
    static C = "C";
    static V = "V";
    static B = "B";
    static N = "N";
    static M = "M";
    static key_Semicolon = ",";
    static key_Dot = ".";
    static question = "/";
    static Right_Shift = "Shift";
    static UpArrow = "up";

    //第六行
    static left_Ctrl = "Ctrl";
    static Left_Win = "left_win";
    static key_Alt = "Alt";
    static SPACE = "SPACE";
    static RIGH_Alt = "RIGH_Alt";
    static RIGHT_WIN = "right_win";
    static NoteSign = "NoteSign";
    static RIGHT_Ctrl = "Ctrl";
    static keyArrow = "left";
    static DownArrow = "down";
    static RightArrow = "right";



    keyValue = {
        "27": KeyBoard.Esc,
        "112": KeyBoard.F1,
        "113": KeyBoard.F2,
        "114": KeyBoard.F3,
        "115": KeyBoard.F4,
        "116": KeyBoard.F5,
        "117": KeyBoard.F6,
        "118": KeyBoard.F7,
        "119": KeyBoard.F8,
        "120": KeyBoard.F9,
        "121": KeyBoard.F10,
        "122": KeyBoard.F11,
        "123": KeyBoard.F12,
        "42": KeyBoard.PrintScreen,
        "145": KeyBoard.ScrollLock,
        "19": KeyBoard.PauseBreak,

        "192": KeyBoard.key_Points,
        "49": KeyBoard.key_1,
        "50": KeyBoard.key_2,
        "51": KeyBoard.key_3,
        "52": KeyBoard.key_4,
        "53": KeyBoard.key_5,
        "54": KeyBoard.key_6,
        "55": KeyBoard.key_7,
        "56": KeyBoard.key_8,
        "57": KeyBoard.key_9,
        "48": KeyBoard.key_0,
        "189": KeyBoard.key_Sub,
        "187": KeyBoard.key_Plus,
        "8": KeyBoard.Backspace,
        "45": KeyBoard.Insert,
        "36": KeyBoard.Home,
        "33": KeyBoard.PageUp,
        "144": KeyBoard.NumLock,
        "111": KeyBoard.Num_Slash,
        "106": KeyBoard.Num_Mul,
        "109": KeyBoard.Num_Sub,

        "9": KeyBoard.Tab,
        "81": KeyBoard.Q,
        "87": KeyBoard.W,
        "69": KeyBoard.E,
        "82": KeyBoard.R,
        "84": KeyBoard.T,
        "89": KeyBoard.Y,
        "85": KeyBoard.U,
        "73": KeyBoard.I,
        "79": KeyBoard.O,
        "80": KeyBoard.P,
        "219": KeyBoard.brace1,
        "221": KeyBoard.brace2,
        "13": KeyBoard.CnterEnter,// "13" : KeyBoard.Num_Enter,
        "46": KeyBoard.Delete,
        "35": KeyBoard.End,
        "34": KeyBoard.PageDown,
        "103": KeyBoard.Num_7,
        "104": KeyBoard.Num_8,
        "105": KeyBoard.Num_9,
        "107": KeyBoard.Num_Plus,

        "20": KeyBoard.CapsLock,
        "65": KeyBoard.A,
        "83": KeyBoard.S,
        "68": KeyBoard.D,
        "70": KeyBoard.F,
        "71": KeyBoard.G,
        "72": KeyBoard.H,
        "74": KeyBoard.J,
        "75": KeyBoard.K,
        "76": KeyBoard.L,
        "186": KeyBoard.semicolon,
        "222": KeyBoard.quotes,
        "220": KeyBoard.bar,
        "100": KeyBoard.Num_4,
        "101": KeyBoard.Num_5,
        "102": KeyBoard.Num_6,

        "16": KeyBoard.key_Shift,//"16" : KeyBoard.Right_Shift,
        "90": KeyBoard.Z,
        "88": KeyBoard.X,
        "67": KeyBoard.C,
        "86": KeyBoard.V,
        "66": KeyBoard.B,
        "78": KeyBoard.N,
        "77": KeyBoard.M,
        "188": KeyBoard.key_Semicolon,
        "190": KeyBoard.key_Dot,
        "191": KeyBoard.question,
        "38": KeyBoard.UpArrow,
        "97": KeyBoard.Num_1,
        "98": KeyBoard.Num_2,
        "99": KeyBoard.Num_3,
        // "13" : KeyBoard.Num_Enter,

        "17": KeyBoard.left_Ctrl,//"17" : KeyBoard.Num_Ctrl,
        "91": KeyBoard.Left_Win,
        "18": KeyBoard.key_Alt,//"18" : KeyBoard.RIGH_Alt,
        "32": KeyBoard.SPACE,
        "92": KeyBoard.RIGHT_WIN,
        "93": KeyBoard.NoteSign,
        "37": KeyBoard.keyArrow,
        "40": KeyBoard.DownArrow,
        "39": KeyBoard.RightArrow,
        "96": KeyBoard.Num_0,
        "110": KeyBoard.Num_dot

    }
    constructor() {
        this.init();
    }
    init() {
        var self = this;
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.handlekeydown(e);
            if (self.inputs.length > 0) {
                const now = Date.now()

                if (pressTime && (now - pressTime < DURATION)) {
                    console.log('throttle key press');
                    return
                }
                pressTime = now

                //console.log(self.inputs.length)
                // self.dispatchEventWith(KeyBoard.onkeydown, true, self.inputs, true);
                self.postMessage(self.inputs);
            }
        }
        document.onkeyup = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.handlekeyup(e);
            if (self.inputs.length > 0) {

                self.postMessage(self.inputs);
                // self.dispatchEventWith(KeyBoard.onkeyup, true, self.inputs, true);
            }
        }
        document.onmousedown = function (event) {
            self.inputs = [];
        }
    }
    //处理键盘按下对应keycode
    handlekeydown(e) {
        for (var item in this.keyValue) {
            if (parseInt(item) == e.keyCode) {
                this.checkInput(this.keyValue[item]);
            }
        }
    }
    //处理键盘抬起对应keycode
    handlekeyup(e) {
        for (var item in this.keyValue) {
            if (parseInt(item) == e.keyCode) {
                this.removeByKey(this.keyValue[item]);
            }
        }
    }
    //通过key添加
    checkInput(key) {
        let isContain = false;
        for (let i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i] == key) {
                isContain = true;
            }
        }
        if (!isContain) {
            this.inputs.push(key);
        }
    }
    //通过key删除
    removeByKey(key) {
        for (let i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i] == key) {
                this.inputs.splice(i, 1);
            }
        }
    }
	/**
	 * 判断data字符串数组中是否包含某个字符串
	 */
    isContain(data, keyCode) {
        let isContain = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i] == keyCode) {
                isContain = true;
            }
        }
        return isContain;
    }



}

self.addEventListener('message', function (e) {
    self.postMessage('You said: ' + e.data);
}, false);