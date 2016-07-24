/**
 * Created by zachary on 16/7/24.
 */
var bookStoreCtrls=angular.module('bookStoreCtrls',[]);
bookStoreCtrls.controller('HelloController',function($scope){
    $scope.name="Zachary";
});

bookStoreCtrls.controller('ListController',function($scope){
    $scope.books=[{author:'zachary',name:'牛b的前端工程师'},{author:'hehe',name:'小白'}];
});