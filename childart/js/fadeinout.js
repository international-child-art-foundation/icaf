$(document).ready(function () {

		$(document).ready(function() {
			var move = -10;
			var zoom = 1.1;
			$('.portfolio').hover(function() {
				width = $('.portfolio').width() * zoom;
				height = $('.portfolio').height() * zoom;	
				$(this).find('img').stop(false,true).animate({'width':width, 'height':height, 'top':move, 'left':move}, {duration:400});
				$(this).find('div.caption').stop(false,true).fadeIn(0);
			},
			function() {
				$(this).find('img').stop(false,true).animate({'width':$('.portfolio').width(), 'height':$('.portfolio').height(), 'top':'0', 'left':'0'}, {duration:400});
				$(this).find('div.caption').stop(false,true).fadeOut(0);
			});
		});
		
		

if ($.browser.msie && $.browser.version < 7) return; // Don't execute code if it's IE6 or below cause it doesn't support it.

  $(".fade").fadeTo(1, 0.33);
  $(".fade").hover(
    function () {
      $(this).fadeTo("fast", 1);
    },
    function () {
      $(this).fadeTo("slow", 0.33);
    }
  );
  
  
  $(".fadecaption").fadeTo(1, 0.53);
  $(".fadecaption").hover(
    function () {
      $(this).fadeTo("fast", 1);
    },
    function () {
      $(this).fadeTo("slow", 0.53);
    }
  );
  
  
  $(".photofade").fadeTo(1, 1);
  $(".photofade").hover(
    function () {
      $(this).fadeTo("slow", 0.68);
    },
    function () {
      $(this).fadeTo("slow", 1);
    }
  );

});
