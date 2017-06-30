(function(){
    /**
     * 地板类
     */
    function Floor(){
        Floor.__super.call(this);
    }

    //注册这个类
    Laya.class(Floor,"Floor",laya.display.Sprite);

    var _proto = Floor.prototype;
    _proto.init = function(type){
        //创建一个帧循环处理函数
        Laya.timer.frameLoop(1,this,this.onLoop);
    }

    _proto.onLoop = function(){
        /**
         * 帧循环处理函数
         */
    }

    _proto.addItem = function(){
        /**
         * 允许在地板上添加物品
         */
    }
})();