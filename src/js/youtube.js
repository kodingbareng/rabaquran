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
          console.log(data.items);
          $.each(data.items, function(i, item){
            // // // judul video
            vidJudul = item.snippet.title;
            // // idvideo
            vidId = item.id.videoId;
            // thumbnail video
            thumbUrl = item.snippet.thumbnails.medium.url;
            // console.log(vidId);
            output = source.append("<div class=\'col-sm-3\'><a href=\'http://www.youtube.com/watch?v="+vidId+"' target=\"_blank\"><div class=\'galeri-list-thumb\'><img src='"+thumbUrl+"'/><h5>"+vidJudul+"</h5></div></a></div>");
          });
        },
        error: function() {
        }
      });
    }

    showVids();
  };
  
}( jQuery ));

$('.video-list').youfeed({
  limit:8,
  channel:"UCDd5CFd8g-eezLlcjwoWlKw",
  key:"AIzaSyAYrEwgdUWNN0hb1FbDa71uTjnQIEXrepQ"
});