var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var mockData = {
    life: {
        key: '生命:',
        oldValue: 20,
        value: 20,
        point: 0,
        minus: 'life-minus',
        plus: 'life-plus',
        scale: 20
    },
    attack: {
        key: '攻击:',
        oldValue: 1,
        value: 1,
        point: 0,
        minus: 'attack-minus',
        plus: 'attack-plus',
        scale: 1
    },
    defense: {
        key: '防御:',
        oldValue: 1,
        value: 1,
        point: 0,
        minus: 'defense-minus',
        plus: 'defense-plus',
        scale: 1
    },
    speed: {
        key: '敏捷:',
        oldValue: 1,
        value: 1,
        point: 0,
        minus: 'speed-minus',
        plus: 'speed-plus',
        scale: 1
    },
};
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        var _this = _super.call(this) || this;
        _this.info = {
            points: 10,
            nick: '尼洛'
        };
        _this.data = {};
        _this.keys = [];
        _this.data = mockData;
        _this.keys = Object.keys(mockData);
        return _this;
    }
    Profile.prototype.show = function (stage) {
        this.panel = new eui.Panel();
        var panel = this.panel;
        panel['data'] = this.info;
        panel.skinName = "resource/Profile.exml";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        panel.percentWidth = 80;
        // panel.percentHeight = 50
        var propsGroup = panel.getChildByName('props');
        var bottomGroup = panel.getChildByName('bottom');
        for (var i = 0; i < this.keys.length; i++) {
            var item = new eui.Component();
            item.skinName = 'resource/ProfileItem.exml';
            item.percentWidth = 100;
            item['data'] = this.data[this.keys[i]];
            propsGroup.addChild(item);
        }
        propsGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPointClick, this);
        var cancel = bottomGroup.getChildByName('cancel');
        var confirm = bottomGroup.getChildByName('confirm');
        cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
        confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        // const popup = new eui.TitleWindow()
        stage.addChild(panel);
    };
    Profile.prototype.onPointClick = function (e) {
        var _a = e.target.name.split('-'), name = _a[0], action = _a[1];
        var _b = this, data = _b.data, keys = _b.keys;
        if (keys.indexOf(name) > -1) {
            console.log(name, action);
            if (action === 'plus' && this.info.points > 0) {
                data[name].point++;
                data[name].value = data[name].oldValue + data[name].point * data[name].scale;
                this.info.points--;
            }
            else if (action === 'minus' && data[name].point > 0) {
                data[name].point--;
                data[name].value = data[name].oldValue + data[name].point * data[name].scale;
                this.info.points++;
            }
        }
    };
    Profile.prototype.onCancelClick = function (e) {
        this.panel.close();
    };
    Profile.prototype.onConfirmClick = function (e) {
        this.panel.close();
    };
    return Profile;
}(egret.Sprite));
__reflect(Profile.prototype, "Profile");
