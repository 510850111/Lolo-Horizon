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

    }

})();