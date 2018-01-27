var StateBallEnum = {
    IDLE: 0,
    ONAIR: 1
}

var THRESH = {
    THRESH_LEFT: 50,
    THRESH_TOP: 720,
    THRESH_RIGHT: 1280 - 30
}
var Ball = cc.Node.extend({
    _body: null,
    _direction: null,
    _state: StateBallEnum.IDLE,
    ctor: function() {
        this._super();
        this._body = new cc.Sprite(res.Ball_png);
        this._body.setAnchorPoint(0.5, 0.5);
        this._body.setPositionY(51 + 60);
        this._body.setPositionX(150);
        this._direction = new cc.Point(0, 0);
        this.addChild(this._body);
    },

    launch: function(position, angle) {
        this._body.setPosition(position);
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
            this._body.setPositionX(this._body.getPositionX() + velocity.x * dt);
            this._body.setPositionY(this._body.getPositionY() + velocity.y * dt);
        }

        this.contact();
    },


    contact() {
        var curX = this._body.getPositionX();
        var curY = this._body.getPositionY();
        var contentSize = this._body.getContentSize();
        console.log("x: ", contentSize.height, " y ", contentSize.width);
        if (curX <= THRESH.THRESH_LEFT) this.reflectLeft();
        if (curX + contentSize.width >= THRESH.THRESH_RIGHT) this.reflectRight();
        if (curY + contentSize.height >= THRESH.THRESH_TOP) this.reflectDown();
    },

    reflectDown: function() {
        console.log("reflect down");
        this._direction.x = this._direction.x;
        this._direction.y = -this._direction.y;
    },

    reflectLeft() {
        console.log("reflect left");
        this._direction.x = -this._direction.x;
        this._direction.y = this._direction.y;
    },

    reflectRight() {
        console.log("reflect right");
        this._direction.x = -this._direction.x;
        this._direction.y = this._direction.y;
    },

    slideMove(dx) {

    }

});

