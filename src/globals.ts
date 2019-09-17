
const DURATION = 200

const MAPSIDE = 50
const TILESIDE = 32
const REGIONSIDE = 150


declare namespace Pos {
    interface Region {
        x: number,
        y: number
    }
    type TildId = string | null // 1-1.tmx
    interface TileIds {
        self: TildId
        right?: TildId
        left?: TildId
        up?: TildId
        down?: TildId
    }
    type CacheMap = {
        id: string,
        refresh: boolean,
        reserved: boolean
    } & Region

    interface Info {
        screen: Region
        tile: Region
        region: Region
        user: Region
        patch: Region
        map: CacheMap
        cacheX: CacheMap
        cacheY: CacheMap
        cacheZ: CacheMap
    }
}
var cacheZ: { id: string | undefined } & Pos.Region = {
    id: '1',
    x: 1,
    y: 1
}

const initRegion = { x: 0, y: 0 }

// should be number
const posInfo: Pos.Info = {
    patch: { x: 0, y: 0 },                      // 修补坐标 should return  0 ... screen/2/32 
    screen: { x: 0, y: 0 },
    region: { x: 0, y: 0 },                     // 上海的区域块坐标(后端返回) should return 0 ... 9
    user: { x: 0, y: 0 },                       // 区域块内的坐标(后端返回) return  0 ... 4999
    tile: { x: 0, y: 0 },                       // 用户在前端地图的坐标(由 user 坐标求模计算) shoudl return 0 ... 49
    map: {
        id: undefined,
        x: 0, y: 0,
        refresh: false,
        reserved: true
    },                                          // 地图坐标 should return -screen/2/32 ... screen/2/32
    cacheX: {
        id: undefined,
        x: 0, y: 0,
        refresh: false,
        reserved: false
    },
    cacheY: {
        id: undefined,
        x: 0, y: 0,
        refresh: false,
        reserved: false
    },
    cacheZ: {
        id: undefined,
        x: 0, y: 0,
        refresh: false,
        reserved: false
    }
}
/**
 * 
 */
function calcPos() {
    if (!posInfo.screen.x || !posInfo.screen.y) {
        console.error('not init')
        return
    }
    // console.debug('user ', posInfo.user)

    const tile = {
        x: posInfo.user.x % MAPSIDE,
        y: posInfo.user.y % MAPSIDE
    }
    posInfo.tile = tile
    // console.debug('tile', tile)

    const patched = {
        x: -posInfo.tile.x + posInfo.patch.x,
        y: -posInfo.tile.y + posInfo.patch.y
    }


    const idX = Math.floor(posInfo.user.x / MAPSIDE)
    const idY = Math.floor(posInfo.user.y / MAPSIDE)
    const self = `${idX}-${idY}.tmx`
    console.debug('main id', self);
    const tileIds: Pos.TileIds = { self }
    tileIds.left = idX <= 0 ? undefined : `${idX - 1}-${idY}.tmx`
    tileIds.right = (idX >= REGIONSIDE / MAPSIDE - 1) ? undefined : `${idX + 1}-${idY}.tmx`
    tileIds.up = idY <= 0 ? undefined : `${idX}-${idY - 1}.tmx`
    tileIds.down = (idY >= REGIONSIDE / MAPSIDE - 1) ? undefined : `${idX}-${idY + 1}.tmx`
    // // console.debug('tileIds', tileIds)
    // posInfo.tileIds = tileIds

    const lastdIds = {
        [posInfo.map.id]: true,
        [posInfo.cacheX.id]: true,
        [posInfo.cacheY.id]: true,
        [posInfo.cacheZ.id]: true,
        undefined: false
    }

    console.log('lastdIds', lastdIds);


    const refreshMain = posInfo.map.id !== self
    const newMap = {
        x: patched.x * TILESIDE,
        y: patched.y * TILESIDE,
        id: self,
        refresh: refreshMain,
        reserved: lastdIds[self]
    }
    // console.debug('map', map)
    posInfo.map = newMap

    /**
     * calc cache X
     */
    const newCacheX: Pos.CacheMap = {
        id: undefined,
        x: undefined,
        y: undefined,
        refresh: false,
        reserved: false
    }
    if (tile.x > MAPSIDE / 2) {
        newCacheX.id = tileIds.right
        newCacheX.x = newMap.x + MAPSIDE * TILESIDE
        newCacheX.y = newMap.y
    } else if (tile.x < MAPSIDE / 2) {
        newCacheX.id = tileIds.left
        newCacheX.x = newMap.x - MAPSIDE * TILESIDE
        newCacheX.y = newMap.y
    }
    newCacheX.reserved = lastdIds[newCacheX.id]
    if (newCacheX.id !== posInfo.cacheX.id) {
        newCacheX.refresh = true
    } else {
        newCacheX.refresh = false
    }

    posInfo.cacheX = newCacheX
    console.log('newCacheX', newCacheX);


    /**
     * calc cache Y
     */
    const newCacheY: Pos.CacheMap = {
        id: undefined,
        x: undefined,
        y: undefined,
        refresh: false,
        reserved: false
    }
    if (tile.y > MAPSIDE / 2) {
        newCacheY.id = tileIds.down
        newCacheY.x = newMap.x
        newCacheY.y = newMap.y + MAPSIDE * TILESIDE
    } else if (tile.y < MAPSIDE / 2) {
        newCacheY.id = tileIds.up
        newCacheY.x = newMap.x
        newCacheY.y = newMap.y - MAPSIDE * TILESIDE
    }
    newCacheY.reserved = lastdIds[newCacheY.id]

    if (newCacheY.id !== posInfo.cacheY.id) {
        newCacheY.refresh = true
    }
    posInfo.cacheY = newCacheY
    console.log('newCacheY', newCacheY);



    /**
     * calc cache Z
     */
    const newCacheZ: Pos.CacheMap = {
        id: undefined,
        x: undefined,
        y: undefined,
        refresh: false,
        reserved: false
    }
    if (newCacheX.id && newCacheY.id) {
        newCacheZ.id = newCacheX.id.split('-')[0] + '-' + newCacheY.id.split('-')[1]
        newCacheZ.x = newCacheX.x
        newCacheZ.y = newCacheY.y
    }
    newCacheZ.reserved = lastdIds[newCacheZ.id]
    if (newCacheZ.id !== posInfo.cacheZ.id) {
        newCacheZ.refresh = true
    } else {
        newCacheZ.refresh = false
    }
    posInfo.cacheZ = newCacheZ
    console.log('newCacheZ', newCacheZ);







}