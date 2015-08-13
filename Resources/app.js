/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.
 * A starting point for tab-based application with multiple top-level windows.
 * Requires Titanium Mobile SDK 1.8.0+.
 *
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *
 */

//bootstrap and check dependencies
if (Ti.version < 1.8) {
  alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
  //determine platform and form factor and render approproate components
  var osname = Ti.Platform.osname,
    version = Ti.Platform.version,
    height = Ti.Platform.displayCaps.platformHeight,
    width = Ti.Platform.displayCaps.platformWidth;
    Ti.Gesture.addEventListener('orientationchange',function(e) {
	Ti.App.fireEvent('orient', {portrait:e.source.isPortrait(),landscape:e.source.isLandscape()});
	Ti.App.fireEvent('orientRegistro', {portrait:e.source.isPortrait(),landscape:e.source.isLandscape()});
});

var mobile = {
  	osname : Ti.Platform.osname,
  	version : Ti.Platform.version,
    height : Ti.Platform.displayCaps.platformHeight,
    width : Ti.Platform.displayCaps.platformWidth
  };
	Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
	Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
	Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
	Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
if(Ti.Platform.osname === 'android'){
  Ti.API.info('Ti.Platform.displayCaps.xdpi: ' + Ti.Platform.displayCaps.xdpi);
  Ti.API.info('Ti.Platform.displayCaps.ydpi: ' + Ti.Platform.displayCaps.ydpi);
  Ti.API.info('Ti.Platform.displayCaps.logicalDensityFactor: ' + Ti.Platform.displayCaps.logicalDensityFactor);
  mobile.densityFactor = Ti.Platform.displayCaps.logicalDensityFactor;
  mobile.realHeight = ((mobile.height/mobile.densityFactor) - 25 );
}

function checkTablet() {
    var platform = Ti.Platform.osname;

    switch (platform) {
      case 'ipad':
        return true;
      case 'android':
        var psc = Ti.Platform.Android.physicalSizeCategory;
        var tiAndroid = Ti.Platform.Android;
        return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
      default:
        return Math.min(
          Ti.Platform.displayCaps.platformHeight,
          Ti.Platform.displayCaps.platformWidth
        ) >= 400;
    };
  }
  var isTablet = checkTablet();
  mobile.isTablet = isTablet;
  console.log(isTablet);





Ti.App.params = mobile;
Ti.App.isTablet = isTablet;
Ti.App.windowStack = [];

var dispatcher = require('Controller/Dispatcher');
var disp = new dispatcher();
disp.init();
Ti.App.dispatcher = disp;


})();
