
const mockData = {
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
}

class Profile extends egret.Sprite {
    info = {
        points: 10,
        nick: '尼洛'
    }
    data = {}
    keys = []
    panel: eui.Panel
    public constructor() {
        super();
        this.data = mockData
        this.keys = Object.keys(mockData)
    }
    public show(stage) {

        this.panel = new eui.Panel();
        const { panel } = this
        panel['data'] = this.info
        panel.skinName = "resource/Profile.exml"
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        panel.percentWidth = 80
        // panel.percentHeight = 50


        const propsGroup = panel.getChildByName('props') as eui.Group
        const bottomGroup = panel.getChildByName('bottom') as eui.Group


        for (var i = 0; i < this.keys.length; i++) {
            const item = new eui.Component()
            item.skinName = 'resource/ProfileItem.exml'
            item.percentWidth = 100
            item['data'] = this.data[this.keys[i]]

            propsGroup.addChild(item)
        }
        propsGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPointClick, this);

        const cancel = bottomGroup.getChildByName('cancel')
        const confirm = bottomGroup.getChildByName('confirm')
        cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
        confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);



        // const popup = new eui.TitleWindow()
        stage.addChild(panel);

    }
    private onPointClick(e) {
        const [name, action] = e.target.name.split('-')
        const { data, keys } = this
        if (keys.indexOf(name) > -1) {
            console.log(name, action);
            if (action === 'plus' && this.info.points > 0) {
                data[name].point++
                data[name].value = data[name].oldValue + data[name].point * data[name].scale
                this.info.points--

            } else if (action === 'minus' && data[name].point > 0) {
                data[name].point--
                data[name].value = data[name].oldValue + data[name].point * data[name].scale
                this.info.points++
            }
        }
    }
    private onCancelClick(e) {
        this.panel.close()
    }
    private onConfirmClick(e) {
        this.panel.close()
    }
}
