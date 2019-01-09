'use strict';

angular.module('polytubeApp')
       .controller('signupCtrl', function($scope, piloteUser, $location){


            
        $scope.inscription = function(){

             piloteUser.inscription(JSON.stringify({nom:$scope.nom, prenom: $scope.prenom, email: $scope.email, password : $scope.password, confirm_password : $scope.confirm_password})).then(function(data){

                     localStorage.setItem('token', data.data.token);
                    
                     $location.path( "/" );
                    // window.location.reload();

     
     
                 }, function(data){

                        if(data.staus == 400){
                        $('#alertinscription').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Erreur vérifiez bien les informations saisies !</span></div>')

                        setTimeout(function() { 

                        $("#alertdiv").remove();

                        }, 4000);

                        }
                        else if(data.staus == 402){
                                $('#alertinscription').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Vous avez été bloqué, contactez l\'administrateur du site !</span></div>')
        
                                setTimeout(function() { 
        
                                $("#alertdiv").remove();
        
                                }, 4000);
    
                        }

                        else if(data.staus == 401){
                                $('#alertinscription').append('<div id="alertdiv" class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Ce mail est déjà associé à un compte !</span></div>')
        
                                setTimeout(function() { 
        
                                $("#alertdiv").remove();
        
                                }, 4000);
    
                        }

    

            


        });

}

});