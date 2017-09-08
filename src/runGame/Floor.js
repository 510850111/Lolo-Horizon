(function () {
    /**
     * 地板类
     */
    function Floor() {

        //背景贴图
        this.bgTexture = null;
        //背景
        this.bg = null;
        //最大右边距离
        this.maxRight = 0;
        //是否完全出屏幕
        this.isOutComplete = false;
        //背景右边补丁
        this.rightBg = null;
        //当前地板上的物品的集合
        this.itemList = [];

        Floor.__super.call(this);
    }

    //事件名称:OUT_COMPLETE
    //超过一定屏幕触发floor的OUT_COMPLETE事件
    Floor.OUT_COMPLETE = "floor_out_complete";
    //整个地板都不在屏幕里面事件
    Floor.OUT_DIE = "floor_out_die";

    //注册这个类
    Laya.class(Floor, "Floor", Sprite);

    var _proto = Floor.prototype;

    _proto.init = function (type) {
        /**
         * 初始化Floor
         */
        //是否需要在地板上增加道具
        var isNeedItem = true;
        //如果不开启autoSize 父容器的宽度和高度无法获取
        this.autoSize = true;
        //初始化的时候将坐标放到屏幕右边
        this.x = BG_WIDTH;
        //应该把地板放在屏幕中间
        this.y = (BG_HEIGHT - FLOOR_HEIGHT) / 2;

        if (this.bg == null) {
            //贴图纹理
            this.bgTexture = Laya.loader.getRes("res/floor.png");
            this.bg = new Sprite();
            //清空绘制
            this.bg.graphics.clear();

            this.addChild(this.bg);
        }
        //绘制地板
        this.bg.graphics.drawTexture(this.bgTexture, 0, 0)

        if(isNeedItem){this.addItem();}
        //创建一个帧循环处理函数
        Laya.timer.frameLoop(FLOOR_FRAME_DELAY, this, this.onLoop);
    }

    _proto.onLoop = function () {
        /**
         * 帧循环处理函数
         */

        //让地板的速度和移动比背景快一点
        this.x -= FLOOR_SPEED;
        //判断是否出了边界 如果出了 就通知生成新的floor 这里增加一个变量来判断当前是否已经通知外部了
        if (!this.isOutComplete && (this.x + BG_WIDTH) < FLOOR_WIDTH) {

            this.isOutComplete = true;

            this.event(Floor.OUT_COMPLETE, this);

        } else if ((this.x + BG_WIDTH + FLOOR_WIDTH) < 0) {
            //判断整个floor是否不在屏幕里面了 如果不在了 移除当前floor
            Laya.timer.clear(this, this.onLoop);
            //如果有物品先隐藏
            for(var i = 0; i < this.itemList.length; i++){
                // this.itemList[i].visible = false;
            }
            this.visible = false;
            this.event(Floor.OUT_DIE, this);

        }

    }

    /**
     * 允许在地板上添加物品
     */
    _proto.addItem = function () {
        //创建一个随机数
        var randomNumber = parseInt(Math.random() * 10);
        //如果随机数小于五,不添加,因为会造成道具太多的问题
        if(randomNumber < 1) return;
        //需要添加的数量
        var addNum = 0;
        //计算道具的最大数量,现在强制道具的宽度都是32
        var maxItemNum = Math.floor( FLOOR_WIDTH / 32);
        //定制数量的规则
        if(maxItemNum >= 5){
            addNum = 5 + Math.floor((maxItemNum - 5) * Math.random());;
        }else{
            addNum = maxItemNum;
        }
        //计算居中的点
        var sx = FLOOR_WIDTH / addNum;
        var arr = [];
        var isHasSpecialItem = false;
        for(var i = 0;i<addNum;i++){
            //每隔两个创建一个,物品分开一点
            if(i % ITEMNUM_ON_FLOOR == 0){continue;}
            randomNumber = Math.random();
            //查询当前物品列表里面是否有，如果有的话，就从里面拿取
            if(this.itemList.length > 0 ){
                item = this.itemList.shift();//shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
                item.visible = true;
            }else{
                //从对象池中获取item
                var item = Pool.getItemByClass("Item",Item);
            }
            //是否有特殊物品,如果没有,就生成特殊物品
            
            if(randomNumber >= ITEM_INCINCIBLE_PROBABILITY ){
                isHasSpecialItem = true;
                item.init(Item.ITEM_TYPE_INCINCIBLE);//无敌
            }else if(randomNumber >= ITEM_DECELERAYION_PROBABILITY ){
                isHasSpecialItem = true;
                item.init(Item.ITEM_TYPE_DECELERATION);//减速
            }else if(randomNumber >= ITEM_STAR_PROBABILITY){
                isHasSpecialItem = true;
                item.init(Item.ITEM_TYPE_STAR);//星星,加分道具
            }else{
                
            }
            item.x = sx + i * 32;
            item.y = -30;
            this.addChild(item);
            arr.push(item);
        }
        this.itemList = [].concat(arr)
    }

    /**
     * 获取当前当前地板上的所有物品
     */
    _proto.getAllItems = function () {
        return this.itemList;
    }

    /**
     * 碰撞检测
     * @param x 
     * @param y
     * @param playerStatus:"up" ? "down"
     */
    _proto.checkHit = function (playerX, playerY, playerStatus) {
        /*
            玩家在上方:
                玩家的Y轴 < (地板Y+FLOOR_HEIGHT)
                玩家Y > 地板Y

            玩家在下方:
                玩家的Y轴 > (地板Y+FLOOR_HEIGHT)
                玩家Y < 地板Y
         */
        if (playerY > this.y && playerY < (this.y + FLOOR_HEIGHT) && playerStatus == "up") { return true; }
        else if (playerY < this.y && playerY > (this.y + FLOOR_HEIGHT) && playerStatus == "down") { return true; }
        else { return false; }
    }
})();