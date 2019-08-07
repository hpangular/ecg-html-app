var slidetrslidetWidth;
var slidetrslidetCount;
var slidetrslidetPaneWidth;
var slidetrCurrentslidet;
var slidetrCurrentDirection;
var nextslidet;
var isSliding;
var slidetNumber;
var slidetPane=null;
var slidetrControl=null;

$( document ).ready(function() {
     
     //Number slidets
     $('#slidet-canvas div').addClass('slidetr-slidet');
     var childDivs=$('#slidet-canvas div.slidetr-slidet');
     for(var i=1;i<childDivs.length;i++)
     {  
        $(childDivs[i]).attr("id","slidet"+i);
        
     } 
     
     //slidets must be equal width, must be a slidet1
     slidetrslidetWidth=document.getElementById('slidet1').clientWidth;
     slidetrslidetCount=$('.slidetr-slidet').length;
     slidetrslidetPaneWidth=slidetrslidetWidth*slidetrslidetCount;
     //Create/Modify slidet-Canvas
     slidetPane=$('#slidet-canvas');
     slidetPane.css('width', slidetrslidetPaneWidth);
     
     //Add Controls
     slidetrControl=$('#slidetr-control');
     for (var i=1; i<=slidetrslidetCount; i++) {
          slidetrControl.append('<div id="slidet'+i+'-control" class="slidet-control slidet-control-inactive" onclick="buttonSetPosition('+i+');"></div>')
     }
     
     //Start slidetr
     slidetNumber=1;
     isSliding=true;
     slidetrCurrentDirection="forward";
     setPosition(slidetNumber);
     scanNextslidet();
     
     //Mouse Interaction Event Captures
     $("div#slidetr-wrapper").on("mouseenter", function(event){
          isSliding=false;
     });
     $("div#slidetr-wrapper").on("mouseleave", function(event){
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
     
     //slidet after waiting period
     function scanNextslidet() {
          setInterval(function(){
               if (isSliding==true) {
                    setPosition(nextslidet);
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
     
     //Set slidetr position after button click
     function buttonSetPosition(slidetNumber) {
          isSliding=false;
          setPosition(slidetNumber);
          scanRestart();
     }
     
     //Set slidetr position macro
     function setPosition(slidetNumber) {
          setslidetPanePosition((slidetNumber*slidetrslidetWidth)-slidetrslidetWidth);
          setslidetControls(slidetNumber);
          slidetrCurrentslidet=slidetNumber;
          nextslidet=slidetrCurrentslidet+1;
               if (nextslidet>slidetrslidetCount) {
                    nextslidet=1;
               }
     }
          //Subroutines of the above
          //Set slidetr controls subroutine
          function setslidetControls(activeControl) {
               //set all controls to null except activeControl
               $('.slidet-control').attr('class', 'slidet-control slidet-control-inactive');
               $('#slidet'+activeControl+'-control').attr('class', 'slidet-control slidet-control-active');
          }
          
          //Physically move slidetpane subroutine
          function setslidetPanePosition(value){
               $('#slidet-canvas').animate({right:value+'px'}, 500, "swing", function(){});
          }