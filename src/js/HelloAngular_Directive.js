/**
 * Created by zachary on 16/7/24.
 */
var myModule=angular.module('MyModule',[]);
myModule.directive("hello",function(){
   return {
       restrict:'AEMC',
       template:'<div> Hi everyone</div>',
       replace:true
   };
});