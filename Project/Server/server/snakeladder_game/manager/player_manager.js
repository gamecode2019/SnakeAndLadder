"use strict";
const manager = autoload('core/manager');
const math = autoload('core/math');
const error_type = autoload('define/error_type');
const player = require('../logic/player');
const player_type = require('../define/player_type');
const stringRandom = require('string-random');
let _singleton = null;

/**
 * Manager 构造函数
 * @param void
 * @return void
 */
const player_manager = extend(manager, function() {
    this._playerMap = {}; // 玩家列表
    this._robotPlayer = {}; // 机器人列表
    this._robotID = player_type.ROBOT_ID_START; // 当前机器人分配ID
    this._robotIDList = []; // 回收机器人ID
    this._robotPool = []; // 机器人回收池
    this._fightPlayer = {}; //战斗中玩家
});

/**
 * 单例
 * @param void
 * @return void
 */
player_manager.instance = function() {
    if (_singleton === null) { _singleton = new player_manager(); }
    return _singleton;
};

/**
 * 初始化管理器
 * @param void
 * @return void
 */
player_manager.prototype.init = function() {};

/**
 * 更新管理器
 * @param time [int] 时间
 * @return void
 */
player_manager.prototype.update = function(time) {
    for (let id in this._playerMap) {
        this._playerMap[id].update(time);
    }
};

/**
 * 创建player
 * @param roleid [int] 玩家id
 * @param playerName [int] 玩家用户名
 * @return void
 */
player_manager.prototype.createPlayer = function(roleid, playerName, avatarUrl = '', gender) {
    let playerobj = new player(roleid, playerName, avatarUrl, gender);
    playerobj.init(); // 初始化角色数据
    this._playerMap[roleid] = playerobj;
    return playerobj;
};

/**
 * 更新玩家信息
 * @param roleid [int] 玩家id
 * @param playerName [int] 玩家用户名
 * @return void
 */
player_manager.prototype.updatePlayer = function(playerobj) {
    playerobj.saveAll(); // 直接大存档
    return playerobj;
};

/**
 * 删除player
 * @param nodeid {int} 角色id
 * @return void
 */
player_manager.prototype.removePlayer = function(roleid) {
    if (roleid >= player_type.ROBOT_ID_START) {
        this.removeRobotPlayer(roleid);
    } else {
        delete this._playerMap[roleid];
    }
};

/**
 * 查找玩家
 * @param roleid {int} 角色id
 * @return {object} 玩家对象
 */
player_manager.prototype.findPlayer = function(roleid) {
    let player = this._playerMap[roleid];
    if (!player && roleid >= player_type.ROBOT_ID_START) {
        player = this.findRobotPlayer(roleid);
    }
    return player;
};


/**
 * 广播消息
 * @param jsonObj [object] 消息
 * @return void
 */
player_manager.prototype.broadcastMsg = function(jsonObj, filter) {
    for (let roleid in this._playerMap) {
        roleid = parseInt(roleid);
        if (filter && filter(roleid)) {
            continue;
        }

        let player = this._playerMap[roleid];
        if (player && !player.isRobot()) {
            player.sendMsg(jsonObj);
        }
    }
};

/**
 * 发消息
 * @param jsonObj [object] 消息
 * @param roleid {int} 角色id
 * @return void
 */
player_manager.prototype.sendMsg = function(roleid, jsonObj) {
    let player = this.findPlayer(roleid);
    if (player && !player.isRobot()) {
        player.sendMsg(jsonObj);
    }
};

/**
 * 分配机器人ID
 * @param void
 * @return {number} 机器人ID
 */
player_manager.prototype.allocRobotID = function() {
    if (this._robotIDList.length > 0) {
        return this._robotIDList.pop();
    }
    return this._robotID++;
};

/**
 * 创建机器人玩家
 * @return {object} 玩家
 */
player_manager.prototype.createRobotPlayer = function() {
    // 先从机器人池拿数据
    if (this._robotPool.length > 0) {
        let robot = this._robotPool.pop();
        robot.init(); // 初始化角色数据
        this._robotPlayer[robot.id()] = robot;
        return robot;
    }

    // 新创建机器人
    let playerRoleid = this.allocRobotID();
    let playerName = stringRandom(10);
    let robotPlayer = new player(playerRoleid, playerName, '', math.rand(1, 2));
    robotPlayer.init(); // 初始化角色数据
    robotPlayer._isRobot = true; // 设置机器人标识
    this._robotPlayer[playerRoleid] = robotPlayer;
    return robotPlayer;
};

/**
 * 查找机器人
 * @param {number} id 角色id
 * @return {object} 机器人对象
 */
player_manager.prototype.findRobotPlayer = function(id) {
    return this._robotPlayer[id];
};

/**
 * 回收机器人
 * @param  {number} id 机器人id
 * @return void
 */
player_manager.prototype.removeRobotPlayer = function(id) {
    let robot = this.findRobotPlayer(id);
    if (!robot) {
        return;
    }

    // 回收机器人(不要回收ID)
    delete this._robotPlayer[id];
        if (this._robotPool.length < player_type.ROBOT_POOL_SIZE) {
        this._robotPool.push(robot);
        return;
    }

    // 回收机器人ID
    delete this._robotPlayer[id];
    this._robotIDList.push(id);
};


/**
 * 玩家加入战斗
 * @param {number} roleid 角色id
 */
player_manager.prototype.addFightPlayer = function(roleid){
    if(this._fightPlayer[roleid]){
        delete this._fightPlayer[roleid];
    }
    let player = this.findPlayer(roleid);
    this._fightPlayer[roleid] = player;
}

/**
 * 玩家离开战斗
 * @param {number} roleid 角色id
 */
player_manager.prototype.removeFightPlayer = function(roleid){
    
    if (roleid >= player_type.ROBOT_ID_START) {
        this.removeRobotPlayer(roleid);
    } 

    let fighter = this.findFightPlayer(roleid);
    if (!fighter) {
        return;
    }
    
    delete this._fightPlayer[roleid];
}

/**
 * 查找战斗中玩家
 * @param {number} roleid 角色id
 */
player_manager.prototype.findFightPlayer = function(roleid){
    return this._fightPlayer[roleid];
}



module.exports = player_manager;