var Replay = cc.Node.extend({

	ctor: function() {
		var that = this;
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event) {
				if (that.touchInViewport(touch)){
					this.layer.replay();
				}
				return true;
			},
		}, this);
	},

	touchInViewport: function(touch) {
		var pointTouch = touch.getLocation();
		if (pointTouch.y >= 60 + 51)
			return true;
		return false;
	}
});

