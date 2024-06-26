/**
 * wordfindgame.js
 * Script to create the GUI
 * Wordfindgame.js
 * (c) 2012 Bill, BunKat LLC.
 * Wordfind is freely distributable under the MIT license.
 * For all details and documentation: http://github.com/bunkat/wordfind
 */
!(function (e, t, n) {
  "use strict";
  var r = function () {
    var r,
      o,
      a,
      l = function (e, n) {
        for (var r = "", o = 0, a = n.length; a > o; o++) {
          var l = n[o];
          r += "<div>";
          for (var u = 0, s = l.length; s > u; u++)
            (r += '<button class="puzzleSquare" x="' + u + '" y="' + o + '">'),
              (r += l[u] || "&nbsp;"),
              (r += "</button>");
          r += "</div>";
        }
        t(e).html(r);
      },
      u = function (e, n) {
        for (var r = "<ul>", o = 0, a = n.length; a > o; o++) {
          var l = n[o];
          r += '<li class="word ' + l + '">' + l;
        }
        (r += "</ul>"), t(e).html(r);
      },
      s = [],
      i = "",
      d = function () {
        t(this).addClass("selected"),
          (o = this),
          s.push(this),
          (i = t(this).text());
      },
      c = function (e) {
        if (o) {
          var n = s[s.length - 1];
          if (n != e) {
            for (var r, l = 0, u = s.length; u > l; l++)
              if (s[l] == e) {
                r = l + 1;
                break;
              }
            for (; r < s.length; )
              t(s[s.length - 1]).removeClass("selected"),
                s.splice(r, 1),
                (i = i.substr(0, i.length - 1));
            var d = p(
              t(o).attr("x") - 0,
              t(o).attr("y") - 0,
              t(e).attr("x") - 0,
              t(e).attr("y") - 0
            );
            d &&
              ((s = [o]),
              (i = t(o).text()),
              n !== o && (t(n).removeClass("selected"), (n = o)),
              (a = d));
            var c = p(
              t(n).attr("x") - 0,
              t(n).attr("y") - 0,
              t(e).attr("x") - 0,
              t(e).attr("y") - 0
            );
            c && ((a && a !== c) || ((a = c), h(e)));
          }
        }
      },
      f = function (t) {
        var n = t.originalEvent.touches[0].pageX,
          r = t.originalEvent.touches[0].pageY,
          o = e.elementFromPoint(n, r);
        c(o);
      },
      v = function () {
        c(this);
      },
      h = function (e) {
        for (var n = 0, o = r.length; o > n; n++)
          if (0 === r[n].indexOf(i + t(e).text())) {
            t(e).addClass("selected"), s.push(e), (i += t(e).text());
            break;
          }
      },
      z = function () {
        for (var e = 0, n = r.length; n > e; e++)
          r[e] === i &&
            (t(".selected").addClass("found"),
            r.splice(e, 1),
            t("." + i).addClass("wordFound")),
            0 === r.length && t(".puzzleSquare").addClass("complete");
        t(".selected").removeClass("selected"),
          (o = null),
          (s = []),
          (i = ""),
          (a = null);
      },
      p = function (e, t, r, o) {
        for (var a in n.orientations) {
          var l = n.orientations[a],
            u = l(e, t, 1);
          if (u.x === r && u.y === o) return a;
        }
        return null;
      };
    return {
      create: function (e, o, a, s) {
        r = e.slice(0).sort();
        var i = n.newPuzzle(e, s);
        return (
          l(o, i),
          u(a, r),
          window.navigator.msPointerEnabled
            ? (t(".puzzleSquare").on("MSPointerDown", d),
              t(".puzzleSquare").on("MSPointerOver", c),
              t(".puzzleSquare").on("MSPointerUp", z))
            : (t(".puzzleSquare").mousedown(d),
              t(".puzzleSquare").mouseenter(v),
              t(".puzzleSquare").mouseup(z),
              t(".puzzleSquare").on("touchstart", d),
              t(".puzzleSquare").on("touchmove", f),
              t(".puzzleSquare").on("touchend", z)),
          i
        );
      },
      //   solve: function (e, r) {
      //     for (var o = n.solve(e, r).found, a = 0, l = o.length; l > a; a++) {
      //       var u = o[a].word,
      //         s = o[a].orientation,
      //         i = o[a].x,
      //         d = o[a].y,
      //         c = n.orientations[s];
      //       if (!t("." + u).hasClass("wordFound")) {
      //         for (var f = 0, v = u.length; v > f; f++) {
      //           var h = c(i, d, f);
      //           t('[x="' + h.x + '"][y="' + h.y + '"]').addClass("solved");
      //         }
      //         t("." + u).addClass("wordFound");
      //       }
      //     }
      //   },
      solve: function (e, words) {
        var result = n.solve(e, words);
        if (result) {
          var foundWords = result.found || [];
          for (var i = 0; i < foundWords.length; i++) {
            var word = foundWords[i].word;
            var orientation = foundWords[i].orientation;
            var x = foundWords[i].x;
            var y = foundWords[i].y;
            var direction = n.orientations[orientation];
            if (!t("." + word).hasClass("wordFound")) {
              for (var j = 0; j < word.length; j++) {
                var cell = direction(x, y, j);
                t('[x="' + cell.x + '"][y="' + cell.y + '"]').addClass(
                  "solved"
                );
              }
              t("." + word).addClass("wordFound");
            }
          }
        }
      },
    };
  };
  window.wordfindgame = r();
})(document, jQuery, wordfind);
