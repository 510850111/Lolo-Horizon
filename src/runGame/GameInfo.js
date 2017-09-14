(function () {
	
	/**
	 * 游戏介绍
	 */
	function GameInfo(){
		this.bg = null;
		this.txt = null;
		GameInfo.__super.call(this);
		this.init();
	}
	//GameInfo
	Laya.class(GameInfo,"GameInfo", laya.display.Sprite);
	
	var _proto = GameInfo.prototype;
	
	_proto.init = function(){
		this.width = BG_WIDTH;
		this.height = BG_HEIGHT;

        //暂停游戏
        IS_PAUSE = true;
		//黑色背景
		this.bg = new Sprite();
		this.bg.alpha = 0.8;
		this.bg.graphics.drawRect(0,0,BG_WIDTH,BG_HEIGHT,"#000000");
		this.addChild(this.bg);
		
		//loading文本
		this.txt = new Text();
		this.txt.color = "#ffffff";
		this.txt.fontSize = 20;
		this.txt.text = "游戏介绍\n\n点击可控制人物翻转\n\n（\n\n左上角紫色条代表当前启动无敌状态 黄色条代表减速速状态\n\n\n好了 点击屏幕开始狂奔之旅吧~~";
		this.txt.width = BG_WIDTH;
		this.txt.align = "center";
		this.txt.y = (BG_HEIGHT - this.txt.height) * 0.5;
		this.addChild(this.txt);
		
	}
	
	
})();