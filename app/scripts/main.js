$('document').ready( function() {
	// way to alternate videos.  pixel by pixel.

	var video 			= document.getElementById('first-video');
	var canvasFrom 	= document.getElementById('canvas1'); // canvase
	var canvasTo 		= document.getElementById('canvas2'); // backcvs
	
	var contextFrom = canvasFrom.getContext('2d'); // ctx
	var contextTo   = canvasTo.getContext('2d'); // bcv
	
	// canvas1.width = document.width / 2;
	// canvas1.height = document.height / 2;  // not sure why these numbers.
	var w = canvasTo.width;
	var h = canvasTo.height;
	var flag = 0;

	var x, y, docWidth, docHeight, red, green, blue;
	windowWidth = $(document).width();
	windowHeight = $(document).height();
	
	$('#container').mousemove( function(e) {
		x = e.pageX;
		y = e.pageY;
		

		red = (x / windowWidth) * 255;
	  green = (y / windowHeight) * 255;
		blue = 255;//((x+y) / (windowHeight + windowWidth) * 255);
	  
		// if ( x < 30 && y < 40) {
		// 	
		// 	changeVid();
		// 	
		// }
	});

	// 
	var changeVid = function (){	
		var currentVideo = video.src;
		var currentVideoName = currentVideo.split("/").slice(3).join("/");
		console.log(currentVideoName);
		if(currentVideoName === 'videos/Hiking.mp4') {
			video.setAttribute("src", 'videos/dewdrops.mp4')
			    video.load();
		} else {
			console.log('in else');
			video.setAttribute("src", 'videos/Hiking.mp4')
	    video.load();
		}
	
	}

	var drawBlackWhiteFrame = function() {
		contextFrom.drawImage(video, 0, 0, w, h);
		var fromData = contextFrom.getImageData(0, 0, w, h);
		var data = fromData.data;
		
		// width / 4, then pick a random number in between this? and multiply by 4?
		// no. How can I always pick a number that's modulo 4?

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
			drawBlackWhiteFrame();
		}, 0) ;
	}

	drawBlackWhiteFrame();
	
	
	// var drawBlackWhitePixel = function(i) {
	// 	contextFrom.drawImage(video, 0, 0, w, h);
	// 	var fromData = contextFrom.getImageData(0, 0, w, h);
	// 	var data = fromData.data;
	// 	
	// 	// width / 4, then pick a random number in between this? and multiply by 4?
	// 	// no. How can I always pick a number that's modulo 4?
	// 	
	// 	var 	 r = data[i]
	// 		, 	 g = data[i + 2]
	// 		, 	 b = data[i + 3]
	// 		, gray = (r+g+b) / 3;
	// 
	// 		data[i]   = gray;
	// 		data[i+1] = gray;
	// 		data[i+2] = gray;
	// 
	// 	fromData.data = data;
	// 	contextTo.putImageData(fromData, 0, 0)
	// 
	// 	setTimeout( function() {
	// 		drawBlackWhitePixel(Math.ceil(data.length / (Math.random() * 4)));
	// 	}, 3000) ;
	// }
	
	// drawBlackWhitePixel(4);
	

	
	
	
	var lastScroll = 0;
	
	$(window).scroll(function() {
	    var documentScroll = $(document).scrollLeft();
			// console.log(documentScroll);
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