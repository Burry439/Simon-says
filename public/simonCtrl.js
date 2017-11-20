app.controller("simonCtrl", function ($scope, $timeout){
   var colors = ["Red", "Blue", "Green", "Orange"]
   var clicks = []
   $scope.times = 1 
   var says = []
   var k = 0;
   var clicked = 0
   var inGame = false


    
       function clear(){
           $timeout(function(){
            $scope.currentColor = ''
           }, 700)
       }

       function clearB(){
        $timeout(function(){
         $scope.currentColor = ''
        }, 700)
       
    }
    function clearC(){
        $timeout(function(){
            $scope.stat = ''
        }, 500)
        inGame = true;
    }
     
       function change(){ 
        inGame = false;
        $timeout(function(){         
          $scope.currentColor = says[k]
          $scope.stat = ''
          k ++  
          if(k == says.length){
            k = 0;
            clear()  
            clearC()       
          } else{
              change()
              clearB()       
          }                       
       }, 1000)   
        
      } 
               
   $scope.start = function(more){       
       document.getElementById("start").innerHTML = "click to reset"
       if(more == 0 && inGame){
        $scope.times = 1
        clicked = 0;       
        says = []  
        clicks = []  
       } 
       $scope.currentColor = ''          
       var j = Math.floor(Math.random() * 4)  
       says.push(colors[j])                       
       change() 
       
        
   }

  $scope.click = function(color){ 
      if(inGame){   
       clicks.push(color)              
      if(clicks.length == says.length && says[clicked] == color){
        inGame = false;
        Ccorrect()
      } 
      else if(says[clicked] != color){
        wrong() 
     } else{
     clicked ++
     console.log(color)
      }
     }
    }   
      
       function wrong (){
        $scope.stat = "wrong:("     
        $scope.start(0)
       }
 
       function Ccorrect(){ 
        $scope.stat = "Right!!!"
       clicked = 0;
       $scope.times += 1;
       clicks = [] 
       $scope.start(1) 
    } 

   
})