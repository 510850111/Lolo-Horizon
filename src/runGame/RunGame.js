//游戏主文件,入口文件
(function () {
    /**
     * 游戏入口
     */
    function RunGame() {

        RunGame.__super.call(this);

        this.init();
    }

    //RunGame 是一个显示对象 继承此 Sprite 注册这个RunGame类
    Laya.class(RunGame, "RunGame", laya.display.Sprite);

    //定义RumGame的原型
    var _proto = RunGame.prototype;

    //初始化
    _proto.init = function () {

        console.log("RunGame进行初始化");    

        var bg = new BackGround();

        this.addChild(bg);

        //添加地板集合
        var mapFloor = new MapFloor();
        
        this.addChild(mapFloor);
    }

})();