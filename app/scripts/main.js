$('document').ready( function() {
	
	var video 			= document.getElementById('first-video');
	var canvasFrom 	= document.getElementById('canvas1'); // canvase
	var canvasTo 		= document.getElementById('canvas2'); // backcvs
	
	var contextFrom = canvasFrom.getContext('2d'); // ctx
	var contextTo   = canvasTo.getContext('2d'); // bcv

	var w = canvasTo.width,
			h = canvasTo.height,
			lastScroll = 0,
			x, 
			y, 
			docWidth, 
			docHeight, 
			red, 
			green, 
			blue,
			windowWidth = $(document).width(),
			windowHeight = $(document).height();
	
	$('#container').mousemove( function(e) {
		x = e.pageX;
		y = e.pageY;
		
		red = (x / windowWidth) * 255;
	  green = (y / windowHeight) * 255;
		blue = 255; //((x+y) / (windowHeight + windowWidth) * 255);

	});

	var changeVid = function (){	
		var currentVideo = video.src;
		var currentVideoName = currentVideo.split("/").slice(3).join("/");
		
		if(currentVideoName === 'videos/Hiking.mp4') {
			video.setAttribute("src", 'videos/dewdrops.mp4')
			    video.load();
		} else {
			video.setAttribute("src", 'videos/Hiking.mp4')
	    video.load();
		}
	};
	
	var clickHandlers = function() {
		if(hasGetUserMedia()) {
			$('#container').append('<p><a id="camera-source" href="#">Use Camera Source</p>');
			
			$('#camera-source').on('click', function(e) {
				e.preventDefault();
				clickHandlers();
				useMedia();
				drawColoredFrame();
			});
		} else {
		  alert('getUserMedia() is not supported in your browser');
		}
	};
	
	var hasGetUserMedia = function() {
	  // Note: Opera is unprefixed.
	  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
	            navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	var useMedia = function() {
			
			window.URL = window.URL || window.webkitURL;
			navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
			                          navigator.mozGetUserMedia || navigator.msGetUserMedia;

		  navigator.getUserMedia({audio: true, video: true}, function(stream) {
		    video.src = window.URL.createObjectURL(stream);
		  });

	}

	var drawColoredFrame = function() {
		contextFrom.drawImage(video, 0, 0, w, h);
		var fromData = contextFrom.getImageData(0, 0, w, h);
		var data = fromData.data;

		for (var i = 0; i < data.length; i += 4) {
			var 	 r = data[i]
				, 	 g = data[i + 1]
				, 	 b = data[i + 2]
				, gray = (r+g+b) / 3;
		
				data[i]   = gray + red; // r
				data[i+1] = gray + green; // g
				data[i+2] = gray + blue; // b
		}
		
		fromData.data = data;
		contextTo.putImageData(fromData, 0, 0)
	
		setTimeout( function() {
			drawColoredFrame();
		}, 0) ;
	};

	drawColoredFrame();
	clickHandlers();
		
	$(window).scroll(function() {
	    var documentScroll = $(document).scrollLeft();
	
	    if (lastScroll >= documentScroll) {
		
	      // console.log('scroll left');
	      lastScrollLeft = documentScroll;
				changeVid();
				
	    } else if (lastScroll < documentScroll) {
		
				// console.log('scroll right');
				changeVid();
				
			}
	});

});