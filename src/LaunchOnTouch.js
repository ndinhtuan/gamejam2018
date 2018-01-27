var LaunchOnTouch = cc.Node.extend({

	_launch: null,

	ctor: function() {
		var that = this;
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event) {

				if (that.touchInViewport(touch) && that._launch != null) {
					that._launch();
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
