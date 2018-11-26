(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};
app.key = "540e4c236775290b40b72fc239da1950";
app.baseUrl = "https://api.musixmatch.com/ws/1.1/";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxHQUFKLEdBQVUsa0NBQVY7QUFDQSxJQUFJLE9BQUosR0FBYyxvQ0FBZDs7QUFFQTtBQUNBLElBQUksWUFBSixHQUFtQixZQUFXO0FBQzVCLElBQUUsZUFBRixFQUFtQixFQUFuQixDQUFzQixRQUF0QixFQUFnQyxVQUFTLENBQVQsRUFBWTtBQUMxQyxNQUFFLGNBQUY7QUFDQSxNQUFFLGdCQUFGLEVBQW9CLEtBQXBCO0FBQ0EsUUFBTSxZQUFZLEVBQUUsZ0JBQUYsRUFBb0IsR0FBcEIsRUFBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsU0FBakI7QUFDQTtBQUNBLE1BQUUsbUJBQUYsRUFBdUIsTUFBdkI7QUFDQSxNQUFFLFlBQUYsRUFBZ0IsT0FBaEIsQ0FDRTtBQUNFLGlCQUFXLEVBQUUsVUFBRixFQUFjLE1BQWQsR0FBdUI7QUFEcEMsS0FERixFQUlFLEdBSkY7QUFPRCxHQWREO0FBZUQsQ0FoQkQ7O0FBa0JBO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLFVBQVMsU0FBVCxFQUFvQjtBQUNyQyxJQUFFLElBQUYsQ0FBTztBQUNMLFNBQVEsSUFBSSxPQUFaLGlCQURLO0FBRUwsWUFBUSxLQUZIO0FBR0wsY0FBVSxPQUhMO0FBSUwsVUFBTTtBQUNKLGNBQVEsSUFBSSxHQURSO0FBRUosY0FBUSxPQUZKO0FBR0osMkJBQW1CLFNBSGY7QUFJSixzQkFBZ0I7QUFKWjtBQUpELEdBQVAsRUFVRyxJQVZILENBVVEsZUFBTztBQUNiLFFBQU0sWUFBWSxJQUFJLE9BQUosQ0FBWSxJQUFaLENBQWlCLFVBQW5DO0FBQ0EsUUFBSSxZQUFKLENBQWlCLFNBQWpCO0FBQ0QsR0FiRDtBQWNELENBZkQ7O0FBaUJBO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLFVBQVMsTUFBVCxFQUFpQjtBQUNsQyxNQUFNLGVBQWUsT0FBTyxHQUFQLENBQVcsZ0JBQVE7QUFDdEMsV0FBTztBQUNMLGtCQUFVLEtBQUssS0FBTCxDQUFXLFVBRGhCO0FBRUwsbUJBQVcsS0FBSyxLQUFMLENBQVcsV0FGakI7QUFHTCxlQUFPLEtBQUssS0FBTCxDQUFXO0FBSGIsS0FBUDtBQUtELEdBTm9CLENBQXJCOztBQVFBLE1BQUksY0FBSixDQUFtQixZQUFuQjtBQUNELENBVkQ7O0FBWUE7QUFDQSxJQUFJLGNBQUosR0FBcUIsVUFBUyxTQUFULEVBQW9CO0FBQ3ZDLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxFQUFwQixFQUF3QixHQUF4QixFQUE2QjtBQUMzQixNQUFFLGdCQUFGLEVBQW9CLE1BQXBCLHdEQUMyQyxVQUFVLENBQVYsRUFBYSxFQUR4RCwwRkFHK0IsVUFBVSxDQUFWLEVBQWEsS0FINUMsdURBSStCLFVBQVUsQ0FBVixFQUFhLE1BSjVDO0FBUUQ7QUFDRixDQVhEOztBQWFBLEVBQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0Msc0JBQWhDLEVBQXdELFlBQVc7QUFDakUsTUFBSSxZQUFKLENBQWlCLElBQWpCO0FBQ0EsSUFBRSxhQUFGLEVBQWlCLElBQWpCLENBQXNCLFNBQXRCLEVBQWlDLEtBQWpDO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBLElBQUksWUFBSixHQUFtQixVQUFTLElBQVQsRUFBZTtBQUNoQyxNQUFJLGdCQUFnQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsSUFBYixDQUFwQjtBQUNBLE1BQUksU0FBSixDQUFjLGFBQWQ7O0FBRUEsSUFBRSxrQkFBRixFQUFzQixNQUF0QjtBQUNBLElBQUUsWUFBRixFQUFnQixPQUFoQixDQUNFO0FBQ0UsZUFBVyxFQUFFLFNBQUYsRUFBYSxNQUFiLEdBQXNCO0FBRG5DLEdBREYsRUFJRSxHQUpGO0FBTUQsQ0FYRDs7QUFhQTtBQUNBLElBQUksU0FBSixHQUFnQixVQUFTLEVBQVQsRUFBYTtBQUMzQixJQUFFLElBQUYsQ0FBTztBQUNMLFNBQVEsSUFBSSxPQUFaLHFCQURLO0FBRUwsWUFBUSxLQUZIO0FBR0wsY0FBVSxPQUhMO0FBSUwsVUFBTTtBQUNKLGNBQVEsSUFBSSxHQURSO0FBRUosY0FBUSxPQUZKO0FBR0oscUJBQWE7QUFIVDtBQUpELEdBQVAsRUFTRyxJQVRILENBU1EsZUFBTztBQUNiLFFBQU0sU0FBUyxJQUFJLE9BQUosQ0FBWSxJQUFaLENBQWlCLE1BQWpCLENBQXdCLFdBQXZDO0FBQ0EsUUFBTSxlQUFlLE9BQU8sS0FBUCxDQUFhLEtBQWIsRUFBb0IsQ0FBcEIsQ0FBckI7QUFDQSxRQUFJLGFBQUosQ0FBa0IsWUFBbEI7QUFDRCxHQWJEO0FBY0QsQ0FmRDs7QUFpQkE7QUFDQSxJQUFJLGFBQUosR0FBb0IsVUFBUyxJQUFULEVBQWU7QUFDakMsSUFBRSxTQUFGLEVBQWEsSUFBYixNQUFxQixJQUFyQjtBQUNBLE1BQUksV0FBSixDQUFnQixJQUFoQjtBQUNELENBSEQ7O0FBS0E7QUFDQSxJQUFJLFdBQUosR0FBa0IsVUFBUyxJQUFULEVBQWU7QUFDL0IsTUFBSSxvQkFBSixHQUEyQixLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLElBQWpCLENBQXNCLEtBQXRCLENBQTNCO0FBQ0QsQ0FGRDs7QUFJQTtBQUNBLEVBQUUsYUFBRixFQUFpQixFQUFqQixDQUFvQixRQUFwQixFQUE4QixZQUFXO0FBQ3ZDLE1BQUksaUJBQWlCLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxJQUFiLENBQXJCO0FBQ0EsTUFBSSxTQUFKLENBQWMsY0FBZCxFQUE4QixJQUFJLG9CQUFsQztBQUNELENBSEQ7O0FBTUE7QUFDQSxJQUFJLFNBQUosR0FBZ0IsVUFBUyxRQUFULEVBQW1CLE1BQW5CLEVBQTJCO0FBQ3pDLElBQUUsSUFBRixDQUFPO0FBQ0wsd0RBQWtELFFBRDdDO0FBRUwsWUFBUSxLQUZIO0FBR0wsY0FBVSxNQUhMO0FBSUwsVUFBTTtBQUNKLGlCQUFTLE1BREw7QUFFSixjQUFRO0FBRko7QUFKRCxHQUFQLEVBU0csSUFUSCxDQVNRLGVBQU87QUFDWCxRQUFNLG1CQUFtQixJQUFJLFFBQUosQ0FBYSxVQUF0QztBQUNBLFFBQUksWUFBSixDQUFpQixnQkFBakI7QUFDRCxHQVpILEVBYUcsSUFiSCxDQWFRLFlBQU07QUFDVixZQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0QsR0FmSDtBQWdCRCxDQWpCRDs7QUFtQkE7QUFDQSxJQUFJLFlBQUosR0FBbUIsVUFBUyxJQUFULEVBQWU7QUFDaEMsTUFBTSxhQUFhLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbkI7QUFDQSxNQUFJLHVCQUFKLENBQTRCLFVBQTVCO0FBQ0QsQ0FIRDs7QUFLQTtBQUNBLElBQUksdUJBQUosR0FBOEIsVUFBUyxJQUFULEVBQWU7QUFDM0MsSUFBRSxTQUFGLEVBQWEsSUFBYixNQUFxQixJQUFyQjtBQUNELENBRkQ7O0FBSUE7O0FBRUE7O0FBRUEsSUFBSSxJQUFKLEdBQVcsWUFBVztBQUNwQixNQUFJLFlBQUo7QUFDQTtBQUNELENBSEQ7O0FBS0EsRUFBRSxZQUFXO0FBQ1gsTUFBSSxJQUFKO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwcCA9IHt9O1xyXG5hcHAua2V5ID0gXCI1NDBlNGMyMzY3NzUyOTBiNDBiNzJmYzIzOWRhMTk1MFwiO1xyXG5hcHAuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkubXVzaXhtYXRjaC5jb20vd3MvMS4xL1wiO1xyXG5cclxuLy9nZXRVc2VySW5wdXRcclxuYXBwLmdldFVzZXJJbnB1dCA9IGZ1bmN0aW9uKCkge1xyXG4gICQoXCIuZm9ybV9fc2VhcmNoXCIpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoXCIubGlzdF9fcmVzdWx0c1wiKS5lbXB0eSgpO1xyXG4gICAgY29uc3QgdXNlcklucHV0ID0gJChcIi5pbnB1dF9fc2VhcmNoXCIpLnZhbCgpO1xyXG4gICAgYXBwLnNlYXJjaFRyYWNrcyh1c2VySW5wdXQpO1xyXG4gICAgLy8gYW5pbWF0ZSBzY3JvbGwgdG8gc2VjdGlvblxyXG4gICAgJChcIi5zZWN0aW9uX19yZXN1bHRzXCIpLmZhZGVJbigpO1xyXG4gICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcclxuICAgICAge1xyXG4gICAgICAgIHNjcm9sbFRvcDogJChcIiNyZXN1bHRzXCIpLm9mZnNldCgpLnRvcFxyXG4gICAgICB9LFxyXG4gICAgICA4MDBcclxuICAgICk7XHJcblxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy9zZWFyY2hUcmFja3NcclxuYXBwLnNlYXJjaFRyYWNrcyA9IGZ1bmN0aW9uKHVzZXJJbnB1dCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB1cmw6IGAke2FwcC5iYXNlVXJsfXRyYWNrLnNlYXJjaGAsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBhcGlrZXk6IGFwcC5rZXksXHJcbiAgICAgIGZvcm1hdDogXCJqc29ucFwiLFxyXG4gICAgICBxX3RyYWNrX2FydGlzdDogYCR7dXNlcklucHV0fWAsXHJcbiAgICAgIHNfdHJhY2tfcmF0aW5nOiBcIkRFU0NcIlxyXG4gICAgfVxyXG4gIH0pLnRoZW4ocmVzID0+IHtcclxuICAgIGNvbnN0IHRyYWNrTGlzdCA9IHJlcy5tZXNzYWdlLmJvZHkudHJhY2tfbGlzdDtcclxuICAgIGFwcC5nZXRUcmFja0luZm8odHJhY2tMaXN0KTtcclxuICB9KTtcclxufTtcclxuXHJcbi8vZ2V0VHJhY2tJbmZvIChuYW1lcyBhbmQgaWRzKVxyXG5hcHAuZ2V0VHJhY2tJbmZvID0gZnVuY3Rpb24odHJhY2tzKSB7XHJcbiAgY29uc3QgdHJhY2tzT2JqZWN0ID0gdHJhY2tzLm1hcChzb25nID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRyYWNrOiBgJHtzb25nLnRyYWNrLnRyYWNrX25hbWV9YCxcclxuICAgICAgYXJ0aXN0OiBgJHtzb25nLnRyYWNrLmFydGlzdF9uYW1lfWAsXHJcbiAgICAgIGlkOiBgJHtzb25nLnRyYWNrLnRyYWNrX2lkfWBcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGFwcC5kaXNwbGF5UmVzdWx0cyh0cmFja3NPYmplY3QpO1xyXG59O1xyXG5cclxuLy9kaXNwbGF5UmVzdWx0c1xyXG5hcHAuZGlzcGxheVJlc3VsdHMgPSBmdW5jdGlvbih0cmFja0luZm8pIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICQoXCIubGlzdF9fcmVzdWx0c1wiKS5hcHBlbmQoYFxyXG4gICAgICA8bGkgY2xhc3MgPVwibGlzdF9fcmVzdWx0c19faXRlbVwiIGlkID0gXCIke3RyYWNrSW5mb1tpXS5pZH1cIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPSBcImJ0bl9fcmVzdWx0c1wiPlxyXG4gICAgICAgICAgPGgzIGNsYXNzPVwic3ViSGVhZGluZ1wiPiR7dHJhY2tJbmZvW2ldLnRyYWNrfTwvaDM+PC9icj5cclxuICAgICAgICAgIDxwIGNsYXNzPVwic2VjdGlvblRleHRcIj4ke3RyYWNrSW5mb1tpXS5hcnRpc3R9PC9wPiAgICAgICAgIFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2xpPlxyXG4gICAgYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuJChcIi5saXN0X19yZXN1bHRzXCIpLm9uKFwiY2xpY2tcIiwgXCIubGlzdF9fcmVzdWx0c19faXRlbVwiLCBmdW5jdGlvbigpIHtcclxuICBhcHAuY2hvb3NlUmVzdWx0KHRoaXMpO1xyXG4gICQoXCJpbnB1dDpyYWRpb1wiKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbn0pOyBcclxuXHJcbi8vY2hvb3NlUmVzdWx0XHJcbmFwcC5jaG9vc2VSZXN1bHQgPSBmdW5jdGlvbihpdGVtKSB7XHJcbiAgbGV0IGNob3NlblRyYWNrSWQgPSAkKGl0ZW0pLmF0dHIoXCJpZFwiKTtcclxuICBhcHAuZ2V0THlyaWNzKGNob3NlblRyYWNrSWQpO1xyXG5cclxuICAkKFwiLnNlY3Rpb25fX2x5cmljc1wiKS5mYWRlSW4oKTtcclxuICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxyXG4gICAge1xyXG4gICAgICBzY3JvbGxUb3A6ICQoXCIjbHlyaWNzXCIpLm9mZnNldCgpLnRvcFxyXG4gICAgfSxcclxuICAgIDgwMFxyXG4gICk7XHJcbn07XHJcblxyXG4vL2dldEx5cmljc1xyXG5hcHAuZ2V0THlyaWNzID0gZnVuY3Rpb24oaWQpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdXJsOiBgJHthcHAuYmFzZVVybH10cmFjay5seXJpY3MuZ2V0YCxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25wXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGFwaWtleTogYXBwLmtleSxcclxuICAgICAgZm9ybWF0OiBcImpzb25wXCIsXHJcbiAgICAgIHRyYWNrX2lkOiBgJHtpZH1gXHJcbiAgICB9XHJcbiAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgY29uc3QgbHlyaWNzID0gcmVzLm1lc3NhZ2UuYm9keS5seXJpY3MubHlyaWNzX2JvZHk7XHJcbiAgICBjb25zdCBseXJpY3NSZW1vdmUgPSBseXJpY3Muc3BsaXQoXCIuLi5cIilbMF07XHJcbiAgICBhcHAuZGlzcGxheUx5cmljcyhseXJpY3NSZW1vdmUpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy9kaXNwbGF5THlyaWNzXHJcbmFwcC5kaXNwbGF5THlyaWNzID0gZnVuY3Rpb24odGV4dCkge1xyXG4gICQoXCIubHlyaWNzXCIpLnRleHQoYCR7dGV4dH1gKTtcclxuICBhcHAuY2xlYW5MeXJpY3ModGV4dCk7XHJcbn07XHJcblxyXG4vL2NsZWFuTHlyaWNzXHJcbmFwcC5jbGVhbkx5cmljcyA9IGZ1bmN0aW9uKHRleHQpIHtcclxuICBhcHAubHlyaWNzVG9CZVRyYW5zbGF0ZWQgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpLmpvaW4oXCJ4eXpcIik7XHJcbn07XHJcblxyXG4vL2dldExhbmd1YWdlXHJcbiQoXCJpbnB1dDpyYWRpb1wiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcclxuICBsZXQgY2hvc2VuTGFuZ3VhZ2UgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICBhcHAudHJhbnNsYXRlKGNob3Nlbkxhbmd1YWdlLCBhcHAubHlyaWNzVG9CZVRyYW5zbGF0ZWQpO1xyXG59KTtcclxuXHJcblxyXG4vL3RyYW5zbGF0ZVxyXG5hcHAudHJhbnNsYXRlID0gZnVuY3Rpb24obGFuZ3VhZ2UsIGx5cmljcykge1xyXG4gICQuYWpheCh7XHJcbiAgICB1cmw6IGBodHRwczovL2FwaS5mdW50cmFuc2xhdGlvbnMuY29tL3RyYW5zbGF0ZS8ke2xhbmd1YWdlfWAsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHRleHQ6IGAke2x5cmljc31gLFxyXG4gICAgICBmb3JtYXQ6IFwianNvblwiXHJcbiAgICB9XHJcbiAgfSlcclxuICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZWRMeXJpY3MgPSByZXMuY29udGVudHMudHJhbnNsYXRlZDtcclxuICAgICAgYXBwLmZvcm1hdEx5cmljcyh0cmFuc2xhdGVkTHlyaWNzKTtcclxuICAgIH0pXHJcbiAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQWpheCBmYWlsZWRcIik7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vZm9ybWF0THlyaWNzXHJcbmFwcC5mb3JtYXRMeXJpY3MgPSBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgY29uc3QgZm9ybWF0VGV4dCA9IHRleHQuc3BsaXQoXCJ4eXpcIikuam9pbihcIlxcblwiKTtcclxuICBhcHAuZGlzcGxheVRyYW5zbGF0ZWRMeXJpY3MoZm9ybWF0VGV4dCk7XHJcbn07XHJcblxyXG4vL2Rpc3BsYXlUcmFuc2xhdGVkTHlyaWNzXHJcbmFwcC5kaXNwbGF5VHJhbnNsYXRlZEx5cmljcyA9IGZ1bmN0aW9uKHRleHQpIHtcclxuICAkKFwiLmx5cmljc1wiKS50ZXh0KGAke3RleHR9YCk7XHJcbn07XHJcblxyXG4vLyBTVFJFVENIIEdPQUw6IHNwZWFrVHJhbnNsYXRlZEx5cmljc1xyXG5cclxuLy9yZXNldFxyXG5cclxuYXBwLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICBhcHAuZ2V0VXNlcklucHV0KCk7XHJcbiAgLy8gYXBwLmNob29zZVJlc3VsdCgpO1xyXG59O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICBhcHAuaW5pdCgpO1xyXG59KTtcclxuIl19
