//定义背景的大小
var BG_WIDTH = 852;
var BG_HEIGHT = 450;
//地板大小
var FLOOR_HEIGHT = 84;
var FLOOR_WIDTH = 960;
//人物大小
var PLAYER_WIDTH = 96;
var PLAYER_HEIGHT = 96;

//游戏主文件,入口文件
(function () {
    /**
     * 游戏入口
     */
    function RunGame() {

        this.bg = null;
        this.mapFloor = null;
        this.player = null;

        RunGame.__super.call(this);

        this.init();
    }

    //RunGame 是一个显示对象 继承此 Sprite 注册这个RunGame类
    Laya.class(RunGame, "RunGame", laya.display.Sprite);

    //定义RumGame的原型
    var _proto = RunGame.prototype;

    //初始化
    _proto.init = function () {
        //添加背景
        this.bg = new BackGround();
        this.addChild(this.bg);

        //添加地板
        this.mapFloor = new MapFloor();
        this.addChild(this.mapFloor);

        //添加主角
        this.player = new Player();
        this.addChild(this.player);

        //创建帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    _proto.onLoop = function () {
        //获取所有的地板
        for (var i = this.mapFloor.numChildren - 1; i > - 1; i--) {
            var floor = this.mapFloor.getChildAt(i);
            //检测主角是否踩在地板上
            if (floor.checkHit(this.player.x, this.player.y, this.player.status)) {
                //人物如果踩到地板了 就把人物的坐标设置到地板上面
                if (this.player.status == "up") {
                    this.player.isStopDown = true;//停止下落
                    // this.player.y = (BG_HEIGHT - FLOOR_HEIGHT) / 2 - PLAYER_HEIGHT + 30;
                    this.player.y -= 35;
                } else if (this.player.status == "down") {
                    this.player.y = floor.y + 64;
                }

            }
        }
    }

})();