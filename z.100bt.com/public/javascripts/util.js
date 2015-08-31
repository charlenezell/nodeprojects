var Util={
    template:function (str, data, regexp) {
        return str.replace(regexp || /\${([^{}]*)}/g, function (str, p1) {
            return (data[p1]!==undefined&&data[p1]!==null&&data[p1].toString())||"";
        });
    }
}
