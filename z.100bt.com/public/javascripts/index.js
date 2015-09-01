/**
 * myapp Module
 *
 * Description
 */
var myapp = angular.module('myapp', ["ngAnimate"]);
myapp.controller('gameList', function($scope, $http, $filter, $location) {
    function renderTestCaseTable(container,data,config){
        // console.log(data,config);
        // container.empty();
        var cellArray=[],calIdx=0;
        function a(cfg,lev){
            cfg.forEach(function(v,k){
                cellArray.push({name:v.name,childNumb:(v.child?v.child.length:0),idx:calIdx++,lev:lev});
                if(v.child&&v.child.length>0){
                    a(v.child,lev+1);
                }
            });
        }
        a(config.testCaseConfig,0);
        // console.log(cellArray);
        // g=data.map(function(v,k){
        //     // return Util.template()
        //     return "ccc"
        // }).join("")
        // container.html(g);
    }
    var db = "20150410";
    if ($location.search().db) {
        db = $location.search().db;
    }
    $scope.toggleTestCaseView=function(){
        $scope.testCaseView=!$scope.testCaseView;
    }
    $scope.updateGameData = function() {
        $scope.weekMost = "";
        $scope.lessthan5 = false;
        $scope.testCaseView=false;
        $http.get("/gamestate/" + db + "/query/").success(function(data) {
            $scope.infoFlag = false;
            $scope.flash = true;
            $scope.games = data.result;
            $scope.myIp = data.clientIp;
            $scope.info=data.info||{};
            $scope.info.testCaseConfigStr=JSON.stringify($scope.info.testCaseConfig);
            $scope.myRule = data.clientRule;
            $scope.exportLink = "/gamestate/" + db + "/export";
            $scope.exportNoCompleteLink = "/gamestate/" + db + "/export?type=nocomplete";
            var leaveAllocateCount = 0;
            var leaveAllocateTestorCount = 0;
            var noActCount = 0;
            var noActIntCount = 0;
            var noShareIntCount = 0;
            var authors = {};
            $scope.games.forEach(function(v) {
                if (v.author) {
                    authors[v.author] = authors[v.author] || 0;
                    authors[v.author]++;
                }
                if (!v.ip) {
                    leaveAllocateCount++
                }
                if (!v.testIp || (v.testIp.sort && v.testIp.length <= 0)) {
                    leaveAllocateTestorCount++
                }
                if (!v.hasArt) {
                    noActCount++
                }
                if (!v.actcomplete) {
                    noActIntCount++
                }
                if (!v.sharecomplete) {
                    noShareIntCount++
                }
            })
            var a = 0
            $.each(authors, function(k, v) {
                if (v > a) {
                    a = v;
                    $scope.weekMost = k + "(" + v + "个！！)";
                }
            })

            $scope.leaveAllocateCount = leaveAllocateCount
            $scope.leaveAllocateTestorCount = leaveAllocateTestorCount
            $scope.noActCount = noActCount
            $scope.noActIntCount = noActIntCount
            $scope.noShareIntCount = noShareIntCount
            if (leaveAllocateCount <= 5) {
                $scope.lessthan5 = true;
            }
            $http.get("/gamestate/" + db + "/manage/").success(function(data) {
                renderTestCaseTable($(".testCaseTable"),$scope.games,data.result);
            });
        });
    }
    $scope.hasMyIp = function(arr, ipstr) {
        var has = false;
        if (!arr) {

        } else if (arr.charAt) {
            if (arr == ipstr) {
                has = true;
            }
        } else if (arr.sort) {
            $.each(arr, function(k, v) {
                if (v == ipstr) {
                    has = true;
                }
            })
        }
        return has;
    }
    $scope.toggleInfo = function() {
        $scope.infoFlag = !$scope.infoFlag;
    }
    $scope.toggleFlash = function() {
        $scope.flash = !$scope.flash;
    }
    $scope.updateData = function(id, param) {
        $http.post("/gamestate/" + db + "/update/" + id, param).success(function(data) {
            console.log(data);
        });
    }
    $scope.lockGame = function(id, flag) {
        $http.post("/gamestate/" + db + "/" + (flag == 1 ? "lockDev" : "unlockDev") + "/" + id, {}).success(function(data) {
            console.log(data);
            $scope.updateGameData();
        });
    }
    $scope.ipstrisNull = function(ips) {
        if ($.isArray(ips) && ips.length <= 0) {
            return true;
        } else if (!ips) {
            return true
        } else if (ips.charAt) {
            return false;
        } else {
            return false;
        }
    }

    $scope.assignTestor = function(id, flag, testIp) {
        $http.post("/gamestate/" + db + "/" + (flag == 1 ? "lockTest" : "unlockTest") + "/" + id, {
            newTestIp: testIp
        }).success(function(data) {
            console.log(data);
            $scope.updateGameData();
        });
    }
    $scope.completeAct = function(id, flag) {
        $http.post("/gamestate/" + db + "/update/" + id, {
            actcomplete: flag == 0 ? false : true
        }).success(function(data) {
            console.log(data);
            $scope.updateGameData();
        });
    }
    $scope.completeTest = function(id, flag) {
        $http.post("/gamestate/" + db + "/update/" + id, {
            testcomplete: flag == 0 ? false : true
        }).success(function(data) {
            console.log(data);
            $scope.updateGameData();
        });
    }
    $scope.completeShare = function(id, flag) {
        $http.post("/gamestate/" + db + "/update/" + id, {
            sharecomplete: flag == 0 ? false : true
        }).success(function(data) {
            console.log(data);
            $scope.updateGameData();
        });
    }
    $scope.editIt = function(id, vmToSetTrue) {
        var game = null
        $scope.games.forEach(function(v) {
            if (v.id == id) {
                game = v
            }
        })
        game && (game[vmToSetTrue] = true);
    }
    $scope.confirmIt = function(id, vmToSetFalse, fieldName) {
        var game = null
        var param = {};
        $scope.games.forEach(function(v) {
            if (v.id == id) {
                game = v
            }
        })
        if (game) {
            game[vmToSetFalse] = false;
            param[fieldName] = game[fieldName]
            $scope.updateData(game.id, param);
        }
    }
    $scope.showTestCasePop = function(id) {
        $scope.$emit("getTestCasePopUp", id);
    }
    $scope.updateGameData();
})
myapp.controller('bodyController', function($scope, $http, $filter, $location, $sce, $templateRequest) {
    $scope.closeBtn = function(name) {
        $scope[name]["isShow"] = false;
        $scope.overlayIsShow = false;
    }

    var db = "20150410";

    if ($location.search().db) {
        db = $location.search().db;
    }

    $scope.$on("getTestCasePopUp", handleTestCasePopUp);

    function showPop(name, data,id) {
        $scope[name]["isShow"] = true;
        $scope[name]["Data"] = data.result;
        $scope[name]["Data"]["id"] =id;
    }

    function handleTestCasePopUp(e, id) {
        $scope.overlayIsShow = true;
        $scope.loadingIsShow = true;
        $scope["testCasePop"]=$scope["testCasePop"]={};
        $scope["testCasePop"].confirm=function(id){
            $http.post("/gamestate/" + db + "/update/"+id,$scope["testCasePop"].viewvalue).success(function(data) {
                alert(JSON.stringify(data.result));
                $scope["testCasePop"]["isShow"] = false;
                $scope.overlayIsShow = false;
                $scope.updateGameData();
            })
        }
        $http.get("/gamestate/" + db + "/manage/"+id).success(function(data) {
            $scope.popupUrl = "template/testCasePop.html";
            showPop("testCasePop", data,id);
            $scope.loadingIsShow = false;
        })
    }
});
