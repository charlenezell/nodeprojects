var FfmpegCommand = require('fluent-ffmpeg');
var command = new FfmpegCommand();
var inquirer = require("inquirer");
// var datef = require('datef');
var lodash = require("lodash");
// var dest = process.cwd();
// var path=require("path");
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
        type:"list",
        name:"mediaType",
        message:"转什么？",
        choices:["audio","video"]
    },{
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
        name:"mp4_profile",
        message:"MP4产出Profile选择:",
        choices:["baseline","main","high"],
        when:function(answers){
            return lodash.contains(answers.targetContainer,"mp4");
        }
    },{
        type:"input",
        name:"vbitrate",
        default:200*8*0.8+"k",
        when:function(answers){
            return lodash.contains(answers.mediaType,"video");
        }
    },{
        type:"input",
        name:"fps",
        default:15,
        when:function(answers){
            return lodash.contains(answers.mediaType,"video");
        }
    }], function(answers) {
        var defaultVideoCodec="libx264";
        var defaultAudioCodec="libfaac";
        var pix_fmt="yuv420p";
        console.log("final:",answers);
    });
});
