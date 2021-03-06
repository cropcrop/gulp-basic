(function ($) {
  
  $('[data-role="preload-entries"]').hide();

  var loaded = 0,
    queque = 6,
    containerBlog = $('#blog'),
    amountNewEntries = 3;

  var $doc = $(document),
      $win = $(window);

  $doc.on('ready', function () {

    var $container = $('#blog').imagesLoaded(function () {
      $container.isotope({
        itemSelector: '.item',
        layoutMode: 'masonry',
        masonry: {
          columnWidth: '.item',
        },
        getSortData: {
          date: function ($elem) {
            console.log('asd', $($elem).find('.date').text() );
            return Date.parse($($elem).find('.date').text());
          }
        }
      });

      loadJson();


      /*
    //flipboard json
     $.getJSON( "test.json", function( data ) {

       console.log('asd', data);

        $.each( data, function( key, val ) {

          var type = "post",
              title = data[key].title,
              title = data[key].title,
              excerpt = data[key].excerptText,
              url = data[key].sourceURL,
              image = (data[key].inlineItems)? data[key].inlineItems[1].image.largeURL : "" ,
              date = "",
              tags = "",
              experimentClass = "";

          var newEntry =  loadEntry(type, experimentClass, title, excerpt, url, image, date, tags);
          $container.append(newEntry).isotope('appended', newEntry );

          //debug console.log( key, title, excerpt, image, date, tags );
          
        });
      }); */


    });


  });

  $win.on('load', function () {

    $('#blog').isotope();

    $('#blog').delay(200).queue(function (next) {
      $(this).isotope();
      console.log('isotope1');
      next();
    });

    $('#blog').delay(1000).queue(function (next) {
      $(this).isotope();
      console.log('isotope2');
      next();
    });
    
    $('.container-full').removeClass('hidden');


  });




  function loadJson() {

    console.log('loadjson');
    
    
    var jqxhr = $.getJSON( "data.json", function(data) {
      
      $('[data-role="preload-entries"]').show();

    })
    .done(function(data) {
      
      $('[data-role="preload-entries"]').hide();
      
      $.each(data.entries, function (key, val, count) {

        if (queque > 0 && key > loaded && key < loaded + amountNewEntries) {

          var type = val.type,
            title = val.title,
            excerpt = val.excerpt,
            url = val.url,
            image = val.image,
            date = val.date,
            tags = val.tags,
            experimentClass = val.experimentClass;
            customContent = val.customContent;

          var newEntry = loadEntry(type, experimentClass, customContent, title, excerpt, url, image, date, tags);
          containerBlog.append(newEntry).isotope('appended', newEntry);

          loaded++;
          queque--;
        }

        /* //debug 
            console.log( key, title, excerpt, image, date, tags ); */
      });
      
      /* $('#blog').isotope({ sortBy: 'date', sortAscending : false}); */
      
    })
    .fail(function() {
      console.log( "error json" );
  });


  }





  /* stellar */
  /*
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


  /* add queque results */


  $('button').click(function () {
    queque += (queque > 0) ? 0 : amountNewEntries;
    loadJson();
  });


  /* tags click */

  $('.list-tags > li').click(function () {

  });


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
  $('#hamburger-icon').click(function () {
    if (!$('.side-menu').is(":visible")) {
      $('.side-menu').show();
    }

    console.log('spike');


    if ($('#canvas-wrap').hasClass('menu-open')) {
      console.log(1);
      $('#canvas-wrap').removeClass('menu-open');
    } else {
      $('#canvas-wrap').addClass('menu-open');
      console.log(2);
    }

    if ($('.side-menu').hasClass('bounceInLeft')) {
      console.log(1);
      $('.side-menu').removeClass('animated bounceInLeft').addClass('animated bounceOutLeft');
    } else {
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
  
  
  /* zoom open entry experiment */
  $('#blog').on('click', '.blog-btn', function (event) {
    $(this).parents('.item').toggleClass('active');
    $('.fullscreen-overlay').toggleClass('').toggleClass('fadeOut fadeIn');
    $($($(this).parents('.item')[0]).find('.customContent')).toggleClass('hidden');
    console.log($(this));
  });

  /* filters */

  $('#filters').on('click', 'li', function (event) {
    event.preventDefault();

    $('#filters > li').removeClass('active');
    $(this).addClass('active');

    var filterValue = $(this).attr('data-filter');
    $('#blog').isotope({
      filter: filterValue
    });
  });

  
  /* scroll load new entries */
  
  $(window).scroll(function(){
    var scrollTop     = $(window).scrollTop(),
    windowHeight = $(window).height(),
    documentHeight = $(document).height(),
    distanceBottom = documentHeight - windowHeight - scrollTop;
    
    if(distanceBottom < 200){
      queque += (queque > 0) ? 0 : amountNewEntries;
      loadJson();
    }
  });

  /* load new item blog */

  function loadEntry(type, experimentClass, customContent, title, excerpt, url, image, date, tags) {

    var taglist = "",
      tagClasses = "",
      tagFilters = "",
      customContentIcon = "",
      customContentHtml = "",
      preview;

    $.each(tags, function (index, value) {
      tagClasses += ' ' + value;
      tagFilters += ' .' + value + ',';
    });


    $.each(tags, function (index, value) {
      taglist += '<li data-filter="' + tagFilters + '" class="' + value + '">' + value + '</li>';
    });



    if (type == 'post') {
      preview = '<div class="image" style=" background: url(\'' + image + '\') no-repeat center center"></div>';
    } else if (type == 'experiment') {
      preview = '<div class="blog-image"><div class="' + experimentClass + '"><img src="' + image + '" width="100"></div></div>';
    }
    
    if(customContent){
      customContentIcon = '<a href="#!" class="btn blog-btn"><i class="fa fa-angle-right"></i></a>';
      customContentHtml = customContent;
    }


    var template = $('<div class="col-md-4 col-sm-4 col-xs-12 item ' + tagClasses + '">' +
      '<div class="blog-item animated fadeInUp">' +
      '<div class="blog-header">' +
      '<div class="blog-image">' +
      preview +
      '</div>' +
      customContentIcon + 
      '</div>' +
      '<div class="blog-content">' +
      '<h2><a href="' + url + '">' + title + '</a></h2>' +
      '<p class="description">' + excerpt + '</p>' +
      '<div clasS="customContent animated fadeIn hidden">' + customContentHtml + '</div>' +
      '<div class="row">' +
      '<div class="col-md-4">' +
      '<hr>' +
      '</div>' +
      '</div>' +
      '<ul class="list list-inline list-tags">' +
      taglist +
      '</ul>' +
      '<p class="date">' + date + '</p>' +
      '</div>' +
      '</div>' +
      '</div>');

    return template;

  }


  /* check mobile */
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };




})(jQuery)