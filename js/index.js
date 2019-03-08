"use strict"

let scene, camera, renderer, controls, threeEvent,
    clock = new THREE.Clock(), animatingAction, animateActions = {}

const cameraInitPosition = new THREE.Vector3(Wall.lengthLong / 2 + Wall.thickness, Wall.height * 2.2, Wall.lengthLong * 1.7)
const cameraInitTarget = new THREE.Vector3(Wall.lengthLong / 2 + Wall.thickness, 0, Wall.lengthLong / 2)

let schedule = [] // { targetPos: Vector3, direction: string, signs: Sign[] }
let iterator = -1
let intervalSchedule = -1
let signs = []

draw()

function draw() {
    // initialize
    initScene()
    initCamera()
    initRenderer()
    initLights()
    initFloor()
    initGround()
    initWalls()
    initDoors()
    initShowBoards()
    initArea1()
    initArea2()
    initArea3()
    initArea4()
    initArea5()
    initArea6()
    initArea7()
    initArea8()
    initArea9()
    initArea10()
    initArea11()
    initArea12()
    initRoute()
    initControls()

    // data
    queryData()

    // render
    animate()

    // window resize
    window.addEventListener('resize', onWindowResize, false)
}

function initScene() {
    scene = new THREE.Scene()
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.copy(cameraInitPosition)
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xFFF5EE)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    document.body.appendChild(renderer.domElement)
    // init event
    threeEvent = new THREE.onEvent(scene, camera)
}

function initLights() {
    let ambientLight = new THREE.AmbientLight(Colors.white, 0.7)
    scene.add(ambientLight)

    let pointLight = new THREE.PointLight(Colors.white, 0.4)
    pointLight.position.set(Wall.lengthLong + Wall.thickness * 1.5, Wall.height * 3, Wall.lengthLong / 2)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 1024
    pointLight.shadow.mapSize.height = 1024
    scene.add(pointLight)

    // TODO 507太亮了，暂时关掉一盏灯
    // let pointLightSecondary = new THREE.PointLight(Colors.white, 0.2)
    // pointLightSecondary.position.set(Wall.lengthLong / -2, Wall.height, Wall.lengthLong / 2)
    // pointLightSecondary.castShadow = true
    // pointLightSecondary.shadow.mapSize.width = 1024
    // pointLightSecondary.shadow.mapSize.height = 1024
    // scene.add(pointLightSecondary)
}

function initFloor() {
    let floorMaterial = new THREE.MeshPhongMaterial({ color: 0xcfcfcf })
    let floorUp = new THREE.Mesh(new THREE.BoxGeometry(Floor.lengthUp, Floor.thickness, Floor.widthUp), floorMaterial)
    floorUp.receiveShadow = true
    floorUp.position.set(Wall.thickness * 2 + Wall.lengthLong * 1.5, Floor.thickness / 2, Wall.thickness + Floor.widthUp / 2)
    scene.add(floorUp)
}

function initGround() {
    let texture = new THREE.TextureLoader().load('img/texture/texture_ground.jpg')
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.offset.set(0, 0)
    texture.repeat.set(16, 8)
    let groundMesh = new THREE.Mesh(
        new THREE.BoxGeometry(Wall.lengthLong * 3 + Wall.thickness * 4 + Corridor.width * 2,
            Wall.thickness, Wall.lengthLong + Corridor.width * 2),
        new THREE.MeshPhongMaterial({ color: 0xdddddd, map: texture })
    )
    groundMesh.position.set(Wall.lengthLong / 2 + Wall.thickness, Wall.thickness / -2, Wall.lengthLong / 2)
    groundMesh.receiveShadow = true
    scene.add(groundMesh)
}

function initWalls() {
    let wallMaterial = new THREE.MeshPhongMaterial({ color: 0xacbdc7, transparent: true, opacity: Wall.opacity })
    let wallVerticalSide = new THREE.BoxGeometry(Wall.thickness, Wall.height, Wall.lengthLong)
    let wallHorizontal = new THREE.BoxGeometry(Wall.lengthLong, Wall.height, Wall.thickness)

    let wallLeft1 = new THREE.Mesh(new THREE.BoxGeometry(Wall.thickness, Wall.height,
        Wall.thickness + Door.gapExit), wallMaterial)
    wallLeft1.castShadow = true
    wallLeft1.receiveShadow = true
    wallLeft1.position.set(Wall.thickness / 2, Wall.height / 2, (Wall.thickness + Door.gapExit) / 2)
    scene.add(wallLeft1)

    let doorFrameVertical = new THREE.Mesh(new THREE.BoxGeometry(Wall.thickness, Wall.height - Door.height,
        Door.widthExit), wallMaterial)
    doorFrameVertical.castShadow = true
    doorFrameVertical.receiveShadow = true
    doorFrameVertical.position.set(Wall.thickness / 2, (Wall.height + Door.height) / 2,
        Wall.thickness + Door.gapExit + Door.widthExit / 2)
    scene.add(doorFrameVertical)

    let wallLeft2 = new THREE.Mesh(new THREE.BoxGeometry(Wall.thickness, Wall.height,
        Wall.lengthLong - Wall.thickness - Door.gapExit - Door.widthExit), wallMaterial)
    wallLeft2.castShadow = true
    wallLeft2.receiveShadow = true
    wallLeft2.position.set(Wall.thickness / 2, Wall.height / 2,
        (Wall.lengthLong + Door.widthExit + Wall.thickness + Door.gapExit) / 2)
    scene.add(wallLeft2)

    let wallRight = new THREE.Mesh(wallVerticalSide, wallMaterial)
    wallRight.castShadow = true
    wallRight.receiveShadow = true
    wallRight.position.set(Wall.lengthLong * 2 + Wall.thickness * 2.5, Wall.height / 2, Wall.lengthLong / 2)
    scene.add(wallRight)

    let wallUpLeft = new THREE.Mesh(wallHorizontal, wallMaterial)
    wallUpLeft.castShadow = true
    wallUpLeft.receiveShadow = true
    wallUpLeft.position.set(Wall.lengthLong / 2 + Wall.thickness, Wall.height / 2, Wall.thickness / 2)
    scene.add(wallUpLeft)

    let wallUpRight = new THREE.Mesh(wallHorizontal, wallMaterial)
    wallUpRight.castShadow = true
    wallUpRight.receiveShadow = true
    wallUpRight.position.set(Wall.lengthLong * 1.5 + Wall.thickness * 2, Wall.height / 2, Wall.thickness / 2)
    scene.add(wallUpRight)

    let wallDownLeft = new THREE.Mesh(wallHorizontal, wallMaterial)
    wallDownLeft.castShadow = true
    wallDownLeft.receiveShadow = true
    wallDownLeft.position.set(Wall.lengthLong / 2 + Wall.thickness, Wall.height / 2, Wall.lengthLong - Wall.thickness / 2)
    scene.add(wallDownLeft)

    let wallDownRight1 = new THREE.Mesh(new THREE.BoxGeometry(Wall.lengthLong - Door.widthEntry - Door.gapEntry,
        Wall.height, Wall.thickness), wallMaterial)
    wallDownRight1.castShadow = true
    wallDownRight1.receiveShadow = true
    wallDownRight1.position.set((Wall.lengthLong - Door.widthEntry - Door.gapEntry) / 2 + Wall.lengthLong + Wall.thickness * 2,
        Wall.height / 2, Wall.lengthLong - Wall.thickness / 2)
    scene.add(wallDownRight1)

    let doorFrameHorizontal = new THREE.Mesh(new THREE.BoxGeometry(Door.widthEntry,
        Wall.height - Door.height, Wall.thickness), wallMaterial)
    doorFrameHorizontal.castShadow = true
    doorFrameHorizontal.receiveShadow = true
    doorFrameHorizontal.position.set(Wall.lengthLong * 2 + Wall.thickness * 2 - Door.gapEntry - Door.widthEntry / 2,
        (Wall.height + Door.height) / 2, Wall.lengthLong - Wall.thickness / 2)
    scene.add(doorFrameHorizontal)

    let wallDownRight2 = new THREE.Mesh(new THREE.BoxGeometry(Door.gapEntry, Wall.height, Wall.thickness), wallMaterial)
    wallDownRight2.castShadow = true
    wallDownRight2.receiveShadow = true
    wallDownRight2.position.set(Wall.lengthLong * 2 + Wall.thickness * 2 - Door.gapEntry / 2, Wall.height / 2,
        Wall.lengthLong - Wall.thickness / 2)
    scene.add(wallDownRight2)

    let wallMiddleUp = new THREE.Mesh(new THREE.BoxGeometry(Wall.thickness, Wall.height, Wall.lengthShort1), wallMaterial)
    wallMiddleUp.castShadow = true
    wallMiddleUp.receiveShadow = true
    wallMiddleUp.position.set(Wall.lengthLong + Wall.thickness * 1.5, Wall.height / 2, Wall.lengthShort1 / 2)
    scene.add(wallMiddleUp)

    let wallMiddleDown = new THREE.Mesh(new THREE.BoxGeometry(Wall.thickness, Wall.height, Wall.lengthShort2), wallMaterial)
    wallMiddleDown.castShadow = true
    wallMiddleDown.receiveShadow = true
    wallMiddleDown.position.set(Wall.lengthLong + Wall.thickness * 1.5, Wall.height / 2,
        Wall.lengthLong - Wall.lengthShort2 / 2)
    scene.add(wallMiddleDown)

    /////////////////////////507房间

    let wallSecondaryUp = new THREE.Mesh(wallHorizontal, wallMaterial)
    wallSecondaryUp.castShadow = true
    wallSecondaryUp.receiveShadow = true
    wallSecondaryUp.position.set(Wall.lengthLong / -2, Wall.height / 2, Wall.thickness / 2)
    scene.add(wallSecondaryUp)

    let wallSecondaryLeft = new THREE.Mesh(wallVerticalSide, wallMaterial)
    wallSecondaryLeft.castShadow = true
    wallSecondaryLeft.receiveShadow = true
    wallSecondaryLeft.position.set(-Wall.lengthLong - Wall.thickness / 2, Wall.height / 2, Wall.lengthLong / 2)
    scene.add(wallSecondaryLeft)

    let wallSecondaryDown1 = new THREE.Mesh(new THREE.BoxGeometry(Door.gapSecondary, Wall.height,
        Wall.thickness), wallMaterial)
    wallSecondaryDown1.castShadow = true
    wallSecondaryDown1.receiveShadow = true
    wallSecondaryDown1.position.set(Door.gapSecondary / 2 - Wall.lengthLong, Wall.height / 2,
        Wall.lengthLong - Wall.thickness / 2)
    scene.add(wallSecondaryDown1)

    let doorFrameSecondary = new THREE.Mesh(new THREE.BoxGeometry(Door.widthSecondary,
        Wall.height - Door.height, Wall.thickness), wallMaterial)
    doorFrameSecondary.castShadow = true
    doorFrameSecondary.receiveShadow = true
    doorFrameSecondary.position.set(Door.gapSecondary + Door.widthSecondary / 2 - Wall.lengthLong,
        (Wall.height + Door.height) / 2, Wall.lengthLong - Wall.thickness / 2)
    scene.add(doorFrameSecondary)

    let wallSecondaryDown2 = new THREE.Mesh(new THREE.BoxGeometry(Wall.lengthLong - Door.gapSecondary - Door.widthSecondary,
        Wall.height, Wall.thickness), wallMaterial)
    wallSecondaryDown2.castShadow = true
    wallSecondaryDown2.receiveShadow = true
    wallSecondaryDown2.position.set((Wall.lengthLong - Door.gapSecondary - Door.widthSecondary) / -2,
        Wall.height / 2, Wall.lengthLong - Wall.thickness / 2)
    scene.add(wallSecondaryDown2)
}

function initDoors() {
    let doorMaterial = new THREE.MeshLambertMaterial({
        color: 0x1874CD,
        opacity: Door.opacity,
        transparent: true,
        depthWrite: false
    })
    let doorEntry = new THREE.Mesh(new THREE.BoxGeometry(Door.widthEntry, Door.height, Door.thickness), doorMaterial)
    doorEntry.name = "door-entry"
    doorEntry.castShadow = true
    doorEntry.renderOrder = 1
    doorEntry.position.set(Wall.lengthLong * 2 + Wall.thickness * 2 - Door.gapEntry - Door.widthEntry / 2,
        Door.height / 2, Wall.lengthLong - Wall.thickness / 2)
    scene.add(doorEntry)
    addAnimation({
        meshObject: doorEntry,
        name: "door-entry-action",
        timeArray: [0, 0.5, 1],
        frames: [{
            property: "door-entry.rotation[y]",
            values: [0, Math.PI / -4, Math.PI / -2]
        }, {
            property: "door-entry.position",
            values: [Wall.lengthLong * 2 + Wall.thickness * 2 - Door.gapEntry - Door.widthEntry / 2,
            Door.height / 2, Wall.lengthLong - Wall.thickness / 2,
            Wall.lengthLong * 2 + Wall.thickness * 2 - Door.gapEntry - Door.widthEntry / 2 / Math.sqrt(2),
            Door.height / 2, Wall.lengthLong - Wall.thickness / 2 - Door.widthEntry / 2 / Math.sqrt(2),
            Wall.lengthLong * 2 + Wall.thickness * 2 - Door.gapEntry - Door.thickness / 2, Door.height / 2,
            Wall.lengthLong - Wall.thickness / 2 - Door.widthEntry / 2]
        }],
        loop: THREE.LoopPingPong,
        loopCount: 2,
        loopCallback: function (e) {
            e.action.paused = true
        }
    })
    doorEntry.on('click', function () {
        switchAnimating("door-entry-action")
    })

    let doorExit = new THREE.Mesh(new THREE.BoxGeometry(Door.thickness, Door.height, Door.widthExit), doorMaterial)
    doorExit.name = "door-exit"
    doorExit.castShadow = true
    doorExit.renderOrder = 1
    doorExit.position.set(Wall.thickness / 2, Door.height / 2, Wall.thickness + Door.gapExit + Door.widthExit / 2)
    scene.add(doorExit)
    addAnimation({
        meshObject: doorExit,
        name: "door-exit-action",
        timeArray: [0, 0.5, 1],
        frames: [{
            property: "door-exit.rotation[y]",
            values: [0, Math.PI / -4, Math.PI / -2]
        }, {
            property: "door-exit.position",
            values: [Wall.thickness / 2, Door.height / 2, Wall.thickness + Door.gapExit + Door.widthExit / 2,
            Wall.thickness / 2 + Door.widthExit / 2 / Math.sqrt(2), Door.height / 2,
            Wall.thickness + Door.gapExit + Door.widthExit - Door.widthExit / 2 / Math.sqrt(2),
            Wall.thickness / 2 + Door.widthExit / 2, Door.height / 2,
            Wall.thickness + Door.gapExit + Door.widthExit - Door.thickness / 2]
        }],
        loop: THREE.LoopPingPong,
        loopCount: 2,
        loopCallback: function (e) {
            e.action.paused = true
        }
    })
    doorExit.on('click', function () {
        switchAnimating("door-exit-action")
    })

    let doorSecondary = new THREE.Mesh(new THREE.BoxGeometry(Door.widthSecondary, Door.height, Door.thickness),
        doorMaterial)
    doorSecondary.name = "door-secondary"
    doorSecondary.castShadow = true
    doorSecondary.renderOrder = 1
    doorSecondary.position.set(Door.gapSecondary + Door.widthSecondary / 2 - Wall.lengthLong,
        Door.height / 2, Wall.lengthLong - Wall.thickness / 2)
    scene.add(doorSecondary)
    addAnimation({
        meshObject: doorSecondary,
        name: "door-secondary-action",
        timeArray: [0, 0.5, 1],
        frames: [{
            property: "door-secondary.rotation[y]",
            values: [0, Math.PI / 4, Math.PI / 2]
        }, {
            property: "door-secondary.position",
            values: [Door.gapSecondary + Door.widthSecondary / 2 - Wall.lengthLong,
            Door.height / 2, Wall.lengthLong - Wall.thickness / 2,
            Door.gapSecondary + Door.widthSecondary / 2 / Math.sqrt(2) - Wall.lengthLong,
            Door.height / 2, Wall.lengthLong - Wall.thickness / 2 - Door.widthSecondary / 2 / Math.sqrt(2),
            Door.gapSecondary + Door.thickness / 2 - Wall.lengthLong,
            Door.height / 2, Wall.lengthLong - Wall.thickness / 2 - Door.widthSecondary / 2]
        }],
        loop: THREE.LoopPingPong,
        loopCount: 2,
        loopCallback: function (e) {
            e.action.paused = true
        }
    })
    doorSecondary.on('click', function () {
        switchAnimating("door-secondary-action")
    })
}

function initShowBoards() {
    let boardUpLeft = new ShowBoard({
        length: Board.lengthUp,
        boardImg: 'img/showBoard/show_board_1.jpg'
    })
    boardUpLeft.position.set(Board.gapUp + Board.lengthUp / 2 + Wall.thickness,
        Board.altitude + Board.height / 2, Wall.thickness + Board.thickness / 2)
    scene.add(boardUpLeft)

    let boardUpRight = new ShowBoard({
        length: Board.lengthUp,
        boardImg: 'img/showBoard/show_board_2.png'
    })
    boardUpRight.position.set(Board.gapUp + Board.lengthUp * 1.5 + Wall.thickness + Board.intervalUp,
        Board.altitude + Board.height / 2, Wall.thickness + Board.thickness / 2)
    scene.add(boardUpRight)

    let boardDownLeft = new ShowBoard({
        length: Board.lengthDown,
        boardImg: 'img/showBoard/show_board_3.png'
    })
    boardDownLeft.position.set(Wall.lengthLong + Wall.thickness * 2 + Board.gapDown + Board.lengthDown / 2,
        Board.altitude + Board.height / 2, Wall.lengthLong - Wall.thickness - Board.thickness / 2)
    boardDownLeft.rotation.y = Math.PI
    scene.add(boardDownLeft)

    let boardDownRight = new ShowBoard({
        length: Board.lengthDown,
        boardImg: 'img/showBoard/show_board_4.png'
    })
    boardDownRight.position.set(Wall.lengthLong + Wall.thickness * 2 + Board.gapDown + Board.lengthDown * 1.5 + Board.intervalDown,
        Board.altitude + Board.height / 2, Wall.lengthLong - Wall.thickness - Board.thickness / 2)
    boardDownRight.rotation.y = Math.PI
    scene.add(boardDownRight)

    let boardRight = new ShowBoard({
        length: Board.lengthVertical,
        boardImg: 'img/showBoard/show_board_5.png'
    })
    boardRight.position.set(Wall.lengthLong * 2 + Wall.thickness * 2 - Board.thickness / 2,
        Board.altitude + Board.height / 2, Wall.lengthLong - Wall.thickness - Board.gapVertical - Board.lengthVertical / 2)
    boardRight.rotation.y = Math.PI / -2
    scene.add(boardRight)

    ///////////////////////507

    let boardSecondaryRight = new ShowBoard({
        length: Board.lengthSecondary,
        height: Board.heightSecondary,
        marginX: 0.5
    })
    boardSecondaryRight.position.set(-Board.thickness / 2, Board.altitude + Board.heightSecondary / 2,
        Wall.thickness + Door.gapExit + Door.widthExit + Board.gapSecondaryRight + Board.lengthSecondary / 2)
    boardSecondaryRight.rotation.y = Math.PI / -2
    scene.add(boardSecondaryRight)

    let boardSecondaryDownRight = new ShowBoard({
        length: Board.lengthSecondary,
        height: Board.heightSecondary,
        marginX: 0.5
    })
    boardSecondaryDownRight.position.set(-Board.gapSecondaryDown - Board.lengthSecondary / 2,
        Board.altitude + Board.heightSecondary / 2, Wall.lengthLong - Wall.thickness - Board.thickness / 2)
    boardSecondaryDownRight.rotation.y = Math.PI
    scene.add(boardSecondaryDownRight)

    let tvRight = new ShowBoard({
        length: Board.lengthSecondary,
        height: Board.heightTv,
        boardImg: 'none'
    })
    tvRight.position.set(-Board.gapSecondaryDown - Board.intervalSecondary - Board.lengthSecondary * 1.5,
        Board.altitude + Board.heightTv / 2, Wall.lengthLong - Wall.thickness - Board.thickness / 2)
    tvRight.rotation.y = Math.PI
    scene.add(tvRight)

    let tvLeft = new ShowBoard({
        length: Board.lengthSecondary,
        height: Board.heightTv,
        boardImg: 'none'
    })
    tvLeft.position.set(-Board.gapSecondaryDown - Board.intervalSecondary * 2 - Board.lengthSecondary * 2.5,
        Board.altitude + Board.heightTv / 2, Wall.lengthLong - Wall.thickness - Board.thickness / 2)
    tvLeft.rotation.y = Math.PI
    scene.add(tvLeft)

    let boardSecondaryDownLeft = new ShowBoard({
        length: Board.lengthSecondary,
        height: Board.heightSecondary,
        marginX: 0.5
    })
    boardSecondaryDownLeft.position.set(-Board.gapSecondaryDown - Board.intervalSecondary * 3 - Board.lengthSecondary * 3.5,
        Board.altitude + Board.heightSecondary / 2, Wall.lengthLong - Wall.thickness - Board.thickness / 2)
    boardSecondaryDownLeft.rotation.y = Math.PI
    scene.add(boardSecondaryDownLeft)

    let boardSecondaryLeft = new ShowBoard({
        length: Board.lengthSecondary,
        height: Board.heightSecondary,
        marginX: 0.5
    })
    boardSecondaryLeft.position.set(Board.thickness / 2 - Wall.lengthLong, Board.altitude + Board.heightSecondary / 2,
        Wall.thickness + Board.gapSecondaryLeft + Board.lengthSecondary / 2)
    boardSecondaryLeft.rotation.y = Math.PI / 2
    scene.add(boardSecondaryLeft)
}

// 1 - 需求响应规约测试区域
function initArea1() {
    let area1BoardCenterX = Wall.lengthLong + Wall.thickness * 2 + Board.gapDown + Board.lengthDown * 1.5 + Board.intervalDown
    let desk = new Desk({ length: Area1.deskLength, height: Area1.deskHeight, width: Area1.deskWidth })
    desk.position.set(area1BoardCenterX, Area1.deskHeight / 2,
        Wall.lengthLong - Wall.thickness - Area1.deskGap - Area1.deskWidth / 2)
    scene.add(desk)

    let computer = new Computer({ length: PC.length, width: PC.width, height: PC.height })
    computer.position.set(area1BoardCenterX, Area1.deskHeight + PC.height / 2,
        Wall.lengthLong - Wall.thickness - Area1.deskGap - Area1.deskWidth + Area1.pcMargin + PC.width / 2)
    computer.rotation.y = Math.PI
    scene.add(computer)

    // 终端
    let device1 = new THREE.Mesh(new THREE.BoxGeometry(Device.length, Device.height, Device.width),
        new THREE.MeshPhongMaterial({ color: Colors.Device }))
    device1.castShadow = true
    device1.receiveShadow = true
    device1.position.set(area1BoardCenterX - Area1.deskLength / 2 + Area1.deviceMargin + Device.length / 2,
        Area1.deskHeight + Device.height / 2,
        Wall.lengthLong - Wall.thickness - Area1.deskGap - Area1.deviceMargin - Device.width / 2)
    scene.add(device1)

    let device2 = device1.clone()
    device2.position.x += Device.length + Area1.deviceInterval
    scene.add(device2)

    let device3 = device2.clone()
    device3.position.x += Device.length + Area1.deviceInterval
    scene.add(device3)

    let device4 = device1.clone()
    device4.position.z -= Device.width + Area1.deviceInterval
    scene.add(device4)

    let device5 = device4.clone()
    device5.position.x += Device.length + Area1.deviceInterval
    scene.add(device5)

    // 提示文字 - 终端
    let hintDevice = new Hint({
        text: '需求响应终端',
        wordInOneLine: 3
    })
    hintDevice.bindTo([device3, device2, device1, device4, device5])
    scene.add(hintDevice)

    // 适配器
    let adapter1 = new THREE.Mesh(new THREE.BoxGeometry(Adapter.length, Adapter.height, Adapter.width),
        new THREE.MeshPhongMaterial({ color: 0x243c42 }))
    adapter1.castShadow = true
    adapter1.receiveShadow = true
    adapter1.position.set(area1BoardCenterX + Area1.deskLength / 2 - Area1.deviceMargin - Adapter.length / 2,
        Area1.deskHeight + Adapter.height / 2,
        Wall.lengthLong - Wall.thickness - Area1.deskGap - Area1.deviceMargin - Adapter.width / 2)
    scene.add(adapter1)

    let adapter2 = adapter1.clone()
    adapter2.position.x -= Adapter.length + Area1.deviceInterval
    scene.add(adapter2)

    let adapter3 = adapter2.clone()
    adapter3.position.x -= Adapter.length + Area1.deviceInterval
    scene.add(adapter3)

    let adapter4 = adapter1.clone()
    adapter4.position.z -= Adapter.width + Area1.deviceInterval
    scene.add(adapter4)

    let adapter5 = adapter4.clone()
    adapter5.position.x -= Adapter.length + Area1.deviceInterval
    scene.add(adapter5)

    // 提示文字 - 终端
    let hintAdapter = new Hint({
        text: '通信适配器',
        wordInOneLine: 5,
        hintMargin: 2
    })
    hintAdapter.bindTo([adapter3, adapter2, adapter1, adapter4, adapter5])
    scene.add(hintAdapter)

    // add to schedule
    schedule[0] = {
        targetPos: desk.position.clone(),
        direction: 's'
    }
}

// 2 - OpenADR测试区域
function initArea2() {
    let area2BoardCenterX = Wall.lengthLong + Wall.thickness * 2 + Board.gapDown + Board.lengthDown / 2
    let desk = new Desk({ length: Area2.deskLength, height: Area2.deskHeight, width: Area2.deskWidth })
    desk.position.set(area2BoardCenterX, Area2.deskHeight / 2,
        Wall.lengthLong - Wall.thickness - Area2.deskGap - Area2.deskWidth / 2)
    scene.add(desk)

    let signAdr = new Sign({
        nameText: 'OpenADR',
        statusText: '运行',
        dataText: '2kW'
    })
    signAdr.name = 'sign-area2-adr'
    signAdr.bindTo(desk)
    scene.add(signAdr)
    signs.push(signAdr)

    let computer = new Computer({ length: PC.length, width: PC.width, height: PC.height })
    computer.position.set(area2BoardCenterX, Area2.deskHeight + PC.height / 2,
        Wall.lengthLong - Wall.thickness - Area2.deskGap - Area2.deskWidth + Area2.pcMargin + PC.width / 2)
    computer.rotation.y = Math.PI
    scene.add(computer)

    // 终端
    let deviceInterval = (Area2.deskLength - Device.length * 5) / 5
    let device = new THREE.Mesh(new THREE.BoxGeometry(Device.length, Device.height, Device.width),
        new THREE.MeshPhongMaterial({ color: Colors.Device }))
    device.castShadow = true
    device.receiveShadow = true
    device.position.set(area2BoardCenterX - (Area2.deskLength - deviceInterval - Device.length) / 2,
        Area2.deskHeight + Device.height / 2,
        Wall.lengthLong - Wall.thickness - Area2.deskGap - deviceInterval / 2 - Device.width / 2)
    scene.add(device)

    // 复制4份
    let deviceArray = [device]
    for (let i = 1; i <= 4; i++) {
        let deviceCopy = device.clone()
        deviceCopy.position.x += i * (deviceInterval + Device.length)
        scene.add(deviceCopy)
        deviceArray.push(deviceCopy)
    }

    // 提示文字 - 终端
    let hintDevice = new Hint({
        text: '需求响应终端',
        wordInOneLine: 3
    })
    hintDevice.bindTo(deviceArray)
    scene.add(hintDevice)

    // add to schedule
    schedule[1] = {
        targetPos: desk.position.clone(),
        direction: 's',
        signs: [signAdr]
    }
}

// 3 - 蓄冷蓄热仿真设备
function initArea3() {
    let textureLoader = new THREE.TextureLoader()
    let textureBarrel = textureLoader.load('img/texture/texture_barrel.jpg')
    textureBarrel.wrapS = textureBarrel.wrapT = THREE.RepeatWrapping
    textureBarrel.offset.set(0.5, 0)
    textureBarrel.repeat.set(1, 2)
    let barrelMaterial = new THREE.MeshPhongMaterial({ map: textureBarrel })
    // 热桶
    let heatBarrel = new THREE.Mesh(new THREE.CylinderGeometry(Area3.barrelRadius,
        Area3.barrelRadius, Area3.barrelHeight, 32), barrelMaterial)
    heatBarrel.castShadow = true
    heatBarrel.receiveShadow = true
    heatBarrel.position.set(Wall.lengthLong + Wall.thickness * 2 + Area3.barrelGapHorizontal + Area3.barrelRadius,
        Area3.barrelHeight / 2 + Floor.thickness, Wall.thickness + Area3.barrelGapVertical + Area3.barrelRadius)
    scene.add(heatBarrel)

    let signHeat = new Sign({
        nameText: '蓄热空调',
        statusText: '运行',
        dataText: '10kW'
    })
    signHeat.name = 'sign-area3-heat-barrel'
    signHeat.bindTo(heatBarrel)
    scene.add(signHeat)
    signs.push(signHeat)

    // 冰桶
    let iceBarrel = heatBarrel.clone()
    iceBarrel.position.x = Wall.lengthLong * 2 + Wall.thickness * 2 - Area3.barrelGapHorizontal - Area3.barrelRadius
    scene.add(iceBarrel)

    let signIce = new Sign({
        nameText: '蓄冷空调',
        statusText: '停机',
        dataText: '0kW',
        offline: true
    })
    signIce.name = 'sign-area3-ice-barrel'
    signIce.bindTo(iceBarrel)
    scene.add(signIce)
    signs.push(signIce)

    // 机器
    let textureMachine = textureLoader.load('img/texture/texture_machine.jpg')
    let machineMaterial = new THREE.MeshPhongMaterial({ color: 0x576a66 })
    let materialsMachine = [machineMaterial, machineMaterial, machineMaterial, machineMaterial,
        new THREE.MeshPhongMaterial({ map: textureMachine }), machineMaterial]
    let machine = new THREE.Mesh(new THREE.BoxGeometry(Area3.machineLength,
        Area3.machineHeight, Area3.machineWidth), materialsMachine)
    machine.castShadow = true
    machine.receiveShadow = true
    machine.position.set(Wall.lengthLong * 1.5 + Wall.thickness * 2, Area3.machineHeight / 2 + Floor.thickness,
        Wall.thickness + Area3.barrelGapVertical + Area3.barrelRadius)
    scene.add(machine)

    // 导管
    let tube = new THREE.Mesh(new THREE.CylinderGeometry(Area3.tubeRadius, Area3.tubeRadius,
        Wall.lengthLong - Area3.barrelGapHorizontal - Area3.barrelGapHorizontal - Area3.barrelRadius * 2, 20),
        new THREE.MeshPhongMaterial({ color: 0xbebebe }))
    tube.castShadow = true
    tube.receiveShadow = true
    tube.rotation.z = Math.PI / 2
    tube.position.set(Wall.lengthLong * 1.5 + Wall.thickness * 2, Area3.tubeAltitude + Area3.tubeRadius / 2,
        Wall.thickness + Area3.barrelGapVertical + Area3.barrelRadius)
    scene.add(tube)

    // add to schedule
    schedule[3] = {
        targetPos: machine.position.clone(),
        direction: 'w',
        signs: [signHeat, signIce]
    }
}

// 4 - 可调负载区域
function initArea4() {
    let texture = new THREE.TextureLoader().load('img/texture/texture_rlc.jpg')
    let phoneMaterial = new THREE.MeshPhongMaterial({ color: 0x919da4 })
    let materials = [phoneMaterial, phoneMaterial, phoneMaterial, phoneMaterial,
        phoneMaterial, new THREE.MeshPhongMaterial({ map: texture })]
    let cabinet = new THREE.Mesh(new THREE.BoxGeometry(Area4.cabinetLength, Area4.cabinetHeight, Area4.cabinetWidth),
        materials)
    cabinet.castShadow = true
    cabinet.receiveShadow = true
    cabinet.position.set(Wall.lengthLong + Wall.thickness * 2 + Area4.cabinetGapHorizontal + Area4.cabinetLength / 2,
        Area4.cabinetHeight / 2, Wall.lengthLong - Wall.thickness - Area4.cabinetGapVertical - Area4.cabinetWidth / 2)
    scene.add(cabinet)

    let signRlc = new Sign({
        nameText: '可调负载',
        statusText: '运行',
        dataText: '5kW'
    })
    signRlc.name = 'sign-area4-rlc'
    signRlc.bindTo(cabinet)
    scene.add(signRlc)
    signs.push(signRlc)

    // add to schedule
    schedule[2] = {
        targetPos: cabinet.position.clone(),
        direction: 's',
        signs: [signRlc]
    }
}

// 5 - 系统仿真展示区域
function initArea5() {
    // 工作台
    let deskCenterX = Board.gapUp + Board.lengthUp * 1.5 + Wall.thickness + Board.intervalUp
    let desk = new Desk({ length: Area5.deskLength, height: Area5.deskHeight, width: Area5.deskWidth })
    desk.position.set(deskCenterX, Area5.deskHeight / 2,
        Wall.thickness + Area5.deskGap + Area5.deskWidth / 2)
    scene.add(desk)

    // 电脑
    let computer = new Computer({ length: PC.length, width: PC.width, height: PC.height })
    computer.position.set(deskCenterX, Area5.deskHeight + PC.height / 2,
        Wall.thickness + Area5.deskGap + Area5.deskWidth / 2)
    scene.add(computer)

    // add to schedule
    schedule[4] = {
        targetPos: desk.position.clone(),
        direction: 'w'
    }
}

// 6 - 电能表走字检测区域
function initArea6() {
    // 实验台
    let workbench = new WorkBench({
        length: Area6.workbenchLength,
        height: Area6.workbenchHeight,
        width: Area6.workbenchWidth
    })
    workbench.position.set(Wall.lengthLong + Wall.thickness - Area6.workbenchGapHorizontal - Area6.workbenchLength / 2,
        Area6.workbenchHeight / 2, Wall.lengthLong - Wall.thickness - Area6.workbenchGapVertical - Area6.workbenchWidth / 2)
    workbench.rotation.y = Math.PI
    scene.add(workbench)

    // 展柜
    let showcase = new Showcase({
        length: Area6.workbenchLength - Area6.showcaseMargin * 2, height: Area6.showcaseHeight,
        width: Area6.workbenchWidth - Area6.showcaseMargin * 2
    })
    showcase.position.set(Wall.lengthLong + Wall.thickness - Area6.workbenchGapHorizontal - Area6.workbenchLength / 2,
        Area6.workbenchHeight + Area6.showcaseHeight / 2,
        Wall.lengthLong - Wall.thickness - Area6.workbenchGapVertical - Area6.workbenchWidth / 2)
    showcase.rotation.y = Math.PI
    scene.add(showcase)

    // 机柜
    let cabinetMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc })
    let materials = [cabinetMaterial, cabinetMaterial, cabinetMaterial, cabinetMaterial, cabinetMaterial,
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('img/texture/texture_pressure.jpg') })]
    let cabinet = new THREE.Mesh(new THREE.BoxGeometry(Area6.cabinetLength, Area6.cabinetHeight,
        Area6.cabinetWidth), materials)
    cabinet.castShadow = true
    cabinet.receiveShadow = true
    cabinet.position.set(Wall.lengthLong + Wall.thickness - Area6.cabinetGapHorizontal - Area6.cabinetLength / 2,
        Area6.cabinetHeight / 2, Wall.lengthLong - Wall.thickness - Area6.cabinetGapVertical - Area6.cabinetWidth / 2)
    scene.add(cabinet)

    // 工作台
    let desk = new Desk({ length: Area6.deskLength, height: Area6.deskHeight, width: Area6.deskWidth })
    desk.position.set(Wall.lengthLong + Wall.thickness - Area6.deskGapHorizontal - Area6.deskLength / 2,
        Area6.deskHeight / 2, Wall.lengthLong - Wall.thickness - Area6.deskGapVertical - Area6.deskWidth / 2)
    scene.add(desk)

    // 电脑
    let computer = new Computer({ length: PC.length, width: PC.width, height: PC.height })
    computer.position.set(Wall.lengthLong + Wall.thickness - Area6.deskGapHorizontal - Area6.deskLength / 2,
        Area6.deskHeight + PC.height / 2,
        Wall.lengthLong - Wall.thickness - Area6.deskGapVertical - Area6.deskWidth / 2)
    computer.rotation.y = Math.PI
    scene.add(computer)

    // add to schedule
    schedule[6] = {
        targetPos: desk.position.clone(),
        direction: 's'
    }
}

// 7 - 计量通讯入网检测区域
function initArea7() {
    let workbench = new WorkBench({
        length: Area7.workbenchLength,
        height: Area7.workbenchHeight,
        width: Area7.workbenchWidth
    })
    workbench.position.set(Wall.thickness + Area7.workbenchGapHorizontal + Area7.workbenchLength / 2,
        Area7.workbenchHeight / 2, Wall.lengthLong - Wall.thickness - Area7.workbenchGapVertical - Area7.workbenchWidth / 2)
    workbench.rotation.y = Math.PI
    scene.add(workbench)


    let showcase = new Showcase({
        length: Area7.workbenchLength - Area7.showcaseMargin * 2,
        height: Area7.showcaseHeight,
        width: Area7.workbenchWidth - Area7.showcaseMargin * 2
    })
    showcase.position.set(Wall.thickness + Area7.workbenchGapHorizontal + Area7.workbenchLength / 2,
        Area7.showcaseHeight / 2 + Area7.workbenchHeight,
        Wall.lengthLong - Wall.thickness - Area7.workbenchGapVertical - Area7.workbenchWidth / 2)
    showcase.rotation.y = Math.PI
    scene.add(showcase)

    // add to schedule
    schedule[7] = {
        targetPos: workbench.position.clone(),
        direction: 's'
    }
}

// 8 - 柯子岭电表设备
function initArea8() {
    let workbench = new WorkBench({
        length: Area8.workbenchLength,
        height: Area8.workbenchHeight,
        width: Area8.workbenchWidth
    })
    workbench.position.set(Board.gapUp + Board.lengthUp / 2 + Wall.thickness,
        Area8.workbenchHeight / 2, Wall.thickness + Area8.workbenchGap + Area8.workbenchWidth / 2)
    scene.add(workbench)

    // 电脑
    let computer = new Computer({
        length: PC.length,
        width: PC.width,
        height: PC.height
    })
    computer.position.set(Board.gapUp + Board.lengthUp / 2 + Wall.thickness,
        Area8.workbenchHeight + PC.height / 2,
        Wall.thickness + Area8.workbenchGap + Area8.workbenchWidth / 2)
    scene.add(computer)

    // add to schedule
    schedule[5] = {
        targetPos: workbench.position.clone(),
        direction: 'w'
    }
}

// 9 - 充电桩测试区域
function initArea9() {
    // 机柜
    let textureLoader = new THREE.TextureLoader()
    let phongMaterialAC = new THREE.MeshPhongMaterial({ color: 0xe2e4e2 })
    let materialsAC = [new THREE.MeshPhongMaterial({ map: textureLoader.load('img/texture/texture_ac.jpg') }),
        phongMaterialAC, phongMaterialAC, phongMaterialAC, phongMaterialAC, phongMaterialAC]
    let cabinetAC = new THREE.Mesh(new THREE.BoxGeometry(Area9.cabinetAcLength, Area9.cabinetAcHeight,
        Area9.cabinetAcWidth), materialsAC)
    cabinetAC.castShadow = true
    cabinetAC.receiveShadow = true
    cabinetAC.position.set(Wall.thickness + Area9.cabinetGapHorizontal + Area9.cabinetAcLength / 2,
        Area9.cabinetAcHeight / 2, Wall.lengthLong - Wall.thickness - Area9.cabinetGapVertical - Area9.cabinetAcWidth / 2)
    scene.add(cabinetAC)
    let phongMaterialDC = new THREE.MeshPhongMaterial({ color: 0x9a979f })
    let materialsDC = [new THREE.MeshPhongMaterial({ map: textureLoader.load('img/texture/texture_dc.jpg') }),
        phongMaterialDC, phongMaterialDC, phongMaterialDC, phongMaterialDC, phongMaterialDC]
    let cabinetDC = new THREE.Mesh(new THREE.BoxGeometry(Area9.cabinetDcWidth, Area9.cabinetDcHeight,
        Area9.cabinetDcLength), materialsDC)
    cabinetDC.castShadow = true
    cabinetDC.receiveShadow = true
    cabinetDC.position.set(Wall.thickness + Area9.cabinetGapHorizontal + Area9.cabinetDcWidth / 2,
        Area9.cabinetDcHeight / 2, Wall.lengthLong - Wall.thickness - Area9.cabinetGapVertical
        - Area9.cabinetAcWidth - Area9.cabinetMargin - Area9.cabinetDcLength / 2)
    scene.add(cabinetDC)

    // add to schedule
    let centerPos = cabinetAC.position.clone()
    centerPos.z = (cabinetAC.position.z + cabinetDC.position.z) / 2
    schedule[9] = {
        targetPos: centerPos,
        direction: 'a'
    }
}

// 10 - 服务器测试区域
function initArea10() {
    let emptyMaterial = new THREE.MeshPhongMaterial({ color: Colors.dark })
    let materials = [new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('img/texture/texture_server.jpg') }),
        emptyMaterial, emptyMaterial, emptyMaterial, emptyMaterial, emptyMaterial]
    // 机柜
    let cabinet1 = new THREE.Mesh(new THREE.BoxGeometry(Area10.cabinetLength, Area10.cabinetHeight,
        Area10.cabinetWidth), materials)
    cabinet1.castShadow = true
    cabinet1.receiveShadow = true
    cabinet1.position.set(Wall.thickness + Area10.cabinetGapHorizontal + Area10.cabinetWidth / 2,
        Area10.cabinetHeight / 2, Wall.lengthLong - Wall.thickness - Area10.cabinetGapVertical - Area10.cabinetLength / 2)
    scene.add(cabinet1)
    let cabinet2 = cabinet1.clone()
    cabinet2.position.z -= Area10.cabinetLength + Area10.cabinetMargin
    scene.add(cabinet2)

    // add to schedule
    let centerPos = cabinet1.position.clone()
    centerPos.z = (cabinet1.position.z + cabinet2.position.z) / 2
    schedule[8] = {
        targetPos: centerPos,
        direction: 'a'
    }
}

// 11 - 507房间直流设备区域
function initArea11() {
    let textureLoader = new THREE.TextureLoader()
    // 直流电源柜
    let cabinetTexture = textureLoader.load('img/texture/texture_cabinet_secondary.jpg')
    let cabinetMaterialOther = new THREE.MeshPhongMaterial({ color: 0xbebdbb })
    let cabinetCoordZ = Wall.lengthLong - Wall.thickness - Area11.cabinetGapVertical - Area11.cabinetLength / 2
    let cabinet = new THREE.Mesh(new THREE.BoxGeometry(Area11.cabinetWidth, Area11.cabinetHeight, Area11.cabinetLength),
        [cabinetMaterialOther, new THREE.MeshPhongMaterial({ map: cabinetTexture }), cabinetMaterialOther,
            cabinetMaterialOther, cabinetMaterialOther, cabinetMaterialOther])
    cabinet.castShadow = true
    cabinet.receiveShadow = true
    cabinet.position.set(-Area11.cabinetGapHorizontal - Area11.cabinetWidth / 2, Area11.cabinetHeight / 2,
        cabinetCoordZ)
    scene.add(cabinet)

    // 直流空调
    let conditionerTexture = textureLoader.load('img/texture/texture_conditioner_stand.jpg')
    let conditionerMaterialOther = new THREE.MeshPhongMaterial({ color: 0xe7e8ea })
    let conditionerCoordZ = cabinetCoordZ - Area11.cabinetLength / 2 - Area11.conditionerMargin - Area11.conditionerLength / 2
    let conditioner = new THREE.Mesh(new THREE.BoxGeometry(Area11.conditionerWidth, Area11.conditionerHeight,
        Area11.conditionerLength), [conditionerMaterialOther, new THREE.MeshPhongMaterial({ map: conditionerTexture }),
            conditionerMaterialOther, conditionerMaterialOther, conditionerMaterialOther, conditionerMaterialOther])
    conditioner.castShadow = true
    conditioner.receiveShadow = true
    conditioner.position.set(-Area11.conditionerGap - Area11.conditionerWidth / 2,
        Area11.conditionerHeight / 2, conditionerCoordZ)
    scene.add(conditioner)

    // 直流冰箱
    let fridgeTexture = textureLoader.load('img/texture/texture_fridge_light.jpg')
    let fridgeMaterialOther = new THREE.MeshPhongMaterial({ color: 0xdce0e3 })
    let fridgeCoordZ = conditionerCoordZ - Area11.conditionerLength / 2 - Area11.fridgeMargin - Area11.fridgeLength / 2
    let fridge = new THREE.Mesh(new THREE.BoxGeometry(Area11.fridgeWidth, Area11.fridgeHeight, Area11.fridgeLength),
        [fridgeMaterialOther, new THREE.MeshPhongMaterial({ map: fridgeTexture }), fridgeMaterialOther,
            fridgeMaterialOther, fridgeMaterialOther, fridgeMaterialOther])
    fridge.castShadow = true
    fridge.receiveShadow = true
    fridge.position.set(-Area11.fridgeGap - Area11.fridgeWidth / 2, Area11.fridgeHeight / 2, fridgeCoordZ)
    scene.add(fridge)

    // 热水器
    let heaterTexture = textureLoader.load('img/texture/texture_heater_stand.jpg')
    let heaterMaterialOther = new THREE.MeshPhongMaterial({ color: 0xa3a5a4 })
    let heaterCoordZ = fridgeCoordZ - Area11.fridgeLength / 2 - Area11.heaterMargin - Area11.heaterRadius
    let heater = new THREE.Mesh(new THREE.CylinderGeometry(Area11.heaterRadius,
        Area11.heaterRadius, Area11.heaterHeight, 32), [new THREE.MeshPhongMaterial({ map: heaterTexture }),
            heaterMaterialOther, heaterMaterialOther])
    heater.rotation.y = Math.PI / 2
    heater.castShadow = true
    heater.receiveShadow = true
    heater.position.set(-Area11.heaterGap - Area11.heaterRadius / 2, Area11.heaterHeight / 2, heaterCoordZ)
    scene.add(heater)

    // 工作台
    let deskDown = new Desk({ length: Area11.deskLength, height: Area11.deskHeight, width: Area11.deskWidth })
    deskDown.position.set(-Area11.deskGapHorizontal - Area11.deskLength / 2, Area11.deskHeight / 2,
        Wall.lengthLong - Wall.thickness - Area11.deskGapVertical - Area11.deskWidth / 2)
    scene.add(deskDown)

    let deskUp = new Desk({ length: Area11.deskLength, height: Area11.deskHeight, width: Area11.deskWidth })
    deskUp.position.set(-Wall.lengthLong / 2, Area11.deskHeight / 2,
        Wall.thickness + Area11.deskGapVertical + Area11.deskWidth / 2)
    scene.add(deskUp)

    // 电脑
    let computer = new Computer({ length: PC.length, width: PC.width, height: PC.height })
    computer.position.set(-Wall.lengthLong / 2, Area11.deskHeight + PC.height / 2,
        Wall.thickness + Area11.deskGapVertical + Area11.deskWidth / 2)
    scene.add(computer)

    // add to schedule
    let centerPos = heater.position.clone()
    centerPos.z = Wall.lengthLong / 2
    schedule[11] = {
        targetPos: centerPos,
        direction: 'd'
    }
}

// 12 - 507房间非侵入式负荷测试区域
function initArea12() {
    let textureLoader = new THREE.TextureLoader()
    // 冰箱+空调+热水器组合体
    let group = new THREE.Group()
    let groupCenterX = (Area12.fridgeGapHorizontal + Area12.fridgeWidth) / 2
    let heaterHeight = Area12.heaterAltitude + Area12.heaterRadius * 2
    let conditionerHeight = Area12.conditionerAltitude + Area12.conditionerHeight
    let groupCenterY = (heaterHeight > conditionerHeight ? heaterHeight : conditionerHeight) / 2
    let groupCenterZ = (Area12.conditionerLength + Area12.heaterMargin + Area12.heaterLength) / 2

    // 冰箱
    let fridgeTexture = textureLoader.load('img/texture/texture_fridge_dark.jpg')
    let fridgeMaterialOther = new THREE.MeshPhongMaterial({ color: 0x4a4e59 })
    let fridge = new THREE.Mesh(new THREE.BoxGeometry(Area12.fridgeWidth, Area12.fridgeHeight,
        Area12.fridgeLength), [new THREE.MeshPhongMaterial({ map: fridgeTexture }), fridgeMaterialOther,
            fridgeMaterialOther, fridgeMaterialOther, fridgeMaterialOther, fridgeMaterialOther])
    fridge.castShadow = true
    fridge.receiveShadow = true
    fridge.position.x += Area12.fridgeGapHorizontal + Area12.fridgeWidth / 2 - groupCenterX
    fridge.position.y += Area12.fridgeHeight / 2 - groupCenterY
    fridge.position.z += Area12.conditionerLength / 2 - groupCenterZ
    group.add(fridge)

    // 空调
    let conditionerTexture = textureLoader.load('img/texture/texture_conditioner_hang.jpg')
    let conditionerMaterialOther = new THREE.MeshPhongMaterial({ color: 0xf2f1ef })
    let conditioner = new THREE.Mesh(new THREE.BoxGeometry(Area12.conditionerWidth,
        Area12.conditionerHeight, Area12.conditionerLength), [new THREE.MeshPhongMaterial({ map: conditionerTexture }),
            conditionerMaterialOther, conditionerMaterialOther, conditionerMaterialOther,
            conditionerMaterialOther, conditionerMaterialOther])
    conditioner.castShadow = true
    conditioner.receiveShadow = true
    conditioner.position.x += Area12.conditionerWidth / 2 - groupCenterX
    conditioner.position.y += Area12.conditionerAltitude + Area12.conditionerHeight / 2 - groupCenterY
    conditioner.position.z += Area12.conditionerLength / 2 - groupCenterZ
    group.add(conditioner)

    // 热水器
    let heaterTexture = textureLoader.load('img/texture/texture_heater_hang.jpg')
    heaterTexture.rotation = Math.PI / -2
    heaterTexture.center = new THREE.Vector2(0.5, 0.5)
    let heaterMaterialSide = new THREE.MeshPhongMaterial({ color: 0x123456 })
    let heater = new THREE.Mesh(new THREE.CylinderGeometry(Area12.heaterRadius, Area12.heaterRadius,
        Area12.heaterLength, 32), [new THREE.MeshPhongMaterial({ map: heaterTexture }),
            heaterMaterialSide, heaterMaterialSide])
    heater.castShadow = true
    heater.receiveShadow = true
    heater.rotation.x = Math.PI / 2
    heater.rotation.y = Math.PI / -2
    heater.position.x += Area12.heaterRadius - groupCenterX
    heater.position.y += Area12.heaterAltitude + Area12.heaterRadius - groupCenterY
    heater.position.z += Area12.conditionerLength + Area12.heaterMargin + Area12.heaterLength / 2 - groupCenterZ
    group.add(heater)

    group.position.set(groupCenterX - Wall.lengthLong, groupCenterY,
        Wall.thickness + Area12.fridgeGapVertical + groupCenterZ)
    scene.add(group)

    let group2 = group.clone()
    group2.position.z += groupCenterZ * 2 + Area12.heaterMargin
    scene.add(group2)

    // 桌子
    let desk = new Desk({ length: Area12.deskLength, height: Area12.deskHeight, width: Area12.deskWidth })
    desk.position.set(Area12.deskGapHorizontal + Area12.deskLength / 2 - Wall.lengthLong, Area12.deskHeight / 2,
        Wall.lengthLong - Wall.thickness - Area12.deskGapVertical - Area12.deskWidth / 2)
    desk.rotation.y = Math.PI / 2
    scene.add(desk)

    // 终端
    let device = new THREE.Mesh(new THREE.BoxGeometry(Device.length, Device.height, Device.width),
        new THREE.MeshPhongMaterial({ color: Colors.Device }))
    device.castShadow = true
    device.receiveShadow = true
    device.rotation.y = Math.PI / 2
    device.position.set(Area12.deskGapHorizontal + Area12.deskLength / 2 - Wall.lengthLong,
        Area12.deskHeight + Device.height / 2,
        Wall.lengthLong - Wall.thickness - Area12.deskGapVertical - Area12.deskWidth / 2)
    scene.add(device)

    // 提示文字 - 终端
    let hintDevice = new Hint({
        text: '非侵入式终端',
        wordInOneLine: 3
    })
    hintDevice.bindTo(device)
    scene.add(hintDevice)

    // add to schedule
    let centerPos = group.position.clone()
    centerPos.z = Wall.lengthLong / 2
    schedule[10] = {
        targetPos: centerPos,
        direction: 'a'
    }
}

// 巡视路线
function initRoute() {
    // draw dashed line
    let lineMat = new THREE.LineDashedMaterial({
        color: 0x3b9611,
        linewidth: 5
    })

    let lineGeo = new THREE.Geometry()
    const aboveGround = 0.05
    lineGeo.vertices.push(
        new THREE.Vector3(Wall.lengthLong * 2 + Wall.thickness * 2 - Door.gapEntry - Door.widthEntry / 2
            , aboveGround, Wall.lengthLong + Corridor.width * 3),
        new THREE.Vector3(Wall.lengthLong * 2 + Wall.thickness * 2 - Door.gapEntry - Door.widthEntry / 2
            , aboveGround, Wall.lengthLong / 2),
        new THREE.Vector3(Wall.thickness + Wall.height, aboveGround, Wall.lengthLong / 2),
        new THREE.Vector3(Wall.thickness + Wall.height, aboveGround,
            Wall.thickness + Door.gapExit + Door.widthExit / 2),
        new THREE.Vector3(-Wall.height, aboveGround, Wall.thickness + Door.gapExit + Door.widthExit / 2),
        new THREE.Vector3(-Wall.height, aboveGround, Wall.lengthLong / 2),
        new THREE.Vector3(Wall.height - Wall.lengthLong, aboveGround, Wall.lengthLong / 2),
        new THREE.Vector3(Wall.height - Wall.lengthLong, aboveGround, Wall.lengthLong - Wall.thickness * 4),
        new THREE.Vector3(Door.gapSecondary + Door.widthSecondary / 2 - Wall.lengthLong, aboveGround,
            Wall.lengthLong - Wall.thickness * 4),
        new THREE.Vector3(Door.gapSecondary + Door.widthSecondary / 2 - Wall.lengthLong, aboveGround,
            Wall.lengthLong + Corridor.width * 3)
    )

    let line = new THREE.Line(lineGeo, lineMat)
    line.computeLineDistances()
    line.name = 'route-line'
    line.visible = false
    scene.add(line)
}

function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.target.copy(cameraInitTarget)
    controls.minDistance = 50
    controls.maxDistance = 500
    controls.maxPolarAngle = Math.PI / 2
    controls.panSpeed = 0.5
    controls.rotateSpeed = 0.25
    controls.zoomSpeed = 0.5
    controls.saveState()
    controls.update()
}

function addAnimation(options) {
    options = {
        meshObject: options.meshObject,
        duration: options.duration || 1,
        name: options.name,
        timeArray: options.timeArray,
        frames: options.frames,
        loop: options.loop || THREE.LoopOnce,
        loopCount: options.loopCount || 0,
        loopCallback: options.loopCallback,
        finishCallback: options.finishCallback
    }
    if (!options.meshObject || !options.name || !options.timeArray || !options.frames) {
        throw new Error('参数缺失')
    }

    let keyFrames = []
    for (let { property, values } of options.frames) {
        keyFrames.push(new THREE.KeyframeTrack(property, options.timeArray, values))
    }
    let clip = new THREE.AnimationClip(options.name, options.duration, keyFrames)
    let mixer = new THREE.AnimationMixer(options.meshObject)
    let action = mixer.clipAction(clip)
    options.loopCallback && mixer.addEventListener('loop', options.loopCallback)
    options.finishCallback && mixer.addEventListener('finished', options.finishCallback)
    action.setLoop(options.loop, options.loopCount)
    animateActions[options.name] = action
}

function switchAnimating(name) {
    if (!animatingAction || !animatingAction.isRunning()) {
        animatingAction = animateActions[name]
        if (animatingAction.paused) {
            animatingAction.paused = false
        } else {
            animatingAction.reset().play()
        }
    }
}

function render() {
    renderer.render(scene, camera)
}

function animate() {
    requestAnimationFrame(animate)
    render()
    controls.update()
    TWEEN.update()
    animatingAction && animatingAction.getMixer().update(clock.getDelta())
}

function onWindowResize() {
    let canvasWidth = window.innerWidth
    let canvasHeight = window.innerHeight
    renderer.setSize(canvasWidth, canvasHeight)
    camera.aspect = canvasWidth / canvasHeight
    camera.updateProjectionMatrix()
}

// toolbar - START

function switchStatus(btn) {
    let status = btn.getAttribute('data-status')
    let use = btn.getElementsByTagName('use')[0]
    let href = use.getAttribute('xlink:href')
    let match = href.match(/\w+$/)[0]
    btn.setAttribute('data-status', match)
    use.setAttribute('xlink:href', href.replace(/\w+$/, status))
}

function toolWalk(target) {
    // turn off signs
    let button = document.querySelector('button[data-status=off]')
    button && button.click()

    // show route
    let status = target.getAttribute('data-status')
    switchStatus(target)
    target.title = status === 'walk' ? '暂停巡航' : '开启巡航'
    let line = scene.getObjectByName('route-line')
    line.visible = status === 'walk'

    // start schedule
    if (intervalSchedule === -1) {
        intervalSchedule = setInterval(runSchedule, 3000)
    } else {
        // pause schedule
        clearInterval(intervalSchedule)
        intervalSchedule = -1
    }
}

function toolEye(target) {
    let status = target.getAttribute('data-status')
    switchStatus(target)
    target.title = status === 'on' ? '隐藏运行状态' : '显示运行状态'
    signs.map(sign => {
        sign.visible = status === 'on'
    })
}

function toolReset() {
    // reset camera
    camera.position.copy(cameraInitPosition)
    // reset control
    controls.reset()
}

function lookAt(scheduleObj) {
    let targetPos = scheduleObj.targetPos
    let direction = scheduleObj.direction

    // solution 1
    // TWEEN.removeAll()
    // let prevPosition = camera.position.clone()
    // let prevTarget = controls.target.clone()

    // // Tween
    new TWEEN.Tween(controls.target).to({
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z
    }, 600).easing(TWEEN.Easing.Cubic.InOut).start()

    // new TWEEN.Tween(camera.position).to({
    //     x: targetPos.x + prevPosition.x - prevTarget.x,
    //     y: targetPos.y + prevPosition.y - prevTarget.y,
    //     z: targetPos.z + prevPosition.z - prevTarget.z
    // }, 600).easing(TWEEN.Easing.Cubic.InOut).start()

    // solution 2
    // target
    // controls.target.copy(targetPos)
    // camera position
    let x, z
    switch (direction) {
        case 'w':
            x = targetPos.x
            z = targetPos.z + Camera.distance
            break;
        case 's':
            x = targetPos.x
            z = targetPos.z - Camera.distance
            break;
        case 'a':
            x = targetPos.x + Camera.distance
            z = targetPos.z
            break;
        case 'd':
            x = targetPos.x - Camera.distance
            z = targetPos.z
            break;
    }
    // camera.position.set(x, Camera.altitude, z)

    // solution 3
    new TWEEN.Tween(camera.position).to({
        x: x,
        y: Camera.altitude,
        z: z
    }, 600).easing(TWEEN.Easing.Cubic.InOut).start()
}

function runSchedule() {
    // hide prev sign
    let prevIter = iterator
    if (prevIter !== -1) {
        let scheduleObj = schedule[prevIter]
        let prevSigns = scheduleObj.signs
        prevSigns && prevSigns.map(sign => sign.visible = false)
    }
    // lookat next area
    iterator = (iterator + 1) % schedule.length
    let scheduleObj = schedule[iterator]
    lookAt(scheduleObj)
    // show sign
    let curSigns = scheduleObj.signs
    curSigns && curSigns.map(sign => sign.visible = true)
}

// toolbar - END

// query data
function queryData() {
    scene.getObjectByName('sign-area2-adr').update(randomData())
    scene.getObjectByName('sign-area3-heat-barrel').update(randomData())
    scene.getObjectByName('sign-area3-ice-barrel').update(randomData())
    scene.getObjectByName('sign-area4-rlc').update(randomData())

    setTimeout(queryData, 5000)
}

function randomData() {
    let status = randomIn('运行', '停止', '离线')
    return {
        status: status,
        data: (Math.random() * 15).toFixed(1) + 'kW',
        offline: status !== '运行'
    }
}

function randomIn(...rest) {
    let num = Math.random() * rest.length
    return rest[num | 0]
}