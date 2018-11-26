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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxHQUFKLEdBQVUsa0NBQVY7QUFDQSxJQUFJLE9BQUosR0FBYyxtQ0FBZDs7QUFFQTtBQUNBLElBQUksWUFBSixHQUFtQixZQUFXO0FBQzVCLElBQUUsZUFBRixFQUFtQixFQUFuQixDQUFzQixRQUF0QixFQUFnQyxVQUFTLENBQVQsRUFBWTtBQUMxQyxNQUFFLGNBQUY7QUFDQSxNQUFFLGdCQUFGLEVBQW9CLEtBQXBCO0FBQ0EsUUFBTSxZQUFZLEVBQUUsZ0JBQUYsRUFBb0IsR0FBcEIsRUFBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsU0FBakI7QUFDQTtBQUNBLE1BQUUsbUJBQUYsRUFBdUIsTUFBdkI7QUFDQSxNQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FDRTtBQUNFLGlCQUFXLEVBQUUsVUFBRixFQUFjLE1BQWQsR0FBdUI7QUFEcEMsS0FERixFQUlFLEdBSkY7QUFPRCxHQWREO0FBZUQsQ0FoQkQ7O0FBa0JBO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLFVBQVMsU0FBVCxFQUFvQjtBQUNyQyxJQUFFLElBQUYsQ0FBTztBQUNMLFNBQVEsSUFBSSxPQUFaLGlCQURLO0FBRUwsWUFBUSxLQUZIO0FBR0wsY0FBVSxPQUhMO0FBSUwsVUFBTTtBQUNKLGNBQVEsSUFBSSxHQURSO0FBRUosY0FBUSxPQUZKO0FBR0osMkJBQW1CLFNBSGY7QUFJSixzQkFBZ0I7QUFKWjtBQUpELEdBQVAsRUFVRyxJQVZILENBVVEsZUFBTztBQUNiLFFBQU0sWUFBWSxJQUFJLE9BQUosQ0FBWSxJQUFaLENBQWlCLFVBQW5DO0FBQ0EsUUFBSSxZQUFKLENBQWlCLFNBQWpCO0FBQ0QsR0FiRDtBQWNELENBZkQ7O0FBaUJBO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLFVBQVMsTUFB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SUFUSCxDQVNRLGVBQU87QUFDWCxRQUFNLG1CQUFtQixJQUFJLFFBQUosQ0FBYSxVQUF0QztBQUNBLFFBQUksWUFBSixDQUFpQixnQkFBakI7QUFDRCxHQVpILEVBYUcsSUFiSCxDQWFRLFlBQU07QUFDVixZQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0QsR0FmSDtBQWdCRCxDQWpCRDs7QUFtQkE7QUFDQSxJQUFJLFlBQUosR0FBbUIsVUFBUyxJQUFULEVBQWU7QUFDaEMsTUFBTSxhQUFhLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbkI7QUFDQSxNQUFJLHVCQUFKLENBQTRCLFVBQTVCO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBLElBQUksdUJBQUosR0FBOEIsVUFBUyxJQUFULEVBQWU7QUFDM0MsSUFBRSxTQUFGLEVBQWEsSUFBYixNQUFxQixJQUFyQjtBQUNELENBRkQ7O0FBSUE7O0FBRUE7O0FBRUEsSUFBSSxJQUFKLEdBQVcsWUFBVztBQUNwQixNQUFJLFlBQUo7QUFDQTtBQUNELENBSEQ7O0FBS0EsRUFBRSxZQUFXO0FBQ1gsTUFBSSxJQUFKO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwcCA9IHt9O1xuYXBwLmtleSA9IFwiNTQwZTRjMjM2Nzc1MjkwYjQwYjcyZmMyMzlkYTE5NTBcIjtcbmFwcC5iYXNlVXJsID0gXCJodHRwOi8vYXBpLm11c2l4bWF0Y2guY29tL3dzLzEuMS9cIjtcblxuLy9nZXRVc2VySW5wdXRcbmFwcC5nZXRVc2VySW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgJChcIi5mb3JtX19zZWFyY2hcIikub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKFwiLmxpc3RfX3Jlc3VsdHNcIikuZW1wdHkoKTtcbiAgICBjb25zdCB1c2VySW5wdXQgPSAkKFwiLmlucHV0X19zZWFyY2hcIikudmFsKCk7XG4gICAgYXBwLnNlYXJjaFRyYWNrcyh1c2VySW5wdXQpO1xuICAgIC8vIGFuaW1hdGUgc2Nyb2xsIHRvIHNlY3Rpb25cbiAgICAkKFwiLnNlY3Rpb25fX3Jlc3VsdHNcIikuZmFkZUluKCk7XG4gICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI3Jlc3VsdHNcIikub2Zmc2V0KCkudG9wXG4gICAgICB9LFxuICAgICAgODAwXG4gICAgKTtcblxuICB9KTtcbn07XG5cbi8vc2VhcmNoVHJhY2tzXG5hcHAuc2VhcmNoVHJhY2tzID0gZnVuY3Rpb24odXNlcklucHV0KSB7XG4gICQuYWpheCh7XG4gICAgdXJsOiBgJHthcHAuYmFzZVVybH10cmFjay5zZWFyY2hgLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgIGRhdGE6IHtcbiAgICAgIGFwaWtleTogYXBwLmtleSxcbiAgICAgIGZvcm1hdDogXCJqc29ucFwiLFxuICAgICAgcV90cmFja19hcnRpc3Q6IGAke3VzZXJJbnB1dH1gLFxuICAgICAgc190cmFja19yYXRpbmc6IFwiREVTQ1wiXG4gICAgfVxuICB9KS50aGVuKHJlcyA9PiB7XG4gICAgY29uc3QgdHJhY2tMaXN0ID0gcmVzLm1lc3NhZ2UuYm9keS50cmFja19saXN0O1xuICAgIGFwcC5nZXRUcmFja0luZm8odHJhY2tMaXN0KTtcbiAgfSk7XG59O1xuXG4vL2dldFRyYWNrSW5mbyAobmFtZXMgYW5kIGlkcylcbmFwcC5nZXRUcmFja0luZm8gPSBmdW5jdGlvbih0cmFja3MpIHtcbiAgY29uc3QgdHJhY2tzT2JqZWN0ID0gdHJhY2tzLm1hcChzb25nID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJhY2s6IGAke3NvbmcudHJhY2sudHJhY2tfbmFtZX1gLFxuICAgICAgYXJ0aXN0OiBgJHtzb25nLnRyYWNrLmFydGlzdF9uYW1lfWAsXG4gICAgICBpZDogYCR7c29uZy50cmFjay50cmFja19pZH1gXG4gICAgfTtcbiAgfSk7XG5cbiAgYXBwLmRpc3BsYXlSZXN1bHRzKHRyYWNrc09iamVjdCk7XG59O1xuXG4vL2Rpc3BsYXlSZXN1bHRzXG5hcHAuZGlzcGxheVJlc3VsdHMgPSBmdW5jdGlvbih0cmFja0luZm8pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgJChcIi5saXN0X19yZXN1bHRzXCIpLmFwcGVuZChgXG4gICAgICA8bGkgY2xhc3MgPVwibGlzdF9fcmVzdWx0c19faXRlbVwiIGlkID0gXCIke3RyYWNrSW5mb1tpXS5pZH1cIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0gXCJidG5fX3Jlc3VsdHNcIj5cbiAgICAgICAgICA8aDMgY2xhc3M9XCJzdWJIZWFkaW5nXCI+JHt0cmFja0luZm9baV0udHJhY2t9PC9oMz48L2JyPlxuICAgICAgICAgIDxwIGNsYXNzPVwic2VjdGlvblRleHRcIj4ke3RyYWNrSW5mb1tpXS5hcnRpc3R9PC9wPiAgICAgICAgIFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbGk+XG4gICAgYCk7XG4gIH1cbn07XG5cbiQoXCIubGlzdF9fcmVzdWx0c1wiKS5vbihcImNsaWNrXCIsIFwiLmxpc3RfX3Jlc3VsdHNfX2l0ZW1cIiwgZnVuY3Rpb24oKSB7XG4gIGFwcC5jaG9vc2VSZXN1bHQodGhpcyk7XG4gICQoXCJpbnB1dDpyYWRpb1wiKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG59KTsgXG5cbi8vY2hvb3NlUmVzdWx0XG5hcHAuY2hvb3NlUmVzdWx0ID0gZnVuY3Rpb24oaXRlbSkge1xuICBsZXQgY2hvc2VuVHJhY2tJZCA9ICQoaXRlbSkuYXR0cihcImlkXCIpO1xuICBhcHAuZ2V0THlyaWNzKGNob3NlblRyYWNrSWQpO1xuXG4gICQoXCIuc2VjdGlvbl9fbHlyaWNzXCIpLmZhZGVJbigpO1xuICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgIHtcbiAgICAgIHNjcm9sbFRvcDogJChcIiNseXJpY3NcIikub2Zmc2V0KCkudG9wXG4gICAgfSxcbiAgICA4MDBcbiAgKTtcbn07XG5cbi8vZ2V0THlyaWNzXG5hcHAuZ2V0THlyaWNzID0gZnVuY3Rpb24oaWQpIHtcbiAgJC5hamF4KHtcbiAgICB1cmw6IGAke2FwcC5iYXNlVXJsfXRyYWNrLmx5cmljcy5nZXRgLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgIGRhdGE6IHtcbiAgICAgIGFwaWtleTogYXBwLmtleSxcbiAgICAgIGZvcm1hdDogXCJqc29ucFwiLFxuICAgICAgdHJhY2tfaWQ6IGAke2lkfWBcbiAgICB9XG4gIH0pLnRoZW4ocmVzID0+IHtcbiAgICBjb25zdCBseXJpY3MgPSByZXMubWVzc2FnZS5ib2R5Lmx5cmljcy5seXJpY3NfYm9keTtcbiAgICBjb25zdCBseXJpY3NSZW1vdmUgPSBseXJpY3Muc3BsaXQoXCIuLi5cIilbMF07XG4gICAgYXBwLmRpc3BsYXlMeXJpY3MobHlyaWNzUmVtb3ZlKTtcbiAgfSk7XG59O1xuXG4vL2Rpc3BsYXlMeXJpY3NcbmFwcC5kaXNwbGF5THlyaWNzID0gZnVuY3Rpb24odGV4dCkge1xuICAkKFwiLmx5cmljc1wiKS50ZXh0KGAke3RleHR9YCk7XG4gIGFwcC5jbGVhbkx5cmljcyh0ZXh0KTtcbn07XG5cbi8vY2xlYW5MeXJpY3NcbmFwcC5jbGVhbkx5cmljcyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgYXBwLmx5cmljc1RvQmVUcmFuc2xhdGVkID0gdGV4dC5zcGxpdChcIlxcblwiKS5qb2luKFwieHl6XCIpO1xufTtcblxuLy9nZXRMYW5ndWFnZVxuJChcImlucHV0OnJhZGlvXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgY2hvc2VuTGFuZ3VhZ2UgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgYXBwLnRyYW5zbGF0ZShjaG9zZW5MYW5ndWFnZSwgYXBwLmx5cmljc1RvQmVUcmFuc2xhdGVkKTtcbn0pO1xuXG5cbi8vdHJhbnNsYXRlXG5hcHAudHJhbnNsYXRlID0gZnVuY3Rpb24obGFuZ3VhZ2UsIGx5cmljcykge1xuICAkLmFqYXgoe1xuICAgIHVybDogYGh0dHBzOi8vYXBpLmZ1bnRyYW5zbGF0aW9ucy5jb20vdHJhbnNsYXRlLyR7bGFuZ3VhZ2V9YCxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIGRhdGE6IHtcbiAgICAgIHRleHQ6IGAke2x5cmljc31gLFxuICAgICAgZm9ybWF0OiBcImpzb25cIlxuICAgIH1cbiAgfSlcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgY29uc3QgdHJhbnNsYXRlZEx5cmljcyA9IHJlcy5jb250ZW50cy50cmFuc2xhdGVkO1xuICAgICAgYXBwLmZvcm1hdEx5cmljcyh0cmFuc2xhdGVkTHlyaWNzKTtcbiAgICB9KVxuICAgIC5mYWlsKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQWpheCBmYWlsZWRcIik7XG4gICAgfSk7XG59O1xuXG4vL2Zvcm1hdEx5cmljc1xuYXBwLmZvcm1hdEx5cmljcyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgY29uc3QgZm9ybWF0VGV4dCA9IHRleHQuc3BsaXQoXCJ4eXpcIikuam9pbihcIlxcblwiKTtcbiAgYXBwLmRpc3BsYXlUcmFuc2xhdGVkTHlyaWNzKGZvcm1hdFRleHQpO1xufTtcblxuLy9kaXNwbGF5VHJhbnNsYXRlZEx5cmljc1xuYXBwLmRpc3BsYXlUcmFuc2xhdGVkTHlyaWNzID0gZnVuY3Rpb24odGV4dCkge1xuICAkKFwiLmx5cmljc1wiKS50ZXh0KGAke3RleHR9YCk7XG59O1xuXG4vLyBTVFJFVENIIEdPQUw6IHNwZWFrVHJhbnNsYXRlZEx5cmljc1xuXG4vL3Jlc2V0XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIGFwcC5nZXRVc2VySW5wdXQoKTtcbiAgLy8gYXBwLmNob29zZVJlc3VsdCgpO1xufTtcblxuJChmdW5jdGlvbigpIHtcbiAgYXBwLmluaXQoKTtcbn0pO1xuIl19
