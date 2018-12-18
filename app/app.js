var app;

(function () {
    'use strict';
    

var ap = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'naif.base64',
  'google.places'
])
.config(config)
        
config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {



 $routeProvider
 .when('/', {
    templateUrl: 'firstPage/firstPage.html',
    controller:'firstPageCtrl'
  })

 .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  })
 .when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'signupCtrl'
  })
  .when('/myprofile', {
    templateUrl: 'myprofile/myprofile.html',
    controller: 'myprofilectrl'
  })
  .when('/main', {
    templateUrl: 'main/main.html',
  })
  .when('/home', {
    templateUrl: 'home/home.html',
    controller:'homectrl'
  })
  .when('/location', {
    templateUrl: 'location/location.html',
    controller:'locationCtrl'
  })
  .when('/employee', {
    templateUrl: 'Employee/employeeData.html',
    controller:'employeeDataCtrl'
  })
  .when('/addEmployee', {
    templateUrl: 'addEmployee/addEmployee.html',
    controller:'addEmployeeCtrl'
  })
  .when('/editEmployee/:id', {
    templateUrl: 'editEmployee/editEmployee.html',
    controller:'editEmployeeCtrl'
  })
  .when('/deleteEmployee', {
    templateUrl: 'deleteEmployee/deleteEmployee.html',
    controller:'deleteEmployeeCtrl'
  })
  .when('/main', {
    templateUrl: 'main/main.html',
    
  })
  .otherwise({redirectTo:'/'});

 
   //$locationProvider.html5Mode(true);

 
}
 
  
  
   
app=ap;

})  ();