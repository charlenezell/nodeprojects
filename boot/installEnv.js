var g={
    path:process.cwd()
};
var fs=require("fs");
fs.writeFileSync("env.json",JSON.stringify(g));
