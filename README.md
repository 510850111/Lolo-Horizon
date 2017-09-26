# Lolo-Horizon
洛洛地平线

# [线上demo](http://118.89.31.177/)

|落落地平线-功能函数文档|||||||
|:--|:--|:--|:--|:--|:--|:--|
|文件名(按照加载先后顺序)|函数|参数|返回值|说明|注意事项|备注|
|Config.js||||基本的配置文件|||
|GameInfo.js|GameInfo()|||显示游戏的信息,显示于最外层|适用于首次加载||
||init()|(string)message||初始化|传入的文字直接显示在开始/结束的界面上||
|Loading.js|Loading()|||显示文件加载进度|适用于首次加载||
||init()|||初始化|初始化loading界面||
||progress()|(float/int)value||显示文件加载的具体进度|在loading显示的时候,传入的参数会被转化成int类型,直接显示loading进度||
|init.js|onLoading()|(float/int)progress||调用Loading.js -> progress(value)|一般是由Laya.loader.load()传入,表示加载文件的进度|全局|
||onLoaded()|||加载完成后的动作||全局|
||initGame()|(boolean)isRestartGame||初始化游戏|并不是移除所有资源,而是初始化相关的参数|全局|
|BackGround.js|BackGround()|||显示背景|||
||init()|||初始化背景的相关东西|内含有音频,音频没有使用预加载||
||onLoop()|||以帧循环处理背景|帧循环相关参数在Config.js里面可设置,但是设置不正确会导致看起来很卡||
|EnergyBar.js|EnergyBar()|(string)type||根据类型显示能量条|type的具体内容请参见EnergyBar.js内"//能量类型" 下代码||
||init()|(string)type||根据类型初始化能量条|不同的type是不同的实例,请注意实例的使用问题||
||updateEnergyValue()|(float/int)value||根据传入的数据自动判断并缩放进度条|||
||addEnergyValue()|(float/int)value||在原来的数值上加上value,再调用updateEnergyValue(value)|||
|Floor.js|Floor()|||显示地板,地板指的是人物踩上去|地板的移动速度加快就会造成人物跑的很快的现象||
||init()|||初始化地板|||
||onLoop()|||地板的帧循环处理函数|每一块地板都是有独立的帧循环处理函数实例,当此地板完全出屏幕时,会触发Floor.OUT_DIE事件,此事件位于MapFloor.js这个地板会被销毁,此实例函数也会被清理||
||addItem()|||在地板上添加物品|会按照Config.js内定义的物品的概率来生成物品,然后添加在地板上||
||getAllItems()|||获取当前地板上所有的道具|||
||addBird()|||放置NPC|当前npc只有鸟||
||getAllNpcs()|||获取当前地板上所有的npc|||
||moveFaster()|||加快地板的移动速度直到最大值|最大值请参见Config.js||
||moveLower()|||减小地板的移动速度,这里是直接使地板值为默认值|默认值请参见Config.js||
||checkHit()|(float/int)playerX, (float/int)playerY, (string:"up"/"down")playerStatus||判断玩家是否在地板上|这里仅仅是玩家从上方掉下来,判断是否踩到了地板||
|Item.js|Item()|||各种道具|||
||init()|(string)type||根据类型绘制道具|||
||TweenStar()|(object)item||播放人物碰到道具的效果|这个功能会影响到分数,在播放的几百毫秒内,分数会一直增加|bug|
||randomItemPosition()|(object)item|(object)item|随机道具的上下位置|传入一个实例,修改该实例的y值和旋转该道具,然后返回该实例||
|MapFloor.js|MapFloor()|||对地板进行管理|||
||init()|||初始化地板管理类|||
||onLoop()|||地板管理类使用帧循环处理地板|||
||addFloor()||(object)floor|增加地板|||
||getFloor()||(object)floor|获取一个全新的地板|调用是addFloor()||
||delFloor()|(object)floor||删除地板|||
|Npc.js|Npc()|||这个是npc相关的类|||
||init()|||初始化NPC|||
||onLoop()|||帧循环处理npc|||
||randomNpcPosition()|(object)bird|(object)bird|随机npc的上下位置|传入一个实例,修改该实例的y值和旋转该道具,然后返回该实例||
|Player.js|Player()|(object)decelerationEnergy, (object)invincibleEnergy||游戏玩家相关的类|传入的实例应当是以不同的类型产生的不同实例,请参见EnergyBar的说明||
||init()|||初始化人物的相关动作|||
||onLoop()|||以帧循环处理人物动作|例如人物的跑动等状态||
||playAction()|(string)action||播放人物的动作|会自动判断是否是重复动作,如果是,就不执行||
||hitCheck()|(float/int)playerX,(float/int)playerY,(float/int)itemX,(float/int)itemY,(string:"up"/"down")itemDirectionStatus,(string)itemTpye,(string:"up"/"down")playerStatus|(boolean)isHit|判断人物是否和道具/npc相撞|需要注意的是item的坐标和player的坐标是不相同的,item的坐标参考系是地板,player的坐标参考系是整个屏幕.||
||gotoRun()|||播放跑动的动画|调用的是playAction()函数||
||gotoFly()|||播放飞行的动画|调用的是playAction()函数||
||flip()|||以x轴镜像翻转人物|需要自己设置人物的y值||
||showEffect()|||显示无敌状态下的特效|会调用到Showparticle()||
||Showparticle()|||播放粒子效果|||
||hideEffect()|||隐藏特效|||
|RunGame.js|RunGame()|||游戏入口函数|||
||init()|||游戏的初始化|以上所有的东西都在这里定义并调用||
||onLoop()|||帧循环处理整个游戏|这里处理了碰撞事件||
||scoreAdd()|(int)value||积分栏的增加|||
||onMouseDown()|||监听鼠标按下的事件|这里每按下一次就翻转一次人物||
||stopAllGame()|||停止整个游戏|关键值恢复成默认值,不清除缓存||
