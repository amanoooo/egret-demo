

class Map {
    layer: eui.UILayer

    map: tiled.TMXTilemap
    oldmap: tiled.TMXTilemap
    cacheX: tiled.TMXTilemap
    cacheY: tiled.TMXTilemap
    cacheZ: tiled.TMXTilemap
    oldcacheX: tiled.TMXTilemap
    oldcacheY: tiled.TMXTilemap
    oldcacheZ: tiled.TMXTilemap

    kb: KeyBoard


    loadMap(layer: eui.UILayer) {
        this.layer = layer
        const request = new egret.HttpRequest();
        request.once(egret.Event.COMPLETE, this.onMapComplete, this);
        request.open(posInfo.map.id, egret.HttpMethod.GET);
        request.send();
    }
    onMapComplete(event: egret.Event) {
        var data: any = egret.XML.parse(event.currentTarget.response);

        this.map = new tiled.TMXTilemap(MAPSIDE * TILESIDE, MAPSIDE * TILESIDE, data, posInfo.map.id);
        this.map.x = posInfo.map.x
        this.map.y = posInfo.map.y
        this.map.name = posInfo.map.id
        this.map.render()

        this.layer.addChild(this.map)
        this.layer.setChildIndex(this.map, 0)


        this.kb = new KeyBoard();
        this.kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);
    }

    destoryOldMap() {

    }
    reloadMainMap() {
        const targets = ['cacheX', 'cacheY', 'cacheZ']
        for (var key in targets) {

            const target = targets[key]

            if (posInfo.map.refresh && this[target] && (this[target].name === posInfo.map.id)) {
                this.oldmap = this.map
                this.map = this[target]
                // this.map.x = posInfo.map.x
                // this.map.y = posInfo.map.y
                console.log('use %s as main map', target, );
                break
            }
        }

    }

    onTweenFinish = () => {
        console.log('finish', self);
        if (this.kb.inputs.length > 0) {
            this.handleKey(this.lastKey)
        } else {
            this.kb.bind()
        }
    }
    tweenMove() {
        if (this.map) {
            const tw = egret.Tween.get(this.map);
            tw.to({ x: posInfo.map.x, y: posInfo.map.y }, DURATION).call(this.onTweenFinish)
        }
    }
    renderMainMap() {
        this.reloadMainMap()

        this.renderCache('cacheX')
        this.renderCache('cacheY')
        this.renderCache('cacheZ')

        this.tweenMove()

        this.oldmap = null
        this.oldcacheX = null
        this.oldcacheY = null
        this.oldcacheZ = null
    }
    reloadCache(target, possibleTarget, mapInfo): boolean {
        if (this[possibleTarget] && this[possibleTarget].name === mapInfo.id) {
            this['old' + target] = this[target]
            this[target] = this[possibleTarget]
            console.log('use %s as %s cache', possibleTarget, target);
            const tw = egret.Tween.get(this[target]);
            tw.to({ x: posInfo[target].x, y: posInfo[target].y }, DURATION);
            return true
        }
        return false
    }
    renderCache(target: 'cacheX' | 'cacheY' | 'cacheZ') {

        const mapInfo = posInfo[target]
        // console.debug('mapInfo', mapInfo);

        if (mapInfo.refresh) {
            console.debug('%s refresh true', target);
            if (this[target]) {
                if (posInfo[target].reserved) {
                    console.debug('skip destory %s', target)
                } else {
                    console.debug('destory', target);
                    this[target].destory()
                    this[target] = null
                }
            }

            // 边界不渲染
            if (!mapInfo.id) {
                console.log('invalid %s id, skip cache', target);
                return
            }

            console.debug('try cache ', target, mapInfo.id);

            let isSuccess = false
            const targets = ['cacheX', 'cacheY', 'cacheZ', 'oldcacheX', 'oldcacheY', 'oldcacheZ', 'oldmap']
            for (var key in targets) {
                isSuccess = this.reloadCache(target, targets[key], mapInfo)
                if (isSuccess) return
            }
            if (isSuccess) return



            const request = new egret.HttpRequest();
            request.once(egret.Event.COMPLETE, function (event: egret.Event) {
                var data: any = egret.XML.parse(event.currentTarget.response);

                this[target] = new tiled.TMXTilemap(MAPSIDE * TILESIDE, MAPSIDE * TILESIDE, data, mapInfo.id);
                this[target].x = posInfo[target].x
                this[target].y = posInfo[target].y

                this[target].render()
                this[target].name = mapInfo.id
                console.log('caching map', target, this[target]);


                this.layer.addChild(this[target])
                this.layer.setChildIndex(this[target], 0)
            }, this);
            request.open(mapInfo.id, egret.HttpMethod.GET);
            request.send();

        } else {
            if (this[target]) {
                console.log('cached ', target)
                const tw = egret.Tween.get(this[target]);
                tw.to({ x: posInfo[target].x, y: posInfo[target].y }, DURATION);
            }
        }



    }
    lastKey: string
    handleKey(key: string) {
        console.log('handleKey', key);
        this.lastKey = key
        switch (key) {
            case 'up': {
                posInfo.user.y--
                break
            }
            case 'down': {
                posInfo.user.y++
                break
            }
            case 'left': {
                posInfo.user.x--
                break
            }
            case 'right': {
                posInfo.user.x++
                break
            }
            default:
                return
        }
        calcPos()
        this.renderMainMap()

        // this.cacheMap() 
    }
    onkeydown(event: egret.Event) {

        const key = event.data.length === 1 ? event.data[0] : 'error'
        this.handleKey(key)
    }
}