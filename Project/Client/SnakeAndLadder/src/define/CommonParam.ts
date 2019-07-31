/**
 * 品质颜色
 */
enum QualityColor {
	White = 0x717353,
	Green = 0x13666B,
	Blue = 0x185282,
	Red = 0xB026BF,
	Orange = 0x973836,
}

/**
 * 事件类型
 */
enum EventType {
	test1 = 1,
	test2 = 2,
	updateBagWindow = 3,
}

/**
 * 游戏模式
 */
enum GameType {
	test = 1,
	normalMode = 2,
	matchingMode = 3,
	firendMode = 4,
}

/**
 * 游戏阶段
 */
enum GameState {
	matching = 1,//匹配
	gameStart = 2,//开始
	firstHand = 3,//先手
	gameing = 4,//游戏进行中
	gameEnd = 5,//游戏结束
}

/**
 * OperationType操作类型
 */
enum OperationType{
	firstHandRoll = 1,//先手
	rollStep = 2, //摇点
}

/**
 * 玩家小图像类型
 */
enum HeadIconType
{
	headIcon,	//facebook人物图像
	gameIcon,	//玩家游戏中形象
	gameIconOne	//玩家游戏中形象列表
}

/**
 * 保存本地皮肤形象图json
 */
const selectScan:string="selectScan";