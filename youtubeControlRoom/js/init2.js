window.onload = function(){
	gapi.client.setApiKey("AIzaSyDF92tWqGCsqN5VpVDAnDDUCNa85g266Ok");
    gapi.client.load("youtube", "v3");
}

function apiRequest(GoGetThis) {

	console.log("Youtube Search Result : " + GoGetThis);

	// prepare the request
	var request = gapi.client.youtube.search.list({
	   part: "snippet",
	   type: "video",
	   q: encodeURIComponent(GoGetThis).replace(/%20/g, "+"),
	   maxResults: 1,
	   order: "relevance"
	}); 
	
	// execute the request
	request.execute(function(response) {
		var results = response.result;

		var videoId = results.items[0].id.videoId;

		var video = document.createElement('iframe');
		video.setAttribute('class','video w100');
		video.setAttribute('width','320');
		video.setAttribute('height','180');
		video.setAttribute('frameBorder', '0');
		video.setAttribute('src', `//www.youtube.com/embed/${videoId}?autoplay=1&mute=1&color=white&rel=0&enablejsapi=1&version=3&loop=1&playlist=${videoId}`);
		document.getElementById('results').appendChild(video);

	});
}
// var form = document.querySelector('form');
// var inp = document.getElementById('searchBox');

// // window.onload = function() {
// 	inp.addEventListener("input", function() {
// 		inp.addEventListener('keydown', function(event) {
// 			console.log(inp.value);

// 			if(event.code ==='Space'){
// 				// var words = inp.value.trim().replace(/\s+/g, " ").split(" ");
// 				// var searchWord = words[words.length-1];
// 				// console.log('THIS IS SEARCH WORDS ',searchWord);
// 				var search = inp.value;
// 				// console.log(search);
// 				apiRequest(search);	
// 				// console.log('THIS IS WORDS ', words);
// 			}
// 		})
		
		

// 	});// end of inp "input" addEventListener


var doNotPrint = ['Backspace','Escape','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14','F15','F16','F17','F18','F19','Home','End','PageUp','PageDown','Clear','Delete','Tab','CapsLock', 'Enter','Shift','Control', 'Alt', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];
var p;
var keyPressed = {};
var text = '';

window.addEventListener('keydown', function(event) {
	
	regularKeys();
	// specialKeys();
 	
	text = text + event.key;
	var words = text.trim().replace(/\s+/g, " ").split(" ");
	var searchWord = words[words.length-1];
	if(event.code ==='Space'){
		apiRequest(searchWord);
	}

}, true);


// Regular Keys = Print All Keys Except Elements in doNotPrint Array
function regularKeys(){

	if(doNotPrint.includes(event.key)){
		
		console.log('This key cannot be printed')
	
	}else{ 
		
		p = document.createElement('p');
		p.setAttribute('class', 'letters')
		p.innerHTML = event.key
		document.getElementById('output').insertBefore( p,document.getElementById('cursor') );
	}

}

// Special Keys = SPACE, ENTER, DELETE, DELETE ALL(Cmnd+Backspace)
function specialKeys(){

	// SPACE(Spacebar key)
	if(event.code ==='Space'){
		p.innerHTML = '&#x00A0';
		document.getElementById('output').insertBefore(p,document.getElementById('cursor'));
	}

	// LINE BREAK(Enter Key)
	if(event.key === 'Enter'){
		var lineBreak = document.createElement('p');
		lineBreak.setAttribute('class', 'letters')
		lineBreak.setAttribute('style', 'flex-basis:100%;');
		document.getElementById('output').insertBefore(lineBreak,document.getElementById('cursor'));
	}

	// DELETE ONE LETTER(Backspace Key)
	if(event.key === 'Backspace'){
		var lastLetter = document.getElementsByClassName('letters')[document.getElementsByClassName('letters').length - 1];
		lastLetter === undefined ? console.log('nothing to delete') : lastLetter.remove(); 
	}

	// DELETE ALL TEXTS( Command Key(Meta2) + Backspace Key(Backspace0) )
	keyPressed[event.key + event.location] = true;
    if (keyPressed.Meta2 == true && keyPressed.Backspace0 == true) {
    	document.querySelectorAll('.letters').forEach(letters => { letters.remove(); } ) 
    }

    // Clear Any Two Keys Pressed(In this case Command Key + Backspace Key)
	document.addEventListener('keyup', function(e) {
		keyPressed[e.key + e.location] = false;
		keyPressed = {};
	}, false);

}// The End of specialKeys()


