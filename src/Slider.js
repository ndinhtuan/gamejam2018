var	SliderMinX = 10;
var	SliderMaxX = 1000;

var Slider = cc.Node.extend({
	_slider : null,
	_callback : null, // callback(deltaX)
	ctor : function(){
		var that = this;
		this._super();

		this._slider = new cc.Sprite(res.Slide_png);
		this._slider.setAnchorPoint(0, 0);
		this.addChild(this._slider);
		this._slider.setPositionY(-65);
		this._slider.setPositionX(50)
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: false,
				onTouchBegan: function(touch, event) {

					if (that.touchInSlider(touch))  {
						that._dragging = true;
					}
					return true;
				},
				onTouchMoved: function(touch, event){
					if (that._dragging){
						var prevX = touch.getPreviousLocation().x;
						var	currX = touch.getLocationX();
						var deltaX = currX - prevX;
						var expect = that._slider.getPositionX() + deltaX;
						var real = Utils.Clamp(expect, SliderMinX, SliderMaxX);

						if (that._callback){
							that._callback(real - that._slider.getPositionX());
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
	}

})

