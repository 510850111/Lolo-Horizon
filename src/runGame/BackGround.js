//定义背景的大小
var BG_WIDTH = 852;
var BG_HEIGHT = 450;
(function () {
    /**
     * 背景类
     */

    function BackGround() {
        //自定义背景1
        this.bg1 = null;
        //自定义背景2
        this.bg2 = null;
        //树木
        this.tree = null;

        BackGround.__super.call(this);
        this.init();
    }

    //注册这个类
    Laya.class(BackGround, "BackGround", laya.display.Sprite);

    //拿到原型
    var _proto = BackGround.prototype;

    _proto.init = function () {
        var texture1 = Laya.loader.getRes("res/BackGround.png");
        var texture2 = Laya.loader.getRes("res/BackGround.png");
        var textureTree = Laya.loader.getRes("res/tree0.png");

        //创建背景1
        this.bg1 = new laya.display.Sprite();
        //绘制背景图1
        this.bg1.graphics.drawTexture(texture1, 0, 0);
        //把背景1添加到当前容器对象里
        this.addChild(this.bg1);

        //创建背景2
        this.bg2 = new laya.display.Sprite();
        //绘制背景图2
        this.bg2.graphics.drawTexture(texture2, 0, 0);
        //把背景1添加到当前容器对象里
        this.addChild(this.bg2);
        //把第二个背景放到第一个背景后面紧跟着
        this.bg2.pos(BG_WIDTH, 0);

        //前景图片树木
        this.tree = new laya.display.Sprite();
        //绘制树木
        this.tree.graphics.drawTexture(textureTree, 0, 0);

        this.addChild(this.tree);

        this.tree.pos(BG_WIDTH, 0);

        //创建一个帧循环处理函数，用于背景位置的更新，实现背景滚动效果。
        Laya.timer.frameLoop(1, this, this.onLoop)

    }

    _proto.onLoop = function () {

        //移动
        this.x -= 3;

        //当背景1向左移动出游戏的显示区域，则将背景1的x轴坐标,向右移动*2.
        if (this.bg1.x + this.x <= -BG_WIDTH) {
            this.bg1.x += BG_WIDTH * 2;
        }
        //当背景2向左移动出游戏的显示区域，则将背景2的x轴坐标,向右移动*2.
        if (this.bg2.x + this.x <= -BG_WIDTH) {
            this.bg2.x += BG_WIDTH * 2;
        }
        //树木移动
        if (this.tree.x + this.x <= -BG_WIDTH) {
            this.tree.x += BG_WIDTH * 2;
        }
    }


})();