app.controller('firstPageCtrl', ['$scope','$location',function($scope,$location) {
    $scope.loginData={};
    
    $scope.login=()=>
    {
     $location.path('/login');
        
    }
    $scope.signup=()=>
    {
     $location.path('/signup');
        
    }
    }]);