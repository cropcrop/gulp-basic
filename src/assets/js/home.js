
/* stellar */

$(function () {
  $.stellar({
    hideDistantElements: false,
    responsive: true,
    horizontalScrolling: false,
    verticalScrolling: true,
  });
});


/* menu-hamburger */

 $('.side-menu').hide();
$('#hamburger-icon').click(function (){
  if( !$('.side-menu').is(":visible")){ $('.side-menu').show(); }
  
  console.log('spike');
  
  
  if( $('#canvas-wrap').hasClass('menu-open') ) {
    console.log(1);
    $('#canvas-wrap').removeClass('menu-open');
  }else{
    $('#canvas-wrap').addClass('menu-open');
    console.log(2);
  }
  
  if( $('.side-menu').hasClass('bounceInLeft') ) {
    console.log(1);
    $('.side-menu').removeClass('animated bounceInLeft').addClass('animated bounceOutLeft');
  }else{
    $('.side-menu').removeClass('animated bounceOutLeft').addClass('animated bounceInLeft');
    console.log(2);
  }
  //$('.side-menu').toggleClass('bounceOutLeft bounceInLeft');
});

/* txt-rotator */

$(".rotator").textrotator({
  animation: "dissolve",
  separator: "-",
  speed: 2600
});


