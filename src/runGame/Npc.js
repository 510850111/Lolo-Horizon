(function(){
    /**
     * NPC
     */
    function Npc(){
        this.body = null;
        Npc.__super.call(this);
        this.init();
    }

    //NPC注册
    Laya.class(Npc,"Npc",Sprite);

    //获取原型
    var _proto = Npc.prototype;
    Npc.cached = false;
    Npc.BIRD = "bird";

    _proto.init = function(){
    
        //缓存动画
        if(!Npc.cached){
                Npc.cached = true;
                Animation.createFrames(['res/bird/bird_1.png','res/bird/bird_2.png','res/bird/bird_3.png','res/bird/bird_4.png'], Npc.BIRD);
            }
        //创建Npc
        if(this.body == null){
            this.body = new Animation();
            this.body.interval = NPC_BIRD_INTERVAL;
            this.addChild(this.body);
            this.body.play(0, true, Npc.BIRD);
            //创建一个帧循环处理函数
            Laya.timer.frameLoop(1, this, this.onLoop);
        }
    
    }
    //帧循环函数
    _proto.onLoop = function(){
		if(IS_OVER)return;
		// this.body.x -= Config.speed * 1.5;
		if(this.body.x < -100){
            this.removeSelf();
			//回收
			Pool.recover("Npc",this);
            Laya.timer.clear(this, this.onLoop);
		}
	}
    //随机物品的上下位置
    _proto.randomNpcPosition = function(bird){
        var randomNumber = parseInt(100*Math.random());
        if(randomNumber <= 50){
            //把道具放在上面
            bird.directionStatus = "up";
            bird.y = -NPC_BIRD_HEIGHT/2;
        }else{
            //把道具放在下面,并倒置
            bird.directionStatus = "down";
            bird.y = FLOOR_HEIGHT + (NPC_BIRD_HEIGHT/3)*2;
            //水平倾斜角度，默认值为0。以角度为单位
            bird.skewX = 180;
            //垂直倾斜角度，默认值为0。以角度为单位。
            bird.skewY = 180;
            //镜像翻转
            bird.scaleX = -1;
        }
        return bird;
    }
     //放置位置应该是在地板处放置
})();