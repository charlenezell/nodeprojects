var ffmpeg = require('fluent-ffmpeg');
var inquirer = require("inquirer");
var ProgressBar = require('progress');
// var datef = require('datef');
var lodash = require("lodash");
var glob = require("glob");
// var dest = process.cwd();
var path = require("path");
var fs = require('fs');
// var map = require('map-stream');
var asciify = require("asciify");


var defaultVideoCodec = "libx264";
var defaultAudioCodec = "libvo_aacenc";
var defaultAudioBitrate = 64;
var defaultAudioFrequency = 22050;
var defaultAudioChannels = 1;
var defaultVideoPaddingColor = "#000";
var pix_fmt = "yuv420p";
var totalLength=0;

asciify('Z-Trans', {
    color: "green",
    font: 'larry3d',
    maxWidth: 90
}, function(err, result) {
    console.log(result);
    inquirer.prompt([{
        type: "list",
        name: "mediaType",
        message: "转什么？",
        choices: ["audio(暂不支持)", "video"],
        default: "video"
    }, {
        type: "checkbox",
        name: "targetContainer",
        message: "目标格式(一式多份地生成目标格式)",
        choices: [{
                name: "mp4",
                checked: true
            }, {
                name: "webm"
            }
            /*, {
                        //这个不做因为webm是ogg的superset
                        name: "ogg"
                    }*/
        ],
        validate: function(answer) {
            if (answer.length < 1) {
                return "至少挑选一种格式哦~";
            }
            return true;
        }
    }, {
        type: "input",
        name: "srcGlob",
        message: "源目录路径(支持glob)"
    }, {
        type: "input",
        name: "outputPath",
        message: "产出路径",
        default:process.env.USERPROFILE+"\\Desktop\\Z-TransOutPut\\"
    }, {
        type: "list",
        name: "aspect",
        message: "视频比例",
        choices: ['4:3', '16:9'],
        when: function(answers) {
            return lodash.contains(answers.mediaType, "video");
        }
    },/*{
        type: "input",
        name: "size",
        message: "视频大小(number*number,number*?,?*number,percentage)",
        default:"100%",
        when: function(answers) {
            return lodash.contains(answers.mediaType, "video");
        }
    },*/ {
        type: "list",
        name: "mp4_profile",
        message: "MP4产出Profile选择:",
        choices: ["baseline", "main", "high"],
        default:"baseline",
        when: function(answers) {
            return lodash.contains(answers.targetContainer, "mp4");
        }
    }, {
        type: "input",
        name: "vbitrate",
        message: "视频的比特率",
        default: 200 * 8 * 0.8 + "k",
        when: function(answers) {
            return lodash.contains(answers.mediaType, "video");
        }
    }, {
        type: "input",
        name: "fps",
        message: "视频的帧率",
        default: 15,
        when: function(answers) {
            return lodash.contains(answers.mediaType, "video");
        }
    }], function(answers) {
        var _outputPath=path.dirname(answers.outputPath)+"\\"+path.basename(answers.outputPath)+"\\";
        // console.log("_outputPath:",_outputPath);
         console.log("输入配置:", answers);

        var queue = [];
        // console.log(answers.srcGlob);
        var videos=[];
        var i=1;
        glob.sync(answers.srcGlob).forEach(function(v, k) {
            var video=[];
            var webmDestPath=mp4DestPath=""
            if (lodash.contains(answers.targetContainer, "mp4")) {
                mp4DestPath=path.basename(v).replace(new RegExp(path.extname(v) + "$"), ".mp4");
                video.push({type:"mp4",src:mp4DestPath});
                // console.log(mp4DestPath)
                queue.push(getMp4Command(answers, v, queue,_outputPath,mp4DestPath,i++));
            }
            if (lodash.contains(answers.targetContainer, "webm")) {
                var webmDestPath=path.basename(v).replace(new RegExp(path.extname(v) + "$"), ".webm");
                video.push({type:"webm",src:webmDestPath});
                // console.log(webmDestPath)
                queue.push(getWebmCommand(answers, v, queue,_outputPath,webmDestPath,i++));
            }
            videos.push(video);
        });
        makeHTMLDemoFile(videos,_outputPath);
        if (queue.length > 0) {
            totalLength=queue.length;
            queue.shift()._run();
        } else {
            console.log("no file are selected ! ....hehe check the glob");
        }
    });
});

function makeHTMLDemoFile (videos,outputPath) {
    var p=path.resolve(__dirname,"..");
    var htmlT=fs.readFileSync(p+"/template/html.html".replace(/\//g,path.sep)).toString();
    var videoT=fs.readFileSync(p+"/template/video.html".replace(/\//g,path.sep)).toString();
    var sourceT=fs.readFileSync(p+"/template/source.html".replace(/\//g,path.sep)).toString();
    var htmlTC = lodash.template(htmlT);
    var videoTC = lodash.template(videoT);
    var sourceTC = lodash.template(sourceT);
    var typeMap={
        mp4:"video/mp4",
        webm:'video/webm; codecs="vp8, vorbis"'
    };
    var destHTML=videos.map(function(v,k){
        var sources=v.map(function(v,k){
            return sourceTC({
                src:v.src,
                type:typeMap[v.type]
            });
        }).join("");
        return videoTC({
            attributes:"autoplay preload='auto' controls",
            sources:sources
        });
    }).join("")

    fs.writeFileSync(outputPath+"demo.html",htmlTC({htmlContent:destHTML}));
}
function getWebmCommand(answers, v, queueRef,_outputPath,outputPathFileName,cur) {

    var command = ffmpeg(v)
        .videoBitrate(answers.vbitrate)
        .inputOption("-threads 20")
        .fps(answers.fps)
        .on('progress', function(progress) {
            command._bar.tick(progress.percent - command._lastTime);
            command._lastTime = progress.percent;
        })
        .on("end", function() {
            var w = null;
            w = queueRef.shift();
            if (w) {
                w._run();
            }
        });

    command._lastTime = 0;
    command._bar = new ProgressBar(" processing " + outputPathFileName + " [:bar] :percent :etas", {
        total: 100
    });
    command._run = function() {
        command.save(_outputPath + outputPathFileName);
    };
    return command;
}

function getMp4Command(answers, v, queueRef,_outputPath,outputPathFileName,cur) {
    var customString = "";
    var customStringArray = [];
    var command = ffmpeg(v)
    if (answers.mp4_profile) {
        command.outputOption("-profile:v " + answers.mp4_profile);
    }
    command
        .audioCodec(defaultAudioCodec)
        .audioBitrate(defaultAudioBitrate)
        // .size(answers.size)
        .aspect(answers.aspect)
        .autopad(defaultVideoPaddingColor)
        .keepDAR()
        .audioFrequency(defaultAudioFrequency)
        .audioChannels(defaultAudioChannels)
        .videoCodec(defaultVideoCodec)
        .videoBitrate(answers.vbitrate)
        .fps(answers.fps)
        // .outputOption("-pass 2")
        // .outputOption("-passlogfile d:/video/passlog")
        .inputOption("-threads 0")
        .outputOption("-pix_fmt " + pix_fmt)
        .on('progress', function(progress) {
            command._bar.tick(progress.percent - command._lastTime);
            command._lastTime = progress.percent;
        })
        .on("end", function() {
            var w = null;
            w = queueRef.shift();
            if (w) {
                w._run();
            }
        });

    command._lastTime = 0;
    command._bar = new ProgressBar(" processing " + outputPathFileName + " [:bar] :percent :etas", {
        total: 100
    });
    command._run = function() {
        command.save(_outputPath + outputPathFileName);
    };
    return command;
}
