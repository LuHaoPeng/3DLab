"use strict"

////////////////////////////////////////走廊////////
// 外侧走廊宽度
const CORRIDOR_WIDTH = 4
/////////////////////////////////////////墙/////////
// 墙高度
const WALL_HEIGHT = 30
// 墙厚度
const WALL_THICKNESS = 2
// 长墙长度
const WALL_LENGTH_LONG = 80
// 短墙1长度
const WALL_LENGTH_SHORT_1 = 12
// 短墙2长度
const WALL_LENGTH_SHORT_2 = 2
// 墙体透明度
const WALL_OPACITY = 0.7
/////////////////////////////////////////地板////////
// 地板通用厚度
const FLOOR_THICKNESS = 0.5
// 3/5/8区地板长度
const FLOOR_UP_LENGTH = 162
// 3/5/8区地板宽度
const FLOOR_UP_WIDTH = 20
// 1/2/4/6/7区地板长度
const FLOOR_DOWN_LENGTH = 129
// 1/2/4/6/7区地板宽度
const FLOOR_DOWN_WIDTH = 22
// 9/10区地板长度
const FLOOR_LEFT_LENGTH = 13
// 9/10区地板宽度
const FLOOR_LEFT_WIDTH = 44
/////////////////////////////////////////门////////
// 入口门宽度
const DOOR_WIDTH_ENTRY = 12
// 入口门右墙距
const DOOR_GAP_ENTRY = 4
// 出口门宽度
const DOOR_WIDTH_EXIT = 12
// 出口门上墙距
const DOOR_GAP_EXIT = 20
// 507门宽度
const DOOR_WIDTH_SECONDARY = 12
// 507门墙距
const DOOR_GAP_SECONDARY = 4
// 门高度
const DOOR_HEIGHT = 26
// 门厚度
const DOOR_THICKNESS = 0.2
// 门透明度
const DOOR_OPACITY = 0.4
/////////////////////////////////////////展板///////
// 上方展板长度
const BOARD_LENGTH_UP = 30
// 下方展板长度
const BOARD_LENGTH_DOWN = 22
// 纵向展板长度
const BOARD_LENGTH_VERTICAL = 30
// 507展板通用长度
const BOARD_LENGTH_SECONDARY = 12
// 展板厚度
const BOARD_THICKNESS = 1
// 展板高度
const BOARD_HEIGHT = 12
// 507展板高度
const BOARD_HEIGHT_SECONDARY = 8
// 507电视高度
const TV_HEIGHT = 6
// 展板离地高度
const BOARD_ALTITUDE = 15
// 上方展板间隔
const BOARD_INTERVAL_UP = 6
// 下方展板间隔
const BOARD_INTERVAL_DOWN = 2
// 507展板间隔
const BOARD_INTERVAL_SECONDARY = 3
// 上方展板墙距
const BOARD_GAP_UP = 4
// 下方展板墙距
const BOARD_GAP_DOWN = 16
// 纵向展板墙距
const BOARD_GAP_VERTICAL = 14
// 507右侧展板墙距
const BOARD_GAP_SECONDARY_RIGHT = 2
// 507下方展板墙距
const BOARD_GAP_SECONDARY_DOWN = 4
// 507左侧展板墙距
const BOARD_GAP_SECONDARY_LEFT = 21.5
////////////////////////////////////////////电脑/////
// 电脑长度
const PC_LENGTH = 5
// 电脑宽度
const PC_WIDTH = 1.5
// 电脑高度
const PC_HEIGHT = 4
////////////////////////////////////////响应终端//////
// 终端长度
const DEVICE_LENGTH = 2
// 终端宽度
const DEVICE_WIDTH = 1.5
// 终端高度
const DEVICE_HEIGHT = 1
////////////////////////////////////////通讯适配器////
// 适配器长度
const ADAPTER_LENGTH = 1
// 适配器宽度
const ADAPTER_WIDTH = 1
// 适配器高度
const ADAPTER_HEIGHT = 0.5
//////////////////////////////////////////区域1//////
// 区域1工作台长度
const AREA_1_DESK_LENGTH = 20
// 区域1工作台宽度
const AREA_1_DESK_WIDTH = 8
// 区域1工作台高度
const AREA_1_DESK_HEIGHT = 9
// 区域1工作台墙距
const AREA_1_DESK_GAP = 3
// 区域1电脑桌面边距
const AREA_1_PC_MARGIN = 2
// 区域1终端/适配器间隔
const AREA_1_DEVICE_INTERVAL = 0.5
// 区域1终端/适配器桌面边距
const AREA_1_DEVICE_MARGIN = 1
//////////////////////////////////////////区域2//////
// 区域2工作台长度
const AREA_2_DESK_LENGTH = 20
// 区域2工作台宽度
const AREA_2_DESK_WIDTH = 8
// 区域2工作台高度
const AREA_2_DESK_HEIGHT = 9
// 区域2工作台墙距
const AREA_2_DESK_GAP = 3
// 区域2电脑桌面边距
const AREA_2_PC_MARGIN = 2
//////////////////////////////////////////区域3//////
// 区域3热桶半径
const AREA_3_BARREL_RADIUS = 7
// 区域3热桶高度
const AREA_3_BARREL_HEIGHT = 20
// 区域3热桶纵向墙距
const AREA_3_BARREL_GAP_VERTICAL = 3
// 区域3热桶横向墙距
const AREA_3_HEAT_BARREL_GAP_HORIZONTAL = 2
// 区域3冰桶横向墙距
const AREA_3_ICE_BARREL_GAP_HORIZONTAL = 2
// 区域3机器长度
const AREA_3_MACHINE_LENGTH = 28
// 区域3机器宽度
const AREA_3_MACHINE_WIDTH = 12
// 区域3机器高度
const AREA_3_MACHINE_HEIGHT = 20
// 区域3导管离地高度
const AREA_3_TUBE_ALTITUDE = 17
// 区域3导管半径
const AREA_3_TUBE_RADIUS = 0.5
//////////////////////////////////////////区域4//////
// 区域4机柜长度
const AREA_4_CABINET_LENGTH = 8
// 区域4机柜宽度
const AREA_4_CABINET_WIDTH = 6
// 区域4机柜高度
const AREA_4_CABINET_HEIGHT = 17
// 区域4机柜纵向墙距
const AREA_4_CABINET_GAP_VERTICAL = 3
// 区域4机柜横向墙距
const AREA_4_CABINET_GAP_HORIZONTAL = 3
//////////////////////////////////////////区域5//////
// 区域5工作台长度
const AREA_5_DESK_LENGTH = 28
// 区域5工作台宽度
const AREA_5_DESK_WIDTH = 8
// 区域5工作台高度
const AREA_5_DESK_HEIGHT = 9
// 区域5工作台墙距
const AREA_5_DESK_GAP = 3
//////////////////////////////////////////区域6//////
// 区域6工作台长度
const AREA_6_DESK_LENGTH = 22
// 区域6工作台宽度
const AREA_6_DESK_WIDTH = 7
// 区域6工作台高度
const AREA_6_DESK_HEIGHT = 9
// 区域6工作台横向墙距
const AREA_6_DESK_GAP_HORIZONTAL = 4
// 区域6工作台纵向墙距
const AREA_6_DESK_GAP_VERTICAL = 13
// 区域6实验台长度
const AREA_6_WORKBENCH_LENGTH = 24
// 区域6实验台宽度
const AREA_6_WORKBENCH_WIDTH = 8
// 区域6实验台高度
const AREA_6_WORKBENCH_HEIGHT = 9
// 区域6实验台横向墙距
const AREA_6_WORKBENCH_GAP_HORIZONTAL = 12
// 区域6实验台纵向墙距
const AREA_6_WORKBENCH_GAP_VERTICAL = 3
// 区域6电表柜与桌面边距
const AREA_6_SHOWCASE_MARGIN = 2
// 区域6电表柜高度
const AREA_6_SHOWCASE_HEIGHT = 6
// 区域6机柜长度
const AREA_6_CABINET_LENGTH = 8
// 区域6机柜宽度
const AREA_6_CABINET_WIDTH = 7
// 区域6机柜高度
const AREA_6_CABINET_HEIGHT = 21
// 区域6机柜纵向墙距
const AREA_6_CABINET_GAP_VERTICAL = 3
// 区域6机柜横向墙距
const AREA_6_CABINET_GAP_HORIZONTAL = 2
//////////////////////////////////////////区域7//////
// 区域7实验台长度
const AREA_7_WORKBENCH_LENGTH = 22
// 区域7实验台宽度
const AREA_7_WORKBENCH_WIDTH = 8
// 区域7实验台高度
const AREA_7_WORKBENCH_HEIGHT = 9
// 区域7实验台横向墙距
const AREA_7_WORKBENCH_GAP_HORIZONTAL = 20
// 区域7实验台纵向墙距
const AREA_7_WORKBENCH_GAP_VERTICAL = 3
// 区域7电表柜与桌面边距
const AREA_7_SHOWCASE_MARGIN = 2
// 区域7电表柜高度
const AREA_7_SHOWCASE_HEIGHT = 6
//////////////////////////////////////////区域8//////
// 区域8实验台长度
const AREA_8_WORKBENCH_LENGTH = 28
// 区域8实验台宽度
const AREA_8_WORKBENCH_WIDTH = 8
// 区域8实验台高度
const AREA_8_WORKBENCH_HEIGHT = 9
// 区域8实验台墙距
const AREA_8_WORKBENCH_GAP = 3
// 区域8电脑长度
const AREA_8_PC_LENGTH = 5
// 区域8电脑宽度
const AREA_8_PC_WIDTH = 1.5
// 区域8电脑高度
const AREA_8_PC_HEIGHT = 4
//////////////////////////////////////////区域9//////
// 区域9交流机柜长度
const AREA_9_CABINET_AC_LENGTH = 8
// 区域9交流机柜宽度
const AREA_9_CABINET_AC_WIDTH = 8
// 区域9交流机柜高度
const AREA_9_CABINET_AC_HEIGHT = 24
// 区域9直流机柜长度
const AREA_9_CABINET_DC_LENGTH = 8
// 区域9直流机柜宽度
const AREA_9_CABINET_DC_WIDTH = 6
// 区域9直流机柜高度
const AREA_9_CABINET_DC_HEIGHT = 19
// 区域9机柜间隔
const AREA_9_CABINET_MARGIN = 2
// 区域9机柜纵向墙距
const AREA_9_CABINET_GAP_VERTICAL = 24
// 区域9机柜横向墙距
const AREA_9_CABINET_GAP_HORIZONTAL = 3
//////////////////////////////////////////区域10//////
// 区域10机柜长度
const AREA_10_CABINET_LENGTH = 8
// 区域10机柜宽度
const AREA_10_CABINET_WIDTH = 8
// 区域10机柜高度
const AREA_10_CABINET_HEIGHT = 21
// 区域10机柜间隔
const AREA_10_CABINET_MARGIN = 2
// 区域10机柜纵向墙距
const AREA_10_CABINET_GAP_VERTICAL = 3
// 区域10机柜横向墙距
const AREA_10_CABINET_GAP_HORIZONTAL = 3
//////////////////////////////////////////区域11//////
// 区域11直流电源柜长度
const AREA_11_CABINET_LENGTH = 10
// 区域11直流电源柜宽度
const AREA_11_CABINET_WIDTH = 8
// 区域11直流电源柜高度
const AREA_11_CABINET_HEIGHT = 16
// 区域11直流电源柜纵向墙距
const AREA_11_CABINET_GAP_VERTICAL = 3
// 区域11直流电源柜横向墙距
const AREA_11_CABINET_GAP_HORIZONTAL = 3
// 区域11直流空调长度
const AREA_11_AC_LENGTH = 8
// 区域11直流空调宽度
const AREA_11_AC_WIDTH = 6
// 区域11直流空调高度
const AREA_11_AC_HEIGHT = 20
// 区域11直流空调横向墙距
const AREA_11_AC_GAP = 3
// 区域11直流空调边距
const AREA_11_AC_MARGIN = 2
// 区域11直流冰箱长度
const AREA_11_FRIDGE_LENGTH = 8
// 区域11直流冰箱宽度
const AREA_11_FRIDGE_WIDTH = 7
// 区域11直流冰箱高度
const AREA_11_FRIDGE_HEIGHT = 18
// 区域11直流冰箱横向墙距
const AREA_11_FRIDGE_GAP = 3
// 区域11直流冰箱边距
const AREA_11_FRIDGE_MARGIN = 2
// 区域11直流热水器半径
const AREA_11_HEATER_RADIUS = 3
// 区域11直流热水器高度
const AREA_11_HEATER_HEIGHT = 14
// 区域11直流热水器横向墙距
const AREA_11_HEATER_GAP = 5
// 区域11直流热水器边距
const AREA_11_HEATER_MARGIN = 2
// 区域11工作台长度
const AREA_11_DESK_LENGTH = 20
// 区域11工作台宽度
const AREA_11_DESK_WIDTH = 8
// 区域11工作台高度
const AREA_11_DESK_HEIGHT = 9
// 区域11工作台纵向墙距
const AREA_11_DESK_GAP_VERTICAL = 3
// 区域11工作台横向墙距
const AREA_11_DESK_GAP_HORIZONTAL = 17
//////////////////////////////////////////区域12//////
// 区域12冰箱长度
const AREA_12_FRIDGE_LENGTH = 8
// 区域12冰箱宽度
const AREA_12_FRIDGE_WIDTH = 6
// 区域12冰箱高度
const AREA_12_FRIDGE_HEIGHT = 20
// 区域12冰箱纵向墙距
const AREA_12_FRIDGE_GAP_VERTICAL = 8
// 区域12冰箱横向墙距
const AREA_12_FRIDGE_GAP_HORIZONTAL = 4
// 区域12空调长度
const AREA_12_CONDITIONER_LENGTH = 11
// 区域12空调宽度
const AREA_12_CONDITIONER_WIDTH = 3
// 区域12空调高度
const AREA_12_CONDITIONER_HEIGHT = 4
// 区域12空调离地高度
const AREA_12_CONDITIONER_ALTITUDE = 24
// 区域12热水器半径
const AREA_12_HEATER_RADIUS = 2.5
// 区域12热水器长度
const AREA_12_HEATER_LENGTH = 11
// 区域12热水器离地高度
const AREA_12_HEATER_ALTITUDE = 24
// 区域12热水器边距
const AREA_12_HEATER_MARGIN = 3
// 区域12工作台长度
const AREA_12_DESK_LENGTH = 9
// 区域12工作台宽度
const AREA_12_DESK_WIDTH = 8
// 区域12工作台高度
const AREA_12_DESK_HEIGHT = 9
// 区域12工作台纵向墙距
const AREA_12_DESK_GAP_VERTICAL = 15
// 区域12工作台横向墙距
const AREA_12_DESK_GAP_HORIZONTAL = 3