'use strict';

var auth = angular.module('rio.auth',['ngMaterial']);

auth.controller('LoginCtrl', function($scope, $location, $mdDialog, $rootScope, $http) {
    var vm = this;

    vm.handleSubmit = handleSubmit;
    vm.handleCancel = handleCancel;
    vm.resetLoginForm = resetLoginForm;

    $rootScope.isAuthorized = false;

   function handleSubmit() {
       var login = $rootScope.APIServerAddress + "accounts/login";

       $http.post(login, $scope.login) 
      .then(function(response) { 
            console.log("Login successful.");

			if(response.data){
					console.log("The response is: ", response.data);
			}
            $rootScope.isAuthorized = true;

       })
	   .catch(function(response){
			   console.log("Login unsuccessful.");
	   });
      }
       

    function handleCancel() {
        return $mdDialog.cancel();
    }

    function resetLoginForm(){
        login.UserName = null;
        login.PWD = null;
    }
});
