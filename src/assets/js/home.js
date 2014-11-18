var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};




/* stellar *//*
jQuery(document).ready(function(){
    if( !isMobile.any() && $(document).width() > 480 ){
       $(function () {
        $.stellar({
          hideDistantElements: false,
          responsive: true,
          horizontalScrolling: false,
          verticalScrolling: true,
        });
      });
    }
}); */


  
/* particle background */

particlesJS('particles-js', {
    particles: {
        color: '#eee',
        shape: 'circle',
        opacity: 1,
        size: 2,
        size_random: true,
        nb: 60,
        line_linked: {
            enable_auto: true,
            distance: 250,
            color: '#eee',
            opacity: 0.46,
            width: 1,
            condensed_mode: {
                enable: false,
                rotateX: 600,
                rotateY: 600
            }
        },
        anim: {
            enable: true,
            speed: 2
        }
    },
    interactivity: {
        enable: true,
        mouse: {
            distance: 200
        },
        mode: 'grab'
    },
    retina_detect: true
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


