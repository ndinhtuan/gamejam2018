var SlideBar = cc.Node.extend({
	_slideBar: null,
	ctor: function(winSize){
		var that = this;
		this._super();
		this._slideBar = new cc.Sprite(res.Border_png);
		this._slideBar.setAnchorPoint(0, 0);
		this.addChild(this._sliderBar);
	}
})
