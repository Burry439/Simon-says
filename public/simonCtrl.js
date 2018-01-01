app.controller("simonCtrl", function ($scope, $timeout, $http){
   var colors = ["Red", "Blue", "Green", "Orange"]
   var clicks = []
   $scope.times = 1 
   $scope.highscore = {
       name : '',
       score: '',
       id: ''
   }
   var says = []
   var colorCount = 0;
   var clicked = 0
   var inGame = false
   
   getRequest()

   $scope.start = function(lose){       
    document.getElementById("start").innerHTML = "click to reset"
    if(lose){
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
    
       function clear(){
           $timeout(function(){
            $scope.currentColor = ''
           }, 700)
       }

    function clearC(){
        $timeout(function(){
            $scope.stat = ''
        }, 500)
    }
     
       function change(){ 
        inGame = false;
        $timeout(function(){         
          $scope.currentColor = says[colorCount]
          $scope.stat = ''
          colorCount ++  
          if(colorCount >= says.length){
            colorCount = 0;
            clear()  
            clearC() 
            inGame = true      
          } else{
              change()
              clear()       
          }     
        }, 1000)   
        
      } 
               


  $scope.click = function(color){ 
      if(inGame){   
        playAudio('beep')  
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
           playAudio('wrong')
        $scope.stat = "wrong:(" 
          if($scope.times > $scope.highscore.score){       
            $scope.highscore.name = prompt("High Score Please eneter your name") || "Anonymous"
            $scope.highscore.score = $scope.times
             postRequest($scope.highscore)
          }
        
        $scope.start(true)
       }
 
       function Ccorrect(){ 
        playAudio('right')        
        $scope.stat = "Right!!!"
       clicked = 0;
       $scope.times += 1;
       clicks = [] 
       $scope.start() 
    } 
     
       function playAudio(music) {
        var audio = new Audio('music/'+ music +'.mp3 ')
        audio.play();
    };

   function postRequest(data){
       console.log(data.id)
    return $http.put('/highScore/'+data.id , data).then(function(res){
        return console.log(res.data)
    });
   }
 
   function getRequest(){
      return $http.get('/scores').then(function(res){
          console.log(res.data)
          return $scope.highscore.name = res.data[0].name ,
            $scope.highscore.score = res.data[0].score,
            $scope.highscore.id  = res.data[0]._id
       })
   }
    
})