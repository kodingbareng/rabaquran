// toggle slide
$('#resp-btn').click(function(){
  // alert('diklik men');
  $(this).toggleClass('open');
  $('nav').fadeToggle();
});

// add background when pull down
head = $('header');
$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    return head.addClass('fill');
  } else {
    return head.removeClass('fill');
  }
}); 

