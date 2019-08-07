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

$( document ).ready(function() {
     
     //Number slides
     $('#slide-canvas div').addClass('slider-slide');
     var childDivs=$('#slide-canvas div.slider-slide');
     for(var i=1;i<childDivs.length;i++)
     {  
        $(childDivs[i]).attr("id","slide"+i);
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
          sliderControl.append('<div id="slide'+i+'-control" class="slide-control slide-control-inactive" onclick="buttonSetPosition('+i+');"></div>')
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
          }, 2500);
     }
     
     //Toggle sliding true/false (Could add a button to turn on or off)
     function toggleSliding() {
          switch (isSliding) {
               case false:{isSliding=true}break;
               case true:{isSliding=false}break;
          }
     }
     
     //Set slider position after button click
     function buttonSetPosition(slideNumber) {
          isSliding=false;
          setPosition(slideNumber);
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