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
var config = {};
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
        choices: ["audio", "video"]
    }, {
        type: "checkbox",
        name: "targetContainer",
        message: "目标格式(一式多份地生成目标格式)",
        choices: [{
            name: "mp4",
            checked: true
        }, {
            name: "webm"
        }, {
            name: "ogg"
        }],
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
        message: "产出路径"
    }, {
        type: "list",
        name: "mp4_profile",
        message: "MP4产出Profile选择:",
        choices: ["baseline", "main", "high"],
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
        var defaultVideoCodec = "libx264";
        var defaultAudioCodec = "libvo_aacenc";
        var pix_fmt = "yuv420p";
        console.log("final:", answers);
        var lastTime = 0;
        var queue = [];
        console.log(answers.srcGlob);

        glob.sync(answers.srcGlob).forEach(function(v, k) {
            var bar=new ProgressBar(" processing [:bar] :percent :etas", {
                total: 100
            });
            var command = ffmpeg(v).audioCodec(defaultAudioCodec).audioBitrate(64).audioChannels(2)
                .videoCodec(defaultVideoCodec).videoBitrate(answers.vbitrate).fps(answers.fps).autopad("#000").on('progress', function(progress) {
                    bar.tick(progress.percent - lastTime)
                    lastTime = progress.percent;
                }).on("end", function() {
                    var w = null;
                    lastTime=0;
                    w = queue.pop();
                    if (w) {
                        w._run();
                    }
                });
            command._run = function() {
                command.save(answers.outputPath + path.basename(v));
            }
            queue.push(command);
        });
        queue.pop()._run();
    });
});
