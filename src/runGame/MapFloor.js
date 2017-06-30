(function () {
    /**
     * 地板地图管理类
     */
    function MapFloor() {

        //要移除的地板
        this.dieFloorList = [];

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

        //监听有没有地板要移除
        while (this.dieFloorList.lenght > 0) {

            var floor = this.dieFloorList.shift();

            floor.removeSelf();
        }
    }

    _proto.addFloor = function () {
        /**
         * 增加地板
         */

        var floor = new Floor();

        floor.init();
        floor.once(Floor.OUT_COMPLETE, this, this.getFloor);
        floor.once(Floor.OUT_DIE, this, this.delFloor);
        this.addChild(floor);
    }

    _proto.getFloor = function (floor) {
        /**
         * 获取地板
         */
        this.addFloor();
    }

    _proto.delFloor = function (floor) {
        /**
         * 删除地板
         */
        this.dieFloorList.push(floor);
    }

})();