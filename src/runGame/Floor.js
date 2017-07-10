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

        //这里是通过游戏宽度减去固定2个*32的宽度,再随机一个长度,可以让地板时间点的出现,更加随机性,这样做是为了以后要改的方便
        // this.maxRight = BG_WIDTH - 32 * 2 - 32 * parseInt(10 * Math.random());

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

            this.visible = false;

            this.event(Floor.OUT_DIE, this);

        }

    }

    /**
     * 允许在地板上添加物品
     */
    _proto.addItem = function () {

    }

    /**
     * 获取当前当前地板上的所有物品
     */
    _proto.getItem = function () {

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