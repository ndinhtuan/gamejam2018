var SliderBar = cc.Node.extend({
	_sliderBar: null,
	ctor: function(winSize){
		var that = this;
		this._super();
		this._sliderBar = new cc.Sprite(res.Border_png);
		this._sliderBar.setAnchorPoint(0, 0);
		this.addChild(this._sliderBar);
	}
})
