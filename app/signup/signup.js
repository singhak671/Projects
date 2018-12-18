app.controller('signupCtrl', ['$scope','$location','$http','myServiceHome',function($scope,$location,$http,myServiceHome) {
$scope.user={};
$scope.signup=()=>{
	// console.log("aagye ");
	$http.post('/signup',$scope.user).success((succ)=>
	{  
		 if(succ.responseCode=="401")
		{
			alert("User Already Exist");
			console.log(succ);
		}   

		else if(succ.responseCode=="200"){
			console.log(succ);
			$location.path('/login');
		}
	})


}

	}

]);