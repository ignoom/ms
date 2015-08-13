
//FirstView Component Constructor
function inches(title, children, type, top) {

	var visible = false;

	var self = Ti.UI.createView({
		width : '100%',
		height : '100%',
		touchEnabled : false,
		
	});
	this.type = type;
	self.type = type;
	self.inch = title;
	self.selected;
	var view = Ti.UI.createButton({
		width : '25%',
		height : '5%',
		backgroundColor : 'white',
		borderRadius : 5.0,
		borderColor : '#eee',
		borderWidth : 2.0,
		top : top + "%",
		title : title+"\"",
		color : '#000000',
		selectedColor : '#eee',
		backgroundSelectedColor: '#eee', 
    	backgroundFocusedColor: '#eee', 
	});
	self.inchButton = view;
	self.add(view);
	self.setVision = function(selected) {
		for (var i = 1, len = self.children.length; i < len; i++) {
			self.children[i].setVisible(selected);
			self.selected=selected;
		}
		//Ti.API.info("hiding all"+selected);
	};
	if (type == "passenger") {
		view.left = 0;
	} else {
		Ti.API.info("type of inch: "+type);
		Ti.API.info("type of inch: "+JSON.stringify(children));
		view.right = 0;
	}

	var text = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : '14dp'
		},
		shadowColor : '#aaa',
		shadowRadius : 3,
		text : title + "\"",
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	var scroll = Ti.UI.createView({
			width : '50%',
			height : '60%',
			left: "25%",
			backgroundColor : 'blue',
			top : "30%",
			//views : barrenaciones,
			//children : barrenaciones
			//touchEnabled : true,
		});
	
	if ( typeof children !== "undefined") {
		var barrenacion = require('View/commonElements/barrenacion');
		var barrenaciones = [];
		var secondLine = false;
		
		var toptmp = 30;
		
		for (var i = 0, j=0; i < children.length; i++,j++) {
			
			
			if((toptmp + j * 5)+5 >90){
				j=0;
				secondLine = true;
			}
				
				
			var arriba = toptmp + j * 5 + '%';
			Ti.API.info("type of barrenacion: "+type);
			Ti.API.info("title of barrenacion: "+title);
			var barrenacionChild = new barrenacion(children[i], type, title ,secondLine);
			Ti.API.info("medida:" + title);
			barrenacionChild.top = arriba;
			barrenacionChild.setVisible(false);
			barrenaciones.push(barrenacionChild);
			self.add(barrenacionChild);
			
		}
		scroll.views = barrenaciones;
		//self.add(scroll);
		
		scroll.setVision = function(selected) {
			
			for (var i = 0, len = scroll.views.length; i < len; i++) {
				scroll.views[i].setVisible(selected);
				self.selected=selected;
			}
		//Ti.API.info("hiding all"+selected);
		};
		
		self.scroll = scroll;
		view.addEventListener('click', function() {
			Ti.App.fireEvent('inchClick', {
				type : type,
				inch : title
			});
		
		

			/*Ti.API.info(visible);
			 if (visible) {
			 for (var i = 0; i < barrenaciones.length; i++) {
			 barrenaciones[i].setVisible(false);
			 visible = false;
			 }
			 } else {
			 for (var i = 0; i < barrenaciones.length; i++) {
			 barrenaciones[i].setVisible(true);
			 visible = true;
			 }
			 }*/
		});

	}

	view.add(text);
	//self.add(view);
	this.self = self;
	
	
	
	return self;
}

inches.prototype.setVision = function(type, title) {
	/*if(this.type==type&&this.title==title){
	 for (var i = 0, len = this.self.children.length; i < len; i++) {
	 this.self.children[i].setVisible(boolean);
	 }
	 }*/
	//Ti.API.info("hiding all");
};
module.exports = inches;
