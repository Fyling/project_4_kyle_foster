(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};
app.key = "540e4c236775290b40b72fc239da1950";
app.baseUrl = "http://api.musixmatch.com/ws/1.1/";

//getUserInput
app.getUserInput = function () {
  $(".form__search").on("submit", function (e) {
    e.preventDefault();
    $(".list__results").empty();
    var userInput = $(".input__search").val();
    app.searchTracks(userInput);
    // animate scroll to section
    $(".section__results").fadeIn();
    $("html, body").animate({
      scrollTop: $("#results").offset().top
    }, 800);
  });
};

//searchTracks
app.searchTracks = function (userInput) {
  $.ajax({
    url: app.baseUrl + "track.search",
    method: "GET",
    dataType: "jsonp",
    data: {
      apikey: app.key,
      format: "jsonp",
      q_track_artist: "" + userInput,
      s_track_rating: "DESC"
    }
  }).then(function (res) {
    var trackList = res.message.body.track_list;
    app.getTrackInfo(trackList);
  });
};

//getTrackInfo (names and ids)
app.getTrackInfo = function (tracks) {
  var tracksObject = tracks.map(function (song) {
    return {
      track: "" + song.track.track_name,
      artist: "" + song.track.artist_name,
      id: "" + song.track.track_id
    };
  });

  app.displayResults(tracksObject);
};

//displayResults
app.displayResults = function (trackInfo) {
  for (var i = 0; i < 10; i++) {
    $(".list__results").append("\n      <li class =\"list__results__item\" id = \"" + trackInfo[i].id + "\">\n        <button class= \"btn__results\">\n          <h3 class=\"subHeading\">" + trackInfo[i].track + "</h3></br>\n          <p class=\"sectionText\">" + trackInfo[i].artist + "</p>         \n        </button>\n      </li>\n    ");
  }
};

$(".list__results").on("click", ".list__results__item", function () {
  app.chooseResult(this);
  $("input:radio").prop("checked", false);
});

//chooseResult
app.chooseResult = function (item) {
  var chosenTrackId = $(item).attr("id");
  app.getLyrics(chosenTrackId);

  $(".section__lyrics").fadeIn();
  $("html, body").animate({
    scrollTop: $("#lyrics").offset().top
  }, 800);
};

//getLyrics
app.getLyrics = function (id) {
  $.ajax({
    url: app.baseUrl + "track.lyrics.get",
    method: "GET",
    dataType: "jsonp",
    data: {
      apikey: app.key,
      format: "jsonp",
      track_id: "" + id
    }
  }).then(function (res) {
    var lyrics = res.message.body.lyrics.lyrics_body;
    var lyricsRemove = lyrics.split("...")[0];
    app.displayLyrics(lyricsRemove);
  });
};

//displayLyrics
app.displayLyrics = function (text) {
  $(".lyrics").text("" + text);
  app.cleanLyrics(text);
};

//cleanLyrics
app.cleanLyrics = function (text) {
  app.lyricsToBeTranslated = text.split("\n").join("xyz");
};

//getLanguage
$("input:radio").on("change", function () {
  var chosenLanguage = $(this).attr("id");
  app.translate(chosenLanguage, app.lyricsToBeTranslated);
});

//translate
app.translate = function (language, lyrics) {
  $.ajax({
    url: "https://api.funtranslations.com/translate/" + language,
    method: "GET",
    dataType: "json",
    data: {
      text: "" + lyrics,
      format: "json"
    }
  }).then(function (res) {
    var translatedLyrics = res.contents.translated;
    app.formatLyrics(translatedLyrics);
  }).fail(function () {
    console.log("Ajax failed");
  });
};

//formatLyrics
app.formatLyrics = function (text) {
  var formatText = text.split("xyz").join("\n");
  app.displayTranslatedLyrics(formatText);
};

//displayTranslatedLyrics
app.displayTranslatedLyrics = function (text) {
  $(".lyrics").text("" + text);
};

// STRETCH GOAL: speakTranslatedLyrics

//reset

app.init = function () {
  app.getUserInput();
  // app.chooseResult();
};

$(function () {
  app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxHQUFKLEdBQVUsa0NBQVY7QUFDQSxJQUFJLE9BQUosR0FBYyxtQ0FBZDs7QUFFQTtBQUNBLElBQUksWUFBSixHQUFtQixZQUFXO0FBQzVCLElBQUUsZUFBRixFQUFtQixFQUFuQixDQUFzQixRQUF0QixFQUFnQyxVQUFTLENBQVQsRUFBWTtBQUMxQyxNQUFFLGNBQUY7QUFDQSxNQUFFLGdCQUFGLEVBQW9CLEtBQXBCO0FBQ0EsUUFBTSxZQUFZLEVBQUUsZ0JBQUYsRUFBb0IsR0FBcEIsRUFBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsU0FBakI7QUFDQTtBQUNBLE1BQUUsbUJBQUYsRUFBdUIsTUFBdkI7QUFDQSxNQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FDRTtBQUNFLGlCQUFXLEVBQUUsVUFBRixFQUFjLE1BQWQsR0FBdUI7QUFEcEMsS0FERixFQUlFLEdBSkY7QUFPRCxHQWREO0FBZUQsQ0FoQkQ7O0FBa0JBO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLFVBQVMsU0FBVCxFQUFvQjtBQUNyQyxJQUFFLElBQUYsQ0FBTztBQUNMLFNBQVEsSUFBSSxPQUFaLGlCQURLO0FBRUwsWUFBUSxLQUZIO0FBR0wsY0FBVSxPQUhMO0FBSUwsVUFBTTtBQUNKLGNBQVEsSUFBSSxHQURSO0FBRUosY0FBUSxPQUZKO0FBR0osMkJBQW1CLFNBSGY7QUFJSixzQkFBZ0I7QUFKWjtBQUpELEdBQVAsRUFVRyxJQVZILENBVVEsZUFBTztBQUNiLFFBQU0sWUFBWSxJQUFJLE9BQUosQ0FBWSxJQUFaLENBQWlCLFVBQW5DO0FBQ0EsUUFBSSxZQUFKLENBQWlCLFNBQWpCO0FBQ0QsR0FiRDtBQWNELENBZkQ7O0FBaUJBO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLFVBQVMsTUFB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SUFUSCxDQVNRLGVBQU87QUFDWCxRQUFNLG1CQUFtQixJQUFJLFFBQUosQ0FBYSxVQUF0QztBQUNBLFFBQUksWUFBSixDQUFpQixnQkFBakI7QUFDRCxHQVpILEVBYUcsSUFiSCxDQWFRLFlBQU07QUFDVixZQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0QsR0FmSDtBQWdCRCxDQWpCRDs7QUFtQkE7QUFDQSxJQUFJLFlBQUosR0FBbUIsVUFBUyxJQUFULEVBQWU7QUFDaEMsTUFBTSxhQUFhLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbkI7QUFDQSxNQUFJLHVCQUFKLENBQTRCLFVBQTVCO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBLElBQUksdUJBQUosR0FBOEIsVUFBUyxJQUFULEVBQWU7QUFDM0MsSUFBRSxTQUFGLEVBQWEsSUFBYixNQUFxQixJQUFyQjtBQUNELENBRkQ7O0FBSUE7O0FBRUE7O0FBRUEsSUFBSSxJQUFKLEdBQVcsWUFBVztBQUNwQixNQUFJLFlBQUo7QUFDQTtBQUNELENBSEQ7O0FBS0EsRUFBRSxZQUFXO0FBQ1gsTUFBSSxJQUFKO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwcCA9IHt9O1xyXG5hcHAua2V5ID0gXCI1NDBlNGMyMzY3NzUyOTBiNDBiNzJmYzIzOWRhMTk1MFwiO1xyXG5hcHAuYmFzZVVybCA9IFwiaHR0cDovL2FwaS5tdXNpeG1hdGNoLmNvbS93cy8xLjEvXCI7XHJcblxyXG4vL2dldFVzZXJJbnB1dFxyXG5hcHAuZ2V0VXNlcklucHV0ID0gZnVuY3Rpb24oKSB7XHJcbiAgJChcIi5mb3JtX19zZWFyY2hcIikub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJChcIi5saXN0X19yZXN1bHRzXCIpLmVtcHR5KCk7XHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSAkKFwiLmlucHV0X19zZWFyY2hcIikudmFsKCk7XHJcbiAgICBhcHAuc2VhcmNoVHJhY2tzKHVzZXJJbnB1dCk7XHJcbiAgICAvLyBhbmltYXRlIHNjcm9sbCB0byBzZWN0aW9uXHJcbiAgICAkKFwiLnNlY3Rpb25fX3Jlc3VsdHNcIikuZmFkZUluKCk7XHJcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxyXG4gICAgICB7XHJcbiAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI3Jlc3VsdHNcIikub2Zmc2V0KCkudG9wXHJcbiAgICAgIH0sXHJcbiAgICAgIDgwMFxyXG4gICAgKTtcclxuXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vL3NlYXJjaFRyYWNrc1xyXG5hcHAuc2VhcmNoVHJhY2tzID0gZnVuY3Rpb24odXNlcklucHV0KSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHVybDogYCR7YXBwLmJhc2VVcmx9dHJhY2suc2VhcmNoYCxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25wXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGFwaWtleTogYXBwLmtleSxcclxuICAgICAgZm9ybWF0OiBcImpzb25wXCIsXHJcbiAgICAgIHFfdHJhY2tfYXJ0aXN0OiBgJHt1c2VySW5wdXR9YCxcclxuICAgICAgc190cmFja19yYXRpbmc6IFwiREVTQ1wiXHJcbiAgICB9XHJcbiAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgY29uc3QgdHJhY2tMaXN0ID0gcmVzLm1lc3NhZ2UuYm9keS50cmFja19saXN0O1xyXG4gICAgYXBwLmdldFRyYWNrSW5mbyh0cmFja0xpc3QpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy9nZXRUcmFja0luZm8gKG5hbWVzIGFuZCBpZHMpXHJcbmFwcC5nZXRUcmFja0luZm8gPSBmdW5jdGlvbih0cmFja3MpIHtcclxuICBjb25zdCB0cmFja3NPYmplY3QgPSB0cmFja3MubWFwKHNvbmcgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHJhY2s6IGAke3NvbmcudHJhY2sudHJhY2tfbmFtZX1gLFxyXG4gICAgICBhcnRpc3Q6IGAke3NvbmcudHJhY2suYXJ0aXN0X25hbWV9YCxcclxuICAgICAgaWQ6IGAke3NvbmcudHJhY2sudHJhY2tfaWR9YFxyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgYXBwLmRpc3BsYXlSZXN1bHRzKHRyYWNrc09iamVjdCk7XHJcbn07XHJcblxyXG4vL2Rpc3BsYXlSZXN1bHRzXHJcbmFwcC5kaXNwbGF5UmVzdWx0cyA9IGZ1bmN0aW9uKHRyYWNrSW5mbykge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgJChcIi5saXN0X19yZXN1bHRzXCIpLmFwcGVuZChgXHJcbiAgICAgIDxsaSBjbGFzcyA9XCJsaXN0X19yZXN1bHRzX19pdGVtXCIgaWQgPSBcIiR7dHJhY2tJbmZvW2ldLmlkfVwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9IFwiYnRuX19yZXN1bHRzXCI+XHJcbiAgICAgICAgICA8aDMgY2xhc3M9XCJzdWJIZWFkaW5nXCI+JHt0cmFja0luZm9baV0udHJhY2t9PC9oMz48L2JyPlxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJzZWN0aW9uVGV4dFwiPiR7dHJhY2tJbmZvW2ldLmFydGlzdH08L3A+ICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvbGk+XHJcbiAgICBgKTtcclxuICB9XHJcbn07XHJcblxyXG4kKFwiLmxpc3RfX3Jlc3VsdHNcIikub24oXCJjbGlja1wiLCBcIi5saXN0X19yZXN1bHRzX19pdGVtXCIsIGZ1bmN0aW9uKCkge1xyXG4gIGFwcC5jaG9vc2VSZXN1bHQodGhpcyk7XHJcbiAgJChcImlucHV0OnJhZGlvXCIpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxufSk7IFxyXG5cclxuLy9jaG9vc2VSZXN1bHRcclxuYXBwLmNob29zZVJlc3VsdCA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICBsZXQgY2hvc2VuVHJhY2tJZCA9ICQoaXRlbSkuYXR0cihcImlkXCIpO1xyXG4gIGFwcC5nZXRMeXJpY3MoY2hvc2VuVHJhY2tJZCk7XHJcblxyXG4gICQoXCIuc2VjdGlvbl9fbHlyaWNzXCIpLmZhZGVJbigpO1xyXG4gICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXHJcbiAgICB7XHJcbiAgICAgIHNjcm9sbFRvcDogJChcIiNseXJpY3NcIikub2Zmc2V0KCkudG9wXHJcbiAgICB9LFxyXG4gICAgODAwXHJcbiAgKTtcclxufTtcclxuXHJcbi8vZ2V0THlyaWNzXHJcbmFwcC5nZXRMeXJpY3MgPSBmdW5jdGlvbihpZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB1cmw6IGAke2FwcC5iYXNlVXJsfXRyYWNrLmx5cmljcy5nZXRgLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvbnBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgYXBpa2V5OiBhcHAua2V5LFxyXG4gICAgICBmb3JtYXQ6IFwianNvbnBcIixcclxuICAgICAgdHJhY2tfaWQ6IGAke2lkfWBcclxuICAgIH1cclxuICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICBjb25zdCBseXJpY3MgPSByZXMubWVzc2FnZS5ib2R5Lmx5cmljcy5seXJpY3NfYm9keTtcclxuICAgIGNvbnN0IGx5cmljc1JlbW92ZSA9IGx5cmljcy5zcGxpdChcIi4uLlwiKVswXTtcclxuICAgIGFwcC5kaXNwbGF5THlyaWNzKGx5cmljc1JlbW92ZSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vL2Rpc3BsYXlMeXJpY3NcclxuYXBwLmRpc3BsYXlMeXJpY3MgPSBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgJChcIi5seXJpY3NcIikudGV4dChgJHt0ZXh0fWApO1xyXG4gIGFwcC5jbGVhbkx5cmljcyh0ZXh0KTtcclxufTtcclxuXHJcbi8vY2xlYW5MeXJpY3NcclxuYXBwLmNsZWFuTHlyaWNzID0gZnVuY3Rpb24odGV4dCkge1xyXG4gIGFwcC5seXJpY3NUb0JlVHJhbnNsYXRlZCA9IHRleHQuc3BsaXQoXCJcXG5cIikuam9pbihcInh5elwiKTtcclxufTtcclxuXHJcbi8vZ2V0TGFuZ3VhZ2VcclxuJChcImlucHV0OnJhZGlvXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xyXG4gIGxldCBjaG9zZW5MYW5ndWFnZSA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gIGFwcC50cmFuc2xhdGUoY2hvc2VuTGFuZ3VhZ2UsIGFwcC5seXJpY3NUb0JlVHJhbnNsYXRlZCk7XHJcbn0pO1xyXG5cclxuXHJcbi8vdHJhbnNsYXRlXHJcbmFwcC50cmFuc2xhdGUgPSBmdW5jdGlvbihsYW5ndWFnZSwgbHlyaWNzKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHVybDogYGh0dHBzOi8vYXBpLmZ1bnRyYW5zbGF0aW9ucy5jb20vdHJhbnNsYXRlLyR7bGFuZ3VhZ2V9YCxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgdGV4dDogYCR7bHlyaWNzfWAsXHJcbiAgICAgIGZvcm1hdDogXCJqc29uXCJcclxuICAgIH1cclxuICB9KVxyXG4gICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlZEx5cmljcyA9IHJlcy5jb250ZW50cy50cmFuc2xhdGVkO1xyXG4gICAgICBhcHAuZm9ybWF0THlyaWNzKHRyYW5zbGF0ZWRMeXJpY3MpO1xyXG4gICAgfSlcclxuICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJBamF4IGZhaWxlZFwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy9mb3JtYXRMeXJpY3NcclxuYXBwLmZvcm1hdEx5cmljcyA9IGZ1bmN0aW9uKHRleHQpIHtcclxuICBjb25zdCBmb3JtYXRUZXh0ID0gdGV4dC5zcGxpdChcInh5elwiKS5qb2luKFwiXFxuXCIpO1xyXG4gIGFwcC5kaXNwbGF5VHJhbnNsYXRlZEx5cmljcyhmb3JtYXRUZXh0KTtcclxufTtcclxuXHJcbi8vZGlzcGxheVRyYW5zbGF0ZWRMeXJpY3NcclxuYXBwLmRpc3BsYXlUcmFuc2xhdGVkTHlyaWNzID0gZnVuY3Rpb24odGV4dCkge1xyXG4gICQoXCIubHlyaWNzXCIpLnRleHQoYCR7dGV4dH1gKTtcclxufTtcclxuXHJcbi8vIFNUUkVUQ0ggR09BTDogc3BlYWtUcmFuc2xhdGVkTHlyaWNzXHJcblxyXG4vL3Jlc2V0XHJcblxyXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gIGFwcC5nZXRVc2VySW5wdXQoKTtcclxuICAvLyBhcHAuY2hvb3NlUmVzdWx0KCk7XHJcbn07XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gIGFwcC5pbml0KCk7XHJcbn0pO1xyXG4iXX0=
