app.controller('homectrl', ['$scope','$http',function($scope,$http) {
$http.get('data/data.json')
.then(function(res){
    $scope.fetch=res.data;
    myServiceHome.jsonData=$scope.fetch;
   })
  }
  
  
]);
  
  