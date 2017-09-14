(function () {
    /**
     * 玩家类
     */
    function Player(decelerationEnergy, invincibleEnergy) {

        //减速能量条的引用
        this.decelerationEnergy = decelerationEnergy;
        //无敌能量条的引用
        this.invincibleEnergy = invincibleEnergy;
        //当前动作
        this.action = null;
        //玩家
        this.body = null;
        //玩家状态 "up" ? "down"
        this.status = "up";
        //玩家跑动状态 "normal" ?  "deceleration" ? "invincible"
        //是否已经踩在地板上了
        this.isOnFloor = false;
        //是否在特效中
        this.isInEffect = false;
        //是否在减速状态下
        this.isInLowerSpeed = false;

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

        this.sp = null;

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
        if (this.action == action) {return;};

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
        //判断玩家是否在特效中
        if(this.isInEffect){
            //如果在特效中,慢慢的消耗能量,直到能量为0,就回到默认状态
            this.invincibleEnergy.addEnergyValue(-ITEM_INVINCIBLE_DESCENT_SPEED);
            if(this.invincibleEnergy.value <= 0){
                this.hideEffect();
            }
        }
        //判断是否在减速中
        if(this.isInLowerSpeed){
            //如果在减速中,慢慢的消耗能量,直到能量为0,就回到默认状态
            this.decelerationEnergy.addEnergyValue(-ITEM_DECELERATION_DESCENT_SPEED);
            if(this.decelerationEnergy.value <= 0){
                this.decelerationEnergy.updateEnergyValue(0);
            }
        }
    }

    _proto.hitCheck = function(playerX,playerY,itemX,itemY,itemDirectionStatus,itemTpye,playerStatus){
            //console.log("px=" + playerX + " py=" + playerY + " ix=" + itemX + " iy=" + itemY + " xxx=" +- (((BG_HEIGHT - FLOOR_HEIGHT) / 2) - playerY));
            var itemWidth = 0;
            var itemHeight = 0;
            //根据传过来的道具类型来确定物品的大小
            switch(itemTpye){
                case Item.ITEM_TYPE_STAR:
                    itemWidth = ITEM_STAR_WIDTH;
                    itemHeight = ITEM_STAR_HEIGHT;
                    break;
                case Item.ITEM_TYPE_DECELERATION:
                    itemWidth = ITEM_DECELERATION_WIDTH;
                    itemHeight = ITEM_DECELERATION_HEIGHT;
                    break;
                case Item.ITEM_TYPE_INVINCIBLE:
                    itemWidth = ITEM_INVINCIBLE_WIDTH;
                    itemHeight = ITEM_INVINCIBLE_HEIGHT;
                    break;
            }
            //判断碰撞要考虑前方后方和玩家转换方向后正好撞在道具上面
            if(playerStatus == "up"){
                if(((playerX - Math.abs(itemX) - itemWidth/2 ) >= 0 ) && (itemDirectionStatus == "up") && (playerX  < itemX + itemWidth + PLAYER_WIDTH/2)){
                    return true;
                }else{return false}
            }else if(playerStatus == "down"){
                if((((playerX - Math.abs(itemX) - itemWidth/2 ) >= 0 ) && (itemDirectionStatus == "down") && (playerX  < itemX + itemWidth + PLAYER_WIDTH/2))){
                    return true;
                }else{return false}
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

    //是否处于特效中 
    _proto.isInEffect = false;

    //显示特效
    _proto.showEffect = function(){ 
        if(!(this.invincibleEnergy.value >= 80 && this.isInEffect)){IS_PAUSE = true;/*暂停游戏*/ }
        this.isInEffect = true;
        this.gotoFly();
        FLOOR_SPEED = 10;
        Laya.loader.load("res/particle/particle.part", Handler.create(this, this.Showparticle), null, Laya.Loader.JSON);
    }
    _proto.Showparticle = function(settings){
        this.sp = new Laya.Particle2D(settings);
        // console.log(this.sp);
        this.sp.x = this.body.x*1.5;
        this.sp.y -= 20;
		this.addChild(this.sp);
        this.sp.emitter.start();
        this.sp.emitter._emissionRate = 20;
        this.sp.play();
        IS_PAUSE = false;
    }

    //特效停止
    _proto.hideEffect = function(){
        // this.sp.destroy();
        this.sp.emitter.stop();
        this.sp.emitter.clear();
        IS_FLOOR_SPEED_MAX = false;
        FLOOR_SPEED = FLOOR_SPEED_DEFAULT;
        this.isInEffect = false;   
        this.gotoRun();
    }

})();