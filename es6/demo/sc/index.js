describe('ecma262 6th feature test', function() {
    it('instance method and instance getter', function(done) {
        System.import("main").then(function(a) {
            var g = new a.Classname("red");
            try {
                assert.equal(g.getColor(), g.color);
                done();
            } catch (e) {
                done(e);
            }
        });
    });
    it('static Method', function(done) {
        System.import("main").then(function(a) {
            try {
                assert.equal(a.Classname.getSize(3, 2), 6);
                done();
            } catch (e) {
                done(e);
            }

        });
    });

    it('extend Class extend a instance method extend getter', function(done) {
        System.import("main").then(function(a) {
            window.theobj = a;
            g = new a.ClassnameExtend("yello")
            try {
                assert.equal(g.getColorZells().join(""), '##yello:小明_sufixExtend##yello:小红_sufixExtend');
                done()
            } catch (e) {
                done(e)
            }
        });
    });
    it('arrow Func this fixed and string template', function(done) {
        System.import("main").then(function(a) {
            try {
                assert.equal(new a.Classname("fff").getColorZells().join(""), "#fff:小明#fff:小红");
                done();
            } catch (e) {
                done(e);
            }

        });
    });
    it('destructure param and default value and template methods', function(done) {
        System.import("main").then(function(a) {
            var w = a.getJSON("url", {
                password: "pwd",
                name: "name"
            }, {
                isDebug: true,
                contentType: "html"
            }, function() {
                return "cbStr"
            });
            try {
                assert.equal(w, 'i will sent tourl,with isDebug=true,contentType=htmlpassword:pwd,name:name cbRst:cbStr using post method {"a":1,"b":2,"c":{"d":2}}hehe');
                done()
            } catch (e) {
                done(e)
            }
        });
    });
    it('newObjLiterals prototyping simpify same name property dymPropName', function(done) {
        System.import("main").then(function(a) {
            var w = a.testnewObjLiterals;
            var q = a.protoTest;
            try {
                assert.equal(w.a(), q.a());
                w.b = 20
                assert.notEqual(w.a(), q.a());
                assert.equal(w.a(), 20);
                assert.equal(w.hehe123, 123);
                assert.equal(w.array2, 4343);
                done()
            } catch (e) {
                done(e)
            }
        });
    });
});
