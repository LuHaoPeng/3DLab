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
            new THREE.MeshPhongMaterial({ color: this.boardColor }))
        board.castShadow = true
        board.receiveShadow = true
        this.add(board)

        // 展图
        this.boardImg === 'none' || new THREE.TextureLoader().load(this.boardImg, function (texture) {
            let imageMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(_this.length - _this.marginX * 2, _this.height - _this.marginY * 2),
                new THREE.MeshBasicMaterial({ map: texture })
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
            new THREE.MeshPhongMaterial({ color: this.desktopColor }))
        deskTop.castShadow = true
        deskTop.receiveShadow = true
        deskTop.position.y += (this.height - this.desktopThickness) / 2
        this.add(deskTop)

        // 桌腿
        let leg = new THREE.Group()
        let legGeometryHorizontal = new THREE.BoxGeometry(this.legThickness, this.legThickness, this.width - this.legThickness * 2)
        let legGeometryVertical = new THREE.BoxGeometry(this.legThickness, this.height - this.desktopThickness, this.legThickness)
        let legMaterial = new THREE.MeshPhongMaterial({ color: this.legColor })
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
            new THREE.MeshPhongMaterial({ color: this.desktopColor }))
        desktop.castShadow = true
        desktop.receiveShadow = true
        desktop.position.y += (this.height - this.desktopThickness) / 2
        this.add(desktop)

        let cabinetMaterial = new THREE.MeshPhongMaterial({ color: this.cabinetColor })
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
            new THREE.MeshPhongMaterial({ color: this.cabinetDoorColor }))
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
            new THREE.MeshPhongMaterial({ color: this.handleColor }))
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
        let casePieceMaterial = new THREE.MeshPhongMaterial({ color: this.caseColor })
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
            new THREE.MeshPhongMaterial({ color: this.meterColor }))
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

        let sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }))
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

// 复合体 - 状态标识
const Status = function (options = {}) {
    THREE.Group.call(this)

    options = Object.assign({
        nameText: 'machine',
        statusText: 'running',
        dataText: '10kW',
        font: 'Microsoft YaHei',
        fontSizeMain: 48,
        fontColorMain: '#333',
        fontSizeSecond: 44,
        fontColorSecond: '#fff',
        backgroundColor: '#ffc000',
        marginX: 40,
        marginY: 15,
        magic: 30,
        signGutter: 20
    }, options)

    this.setValues(options)
    // TODO
    // this.visible = false
    this.init()
}
Status.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: Status,
    init() {
        this.createTexture()

        let sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texture, transparent: true, depthWrite: false }))
        sprite.renderOrder = 1
        let ratio = this.w / this.h
        sprite.scale.set(ratio * 20, 20, 1)
        this.add(sprite)
    },
    setValues,
    bindTo(obj) {
        // 终端点击动作
        if (!Array.isArray(obj)) {
            obj = [obj]
        }
        const middleObj = obj[obj.length / 2 | 0]

        this.position.copy(middleObj.position)
        this.position.y += this.signGutter + middleObj.geometry.parameters.height / 2
    },
    calcWidth(nameText, statusText, dataText) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        ctx.font = `bold ${this.fontSizeMain}px ${this.font}`
        const widthName = ctx.measureText(nameText).width
        ctx.font = `${this.fontSizeSecond}px ${this.font}`
        const widthStatus = ctx.measureText(statusText).width
        const widthData = ctx.measureText(dataText).width
        return Math.max(widthName, widthStatus, widthData)
    },
    createTexture({ name = this.nameText,
        status = this.statusText,
        data = this.dataText } = {}) {
        const PI = Math.PI
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        const w = this.calcWidth(name, status, data) + this.marginX * 2
        const h = this.fontSizeMain + this.fontSizeSecond * 2 + this.marginY * 4 + this.magic
        this.w = canvas.width = w
        this.h = canvas.height = h

        // draw frame
        let path = new Path2D()
        path.moveTo(w / 2 - this.magic / 2, h - this.magic)
        path.arc(this.magic, h - this.magic * 2, this.magic, PI / 2, PI)
        path.arc(this.magic, this.magic, this.magic, PI, PI * 1.5)
        path.arc(w - this.magic, this.magic, this.magic, PI * 1.5, 0)
        path.arc(w - this.magic, h - this.magic * 2, this.magic, 0, PI / 2)
        path.lineTo(w / 2 + this.magic / 2, h - this.magic)
        path.lineTo(w / 2, h)
        path.lineTo(w / 2 - this.magic / 2, h - this.magic)
        ctx.fillStyle = this.backgroundColor
        ctx.fill(path)

        // draw name text
        ctx.font = `bold ${this.fontSizeMain}px ${this.font}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.fillStyle = this.fontColorMain
        let top = this.fontSizeMain + this.marginY
        ctx.fillText(name, w / 2, top)
        // draw status text
        ctx.font = `${this.fontSizeSecond}px ${this.font}`
        ctx.fillStyle = this.fontColorSecond
        top += this.fontSizeSecond + this.marginY
        ctx.fillText(status, w / 2, top)
        // draw data text
        top += this.fontSizeSecond + this.marginY
        ctx.fillText(data, w / 2, top)

        // create texture
        this.texture = new THREE.CanvasTexture(canvas)
    }
})

// 复合体 - 标识
const Sign = function (options = {}) {
    THREE.Group.call(this)

    options = Object.assign({
        nameText: 'machine',
        statusText: 'running',
        dataText: '10kW',
        font: 'Microsoft YaHei',
        fontSizeMain: 54,
        fontColorMain: '#333',
        fontSizeSecond: 48,
        fontColorSecond: '#fff',
        frameColor: 0xff4500,
        backgroundColor: 0xffc000,
        marginX: 40,
        marginY: 15,
        magic: 30,
        signGutter: 15
    }, options)

    this.setValues(options)
    // TODO
    // this.visible = false
    this.init()
}
Sign.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: Status,
    init() {
        const PI = Math.PI
        const scale = 15
        const m = this.magic / scale
        const w = (this.calcWidth(this.nameText, this.statusText, this.dataText) + this.marginX * 2) / scale
        const h = (this.fontSizeMain + this.fontSizeSecond * 2 + this.marginY * 4) / scale

        // draw sign
        let path = new THREE.Shape()
        path.moveTo(w / 2 - m / 2, m)
        path.lineTo(m, m)
        path.arc(0, m, m, PI / -2, PI, true)
        path.lineTo(0, h)
        path.arc(m, 0, m, PI, PI / 2, true)
        path.lineTo(w - m, h + m)
        path.arc(0, -m, m, PI / 2, 0, true)
        path.lineTo(w, 2 * m)
        path.arc(-m, 0, m, 0, PI / -2, true)
        path.lineTo(w / 2 + m / 2, m)
        path.lineTo(w / 2, 0)
        path.lineTo(w / 2 - m / 2, m)

        let geometry = new THREE.ExtrudeGeometry(path, {
            steps: 1,
            depth: m / 4,
            bevelThickness: m / 4,
            bevelSize: m / 4
        })

        this.createTexture()

        let material = new THREE.MeshBasicMaterial({ color: this.backgroundColor })
        let material2 = new THREE.MeshBasicMaterial({ color: this.frameColor });
        let sign = new THREE.Mesh(geometry, [material, material2])
        sign.position.x -= w / 2
        sign.position.y -= h / 2 + m
        this.add(sign)

        let plane = new THREE.Mesh(new THREE.PlaneGeometry(0.9 * w, 0.9 * h),
            new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, depthWrite: false }))
        plane.position.set(0, 0, m / 2 + 0.1)
        this.add(plane)
    },
    setValues,
    bindTo(obj) {
        // 终端点击动作
        if (!Array.isArray(obj)) {
            obj = [obj]
        }
        const middleObj = obj[obj.length / 2 | 0]

        this.position.copy(middleObj.position)
        this.position.y += this.signGutter + middleObj.geometry.parameters.height / 2
    },
    calcWidth(nameText, statusText, dataText) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        ctx.font = `bold ${this.fontSizeMain}px ${this.font}`
        const widthName = ctx.measureText(nameText).width
        ctx.font = `${this.fontSizeSecond}px ${this.font}`
        const widthStatus = ctx.measureText(statusText).width
        const widthData = ctx.measureText(dataText).width
        return Math.max(widthName, widthStatus, widthData)
    },
    createTexture({ name = this.nameText,
        status = this.statusText,
        data = this.dataText } = {}) {
        const PI = Math.PI
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        const w = this.calcWidth(name, status, data) + this.marginX * 2
        const h = this.fontSizeMain + this.fontSizeSecond * 2 + this.marginY * 4
        canvas.width = w
        canvas.height = h

        // draw name text
        ctx.font = `bold ${this.fontSizeMain}px ${this.font}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.fillStyle = this.fontColorMain
        let top = this.fontSizeMain + this.marginY
        ctx.fillText(name, w / 2, top)
        // draw status text
        ctx.font = `bold ${this.fontSizeSecond}px ${this.font}`
        ctx.fillStyle = this.fontColorSecond
        top += this.fontSizeSecond + this.marginY
        ctx.fillText(status, w / 2, top)
        // draw data text
        top += this.fontSizeSecond + this.marginY
        ctx.fillText(data, w / 2, top)

        // create texture
        this.texture = new THREE.CanvasTexture(canvas)
    }
})

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
    }, { ...options, thickness: options.width / 3 })
    this.setValues(options)

    this.init()
}
Computer.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: Computer,
    init() {
        let frameMaterial = new THREE.MeshPhongMaterial({ color: this.frameColor })
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
            imageMaterial = new THREE.MeshBasicMaterial({ color: this.imageColor })
        } else {
            let texture = new THREE.TextureLoader().load(this.image)
            imageMaterial = new THREE.MeshBasicMaterial({ map: texture })
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