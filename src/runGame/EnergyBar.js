//这里面包含了生命条和无敌状态能量条

(function () {
    /**
     * 能量条,包含生命条和无敌状态能量条
     */
    function EnergyBar(type) {
        //背景
        this.bg = null;
        //进度条
        this.bar = null;
        //最小值
        this.MIN_VALUE = ENERGY_BAR_MIN_VALUE;
        //最大值
        this.MAX_VALUE = ENERGY_BAR_MAX_VALUE;

        //当前值
        this.value = 100;
        EnergyBar.__super.call(this);
        this.init(type);
    }

    //能量类型
    EnergyBar.TYPE_DECELERATION = "Deceleration";//减速
    EnergyBar.TYPE_INVINCIBLE = "Invincible";//无敌

    //注册
    Laya.class(EnergyBar, "EnergyBar", Sprite);

    var _proto = EnergyBar.prototype;

    _proto.init = function (type) {
        this.width = ENERGY_BAR_WIDTH;
        this.height = ENERGR_BAR_HEIGHT;
        //能量/血条背景
        var textureEnergyBarBG = Laya.loader.getRes("res/hp/hp_bg.png");
        //这个会选择性加载能量条还是血条
        var textureEnergyBarType = null;
        //选择加载能量条还是血条
        switch (type) {
            //能量条
            case EnergyBar.TYPE_DECELERATION:
                textureEnergyBarType = Laya.loader.getRes("res/hp/en_bar.png");
                break;
            //血条
            case EnergyBar.TYPE_INVINCIBLE:
                textureEnergyBarType = Laya.loader.getRes("res/hp/hp_bar.png");
                break;
        }

        this.bg = new Sprite();
        this.bar = new Sprite();
        this.bar.x = ENERGY_BAR_X;
        this.bar.y = ENERGY_BAR_Y;

        //绘制血条和能量条
        this.bg.graphics.drawTexture(textureEnergyBarBG, 0, 0, ENERGY_BAR_WIDTH, ENERGR_BAR_HEIGHT);
        this.bar.graphics.drawTexture(textureEnergyBarType, 0, 0, 155, 12);

        this.addChild(this.bg);
        this.addChild(this.bar);
    }

})();