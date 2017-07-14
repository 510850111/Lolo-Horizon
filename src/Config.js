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
//物品-减速道具大小
var ITEM_DECELERATION_WIDTH = 40;
var ITEM_DECELERATION_HEIGHT = 53;
//物品-无敌道具大小
var ITEM_INCINCIBLE_WIDTH = 40;
var ITEM_INCINCIBLE_HEIGHT = 48;


//背景移动速度
var BG_SPEED = 3;
//背景的帧处理间隔
var BG_FRAME_DELAY = 1;

//人物的奔跑速度设置是在地板移动速度那里.
//人物帧处理间隔
var PLAYER_FRAME_DELAY = 1;
//人物奔跑频率
var PLAYER_RUN_SPEED = 138;
//人物下落初始变量
var PLAYER_DOWN_VY = 0;
//人物下落速度
var PLAYER_DOWN_SPEED = 2;
//人物最大下落值
var PLAYER_DOWN_MAX_SPEED = 32;

//地板移动速度
var FLOOR_SPEED = 3.2;
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

var Sprite = laya.display.Sprite;
var Handler = laya.utils.Handler;
var Animation = laya.display.Animation;
var SoundManager = laya.media.SoundManager;

