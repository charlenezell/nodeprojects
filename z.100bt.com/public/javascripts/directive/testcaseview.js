myapp.directive('testConfigPreviewer', function() {
    function insertNestContainerStyle() {
    var s = '',
        selector = "",
        addcontainerSelector = ".configItem " /*空格很重要*/ ,
        containerStr = "",
        sLight = 40,
        elight = 100;
    var tt = '${selector}{background-color:hsl(207,80%,${light}%);}'
    for (var i = sLight; i < elight; i = i + 20) {
        containerStr += addcontainerSelector;
        s += Util.template(tt, {
            selector: containerStr,
            light: i,
            rlight:100-i
        });
    }
    var i = $('<style type="text/css" id="nestContainer"></style>');
    i.text(s).appendTo("head");
}
if(!window.hasInsertTestConfigPreviewerCSS){
    insertNestContainerStyle();
    window.hasInsertTestConfigPreviewerCSS=true;
}

    function getFieldHTML(v,path,gamedata){
        var toolBar='<a class="toolbarbtns" data-wysihtml5-command="bold" title="CTRL+B">bold</a>\
    <a class="toolbarbtns" data-wysihtml5-command="italic" title="CTRL+I">italic</a>\
    <a class="toolbarbtns" data-wysihtml5-command="insertOrderedList">insertOrderedList</a>\
    <a class="toolbarbtns colorred" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="red">red</a>\
    <a class="toolbarbtns colorgreen" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="green">green</a>\
    <a class="toolbarbtns colorblue" data-wysihtml5-command="foreColor" data-wysihtml5-command-value="blue">blue</a>\
    <a class="toolbarbtns htmlswitch" data-wysihtml5-action="change_view">switch to html view</a>';
        var typeHtmlMap={
            "stringLong":'<div><div class="toolbar">'+toolBar+'</div><textarea id="${fieldName}" ng-change="testCasePop.changeInput()" name="testCaseField" cols="10" rows="10" data-postdataname="${fieldName}" class="stringLongarea">${value}</textarea></div>',
            "stringSort":'<div><div class="toolbar">'+toolBar+'</div><input type="text" id="${fieldName}" ng-change="testCasePop.changeInput()" name="testCaseField" data-postdataname="${fieldName}" value="${value}"></div>'
        };

        var defaultField={
            "content":"stringLong"
        };

        var fieldsObj=_.omit(v, 'name','child');
        if(_.keys(fieldsObj).length<=0){
            fieldsObj={content:""};
        }
        var htmls=_.keys(fieldsObj).map(function(v){
            var t=typeHtmlMap[v]?typeHtmlMap[v]:typeHtmlMap["stringLong"];
            var curValue=gamedata[path+"_"+v];
            return Util.template(t,{
                id:path+"_"+v,
                key:v,
                fieldName:path+"_"+v,
                value:curValue?curValue:""
            });
        });
        return htmls;
    }

    function buildConfigDataHTML(data,isArray,$scope,mode,_gamedata) {
        try{
            var gamedata=eval('(' + _gamedata + ')');
        }catch(e){
            alert(e);
        }
        var itemT=""
        if(mode=="write"){
            itemT = '<div class="configItem"><span class="name">${name}</span>${inputHTML}${childHTML}</div>';
        }else{
            itemT = '<div class="configItem"><span class="name">${name}</span>${childHTML}</div>';
        }

        try {
            if(!isArray){
            a = eval('(' + data + ')');
            }else{
                a=data;
            }
            var g = a.map(function(v) {
                return Util.template(itemT, {
                    name: v.name,
                    childHTML: getChildHTML(v,v.name)
                    // inputHTML:getFieldHTML(v,v.name,gamedata)
                })
            }).join("")
            $scope.error=null;
            return ['<div class="configItem"><span class="name">测试项配置如下:</span>',g,'</div>'].join("");
        } catch (e) {
            $scope.error="格式有误";
            return [];
        }

        function getChildHTML(root,path) {
            if (root.child && root.child.length > 0) {
                return root.child.map(function(v, k) {
                    return Util.template(itemT, {
                        name: v.name,
                        childHTML: getChildHTML(v,path+"_"+v.name),
                        inputHTML:mode=="write"?getFieldHTML(v,path+"_"+v.name,gamedata):""
                    });
                }).join("");
            } else {
                return ""
            }
        }
    }

    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: true, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<div></div>',
        // templateUrl: '',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            $scope["testCasePop"]&&($scope["testCasePop"].changeInput=function(){
                $scope["testCasePop"].viewvalue={};
                iElm.find("[name=testCaseField]").each(function(k,v){
                    $scope["testCasePop"].viewvalue[$(v).attr("id")]=$(v).data("editor").getValue();
                });
            });


            if(iAttrs.mode!="write"){
                $scope.$watch(iAttrs.testConfigPreviewer, function(value) {
                    if(!value){return ;}
                    iElm.html(buildConfigDataHTML(value,$.isArray(value),$scope,iAttrs.mode,iAttrs.gamedata));

                });
            }else{
                iElm.html(buildConfigDataHTML($scope.testCasePop.Data.config.testCaseConfig,$.isArray($scope.testCasePop.Data.config.testCaseConfig),$scope,iAttrs.mode,iAttrs.gamedata));
                iElm.find("[name=testCaseField]").each(function(k,v){
                    var editor = new wysihtml5.Editor(v, {
                      stylesheets:    "stylesheets/editstylesheet.css",
                      parserRules:    wysihtml5ParserRules
                    });
                    editor.on("change",$scope["testCasePop"].changeInput);
                    var toolbar = new wysihtml5.toolbar.Toolbar(editor,$(v).siblings(".toolbar")[0]);
                    $(v).data("editor",editor);
                })
            }

        }
    };
});
