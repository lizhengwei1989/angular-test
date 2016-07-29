/**
 * Created by lizhengwei on 2016/7/29.
 */
var app=angular.module('bookStoreApp',[]);
app.service('addItemService',function(){
    return function(infos,info){
        infos.unshift(info);
        return infos;
    };
});
app.service('getBookIdService',function(){
    return function(infos){
        infos.sort(function(b,a){
            return a.bookId-b.bookId;
        });
        return infos[0].bookId+1;
    };
});
app.service('delItemService',function(){
    return function(infos,bookId){
        infos.forEach(function(v,i){
            if(v.bookId==bookId){
                infos.splice(i,1);
            }
        });
        return infos;
    };
});
app.service('editItemService',function(){
    return function(infos,bookId){
        var obj={};
        infos.forEach(function(v,i){
            if(v.bookId==bookId){
                obj=v;
            }
        });
        return obj;
    };
});
app.directive('list',function(){
    return {
        scope:{
            listItem:'@'
        },
        restrict:'AE',
        template:'<div class="col-md-offset-2 col-md-10" ng-repeat="bookInfo in bookInfos"><div class="row"><div class="col-md-2">{{bookInfo.author}}</div><div class="col-md-6">{{bookInfo.bookName}} </div> <div class="col-md-2"><a href="javascript:void(0)" ng-click="edit(bookInfo.bookId)">编辑</a><a href="javascript:void(0)" ng-click="del(bookInfo.bookId)">删除</a></div></div></div>',
        replace:true,
        controller:'BookInfoCtrl'
    }
});
app.controller('BookInfoCtrl',function($scope,addItemService,getBookIdService,delItemService,editItemService){
    $scope.isAdd=false;
    $scope.bookInfo={
        bookName:'',
        author:'',
        bookId:''
    };
    $scope.bookInfos=[
        {
            bookName:"Javascript精编",
            author:'zachary',
            bookId:89
        },
        {
            bookName:"Javascript入坑指南",
            author:'HAHA',
            bookId:27
        },
        {
            bookName:"angular坑坑介绍",
            author:'angel',
            bookId:12
        }
    ];
    $scope.reset=function(){
        $scope.isAdd=false;
        $scope.bookInfo={
            bookName:'',
            author:'',
            bookId:''
        };
    }
    $scope.edit=function(bookId){
        var item=editItemService($scope.bookInfos,bookId);
        $scope.bookInfo=item;
        $scope.isAdd=true;
    }
    $scope.del=function(bookId){
        delItemService($scope.bookInfos,bookId);
    }
    $scope.add=function(){
        if($scope.bookInfo.author==''){
            alert('作者不能为空！');
            return ;
        }
        if($scope.bookInfo.bookName==''){
            alert('书名不能为空！') ;
            return ;
        }
        $scope.bookInfo.bookId=getBookIdService($scope.bookInfos);
        tmp=$scope.bookInfo;
        addItemService($scope.bookInfos,tmp);
        tmp={};
        $scope.bookInfo={
            bookName:'',
            author:'',
            bookId:''
        };
    };

});