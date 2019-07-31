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
