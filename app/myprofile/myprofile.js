app.controller('myprofilectrl', ['$scope','$location','myServiceHome','$http',function($scope,$location,myServiceHome,$http) {
      $scope.email1=myServiceHome.signupData;
    //   console.log(JSON.stringify($scope.email1));
    //   console.log("the email is"+$scope.email1);
      $scope.data={}
      $scope.data.email=myServiceHome.signupData;



      $http.post('/employeeData',$scope.data).success((response)=>
     {  
         console.log(response);
        // console.log('Response Data=>'+JSON.stringify(response));
        $scope.firstname=response.data.Firstname;
        // console.log($scope.firstname);
        // localStorage.setItem('firstname',$scope.firstname);
        $scope.lastname=response.data.Lastname;
        // localStorage.setItem('lastname',$scope.lastname);
        $scope.email=response.data.Email;
        // localStorage.setItem('email',$scope.email);
        $scope.age=response.data.Age;
        // localStorage.setItem('age',$scope.age);

    })

    
     $scope.edit=()=>
    {
	   $location.path('/editProfile');
    }
    }
   
    
    ]);