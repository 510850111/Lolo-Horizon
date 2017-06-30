//这里面只用于laya引擎初始化和图片加载功能 其他不管 
//定义背景的大小
var BG_WIDTH = 852;
var BG_HEIGHT = 450;
//laya初始化
Laya.init(BG_WIDTH, BG_HEIGHT, Laya.WebGL);
//FPS
Laya.Stat.show(0, 0);
//设置适配模式
// Laya.stage.scaleMode = "exactfit";
//设置居中对齐
Laya.stage.alignH = "center";
//设置横屏
Laya.stage.screenMode = "horizontal";

Laya.loader.load(
    ["res/BackGround.png",  
        "res/cat_sleep.png",
        "res/tree0.png",
        "res/floor.png"
    ], laya.utils.Handler.create(this, onLoaded), laya.utils.Handler.create(this, onLoading, null, false));


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
