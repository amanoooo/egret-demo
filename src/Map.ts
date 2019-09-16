

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

    lastReloadTime: number


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


        const kb = new KeyBoard();
        kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);
    }

    destoryOldMap() {

    }
    reloadMainMap(target) {
        if (posInfo.map.refresh && this[target] && (this[target].name === posInfo.map.id)) {
            this.oldmap = this.map
            this.map = this[target]
            this.map.x = posInfo.map.x
            this.map.y = posInfo.map.y

            console.log('use %s as main map', target, );
        }
    }

    cache2() {
        this.reloadMainMap('cacheX')
        this.reloadMainMap('cacheY')
        this.reloadMainMap('cacheZ')


        this.cache3('cacheX')
        this.cache3('cacheY')
        this.cache3('cacheZ')


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
            this[target].x = posInfo[target].x
            this[target].y = posInfo[target].y
            return true
        }
        return false
    }
    cache3(target: 'cacheX' | 'cacheY' | 'cacheZ') {

        const mapInfo = posInfo[target]
        // console.log('mapInfo', mapInfo);

        if (mapInfo.refresh) {
            console.log('%s refresh true', target);
            if (this[target]) {
                if (posInfo[target].reserved) {
                    console.log('skip destory %s', target)
                } else {
                    console.log('destory', target);
                    this[target].destory()
                }
            }

            // 边界不渲染
            if (!mapInfo.id) {
                console.log('invalid %s id, skip cache', target);
                return
            }

            console.log('try cache ', target, mapInfo.id);

            let isSuccess = false
            isSuccess = this.reloadCache(target, 'cacheX', mapInfo)
            if (isSuccess) return
            isSuccess = this.reloadCache(target, 'cacheY', mapInfo)
            if (isSuccess) return
            isSuccess = this.reloadCache(target, 'cacheZ', mapInfo)
            if (isSuccess) return
            isSuccess = this.reloadCache(target, 'oldcacheX', mapInfo)
            if (isSuccess) return
            isSuccess = this.reloadCache(target, 'oldcacheY', mapInfo)
            if (isSuccess) return
            isSuccess = this.reloadCache(target, 'oldcacheZ', mapInfo)
            if (isSuccess) return
            isSuccess = this.reloadCache(target, 'oldmap', mapInfo)
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
                this.cache2()
                break
            }
            case 'down': {
                posInfo.user.y++
                calcPos()
                this.map.y = posInfo.map.y
                this.cache2()
                break
            }
            case 'left': {
                posInfo.user.x--
                calcPos()
                this.map.x = posInfo.map.x
                this.cache2()
                break
            }
            case 'right': {
                posInfo.user.x++
                calcPos()
                this.map.x = posInfo.map.x
                this.cache2()
                break
            }
            default:
                break
        }
        // this.cacheMap()
    }
}