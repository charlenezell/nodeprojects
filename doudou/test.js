// var grunt=require("grunt");
var commander=require("commander");

commander
    .version('0.1.0')
    .command('ls', '列出游戏的命令')
    .command('build <gamesArray> [option]','构造游戏命令')
    .parse(process.argv);

if(!commander.runningCommand){
    commander.help();
}



