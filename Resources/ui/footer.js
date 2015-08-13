//FirstView Component Constructor
function footer() {
    
    Ti.API.info("Creating FooterBar");
    
    var menuHeight;
    var self;
    
    var contactoWindowObj = require('ui/contacto');
   	 
   	 menuHeight = (Ti.Platform.displayCaps.platformHeight)*0.15;
   	 if(menuHeight>44)menuHeight=44;
   	 self = Ti.UI.createView({
   	 height:menuHeight,
   	 width:Ti.UI.FILL,
   	 backgroundColor:"red",
   	 zIndex:3
   	 });
    
    
    
    var title = Ti.UI.createLabel({
      color:'white',
      text: '\u00a9 2014 MS Motorsports \u00ae \n Todos los derechos reservados. \nCualquier infracción de estos derechos dará lugar a enjuiciamiento.',
      font: { fontSize:8 },
      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
      height:Ti.UI.FILL,
      width:"70%"
    });
    
    var contactoButton = Ti.UI.createButton({
   	 backgroundImage : "/images/e_mail.png",
   	 right : 4,
   	 height: (menuHeight*0.85),
   	 width : (menuHeight*0.85)
    });
    contactoButton.addEventListener("click",function(){
   	 contactoButton.setEnabled(false);
   	 var contact =  new contactoWindowObj();
      contact.open();
      contactoButton.setEnabled(true);
    });
    
    self.add(title);
    self.add(contactoButton);

    return self;
}

module.exports = footer;



