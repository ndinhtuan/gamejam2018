var StateCannonEnum = {
    IDLE: 1,
    ROTATE: 2
}

var angle = 30;

var Cannon = cc.Node.extend({
    _body: null,
    _gun: null,
    _state: null,
    _rotation: 0,
    ctor: function() {
        this._super();

        this._direction = 1;
        this._rotation = 0;
        this._state = StateCannonEnum.IDLE;

        this.setAnchorPoint(0.5, 0.5);
        // this.setPositionY(10);
        // this.setPositionX(150);
        this.setScale(0.7);

        this._body = new cc.Sprite(res.Carrier_png);
        this._body.setAnchorPoint(0.5, 0.5);
        // this._body.setPositionX(-11);
        // this._body.setPositionY(50);
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
    },

    slideMove(dx) {}

});