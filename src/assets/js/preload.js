/* Preload */

$(window).load(function () {
  $('.spinner').fadeOut(300);
  $('#preloader').delay(500).fadeOut('slow');
  $('body').delay(400).css({
    'overflow': 'visible'
  });
  $('.blog').removeClass('hidden');
})