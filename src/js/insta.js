// variable
// userId = '2714852415';
// accessToken = '304071833.94c41be.1d6b7d236ede4efe8731490a7c579294';

// (function($, window, document, undefined){
//   var Insta = {
//     init: function(options, elem){
//       var self = this;

//       self.elem = elem;
//       self.$elem = $(elem);

//       if (typeof options == 'string'){
//         self.user = options;
//       }else{
//         self.user = options.user;
//         self.options = $extend({}, $.fn.insfeed.options);
//         console.log(self.options);
//       }
//     }
//   };

//   $.fn.insfeed = function(options) {
//     return this.each(function(){
//       var insta = Object.create(Insta);

//       insta.init(options);
//     });
//   };

//   $.fn.insfeed.options = {
//     user: 'muslihz',
//   };

// })(jQuery, window, document);


// $(document).ready(function(){
//   $('.galery-list').insfeed({
//     user: 'wkopi',
//   });
// });



// variable
// userId = '2714852415';
accessToken = '304071833.94c41be.1d6b7d236ede4efe8731490a7c579294';

//   
(function ( $ ) {
$.fn.insfeed = function(pengaturan) {
  source = $(this);
  // konfigurasi class
  var settings = $.extend({
    limit: 8,
    user: "muslihz",
    token: ''
  }, pengaturan );

  // get user id
  function getUID(name){
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: 'https://api.instagram.com/v1/users/search',
      data: { q: settings.user, access_token: settings.token },

      contentType: 'text/plain',
      success: function(data) {
        // console.log(data);
        userId = data.data[0].id;
        
        showRecent(userId);
        source.parent().append("<div class='row'><a href='http://instagram.com/"+settings.user+"' target='_blank' class='btn btn-info btn-sm'>Lihat yang lain</a></div>");
        
      },
      error: function() {
      }
    });
  }

  // show recent media
  function showRecent(userId){
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: 'https://api.instagram.com/v1/users/'+userId+'/media/recent/',
      data: { access_token: settings.token,count:settings.limit },

      contentType: 'text/plain',
      success: function(data) {
        
        $.each(data.data, function(i, data){
          // console.log(data.images.thumbnail.url);
          thumbUrl = data.images.low_resolution.url;
          link = data.link;
          source.append("<div class=\'col-sm-3\'><a href=\'"+link+"\' target=_blank><div class=\'galeri-list-thumb\'><img src="+thumbUrl+"/></div></a></div>");
        });
        // console.log(data);
      },
      error: function() {
      }
    });
  }

  // fetch user id
  getUID();
  
};

}( jQuery ));

$(document).ready(function(){
  $('.galeri-list').insfeed({
    token:accessToken,
    user:'rabaquran'
  });
});
