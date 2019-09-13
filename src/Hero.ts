/**
 * 以下示例演示了 MovieClip 序列帧动画的使用。
 * 该示例中假设资源已经用RES模块加载完成
 */
class Hero {
    private data: any;
    private texture: egret.Texture;
    private stage: egret.Stage

    public addToStage(stage) {
        this.stage = stage

        var loader: egret.HttpRequest = new egret.HttpRequest();
        loader.responseType = egret.HttpResponseType.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadJsonComplete, this);
        loader.open("animal.json", egret.HttpMethod.GET);
        loader.send();
    }

    private onLoadJsonComplete(event: egret.Event): void {
        var loader: egret.HttpRequest = <egret.HttpRequest>event.target;
        this.data = JSON.parse(loader.response);

        var imageLoader: egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.onLoadTextureComplete, this);
        imageLoader.load("animal.png");

    }

    private onLoadTextureComplete(event: egret.Event): void {
        var loader: egret.ImageLoader = <egret.ImageLoader>event.target;
        //获取加载到的纹理对象
        var bitmapData: egret.BitmapData = loader.data;
        //创建纹理对象
        this.texture = new egret.Texture();
        this.texture.bitmapData = bitmapData;

        this.createMovieClip();
    }

    private createMovieClip(): void {
        const mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this.data, this.texture);
        const mc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData('bear'))

        this.stage.addChild(mc);
        // mc.addEventListener(egret.Event.COMPLETE, function () {
        //     egret.log("COMPLETE");
        // }, this);
        // mc.addEventListener(egret.Event.LOOP_COMPLETE, function () {
        //     egret.log("LOOP_COMPLETE");
        // }, this);


        mc.scaleX = 0.1
        mc.scaleY = 0.1

        mc.play(-1)
        mc.x = posInfo.patch.x * TILESIDE
        mc.y = posInfo.patch.y * TILESIDE
    }
}