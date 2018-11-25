const app = {};
app.key = "540e4c236775290b40b72fc239da1950";
app.baseUrl = "http://api.musixmatch.com/ws/1.1/";

//getUserInput
app.getUserInput = function() {
  $(".form__search").on("submit", function(e) {
    e.preventDefault();
    $(".list__results").empty();
    const userInput = $(".input__search").val();
    app.searchTracks(userInput);
    // animate scroll to section
    $(".section__results").fadeIn();
    $("html, body").animate(
      {
        scrollTop: $("#results").offset().top
      },
      800
    );

  });
};

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
  const tracksObject = tracks.map(song => {
    return {
      track: `${song.track.track_name}`,
      artist: `${song.track.artist_name}`,
      id: `${song.track.track_id}`
    };
  });

  app.displayResults(tracksObject);
};

//displayResults
app.displayResults = function(trackInfo) {
  for (let i = 0; i < 10; i++) {
    $(".list__results").append(`
      <li class ="list__results__item" id = "${trackInfo[i].id}">
        <button class= "btn__results">
          <h3 class="subHeading">${trackInfo[i].track}</h3></br>
          <p class="sectionText">${trackInfo[i].artist}</p>         
        </button>
      </li>
    `);
  }
};

$(".list__results").on("click", ".list__results__item", function() {
  app.chooseResult(this);
  $("input:radio").prop("checked", false);
}); 

//chooseResult
app.chooseResult = function(item) {
  let chosenTrackId = $(item).attr("id");
  app.getLyrics(chosenTrackId);

  $(".section__lyrics").fadeIn();
  $("html, body").animate(
    {
      scrollTop: $("#lyrics").offset().top
    },
    800
  );
};

//getLyrics
app.getLyrics = function(id) {
  $.ajax({
    url: `${app.baseUrl}track.lyrics.get`,
    method: "GET",
    dataType: "jsonp",
    data: {
      apikey: app.key,
      format: "jsonp",
      track_id: `${id}`
    }
  }).then(res => {
    const lyrics = res.message.body.lyrics.lyrics_body;
    const lyricsRemove = lyrics.split("...")[0];
    app.displayLyrics(lyricsRemove);
  });
};

//displayLyrics
app.displayLyrics = function(text) {
  $(".lyrics").text(`${text}`);
  app.cleanLyrics(text);
};

//cleanLyrics
app.cleanLyrics = function(text) {
  app.lyricsToBeTranslated = text.split("\n").join("xyz");
};

//getLanguage
$("input:radio").on("change", function() {
  let chosenLanguage = $(this).attr("id");
  app.translate(chosenLanguage, app.lyricsToBeTranslated);
});


//translate
app.translate = function(language, lyrics) {
  $.ajax({
    url: `https://api.funtranslations.com/translate/${language}`,
    method: "GET",
    dataType: "json",
    data: {
      text: `${lyrics}`,
      format: "json"
    }
  })
    .then(res => {
      const translatedLyrics = res.contents.translated;
      app.formatLyrics(translatedLyrics);
    })
    .fail(() => {
      console.log("Ajax failed");
    });
};

//formatLyrics
app.formatLyrics = function(text) {
  const formatText = text.split("xyz").join("\n");
  app.displayTranslatedLyrics(formatText);
};

//displayTranslatedLyrics
app.displayTranslatedLyrics = function(text) {
  $(".lyrics").text(`${text}`);
};

// STRETCH GOAL: speakTranslatedLyrics

//reset

app.init = function() {
  app.getUserInput();
  // app.chooseResult();
};

$(function() {
  app.init();
});
