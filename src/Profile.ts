


class Profile extends egret.Sprite {

    public constructor() {
        super();
    }
    public show(stage) {
        console.log('1');

        let panel = new eui.Panel();
        panel.skinName = 'resource/Profile.exml'
        panel.percentWidth = 80
        panel.title = "属性";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;

        console.log('panel', panel)


        stage.addChild(panel);

    }
}
