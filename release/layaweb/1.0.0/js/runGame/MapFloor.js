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
    Laya.class(MapFloor, "MapFloor", Sprite);

    var _proto = MapFloor.prototype;

    _proto.init = function () {

        var floor = this.addFloor();
        //避免玩家最开始没有地板可以踩
        floor.x = 0;
        //创建一个帧循环函数
        Laya.timer.frameLoop(MAP_FLOOR_FRAME_DELAY, this, this.onLoop);

    }

    _proto.onLoop = function () {
        /**
         * 帧循环处理
         */

        //监听有没有地板要移除
        while (this.dieFloorList.lenght > 0) {
            var floor = this.dieFloorList.shift();
            floor.removeSelf();
            //回收
            Pool.recover("floor",floor)

        }
    }

    _proto.addFloor = function () {
        /**
         * 增加地板
         */

        var floor = Pool.getItemByClass("floor",Floor)

        floor.init();
        floor.once(Floor.OUT_COMPLETE, this, this.getFloor);
        floor.once(Floor.OUT_DIE, this, this.delFloor);
        this.addChild(floor);
        return floor;
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