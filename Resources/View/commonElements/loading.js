function loading() {
	
	
	var self = Ti.UI.createView({
		height:Ti.UI.FILL,
		width:Ti.UI.FILL,
		backgroundColor:"black",
		zIndex:6
		});
	
	var style = Ti.UI.ActivityIndicatorStyle.DARK;
	
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: 'red',
	  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
	  message: 'Loading...',
	  style:style,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	
	// The activity indicator must be added to a window or view for it to appear
	self.add(activityIndicator);
	
	activityIndicator.show();

	return self;
}

module.exports = loading;
