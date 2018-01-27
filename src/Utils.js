var Utils = {
	DegToRad: function(deg){
		return deg * 0.0174532925;
	},

	Clamp: function(x, min, max){
		return Math.max(min,Math.min(max,x));
	}
}


