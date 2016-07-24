/**
 * Created by zachary on 16/7/24.
 */
var userInfoModule=angular.module('UserInfoModule',[]);
userInfoModule.controller('UserInfoCtrl',['$scope',function($scope){
  $scope.userInfo=$scope.default={
      email:'522676139@qq.com',
      password:'zachary',
      autoLogin:true
  };
  $scope.getFormData=function(){
      console.log($scope.userInfo);
  };
  $scope.setFormData=function(){
      $scope.userInfo={
          email:'zachary1989@gmail.com',
          password:'zachaaaay',
          autoLogin:false
      }
  };
  $scope.reset=function(){
      $scope.userInfo=$scope.default;
  }
}])
