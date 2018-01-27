var StateBallEnum = {
    IDLE: 0,
    ONAIR: 1
}
var Ball = cc.Node.extend({
    _body: null,
    _direction: null,
    _state: StateBallEnum.IDLE,
    ctor: function() {
        this._super();
        this._body.setAnchorPoint(0.5, 0.5);
        this._body = new cc.Sprite(res.Ball_png);
        this._direction = new cc.Point(0, 0);
        this.addChild(this._body);
    },

    launch: function(position, angle) {
        this.setPosition(position);
        this._direction.x = Math.cos(Utils.DegToRad(-angle) + Math.PI / 2);
        this._direction.y = Math.sin(Utils.DegToRad(-angle) + Math.PI / 2);
        this._state = StateBallEnum.ONAIR;
        this._body.setVisible(true);
    },

    tick: function(dt) {
        if (this._state == StateBallEnum.ONAIR) {
            var velocity = {
                x: this._direction.x * Constants.BallSpeed,
                y: this._direction.y * Constants.BallSpeed
            };
            this.setPositionX(this.getPositionX() + velocity.x * dt);
            this.setPositionY(this.getPositionY() + velocity.y * dt);
        }
    },

    contact(node) {
        // TODO : 
        // return true when the ball collision with the node

        return false;
    },

    //TODO:
    //change the direction when the ball hits border

    reflectDown() {

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

    slideMove(dx) {

    }


})