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

///<reference path="../libsrc/bin/tiled/tiled.d.ts" />



const maps = [
    ['1-1.tmx', '1-2.tmx', '1-3.tmx'],
    ['2-1.tmx', '2-2.tmx', '2-3.tmx'],
    ['3-1.tmx', '3-2.tmx', '3-3.tmx'],
]
const url = maps[0][0];

class Main extends eui.UILayer {

    stepSize: number = 32
    map: tiled.TMXTilemap
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

        const kb = new KeyBoard();
        //添加监听事件
        kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);

    }
    onkeydown(event: egret.Event) {

        const key = event.data.length === 1 ? event.data[0] : 'error'
        switch (key) {
            case 'up': {
                this.map.y -= this.stepSize
                break
            }
            case 'down': {
                this.map.y += this.stepSize
                break
            }
            case 'left': {
                this.map.x -= this.stepSize
                break
            }
            case 'right': {
                this.map.x += this.stepSize
                break
            }
            default:
                break
        }
    }
    loadMap() {
        console.log(6)
        const request = new egret.HttpRequest();
        request.once(egret.Event.COMPLETE, this.onMapComplete, this);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    onMapComplete(event: egret.Event) {
        var data: any = egret.XML.parse(event.currentTarget.response);
        console.log('this.stage.width, this.stage.height', this.stage.stageWidth, this.stage.stageHeight);

        this.map = new tiled.TMXTilemap(50 * 32, 50 * 32, data, url);
        this.map.render()
        console.log('this.map', this.map);
        // this.map.touchEnabled = true
        // this.map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);

        this.addChild(this.map)
        this.setChildIndex(this.map, 0)
    }
    // private move(event: egret.TouchEvent) {
    //     console.log('event.target', event.target);

    //     event.target.x -= 5;
    //     event.target.y -= 5;
    // }
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
                break
            }
            case 'profile': {
                new Profile().show(this)
                break
            }
            case 'friend': {
                break
            }
            default:
                break
        }

    }
}
