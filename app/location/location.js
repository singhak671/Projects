app.controller('locationCtrl', ['$scope','$location','myServiceHome',function($scope,$location,myServiceHome) {

  $scope.mapData=myServiceHome.signupData;  
  var lat=$scope.mapData.address.geometry.location.lat;
  var lng=$scope.mapData.address.geometry.location.lng;
  $scope.lat=lat();
  $scope.lng=lng();
  var myCenter = new google.maps.LatLng( $scope.lat, $scope.lng);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 5};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);

 


 $scope.back=()=>{
    $location.path('/main')
}

    }]);