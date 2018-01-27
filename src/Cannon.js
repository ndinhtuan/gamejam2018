var StateCannonEnum = {
	IDLE: 1, ROTATE: 2
}

var SpeedToLeft = 400;
var angle = 45;
var Cannon = cc.Node.extend({

	_body: null,
	_gun: null,
	_state: null,
	_rotation: 0,
	_originX : null,
	ctor: function() {
		this._super();

		this._direction = 1;
		this._rotation = 0;
		this._state = StateCannonEnum.IDLE;

		this._originX = this.getPositionX();
		this.setAnchorPoint(0.5, 0.5);
		this.setScale(0.7);

		this._body = new cc.Sprite(res.Carrier_png);
		this._body.setAnchorPoint(0.5, 0.5);
		this.addChild(this._body);

		this._gun = new cc.Sprite(res.Gun_png);
		this._gun.setAnchorPoint(0.5, 0.31);
		this.addChild(this._gun);

	},

	setState(state) {
		this._state = state;
	},

	tick: function(dt) {
		if (this._state == StateCannonEnum.ROTATE) {
			this._rotation += this._direction * Constants.RotateSpeed * dt;
			if ((this._rotation > Constants.RotateLimit && this._direction == 1) ||
					(this._rotation < -Constants.RotateLimit && this._direction == -1)) {

				this._direction *= -1;
			}
			this._gun.setRotation(this._rotation);
		}
		if (this._state == 'toleft'){
			console.log("moving left");
			this.setPositionX(
					this.getPositionX() - SpeedToLeft * dt
					);
			if (this.getPositionX() <= 50){
				this._state = StateCannonEnum.ROTATE;
				if (this._reachLeftCallback){
					this._reachLeftCallback();
				}
			}
		}

	},

	moveRightByRate(rate){
		this.setPositionX(
				this.getPositionX() + rate * CannonMaxViewDistance
				);
	},

	toLeft(){
		this._state = 'toleft';
	}

});

