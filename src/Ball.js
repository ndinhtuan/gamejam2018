var StateBallEnum = {
	IDLE: 0,
	ONAIR: 1
}

var THRESH = {
	THRESH_LEFT: 60,
	THRESH_TOP: 720,
	THRESH_RIGHT: 1280 - 20,
	THRESH_DOWN: 51
}

var Ball = cc.Node.extend({

	ctor: function() {
		_state: StateBallEnum.IDLE,
		this._super();
		this._body = new cc.Sprite(res.Ball_png);
		this._body.setAnchorPoint(0.5, 0.5);
		this._body.setPositionY(51 + 60 + 100);
		this._body.setPositionX(150);
		this._direction = new cc.Point(0, 0);
		this.addChild(this._body);
	},

	launch: function(position, angle) {
		this._state = StateBallEnum.ONAIR;
		this._body.setVisible(true);
		this._direction.x = Math.cos(Utils.DegToRad(-angle) + Math.PI / 2);
		this._direction.y = Math.sin(Utils.DegToRad(-angle) + Math.PI / 2);
		this._body.setPositionX(position.x + 120 * this._direction.x);
		this._body.setPositionY(position.y + 120 * this._direction.y);

	},

	tick: function(dt) {
		this.setVisible(this._state != StateBallEnum.IDLE);
		if (this._state == StateBallEnum.ONAIR) {
			var velocity = {
				x: this._direction.x * Constants.BallSpeed,
				y: this._direction.y * Constants.BallSpeed
			};
			this._body.setPositionX(this._body.getPositionX() + velocity.x * dt);
			this._body.setPositionY(this._body.getPositionY() + velocity.y * dt);
		} 
		this.contact();

	},


	contact() {


		var worldPos = this._body.getParent()
			.convertToWorldSpace(this._body.getPosition());
		var curX = worldPos.x;
		var curY = worldPos.y;

		var contentSize = this._body.getContentSize();
		if (curX <= THRESH.THRESH_LEFT) this.reflectLeft();
		if (curX + contentSize.width >= THRESH.THRESH_RIGHT) this.reflectRight();
		if (curY + contentSize.height >= THRESH.THRESH_TOP) this.reflectDown();
	},

	reflectDown: function() {
		this._direction.x = this._direction.x;
		this._direction.y = -this._direction.y;
	},

	reflectLeft() {
		this._direction.x = -this._direction.x;
		this._direction.y = this._direction.y;
	},

	reflectRight() {
		this._direction.x = -this._direction.x;
		this._direction.y = this._direction.y;
	},

	isDead() {
		if (this._state != StateBallEnum.ONAIR) return false;
		var worldPos = this._body.getParent()
			.convertToWorldSpace(this._body.getPosition());
		var curY = worldPos.y;

		if (curY <= THRESH.THRESH_DOWN) return true;
		return false;
	},

	setState: function(state) {
		this._state = state;
	}

});
