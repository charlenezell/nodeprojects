var inquirer = require("inquirer");
var gulp = require("gulp");
var handlebars = require('handlebars');
var dest = process.cwd();
var glob=require("glob");
inquirer.prompt([{
    type: "input",
    name: "T",
    message: "页面标题",
    default: "百田网页面标题"
}, {
    type: "input",
    name: "D",
    message: "页面描述",
    default: "百田网页面描述"
}, {
    type: "input",
    name: "K",
    message: "页面关键字",
    default: "百田网页面关键字"
}], function(answers) {

});
