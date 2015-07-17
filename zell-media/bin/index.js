var ffmpeg = require('fluent-ffmpeg');
var inquirer = require("inquirer");
var ProgressBar = require('progress');
// var datef = require('datef');
var lodash = require("lodash");
var glob = require("glob");
// var dest = process.cwd();
var path = require("path");
// var fs = require('vinyl-fs');
// var map = require('map-stream');
var asciify = require("asciify");


var defaultVideoCodec = "libx264";
var defaultAudioCodec = "libvo_aacenc";
var defaultAudioBitrate = 64;
var defaultAudioFrequency = 22050;
var defaultAudioChannels = 2;
var defaultVideoPaddingColor = "#000";
var pix_fmt = "yuv420p";


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
    }, {
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
        console.log("final:", answers);
        var queue = [];
        console.log(answers.srcGlob);

        glob.sync(answers.srcGlob).forEach(function(v, k) {
            if (lodash.contains(answers.targetContainer, "mp4")) {
                queue.push(getMp4Command(answers, v, queue));
            }
            if (lodash.contains(answers.targetContainer, "webm")) {
                queue.push(getWebmCommand(answers, v, queue));
            }
        });

        if (queue.length > 0) {
            queue.pop()._run();
        } else {
            console.log("no file are selected ! ....hehe check the glob");
        }
    });
});

function getWebmCommand(answers, v, queueRef) {
    var outputPathFileName=path.basename(v).replace(new RegExp(path.extname(v) + "$"), ".webm")
    var command = ffmpeg(v)
        .videoBitrate(answers.vbitrate)
        .inputOption("-threads 0")
        .fps(answers.fps)
        .on('progress', function(progress) {
            command._bar.tick(progress.percent - command._lastTime);
            command._lastTime = progress.percent;
        })
        .on("end", function() {
            var w = null;
            w = queueRef.pop();
            if (w) {
                w._run();
            }
        });

    command._lastTime = 0;
    command._bar = new ProgressBar(" processing " + outputPathFileName + " [:bar] :percent :etas", {
        total: 100
    });
    command._run = function() {
        command.save(answers.outputPath + outputPathFileName);
    };
    return command;
}

function getMp4Command(answers, v, queueRef) {
    var outputPathFileName=path.basename(v).replace(new RegExp(path.extname(v) + "$"), ".mp4");
    var customString = "";
    var customStringArray = [];
    var command = ffmpeg(v)
    if (answers.mp4_profile) {
        command.outputOption("-profile:v " + answers.mp4_profile);
    }
    command
        .audioCodec(defaultAudioCodec)
        .audioBitrate(defaultAudioBitrate)
        .keepDAR()
        .audioFrequency(defaultAudioFrequency)
        .aspect(answers.aspect)
        .audioChannels(defaultAudioChannels)
        .videoCodec(defaultVideoCodec)
        .videoBitrate(answers.vbitrate)
        .fps(answers.fps)
        // .outputOption("-pass 2")
        // .outputOption("-passlogfile d:/video/passlog")
        .inputOption("-threads 0")
        .outputOption("-pix_fmt " + pix_fmt)
        .autopad(defaultVideoPaddingColor)
        .on('progress', function(progress) {
            command._bar.tick(progress.percent - command._lastTime);
            command._lastTime = progress.percent;
        })
        .on("end", function() {
            var w = null;
            w = queueRef.pop();
            if (w) {
                w._run();
            }
        });

    command._lastTime = 0;
    command._bar = new ProgressBar(" processing "+outputPathFileName+"[:bar] :percent :etas", {
        total: 100
    });
    command._run = function() {
        command.save(answers.outputPath + path.basename(v));
    };
    return command;
}
