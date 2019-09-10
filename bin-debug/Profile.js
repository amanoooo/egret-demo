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
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        return _super.call(this) || this;
    }
    Profile.prototype.show = function (stage) {
        console.log('1');
        var panel = new eui.Panel();
        panel.skinName = 'resource/Profile.exml';
        panel.percentWidth = 80;
        panel.title = "属性";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        console.log('panel', panel);
        stage.addChild(panel);
    };
    return Profile;
}(egret.Sprite));
__reflect(Profile.prototype, "Profile");
