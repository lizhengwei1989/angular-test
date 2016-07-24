/**
 * Created by zachary on 16/7/24.
 */
var myModule=angular.module('MyModule',[]);
myModule.controller('MyCtrl',function($scope){
   $scope.loadData=function(){
    console.log("加载数据中。。。");
}
});
myModule.controller('MyCtrl2',function($scope){
    $scope.loadData=function(){
        console.log("加载数据中。。。2222");
    }
});
myModule.directive('loader',function(){
    return {
      restrict:"AE",
      link:function(scope,element,attrs){
          element.bind('mouseenter',function(){
              scope.$apply(attrs.howtoload);
          })
      }
    };
})