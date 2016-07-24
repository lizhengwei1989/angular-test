/**
 * Created by zachary on 16/7/24.
 */
var bookStoreApp=angular.module('bookStoreApp',['ngRoute','bookStoreCtrls']);
bookStoreApp.config(function($routeProvider){
    $routeProvider.when('/hello',{
        templateUrl:'./tpls/hello.html',
        controller:'HelloController'
    }).when('/list',{
        templateUrl:'./tpls/list.html',
        controller:'ListController'
    }).otherwise({
        redirectTo:'/hello'
    })
});
