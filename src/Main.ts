//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

// /<reference path="../libsrc/src/TMXTilemap.ts" />
// /<reference path="../libsrc/src/utils/Base64.ts" />
// /<reference path="../libsrc/src/utils/TMXUtils.ts" />
// /<reference path="../libsrc/src/tileset/TMXTileset.ts" />
// /<reference path="../libsrc/src/tileset/TMXTilesetGroup.ts" />
// /<reference path="../libsrc/src/tile/TMXTile.ts" />
// /<reference path="../libsrc/src/shape/Ellipse.ts" />
// /<reference path="../libsrc/src/shape/Polygon.ts" />
// /<reference path="../libsrc/src/shape/PolyLine.ts" />
// /<reference path="../libsrc/src/render/TMXRenderer.ts" />
// /<reference path="../libsrc/src/render/TMXOrthogonalRenderer.ts" />
// /<reference path="../libsrc/src/render/TMXHexagonalRenderer.ts" />
// /<reference path="../libsrc/src/render/TMXIsometricRenderer.ts" />
// /<reference path="../libsrc/src/property/TMXProperty.ts" />
// /<reference path="../libsrc/src/object/TMXImage.ts" />
// /<reference path="../libsrc/src/object/TMXObject.ts" />
// /<reference path="../libsrc/src/object/TMXObjectGroup.ts" />
// /<reference path="../libsrc/src/layer/ILayer.ts" />
// /<reference path="../libsrc/src/layer/TMXColorLayer.ts" />
// /<reference path="../libsrc/src/layer/TMXImageLayer.ts" />
// /<reference path="../libsrc/src/layer/TMXLayer.ts" />
// /<reference path="../libsrc/src/layer/TMXLayerBase.ts" />
// /<reference path="../libsrc/src/events/TMXImageLoadEvent.ts" />
// /<reference path="../libsrc/src/const/TMXConstants.ts" />
// /<reference path="../libsrc/src/animation/TMXAnimation.ts" />
// /<reference path="../libsrc/src/animation/TMXAnimationFrame.ts" />

///<reference path="../libsrc/bin/tiled/tiled.d.ts" />

const url = "demo1.tmx";


class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.loadMap()
        this.addMenu()
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);


        console.log('this0 ', this);

        setTimeout(() => {
            console.log('this', this);

            var a = this.stage.getChildAt(0)
            // var b = this.getChildAt(1)
            // var c = this.getChildAt(2)
            console.log('a', a);
            // console.log('b', b);
            // console.log(c);
        }, 3 * 1000);


    }
    loadMap() {
        console.log(5)
        const request = new egret.HttpRequest();
        request.once(egret.Event.COMPLETE, this.onMapComplete, this);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    onMapComplete(event: egret.Event) {
        var data: any = egret.XML.parse(event.currentTarget.response);
        console.log('this.stage.width, this.stage.height', this.stage.stageWidth, this.stage.stageHeight);

        var tmxTileMap: tiled.TMXTilemap = new tiled.TMXTilemap(this.stage.stageWidth, this.stage.stageHeight, data, url);
        tmxTileMap.render()
        tmxTileMap.zIndex = -1

        this.addChild(tmxTileMap);
        console.log('tmxTileMap', tmxTileMap, this);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    private addMenu() {
        const menu = new eui.Panel()
        menu.skinName = "resource/Menu.exml";
        menu.left = 20
        menu.bottom = 20
        this.addChild(menu);
        menu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenuClick, this);

    }
    private onMenuClick(e) {
        switch (e.target.name) {
            case 'setting': {
                console.log('setting')
                break
            }
            case 'profile': {
                console.log('profile')
                new Profile().show(this)
                break
            }
            case 'friend': {
                console.log('friend')
                break
            }
            default:
                break
        }

    }
}
