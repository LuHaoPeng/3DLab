"use strict"

const Data = {
    refreshInterval: 5000
}
// 相机
const Camera = {
    distance: 60,
    altitude: 40,
    gazeTime: 3000
}
// 走廊
const Corridor = {
    width: 4 // 外侧走廊宽度
}
// 墙
const Wall = {
    height: 30, // 墙高度
    thickness: 2, // 墙厚度
    lengthLong: 80, // 长墙长度
    lengthShort1: 12, // 短墙1长度
    lengthShort2: 2, // 短墙2长度
    opacity: 0.7 // 墙体透明度
}
// 地板
const Floor = {
    thickness: 0.5, // 地板通用厚度
    lengthUp: 80, // 3区地板长度
    widthUp: 20, // 3区地板宽度
}
// 门
const Door = {
    height: 26, // 门高度
    thickness: 0.2, // 门厚度
    opacity: 0.4, // 门透明度
    widthEntry: 12, // 入口门宽度
    gapEntry: 4, // 入口门右墙距
    widthExit: 12, // 出口门宽度
    gapExit: 14, // 出口门上墙距
    widthSecondary: 12, // 507门宽度
    gapSecondary: 4 // 507门墙距
}
// 展板
const Board = {
    lengthUp: 30, // 上方展板长度
    lengthDown: 22, // 下方展板长度
    lengthVertical: 30, // 纵向展板长度
    lengthSecondary: 12, // 507展板通用长度
    thickness: 1, // 展板厚度
    height: 12, // 展板高度
    heightSecondary: 8, // 507展板高度
    heightTv: 6, // 507电视高度
    altitude: 15, // 展板离地高度
    intervalUp: 6, // 上方展板间隔
    intervalDown: 2, // 下方展板间隔
    intervalSecondary: 3, // 507展板间隔
    gapUp: 4, // 上方展板墙距
    gapDown: 16, // 下方展板墙距
    gapVertical: 14, // 纵向展板墙距
    gapSecondaryRight: 2, // 507右侧展板墙距
    gapSecondaryDown: 4, // 507下方展板墙距
    gapSecondaryLeft: 21.5 // 507左侧展板墙距
}
// 电脑
const PC = {
    length: 5, // 电脑长度
    width: 1.5, // 电脑宽度
    height: 4 // 电脑高度
}
// 响应终端
const Device = {
    length: 2, // 终端长度
    width: 1.5, // 终端宽度
    height: 1 // 终端高度
}
// 通讯适配器
const Adapter = {
    length: 1, // 适配器长度
    width: 1, // 适配器宽度
    height: 0.5 // 适配器高度
}
// 区域1
const Area1 = {
    deskLength: 20, // 工作台长度
    deskWidth: 8, // 工作台宽度
    deskHeight: 9, // 工作台高度
    deskGap: 3, // 工作台墙距
    pcMargin: 2, // 电脑桌面边距
    deviceInterval: 0.5, // 终端/适配器间隔
    deviceMargin: 1 // 终端/适配器桌面边距
}
// 区域2
const Area2 = {
    deskLength: 20, // 工作台长度
    deskWidth: 8, // 工作台宽度
    deskHeight: 9, // 工作台高度
    deskGap: 3, // 工作台墙距
    pcMargin: 2 // 电脑桌面边距
}
// 区域3
const Area3 = {
    barrelRadius: 7, // 桶半径
    barrelHeight: 20, // 桶高度
    barrelGapVertical: 3, // 桶纵向墙距
    barrelGapHorizontal: 2, // 桶横向墙距
    machineLength: 28, // 机器长度
    machineWidth: 12, // 机器宽度
    machineHeight: 20, // 机器高度
    tubeAltitude: 17, // 导管离地高度
    tubeRadius: 0.5 // 导管半径
}
// 区域4
const Area4 = {
    cabinetLength: 8, // 机柜长度
    cabinetWidth: 6, // 机柜宽度
    cabinetHeight: 17, // 机柜高度
    cabinetGapVertical: 3, // 机柜纵向墙距
    cabinetGapHorizontal: 3 // 机柜横向墙距
}
// 区域5
const Area5 = {
    deskLength: 28, // 工作台长度
    deskWidth: 8, // 工作台宽度
    deskHeight: 9, // 工作台高度
    deskGap: 3, // 工作台墙距
}
// 区域6
const Area6 = {
    deskLength: 22, // 工作台长度
    deskWidth: 7, // 工作台宽度
    deskHeight: 9, // 工作台高度
    deskGapHorizontal: 4, // 工作台横向墙距
    deskGapVertical: 13, // 工作台纵向墙距
    workbenchLength: 24, // 实验台长度
    workbenchWidth: 8, // 实验台宽度
    workbenchHeight: 9, // 实验台高度
    workbenchGapHorizontal: 12, // 实验台横向墙距
    workbenchGapVertical: 3, // 实验台纵向墙距
    showcaseMargin: 2, // 电表柜与桌面边距
    showcaseHeight: 6, // 电表柜高度
    cabinetLength: 8, // 机柜长度
    cabinetWidth: 7, // 机柜宽度
    cabinetHeight: 21, // 机柜高度
    cabinetGapHorizontal: 2, // 机柜横向墙距
    cabinetGapVertical: 3 // 机柜纵向墙距
}
// 区域7
const Area7 = {
    workbenchLength: 22, // 实验台长度
    workbenchWidth: 8, // 实验台宽度
    workbenchHeight: 9, // 实验台高度
    workbenchGapHorizontal: 20, // 实验台横向墙距
    workbenchGapVertical: 3, // 实验台纵向墙距
    showcaseMargin: 2, // 电表柜与桌面边距
    showcaseHeight: 6 // 电表柜高度
}
// 区域8
const Area8 = {
    workbenchLength: 28, // 实验台长度
    workbenchWidth: 8, // 实验台宽度
    workbenchHeight: 9, // 实验台高度
    workbenchGap: 3 // 实验台墙距
}
// 区域9
const Area9 = {
    cabinetAcLength : 8, // 交流机柜长度
    cabinetAcWidth : 8, // 交流机柜宽度
    cabinetAcHeight : 24, // 交流机柜高度
    cabinetDcLength : 8, // 直流机柜长度
    cabinetDcWidth : 6, // 直流机柜宽度
    cabinetDcHeight : 19, // 直流机柜高度
    cabinetMargin: 2, // 机柜间隔
    cabinetGapHorizontal: 3, // 机柜横向墙距
    cabinetGapVertical: 24 // 机柜纵向墙距
}
// 区域10
const Area10 = {
    cabinetLength: 8, // 机柜长度
    cabinetWidth: 8, // 机柜宽度
    cabinetHeight: 21, // 机柜高度
    cabinetMargin: 2, // 机柜间隔
    cabinetGapHorizontal: 3, // 机柜横向墙距
    cabinetGapVertical: 3 // 机柜纵向墙距
}
// 区域11
const Area11 = {
    cabinetLength: 10, // 直流电源柜长度
    cabinetWidth: 8, // 直流电源柜宽度
    cabinetHeight: 16, // 直流电源柜高度
    cabinetGapHorizontal: 3, // 直流电源柜横向墙距
    cabinetGapVertical: 3, // 直流电源柜纵向墙距
    conditionerLength: 8, // 直流空调长度
    conditionerWidth: 6, // 直流空调宽度
    conditionerHeight: 20, // 直流空调高度
    conditionerGap: 3, // 直流空调墙距
    conditionerMargin: 2, // 直流空调边距
    fridgeLength: 8, // 直流冰箱长度
    fridgeWidth: 7, // 直流冰箱宽度
    fridgeHeight: 18, // 直流冰箱高度
    fridgeGap: 3, // 直流冰箱墙距
    fridgeMargin: 2, // 直流冰箱边距
    heaterRadius: 3, // 直流热水器半径
    heaterHeight: 14, // 直流热水器高度
    heaterGap: 5, // 直流热水器墙距
    heaterMargin: 2, // 直流热水器边距
    deskLength: 20, // 工作台长度
    deskWidth: 8, // 工作台宽度
    deskHeight: 9, // 工作台高度
    deskGapHorizontal: 17, // 工作台横向墙距
    deskGapVertical: 3 // 工作台纵向墙距
}
// 区域12
const Area12 = {
    fridgeLength: 8, // 冰箱长度
    fridgeWidth: 6, // 冰箱宽度
    fridgeHeight: 20, // 冰箱高度
    fridgeGapHorizontal: 4, // 冰箱横向墙距
    fridgeGapVertical: 8, // 冰箱纵向墙距
    conditionerLength: 11, // 空调长度
    conditionerWidth: 3, // 空调宽度
    conditionerHeight: 4, // 空调高度
    conditionerAltitude: 24, // 空调离地高度
    heaterRadius: 2.5, // 热水器半径
    heaterLength: 11, // 热水器高度
    heaterAltitude: 24, // 热水器墙距
    heaterMargin: 3, // 热水器边距

    deskLength: 9, // 工作台长度
    deskWidth: 8, // 工作台宽度
    deskHeight: 9, // 工作台高度
    deskGapHorizontal: 3, // 工作台横向墙距
    deskGapVertical: 15, // 工作台纵向墙距
}