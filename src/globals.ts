
const DURATION = 200

const MAPSIDE = 50
const TILESIDE = 32


declare namespace Pos {
    interface Region {
        x: number,
        y: number
    }

    interface Info {
        screen: Region
        tile: Region
        region: Region
        user: Region
        map: Region
        patch: Region
    }
}
const tile: Pos.Region = { x: 0, y: 0 }
const region: Pos.Region = { x: 0, y: 0 }
const user: Pos.Region = { x: 0, y: 0 }
const map: Pos.Region = { x: 0, y: 0 }
const patch: Pos.Region = { x: 0, y: 0 }



// should be number
const posInfo: Pos.Info = {
    patch,          // 修补坐标 should return -screen/2/32 ... 0 
    screen: { x: 0, y: 0 },
    region,         // 上海的区域块坐标(后端返回) should return 0 ... 9
    user,           // 区域块内的坐标(后端返回) return  0 ... 4999
    tile,           // 用户在前端地图的坐标(由area坐标求模计算) shoudl return 0 ... 49
    map,            // 地图坐标 should return -screen/2/32 ... screen/2/32
}
/**
 * 
 */
function calcPos() {
    if (!posInfo.screen.x || !posInfo.screen.y) {
        console.error('not init')
        return
    }
    console.debug('user ', posInfo.user)

    posInfo.tile.x = posInfo.user.x % MAPSIDE
    posInfo.tile.y = posInfo.user.y % MAPSIDE
    console.debug('tile', posInfo.tile)

    const patched = {
        x: posInfo.tile.x + posInfo.patch.x,
        y: posInfo.tile.y + posInfo.patch.y
    }
    console.debug('patched', patched)
    const map = {
        x: patched.x * TILESIDE,
        y: patched.y * TILESIDE
    }
    console.debug('map', map)
    posInfo.map = map

}