
var MaxViewDistance = 1280 >> 1;
var isAlive = null;
var score = null;

var IngameLayer = cc.LayerColor.extend({
	ctor: function() {
		score = 0;
		isAlive = true;

		this._super(new cc.Color(239, 239, 239, 239));

		this._ground = new cc.Sprite(res.Ground_png);
		this._ground.setAnchorPoint(0, 0);
		this._ground.setPositionY(60);

		this._cannon = new Cannon();
		this._cannon.setPositionX(50);
		this._target = new Cannon();
		this._ball = new Ball();
		this.replay();


		this._launchOnTouch = new LaunchOnTouch();
		this._launchOnTouch._launch = this.launch.bind(this);
		this._launchOnTouch.layer = this;


		this._slideBar = new SlideBar(cc.winSize);

		this._slider = new Slider();
		this._slider._callback = this.slide.bind(this);

		this._gameOver = new GameOver();
		this._gameOver.setVisible(false);
		this._gameOver.layer = this;

		this.addChild(this._gameOver);
		this.addChild(this._ground);
		this.addChild(this._cannon);
		this.addChild(this._target);
		this.addChild(this._launchOnTouch);
		this.addChild(this._ball);
		this.addChild(this._slideBar);
		this.addChild(this._slider);

		this._nearObj = [this._cannon, this._ball, this._target];
		this._nearObj.forEach(function(item){
			item.originX = item.getPositionX();
		});
		this.scheduleUpdate();
		return true;
	},

	update: function(dt) { // callback
		if (!isAlive) return;
		this._cannon.tick(dt);
		this._ball.tick(dt);
		this._slider.tick(dt);
		this.checkCollision();
		if (this._ball.isDead()) {
			isAlive = false;
			this._gameOver.setVisible(true);
		}
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

	slide: function(rate){
		this._nearObj.forEach(function(item){
			item.setPositionX(
					item.originX + rate * MaxViewDistance
					);
		})
	},
	checkCollision: function() {
		var rectCannon = this._cannon._gun.getBoundingBoxToWorld();
		var rectTarget = this._target._gun.getBoundingBoxToWorld();

		var rectBall = this._ball._body.getBoundingBoxToWorld();

		if (cc.rectIntersectsRect(rectBall, rectCannon)) {
			this._ball.setVisible(false);
			this._cannon.setState(StateCannonEnum.ROTATE);
			this._ball.setState(StateBallEnum.IDLE);
		}

		if (cc.rectIntersectsRect(rectBall, rectTarget)) {
			this._ball.setVisible(false);
			this.reachTarget();
			console.log("reach");
		}
	},

	reachTarget(){
		var middle = this._target;
		this._target = this._cannon;
		this._cannon = middle;
		this._cannon.setState(StateCannonEnum.ROTATE);
		this._ball.setState(StateBallEnum.IDLE);
	},


	replay : function(){
		this._ball._body.setPositionY(51 + 60 + 30);
		this._ball._body.setPositionX(150);
		this._ball.setState(StateBallEnum.IDLE);

		this._cannon.setPositionY(51 + 60 + 30);
		this._cannon.setPositionX(70);
		this._cannon._state = StateCannonEnum.ROTATE;

		this._target.setState(StateCannonEnum.IDLE);
		this._target.setAnchorPoint(0, 0);
		this._target.setPositionY(51 + 60 + 20);
		this._target.setPositionX(600);

		isAlive = true;
	}
});

var IngameScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new IngameLayer();
		this.addChild(layer);
	}
});
