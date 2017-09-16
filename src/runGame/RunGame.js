//游戏主文件,入口文件
(function () {
    /**
     * 游戏入口
     */
    function RunGame() {

        this.bg = null;
        this.mapFloor = null;
        this.player = null;

        this.hpEnergy = null;
        this.speedEnergy = null;

        this.score = 0;

        this.isFirstPlayGame = true;

        RunGame.__super.call(this);

        this.init();
    }

    //RunGame 是一个显示对象 继承此 Sprite 注册这个RunGame类
    Laya.class(RunGame, "RunGame", Sprite);

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

        //无敌能量条
        this.Invincible = new EnergyBar(EnergyBar.TYPE_INVINCIBLE);
        this.Invincible.y = 7;
        this.addChild(this.Invincible);

        //减速能量条
        this.Deceleration = new EnergyBar(EnergyBar.TYPE_DECELERATION);
        this.Deceleration.y = 7;
        this.Deceleration.x = this.Invincible.width + 10;
        this.addChild(this.Deceleration);

        //分数
        this.scoreText = new Text();
        this.scoreText.color = SCORETEXT_COLOR;
        this.scoreText.fontSize = SCORETEXT_FONT_SIZE;
        this.scoreText.text = SCORETEXT_TEXT_DEFAULT;
        this.scoreText.width = BG_WIDTH;
        this.scoreText.align = SCORETEXT_ALIGN;
        this.scoreText.x = -10;
        this.scoreText.y = 10;
        this.addChild(this.scoreText);

        //添加主角
        this.player = new Player(this.Invincible,this.Deceleration);
        this.addChild(this.player);

        //监听鼠标按下弹起事件
        Laya.stage.on(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown)

        //创建帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    _proto.onLoop = function () {       
        //获取所有的地板
        for (var i = this.mapFloor.numChildren - 1; i > - 1; i--) {
            var floor = this.mapFloor.getChildAt(i);
            //判断玩家是否踩在了地板上,已经踩在地板上就可以终止判断了
            if (!this.player.isOnFloor) {
                //检测主角是否踩在地板上
                if (floor.checkHit(this.player.x, this.player.y, this.player.status)) {
                    //人物如果踩到地板了 就把人物的坐标设置到地板上面
                    if (this.player.status == "up") {
                        this.player.isStopDown = true;//停止下落
                        this.player.y = (BG_HEIGHT - FLOOR_HEIGHT) / 2 - PLAYER_HEIGHT + 30;
                        // this.player.y -= 128;
                        this.bg.cat.pos(BG_WIDTH * 1.2, this.player.y - 30);
                        this.player.isOnFloor = true;
                    } else if (this.player.status == "down") { }
                }
            }
            //检测是否碰到道具了
            var itemList = floor.getAllItems();
            var npcList = floor.getAllNpcs();
            for(var j = 0;j < itemList.length;j++){
                var item = itemList[j];
                //只有显示的物品才做碰撞检测
                if(item.visible ){
                    //拿到物品的位置信息
                    if(this.player.hitCheck(this.player.body.x,this.player.y,item.x + floor.x - PLAYER_WIDTH,item.y,item.directionStatus,item.type,this.player.status)){
                        //物品有多个类型 分类型进行判断
                        if(item.type == Item.ITEM_TYPE_DECELERATION){
                            //播放减速道具音乐
                            SoundManager.playSound("res/wav/DecelerationCounting.wav",1);
                            item.visible = false;
                            this.player.decelerationEnergy.addEnergyValue(20);
                            if(this.player.decelerationEnergy.value >= 100){
                                if(!this.player.isInEffect){
                                    //减速
                                    this.player.decelerationEnergy.updateEnergyValue(100);
                                    this.player.isInLowerSpeed  = true;
                                    //播放减速效果音效
                                    SoundManager.playSound("res/wav/LowerSpeed.wav",1);
                                    floor.moveLower(this);    
                                }
                            }
                        }else if(item.type == Item.ITEM_TYPE_INCINCIBLE){
                            //播放无敌药水的声音
                            SoundManager.playSound("res/wav/InvincibleCounting.wav",1);
                            item.visible = false;
                            this.player.invincibleEnergy.addEnergyValue(20);
                            if(this.player.invincibleEnergy.value == 100 && !this.player.isInEffect){
                                //无敌
                                
                                this.player.showEffect();}
                            
                        }else{
                            this.scoreAdd(1);
                            //播放星星的相关音乐
                            SoundManager.playSound("res/wav/StarCounting.wav",1);
                            item.visible = false;
                            //星星物品播放动画
                            // item.TweenStar(item);
                        }
                        
                    }
                }
            }
            //npc碰撞检测
            for(var k = 0;k < npcList.length;k++){
                var npc = npcList[k];
                //只有显示的npc才做碰撞检测
                if(npc.visible){
                    //拿到npc的位置信息
                    if(this.player.hitCheck(this.player.body.x,this.player.y,npc.x + floor.x - PLAYER_WIDTH,npc.y,npc.directionStatus,npc.type,this.player.status)){
                        //npc类型判断
                        switch(npc.type){
                            case Npc.NPC_TYPE_BIRD:
                            if(this.player.isInEffect){break;}
                                //停止游戏
                                this.stopAllGame();
                                var isRestartGame = true;
                                initGame(isRestartGame);//位于init.js
                        }
                }
                }

            }
        }
        
    }
    //分数栏更新
    _proto.scoreAdd = function(value){
        this.scoreText.text = parseInt(this.scoreText.text) + value;
        // console.log(this.scoreText.text + "   " + typeof(this.scoreText.text));
    }
    //鼠标按下事件
    _proto.onMouseDown = function () {
        if(this.isFirstPlayGame){
            //移除gameInfo
            Laya.stage.removeChild(gameInfo);
            //移除之后游戏开始
            IS_PAUSE = false;
            isFirstPlayGame = false;
        }
        //在下落过程中不允许翻转
        if (!this.player.isOnFloor) { return; }

        this.player.flip();
        //不知道为何,在Player里面设置XY一直不成功,所以改在这里设置
        // console.log("玩家状态:" + this.player.status + "  玩家Y轴位置:" + this.player.y);
        if (this.player.status == "up") { this.player.y = (BG_HEIGHT - FLOOR_HEIGHT) / 2 - PLAYER_HEIGHT + 30 }
        else if (this.player.status == "down") { this.player.y = ((BG_HEIGHT + FLOOR_HEIGHT) / 2) + PLAYER_HEIGHT - 15 }
    }
    //停止游戏
    _proto.stopAllGame = function(){
        //停止渲染游戏
        Laya.stage.renderingEnabled=false;
        //清除减速条数据
        this.player.decelerationEnergy.updateEnergyValue(0);
        //清除无敌条数据
        this.player.invincibleEnergy.updateEnergyValue(0);
        //清除分数数据
        this.scoreText.text = SCORETEXT_TEXT_DEFAULT;
        //清除奔跑速度数据
        FLOOR_SPEED = FLOOR_SPEED_DEFAULT;
        //停止播放所有声音
        SoundManager.stopAll();
        //设置人物状态
        this.player.status = "down";
        //停止循环
        Laya.timer.clear(this,this.onLoop);
    }
})();