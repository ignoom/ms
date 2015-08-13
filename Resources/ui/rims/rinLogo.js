//FirstView Component Constructor
function rinLogo(title, imagen) {
    
    
    var view = Ti.UI.createView({
   	 width : '40%',
   	 height: '19%',
    });
    
    
    
//    Ti.API.info('Imageen'+imagen);
    var image = Ti.UI.createImageView({
     	 image:imagen,
     	 width:Titanium.UI.FILL,
     	 height : 'auto',
    });
    
    var box = Ti.UI.createView({
   	 width : '100%',
   	 bottom : 0,
   	 height: '25%',
   	 backgroundColor: 'white',
   	 borderRadius : 5.0,
   	 borderColor : '#eee',
   	 borderWidth : 2.0,
    });
    var text = Ti.UI.createLabel({
   	 
   	 color: '#000',
   	   font: { fontSize:'14dp' },
   	   shadowColor: '#aaa',
   	   //shadowOffset: {x:5, y:5},
   	   shadowRadius: 3,
   	   text: title,
   	   textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
   	   //top: 30,
   	   width: Ti.UI.SIZE, height: Ti.UI.SIZE
    });

    
    
    view.add(image);
    view.add(box);
    box.add(text);

    return view;
}

module.exports = rinLogo;



