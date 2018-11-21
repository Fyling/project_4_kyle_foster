(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var app = {};
app.key = "540e4c236775290b40b72fc239da1950";
app.baseUrl = "http://api.musixmatch.com/ws/1.1/";

//getUserInput
app.getUserInput = function () {
  $('').on('submit', function () {
    var userInput = $('').val();
    app.searchTracks(userInput);
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
  var trackNames = tracks.map(function (song) {
    return song.track.track_name;
  });
  var trackIds = tracks.map(function (song) {
    return song.track.track_id;
  });
  console.log(trackNames, trackIds);
  app.displayResults(trackNames);
};

//displayResults
app.displayResults = function (names) {};

//chooseResult

//getLyrics

//displayLyrics

//getLanguage

//translate
app.translate = function (language, lyrics) {
  $.ajax({
    url: "https://api.funtranslations.com/translate/" + language,
    method: "GET",
    dataType: "json",
    data: {
      format: "json",
      text: "" + lyrics
    }
  }).then(function (res) {
    var translatedLyrics = res.contents.translated;
    app.displayTranslatedLyrics(translatedLyrics);
  });
};

//displayTranslatedLyrics
app.displayTranslatedLyrics = function (text) {};

// STRETCH GOAL: speakTranslatedLyrics

//reset

app.init = function () {
  app.searchTracks('drake');
};

$(function () {
  app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxHQUFKLEdBQVUsa0NBQVY7QUFDQSxJQUFJLE9BQUosR0FBYyxtQ0FBZDs7QUFFQTtBQUNBLElBQUksWUFBSixHQUFtQixZQUFXO0FBQzVCLElBQUUsRUFBRixFQUFNLEVBQU4sQ0FBUyxRQUFULEVBQW1CLFlBQVU7QUFDM0IsUUFBTSxZQUFZLEVBQUUsRUFBRixFQUFNLEdBQU4sRUFBbEI7QUFDQSxRQUFJLFlBQUosQ0FBaUIsU0FBakI7QUFDRCxHQUhEO0FBSUQsQ0FMRDs7QUFPQTtBQUNBLElBQUksWUFBSixHQUFtQixVQUFTLFNBQVQsRUFBb0I7QUFDckMsSUFBRSxJQUFGLENBQU87QUFDTCxTQUFRLElBQUksT0FBWixpQkFESztBQUVMLFlBQVEsS0FGSDtBQUdMLGNBQVUsT0FITDtBQUlMLFVBQU07QUFDSixjQUFRLElBQUksR0FEUjtBQUVKLGNBQVEsT0FGSjtBQUdKLDJCQUFtQixTQUhmO0FBSUosc0JBQWdCO0FBSlo7QUFKRCxHQUFQLEVBVUcsSUFWSCxDQVVRLGVBQU87QUFDYixRQUFNLFlBQVksSUFBSSxPQUFKLENBQVksSUFBWixDQUFpQixVQUFuQztBQUNBLFFBQUksWUFBSixDQUFpQixTQUFqQjtBQUNELEdBYkQ7QUFjRCxDQWZEOztBQWlCQTtBQUNBLElBQUksWUFBSixHQUFtQixVQUFTLE1BQVQsRUFBaUI7QUFDbEMsTUFBTSxhQUFhLE9BQU8sR0FBUCxDQUFXO0FBQUEsV0FBUSxLQUFLLEtBQUwsQ0FBVyxVQUFuQjtBQUFBLEdBQVgsQ0FBbkI7QUFDQSxNQUFNLFdBQVcsT0FBTyxHQUFQLENBQVc7QUFBQSxXQUFRLEtBQUssS0FBTCxDQUFXLFFBQW5CO0FBQUEsR0FBWCxDQUFqQjtBQUNBLFVBQVEsR0FBUixDQUFZLFVBQVosRUFBd0IsUUFBeEI7QUFDQSxNQUFJLGNBQUosQ0FBbUIsVUFBbkI7QUFDRCxDQUxEOztBQU9BO0FBQ0EsSUFBSSxjQUFKLEdBQXFCLFVBQVMsS0FBVCxFQUFnQixDQUlwQyxDQUpEOztBQU1BOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxTQUFKLEdBQWdCLFVBQVMsUUFBVCxFQUFtQixNQUFuQixFQUEyQjtBQUN6QyxJQUFFLElBQUYsQ0FBTztBQUNMLHdEQUFrRCxRQUQ3QztBQUVMLFlBQVEsS0FGSDtBQUdMLGNBQVUsTUFITDtBQUlMLFVBQU07QUFDSixjQUFRLE1BREo7QUFFSixpQkFBUztBQUZMO0FBSkQsR0FBUCxFQVFHLElBUkgsQ0FRUSxlQUFPO0FBQ2IsUUFBTSxtQkFBbUIsSUFBSSxRQUFKLENBQWEsVUFBdEM7QUFDQSxRQUFJLHVCQUFKLENBQTRCLGdCQUE1QjtBQUNELEdBWEQ7QUFZRCxDQWJEOztBQWVBO0FBQ0EsSUFBSSx1QkFBSixHQUE4QixVQUFTLElBQVQsRUFBZSxDQUU1QyxDQUZEOztBQUlBOztBQUVBOztBQUVBLElBQUksSUFBSixHQUFXLFlBQVc7QUFDcEIsTUFBSSxZQUFKLENBQWlCLE9BQWpCO0FBQ0QsQ0FGRDs7QUFJQSxFQUFFLFlBQVc7QUFDWCxNQUFJLElBQUo7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYXBwID0ge307XG5hcHAua2V5ID0gXCI1NDBlNGMyMzY3NzUyOTBiNDBiNzJmYzIzOWRhMTk1MFwiO1xuYXBwLmJhc2VVcmwgPSBcImh0dHA6Ly9hcGkubXVzaXhtYXRjaC5jb20vd3MvMS4xL1wiO1xuXG4vL2dldFVzZXJJbnB1dFxuYXBwLmdldFVzZXJJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAkKCcnKS5vbignc3VibWl0JywgZnVuY3Rpb24oKXtcbiAgICBjb25zdCB1c2VySW5wdXQgPSAkKCcnKS52YWwoKVxuICAgIGFwcC5zZWFyY2hUcmFja3ModXNlcklucHV0KTtcbiAgfSlcbn1cblxuLy9zZWFyY2hUcmFja3NcbmFwcC5zZWFyY2hUcmFja3MgPSBmdW5jdGlvbih1c2VySW5wdXQpIHtcbiAgJC5hamF4KHtcbiAgICB1cmw6IGAke2FwcC5iYXNlVXJsfXRyYWNrLnNlYXJjaGAsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGRhdGFUeXBlOiBcImpzb25wXCIsXG4gICAgZGF0YToge1xuICAgICAgYXBpa2V5OiBhcHAua2V5LFxuICAgICAgZm9ybWF0OiBcImpzb25wXCIsXG4gICAgICBxX3RyYWNrX2FydGlzdDogYCR7dXNlcklucHV0fWAsXG4gICAgICBzX3RyYWNrX3JhdGluZzogXCJERVNDXCJcbiAgICB9XG4gIH0pLnRoZW4ocmVzID0+IHtcbiAgICBjb25zdCB0cmFja0xpc3QgPSByZXMubWVzc2FnZS5ib2R5LnRyYWNrX2xpc3Q7XG4gICAgYXBwLmdldFRyYWNrSW5mbyh0cmFja0xpc3QpO1xuICB9KTtcbn07XG5cbi8vZ2V0VHJhY2tJbmZvIChuYW1lcyBhbmQgaWRzKVxuYXBwLmdldFRyYWNrSW5mbyA9IGZ1bmN0aW9uKHRyYWNrcykge1xuICBjb25zdCB0cmFja05hbWVzID0gdHJhY2tzLm1hcChzb25nID0+IHNvbmcudHJhY2sudHJhY2tfbmFtZSk7XG4gIGNvbnN0IHRyYWNrSWRzID0gdHJhY2tzLm1hcChzb25nID0+IHNvbmcudHJhY2sudHJhY2tfaWQpO1xuICBjb25zb2xlLmxvZyh0cmFja05hbWVzLCB0cmFja0lkcyk7XG4gIGFwcC5kaXNwbGF5UmVzdWx0cyh0cmFja05hbWVzKTtcbn07XG5cbi8vZGlzcGxheVJlc3VsdHNcbmFwcC5kaXNwbGF5UmVzdWx0cyA9IGZ1bmN0aW9uKG5hbWVzKSB7XG5cblxuXG59XG5cbi8vY2hvb3NlUmVzdWx0XG5cbi8vZ2V0THlyaWNzXG5cbi8vZGlzcGxheUx5cmljc1xuXG4vL2dldExhbmd1YWdlXG5cbi8vdHJhbnNsYXRlXG5hcHAudHJhbnNsYXRlID0gZnVuY3Rpb24obGFuZ3VhZ2UsIGx5cmljcykge1xuICAkLmFqYXgoe1xuICAgIHVybDogYGh0dHBzOi8vYXBpLmZ1bnRyYW5zbGF0aW9ucy5jb20vdHJhbnNsYXRlLyR7bGFuZ3VhZ2V9YCxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIGRhdGE6IHtcbiAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICB0ZXh0OiBgJHtseXJpY3N9YFxuICAgIH1cbiAgfSkudGhlbihyZXMgPT4ge1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRMeXJpY3MgPSByZXMuY29udGVudHMudHJhbnNsYXRlZDtcbiAgICBhcHAuZGlzcGxheVRyYW5zbGF0ZWRMeXJpY3ModHJhbnNsYXRlZEx5cmljcyk7XG4gIH0pO1xufTtcblxuLy9kaXNwbGF5VHJhbnNsYXRlZEx5cmljc1xuYXBwLmRpc3BsYXlUcmFuc2xhdGVkTHlyaWNzID0gZnVuY3Rpb24odGV4dCkge1xuXG59O1xuXG4vLyBTVFJFVENIIEdPQUw6IHNwZWFrVHJhbnNsYXRlZEx5cmljc1xuXG4vL3Jlc2V0XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIGFwcC5zZWFyY2hUcmFja3MoJ2RyYWtlJyk7XG59O1xuXG4kKGZ1bmN0aW9uKCkge1xuICBhcHAuaW5pdCgpO1xufSk7XG4iXX0=
