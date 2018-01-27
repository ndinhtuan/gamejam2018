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
						var prev = touch.getPreviousLocation();
						var prevX =	prev.x;  
						if (this._callback){
							this._callback(touch.locationX() - prevX);
						}
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
