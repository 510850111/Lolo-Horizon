//这里面只用于laya引擎初始化和图片加载功能 其他不管 
//laya初始化
Laya.init(BG_WIDTH, BG_HEIGHT, Laya.WebGL);
//FPS
Laya.Stat.show(0, 0);
//设置适配模式
Laya.stage.scaleMode = "exactfit";
//设置居中对齐
Laya.stage.alignH = "center";
//设置横屏
Laya.stage.screenMode = "horizontal";
//设置分辨率
Laya.stage.scaleMode = "showall";

//加载单个资源
var asset = [];
asset.push({
    url: [
        "res/BackGround.png",
        "res/tree0.png",
        "res/floor.png",
        "res/cat_sleep.png",
        "res/bird/bird_1.png",
        "res/bird/bird_2.png",
        "res/bird/bird_3.png",
        "res/bird/bird_4.png",
        "res/item/item_1.png",
        "res/item/item_2.png",
        "res/item/item_3.png",
        "res/item/item_4.png",
        "res/hp/hp_bg.png",
        "res/hp/hp_bar.png",
        "res/hp/en_bar.png",
        "res/effect.png"
    ],
    type: Laya.Loader.IMAGE
});

//加载图集资源
asset.push({
    url: "res/player.json",
    type: Laya.Loader.ATLAS
});

//加载资源
Laya.loader.load(asset, Handler.create(this, onLoaded), Handler.create(this, onLoading, null, false));


//加载进度
function onLoading(progress) {
    console.log("正在加载,加载进度: " + progress + "\n");
}

//加载完成
function onLoaded() {
    console.log("图片资源加载完毕\n");
    //实例化RunGame
    var runGame = new RunGame();
    //把RunGame添加到舞台上
    Laya.stage.addChild(runGame);

}
