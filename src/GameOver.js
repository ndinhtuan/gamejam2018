var GameOver = cc.Node.extend({
    ctor: function() {
        this._super();
        this._gameOverSprite = new cc.Sprite(res.GameOver_png);
        this._gameOverSprite.setAnchorPoint(0, 0);
        this._gameOverBg = new cc.Sprite(res.GameOverBg_png);
        this._gameOverBg.setAnchorPoint(0, 0);

        this.addChild(this._gameOverBg);
        this._gameOverBg.setOpacity(128);
        this.addChild(this._gameOverSprite);
    }
})