app.controller('editEmployeeCtrl', ['$scope','$routeParams','$location','$http','myServiceHome',function($scope,$routeParams,$location,$http,myServiceHome) {
    console.log('paramsData==>>', $routeParams)
    $scope.data1={};



    $http.post('/findProfile',$scope.id).success((succ)=>
    {
        if(succ.responseCode=="404")
		{
			alert("Error Exist");
		}   
		else if(succ.responseCode=="200"){
            console.log(succ);
            $scope.newRecord=succ.data;
		}
    
    })

    $scope.update=()=>{
        var id = $routeParams.id;
        $scope.data1._id=id;
        $http.post('/editEmployee',$scope.data1).success((succ)=>
        {  
             if(succ.responseCode=="400")
            {
                alert(" Error Exist");
            }   
    
            else if(succ.responseCode=="200"){
                console.log(succ);
                $location.path('/employee');       
            }
           
        })
            
    
    }


  

  }
  
  ]);