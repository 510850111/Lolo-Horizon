//定义背景的大小
var BG_WIDTH = 852;
var BG_HEIGHT = 450;
//地板大小
var FLOOR_HEIGHT = 84;
var FLOOR_WIDTH = 960;
//人物大小
var PLAYER_WIDTH = 96;
var PLAYER_HEIGHT = 96;
//能量条背景大小
var ENERGY_BG_BAR_WIDTH = 180;
var ENERGY_BG_BAR_HEIGHT = 21;
//能量条大小
var ENERGY_BAR_WIDTH = 155;
var ENERGY_BAR_HEIGHT = 12;
//物品-星星大小
var ITEM_STAR_WIDTH = 32;
var ITEM_STAR_HEIGHT = 32;
//物品-星星出现几率
var ITEM_STAR_PROBABILITY = 0.9;
//物品-减速道具大小
var ITEM_DECELERATION_WIDTH = 40;
var ITEM_DECELERATION_HEIGHT = 53;
//物品-减速道具出现几率
var ITEM_DECELERAYION_PROBABILITY = 0.25;
//物品-无敌道具大小
var ITEM_INVINCIBLE_WIDTH = 40;
var ITEM_INVINCIBLE_HEIGHT = 48;
//物品-无敌道具出现几率
var ITEM_INVINCIBLE_PROBABILITY = 0.2;

//npc大小
var NPC_BIRD_WIDTH = 96;
var NPC_BIRD_HEIGHT = 96;
//NPC出现几率
var NPC_BIRD_PROBABLITY = 0.1;

//无敌状态下能量条下降速度
var ITEM_INVINCIBLE_DESCENT_SPEED = 0.20;
//减速能量条下降速度
var ITEM_DECELERATION_DESCENT_SPEED = 0.8;

//背景移动速度
var BG_SPEED = 3;
//背景的帧处理间隔
var BG_FRAME_DELAY = 1;

//人物的奔跑速度设置是在地板移动速度那里.
//人物帧处理间隔
var PLAYER_FRAME_DELAY = 1;
//人物奔跑频率,值越大看起来越慢
var PLAYER_RUN_SPEED_DEFAULT = 190;
var PLAYER_RUN_SPEED = PLAYER_RUN_SPEED_DEFAULT;
//人物下落初始变量
var PLAYER_DOWN_VY = 0;
//人物下落速度
var PLAYER_DOWN_SPEED = 2;
//人物最大下落值
var PLAYER_DOWN_MAX_SPEED = 32;

//Npc播放频率,值越大看起来越慢
var NPC_BIRD_INTERVAL = 100;

//地板移动速度
var FLOOR_SPEED_DEFAULT = 3.2;
var FLOOR_SPEED = 3.2;
var FLOOR_SPEED_MAX = 10;
var FLOOR_SPEED_FASTER_STEP = 0.001;
var IS_FLOOR_SPEED_MAX = false;
//地板的帧处理间隔
var FLOOR_FRAME_DELAY = 1;

//地板管理器的帧处理间隔
var MAP_FLOOR_FRAME_DELAY = 10;

//能量条最小值
var ENERGY_BAR_MIN_VALUE = 0;
//能量条最大值
var ENERGY_BAR_MAX_VALUE = 100;
//能量条背景位置
var ENERGY_BAR_X = 15;
var ENERGY_BAR_Y = 2;

//物品出现在地板上的间隔
var ITEMNUM_ON_FLOOR = 2;
//NPC在地板上出现的间隔
var NPC_BIRD_NUM_ON_FLOOR = 2;

//分数栏
var SCORETEXT_COLOR = "#FFFFFF";//颜色
var SCORETEXT_FONT_SIZE = 30;//字体大小
var SCORETEXT_TEXT_DEFAULT = 0;//默认文字
var SCORETEXT_ALIGN = "right";// "left"： 居左对齐显示。 "center"： 居中对齐显示。 "right"： 居右对齐显示。

//游戏相关状态
var IS_PAUSE = false;
var IS_OVER = false;


var Sprite = laya.display.Sprite;
var Handler = laya.utils.Handler;
var Animation = laya.display.Animation;
var SoundManager = laya.media.SoundManager;
var Pool = laya.utils.Pool;
var Text = laya.display.Text;
var Tween = laya.utils.Tween;