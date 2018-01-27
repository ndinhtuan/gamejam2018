var IngameLayer = cc.LayerColor.extend({
    minY: null,
    maxY: null,
    _cannon: null,
    _ball: null,
    _launchOnTouch: null,
    _slider: null,
    ctor: function() {
        this._super(new cc.Color(239, 239, 239, 239));
        var size = cc.winSize;
        console.log(size.width);

        this._ground = new cc.Sprite(res.Ground_png);
        this._ground.setAnchorPoint(0, 0);
        this._ground.setPositionY(60);

        this.addChild(this._ground);

        this._cannon = new Cannon();
        this._cannon.setState(StateCannonEnum.ROTATE);
        this.addChild(this._cannon);
        this._cannon.setAnchorPoint(0, 0);
        this._cannon.setPositionY(51 + 60 + 30);

        this._launchOnTouch = new LaunchOnTouch();
        this._launchOnTouch._launch = this.launch.bind(this);
        this.addChild(this._launchOnTouch);

        this._ball = new Ball();
        this.addChild(this._ball);

        // Slider 
        this._sliderBar = new Slider(size);
        this.addChild(this._sliderBar);

        this._slider = new cc.Sprite(res.Slide_png);
        this._slider.setAnchorPoint(0, 0);
        this.addChild(this._slider);
        this._slider.setPositionY(-65);
        this._slider.setPositionX(50)

        this.scheduleUpdate();
        return true;
    },

    update: function(dt) { // callback
        this._cannon.tick(dt);
        this._ball.tick(dt);
        //	if (this._ball.isContact(this._topBorder)){
        //		this._ball.reflectDown();
        //	}
    },

    launch() {
        this._ball.launch(
            this._cannon.getPosition(),
            this._cannon._rotation
        );
        this._cannon.setState(StateCannonEnum.IDLE);
    }
});

var IngameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new IngameLayer();
        this.addChild(layer);
    }
});