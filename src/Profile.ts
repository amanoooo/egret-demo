
const data = {
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
}
const keys = Object.keys(data)

class Profile extends egret.Sprite {
    points: number = 10
    public constructor() {
        super();
    }
    public show(stage) {

        let panel = new eui.Panel();
        panel['data'] = { points: this.points }
        panel.skinName = "resource/Profile.exml"
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        panel.percentWidth = 80
        // panel.percentHeight = 50

        console.log('panel', panel)



        const propsGroup = panel.getChildByName('props') as eui.Group

        console.log('propsGroup', propsGroup);


        for (var i = 0; i < keys.length; i++) {
            const item = new eui.Component()
            item.skinName = 'resource/ProfileItem.exml'
            item.percentWidth = 100
            item['data'] = data[keys[i]]
            console.log('item', item);

            propsGroup.addChild(item)
        }
        propsGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPointClick, this);



        stage.addChild(panel);

    }
    private onPointClick(e) {
        const [name, action] = e.target.name.split('-')
        if (keys.indexOf(name) > -1) {
            console.log(name, action);
            if (action === 'plus' && this.points > 0) {
                data[name].point++
                this.points--
            } else if (action === 'minus' && data[name].point > 0) {
                data[name].point--
                this.points++
            }
        }
    }
}
