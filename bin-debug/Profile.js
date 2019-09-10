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
var data = {
    life: {
        key: '生命:',
        value: 0,
        point: 0,
        minus: 'life-minus',
        plus: 'life-plus'
    },
    attack: {
        key: '攻击:',
        value: 0,
        point: 0,
        minus: 'attack-minus',
        plus: 'attack-plus'
    },
    defense: {
        key: '防御:',
        value: 0,
        point: 0,
        minus: 'defense-minus',
        plus: 'defense-plus'
    },
    speed: {
        key: '敏捷:',
        value: 0,
        point: 0,
        minus: 'speed-minus',
        plus: 'speed-plus'
    },
};
var keys = Object.keys(data);
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        var _this = _super.call(this) || this;
        _this.points = 10;
        return _this;
    }
    Profile.prototype.show = function (stage) {
        var panel = new eui.Panel();
        panel.skinName = "resource/Profile.exml";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        panel.percentWidth = 80;
        // panel.percentHeight = 50
        console.log('panel', panel);
        var propsGroup = panel.getChildByName('props');
        var points = propsGroup.getChildByName('points');
        console.log('points', points);
        points['data'] = { points: 10 };
        console.log('propsGroup', propsGroup);
        for (var i = 0; i < keys.length; i++) {
            var item = new eui.Component();
            item.skinName = 'resource/ProfileItem.exml';
            item.percentWidth = 100;
            item['data'] = data[keys[i]];
            console.log('item', item);
            propsGroup.addChild(item);
        }
        propsGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPointClick, this);
        stage.addChild(panel);
    };
    Profile.prototype.onPointClick = function (e) {
        var _a = e.target.name.split('-'), name = _a[0], action = _a[1];
        if (keys.indexOf(name) > -1) {
            console.log(name, action);
            if (action === 'plus') {
                data[name].point++;
            }
            else {
                data[name].point--;
            }
        }
    };
    return Profile;
}(egret.Sprite));
__reflect(Profile.prototype, "Profile");
