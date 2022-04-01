// prepare the youtube api as the window is ready. 
// its better to hide/encrypt the API key but I couldnt figure that out. 
window.onload = function(){

	gapi.client.setApiKey("AIzaSyCTPILGwaybiLQ2C0oDzq0gXFCdwYubXEY");
    gapi.client.load("youtube", "v3");

}

// send the request to youtube API and get a video 
function apiRequest(GoGetThis) {

	console.log("Youtube Search Result : " + GoGetThis);

	// prepare the request, q (query) parameter is the searching word
	var request = gapi.client.youtube.search.list({
	   part: "snippet",
	   type: "video",
	   q: encodeURIComponent(GoGetThis).replace(/%20/g, "+"),
	   maxResults: 1,
	   order: "relevance"
	}); 
	
	// execute the request
	request.execute(function(response) {

		// video result json from youtube 
		var results = response.result;

		// youtube video Id from the json
		var videoId = results.items[0].id.videoId;

		// create iframe element with the video id
		var video = document.createElement('iframe');
		video.setAttribute('class','video w100');
		video.setAttribute('width','320');
		video.setAttribute('height','180');
		video.setAttribute('frameBorder', '0');
		video.setAttribute('src', `//www.youtube.com/embed/${videoId}?autoplay=1&mute=1&color=white&rel=0&enablejsapi=1&version=3&loop=1&playlist=${videoId}`);

		// finally append the iframe in 'results' div
		document.getElementById('results').appendChild(video);

	});

}// the end of apiRequest() 

var inp = document.getElementById('searchBox');
var btn = document.getElementById('submit');

// inp.addEventListener("input", function() {

// 		// console.log(inp.value);
// 		var words = inp.value.trim().replace(/\s+/g, " ").split(" ");
// 		// console.log(words);
// 		var spaceCounter = inp.value.split(" ").length-1;
// 		//console.log(spaceCounter)

// });// end of inp "input" addEventListener

btn.addEventListener("click", function() {
	var words = inp.value.trim().replace(/\s+/g, " ").split(" ");
	inp.value = '';
	for(var i=0; i<words.length; i+=1){
		apiRequest(words[i])
	}
});







