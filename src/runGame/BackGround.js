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
        //cat
        this.cat = null;


        BackGround.__super.call(this);
        this.init();
    }

    //注册这个类
    Laya.class(BackGround, "BackGround", Sprite);

    //拿到原型
    var _proto = BackGround.prototype;

    _proto.init = function () {
        var texture1 = Laya.loader.getRes("res/BackGround.png");
        var texture2 = Laya.loader.getRes("res/BackGround.png");
        var textureTree = Laya.loader.getRes("res/tree0.png");
        var textureCat = Laya.loader.getRes("res/m_background.png");
        //播放背景音乐
        //背景音乐同时只能播放一个，
        //如果在播放背景音乐时再次调用本方法，
        //会先停止之前的背景音乐，再播放当前的背景音乐。
        //也就是说,这个方法只能用于背景音乐
        Laya.SoundManager.musicVolume = BG_MUSIC_VOLUME;
        Laya.SoundManager.playMusic("res/wav/BG.wav",0);
        //创建背景1
        this.bg1 = new Sprite();
        //绘制背景图1
        this.bg1.graphics.drawTexture(texture1, 0, 0);
        //把背景1添加到当前容器对象里
        this.addChild(this.bg1);

        //创建背景2
        this.bg2 = new Sprite();
        //绘制背景图2
        this.bg2.graphics.drawTexture(texture2, 0, 0);
        //把背景1添加到当前容器对象里
        this.addChild(this.bg2);
        //把第二个背景放到第一个背景后面紧跟着
        this.bg2.pos(BG_WIDTH, 0);

        //前景图片树木
        this.tree = new Sprite();
        //绘制树木
        this.tree.graphics.drawTexture(textureTree, 0, 0);

        this.addChild(this.tree);

        this.tree.pos(BG_WIDTH, 64);

        //绘制猫
        this.cat = new Sprite();

        this.cat.graphics.drawTexture(textureCat,0,0,64,64);

        this.addChild(this.cat);
        

        //创建一个帧循环处理函数，用于背景位置的更新，实现背景滚动效果。
        Laya.timer.frameLoop(BG_FRAME_DELAY, this, this.onLoop)

    }

    _proto.onLoop = function () {
        if(IS_PAUSE || IS_OVER){return;}

        //移动
        this.x -= BG_SPEED;

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
        //cat移动
        if (this.cat.x + this.x <= -BG_WIDTH) {
            this.cat.x += BG_WIDTH * 2;
        }
    }


})();