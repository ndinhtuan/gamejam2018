var GameOver = cc.Node.extend({
	ctor: function() {
		this._super();
		var that = this;

		this._gameOverSprite = new cc.Sprite(res.GameOver_png);
		this._gameOverSprite.setAnchorPoint(0, 0);
		this._gameOverBg = new cc.Sprite(res.GameOverBg_png);
		this._gameOverBg.setAnchorPoint(0, 0);

		this.addChild(this._gameOverBg);
		this._gameOverBg.setOpacity(128);
		this.addChild(this._gameOverSprite);

		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event) {
				if (that.touchInViewport(touch)
				&& !isAlive){
					console.log("replay");
					that.layer.replay();
					that.setVisible(false);
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

