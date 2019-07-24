// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;

function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE'
  });
};

$(function() {
  $('#search-term').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
  });
});

function getRequest(searchTerm) {
  var params = {
    part: 'snippet',
    order: 'viewCount',
    safeSearch: 'none',
    q: searchTerm,
    type: 'video',
    maxResults: '10',
    key: 'AIzaSyD7eDl14STY91YzidBScxWhSVT7oa2HUiM',
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data) {
    console.log(data);
    showResults(data.items);
  });
};

function showResults(results) {
  var html = "";
  //console.log(results);
  $.each(results, function(index, value) {
    html += '<a href="https://www.youtube.com/watch?v=' + value.id.videoId + '"' + 'target="_blank"> <p><img src=' + value.snippet.thumbnails.high.url + ' width="380" height="260"></p></a>';
    //console.log("https://www.youtube.com/watch?v=" + value.id.videoId);
  });
  $('#search-results').html(html);
};