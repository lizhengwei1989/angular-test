/**
 * Created by zachary on 16/7/24.
 */
var myModule=angular.module('MyModule',[]);
myModule.controller('MyCtrl',function($scope){
    $scope.ctrlFlavor="百威";
});
myModule.directive('drink',function(){
    return {
        restrict:'AE',
        scope:{
            flavor:'='
        },
        template:'<input type="text" ng-model="flavor">',
        replace:true
        // link:function(scope,element,attrs){
        //     scope.flavor=attrs.flavor;
        // }
    };
});
