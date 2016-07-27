/**
 * Created by zachary on 16/7/24.
 */
var userInfoModule=angular.module('UserInfoModule',[]);
userInfoModule.controller('UserInfoCtrl',['$scope',function($scope){
  $scope.userInfo={
      email:'522676139@qq.com',
      password:'zachary',
      autoLogin:true
  };
  $scope.login=function(){
      window.location.href="./list.html";
  };
  $scope.setFormData=function(){
      $scope.userInfo={
          email:'zachary1989@gmail.com',
          password:'zachary',
          autoLogin:false
      }
  };
  $scope.reset=function(){
      $scope.userInfo={
          email:'522676139@qq.com',
          password:'zachary',
          autoLogin:true
      };
  }
}])
