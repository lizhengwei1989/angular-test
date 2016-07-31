/**
 * Created by lizhengwei on 2016/7/29.
 */
var app=angular.module('bookStoreApp',[]);
app.filter('to_trusted',['$sce',function($sce){
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]);
app.service('deepCopyService',function(){
    return function (obj) {
        var result={};
        for (var key in obj) {
            result[key] = typeof obj[key]==='object'?arguments.callee(obj[key]):obj[key];
        }
        return result;
    }
});
app.service('cutHtmlService',function(){
    return function (string) {
        return string.replace(/<[^>]+>/g,'');
    }
});
app.service('addItemService',function(){
    return function(infos,info){
        infos.unshift(info);
        return infos;
    };
});
app.service('searchItemsService',function(){
    return function(infos,search){
        var tmp=[];
        infos.forEach(function(v,i){
            if(v.author.indexOf(search)!=-1||v.bookName.indexOf(search)!=-1){
                var arrAuthor=v.author.split(search);
                var arrBookName=v.bookName.split(search);
                if(arrAuthor){
                    v.author=arrAuthor.join('<span class="text-danger">'+search+'</span>');
                }
                if(arrBookName){
                    v.bookName=arrBookName.join('<span class="text-danger">'+search+'</span>');
                }
                tmp.push(v);
            }
        });
        return tmp;

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
app.service('editItemService',function(cutHtmlService,deepCopyService){
    return function(infos,bookId){
        var obj={};
        infos.forEach(function(v,i){
            if(v.bookId==bookId){
                obj=v;
                //var vv=deepCopyService(v);
                obj.bookName=cutHtmlService(v.bookName);
                obj.author=cutHtmlService(v.author);
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
app.controller('BookInfoCtrl',function($scope,addItemService,getBookIdService,delItemService,editItemService,searchItemsService,deepCopyService){
    $scope.isAdd=false;
    $scope.bookInfo={
        bookName:'',
        author:'',
        bookId:'',
        search:''
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
    $scope.copyInfos=$scope.bookInfos.concat();
    $scope.search=function(){
        if($scope.bookInfo.search==''){
            $scope.bookInfos=$scope.copyInfos;
            //alert('请输入检索关键字!');
            return;
        }
        $scope.isAdd=false;

        $scope.bookInfos=searchItemsService($scope.copyInfos,$scope.bookInfo.search);

    }
    $scope.reset=function(){
        $scope.isAdd=false;
        $scope.bookInfo={
            bookName:'',
            author:'',
            bookId:''
        };
    }
    $scope.edit=function(bookId){
        $scope.bookInfo=editItemService($scope.bookInfos,bookId);
        $scope.isAdd=true;
        $scope.copyInfos=$scope.bookInfos.concat();
    }
    $scope.del=function(bookId){
        delItemService($scope.bookInfos,bookId);
        $scope.copyInfos=$scope.bookInfos.concat();
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
        $scope.copyInfos=$scope.bookInfos.concat();
    };

});