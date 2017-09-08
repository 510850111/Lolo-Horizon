(function () {
    /**
     * 玩家类
     */
    function Player() {
        //当前动作
        this.action = null;
        //玩家
        this.body = null;
        //玩家状态 "up" ? "down"
        this.status = "up";
        //是否已经踩在地板上了
        this.isOnFloor = false;

        //下落变量
        this.vy = PLAYER_DOWN_VY;
        //下落速度
        this.downSpeed = PLAYER_DOWN_SPEED;
        //最大下落值
        this.maxVy = PLAYER_DOWN_MAX_SPEED;
        //是否停止下落
        this.isStopDown = false;

        //这里我们强制设置玩家的宽度和高度
        this.width = 96;
        this.height = 96;

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
    Laya.class(Player, "Player", Sprite);

    //图集是否缓存,避免一次请求一次加载的状况
    Player.cached = false;

    //获取原型
    var _proto = Player.prototype;

    _proto.init = function () {
        //缓存动画
        if (!Player.cached) {

            //跑动的动画
            Animation.createFrames(['res/player/chara_01.png', 'res/player/chara_02.png', 'res/player/chara_03.png', 'res/player/chara_04.png'], Player.RUN);
            //飞行的动画
            Animation.createFrames(['res/player/chara_05.png', 'res/player/chara_06.png', 'res/player/chara_07.png', 'res/player/chara_08.png'], Player.FLY);
            //图像缓存完毕
            Player.cached = true;
        }

        if (this.body == null) {

            this.body = new Animation();

            // this.body.x = PLAYER_WIDTH;
            //应该把主角放在地板上面
            // this.body.y = (BG_HEIGHT - FLOOR_HEIGHT) / 2 - PLAYER_HEIGHT + 30;

            this.body.interval = PLAYER_RUN_SPEED;

            this.addChild(this.body);
        }

        //播放相应的动画
        this.playAction(Player.RUN);

        //创建帧循环处理函数
        Laya.timer.frameLoop(PLAYER_FRAME_DELAY, this, this.onLoop);
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
        if (!this.isStopDown) {//在最开始玩家开始下落
            this.y += this.vy;
            this.vy += this.downSpeed;
            //控制下落最大值
            if (this.vy >= this.maxVy) { this.vy = this.maxVy };
            //如果掉落到屏幕外
            if (this.y > BG_HEIGHT) { return; }
        } else if (this.isStopDown) {

        } else {

        }
    }

    _proto.hitCheck = function(playerX,playerY,itemX,itemY,j){
            console.log("px=" + playerX + " py=" + playerY + " ix=" + itemX + " iy=" + itemY + " j=" +j);
            if(playerX >=  itemX){
                return true;
            }else{
                return false;
            }
        
    }

    //开始跑
    _proto.gotoRun = function () {
        this.playAction(Player.RUN);
    }
    //开始飞
    _proto.gotoFly = function () {
        this.playAction(Player.FLY);
    };
    //翻转人物
    _proto.flip = function () {
        //如果玩家在上面,那么将玩家翻转到下面
        if (this.status == "up") {
            //设置玩家的当前状态
            this.status = "down";
            //水平倾斜角度，默认值为0。以角度为单位
            this.body.skewX = 180;
            //垂直倾斜角度，默认值为0。以角度为单位。
            this.body.skewY = 180;
            //镜像翻转
            this.body.scaleX = -1;
            //设置Y轴的位置
            // this.body.y = (BG_HEIGHT/2) ;
        }else if(this.status == "down"){
            //设置玩家的当前状态
            this.status = "up";
            //水平倾斜角度，默认值为0。以角度为单位
            this.body.skewX = 0;
            //垂直倾斜角度，默认值为0。以角度为单位。
            this.body.skewY = 0;
            //镜像翻转
            this.body.scaleX = 1;
            //设置Y轴的位置
            // this.body.y -= (BG_HEIGHT - FLOOR_HEIGHT) / 2 - PLAYER_HEIGHT + 30;
        }


    }

})();