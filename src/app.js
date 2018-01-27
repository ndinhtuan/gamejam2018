
var IngameLayer = cc.Layer.extend({
	minY: null,
	maxY: null,
	_cannon: null,
	_ball : null,
	_launchOnTouch : null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		var _ground = new cc.Sprite(res.Ground_png);
		_ground.setAnchorPoint(0, 0);
		var contentGround = _ground.getContentSize();
		_ground.setScaleX(size.width / contentGround.width);
		this.addChild(_ground);

		minY = contentGround.height;
		maxY = size.height;

		this._cannon = new Cannon();
		this._cannon.setState(StateCannonEnum.ROTATE);
		this.addChild(this._cannon);

		this._launchOnTouch = new LaunchOnTouch();
		this._launchOnTouch._launch = this.launch.bind(this);
		this.addChild(this._launchOnTouch);

		this._ball = new Ball();
		this.addChild(this._ball);

		this.scheduleUpdate();
		return true;
	},

	update: function(dt){ // callback
		this._cannon.tick(dt);
		this._ball.tick(dt);
	},

	launch(){
		this._ball.launch(
				this._cannon.getPosition(),
				this._cannon._rotation
				);
		this._cannon.setState(StateCannonEnum.IDLE);
	}
});

var IngameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new IngameLayer();
		this.addChild(layer);
	}
});

