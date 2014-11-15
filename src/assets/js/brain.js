/* videojs */

if ( document.getElementById('zebrafish') ) {
  videojs.autoSetup();
  videojs('zebrafish').ready(function () {
    var myPlayer = this,
      id = myPlayer.id(),
      aspectRatio = 480 / 360;

    function resizeVideoJS() {
      var width = document.getElementById(id).parentElement.offsetWidth;
      myPlayer.width(width).height(width * aspectRatio);
    }

    resizeVideoJS();
    window.onresize = resizeVideoJS;
  });
}


/* stellar */

$(function () {
  $.stellar({
    hideDistantElements: false,
    responsive: true,
    horizontalScrolling: false,
    verticalScrolling: true,
  });
});