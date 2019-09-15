
type CacheTarget = 'cacheMapLeft' | 'cacheMapRight' | 'cacheMapUp' | 'cacheMapDown'
function isTargetX(target: string) {
    return ['cacheMapLeft', 'cacheMapRight'].indexOf(target) > -1
}
function isTargetY(target: string) {
    return ['cacheMapUp', 'cacheMapDown'].indexOf(target) > -1
}

class Map {
    layer: eui.UILayer
    map: tiled.TMXTilemap
    cacheMapLeft: tiled.TMXTilemap
    cacheMapRight: tiled.TMXTilemap
    cacheMapUp: tiled.TMXTilemap
    cacheMapDown: tiled.TMXTilemap
    lastCacheX: Pos.TildId | undefined
    lastCacheY: Pos.TildId | undefined
    lastMapId: Pos.TildId | undefined

    cacheX: tiled.TMXTilemap
    cacheY: tiled.TMXTilemap
    cacheZ: tiled.TMXTilemap


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
        this.map.render()
        // this.map.touchEnabled = true
        // this.map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);

        this.layer.addChild(this.map)
        this.layer.setChildIndex(this.map, 0)


        const kb = new KeyBoard();
        kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);
        this.lastMapId = posInfo.map.id
    }

    reloadMainMap() {
        if (this.lastMapId && this.lastMapId !== posInfo.map.id) {
            console.log('reload');
            this.map.destory()
            // this.map = undefined
            // this.loadMap(this.layer)
        }
    }
    cache2(target: | 'cacheX' | 'cacheY' | 'cacheZ') {
        this.reloadMainMap()

        const mapInfo = posInfo[target]
        // console.log('mapInfo', mapInfo);

        if (posInfo[target].refresh) {
            console.log('try destry', target);
            if (this[target]) {
                this[target].destory()
                console.log('destoryed')
                return
            }

            if (!mapInfo.id) {
                console.log('do not cache due to ', target, mapInfo);
                return
            }
            console.log('caching ', target, mapInfo.id);
            const request = new egret.HttpRequest();
            request.once(egret.Event.COMPLETE, function (event: egret.Event) {
                var data: any = egret.XML.parse(event.currentTarget.response);

                this[target] = new tiled.TMXTilemap(MAPSIDE * TILESIDE, MAPSIDE * TILESIDE, data, mapInfo.id);
                this[target].x = posInfo[target].x
                this[target].y = posInfo[target].y

                this[target].render()
                console.log('cache map', target);


                this.layer.addChild(this[target])
                this.layer.setChildIndex(this[target], 0)
            }, this);
            request.open(mapInfo.id, egret.HttpMethod.GET);
            request.send();

        } else {
            console.log('cached ', target);
            this[target].x = posInfo[target].x
            this[target].y = posInfo[target].y
        }



    }

    onkeydown(event: egret.Event) {

        const key = event.data.length === 1 ? event.data[0] : 'error'
        switch (key) {
            case 'up': {
                posInfo.user.y--
                calcPos()
                this.map.y = posInfo.map.y
                this.cache2('cacheY')
                this.cache2('cacheX')
                break
            }
            case 'down': {
                posInfo.user.y++
                calcPos()
                this.map.y = posInfo.map.y
                this.cache2('cacheY')
                this.cache2('cacheX')
                break
            }
            case 'left': {
                posInfo.user.x--
                calcPos()
                this.map.x = posInfo.map.x
                this.cache2('cacheY')
                this.cache2('cacheX')

                break
            }
            case 'right': {
                posInfo.user.x++
                calcPos()
                this.map.x = posInfo.map.x
                this.cache2('cacheY')
                this.cache2('cacheX')

                break
            }
            default:
                break
        }
        // this.cacheMap()
    }
}