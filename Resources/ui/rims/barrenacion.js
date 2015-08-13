//FirstView Component Constructor
function barrenacion(title, type, medida,secondLine,openWindow) {
    
    ///Ti.API.info("Creating RinLogo");
    Ti.API.info(title);
    //Ti.API.info(imagen);
     var loadingViewObj = require('ui/loading');
     var CatalogoGenericObj = require('ui/rims/CatalogoGeneric');
    
    var view = Ti.UI.createButton({
   	 width : '25%',
   	 height: '5%',
   	 backgroundColor: 'white',
   	 borderRadius : 5.0,
   	 borderColor : '#eee',
   	 borderWidth : 2.0,
   	 font:{fontSize:'10dp'},
   	 color: '#000000',
   	 title : title,
   	 selectedColor : '#eee',
   	 backgroundSelectedColor: '#eee',
   	 backgroundFocusedColor: '#eee',
   	 
    });
    if(type=="passenger"){
   	 if(secondLine){
   		 view.left ='50%';
   	 }
   	 else{
   		 view.left ='25%';
   	 }
   	 
    }
    else{
   	 if(secondLine){
   		 view.right ='50%';
   	 }
   	 else{
   		 view.right ='25%';
   	 }
    }
    var data = [title,type];
    view.addEventListener('click',function(){
   	 Ti.API.info("clicked");
   	 view.setEnabled(false);
    //    Ti.API.info('BARRENACIONES: '+'http://msmotorsports.mx/ignoom/rinesversion2.php?barrenacion='+title+'%'+'&tipo='+type);
    var catalogoWindow = new CatalogoGenericObj({type:type,realHeight:Titanium.Platform.displayCaps.platformHeight},'http://msmotorsports.mx/ignoom/rinesversion2.php?barrenacion='+title+'%25'+'&tipo='+type+'&medida='+medida+'%25');
    openWindow(catalogoWindow);
   	 view.setEnabled(true);
    });
    
    
    
    
    var text = Ti.UI.createLabel({

   	 color : '#000',
   	 font : {
   		 fontSize : '10dp'
   	 },
   	 //minimumFontSize : 8,
   	 shadowColor : '#aaa',
   	 shadowRadius : 3,
   	 text : title + "\"",
   	 textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
   	 height: Ti.UI.SIZE,
   	 //height : 'auto',
   	 width : Ti.UI.SIZE
    });


    
    //view.add(text);

    return view;
}
barrenacion.prototype.hideAll = function(){
    
};

module.exports = barrenacion;



