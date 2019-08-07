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
     
     //Number items
     $('#item-canvas div').addClass('items-item');
     var childDivs=$('#item-canvas div.items-item');
     for(var i=1;i<childDivs.length;i++)
     {  
        $(childDivs[i]).attr("id","item"+i);
        
     } 
     
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
          itemsControl.append('<div id="item'+i+'-control" class="item-control item-control-inactive" onclick="buttonSetPosition('+i+');"></div>')
     }
     
     //Start items
     itemNumber=1;
     isSliding=true;
     itemsCurrentDirection="forward";
     setPosition(itemNumber);
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
     
     //Set items position after button click
     function buttonSetPosition(itemNumber) {
          isSliding=false;
          setPosition(itemNumber);
          scanRestart();
     }
     
     //Set items position macro
     function setPosition(itemNumber) {
          setitemPanePosition((itemNumber*itemsitemWidth)-itemsitemWidth);
          setitemControls(itemNumber);
          itemsCurrentitem=itemNumber;
          nextitem=itemsCurrentitem+1;
               if (nextitem>itemsitemCount) {
                    nextitem=1;
               }
     }
          //Subroutines of the above
          //Set items controls subroutine
          function setitemControls(activeControl) {
               //set all controls to null except activeControl
               $('.item-control').attr('class', 'item-control item-control-inactive');
               $('#item'+activeControl+'-control').attr('class', 'item-control item-control-active');
          }
          
          //Physically move itempane subroutine
          function setitemPanePosition(value){
               $('#item-canvas').animate({right:value+'px'}, 500, "swing", function(){});
          }