const app = {};
app.key = "540e4c236775290b40b72fc239da1950";
app.baseUrl = "http://api.musixmatch.com/ws/1.1/";

//getUserInput
app.getUserInput = function() {
  $('').on('submit', function(){
    const userInput = $('').val()
    app.searchTracks(userInput);
  })
}

//searchTracks
app.searchTracks = function(userInput) {
  $.ajax({
    url: `${app.baseUrl}track.search`,
    method: "GET",
    dataType: "jsonp",
    data: {
      apikey: app.key,
      format: "jsonp",
      q_track_artist: `${userInput}`,
      s_track_rating: "DESC"
    }
  }).then(res => {
    const trackList = res.message.body.track_list;
    app.getTrackInfo(trackList);
  });
};

//getTrackInfo (names and ids)
app.getTrackInfo = function(tracks) {
  const trackNames = tracks.map(song => song.track.track_name);
  const trackIds = tracks.map(song => song.track.track_id);
  console.log(trackNames, trackIds);
  app.displayResults(trackNames);
};

//displayResults
app.displayResults = function(names) {



}

//chooseResult

//getLyrics

//displayLyrics

//getLanguage

//translate
app.translate = function(language, lyrics) {
  $.ajax({
    url: `https://api.funtranslations.com/translate/${language}`,
    method: "GET",
    dataType: "json",
    data: {
      format: "json",
      text: `${lyrics}`
    }
  }).then(res => {
    const translatedLyrics = res.contents.translated;
    app.displayTranslatedLyrics(translatedLyrics);
  });
};

//displayTranslatedLyrics
app.displayTranslatedLyrics = function(text) {

};

// STRETCH GOAL: speakTranslatedLyrics

//reset

app.init = function() {
  app.searchTracks('drake');
};

$(function() {
  app.init();
});
