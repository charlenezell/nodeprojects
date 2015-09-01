/**
 * myapp Module
 *
 * Description
 */
var myapp = angular.module('myapp', []);

myapp.controller('weekgamesInfo', function($scope, $http, $filter, $location) {
    var defcfg=[];
    var db = "20150410";
    if ($location.search().db) {
        db = $location.search().db;
    }
    $scope.getInfoByDbStr = function(str) {
        $http.get("/gamestate/" + db + "/manage/").success(function(data) {
            $scope.info = data.result;
            $scope.info.testCaseConfig=$scope.info.testCaseConfig||defcfg;
            console.log($scope.info.testCaseConfig)
            $scope.info.testCaseConfigStr=JSON.stringify($scope.info.testCaseConfig);
        });
    }
    $scope.submitform=function(){
        $http.post("/gamestate/"+db+"/manage/",{
            testCaseConfig:$scope.info.testCaseConfigStr
        }).success(function(data){
            alert(data);
        });
    }
    $scope.getInfoByDbStr(db);
})
