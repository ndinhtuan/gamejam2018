var	SliderMinX = 17;
var	SliderMaxX = 1137;
var SliderSpeedAuto = 400;

var Slider = cc.Node.extend({
	_slider : null,
	_callback : null, // callback(deltaX)
	_state : null,
	ctor : function(){
		var that = this;
		this._super();

		this._slider = new cc.Sprite(res.Slide_png);
		this._slider.setAnchorPoint(0, 0);
		this.setAnchorPoint(0, 0);
		this.setPositionY(15);
		//		this._slider.setPositionX(SliderMinX);
		this._state = 'idle';
		this.addChild(this._slider);



		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: false,
			onTouchBegan: function(touch, event) {

				if (that.touchInSlider(touch) && that._state == 'idle')  {
					that._state = "drag";
				}
				return true;
			},

			onTouchMoved: function(touch, event){
				if (that._state == "drag"){
					console.log("draggin");
					var prevX = touch.getPreviousLocation().x;
					var	currX = touch.getLocationX();
					var deltaX = currX - prevX;
					var expect = that._slider.getPositionX() + deltaX;
					var real = Utils.Clamp(expect, SliderMinX, SliderMaxX);

					if (that._callback){
						that._callback(that.rate())
					}
					that._slider.setPositionX(
							real
							);
				}
			}
		},

		this);
	},

	touchInSlider: function(touch){
		var location = touch.getLocation();
		var nodeSpaceLocation = this._slider.getParent().convertToNodeSpace(location);
		return cc.rectContainsPoint(this._slider.getBoundingBox(), nodeSpaceLocation);
	},

	rate : function(){
		var currentValue = this._slider.getPositionX() - SliderMinX;
		return (1.0 - currentValue / (SliderMaxX - SliderMinX));
	},

	toEnd : function(){
		this._state = 'toend';
	},

	tick : function(dt){
		if (this._state == 'toend'){
			this._slider.setPositionX(
					this._slider.getPositionX() + SliderSpeedAuto * dt
					);
			this._callback(this.rate());
			if (this._slider.getPositionX() >= SliderMaxX - 5){
				this._state = 'idle';
				if (this._reachEndCallback){
					this._reachEndCallback();
				}
			}
		}
	}
})

