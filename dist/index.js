"use strict";

var scene,
    camera,
    renderer,
    controls,
    threeEvent,
    clock = new THREE.Clock(),
    animatingAction,
    animateActions = {};
draw();

function draw() {
  // initialize
  initScene();
  initCamera();
  initRenderer();
  initLights();
  initFloor();
  initGround();
  initWalls();
  initDoors();
  initShowBoards();
  initArea1();
  initArea2();
  initArea3();
  initArea4();
  initArea5();
  initArea6();
  initArea7();
  initArea8();
  initArea9();
  initArea10();
  initArea11();
  initArea12();
  initControls(); // render

  animate(); // window resize

  window.addEventListener('resize', onWindowResize, false);
}

function initScene() {
  scene = new THREE.Scene();
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(WALL_LENGTH_LONG + WALL_THICKNESS * 1.5, WALL_HEIGHT * 2, WALL_LENGTH_LONG * 1.8);
  camera.lookAt(new THREE.Vector3(WALL_LENGTH_LONG + WALL_THICKNESS * 1.5, 0, 0));
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xFFF5EE);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement); // init event

  threeEvent = new THREE.onEvent(scene, camera);
}

function initLights() {
  var ambientLight = new THREE.AmbientLight(Colors.white, 0.7);
  scene.add(ambientLight);
  var pointLight = new THREE.PointLight(Colors.white, 0.4);
  pointLight.position.set(WALL_LENGTH_LONG + WALL_THICKNESS * 1.5, WALL_HEIGHT * 3, WALL_LENGTH_LONG / 2);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  scene.add(pointLight); // TODO 507太亮了，暂时关掉一盏灯
  // let pointLightSecondary = new THREE.PointLight(Colors.white, 0.2)
  // pointLightSecondary.position.set(WALL_LENGTH_LONG / -2, WALL_HEIGHT, WALL_LENGTH_LONG / 2)
  // pointLightSecondary.castShadow = true
  // pointLightSecondary.shadow.mapSize.width = 1024
  // pointLightSecondary.shadow.mapSize.height = 1024
  // scene.add(pointLightSecondary)
}

function initFloor() {
  var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xcfcfcf
  });
  var floorUp = new THREE.Mesh(new THREE.BoxGeometry(FLOOR_UP_LENGTH, FLOOR_THICKNESS, FLOOR_UP_WIDTH), floorMaterial);
  floorUp.receiveShadow = true;
  floorUp.position.set(WALL_THICKNESS + FLOOR_UP_LENGTH / 2, FLOOR_THICKNESS / 2, WALL_THICKNESS + FLOOR_UP_WIDTH / 2);
  scene.add(floorUp);
  var floorDown = new THREE.Mesh(new THREE.BoxGeometry(FLOOR_DOWN_LENGTH, FLOOR_THICKNESS, FLOOR_DOWN_WIDTH), floorMaterial);
  floorDown.receiveShadow = true;
  floorDown.position.set(WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - DOOR_GAP_ENTRY - DOOR_WIDTH_ENTRY - FLOOR_DOWN_LENGTH / 2, FLOOR_THICKNESS / 2, WALL_LENGTH_LONG - WALL_THICKNESS - FLOOR_DOWN_WIDTH / 2);
  scene.add(floorDown);
  var floorLeft = new THREE.Mesh(new THREE.BoxGeometry(FLOOR_LEFT_LENGTH, FLOOR_THICKNESS, FLOOR_LEFT_WIDTH), floorMaterial);
  floorLeft.receiveShadow = true;
  floorLeft.position.set(WALL_THICKNESS + FLOOR_LEFT_LENGTH / 2, FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - FLOOR_LEFT_WIDTH / 2);
  scene.add(floorLeft);
}

function initGround() {
  var texture = new THREE.TextureLoader().load('img/texture/texture_ground.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(16, 8);
  var groundMesh = new THREE.Mesh(new THREE.BoxGeometry(WALL_LENGTH_LONG * 3 + WALL_THICKNESS * 4 + CORRIDOR_WIDTH * 2, WALL_THICKNESS, WALL_LENGTH_LONG + CORRIDOR_WIDTH * 2), new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    map: texture
  }));
  groundMesh.position.set(WALL_LENGTH_LONG / 2 + WALL_THICKNESS, WALL_THICKNESS / -2, WALL_LENGTH_LONG / 2);
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);
}

function initWalls() {
  var wallMaterial = new THREE.MeshPhongMaterial({
    color: 0xacbdc7,
    transparent: true,
    opacity: WALL_OPACITY
  });
  var wallVerticalSide = new THREE.BoxGeometry(WALL_THICKNESS, WALL_HEIGHT, WALL_LENGTH_LONG);
  var wallHorizontal = new THREE.BoxGeometry(WALL_LENGTH_LONG, WALL_HEIGHT, WALL_THICKNESS);
  var wallLeft1 = new THREE.Mesh(new THREE.BoxGeometry(WALL_THICKNESS, WALL_HEIGHT, WALL_THICKNESS + DOOR_GAP_EXIT), wallMaterial);
  wallLeft1.castShadow = true;
  wallLeft1.receiveShadow = true;
  wallLeft1.position.set(WALL_THICKNESS / 2, WALL_HEIGHT / 2, (WALL_THICKNESS + DOOR_GAP_EXIT) / 2);
  scene.add(wallLeft1);
  var doorFrameVertical = new THREE.Mesh(new THREE.BoxGeometry(WALL_THICKNESS, WALL_HEIGHT - DOOR_HEIGHT, DOOR_WIDTH_EXIT), wallMaterial);
  doorFrameVertical.castShadow = true;
  doorFrameVertical.receiveShadow = true;
  doorFrameVertical.position.set(WALL_THICKNESS / 2, (WALL_HEIGHT + DOOR_HEIGHT) / 2, WALL_THICKNESS + DOOR_GAP_EXIT + DOOR_WIDTH_EXIT / 2);
  scene.add(doorFrameVertical);
  var wallLeft2 = new THREE.Mesh(new THREE.BoxGeometry(WALL_THICKNESS, WALL_HEIGHT, WALL_LENGTH_LONG - WALL_THICKNESS - DOOR_GAP_EXIT - DOOR_WIDTH_EXIT), wallMaterial);
  wallLeft2.castShadow = true;
  wallLeft2.receiveShadow = true;
  wallLeft2.position.set(WALL_THICKNESS / 2, WALL_HEIGHT / 2, (WALL_LENGTH_LONG + DOOR_WIDTH_EXIT + WALL_THICKNESS + DOOR_GAP_EXIT) / 2);
  scene.add(wallLeft2);
  var wallRight = new THREE.Mesh(wallVerticalSide, wallMaterial);
  wallRight.castShadow = true;
  wallRight.receiveShadow = true;
  wallRight.position.set(WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2.5, WALL_HEIGHT / 2, WALL_LENGTH_LONG / 2);
  scene.add(wallRight);
  var wallUpLeft = new THREE.Mesh(wallHorizontal, wallMaterial);
  wallUpLeft.castShadow = true;
  wallUpLeft.receiveShadow = true;
  wallUpLeft.position.set(WALL_LENGTH_LONG / 2 + WALL_THICKNESS, WALL_HEIGHT / 2, WALL_THICKNESS / 2);
  scene.add(wallUpLeft);
  var wallUpRight = new THREE.Mesh(wallHorizontal, wallMaterial);
  wallUpRight.castShadow = true;
  wallUpRight.receiveShadow = true;
  wallUpRight.position.set(WALL_LENGTH_LONG * 1.5 + WALL_THICKNESS * 2, WALL_HEIGHT / 2, WALL_THICKNESS / 2);
  scene.add(wallUpRight);
  var wallDownLeft = new THREE.Mesh(wallHorizontal, wallMaterial);
  wallDownLeft.castShadow = true;
  wallDownLeft.receiveShadow = true;
  wallDownLeft.position.set(WALL_LENGTH_LONG / 2 + WALL_THICKNESS, WALL_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(wallDownLeft);
  var wallDownRight1 = new THREE.Mesh(new THREE.BoxGeometry(WALL_LENGTH_LONG - DOOR_WIDTH_ENTRY - DOOR_GAP_ENTRY, WALL_HEIGHT, WALL_THICKNESS), wallMaterial);
  wallDownRight1.castShadow = true;
  wallDownRight1.receiveShadow = true;
  wallDownRight1.position.set((WALL_LENGTH_LONG - DOOR_WIDTH_ENTRY - DOOR_GAP_ENTRY) / 2 + WALL_LENGTH_LONG + WALL_THICKNESS * 2, WALL_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(wallDownRight1);
  var doorFrameHorizontal = new THREE.Mesh(new THREE.BoxGeometry(DOOR_WIDTH_ENTRY, WALL_HEIGHT - DOOR_HEIGHT, WALL_THICKNESS), wallMaterial);
  doorFrameHorizontal.castShadow = true;
  doorFrameHorizontal.receiveShadow = true;
  doorFrameHorizontal.position.set(WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - DOOR_GAP_ENTRY - DOOR_WIDTH_ENTRY / 2, (WALL_HEIGHT + DOOR_HEIGHT) / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(doorFrameHorizontal);
  var wallDownRight2 = new THREE.Mesh(new THREE.BoxGeometry(DOOR_GAP_ENTRY, WALL_HEIGHT, WALL_THICKNESS), wallMaterial);
  wallDownRight2.castShadow = true;
  wallDownRight2.receiveShadow = true;
  wallDownRight2.position.set(WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - DOOR_GAP_ENTRY / 2, WALL_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(wallDownRight2);
  var wallMiddleUp = new THREE.Mesh(new THREE.BoxGeometry(WALL_THICKNESS, WALL_HEIGHT, WALL_LENGTH_SHORT_1), wallMaterial);
  wallMiddleUp.castShadow = true;
  wallMiddleUp.receiveShadow = true;
  wallMiddleUp.position.set(WALL_LENGTH_LONG + WALL_THICKNESS * 1.5, WALL_HEIGHT / 2, WALL_LENGTH_SHORT_1 / 2);
  scene.add(wallMiddleUp);
  var wallMiddleDown = new THREE.Mesh(new THREE.BoxGeometry(WALL_THICKNESS, WALL_HEIGHT, WALL_LENGTH_SHORT_2), wallMaterial);
  wallMiddleDown.castShadow = true;
  wallMiddleDown.receiveShadow = true;
  wallMiddleDown.position.set(WALL_LENGTH_LONG + WALL_THICKNESS * 1.5, WALL_HEIGHT / 2, WALL_LENGTH_LONG - WALL_LENGTH_SHORT_2 / 2);
  scene.add(wallMiddleDown); /////////////////////////507房间

  var wallSecondaryUp = new THREE.Mesh(wallHorizontal, wallMaterial);
  wallSecondaryUp.castShadow = true;
  wallSecondaryUp.receiveShadow = true;
  wallSecondaryUp.position.set(WALL_LENGTH_LONG / -2, WALL_HEIGHT / 2, WALL_THICKNESS / 2);
  scene.add(wallSecondaryUp);
  var wallSecondaryLeft = new THREE.Mesh(wallVerticalSide, wallMaterial);
  wallSecondaryLeft.castShadow = true;
  wallSecondaryLeft.receiveShadow = true;
  wallSecondaryLeft.position.set(-WALL_LENGTH_LONG - WALL_THICKNESS / 2, WALL_HEIGHT / 2, WALL_LENGTH_LONG / 2);
  scene.add(wallSecondaryLeft);
  var wallSecondaryDown1 = new THREE.Mesh(new THREE.BoxGeometry(DOOR_GAP_SECONDARY, WALL_HEIGHT, WALL_THICKNESS), wallMaterial);
  wallSecondaryDown1.castShadow = true;
  wallSecondaryDown1.receiveShadow = true;
  wallSecondaryDown1.position.set(DOOR_GAP_SECONDARY / 2 - WALL_LENGTH_LONG, WALL_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(wallSecondaryDown1);
  var doorFrameSecondary = new THREE.Mesh(new THREE.BoxGeometry(DOOR_WIDTH_SECONDARY, WALL_HEIGHT - DOOR_HEIGHT, WALL_THICKNESS), wallMaterial);
  doorFrameSecondary.castShadow = true;
  doorFrameSecondary.receiveShadow = true;
  doorFrameSecondary.position.set(DOOR_GAP_SECONDARY + DOOR_WIDTH_SECONDARY / 2 - WALL_LENGTH_LONG, (WALL_HEIGHT + DOOR_HEIGHT) / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(doorFrameSecondary);
  var wallSecondaryDown2 = new THREE.Mesh(new THREE.BoxGeometry(WALL_LENGTH_LONG - DOOR_GAP_SECONDARY - DOOR_WIDTH_SECONDARY, WALL_HEIGHT, WALL_THICKNESS), wallMaterial);
  wallSecondaryDown2.castShadow = true;
  wallSecondaryDown2.receiveShadow = true;
  wallSecondaryDown2.position.set((WALL_LENGTH_LONG - DOOR_GAP_SECONDARY - DOOR_WIDTH_SECONDARY) / -2, WALL_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(wallSecondaryDown2);
}

function initDoors() {
  var doorMaterial = new THREE.MeshLambertMaterial({
    color: 0x1874CD,
    opacity: DOOR_OPACITY,
    transparent: true,
    depthWrite: false
  });
  var doorEntry = new THREE.Mesh(new THREE.BoxGeometry(DOOR_WIDTH_ENTRY, DOOR_HEIGHT, DOOR_THICKNESS), doorMaterial);
  doorEntry.name = "door-entry";
  doorEntry.castShadow = true;
  doorEntry.renderOrder = 1;
  doorEntry.position.set(WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - DOOR_GAP_ENTRY - DOOR_WIDTH_ENTRY / 2, DOOR_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(doorEntry);
  addAnimation({
    meshObject: doorEntry,
    name: "door-entry-action",
    timeArray: [0, 0.5, 1],
    frames: [{
      property: "door-entry.rotation[y]",
      values: [0, Math.PI / -4, Math.PI / -2]
    }, {
      property: "door-entry.position",
      values: [WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - DOOR_GAP_ENTRY - DOOR_WIDTH_ENTRY / 2, DOOR_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2, WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - DOOR_GAP_ENTRY - DOOR_WIDTH_ENTRY / 2 / Math.sqrt(2), DOOR_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2 - DOOR_WIDTH_ENTRY / 2 / Math.sqrt(2), WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - DOOR_GAP_ENTRY - DOOR_THICKNESS / 2, DOOR_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2 - DOOR_WIDTH_ENTRY / 2]
    }],
    loop: THREE.LoopPingPong,
    loopCount: 2,
    loopCallback: function loopCallback(e) {
      e.action.paused = true;
    }
  });
  doorEntry.on('click', function () {
    switchAnimating("door-entry-action");
  });
  var doorExit = new THREE.Mesh(new THREE.BoxGeometry(DOOR_THICKNESS, DOOR_HEIGHT, DOOR_WIDTH_EXIT), doorMaterial);
  doorExit.name = "door-exit";
  doorExit.castShadow = true;
  doorExit.renderOrder = 1;
  doorExit.position.set(WALL_THICKNESS / 2, DOOR_HEIGHT / 2, WALL_THICKNESS + DOOR_GAP_EXIT + DOOR_WIDTH_EXIT / 2);
  scene.add(doorExit);
  addAnimation({
    meshObject: doorExit,
    name: "door-exit-action",
    timeArray: [0, 0.5, 1],
    frames: [{
      property: "door-exit.rotation[y]",
      values: [0, Math.PI / -4, Math.PI / -2]
    }, {
      property: "door-exit.position",
      values: [WALL_THICKNESS / 2, DOOR_HEIGHT / 2, WALL_THICKNESS + DOOR_GAP_EXIT + DOOR_WIDTH_EXIT / 2, WALL_THICKNESS / 2 + DOOR_WIDTH_EXIT / 2 / Math.sqrt(2), DOOR_HEIGHT / 2, WALL_THICKNESS + DOOR_GAP_EXIT + DOOR_WIDTH_EXIT - DOOR_WIDTH_EXIT / 2 / Math.sqrt(2), WALL_THICKNESS / 2 + DOOR_WIDTH_EXIT / 2, DOOR_HEIGHT / 2, WALL_THICKNESS + DOOR_GAP_EXIT + DOOR_WIDTH_EXIT - DOOR_THICKNESS / 2]
    }],
    loop: THREE.LoopPingPong,
    loopCount: 2,
    loopCallback: function loopCallback(e) {
      e.action.paused = true;
    }
  });
  doorExit.on('click', function () {
    switchAnimating("door-exit-action");
  });
  var doorSecondary = new THREE.Mesh(new THREE.BoxGeometry(DOOR_WIDTH_SECONDARY, DOOR_HEIGHT, DOOR_THICKNESS), doorMaterial);
  doorSecondary.name = "door-secondary";
  doorSecondary.castShadow = true;
  doorSecondary.renderOrder = 1;
  doorSecondary.position.set(DOOR_GAP_SECONDARY + DOOR_WIDTH_SECONDARY / 2 - WALL_LENGTH_LONG, DOOR_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2);
  scene.add(doorSecondary);
  addAnimation({
    meshObject: doorSecondary,
    name: "door-secondary-action",
    timeArray: [0, 0.5, 1],
    frames: [{
      property: "door-secondary.rotation[y]",
      values: [0, Math.PI / 4, Math.PI / 2]
    }, {
      property: "door-secondary.position",
      values: [DOOR_GAP_SECONDARY + DOOR_WIDTH_SECONDARY / 2 - WALL_LENGTH_LONG, DOOR_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2, DOOR_GAP_SECONDARY + DOOR_WIDTH_SECONDARY / 2 / Math.sqrt(2) - WALL_LENGTH_LONG, DOOR_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2 - DOOR_WIDTH_SECONDARY / 2 / Math.sqrt(2), DOOR_GAP_SECONDARY + DOOR_THICKNESS / 2 - WALL_LENGTH_LONG, DOOR_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS / 2 - DOOR_WIDTH_SECONDARY / 2]
    }],
    loop: THREE.LoopPingPong,
    loopCount: 2,
    loopCallback: function loopCallback(e) {
      e.action.paused = true;
    }
  });
  doorSecondary.on('click', function () {
    switchAnimating("door-secondary-action");
  });
}

function initShowBoards() {
  var boardUpLeft = new ShowBoard({
    length: BOARD_LENGTH_UP,
    boardImg: 'img/showBoard/show_board_1.jpg'
  });
  boardUpLeft.position.set(BOARD_GAP_UP + BOARD_LENGTH_UP / 2 + WALL_THICKNESS, BOARD_ALTITUDE + BOARD_HEIGHT / 2, WALL_THICKNESS + BOARD_THICKNESS / 2);
  scene.add(boardUpLeft);
  var boardUpRight = new ShowBoard({
    length: BOARD_LENGTH_UP,
    boardImg: 'img/showBoard/show_board_2.png'
  });
  boardUpRight.position.set(BOARD_GAP_UP + BOARD_LENGTH_UP * 1.5 + WALL_THICKNESS + BOARD_INTERVAL_UP, BOARD_ALTITUDE + BOARD_HEIGHT / 2, WALL_THICKNESS + BOARD_THICKNESS / 2);
  scene.add(boardUpRight);
  var boardDownLeft = new ShowBoard({
    length: BOARD_LENGTH_DOWN,
    boardImg: 'img/showBoard/show_board_3.png'
  });
  boardDownLeft.position.set(WALL_LENGTH_LONG + WALL_THICKNESS * 2 + BOARD_GAP_DOWN + BOARD_LENGTH_DOWN / 2, BOARD_ALTITUDE + BOARD_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - BOARD_THICKNESS / 2);
  boardDownLeft.rotation.y = Math.PI;
  scene.add(boardDownLeft);
  var boardDownRight = new ShowBoard({
    length: BOARD_LENGTH_DOWN,
    boardImg: 'img/showBoard/show_board_4.png'
  });
  boardDownRight.position.set(WALL_LENGTH_LONG + WALL_THICKNESS * 2 + BOARD_GAP_DOWN + BOARD_LENGTH_DOWN * 1.5 + BOARD_INTERVAL_DOWN, BOARD_ALTITUDE + BOARD_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - BOARD_THICKNESS / 2);
  boardDownRight.rotation.y = Math.PI;
  scene.add(boardDownRight);
  var boardRight = new ShowBoard({
    length: BOARD_LENGTH_VERTICAL,
    boardImg: 'img/showBoard/show_board_5.png'
  });
  boardRight.position.set(WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - BOARD_THICKNESS / 2, BOARD_ALTITUDE + BOARD_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - BOARD_GAP_VERTICAL - BOARD_LENGTH_VERTICAL / 2);
  boardRight.rotation.y = Math.PI / -2;
  scene.add(boardRight); ///////////////////////507

  var boardSecondaryRight = new ShowBoard({
    length: BOARD_LENGTH_SECONDARY,
    height: BOARD_HEIGHT_SECONDARY,
    marginX: 0.5
  });
  boardSecondaryRight.position.set(-BOARD_THICKNESS / 2, BOARD_ALTITUDE + BOARD_HEIGHT_SECONDARY / 2, WALL_THICKNESS + DOOR_GAP_EXIT + DOOR_WIDTH_EXIT + BOARD_GAP_SECONDARY_RIGHT + BOARD_LENGTH_SECONDARY / 2);
  boardSecondaryRight.rotation.y = Math.PI / -2;
  scene.add(boardSecondaryRight);
  var boardSecondaryDownRight = new ShowBoard({
    length: BOARD_LENGTH_SECONDARY,
    height: BOARD_HEIGHT_SECONDARY,
    marginX: 0.5
  });
  boardSecondaryDownRight.position.set(-BOARD_GAP_SECONDARY_DOWN - BOARD_LENGTH_SECONDARY / 2, BOARD_ALTITUDE + BOARD_HEIGHT_SECONDARY / 2, WALL_LENGTH_LONG - WALL_THICKNESS - BOARD_THICKNESS / 2);
  boardSecondaryDownRight.rotation.y = Math.PI;
  scene.add(boardSecondaryDownRight);
  var tvRight = new ShowBoard({
    length: BOARD_LENGTH_SECONDARY,
    height: TV_HEIGHT,
    boardImg: 'none'
  });
  tvRight.position.set(-BOARD_GAP_SECONDARY_DOWN - BOARD_INTERVAL_SECONDARY - BOARD_LENGTH_SECONDARY * 1.5, BOARD_ALTITUDE + TV_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - BOARD_THICKNESS / 2);
  tvRight.rotation.y = Math.PI;
  scene.add(tvRight);
  var tvLeft = new ShowBoard({
    length: BOARD_LENGTH_SECONDARY,
    height: TV_HEIGHT,
    boardImg: 'none'
  });
  tvLeft.position.set(-BOARD_GAP_SECONDARY_DOWN - BOARD_INTERVAL_SECONDARY * 2 - BOARD_LENGTH_SECONDARY * 2.5, BOARD_ALTITUDE + TV_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - BOARD_THICKNESS / 2);
  tvLeft.rotation.y = Math.PI;
  scene.add(tvLeft);
  var boardSecondaryDownLeft = new ShowBoard({
    length: BOARD_LENGTH_SECONDARY,
    height: BOARD_HEIGHT_SECONDARY,
    marginX: 0.5
  });
  boardSecondaryDownLeft.position.set(-BOARD_GAP_SECONDARY_DOWN - BOARD_INTERVAL_SECONDARY * 3 - BOARD_LENGTH_SECONDARY * 3.5, BOARD_ALTITUDE + BOARD_HEIGHT_SECONDARY / 2, WALL_LENGTH_LONG - WALL_THICKNESS - BOARD_THICKNESS / 2);
  boardSecondaryDownLeft.rotation.y = Math.PI;
  scene.add(boardSecondaryDownLeft);
  var boardSecondaryLeft = new ShowBoard({
    length: BOARD_LENGTH_SECONDARY,
    height: BOARD_HEIGHT_SECONDARY,
    marginX: 0.5
  });
  boardSecondaryLeft.position.set(BOARD_THICKNESS / 2 - WALL_LENGTH_LONG, BOARD_ALTITUDE + BOARD_HEIGHT_SECONDARY / 2, WALL_THICKNESS + BOARD_GAP_SECONDARY_LEFT + BOARD_LENGTH_SECONDARY / 2);
  boardSecondaryLeft.rotation.y = Math.PI / 2;
  scene.add(boardSecondaryLeft);
  var boardSecondaryUp = new ShowBoard({
    length: BOARD_LENGTH_SECONDARY,
    height: BOARD_HEIGHT_SECONDARY,
    marginX: 0.5
  });
  boardSecondaryUp.position.set(-WALL_LENGTH_LONG / 2, BOARD_ALTITUDE + BOARD_HEIGHT_SECONDARY / 2, WALL_THICKNESS + BOARD_THICKNESS / 2);
  scene.add(boardSecondaryUp);
} // 1 - 需求响应规约测试区域


function initArea1() {
  var area1BoardCenterX = WALL_LENGTH_LONG + WALL_THICKNESS * 2 + BOARD_GAP_DOWN + BOARD_LENGTH_DOWN * 1.5 + BOARD_INTERVAL_DOWN;
  var desk = new Desk({
    length: AREA_1_DESK_LENGTH,
    height: AREA_1_DESK_HEIGHT,
    width: AREA_1_DESK_WIDTH
  });
  desk.position.set(area1BoardCenterX, AREA_1_DESK_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_1_DESK_GAP - AREA_1_DESK_WIDTH / 2);
  scene.add(desk);
  var computer = new Computer({
    length: PC_LENGTH,
    width: PC_WIDTH,
    height: PC_HEIGHT
  });
  computer.position.set(area1BoardCenterX, AREA_1_DESK_HEIGHT + FLOOR_THICKNESS + PC_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_1_DESK_GAP - AREA_1_DESK_WIDTH + AREA_1_PC_MARGIN + PC_WIDTH / 2);
  computer.rotation.y = Math.PI;
  scene.add(computer); // 终端

  var device1 = new THREE.Mesh(new THREE.BoxGeometry(DEVICE_LENGTH, DEVICE_HEIGHT, DEVICE_WIDTH), new THREE.MeshPhongMaterial({
    color: Colors.Device
  }));
  device1.castShadow = true;
  device1.receiveShadow = true;
  device1.position.set(area1BoardCenterX - AREA_1_DESK_LENGTH / 2 + AREA_1_DEVICE_MARGIN + DEVICE_LENGTH / 2, AREA_1_DESK_HEIGHT + FLOOR_THICKNESS + DEVICE_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_1_DESK_GAP - AREA_1_DEVICE_MARGIN - DEVICE_WIDTH / 2);
  scene.add(device1);
  var device2 = device1.clone();
  device2.position.x += DEVICE_LENGTH + AREA_1_DEVICE_INTERVAL;
  scene.add(device2);
  var device3 = device2.clone();
  device3.position.x += DEVICE_LENGTH + AREA_1_DEVICE_INTERVAL;
  scene.add(device3);
  var device4 = device1.clone();
  device4.position.z -= DEVICE_WIDTH + AREA_1_DEVICE_INTERVAL;
  scene.add(device4);
  var device5 = device4.clone();
  device5.position.x += DEVICE_LENGTH + AREA_1_DEVICE_INTERVAL;
  scene.add(device5); // 提示文字 - 终端

  var hintDevice = new Hint({
    text: '需求响应终端',
    wordInOneLine: 3
  });
  hintDevice.bindTo([device3, device2, device1, device4, device5]);
  scene.add(hintDevice); // 适配器

  var adapter1 = new THREE.Mesh(new THREE.BoxGeometry(ADAPTER_LENGTH, ADAPTER_HEIGHT, ADAPTER_WIDTH), new THREE.MeshPhongMaterial({
    color: 0x243c42
  }));
  adapter1.castShadow = true;
  adapter1.receiveShadow = true;
  adapter1.position.set(area1BoardCenterX + AREA_1_DESK_LENGTH / 2 - AREA_1_DEVICE_MARGIN - ADAPTER_LENGTH / 2, AREA_1_DESK_HEIGHT + FLOOR_THICKNESS + ADAPTER_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_1_DESK_GAP - AREA_1_DEVICE_MARGIN - ADAPTER_WIDTH / 2);
  scene.add(adapter1);
  var adapter2 = adapter1.clone();
  adapter2.position.x -= ADAPTER_LENGTH + AREA_1_DEVICE_INTERVAL;
  scene.add(adapter2);
  var adapter3 = adapter2.clone();
  adapter3.position.x -= ADAPTER_LENGTH + AREA_1_DEVICE_INTERVAL;
  scene.add(adapter3);
  var adapter4 = adapter1.clone();
  adapter4.position.z -= ADAPTER_WIDTH + AREA_1_DEVICE_INTERVAL;
  scene.add(adapter4);
  var adapter5 = adapter4.clone();
  adapter5.position.x -= ADAPTER_LENGTH + AREA_1_DEVICE_INTERVAL;
  scene.add(adapter5); // 提示文字 - 终端

  var hintAdapter = new Hint({
    text: '通信适配器',
    wordInOneLine: 5,
    hintMargin: 2
  });
  hintAdapter.bindTo([adapter3, adapter2, adapter1, adapter4, adapter5]);
  scene.add(hintAdapter);
} // 2 - OpenADR测试区域


function initArea2() {
  var area2BoardCenterX = WALL_LENGTH_LONG + WALL_THICKNESS * 2 + BOARD_GAP_DOWN + BOARD_LENGTH_DOWN / 2;
  var desk = new Desk({
    length: AREA_2_DESK_LENGTH,
    height: AREA_2_DESK_HEIGHT,
    width: AREA_2_DESK_WIDTH
  });
  desk.position.set(area2BoardCenterX, AREA_2_DESK_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_2_DESK_GAP - AREA_2_DESK_WIDTH / 2);
  scene.add(desk);
  var computer = new Computer({
    length: PC_LENGTH,
    width: PC_WIDTH,
    height: PC_HEIGHT
  });
  computer.position.set(area2BoardCenterX, AREA_2_DESK_HEIGHT + FLOOR_THICKNESS + PC_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_2_DESK_GAP - AREA_2_DESK_WIDTH + AREA_2_PC_MARGIN + PC_WIDTH / 2);
  computer.rotation.y = Math.PI;
  scene.add(computer); // 终端

  var deviceInterval = (AREA_2_DESK_LENGTH - DEVICE_LENGTH * 5) / 5;
  var device = new THREE.Mesh(new THREE.BoxGeometry(DEVICE_LENGTH, DEVICE_HEIGHT, DEVICE_WIDTH), new THREE.MeshPhongMaterial({
    color: Colors.Device
  }));
  device.castShadow = true;
  device.receiveShadow = true;
  device.position.set(area2BoardCenterX - (AREA_2_DESK_LENGTH - deviceInterval - DEVICE_LENGTH) / 2, AREA_2_DESK_HEIGHT + FLOOR_THICKNESS + DEVICE_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_2_DESK_GAP - deviceInterval / 2 - DEVICE_WIDTH / 2);
  scene.add(device); // 复制4份

  var deviceArray = [device];

  for (var i = 1; i <= 4; i++) {
    var deviceCopy = device.clone();
    deviceCopy.position.x += i * (deviceInterval + DEVICE_LENGTH);
    scene.add(deviceCopy);
    deviceArray.push(deviceCopy);
  } // 提示文字 - 终端


  var hintDevice = new Hint({
    text: '需求响应终端',
    wordInOneLine: 3
  });
  hintDevice.bindTo(deviceArray);
  scene.add(hintDevice);
} // 3 - 蓄冷蓄热仿真设备


function initArea3() {
  var textureLoader = new THREE.TextureLoader();
  var textureBarrel = textureLoader.load('img/texture/texture_barrel.jpg');
  textureBarrel.wrapS = textureBarrel.wrapT = THREE.RepeatWrapping;
  textureBarrel.offset.set(0.5, 0);
  textureBarrel.repeat.set(1, 2);
  var barrelMaterial = new THREE.MeshPhongMaterial({
    map: textureBarrel
  }); // 热桶

  var heatBarrel = new THREE.Mesh(new THREE.CylinderGeometry(AREA_3_BARREL_RADIUS, AREA_3_BARREL_RADIUS, AREA_3_BARREL_HEIGHT, 32), barrelMaterial);
  heatBarrel.castShadow = true;
  heatBarrel.receiveShadow = true;
  heatBarrel.position.set(WALL_LENGTH_LONG + WALL_THICKNESS * 2 + AREA_3_HEAT_BARREL_GAP_HORIZONTAL + AREA_3_BARREL_RADIUS, AREA_3_BARREL_HEIGHT / 2 + FLOOR_THICKNESS, WALL_THICKNESS + AREA_3_BARREL_GAP_VERTICAL + AREA_3_BARREL_RADIUS);
  scene.add(heatBarrel); // 冰桶

  var iceBarrel = heatBarrel.clone();
  iceBarrel.position.x = WALL_LENGTH_LONG * 2 + WALL_THICKNESS * 2 - AREA_3_ICE_BARREL_GAP_HORIZONTAL - AREA_3_BARREL_RADIUS;
  scene.add(iceBarrel); // 机器

  var textureMachine = textureLoader.load('img/texture/texture_machine.jpg');
  var machineMaterial = new THREE.MeshPhongMaterial({
    color: 0x576a66
  });
  var materialsMachine = [machineMaterial, machineMaterial, machineMaterial, machineMaterial, new THREE.MeshPhongMaterial({
    map: textureMachine
  }), machineMaterial];
  var machine = new THREE.Mesh(new THREE.BoxGeometry(AREA_3_MACHINE_LENGTH, AREA_3_MACHINE_HEIGHT, AREA_3_MACHINE_WIDTH), materialsMachine);
  machine.castShadow = true;
  machine.receiveShadow = true;
  machine.position.set(WALL_LENGTH_LONG * 1.5 + WALL_THICKNESS * 2, AREA_3_MACHINE_HEIGHT / 2 + FLOOR_THICKNESS, WALL_THICKNESS + AREA_3_BARREL_GAP_VERTICAL + AREA_3_BARREL_RADIUS);
  scene.add(machine); // 导管

  var tube = new THREE.Mesh(new THREE.CylinderGeometry(AREA_3_TUBE_RADIUS, AREA_3_TUBE_RADIUS, WALL_LENGTH_LONG - AREA_3_HEAT_BARREL_GAP_HORIZONTAL - AREA_3_ICE_BARREL_GAP_HORIZONTAL - AREA_3_BARREL_RADIUS * 2, 20), new THREE.MeshPhongMaterial({
    color: 0xbebebe
  }));
  tube.castShadow = true;
  tube.receiveShadow = true;
  tube.rotation.z = Math.PI / 2;
  tube.position.set(WALL_LENGTH_LONG * 1.5 + WALL_THICKNESS * 2, AREA_3_TUBE_ALTITUDE + AREA_3_TUBE_RADIUS / 2, WALL_THICKNESS + AREA_3_BARREL_GAP_VERTICAL + AREA_3_BARREL_RADIUS);
  scene.add(tube);
} // 4 - 可调负载区域


function initArea4() {
  var texture = new THREE.TextureLoader().load('img/texture/texture_rlc.jpg');
  var phoneMaterial = new THREE.MeshPhongMaterial({
    color: 0x919da4
  });
  var materials = [phoneMaterial, phoneMaterial, phoneMaterial, phoneMaterial, phoneMaterial, new THREE.MeshPhongMaterial({
    map: texture
  })];
  var cabinet = new THREE.Mesh(new THREE.BoxGeometry(AREA_4_CABINET_LENGTH, AREA_4_CABINET_HEIGHT, AREA_4_CABINET_WIDTH), materials);
  cabinet.castShadow = true;
  cabinet.receiveShadow = true;
  cabinet.position.set(WALL_LENGTH_LONG + WALL_THICKNESS * 2 + AREA_4_CABINET_GAP_HORIZONTAL + AREA_4_CABINET_LENGTH / 2, AREA_4_CABINET_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_4_CABINET_GAP_VERTICAL - AREA_4_CABINET_WIDTH / 2);
  scene.add(cabinet);
} // 5 - 系统仿真展示区域


function initArea5() {
  // 工作台
  var deskCenterX = BOARD_GAP_UP + BOARD_LENGTH_UP * 1.5 + WALL_THICKNESS + BOARD_INTERVAL_UP;
  var desk = new Desk({
    length: AREA_5_DESK_LENGTH,
    height: AREA_5_DESK_HEIGHT,
    width: AREA_5_DESK_WIDTH
  });
  desk.position.set(deskCenterX, AREA_5_DESK_HEIGHT / 2 + FLOOR_THICKNESS, WALL_THICKNESS + AREA_5_DESK_GAP + AREA_5_DESK_WIDTH / 2);
  scene.add(desk); // 电脑

  var computerInterval = (AREA_5_DESK_LENGTH - PC_LENGTH) / 4;
  var computer1 = new Computer({
    length: PC_LENGTH,
    width: PC_WIDTH,
    height: PC_HEIGHT
  });
  computer1.position.set(deskCenterX - computerInterval - PC_LENGTH / 2, AREA_5_DESK_HEIGHT + FLOOR_THICKNESS + PC_HEIGHT / 2, WALL_THICKNESS + AREA_5_DESK_GAP + AREA_5_DESK_WIDTH / 2);
  scene.add(computer1);
  var computer2 = computer1.clone();
  computer2.position.x = deskCenterX + computerInterval + PC_LENGTH / 2;
  scene.add(computer2);
} // 6 - 电能表走字检测区域


function initArea6() {
  // 实验台
  var workbench = new WorkBench({
    length: AREA_6_WORKBENCH_LENGTH,
    height: AREA_6_WORKBENCH_HEIGHT,
    width: AREA_6_WORKBENCH_WIDTH
  });
  workbench.position.set(WALL_LENGTH_LONG + WALL_THICKNESS - AREA_6_WORKBENCH_GAP_HORIZONTAL - AREA_6_WORKBENCH_LENGTH / 2, AREA_6_WORKBENCH_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_6_WORKBENCH_GAP_VERTICAL - AREA_6_WORKBENCH_WIDTH / 2);
  workbench.rotation.y = Math.PI;
  scene.add(workbench); // 展柜

  var showcase = new Showcase({
    length: AREA_6_WORKBENCH_LENGTH - AREA_6_SHOWCASE_MARGIN * 2,
    height: AREA_6_SHOWCASE_HEIGHT,
    width: AREA_6_WORKBENCH_WIDTH - AREA_6_SHOWCASE_MARGIN * 2
  });
  showcase.position.set(WALL_LENGTH_LONG + WALL_THICKNESS - AREA_6_WORKBENCH_GAP_HORIZONTAL - AREA_6_WORKBENCH_LENGTH / 2, AREA_6_WORKBENCH_HEIGHT + AREA_6_SHOWCASE_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_6_WORKBENCH_GAP_VERTICAL - AREA_6_WORKBENCH_WIDTH / 2);
  showcase.rotation.y = Math.PI;
  scene.add(showcase); // 机柜

  var cabinetMaterial = new THREE.MeshPhongMaterial({
    color: 0xcccccc
  });
  var materials = [cabinetMaterial, cabinetMaterial, cabinetMaterial, cabinetMaterial, cabinetMaterial, new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('img/texture/texture_pressure.jpg')
  })];
  var cabinet = new THREE.Mesh(new THREE.BoxGeometry(AREA_6_CABINET_LENGTH, AREA_6_CABINET_HEIGHT, AREA_6_CABINET_WIDTH), materials);
  cabinet.castShadow = true;
  cabinet.receiveShadow = true;
  cabinet.position.set(WALL_LENGTH_LONG + WALL_THICKNESS - AREA_6_CABINET_GAP_HORIZONTAL - AREA_6_CABINET_LENGTH / 2, AREA_6_CABINET_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_6_CABINET_GAP_VERTICAL - AREA_6_CABINET_WIDTH / 2);
  scene.add(cabinet); // 工作台

  var desk = new Desk({
    length: AREA_6_DESK_LENGTH,
    height: AREA_6_DESK_HEIGHT,
    width: AREA_6_DESK_WIDTH
  });
  desk.position.set(WALL_LENGTH_LONG + WALL_THICKNESS - AREA_6_DESK_GAP_HORIZONTAL - AREA_6_DESK_LENGTH / 2, AREA_6_DESK_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_6_DESK_GAP_VERTICAL - AREA_6_DESK_WIDTH / 2);
  scene.add(desk); // 电脑

  var computer = new Computer({
    length: PC_LENGTH,
    width: PC_WIDTH,
    height: PC_HEIGHT
  });
  computer.position.set(WALL_LENGTH_LONG + WALL_THICKNESS - AREA_6_DESK_GAP_HORIZONTAL - AREA_6_DESK_LENGTH / 2, AREA_6_DESK_HEIGHT + FLOOR_THICKNESS + PC_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_6_DESK_GAP_VERTICAL - AREA_6_DESK_WIDTH / 2);
  computer.rotation.y = Math.PI;
  scene.add(computer);
} // 7 - 计量通讯入网检测区域


function initArea7() {
  var workbench = new WorkBench({
    length: AREA_7_WORKBENCH_LENGTH,
    height: AREA_7_WORKBENCH_HEIGHT,
    width: AREA_7_WORKBENCH_WIDTH
  });
  workbench.position.set(WALL_THICKNESS + AREA_7_WORKBENCH_GAP_HORIZONTAL + AREA_7_WORKBENCH_LENGTH / 2, AREA_7_WORKBENCH_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_7_WORKBENCH_GAP_VERTICAL - AREA_7_WORKBENCH_WIDTH / 2);
  workbench.rotation.y = Math.PI;
  scene.add(workbench);
  var showcase = new Showcase({
    length: AREA_7_WORKBENCH_LENGTH - AREA_7_SHOWCASE_MARGIN * 2,
    height: AREA_7_SHOWCASE_HEIGHT,
    width: AREA_7_WORKBENCH_WIDTH - AREA_7_SHOWCASE_MARGIN * 2
  });
  showcase.position.set(WALL_THICKNESS + AREA_7_WORKBENCH_GAP_HORIZONTAL + AREA_7_WORKBENCH_LENGTH / 2, AREA_7_SHOWCASE_HEIGHT / 2 + AREA_7_WORKBENCH_HEIGHT + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_7_WORKBENCH_GAP_VERTICAL - AREA_7_WORKBENCH_WIDTH / 2);
  showcase.rotation.y = Math.PI;
  scene.add(showcase);
} // 8 - 柯子岭电表设备


function initArea8() {
  var workbench = new WorkBench({
    length: AREA_8_WORKBENCH_LENGTH,
    height: AREA_8_WORKBENCH_HEIGHT,
    width: AREA_8_WORKBENCH_WIDTH
  });
  workbench.position.set(BOARD_GAP_UP + BOARD_LENGTH_UP / 2 + WALL_THICKNESS, AREA_8_WORKBENCH_HEIGHT / 2 + FLOOR_THICKNESS, WALL_THICKNESS + AREA_8_WORKBENCH_GAP + AREA_8_WORKBENCH_WIDTH / 2);
  scene.add(workbench); // 电脑

  var computer = new Computer({
    length: AREA_8_PC_LENGTH,
    width: AREA_8_PC_WIDTH,
    height: AREA_8_PC_HEIGHT
  });
  computer.position.set(BOARD_GAP_UP + BOARD_LENGTH_UP / 2 + WALL_THICKNESS, AREA_8_WORKBENCH_HEIGHT + FLOOR_THICKNESS + AREA_8_PC_HEIGHT / 2, WALL_THICKNESS + AREA_8_WORKBENCH_GAP + AREA_8_WORKBENCH_WIDTH / 2);
  scene.add(computer);
} // 9 - 充电桩测试区域


function initArea9() {
  // 机柜
  var textureLoader = new THREE.TextureLoader();
  var phongMaterialAC = new THREE.MeshPhongMaterial({
    color: 0xe2e4e2
  });
  var materialsAC = [new THREE.MeshPhongMaterial({
    map: textureLoader.load('img/texture/texture_ac.jpg')
  }), phongMaterialAC, phongMaterialAC, phongMaterialAC, phongMaterialAC, phongMaterialAC];
  var cabinetAC = new THREE.Mesh(new THREE.BoxGeometry(AREA_9_CABINET_AC_LENGTH, AREA_9_CABINET_AC_HEIGHT, AREA_9_CABINET_AC_WIDTH), materialsAC);
  cabinetAC.castShadow = true;
  cabinetAC.receiveShadow = true;
  cabinetAC.position.set(WALL_THICKNESS + AREA_9_CABINET_GAP_HORIZONTAL + AREA_9_CABINET_AC_LENGTH / 2, AREA_9_CABINET_AC_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_9_CABINET_GAP_VERTICAL - AREA_9_CABINET_AC_WIDTH / 2);
  scene.add(cabinetAC);
  var phongMaterialDC = new THREE.MeshPhongMaterial({
    color: 0x9a979f
  });
  var materialsDC = [new THREE.MeshPhongMaterial({
    map: textureLoader.load('img/texture/texture_dc.jpg')
  }), phongMaterialDC, phongMaterialDC, phongMaterialDC, phongMaterialDC, phongMaterialDC];
  var cabinetDC = new THREE.Mesh(new THREE.BoxGeometry(AREA_9_CABINET_DC_WIDTH, AREA_9_CABINET_DC_HEIGHT, AREA_9_CABINET_DC_LENGTH), materialsDC);
  cabinetDC.castShadow = true;
  cabinetDC.receiveShadow = true;
  cabinetDC.position.set(WALL_THICKNESS + AREA_9_CABINET_GAP_HORIZONTAL + AREA_9_CABINET_DC_WIDTH / 2, AREA_9_CABINET_DC_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_9_CABINET_GAP_VERTICAL - AREA_9_CABINET_AC_WIDTH - AREA_9_CABINET_MARGIN - AREA_9_CABINET_DC_LENGTH / 2);
  scene.add(cabinetDC);
} // 10 - 服务器测试区域


function initArea10() {
  var emptyMaterial = new THREE.MeshPhongMaterial({
    color: Colors.dark
  });
  var materials = [new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('img/texture/texture_server.jpg')
  }), emptyMaterial, emptyMaterial, emptyMaterial, emptyMaterial, emptyMaterial]; // 机柜

  var cabinet1 = new THREE.Mesh(new THREE.BoxGeometry(AREA_10_CABINET_LENGTH, AREA_10_CABINET_HEIGHT, AREA_10_CABINET_WIDTH), materials);
  cabinet1.castShadow = true;
  cabinet1.receiveShadow = true;
  cabinet1.position.set(WALL_THICKNESS + AREA_10_CABINET_GAP_HORIZONTAL + AREA_10_CABINET_WIDTH / 2, AREA_10_CABINET_HEIGHT / 2 + FLOOR_THICKNESS, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_10_CABINET_GAP_VERTICAL - AREA_10_CABINET_LENGTH / 2);
  scene.add(cabinet1);
  var cabinet2 = cabinet1.clone();
  cabinet2.position.z -= AREA_10_CABINET_LENGTH + AREA_10_CABINET_MARGIN;
  scene.add(cabinet2);
} // 11 - 507房间直流设备区域


function initArea11() {
  var textureLoader = new THREE.TextureLoader(); // 直流电源柜

  var cabinetTexture = textureLoader.load('img/texture/texture_cabinet_secondary.jpg');
  var cabinetMaterialOther = new THREE.MeshPhongMaterial({
    color: 0xbebdbb
  });
  var cabinetCoordZ = WALL_LENGTH_LONG - WALL_THICKNESS - AREA_11_CABINET_GAP_VERTICAL - AREA_11_CABINET_LENGTH / 2;
  var cabinet = new THREE.Mesh(new THREE.BoxGeometry(AREA_11_CABINET_WIDTH, AREA_11_CABINET_HEIGHT, AREA_11_CABINET_LENGTH), [cabinetMaterialOther, new THREE.MeshPhongMaterial({
    map: cabinetTexture
  }), cabinetMaterialOther, cabinetMaterialOther, cabinetMaterialOther, cabinetMaterialOther]);
  cabinet.castShadow = true;
  cabinet.receiveShadow = true;
  cabinet.position.set(-AREA_11_CABINET_GAP_HORIZONTAL - AREA_11_CABINET_WIDTH / 2, AREA_11_CABINET_HEIGHT / 2, cabinetCoordZ);
  scene.add(cabinet); // 直流空调

  var conditionerTexture = textureLoader.load('img/texture/texture_conditioner_stand.jpg');
  var conditionerMaterialOther = new THREE.MeshPhongMaterial({
    color: 0xe7e8ea
  });
  var conditionerCoordZ = cabinetCoordZ - AREA_11_CABINET_LENGTH / 2 - AREA_11_AC_MARGIN - AREA_11_AC_LENGTH / 2;
  var conditioner = new THREE.Mesh(new THREE.BoxGeometry(AREA_11_AC_WIDTH, AREA_11_AC_HEIGHT, AREA_11_AC_LENGTH), [conditionerMaterialOther, new THREE.MeshPhongMaterial({
    map: conditionerTexture
  }), conditionerMaterialOther, conditionerMaterialOther, conditionerMaterialOther, conditionerMaterialOther]);
  conditioner.castShadow = true;
  conditioner.receiveShadow = true;
  conditioner.position.set(-AREA_11_AC_GAP - AREA_11_AC_WIDTH / 2, AREA_11_AC_HEIGHT / 2, conditionerCoordZ);
  scene.add(conditioner); // 直流冰箱

  var fridgeTexture = textureLoader.load('img/texture/texture_fridge_light.jpg');
  var fridgeMaterialOther = new THREE.MeshPhongMaterial({
    color: 0xdce0e3
  });
  var fridgeCoordZ = conditionerCoordZ - AREA_11_AC_LENGTH / 2 - AREA_11_FRIDGE_MARGIN - AREA_11_FRIDGE_LENGTH / 2;
  var fridge = new THREE.Mesh(new THREE.BoxGeometry(AREA_11_FRIDGE_WIDTH, AREA_11_FRIDGE_HEIGHT, AREA_11_FRIDGE_LENGTH), [fridgeMaterialOther, new THREE.MeshPhongMaterial({
    map: fridgeTexture
  }), fridgeMaterialOther, fridgeMaterialOther, fridgeMaterialOther, fridgeMaterialOther]);
  fridge.castShadow = true;
  fridge.receiveShadow = true;
  fridge.position.set(-AREA_11_FRIDGE_GAP - AREA_11_FRIDGE_WIDTH / 2, AREA_11_FRIDGE_HEIGHT / 2, fridgeCoordZ);
  scene.add(fridge); // 热水器

  var heaterTexture = textureLoader.load('img/texture/texture_heater_stand.jpg');
  var heaterMaterialOther = new THREE.MeshPhongMaterial({
    color: 0xa3a5a4
  });
  var heaterCoordZ = fridgeCoordZ - AREA_11_FRIDGE_LENGTH / 2 - AREA_11_HEATER_MARGIN - AREA_11_HEATER_RADIUS;
  var heater = new THREE.Mesh(new THREE.CylinderGeometry(AREA_11_HEATER_RADIUS, AREA_11_HEATER_RADIUS, AREA_11_HEATER_HEIGHT, 32), [new THREE.MeshPhongMaterial({
    map: heaterTexture
  }), heaterMaterialOther, heaterMaterialOther]);
  heater.rotation.y = Math.PI / 2;
  heater.castShadow = true;
  heater.receiveShadow = true;
  heater.position.set(-AREA_11_HEATER_GAP - AREA_11_HEATER_RADIUS / 2, AREA_11_HEATER_HEIGHT / 2, heaterCoordZ);
  scene.add(heater); // 工作台

  var desk = new Desk({
    length: AREA_11_DESK_LENGTH,
    height: AREA_11_DESK_HEIGHT,
    width: AREA_11_DESK_WIDTH
  });
  desk.position.set(-AREA_11_DESK_GAP_HORIZONTAL - AREA_11_DESK_LENGTH / 2, AREA_11_DESK_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_11_DESK_GAP_VERTICAL - AREA_11_DESK_WIDTH / 2);
  scene.add(desk);
} // 12 - 507房间非侵入式负荷测试区域


function initArea12() {
  var textureLoader = new THREE.TextureLoader(); // 冰箱+空调+热水器组合体

  var group = new THREE.Group();
  var groupCenterX = (AREA_12_FRIDGE_GAP_HORIZONTAL + AREA_12_FRIDGE_WIDTH) / 2;
  var heaterHeight = AREA_12_HEATER_ALTITUDE + AREA_12_HEATER_RADIUS * 2;
  var conditionerHeight = AREA_12_CONDITIONER_ALTITUDE + AREA_12_CONDITIONER_HEIGHT;
  var groupCenterY = (heaterHeight > conditionerHeight ? heaterHeight : conditionerHeight) / 2;
  var groupCenterZ = (AREA_12_CONDITIONER_LENGTH + AREA_12_HEATER_MARGIN + AREA_12_HEATER_LENGTH) / 2; // 冰箱

  var fridgeTexture = textureLoader.load('img/texture/texture_fridge_dark.jpg');
  var fridgeMaterialOther = new THREE.MeshPhongMaterial({
    color: 0x4a4e59
  });
  var fridge = new THREE.Mesh(new THREE.BoxGeometry(AREA_12_FRIDGE_WIDTH, AREA_12_FRIDGE_HEIGHT, AREA_12_FRIDGE_LENGTH), [new THREE.MeshPhongMaterial({
    map: fridgeTexture
  }), fridgeMaterialOther, fridgeMaterialOther, fridgeMaterialOther, fridgeMaterialOther, fridgeMaterialOther]);
  fridge.castShadow = true;
  fridge.receiveShadow = true;
  fridge.position.x += AREA_12_FRIDGE_GAP_HORIZONTAL + AREA_12_FRIDGE_WIDTH / 2 - groupCenterX;
  fridge.position.y += AREA_12_FRIDGE_HEIGHT / 2 - groupCenterY;
  fridge.position.z += AREA_12_CONDITIONER_LENGTH / 2 - groupCenterZ;
  group.add(fridge); // 空调

  var conditionerTexture = textureLoader.load('img/texture/texture_conditioner_hang.jpg');
  var conditionerMaterialOther = new THREE.MeshPhongMaterial({
    color: 0xf2f1ef
  });
  var conditioner = new THREE.Mesh(new THREE.BoxGeometry(AREA_12_CONDITIONER_WIDTH, AREA_12_CONDITIONER_HEIGHT, AREA_12_CONDITIONER_LENGTH), [new THREE.MeshPhongMaterial({
    map: conditionerTexture
  }), conditionerMaterialOther, conditionerMaterialOther, conditionerMaterialOther, conditionerMaterialOther, conditionerMaterialOther]);
  conditioner.castShadow = true;
  conditioner.receiveShadow = true;
  conditioner.position.x += AREA_12_CONDITIONER_WIDTH / 2 - groupCenterX;
  conditioner.position.y += AREA_12_CONDITIONER_ALTITUDE + AREA_12_CONDITIONER_HEIGHT / 2 - groupCenterY;
  conditioner.position.z += AREA_12_CONDITIONER_LENGTH / 2 - groupCenterZ;
  group.add(conditioner); // 热水器

  var heaterTexture = textureLoader.load('img/texture/texture_heater_hang.jpg');
  heaterTexture.rotation = Math.PI / -2;
  heaterTexture.center = new THREE.Vector2(0.5, 0.5);
  var heaterMaterialSide = new THREE.MeshPhongMaterial({
    color: 0x123456
  });
  var heater = new THREE.Mesh(new THREE.CylinderGeometry(AREA_12_HEATER_RADIUS, AREA_12_HEATER_RADIUS, AREA_12_HEATER_LENGTH, 32), [new THREE.MeshPhongMaterial({
    map: heaterTexture
  }), heaterMaterialSide, heaterMaterialSide]);
  heater.castShadow = true;
  heater.receiveShadow = true;
  heater.rotation.x = Math.PI / 2;
  heater.rotation.y = Math.PI / -2;
  heater.position.x += AREA_12_HEATER_RADIUS - groupCenterX;
  heater.position.y += AREA_12_HEATER_ALTITUDE + AREA_12_HEATER_RADIUS - groupCenterY;
  heater.position.z += AREA_12_CONDITIONER_LENGTH + AREA_12_HEATER_MARGIN + AREA_12_HEATER_LENGTH / 2 - groupCenterZ;
  group.add(heater);
  group.position.set(groupCenterX - WALL_LENGTH_LONG, groupCenterY, WALL_THICKNESS + AREA_12_FRIDGE_GAP_VERTICAL + groupCenterZ);
  scene.add(group);
  var group2 = group.clone();
  group2.position.z += groupCenterZ * 2 + AREA_12_HEATER_MARGIN;
  scene.add(group2); // 桌子

  var desk = new Desk({
    length: AREA_12_DESK_LENGTH,
    height: AREA_12_DESK_HEIGHT,
    width: AREA_12_DESK_WIDTH
  });
  desk.position.set(AREA_12_DESK_GAP_HORIZONTAL + AREA_12_DESK_LENGTH / 2 - WALL_LENGTH_LONG, AREA_12_DESK_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_12_DESK_GAP_VERTICAL - AREA_12_DESK_WIDTH / 2);
  desk.rotation.y = Math.PI / 2;
  scene.add(desk); // 终端

  var device = new THREE.Mesh(new THREE.BoxGeometry(DEVICE_LENGTH, DEVICE_HEIGHT, DEVICE_WIDTH), new THREE.MeshPhongMaterial({
    color: Colors.Device
  }));
  device.castShadow = true;
  device.receiveShadow = true;
  device.rotation.y = Math.PI / 2;
  device.position.set(AREA_12_DESK_GAP_HORIZONTAL + AREA_12_DESK_LENGTH / 2 - WALL_LENGTH_LONG, AREA_12_DESK_HEIGHT + DEVICE_HEIGHT / 2, WALL_LENGTH_LONG - WALL_THICKNESS - AREA_12_DESK_GAP_VERTICAL - AREA_12_DESK_WIDTH / 2);
  scene.add(device); // 提示文字 - 终端

  var hintDevice = new Hint({
    text: '非侵入式终端',
    wordInOneLine: 3
  });
  hintDevice.bindTo(device);
  scene.add(hintDevice);
}

function initControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(WALL_LENGTH_LONG + WALL_THICKNESS * 1.5, 0, 0);
  controls.minDistance = 50;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;
  controls.panSpeed = 0.5;
  controls.rotateSpeed = 0.25;
  controls.zoomSpeed = 0.5;
  controls.update();
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
  };

  if (!options.meshObject || !options.name || !options.timeArray || !options.frames) {
    throw new Error('参数缺失');
  }

  var keyFrames = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = options.frames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          property = _step$value.property,
          values = _step$value.values;
      keyFrames.push(new THREE.KeyframeTrack(property, options.timeArray, values));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var clip = new THREE.AnimationClip(options.name, options.duration, keyFrames);
  var mixer = new THREE.AnimationMixer(options.meshObject);
  var action = mixer.clipAction(clip);
  options.loopCallback && mixer.addEventListener('loop', options.loopCallback);
  options.finishCallback && mixer.addEventListener('finished', options.finishCallback);
  action.setLoop(options.loop, options.loopCount);
  animateActions[options.name] = action;
}

function switchAnimating(name) {
  if (!animatingAction || !animatingAction.isRunning()) {
    animatingAction = animateActions[name];

    if (animatingAction.paused) {
      animatingAction.paused = false;
    } else {
      animatingAction.reset().play();
    }
  }
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  controls.update();
  animatingAction && animatingAction.getMixer().update(clock.getDelta());
}

function onWindowResize() {
  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;
  renderer.setSize(canvasWidth, canvasHeight);
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
}
//# sourceMappingURL=index.js.map