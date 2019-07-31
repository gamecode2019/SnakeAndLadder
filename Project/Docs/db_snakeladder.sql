/*
Navicat MySQL Data Transfer

Source Server         : 192.168.3.240
Source Server Version : 50556
Source Host           : 192.168.3.240:3306
Source Database       : db_snakeladder

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2019-07-31 11:20:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_player`
-- ----------------------------
DROP TABLE IF EXISTS `t_player`;
CREATE TABLE `t_player` (
  `pla_id` int(11) NOT NULL,
  `pla_nickName` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL,
  `pla_avatarUrl` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pla_loginTime` timestamp NULL DEFAULT NULL,
  `pla_gender` int(11) DEFAULT NULL,
  `pla_gold` bigint(20) DEFAULT NULL,
  `pla_diamond` bigint(20) DEFAULT NULL,
  `pla_newPlayer` int(11) DEFAULT NULL,
  `pla_myScans` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pla_selectScan` int(11) DEFAULT NULL,
  `pla_myEmoticons` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pla_gameTotalCount` int(11) DEFAULT NULL,
  `pla_getFirstCount` int(11) DEFAULT NULL,
  `pla_myScansHasMap` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`pla_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of t_player
-- ----------------------------
INSERT INTO `t_player` VALUES ('167', '游客', '', '0000-00-00 00:00:00', '1', '998', '10000', '1', '', '0', '', '999', '0', 'NaN');
INSERT INTO `t_player` VALUES ('169', '游客', '', '0000-00-00 00:00:00', '1', '998', '10000', '1', '', '0', '', '999', '0', '0');
INSERT INTO `t_player` VALUES ('170', '游客', '', '0000-00-00 00:00:00', '1', '99999', '10000', '1', '', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('171', '游客', '', '0000-00-00 00:00:00', '1', '99999', '10000', '1', '', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('172', '游客', '', '0000-00-00 00:00:00', '1', '99999', '10000', '1', '', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('173', '游客', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', '1,2,3,4', '2', '1,2,3,4', '899', '0', '0');
INSERT INTO `t_player` VALUES ('177', 'zhangfhui', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', '', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('174', 'zhangfhui', '', '0000-00-00 00:00:00', '1', '99999', '10000', '1', '', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('175', 'test1', '', '0000-00-00 00:00:00', '1', '99999', '10000', '1', '', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('176', 'test1', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', '', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('178', '游客', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', '1,2,3,4', '1', '1,2,3,4', '899', '0', '0');
INSERT INTO `t_player` VALUES ('179', 'zhangfhui', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', ',1,2,3,4', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('180', '游客', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', '', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('181', 'zhangfhui', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', ',1,2,3,4', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('182', 'zhangfhui', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', '100,101,102,103,104', '104', '0,1,2,3', '899', '0', '0');
INSERT INTO `t_player` VALUES ('183', 'zhangh', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', ',1,2,3,4', '0', '', '899', '0', '0');
INSERT INTO `t_player` VALUES ('184', 'zhangh2', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', '100,101,102,103,100', '103', '0,1,2,3,1', '899', '0', '0');
INSERT INTO `t_player` VALUES ('185', '1gzcuer1keg', '', '0000-00-00 00:00:00', '1', '432', '10000', '0', '1,2,3,4', '0', '', '175', '0', '0');
INSERT INTO `t_player` VALUES ('186', 'jyzurcade1', '', '0000-00-00 00:00:00', '1', '200', '10000', '0', '1,2,3,4', '0', '', '16', '0', '0');
INSERT INTO `t_player` VALUES ('187', 'sgtekmd9j8o', '', '0000-00-00 00:00:00', '1', '996', '10000', '0', '1,2,3,4', '0', '', '332', '0', '0');
INSERT INTO `t_player` VALUES ('188', '9c743bgp9uu', '', '0000-00-00 00:00:00', '1', '252', '10000', '0', '1,2,3,4', '0', '', '808', '0', '0');
INSERT INTO `t_player` VALUES ('189', 'zhangh2', '', '0000-00-00 00:00:00', '1', '99999', '10000', '0', '100,101,102,103', '102', '0,1,2,3', '899', '0', '0');
INSERT INTO `t_player` VALUES ('190', 't6alkyrudr', '', '0000-00-00 00:00:00', '1', '828', '10000', '0', '1,2,3,4', '100', '0,1,2,3', '718', '0', '0');
INSERT INTO `t_player` VALUES ('191', 'rrbpg47bh7a', '', '0000-00-00 00:00:00', '1', '639', '10000', '0', '1,2,3,4', '100', '0,1,2,3', '939', '0', '0');
INSERT INTO `t_player` VALUES ('192', 'ix38vmom7mi', '', '0000-00-00 00:00:00', '1', '560', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '15', '0', '0');
INSERT INTO `t_player` VALUES ('193', '3g2tqibtru1', '', '0000-00-00 00:00:00', '1', '176', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '741', '0', '0');
INSERT INTO `t_player` VALUES ('194', 'lom3boivzzckjizsdwvcxr', '', '0000-00-00 00:00:00', '1', '246', '10000', '1', '100,101,102,103', '100', '0,1,2,3', '208', '0', '0');
INSERT INTO `t_player` VALUES ('195', 'or4csmwi2p', '', '0000-00-00 00:00:00', '1', '509', '10000', '0', '1,2,3,4', '100', '0,1,2,3', '377', '0', '0');
INSERT INTO `t_player` VALUES ('196', 'k4462665u8', '', '0000-00-00 00:00:00', '1', '77', '10000', '0', '1,2,3,4', '0', '', '498', '0', '0');
INSERT INTO `t_player` VALUES ('197', 'nf9l2yhnjx9', '', '0000-00-00 00:00:00', '1', '426', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '36', '0', '0');
INSERT INTO `t_player` VALUES ('198', 'woei89vk5w', '', '0000-00-00 00:00:00', '1', '711', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '291', '0', '0');
INSERT INTO `t_player` VALUES ('199', 'vfgadoeusli', '', '0000-00-00 00:00:00', '1', '94', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '107', '0', '0');
INSERT INTO `t_player` VALUES ('200', 'tyiykaq7ten', '', '0000-00-00 00:00:00', '1', '108', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '307', '0', '0');
INSERT INTO `t_player` VALUES ('201', 'n66klkgvoyj', '', '0000-00-00 00:00:00', '1', '316', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '198', '0', '0');
INSERT INTO `t_player` VALUES ('202', 'a2xkesgqgce', '', '0000-00-00 00:00:00', '1', '645', '10000', '0', '100,101,102,103', '101', '0,1,2,3', '513', '0', '0');
INSERT INTO `t_player` VALUES ('203', 'zrxgm52h8sf', '', '0000-00-00 00:00:00', '1', '397', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '161', '0', '0');
INSERT INTO `t_player` VALUES ('204', 'vlkyebue4v', '', '0000-00-00 00:00:00', '1', '329', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '108', '0', '0');
INSERT INTO `t_player` VALUES ('2', 'y8hojjldtyo', '', '2018-12-28 11:14:34', '1', '751', '10000', '0', '100,101,102,103', '100', '0,1,2,3', '445', '0', '0');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `use_id` int(11) NOT NULL,
  `use_openid` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `use_userName` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `use_inviteid` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`use_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('169', 'd831023fd5ad797524ecc6ac4e7ad8d3', 'ali169', '');
INSERT INTO `t_user` VALUES ('170', 'd831023fd5ad797524ecc6ac4e7ad8d3', 'ali170', '');
INSERT INTO `t_user` VALUES ('171', 'd831023fd5ad797524ecc6ac4e7ad8d3', 'ali171', '');
INSERT INTO `t_user` VALUES ('172', 'd831023fd5ad797524ecc6ac4e7ad8d3', 'ali172', '');
INSERT INTO `t_user` VALUES ('173', 'd831023fd5ad797524ecc6ac4e7ad8d3', 'ali173', '');
INSERT INTO `t_user` VALUES ('174', 'a6e8df874106719e71b9c8d4ad98ee2d', 'ali174', '');
INSERT INTO `t_user` VALUES ('175', '0edc3253fff449c257eefa6866ead578', 'ali175', '');
INSERT INTO `t_user` VALUES ('176', '0edc3253fff449c257eefa6866ead578', 'ali176', '');
INSERT INTO `t_user` VALUES ('177', 'a6e8df874106719e71b9c8d4ad98ee2d', 'ali177', '');
INSERT INTO `t_user` VALUES ('178', 'd831023fd5ad797524ecc6ac4e7ad8d3', 'ali178', '');
INSERT INTO `t_user` VALUES ('179', 'a6e8df874106719e71b9c8d4ad98ee2d', 'ali179', '');
INSERT INTO `t_user` VALUES ('180', 'fe1ebbb08f69b8fb39ef7e84ad4f1ad4', 'ali180', '');
INSERT INTO `t_user` VALUES ('181', 'a6e8df874106719e71b9c8d4ad98ee2d', 'ali181', '');
INSERT INTO `t_user` VALUES ('182', 'a6e8df874106719e71b9c8d4ad98ee2d', 'ali182', '');
INSERT INTO `t_user` VALUES ('183', 'b183fb8562f07f966a9ec3a660858e39', 'ali183', '');
INSERT INTO `t_user` VALUES ('184', 'fa08f0a65ad2cb34ec1c4da95031cbab', 'ali184', '');
INSERT INTO `t_user` VALUES ('185', 'fa6a3f19d85f63c26f54ad0afb20af5d', 'ali185', '');
INSERT INTO `t_user` VALUES ('186', 'f0c08eb9dde543513dd5da06348b6879', 'ali186', '');
INSERT INTO `t_user` VALUES ('187', '82742f0794359d8aa8194f98f91132fa', 'ali187', '');
INSERT INTO `t_user` VALUES ('188', '2736847934fa882fb9754cd61642616e', 'ali188', '');
INSERT INTO `t_user` VALUES ('189', 'fa08f0a65ad2cb34ec1c4da95031cbab', 'ali189', '');
INSERT INTO `t_user` VALUES ('190', 'fa6a3f19d85f63c26f54ad0afb20af5d', 'ali190', '');
INSERT INTO `t_user` VALUES ('191', 'f0c08eb9dde543513dd5da06348b6879', 'ali191', '');
INSERT INTO `t_user` VALUES ('192', 'd7ac22f6fe1c9d26596af72a7137925d', 'ali192', '');
INSERT INTO `t_user` VALUES ('193', '82742f0794359d8aa8194f98f91132fa', 'ali193', '');
INSERT INTO `t_user` VALUES ('194', 'ced97a3e1f5c5b3cbba03c37636fb754', 'ali194', '');
INSERT INTO `t_user` VALUES ('195', '82742f0794359d8aa8194f98f91132fa', 'ali195', '');
INSERT INTO `t_user` VALUES ('196', 'f0c08eb9dde543513dd5da06348b6879', 'ali196', '');
INSERT INTO `t_user` VALUES ('197', 'd7ac22f6fe1c9d26596af72a7137925d', 'ali197', '');
INSERT INTO `t_user` VALUES ('198', '82742f0794359d8aa8194f98f91132fa', 'ali198', '');
INSERT INTO `t_user` VALUES ('199', 'd7ac22f6fe1c9d26596af72a7137925d', 'ali199', '');
INSERT INTO `t_user` VALUES ('200', 'd7ac22f6fe1c9d26596af72a7137925d', 'ali200', '');
INSERT INTO `t_user` VALUES ('201', '4b193f675c848303c858dbad8afe22b6', 'ali201', '');
INSERT INTO `t_user` VALUES ('202', 'e569542c85cf6818ad2bbbbbf5e87c7e', 'ali202', '');
INSERT INTO `t_user` VALUES ('203', 'e569542c85cf6818ad2bbbbbf5e87c7e', 'ali203', '');
INSERT INTO `t_user` VALUES ('204', 'e569542c85cf6818ad2bbbbbf5e87c7e', 'ali204', '');
INSERT INTO `t_user` VALUES ('2', 'e569542c85cf6818ad2bbbbbf5e87c7e', 'ali2', '');

-- ----------------------------
-- Table structure for `t_variable`
-- ----------------------------
DROP TABLE IF EXISTS `t_variable`;
CREATE TABLE `t_variable` (
  `var_id` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `var_value` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`var_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of t_variable
-- ----------------------------
INSERT INTO `t_variable` VALUES ('useridx', '1');
