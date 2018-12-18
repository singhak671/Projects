
    app.controller("employeeDataCtrl",['$scope','$location','myServiceHome','$http', function ($scope,$location,myServiceHome,$http) {
       
        $http.get('/employeeData').success((succ)=>
        {  
             if(succ.responseCode=="400")
            {
                alert(" Error Exist");
            }   
    
            else if(succ.responseCode=="200"){
                console.log(succ);
                $scope.record=succ.data;       
            }
        })

        $scope.edit=(eId)=>{
            console.log(eId);
            $location.path('/editEmployee/'+ eId);
        
        
        }

        $scope.delete=(eId)=>{
            console.log("here is the Id for deletion>>>>>>"+eId);
            var id={_id:eId}
            $http.post('/deleteEmployee',id).success((succ)=>
        {  
             if(succ.responseCode=="404")
            {
                alert(" Error Exist");
            }   
    
            else if(succ.responseCode=="200"){
                console.log("heloooooooooooooooooooo");
                console.log(succ);
                location.reload();
                //$location.path('/employee');       
            }
           
        })
            
        
        }
    
            $scope.back=()=>{
            $location.path('/main');
        
        }
 
    }]);