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
        this.minValue = ENERGY_BAR_MIN_VALUE;
        //最大值
        this.maxValue = ENERGY_BAR_MAX_VALUE;
        //残影
        this.bodyEffect1 = null;
        this.bodyEffect2 = null;
        //特效
        this.spiritEffect = null;
        //当前值
        this.value = 0;
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
        this.width = ENERGY_BG_BAR_WIDTH;
        this.height = ENERGY_BG_BAR_HEIGHT;
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

        this.bar.scale(this.value / this.maxValue,1);

        //绘制血条和能量条
        this.bg.graphics.drawTexture(textureEnergyBarBG, 0, 0, ENERGY_BG_BAR_WIDTH, ENERGY_BG_BAR_HEIGHT);
        this.bar.graphics.drawTexture(textureEnergyBarType, 0, 0, ENERGY_BAR_WIDTH, ENERGY_BAR_HEIGHT);

        this.addChild(this.bg);
        this.addChild(this.bar);
    }

    _proto.updateEnergyValue = function(value){
        this.value = value;
        if(this.value > this.maxValue){this.value = this.maxValue}
        if(this.value < this.minValue){this.value = this.minValue}
        this.bar.scale(this.value / this.maxValue,1);
    }

    _proto.addEnergyValue = function(value){
        this.value += value;
        this.updateEnergyValue(this.value);
    }

})();