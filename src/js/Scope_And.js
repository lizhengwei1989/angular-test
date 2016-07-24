/**
 * Created by zachary on 16/7/24.
 */
var myModule=angular.module('MyModule',[]);
myModule.controller('MyCtrl',function($scope){
    $scope.sayHello=function(name){
        alert('Hello '+name);
    };
});
myModule.directive('greeting',function(){
    return {
        restrict:'AE',
        scope:{
            greet:'&'
        },
        template:'<input type="text" ng-model="userName"><br><button class="btn btn-default" ng-click="greet({name:userName})">Greeting</button><br>'
        // replace:true
        // link:function(scope,element,attrs){
        //     scope.flavor=attrs.flavor;
        // }
    };
});