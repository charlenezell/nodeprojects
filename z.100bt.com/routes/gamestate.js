var express = require('express');
var router = express.Router();
var child_process = require("child_process");
var url = require("url");
var GPath = require("path");
var glob = require("glob");
var low = require('lowdb');
low.mixin(require('underscore-db'))
var ld = require("lodash");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var ip2Name = {
    "10.18.6.209": {
        name: "浩源",
        rule:"dev"
    },
    "10.18.6.22": {
        name: "观健",
        rule:"dev"
    },
    "127.0.0.1": {
        name: "oss",
        rule:"admin"
    },
    "10.18.6.12": {
        name: "光耀",
        rule:"admin"
    },
    "10.18.6.67": {
        name: "建强",
        rule:"dev"
    },
    "10.18.6.65": {
        name: "秀平",
        rule:"dev"
    },
    "10.18.6.71": {
        name: "奋畔",
        rule:"dev"
    },
    "10.18.6.63": {
        name: "清丽",
        rule:"test"
    },
    "10.18.6.82": {
        name: "成向",
        rule:"test"
    },
    "10.18.6.246": {
        name: "宝玉",
        rule:"test"
    }
};

/* GET users listing. */
process.chdir("..");

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

router.get('/', function(req, res, next) {
    res.send('没这个api哦...');
});
router.get('/:datestr', function(req, res, next) {
    res.send('没这个api哦...');
});

router.get('/:datestr/query', function(req, res, next) {
    var _date = req.params.datestr;
    var db = low(_date + '.json');
    var source = glob.sync("Z:/豆豆游戏/" + _date + "/*").map(function(v) {
        return GPath.basename(v)
    });
    var clones = ld(db("games").cloneDeep());
    var data = clones.sortBy("priority").map(function(v) {
        v.author = ip2Name[v.ip + ""] ? ip2Name[v.ip + ""].name : v.ip;
        v.testor = (function() {
            var str = null;
            if (!v.testIp) {

            } else if (ld.isString(v.testIp)) {
                str = ip2Name[v.testIp + ""] ? ip2Name[v.testIp + ""].name : v.testIp;
            } else if (ld.isArray(v.testIp)) {
                str = v.testIp.map(function(iv) {
                    return ip2Name[iv + ""] ? ip2Name[iv + ""].name : iv;
                }).join("")
            }
            return str;
        })();
        if (ld.contains(source, v.name)) {
            v.hasArt = true;
        } else {
            v.hasArt = false;
        }
        return v
    }).value();
    res.json({
        result: data,
        code: 1,
        clientIp: getClientIp(req),
        clientRule:ip2Name[getClientIp(req)]?ip2Name[getClientIp(req)].rule:""
    });
});
router.get('/:datestr/export', function(req, res, next) {
    console.log(req);
    var _date = req.params.datestr;
    var db = low(_date + '.json');
    var xlsx = require('node-xlsx');
    var data = [
        ["名字", "链接", "备注", "开发","测试"]
    ];
    var _query=req.query;
    var clones = ld(db("games").cloneDeep()).value();
    if(_query.type&&_query.type=="nocomplete"){
        clones=clones.filter(function(v){
            if(!v.testcomplete){return true;}else{return false;}
        })
    }
    clones.forEach(function(v) {
        var testor = (function() {
            var str = null;
            if (!v.testIp) {

            } else if (ld.isString(v.testIp)) {
                str = ip2Name[v.testIp + ""] ? ip2Name[v.testIp + ""].name : v.testIp;
            } else if (ld.isArray(v.testIp)) {
                str = v.testIp.map(function(iv) {
                    return ip2Name[iv + ""] ? ip2Name[iv + ""].name : iv;
                }).join(",")
            }
            return str
        })();
        var author = ip2Name[v.ip + ""] ? ip2Name[v.ip + ""].name : v.ip;
        data.push([v.name, v.link || "空", v.memo || "空", author||"空", testor||"空"]);
    });

    var buffer = xlsx.build([{
        name: "豆豆游戏",
        data: data
    }]); // returns a buffer
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
});
router.get('/:datestr/manage', function(req, res, next) {
    var _date = req.params.datestr;
    var db = low(_date + '.json');
    db.object.info=db.object.info||{};
    res.json({
        result: ld(ld(db.object.info).cloneDeep()).extend({gameDataPath:GPath.join(process.cwd(),_date + '.json'),testTreeDataPath:GPath.join(process.cwd(),_date + '_testTree.json')}).value(),
        code: 1,
        clientIp: getClientIp(req)
    });
});

router.get('/:datestr/:action', function(req, res, next) {
    res.json({
        code: -1,
        result: "no this action"
    });
});



router.post('/:datestr/create', multipartMiddleware, function(req, res, next) {
    var _date = req.params.datestr;
    var _params = {
        name: req.body.name,
        priority: req.body.priority || '3'
    };
    if (!_params.name) {
        res.json({
            result: 'name is require field ',
            code: -1
        });
    }else{
        var db = low(_date + '.json')
        var rst = db("games").insert(_params);
        res.json({
            result: rst,
            code: 1
        });
    }
})
router.post('/:datestr/import', multipartMiddleware, function(req, res, next) {
    var _date = req.params.datestr;
    var _params = {
        name: req.body.name,
        priority: req.body.priority || '3'
    };
    var isAppend=req.body.isAppendData=="1";
    var xlsx = require('node-xlsx');
    if (req.files.importxlsx) {
        var obj = xlsx.parse(req.files.importxlsx.path);
        var db = low(_date + '.json')
        var games = db("games");
        if(!isAppend){
            /*如果不是增量的话就删除游戏*/
            games.splice(0);
            db.save();
        }

        function getPriorityName(name) {
            var g = {
                "高": 1,
                "中": 2,
                "低": 3
            };
            return g[name] || g["低"];
        }
        obj[0].data.slice(1).forEach(function(v) {
            games.insert({
                name: v[0],
                reflink: v[1],
                shareword: v[2],
                priority: getPriorityName(v[3])
            })
        })
        res.json({
            result: "ok",
            code: 1
        });
    } else {
        res.json({
            result: "importxlsxnotfind",
            code: -1
        });
    }
});
router.post('/:datestr/manage', multipartMiddleware, function(req, res, next) {
    var _date = req.params.datestr;
    if(req.body.testCaseConfig){
        try{
            var s=eval('('+req.body.testCaseConfig+')');
            var db = low(_date + '.json');
            db.object._bkinfo=db.object.info;
            db.object.info=db.object.info||{}
            db.object.info.testCaseConfig=s;
            db.save();
            res.json({
                result: "ok",
                code: 1
            });
        }catch(e){
            res.json({
                result: "出现这个错误:-->"+e,
                code: -1
            });
        }
    }
});

router.post('/:datestr/:action', multipartMiddleware, function(req, res, next) {
   res.json({
       code: -1,
       result: "no this action"
   });
});

/*filter*/
router.get('/:datestr/:action/:id', function(req, res, next) {
     req.___date=req.params.datestr;
     req.___id=req.params.id;
    if (req.___id === void(0)) {
        res.json({
            result: 'fail no id',
            code: -1
        });
    }else{
        next();
    }
});

router.get('/:datestr/delete/:id', function(req, res, next) {
    var _date = req.___date;
    var _id = req.___id;
    var db = low(_date + '.json')
    var rst = db("games").remove(_id)
    res.json({
        result: 'delete success',
        code: rst
    });
});
function getDataById(_date,_id){
    var db = low(_date + '.json');
    var source = glob.sync("Z:/豆豆游戏/" + _date + "/*").map(function(v) {
        return GPath.basename(v)
    });
    var clones = ld(db("games").cloneDeep());
    var data = clones.find({id:_id});
    if(data){
        data.author = ip2Name[data.ip + ""] ? ip2Name[data.ip + ""].name : data.ip;
        data.testor = (function() {
            var str = null;
            if (!data.testIp) {

            } else if (ld.isString(data.testIp)) {
                str = ip2Name[data.testIp + ""] ? ip2Name[data.testIp + ""].name : data.testIp;
            } else if (ld.isArray(data.testIp)) {
                str = data.testIp.map(function(iv) {
                    return ip2Name[iv + ""] ? ip2Name[iv + ""].name : iv;
                }).join("")
            }
            return str;
        })();
        if (ld.contains(source, data.name)) {
            data.hasArt = true;
        } else {
            data.hasArt = false;
        }
    }else{
        data={}
    }
    return data;
}
router.get('/:datestr/query/:id', function(req, res, next) {
    var _date = req.___date;
    var _id = req.___id;
    var data=getDataById(_date,_id);
    res.json({
        result: data,
        code: 1,
        clientIp: getClientIp(req),
        clientRule:ip2Name[getClientIp(req)]?ip2Name[getClientIp(req)].rule:""
    });
});
router.get('/:datestr/manage/:id', function(req, res, next) {
    var _date = req.___date;
    var _id=req.___id;
    var db = low(_date + '.json');
    db.object.info=db.object.info||{};
    var singleData=getDataById(_date,_id);
    res.json({
        result: {
            config:ld(ld(db.object.info).cloneDeep()).extend({
            gameDataPath: GPath.join(process.cwd(), _date + '.json')
        }).value(),
            game:singleData
        },
        code: 1,
        clientIp: getClientIp(req)
    });
});
/*catchnomatch*/
router.get('/:datestr/:action/:id', function(req, res, next) {
     res.json({
            result: 'no this action ' + _action,
            code: -1
        });
});





/*filter*/
router.post('/:datestr/:action/:id', function(req, res, next) {
    var _id = req.params.id;
    var _params = {}
    // var allowFields = ["name", "priority", "link", "memo", "actcomplete", "sharecomplete"];
    // allowFields.forEach(function(v) {
    //     if (!ld.isUndefined(req.body[v])) {
    //         _params[v] = req.body[v]
    //     }
    // })
    req.___params=req.body;
    req.___date=req.params.datestr;
    req.___id=_id;
    if (_id === void(0)) {
        res.json({
            result: 'fail no id',
            code: -1
        });
    }else{
        next();
    }
})

router.post('/:datestr/update/:id', function(req, res, next) {
    var _date = req.___date;
    var _id = req.___id;
    var _params=req.___params;
    var db = low(req.___date + '.json')
    console.log(_params);
    var rst = db("games").chain().find({
        id: req.___id
    }).assign(_params).value();
    db.save();
    res.json({
        result: rst,
        code: 1
    });
});
router.post('/:datestr/lockTest/:id', function(req, res, next) {
    var _date = req.___date;
    var _id = req.___id;
    var _params=req.___params;
    var db = low(_date + '.json')
    _params.testIp = getClientIp(req);
    var orgips = db("games").chain().find({
        id: _id
    }).value();
    if (ld.isUndefined(orgips.testIp) || ld.isNull(orgips.testIp)) {
        orgips.testIp = []
        orgips.testIp.push(_params.testIp);
    } else if (ld.isString(orgips.testIp)) {
        orgips.testIp = [orgips.testIp]
        orgips.testIp.push(_params.testIp);
    } else if (ld.isArray(orgips.testIp)) {
        orgips.testIp.push(_params.testIp);
    }
    var rst = db.save();
    res.json({
        result: rst,
        code: 1
    });
});
router.post('/:datestr/unlockTest/:id', function(req, res, next) {
    var _date = req.___date;
    var _id = req.___id;
    var _params=req.___params;

    var clientIp = getClientIp(req);
    var db = low(_date + '.json')
    var orgips = db("games").chain().find({
        id: _id
    }).value();
    if (ld.isString(orgips.testIp)) {
        if (orgips.testIp == clientIp) {
            orgips.testIp = [];
        }
    } else if (ld.isArray(orgips.testIp)) {
        var pos = orgips.testIp.indexOf(clientIp + "")
        if (pos > -1) {
            orgips.testIp.splice(pos, 1);
        }
    }

    var rst=db.save();
    res.json({
        result: rst,
        code: 1
    });

});
router.post('/:datestr/lockDev/:id', function(req, res, next) {
    var _date = req.___date;
        var _id = req.___id;
        var _params=req.___params;

    var db = low(_date + '.json')
    _params.ip = getClientIp(req);
    var rst = db("games").chain().find({
        id: _id
    }).assign(_params).value();
    db.save();
    res.json({
        result: rst,
        code: 1
    });

});
router.post('/:datestr/unlockDev/:id', function(req, res, next) {
    var _date = req.___date;
        var _id = req.___id;
        var _params=req.___params;

    var db = low(_date + '.json')
    _params.ip = null;
    var rst = db("games").chain().find({
        id: _id
    }).assign(_params).value();
    db.save();
    res.json({
        result: rst,
        code: 1
    });

});

/*catchnomatch*/
router.post('/:datestr/:action/:id', function(req, res, next) {
    res.json({
        result: 'nothisaction ' + _action,
        code: -1
    });
});



module.exports = router;
