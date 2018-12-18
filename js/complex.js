"use strict"

const setValues = function (parameters) {
    let _this = this
    if (parameters === undefined) return
    let keys = Object.keys(parameters)
    keys.map(function (key) {
        let value = parameters[key]
        if (value !== undefined) {
            _this[key] = value
        }
    })
}

// 复合体 - 展板
const ShowBoard = function (options = {}) {
    THREE.Group.call(this)

    options = Object.assign({
        length: 30,
        height: 12,
        width: 1,
        boardColor: 0x4f4f4f,
        marginX: 1,
        marginY: 0.5,
        imageThickness: 0.05,
        boardImg: 'img/showBoard/show_board_default.jpg'
    }, options)
    this.setValues(options)

    this.init()
}
ShowBoard.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: ShowBoard,
    init() {
        let _this = this
        // 展板
        let board = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.height, this.width),
            new THREE.MeshPhongMaterial({color: this.boardColor}))
        board.castShadow = true
        board.receiveShadow = true
        this.add(board)

        // 展图
        this.boardImg === 'none' || new THREE.TextureLoader().load(this.boardImg, function (texture) {
            let imageMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(_this.length - _this.marginX * 2, _this.height - _this.marginY * 2),
                new THREE.MeshBasicMaterial({map: texture})
            )
            imageMesh.position.z += _this.width / 2 + _this.imageThickness
            _this.add(imageMesh)
        })
    },
    setValues
})

// 复合体 - 桌子
const Desk = function (options = {}) {
    THREE.Group.call(this)

    options = Object.assign({
        length: 20,
        width: 8,
        height: 6,
        desktopColor: 0xeeeeee,
        desktopThickness: 1,
        legThickness: 1,
        legColor: 0x282c2d
    }, options)
    this.setValues(options)

    this.init()
}
Desk.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: Desk,
    init() {
        // 桌面
        let deskTop = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.desktopThickness, this.width),
            new THREE.MeshPhongMaterial({color: this.desktopColor}))
        deskTop.castShadow = true
        deskTop.receiveShadow = true
        deskTop.position.y += (this.height - this.desktopThickness) / 2
        this.add(deskTop)

        // 桌腿
        let leg = new THREE.Group()
        let legGeometryHorizontal = new THREE.BoxGeometry(this.legThickness, this.legThickness, this.width - this.legThickness * 2)
        let legGeometryVertical = new THREE.BoxGeometry(this.legThickness, this.height - this.desktopThickness, this.legThickness)
        let legMaterial = new THREE.MeshPhongMaterial({color: this.legColor})
        let legPiece1 = new THREE.Mesh(legGeometryHorizontal, legMaterial)
        legPiece1.castShadow = true
        legPiece1.receiveShadow = true
        legPiece1.position.y += (this.height - this.desktopThickness - this.legThickness) / 2
        leg.add(legPiece1)
        let legPiece2 = new THREE.Mesh(legGeometryVertical, legMaterial)
        legPiece2.castShadow = true
        legPiece2.receiveShadow = true
        legPiece2.position.z += (this.width - this.legThickness) / 2
        leg.add(legPiece2)
        let legPiece3 = legPiece1.clone()
        legPiece3.position.y -= this.height - this.desktopThickness - this.legThickness
        leg.add(legPiece3)
        let legPiece4 = legPiece2.clone()
        legPiece4.position.z -= this.width - this.legThickness
        leg.add(legPiece4)
        leg.position.x -= (this.length - this.legThickness) / 2
        leg.position.y -= this.desktopThickness / 2
        this.add(leg)
        let leg2 = leg.clone()
        leg2.position.x += this.length - this.legThickness
        this.add(leg2)
    },
    setValues
})

// 复合体 - 实验台
const WorkBench = function (options = {}) {
    THREE.Group.call(this)

    options = Object.assign({
        length: 28,
        width: 8,
        height: 10,
        desktopColor: 0x282c2d,
        desktopThickness: 1,
        cabinetMarginSide: 1,
        cabinetThickness: 1,
        cabinetWidth: 6,
        cabinetColor: 0xeeeeee,
        cabinetDoorColor: 0x064f93,
        handleLength: 1,
        handleWidth: 0.5,
        handleThickness: 0.5,
        handleMarginHorizontal: 0.5,
        handleMarginVertical: 1,
        handleColor: 0x282c2d
    }, options)
    this.setValues(options)

    this.init()
}
WorkBench.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: WorkBench,
    init() {
        let desktop = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.desktopThickness, this.width),
            new THREE.MeshPhongMaterial({color: this.desktopColor}))
        desktop.castShadow = true
        desktop.receiveShadow = true
        desktop.position.y += (this.height - this.desktopThickness) / 2
        this.add(desktop)

        let cabinetMaterial = new THREE.MeshPhongMaterial({color: this.cabinetColor})
        let cabinetBack = new THREE.Mesh(new THREE.BoxGeometry(this.length - this.cabinetMarginSide * 2, this.height - this.desktopThickness,
            this.cabinetThickness), cabinetMaterial)
        cabinetBack.castShadow = true
        cabinetBack.receiveShadow = true
        cabinetBack.position.y -= this.desktopThickness / 2
        cabinetBack.position.z -= (this.width - this.cabinetMarginSide * 2 - this.cabinetThickness) / 2
        this.add(cabinetBack)

        let cabinet1 = new THREE.Group()
        let cabinetLeft = new THREE.Mesh(new THREE.BoxGeometry(this.cabinetThickness, this.height - this.desktopThickness,
            this.width - this.cabinetMarginSide * 2 - this.cabinetThickness), cabinetMaterial)
        cabinetLeft.castShadow = true
        cabinetLeft.receiveShadow = true
        cabinetLeft.position.x -= (this.cabinetWidth - this.cabinetThickness) / 2
        cabinet1.add(cabinetLeft)
        let cabinetRight = cabinetLeft.clone()
        cabinetRight.position.x += this.cabinetWidth - this.cabinetThickness
        cabinet1.add(cabinetRight)
        let cabinetBottom = new THREE.Mesh(new THREE.BoxGeometry(this.cabinetWidth - this.cabinetThickness * 2,
            this.cabinetThickness, this.width - this.cabinetMarginSide * 2 - this.cabinetThickness), cabinetMaterial)
        cabinetBottom.castShadow = true
        cabinetBottom.receiveShadow = true
        cabinetBottom.position.y -= (this.height - this.desktopThickness - this.cabinetThickness) / 2
        cabinet1.add(cabinetBottom)
        let cabinetTop = cabinetBottom.clone()
        cabinetTop.position.y += this.height - this.desktopThickness - this.cabinetThickness
        cabinet1.add(cabinetTop)
        let cabinetDoor = new THREE.Mesh(new THREE.BoxGeometry(this.cabinetWidth - this.cabinetThickness * 2,
            this.height - this.desktopThickness - this.cabinetThickness * 2, this.cabinetThickness),
            new THREE.MeshPhongMaterial({color: this.cabinetDoorColor}))
        cabinetDoor.castShadow = true
        cabinetDoor.receiveShadow = true
        cabinetDoor.position.z += this.width / 2 - this.cabinetMarginSide - this.cabinetThickness
        cabinet1.add(cabinetDoor)
        cabinet1.position.x -= (this.length - this.cabinetMarginSide * 2 - this.cabinetWidth) / 2
        cabinet1.position.y -= this.desktopThickness / 2
        cabinet1.position.z += this.cabinetThickness / 2
        this.add(cabinet1)
        let cabinet2 = cabinet1.clone()
        cabinet2.position.x += this.length - this.cabinetMarginSide * 2 - this.cabinetWidth
        this.add(cabinet2)

        // 柜门把手
        let handle1 = new THREE.Mesh(new THREE.BoxGeometry(this.handleWidth, this.handleLength, this.handleThickness),
            new THREE.MeshPhongMaterial({color: this.handleColor}))
        handle1.castShadow = true
        handle1.receiveShadow = true
        handle1.position.x -= this.length / 2 - this.cabinetMarginSide - this.cabinetWidth + this.cabinetThickness
            + this.handleMarginHorizontal + this.handleWidth / 2
        handle1.position.y += this.height / 2 - this.desktopThickness - this.cabinetThickness - this.handleMarginVertical - this.handleLength / 2
        handle1.position.z += (this.width - this.cabinetMarginSide * 2 + this.handleThickness) / 2
        this.add(handle1)
        let handle2 = handle1.clone()
        handle2.position.x += this.length + (this.cabinetThickness + this.handleMarginHorizontal - this.cabinetMarginSide
            - this.cabinetWidth) * 2 + this.handleWidth
        this.add(handle2)
    },
    setValues
})

// 复合体 - 展柜
const Showcase = function (options = {}) {
    THREE.Group.call(this)

    options = Object.assign({
        length: 26,
        width: 6,
        height: 8,
        row: 2,
        column: 5,
        caseColor: 0xeeeeee,
        caseThickness: 1,
        meterLength: 1,
        meterThickness: 1,
        meterColor: 0x63B8FF
    }, options)
    this.setValues(options)

    this.init()
}
Showcase.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: Showcase,
    init() {
        // 展柜
        let casePieceMaterial = new THREE.MeshPhongMaterial({color: this.caseColor})
        let casePieceBack = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.height, this.caseThickness), casePieceMaterial)
        casePieceBack.castShadow = true
        casePieceBack.receiveShadow = true
        casePieceBack.position.z -= (this.width - this.caseThickness) / 2
        this.add(casePieceBack)
        let casePieceLeft = new THREE.Mesh(new THREE.BoxGeometry(this.caseThickness, this.height, this.width - this.caseThickness), casePieceMaterial)
        casePieceLeft.castShadow = true
        casePieceLeft.receiveShadow = true
        casePieceLeft.position.x -= (this.length - this.caseThickness) / 2
        casePieceLeft.position.z += this.caseThickness / 2
        this.add(casePieceLeft)
        let casePieceRight = casePieceLeft.clone()
        casePieceRight.position.x += this.length - this.caseThickness
        this.add(casePieceRight)
        let casePieceTop = new THREE.Mesh(new THREE.BoxGeometry(this.length - this.caseThickness * 2, this.caseThickness,
            this.width - this.caseThickness), casePieceMaterial)
        casePieceTop.castShadow = true
        casePieceTop.receiveShadow = true
        casePieceTop.position.y += (this.height - this.caseThickness) / 2
        casePieceTop.position.z += this.caseThickness / 2
        this.add(casePieceTop)

        // 电表
        let meterAreaLength = this.length - this.caseThickness * 2
        let meterAreaHeight = this.height - this.caseThickness
        let meterMarginHorizontal = (meterAreaLength - this.column * this.meterLength) / this.column
        let meterMarginVertical = (meterAreaHeight - this.row * this.meterLength) / this.row
        let meter = new THREE.Mesh(new THREE.BoxGeometry(this.meterLength, this.meterLength, this.meterThickness),
            new THREE.MeshPhongMaterial({color: this.meterColor}))
        meter.castShadow = true
        meter.receiveShadow = true
        meter.position.x -= (this.length - meterMarginHorizontal - this.caseThickness * 2 - this.meterLength) / 2
        meter.position.y += (this.height - meterMarginVertical - this.caseThickness * 2 - this.meterLength) / 2
        meter.position.z -= (this.width - this.caseThickness * 2 - this.meterThickness) / 2
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.column; c++) {
                let meterCopy = meter.clone()
                meterCopy.position.x += c * (meterMarginHorizontal + this.meterLength)
                meterCopy.position.y -= r * (meterMarginVertical + this.meterLength)
                this.add(meterCopy)
            }
        }
    },
    setValues
})

// 复合体 - 提示文字
const Hint = function (options = {}) {
    THREE.Group.call(this)

    options = Object.assign({
        text: 'hello hint',
        font: 'Microsoft YaHei',
        fontSize: 48,
        fontStyle: 'bold',
        fontColor: '#ffffff',
        strokeColor: '#ff4500',
        strokeWidth: 2,
        wordInOneLine: 5,
        lineHeight: 48,
        hintMargin: 3,
        axis: 'y',
        timeout: 3000
    }, options)
    options.marginBottom = options.fontSize / 4
    options.scaleBasis = Math.ceil(options.text.length / options.wordInOneLine)
    this.setValues(options)
    this.visible = false

    this.init()
}
Hint.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: Hint,
    init() {
        let canvas = document.createElement('canvas')
        let rows = Math.ceil(this.text.length / this.wordInOneLine)
        canvas.width = this.fontSize * this.wordInOneLine
        canvas.height = this.lineHeight * rows + this.marginBottom
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = this.fontColor
        ctx.strokeStyle = this.strokeColor
        ctx.font = this.fontStyle + ' ' + this.fontSize + 'px ' + this.font
        ctx.lineWidth = this.strokeWidth
        ctx.wrapText(this.text, 0, this.lineHeight, this.fontSize * this.wordInOneLine, this.lineHeight)
        let texture = new THREE.Texture(canvas)
        texture.needsUpdate = true

        let sprite = new THREE.Sprite(new THREE.SpriteMaterial({map: texture, transparent: true, depthWrite: false}))
        sprite.renderOrder = 1
        let ratio = canvas.width / canvas.height
        sprite.scale.set(this.scaleBasis * ratio, this.scaleBasis, 1)
        this.add(sprite)
    },
    setValues,
    bindTo(obj) {
        // 终端点击动作
        if (!Array.isArray(obj)) {
            obj = [obj]
        }
        let middleObj = obj[obj.length / 2 | 0]

        this.position.fromArray(middleObj.position.toArray())
        this.position[this.axis] += this.hintMargin
        let _this = this
        obj.map((target) => {
            if (target.isObject3D) {
                target.on('click', () => {
                    if (!_this.visible) {
                        _this.visible = true
                        setTimeout(() => {
                            _this.visible = false
                        }, _this.timeout)
                    }
                })
            }
        })
    }
})
CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
    if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
        return
    }

    let context = this
    let canvas = context.canvas

    if (typeof maxWidth == 'undefined') {
        maxWidth = (canvas && canvas.width) || 300
    }
    if (typeof lineHeight == 'undefined') {
        lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight)
    }

    // 字符分隔为数组
    let arrText = text.split('')
    let line = ''

    for (let n = 0; n < arrText.length; n++) {
        let testLine = line + arrText[n]
        let metrics = context.measureText(testLine)
        let testWidth = metrics.width
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y)
            context.strokeText(line, x, y)
            line = arrText[n]
            y += lineHeight
        } else {
            line = testLine
        }
    }
    context.fillText(line, x, y)
    context.strokeText(line, x, y)
}

// 复合体 - 电脑
const Computer = function (options = {}) {
    THREE.Group.call(this)

    options = Object.assign({
        length: 5,
        width: 1.5,
        height: 4,
        screenHeight: 3,
        marginX: 0.2,
        marginY: 0.2,
        frameColor: 0x696969,
        image: 'none',
        imageColor: 0xcfcfcf,
        imageThickness: 0.05
    }, {...options, thickness: options.width / 3})
    this.setValues(options)

    this.init()
}
Computer.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: Computer,
    init() {
        let frameMaterial = new THREE.MeshPhongMaterial({color: this.frameColor})
        // 屏幕
        let screen = new THREE.Mesh(new THREE.BoxGeometry(this.length, this.screenHeight, this.thickness),
            frameMaterial)
        screen.castShadow = true
        screen.receiveShadow = true
        screen.position.y += (this.height - this.screenHeight) / 2
        screen.position.z += (this.width - this.thickness) / 2
        this.add(screen)

        // 显示图像
        let imageMaterial
        if (this.image === 'none') {
            imageMaterial = new THREE.MeshBasicMaterial({color: this.imageColor})
        } else {
            let texture = new THREE.TextureLoader().load(this.image)
            imageMaterial = new THREE.MeshBasicMaterial({map: texture})
        }
        let displayImage = new THREE.Mesh(new THREE.PlaneGeometry(this.length - this.marginX * 2,
            this.screenHeight - this.marginY * 2), imageMaterial)
        displayImage.position.y += (this.height - this.screenHeight) / 2
        displayImage.position.z += this.width / 2 + this.imageThickness
        this.add(displayImage)

        // 支柱
        let support = new THREE.Mesh(new THREE.BoxGeometry(this.thickness, this.height / 2, this.thickness),
            frameMaterial)
        support.castShadow = true
        support.receiveShadow = true
        support.position.y += this.thickness - this.height / 4
        this.add(support)

        // 底座
        let base = new THREE.Mesh(new THREE.BoxGeometry(this.thickness * 3, this.thickness, this.thickness * 3),
            frameMaterial)
        base.castShadow = true
        base.receiveShadow = true
        base.position.y += (this.thickness - this.height) / 2
        this.add(base)
    },
    setValues
})