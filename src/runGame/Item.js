//这是各种图标
(function () {
    /**
     * 物品类
     */
    function Item() {
        //图标
        this.icon = null;
        //星星图标[普通积分道具]
        this.starTexture = null;
        //减速图标
        this.decelerationTexure = null;
        //无敌图标
        this.invincibleTexture = null;
        //图表类型[ITEM_TYPE_STAR ? ITEM_TYPE_DECELERATION ? ITEM_TYPE_INCINCIBLE]
        this.type = "";

        Item.__super.call(this);
    }

    /*类型分类*/
    //星星
    Item.ITEM_TYPE_STAR = "item_type_star";
    //减速
    Item.ITEM_TYPE_DECELERATION = "item_type_deceleration";
    //无敌
    Item.ITEM_TYPE_INCINCIBLE = "item_type_invincible";

    //注册这个类
    Laya.class(Item, "Item", Sprite);

    //获取原型
    _proto = Item.prototype;

    _proto.init = function (type) {
        this.type = type;
        if (this.icon == null) {
            /*加载图集资源*/
            this.starTexture = Laya.loader.getRes("res/item/item_1.png");
            this.decelerationTexure = Laya.loader.getRes("res/item/item_3.png");
            this.invincibleTexture = Laya.loader.getRes("res/item/item_4.png");
            this.icon = new Sprite();
            this.addChild(this.icon);
        }
        this.icon.graphics.clear();
        switch (type) {
            case Item.ITEM_TYPE_STAR:
                this.icon.graphics.drawTexture(this.starTexture,0,0,ITEM_STAR_WIDTH,ITEM_STAR_HEIGHT);
                break;
            case Item.ITEM_TYPE_DECELERATION:
                this.icon.graphics.drawTexture(this.decelerationTexure,0,0,ITEM_DECELERATION_WIDTH,ITEM_DECELERATION_HEIGHT);
                break;
            case Item.ITEM_TYPE_INCINCIBLE:
                this.icon.graphics.drawTexture(this.icon.invincibleTexture,0,0,ITEM_INCINCIBLE_WIDTH,ITEM_INCINCIBLE_HEIGHT);
                break;
            default:
                break;
        }
    }
})();