app.controller('addEmployeeCtrl', ['$scope','$location','$http','myServiceHome',function($scope,$location,$http,myServiceHome) {
    $scope.data1={};

    var today =new Date();
$scope.currentDay = new Date(today.getFullYear(),today.getMonth(),today.getDate())
    $scope.add=()=>
{  
    

    $http.post('/addEmployee',$scope.data1).success((succ)=>
    {
    // console.log(response);
    if(succ.responseCode==401)
    {
        alert("Employee Already Exist");
       // console.log(succ);
    }   

    else if(succ.responseCode==200){
        console.log(succ);
        // myServiceHome.companyData=succ.data;
        // console.log(succ.data);
        localStorage.setItem("key","1");
        $location.path('/employee');
          
    }
    })




}

      $scope.initFun = function () {
        var inputFrom = document.getElementById('area_name');
        var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);


        google.maps.event.addListener(autocompleteFrom, 'place_changed', function () {
            var place = autocompleteFrom.getPlace();
            $scope.data1.lattitude = place.geometry.location.lat();
            $scope.data1.longitude = place.geometry.location.lng();
            $scope.data1.address = place.formatted_address;
            
        });
    }


  }
  
  ]);