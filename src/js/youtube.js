(function ( $ ) {
  $.fn.youfeed = function(pengaturan) {
    var source = $(this);
    // konfigurasi class
    var settings = $.extend({
      channel: '',
      userName:'',
      key: '',
      type:'video',
      limit:4
    },pengaturan);

    function showVids(){
      
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
          part: "snippet", 
          channelId: settings.channel,
          key: settings.key,
          maxResults:settings.limit,
          type:settings.type,
          kind:'searchResult'
        },
        contentType: 'text/plain',
        success: function(data) {
          source.html('');
          $.each(data.items, function(i, item){
            // // // judul video
            vidJudul = item.snippet.title;
            // // idvideo
            vidId = item.id.videoId;
            // thumbnail video
            thumbUrl = item.snippet.thumbnails.medium.url;
            
            output = source.append("<div class=\'col-sm-3\'><a href=\'http://www.youtube.com/watch?v="+vidId+"' target=\"_blank\"><div class=\'video-list-thumb\'><span id='"+vidId+"'class='duration'>"+getDuration(vidId)+"</span><img src='"+thumbUrl+"'/><h5>"+vidJudul+"</h5></div></a></div>");
            getDuration(vidId);
          });
        },
        error: function() {
        }
      });
    }

    function getDuration(vidId){
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'https://www.googleapis.com/youtube/v3/videos',
        data: {
          part: "contentDetails", 
          id: vidId,
          key: settings.key
        },
        contentType: 'text/plain',
        success: function(data) {
          $.each(data.items, function(i, item){
            durasi = item.contentDetails.duration;
          });
          $('span#'+vidId).html(convert_time(durasi));
        },
        error: function() {
        }
      });
    }

    // fungsi durasi
    function convert_time(duration) {
      var a = duration.match(/\d+/g);

      if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
          a = [0, a[0], 0];
      }

      if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
          a = [a[0], 0, a[1]];
      }
      if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
          a = [a[0], 0, 0];
      }

      duration = 0;

      if (a.length == 3) {
          duration = duration + parseInt(a[0]) * 3600;
          duration = duration + parseInt(a[1]) * 60;
          duration = duration + parseInt(a[2]);
      }

      if (a.length == 2) {
          duration = duration + parseInt(a[0]) * 60;
          duration = duration + parseInt(a[1]);
      }

      if (a.length == 1) {
          duration = duration + parseInt(a[0]);
      }
      var h = Math.floor(duration / 3600);
      var m = Math.floor(duration % 3600 / 60);
      var s = Math.floor(duration % 3600 % 60);
      return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

    showVids();
  };
  
}( jQuery ));

$('.video-list').youfeed({
  limit:8,
  channel:"UCDd5CFd8g-eezLlcjwoWlKw",
  key:"AIzaSyAYrEwgdUWNN0hb1FbDa71uTjnQIEXrepQ"
});