/**author:z.w*/

$.fn.fullscreenScroll = function(command, data) {

  function noop() {}

  function erTxt(txt) {
    return ["[fullscreenScroll]", txt].join('');
  }

  function implementsShowNext(src, done) {
    var root = $(this);
    var ww = $(window).width();
    var curruntDisplayer = $(".fullscreenScroll_displayer", this);

    var tempLayer = $('<img class="fullscreenScroll_displayerTemp" src="' + src + '"/>').hide().bind("load", function() {
      var el = $(this),
        ew = el.width();
      var renderDisplayer = $(root).data("renderDisplayer");
      renderDisplayer.call(root, true);

      el.css({
        left: ww,
        top: "50%",
        "margin-top": -el.height() / 2
      }).show();

      tempLayer.animate({
        left: -(ew - ww) / 2
      }, {
        duration: parseInt($(root).data("fullscreenScroll_duration")),
        easing: $(root).data("fullscreenScroll_easing"),
        progress: function progress(aPromised, _progress, time) {
          curruntDisplayer.css({
            left: 50 - 50 * _progress + "%"
          });
        },
        complete: function complete() {
          curruntDisplayer.remove();
          tempLayer.removeClass("fullscreenScroll_displayerTemp").addClass("fullscreenScroll_displayer");
          renderDisplayer.call(root, false);
          $(root).data("onanimatecomplete")();
          done();
        }
      });
    });

    root.append(tempLayer);
  }

  function implementsShowPrev(src, done) {
    var root = $(this);
    var ww = $(window).width();
    var curruntDisplayer = $(".fullscreenScroll_displayer", root);

    var tempLayer = $('<img class="fullscreenScroll_displayerTemp" src="' + src + '"/>').hide().bind("load", function() {

      var el = $(this),
        ew = el.width();
      var renderDisplayer = $(root).data("renderDisplayer");
      renderDisplayer.call(root, false);

      el.css({
        right: ww,
        top: "50%",
        "margin-top": -el.height() / 2
      }).show();

      tempLayer.animate({
        right: -(ew - ww) / 2
      }, {
        duration:parseInt($(root).data("fullscreenScroll_duration")),
        easing: $(root).data("fullscreenScroll_easing"),
        progress: function progress(aPromised, _progress2, time) {
          curruntDisplayer.css({
            right: 50 - 50 * _progress2 + "%"
          });
        },
        complete: function complete() {
          curruntDisplayer.remove();
          tempLayer.removeClass("fullscreenScroll_displayerTemp").addClass("fullscreenScroll_displayer");
          renderDisplayer.call(root, false);
          $(root).data("onanimatecomplete")();
          done();
        }
      });
    });

    root.append(tempLayer);
  }

  function defaultRenderDisplayer(useLeft) {
    var el = $(".fullscreenScroll_displayer", this);
    var ew = el.width(),
      eh = el.height();
    if (useLeft) {
      el.css({
        top: "50%",
        left: "50%",
        "margin-left": -ew / 2,
        "margin-top": -eh / 2,
        right: "auto",
        "margin-right": "0"
      });
    } else {
      el.css({
        top: "50%",
        right: "50%",
        "margin-right": -ew / 2,
        "margin-top": -eh / 2,
        left: "auto",
        "margin-left": "0"
      });
    }
  }

  function init({
    data, renderDisplayer = defaultRenderDisplayer, showPrev = implementsShowPrev, showNext = implementsShowNext, onanimatecomplete = noop, duration = 500, easing = "fullscreenScrollaFn01"
  }) {
    $.extend($.easing, {
      fullscreenScrollaFn01: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;;
      },
      fullscreenScrollaFn02: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      fullscreenScrollaFn03: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
      }
    })
    var root = $(this);
    /*验证一下*/
    if (root.data("hasInit")) {
      return false;
    }
    if (!data) {
      throw new Error(erTxt("data.data needed"));
    }
    var root = $(this);
    /*重写默认主界面初始化样式*/

    /*可以实现的方法有renderDisplayer*/
    /*showNext和showPrev方法是动画滚动方法*/
    $(this).data("renderDisplayer", renderDisplayer);
    $(this).data("fullscreenScroll_duration", parseInt(duration));
    $(this).data("fullscreenScroll_easing", easing);
    $(this).data("showNext", showNext);
    $(this).data("showPrev", showPrev);
    $(this).data("onanimatecomplete", onanimatecomplete);

    /*样式注入*/
    var style = `
      .fullscreenScroll_link{
        width:100%;
        height:100%;
        position:absolute;
        z-index:3;
      }
      .fullscreenScroll_wrap {
        position: relative;
        margin: 0;
        padding: 0;
        height: 450px;
      }

      .fullscreenScroll_displayer,
      .fullscreenScroll_displayerTemp {
        position: absolute;
        margin: 0;
        padding: 0;
      }

      .fullscreenScroll_displayer {
        z-index: 1;
      }

      .fullscreenScroll_displayerTemp {
        z-index: 2;
        box-shadow: -4px 0px 8px -3px black;
      }
    `;
    $("head").append(["<style>", style, "</style>"].join(""));

    root.data("fullscreenData", data);

    root.data("curIndex", 0);

    root.css({
      "overflow": "hidden"
    }).addClass("fullscreenScroll_wrap");


    var displayer = $('<img class="fullscreenScroll_displayer" src="' + data[0].img + '">')
      .bind("load", function() {
        var renderDisplayer = $(root).data("renderDisplayer");
        renderDisplayer.call(root, true);
      });
    var linker = $('<a href="' + data[0].link + '" class="fullscreenScroll_link"></a>')
    root.append(displayer).append(linker);

    root.data("hasInit", true);
  }

  function prev(data) {
    jump.call(this, data, true);
  }

  function next(data) {
    jump.call(this, data, false)
  }

  function jump(data, isPrev) {

    var i = $(this).data("curIndex");

    var fullscreenData = $(this).data("fullscreenData");

    var l = fullscreenData.length;

    if (isPrev) {
      if (i - 1 < 0) {
        i = l - 1;
      } else {
        i--;
      }
    } else {
      if (i + 1 >= l) {
        i = 0;
      } else {
        i++;
      }
    }

    showIndex.call(this, {
      index: i,
      rev: isPrev ? false : true
    });

  }

  function showIndex(_ref2) {
    var isLock = $(this).data("fullscreenScrollLocked");
    if (isLock) {
      return false;
    }
    $(this).data("fullscreenScrollLocked", true);
    var index = _ref2.index;
    var rev = _ref2.rev;
    var fullscreenData = $(this).data("fullscreenData");
    $(this).data("curIndex", index);
    $(".fullscreenScroll_link", this).attr("href", fullscreenData[index].link);
    if (rev) {
      $(this).data("showNext").call(this, fullscreenData[index].img, () => $(this).data("fullscreenScrollLocked", false));
    } else {
      $(this).data("showPrev").call(this, fullscreenData[index].img, () => $(this).data("fullscreenScrollLocked", false));
    }
  }

  function getCurIndex() {
    return parseInt($(this).data("curIndex"));
  }
  var api = {
    next: {
      fn: next
    },
    showIndex: {
      fn: showIndex
    },
    prev: {
      fn: prev
    },
    init: {
      fn: init
    },
    curIndex: {
      fn: getCurIndex,
      isGetter: true
    }
  };

  function isGetter(cmdName) {
    return !!api[cmdName].isGetter;
  }

  if (api[command]) {
    if (isGetter(command)) {
      return api[command].fn.call(this, data);
    } else {
      api[command].fn.call(this, data);
    }
  }
  return $(this);
};
