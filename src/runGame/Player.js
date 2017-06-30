//定义背景的大小
var BG_WIDTH = 852;
var BG_HEIGHT = 450;
//地板大小
var FLOOR_HEIGHT = 84;
var FLOOR_WIDTH = 960;
//人物大小
var PLAYER_WIDTH = 96;
var PLAYER_HEIGHT = 96;

(function () {
    /**
     * 玩家类
     */
    function Player() {
        //当前动作
        this.action = null;
        //玩家
        this.body = null;

        Player.__super.call(this);
        //初始化
        this.init();
    }


    //跑动
    Player.RUN = "player_run";
    //飞行
    Player.FLY = "player_fly";
    //状态
    Player.DIE = "player_die";

    //注册
    Laya.class(Player, "Player", laya.display.Sprite);

    //图集是否缓存,避免一次请求一次加载的状况
    Player.cached = false;

    //获取原型
    var _proto = Player.prototype;

    _proto.init = function () {
        //缓存动画
        if (!Player.cached) {

            //跑动的动画
            laya.display.Animation.createFrames(['res/player/chara_01.png', 'res/player/chara_02.png', 'res/player/chara_03.png', 'res/player/chara_04.png'], Player.RUN);
            //飞行的动画
            laya.display.Animation.createFrames(['res/player/chara_05.png', 'res/player/chara_06.png', 'res/player/chara_07.png', 'res/player/chara_08.png'], Player.FLY);
            //图像缓存完毕
            Player.cached = true;
        }

        if (this.body == null) {

            this.body = new laya.display.Animation();

            // this.body.x = PLAYER_WIDTH;
            //应该把主角放在地板上面
            this.body.y = (BG_HEIGHT - FLOOR_HEIGHT) / 2 - PLAYER_HEIGHT + 30;

            this.body.interval = 100;

            this.addChild(this.body);
        }

        //播放相应的动画
        this.playAction(Player.RUN);

        //创建帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    _proto.playAction = function (action) {
        //如果是重复动作,则不执行
        if (this.action == action) return;

        this.action = action;
        //播放相应的动画
        this.body.play(0, true, this.action);
    }

    _proto.onLoop = function () {
        this.body.x = BG_WIDTH / 10;
        console.log("this.body.x=" + this.body.x);

    }
    //开始跑
    _proto.gotoRun = function () {
        this.playAction(Player.RUN);
    }
    //开始飞
    _proto.gotoFly = function () {
        this.playAction(Player.FLY);
    };


})();