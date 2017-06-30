//定义背景的大小
var BG_WIDTH = 852;
var BG_HEIGHT = 450;
//地板高度
var FLOOR_HEIGHT = 84;
var FLOOR_WIDTH = 960;

(function () {
    /**
     * 地板类
     */
    function Floor() {

        //背景贴图
        this.bgTexture = null;
        //背景
        this.bg = null;

        Floor.__super.call(this);
    }

    //注册这个类
    Laya.class(Floor, "Floor", laya.display.Sprite);

    var _proto = Floor.prototype;

    _proto.init = function (type) {
        /**
         * 初始化Floor
         */
        console.log("Floor.init");
        //如果不开启autoSize 父容器的宽度和高度无法获取
        this.autoSize = true;
        //初始化的时候将坐标放到屏幕右边
        this.x = BG_WIDTH;
        //应该把地板放在屏幕中间
        this.y = (BG_HEIGHT - FLOOR_HEIGHT) / 2;

        if (this.bg == null) {
            //贴图纹理
            this.bgTexture = Laya.loader.getRes("res/floor.png");
            this.bg = new laya.display.Sprite();
            //清空绘制
            this.bg.graphics.clear();

            this.addChild(this.bg);
        }
        //绘制地板
        this.bg.graphics.drawTexture(this.bgTexture, 0, 0)
        //创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    _proto.onLoop = function () {
        /**
         * 帧循环处理函数
         */

        //让地板的速度和移动比背景快一点
        this.x -= 3.2;

        if (( this.x + BG_WIDTH + FLOOR_WIDTH) < 0) {
            //判断整个floor是否不在屏幕里面了 如果不在了 移除当前floor
            Laya.timer.clear(this, this.onLoop);

            this.visible = false;

            this.removeSelf();
            
            console.log("Floor已被清除");
        }

    }

    _proto.addItem = function () {
        /**
         * 允许在地板上添加物品
         */
    }
})();