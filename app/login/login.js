app.controller('loginCtrl', ['$scope','$location','$http','myServiceHome',function($scope,$location,$http,myServiceHome) {
$scope.loginData={};


$scope.login=()=>
{

	$http.post('/login',$scope.loginData).success((succ)=>
	{   
		$scope.email1=$scope.loginData.email;
		$scope.password1=$scope.loginData.password;
		localStorage.setItem("email1",($scope.email1));
		localStorage.setItem("password1",$scope.password1);
	

		 if(succ.responseCode=='200')
		{  
			console.log(succ);
			$location.path('/main')
			alert('Successfully Login');
		}
		else if(succ.responseCode=='401')
		{
			alert('Please Provide right credentials');
			console.log(succ);
		}
	})


}
}]);


	
	