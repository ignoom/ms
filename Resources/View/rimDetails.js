function detalleRim(title, data) {
	var self = Ti.UI.createWindow({
		title : title,
		navBarHidden : true,
		backgroundColor : "white",
		//layout : 'vertical',
	});
	
	var showing = true;
	var footerObject = require('View/commonElements/footer');
	var footer = new footerObject(Ti.App.params, function() {
	});
	footer.setBottom(0);
	var photoHolder = Ti.UI.createView({
		backgroundColor : "white",
		height : '50%',
		width : Ti.UI.FILL
	});
	var photo = Ti.UI.createImageView({
		image:data.imagen.replace("mini","hd"),
  		width:"auto",
  		height : Titanium.UI.FILL,
	});
	photoHolder.add(photo);
	var details = Ti.UI.createView({
		backgroundColor : "white",
		height : "85%",
		bottom : 0,
		width : Ti.UI.FILL,
		opacity : 0,
		visible : false
	});
	
	var detailsHolder =  Ti.UI.createView({
		width : '80%',
		backgroundColor : "white",
		height : Ti.UI.FILL,
		layout : 'vertical',
	});
	details.add(detailsHolder);
	
	var modeloYColorHolder =  Ti.UI.createView({
		backgroundColor : "white",
		height : "25%",
		width :  Ti.UI.FILL,
		layout : 'horizontal',
	});
	var modeloYColor =  Ti.UI.createLabel({
		backgroundColor : "white",
		height : Ti.UI.FILL,
		width : '50%',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		text  : 'MODELO',
		 color:'black',
	});
	var modeloYColorValue =  Ti.UI.createLabel({
		backgroundColor : "white",
		width : '50%',
		height : Ti.UI.FILL,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		text : data.modelo,color:'black',
	});
	modeloYColorHolder.add(modeloYColor);
	modeloYColorHolder.add(modeloYColorValue);
	
	var medidaHolder =  Ti.UI.createView({
		backgroundColor : "white",
		height : "25%",
		width :  Ti.UI.FILL,
		layout : 'horizontal',
	});
	var medida =  Ti.UI.createLabel({
		backgroundColor : "white",
		height : Ti.UI.FILL,
		width : '50%',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		text  : 'MEDIDA',color:'black',
	});
	var medidaValue =  Ti.UI.createLabel({
		backgroundColor : "white",
		width : '50%',
		height : Ti.UI.FILL,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		text : data.medida,color:'black',
	});
	medidaHolder.add(medida);
	medidaHolder.add(medidaValue);
	
	
	var barrenacionHolder =  Ti.UI.createView({
		backgroundColor : "white",
		height : "25%",
		width :  Ti.UI.FILL,
		layout : 'horizontal',
	});
	var barrenacion =  Ti.UI.createLabel({
		backgroundColor : "white",
		height : Ti.UI.FILL,
		width : '50%',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		text  : 'BARRENACION',color:'black',
	});
	var barrenacionValue =  Ti.UI.createLabel({
		backgroundColor : "white",
		width : '50%',
		height : Ti.UI.FILL,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		text : data.barrenacion,color:'black',
	});
	barrenacionHolder.add(barrenacion);
	barrenacionHolder.add(barrenacionValue);
	
	var disponibleHolder =  Ti.UI.createView({
		backgroundColor : "white",
		height : "25%",
		width :  Ti.UI.FILL,
	});
	var disponible = null;
	if(data.disponibilidad!=0){
		disponible = "DISPONIBLE";
	}
	else{
		disponible = "NO DISPONIBLE";
	}
	var disponible =  Ti.UI.createLabel({
		backgroundColor : "white",
		height : Ti.UI.FILL,
		width : '50%',
		color : 'green',
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		text  : disponible,
		right : 0,
	});
	disponibleHolder.add(disponible);
	
	
	
	detailsHolder.add(modeloYColorHolder);
	detailsHolder.add(medidaHolder);
	detailsHolder.add(barrenacionHolder);
	detailsHolder.add(disponibleHolder);
	
	Ti.API.info(JSON.stringify(Ti.App.menuBar));
	Ti.API.info(footer);
		var scrollableView = Ti.UI.createScrollableView({
		  views:[photoHolder,details],
		  showPagingControl:true,
		  width: '100%',
		  height:'80%',
		});
		
	var showDetails = function(){
		Ti.API.info(showing);
		if(!showing){
			details.visible = true;
			details.animate({opacity:.9,duration:900,curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT});
			
		}
		else{
			details.animate({opacity:0,duration:900,curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT},function(){
				details.visible = false;
			});
			
		}
		
	};
	photoHolder.addEventListener('click',function(){showing=!showing; showDetails();});
	details.addEventListener('click',function(){showing=!showing; showDetails();});
	
	
	
	
	
	
		//win.add(scrollableView);
	var menuBar = require('View/menuBar');
	var mB = new menuBar('Detalles', Ti.App.dispatcher.changeWindow);
	self.add(mB);

	//self.add(Ti.App.menuBar);
	self.add(photoHolder);
	self.add(details);
	self.add(footer);
	
	self.addEventListener("open",function(e){
self.activity.actionBar.hide();
});
	
	
	return self;
};

module.exports = detalleRim;
