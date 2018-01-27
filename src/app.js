var isAlive = null;
var score = null;

var IngameLayer = cc.LayerColor.extend({
    minY: null,
    maxY: null,
    _cannon: null,
    _cannon1: null,
    _ball: null,
    _launchOnTouch: null,
    _slider: null,
    _nearObj: [],
    _farObj: [],
    _curCannon: null,
    ctor: function() {
        this._curCannon = 1;
        isAlive = true;
        score = 0;
        this._super(new cc.Color(239, 239, 239, 239));
        var size = cc.winSize;

        this._ground = new cc.Sprite(res.Ground_png);
        this._ground.setAnchorPoint(0, 0);
        this._ground.setPositionY(60);

        this.addChild(this._ground);


        // cannon1
        this._cannon = new Cannon();
        this._cannon.setState(StateCannonEnum.ROTATE);
        this._cannon.setAnchorPoint(0, 0);
        this._cannon.setPositionY(51 + 60 + 20);
        this._cannon.setPositionX(170);
        this.addChild(this._cannon);
        //cannon 2
        this._cannon1 = new Cannon();
        this._cannon1.setState(StateCannonEnum.IDLE);
        this._cannon1.setAnchorPoint(0, 0);
        this._cannon1.setPositionY(51 + 60 + 20);
        this._cannon1.setPositionX(350);
        this.addChild(this._cannon1);


        this._launchOnTouch = new LaunchOnTouch();
        this._launchOnTouch._launch = this.launch.bind(this);
        this.addChild(this._launchOnTouch);


        this._ball = new Ball();
        this._ball.setState(StateBallEnum.IDLE);
        this.addChild(this._ball);




        // Slide Bar
        this._slideBar = new SlideBar(size);
        this.addChild(this._slideBar);
        //	console.log("add slidebar");

        // Slide
        this._slider = new Slider();
        this._slider._callback = this.slide.bind(this);
        this.addChild(this._slider);

        this._nearObj = [this._ground, this._cannon, this._ball, this._cannon1];

        // game over
        this._gameOver = new GameOver();
        this.addChild(this._gameOver);
        this._gameOver.setVisible(false);


        this.scheduleUpdate();
        return true;
    },

    update: function(dt) { // callback
        console.log("hhhh");
        if (!isAlive) return;
        this._cannon.tick(dt);
        this._cannon1.tick(dt);
        this._ball.tick(dt);
        this.checkCollision();

        if (this._ball.isDead()) {
            console.log("FFFF");
            isAlive = false;
            this._gameOver.setVisible(true);
            this._launchAgain = new LaunchOnTouch();
            this._launchAgain._launch = this.launchAgain.bind(this);
            this.addChild(this._launchAgain);
        }
    },

    launchAgain: function() {
        isAlive = true;
        this._ball.setState(StateBallEnum.IDLE);
        this._cannon.setState(StateCannonEnum.ROTATE);
        this._cannon1.setState(StateCannonEnum.IDLE);
        this._ball._body.setPositionY(51 + 60);
        this._ball._body.setPositionX(150);
        this._gameOver.setVisible(false);
    },

    launch: function() {
        this._ball.launch(
            this._ball.convertToNodeSpace(
                this._cannon.getParent().convertToWorldSpace(
                    this._cannon.getPosition())),
            this._cannon._rotation
        );
        this._cannon.setState(StateCannonEnum.IDLE);
    },

    slide: function(dx) {

        this._nearObj.forEach(function(item) {
            item.setPositionX(
                item.getPositionX() - dx
            );
        })
    },

    checkCollision: function() {
        var rectCannon1 = this._cannon._gun.getBoundingBoxToWorld();
        var rectCannon2 = this._cannon1._gun.getBoundingBoxToWorld();

        var rectBall = this._ball._body.getBoundingBoxToWorld();
        // console.log(rectBall);

        if (cc.rectIntersectsRect(rectBall, rectCannon1) && this._curCannon == 2) {
            this._cannon.setState(StateCannonEnum.ROTATE);
            this._cannon1.setState(StateCannonEnum.IDLE);
            this._ball.setState(StateBallEnum.IDLE);
            this._curCannon = 1;
        }

        if (cc.rectIntersectsRect(rectBall, rectCannon2) && this._curCannon == 1) {
            this._cannon1.setState(StateCannonEnum.ROTATE);
            this._cannon.setState(StateCannonEnum.IDLE);
            this._ball.setState(StateBallEnum.IDLE);
            this._curCannon = 2;
        }

    }
});

var IngameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new IngameLayer();
        this.addChild(layer);
    }
});