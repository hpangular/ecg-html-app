var sliderSlideWidth;
var sliderSlideCount;
var sliderSlidePaneWidth;
var sliderCurrentSlide;
var sliderCurrentDirection;
var nextSlide;
var isSliding;
var slideNumber;
var slidePane=null;
var sliderControl=null;
var itemsitemWidth;
var itemsitemCount;
var itemsitemPaneWidth;
var itemsCurrentitem;
var itemsCurrentDirection;
var nextitem;
var isSliding;
var itemNumber;
var itemPane=null;
var itemsControl=null;

$( document ).ready(function() {
     
     //Number slides
     $('#slide-canvas div').addClass('slider-slide');
     var childDivs=$('#slide-canvas div.slider-slide');
     for(var i=1;i<childDivs.length;i++)
     {  
        $(childDivs[i]).attr("id","slide"+i);
        
     } 
     $('#item-canvas div').addClass('items-item');
     var childDivsI=$('#item-canvas div.items-item');
     for(var i=1;i<childDivsI.length;i++)
     {  
        $(childDivsI[i]).attr("id","item"+i);
        
     } 
     //Slides must be equal width, must be a slide1
     sliderSlideWidth=document.getElementById('slide1').clientWidth;
     sliderSlideCount=$('.slider-slide').length;
     sliderSlidePaneWidth=sliderSlideWidth*sliderSlideCount;
     //Create/Modify Slide-Canvas
     slidePane=$('#slide-canvas');
     slidePane.css('width', sliderSlidePaneWidth);
     
     //Add Controls
     sliderControl=$('#slider-control');
     for (var i=1; i<=sliderSlideCount; i++) {
          sliderControl.append('<div id="slide'+i+'-control" class="slide-control slide-control-inactive" onclick="buttonSetPositionSlide('+i+');"></div>')
     }
     
     //Start Slider
     slideNumber=1;
     isSliding=true;
     sliderCurrentDirection="forward";
     setPosition(slideNumber);
     scanNextSlide();
     
     //Mouse Interaction Event Captures
     $("div#slider-wrapper").on("mouseenter", function(event){
          isSliding=false;
     });
     $("div#slider-wrapper").on("mouseleave", function(event){
          isSliding=true;
     });

       //items must be equal width, must be a item1
       itemsitemWidth=document.getElementById('item1').clientWidth;
       itemsitemCount=$('.items-item').length;
       itemsitemPaneWidth=itemsitemWidth*itemsitemCount;
       //Create/Modify item-Canvas
       itemPane=$('#item-canvas');
       itemPane.css('width', itemsitemPaneWidth);
       
       //Add Controls
       itemsControl=$('#items-control');
       for (var i=1; i<=itemsitemCount; i++) {
            itemsControl.append('<div id="item'+i+'-control" class="item-control item-control-inactive" onclick="buttonSetPositionItem('+i+');"></div>')
       }
       
       //Start items
       itemNumber=1;
       isSliding=true;
       itemsCurrentDirection="forward";
       setPositionItem(itemNumber);
       scanNextitem();
       
       //Mouse Interaction Event Captures
       $("div#items-wrapper").on("mouseenter", function(event){
            isSliding=false;
       });
       $("div#items-wrapper").on("mouseleave", function(event){
            isSliding=true;
       });
});

     //After inactivity, restart sliding
     function scanRestart(){
          var restartTimer = self.setInterval(function(){
               if (isSliding==false) {
                    isSliding=true;
                    clearInterval(restartTimer);
               }
          }, 10000);
     }
     
     //Slide after waiting period
     function scanNextSlide() {
          setInterval(function(){
               if (isSliding==true) {
                    setPosition(nextSlide);
               }
          }, 300000);
     }
        //item after waiting period
        function scanNextitem() {
          setInterval(function(){
               if (isSliding==true) {
                    setPosition(nextitem);
               }
          }, 300000);
     }
     //Toggle sliding true/false (Could add a button to turn on or off)
     function toggleSliding() {
          switch (isSliding) {
               case false:{isSliding=true}break;
               case true:{isSliding=false}break;
          }
     }
     
     //Set slider position after button click
     function buttonSetPositionSlide(slideNumber) {
          isSliding=false;
          setPosition(slideNumber);
          scanRestart();
     }
     function buttonSetPositionItem(itemNumber) {
          isSliding=false;
          setPositionItem(itemNumber);
          scanRestart();
     }
     //Set slider position macro
     function setPosition(slideNumber) {
          setSlidePanePosition((slideNumber*sliderSlideWidth)-sliderSlideWidth);
          setSlideControls(slideNumber);
          sliderCurrentSlide=slideNumber;
          nextSlide=sliderCurrentSlide+1;
               if (nextSlide>sliderSlideCount) {
                    nextSlide=1;
               }
     }

     function setPositionItem(itemNumber) {
          setitemPanePosition((itemNumber*itemsitemWidth)-itemsitemWidth);
          setitemControls(itemNumber);
          itemsCurrentitem=itemNumber;
          nextitem=itemsCurrentitem+1;
               if (nextitem>itemsitemCount) {
                    nextitem=1;
               }
     }
          //Subroutines of the above
          //Set slider controls subroutine
          function setSlideControls(activeControl) {
               //set all controls to null except activeControl
               
               $('.slide-control').attr('class', 'slide-control slide-control-inactive');
               $('#slide'+activeControl+'-control').attr('class', 'slide-control slide-control-active');
          }
          
          //Physically move slidepane subroutine
          function setSlidePanePosition(value){
               $('#slide-canvas').animate({right:value+'px'}, 500, "swing", function(){});
          }

          function setitemControls(activeControl) {
               //set all controls to null except activeControl
               $('.item-control').attr('class', 'item-control item-control-inactive');
               $('#item'+activeControl+'-control').attr('class', 'item-control item-control-active');
          }
          
          //Physically move itempane subroutine
          function setitemPanePosition(value){
               $('#item-canvas').animate({right:value+'px'}, 500, "swing", function(){});
          }