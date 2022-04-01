// prepare youtube API as window is ready
// its better to hide/encrypt API key but I couldn't figure that out. 
window.onload = function(){

	// API key
	// gapi.client.setApiKey('AIzaSyAsv81hZA0Wg-tEZj1lrqKrQNyUUSyJdvk');
	gapi.client.setApiKey('AIzaSyAdlW9vLo9RAK7fmCte6l26t8hseWLcBx4');

	// API version
    gapi.client.load('youtube', 'v3');

}

// send request to youtube API and get video 
function apiRequest(GoGetThis) {

	console.log('Youtube Search : ' + GoGetThis);

	// prepare request, q (query) parameter is searching word
	var request = gapi.client.youtube.search.list({

	   part: 'snippet',
	   type: 'video',
	   q: encodeURIComponent(GoGetThis),
	   maxResults: 1,
	   order: 'relevance'

	}); 
	
	// execute request
	request.execute(function(response) {

		// video results json from youtube 
		var results = response.result;

		// youtube video id from the json
		var videoId = results.items[0].id.videoId;

		// create video container div
		var videoCont = document.createElement('div');
		videoCont.setAttribute('class', 'videoContainer');
		document.getElementById('results').appendChild(videoCont);

		// create video
		var video = document.createElement('iframe');
		video.setAttribute('class','responsive-iframe');
		video.setAttribute('frameBorder', '0');
		video.setAttribute('src', `//www.youtube.com/embed/${videoId}?autoplay=1&mute=1&color=white&rel=0&enablejsapi=1&version=3&loop=1&playlist=${videoId}`);
		var lastVideoCont = document.querySelectorAll(".videoContainer");
		lastVideoCont[lastVideoCont.length-1].appendChild(video);

	});// end of request.execute()

}// end of apiRequest() 


// get input from searchbar + send request by ENTER key
var input = document.getElementById('searchBox');
input.addEventListener('keydown', function(event){
	
	if(event.key === 'Enter'){
		event.preventDefault();
		submit();
	}

})

function submit(){

	// seperate words by space
	var words = input.value.trim().replace(/\s+/g, " ").split(" ");

	// empty searchbar for additional requests 
	input.value = '';

	// send request per word 
	for(var i = 0; i < words.length; i += 1){

		apiRequest(words[i])

	}

}