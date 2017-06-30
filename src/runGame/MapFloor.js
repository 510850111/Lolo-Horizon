(function () {
    /**
     * 地板地图管理类
     */
    function MapFloor() {

        MapFloor.__super.call(this);
        
        this.init();
    }

    //注册MapFloor
    Laya.class(MapFloor, "MapFloor", laya.display.Sprite);

    var _proto = MapFloor.prototype;

    _proto.init = function () {

        this.addFloor();
        //创建一个帧循环函数
        Laya.timer.frameLoop(1, this, this.onLoop);

    }

    _proto.onLoop = function () {
        /**
         * 帧循环处理
         */
    }

    _proto.addFloor = function () {
        /**
         * 增加地板
         */

        var floor = new Floor();

        floor.init();

        this.addChild(floor);
    }

    _proto.getFloor = function () {
        /**
         * 获取地板
         */
    }

    _proto.delFloor = function () {
        /**
         * 删除地板
         */
    }

})();