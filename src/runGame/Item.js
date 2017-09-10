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
        //图表类型[ITEM_TYPE_STAR ? ITEM_TYPE_DECELERATION ? ITEM_TYPE_INVINCIBLE]
        this.type = "";
        this.directionStatus = "up";

        Item.__super.call(this);
    }

    /*类型分类*/
    //星星
    Item.ITEM_TYPE_STAR = "ITEM_TYPE_STAR";
    //减速
    Item.ITEM_TYPE_DECELERATION = "ITEM_TYPE_DECELERATION";
    //无敌
    Item.ITEM_TYPE_INCINCIBLE = "ITEM_TYPE_INVINCIBLE";

    //注册这个类
    Laya.class(Item, "Item", laya.display.Sprite);

    //获取原型
    _proto = Item.prototype;
    //播放星星的碰撞效果
    _proto.TweenStar = function(item){Tween.to(item, {y : -5, scaleX : 0.1, alpha : 0}, 200, null, Handler.create(this, this.undefinedFunc, [item]));}
    //随机物品的上下位置
    _proto.randomItemPosition = function(item){
        var randomNumber = parseInt(100*Math.random());
        if(randomNumber <= 50){
            //把道具放在上面
            item.directionStatus = "up";
            item.y = -30;
        }else{
            //把道具放在下面,并倒置
            item.directionStatus = "down";
            item.y = FLOOR_HEIGHT + 50;
            //水平倾斜角度，默认值为0。以角度为单位
            item.skewX = 180;
            //垂直倾斜角度，默认值为0。以角度为单位。
            item.skewY = 180;
            //镜像翻转
            item.scaleX = -1;
        }
        return item;
    }
    _proto.init = function (type) {
        this.type = type;
        if (this.icon == null) {
            /*加载图集资源*/
            this.starTexture = Laya.loader.getRes("res/item/item_1.png");
            this.decelerationTexure = Laya.loader.getRes("res/item/item_3.png");
            this.invincibleTexture = Laya.loader.getRes("res/item/item_4.png");
            this.icon = new Sprite();
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
                this.icon.graphics.drawTexture(this.invincibleTexture,0,0,ITEM_INVINCIBLE_WIDTH,ITEM_INVINCIBLE_HEIGHT);
                break;
            default:
                alert("道具指令错误!");
                break;
        }
        this.addChild(this.icon);
    }
    
})();