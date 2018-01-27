var MaxViewDistance = 1280 >> 1;
var IngameLayer = cc.LayerColor.extend({

	ctor: function() {
		this.super(new cc.Color(239, 239, 239, 239));

		this.ground = new cc.Sprite(res.Ground_png);
		this.ground.setAnchorPoint(0, 0);
		this.ground.setPositionY(60);


		this.cannon = new Cannon();
		this.cannon.setState(StateCannonEnum.ROTATE);
		this.cannon.setAnchorPoint(0, 0);
		this.cannon.setPositionY(51 + 60 + 20);
		this.cannon.setPositionX(70);


		this._target = new Cannon();

		this._target.setState(StateCannonEnum.IDLE);
		this._target.setAnchorPoint(0, 0);
		this._target.setPositionY(51 + 60 + 20);
		this._target.setPositionX(600);


		this._launchOnTouch = new LaunchOnTouch();
		this._launchOnTouch._launch = this.launch.bind(this);

		this._ball = new Ball();

		this._slideBar = new SlideBar(cc.winSize);

		this._slider = new Slider();
		this._slider._callback = this.slide.bind(this);
		this._slider._reachEndCallback = this.sliderReachEnd.bind(this);

		this.addChild(this._ground);
		this.addChild(this._cannon);
		this.addChild(this._target);
		this.addChild(this._launchOnTouch);
		this.addChild(this._ball);
		this.addChild(this._slideBar);
		this.addChild(this._slider);

		this._nearObj = [this._cannon, this._ball, this._target];
		var that = this;
		this._nearObj.forEach(function(obj){
			obj.originX = obj.getPositionX();
		});

		this.reachTarget();
		this.scheduleUpdate();
		return true;
	},

	update: function(dt) { // callback
		this._cannon.tick(dt);
		this._ball.tick(dt);
		this._slider.tick(dt);
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

	reachTarget(){
		this._state = 'reach';
		this.removeChild(this._cannon);
		this._cannon= this._target;
		this._slider.toEnd();
	},

	sliderReachEnd(){
		this._cannon.toLeft();
		this._cannon._reachLeftCallback = this.reachLeft.bind(this);
	},

	reachLeft(){
		this._target = new Cannon();

		this._target.setState(StateCannonEnum.IDLE);
		this._target.setAnchorPoint(0, 0);
		this._target.setPositionY(51 + 60 + 20);
		this._target.setPositionX(600);
		this.addChild(this._target);
		this._nearObj.push(this._target);
	}


});

var IngameScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new IngameLayer();
		this.addChild(layer);
	}
});
