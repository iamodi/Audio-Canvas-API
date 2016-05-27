
//initialize the player/DOM hoisting
init();

//create a new audio object via API
function creatAudio(){
	window.audio = new Audio();
			audio.src = 'one-day.mp3';
			audio.controls = true;
			audio.loop = true;
		    // audio.autoplay = false;
};

function init(){

	creatAudio();

	var playButton = document.getElementById('play');
	playButton.addEventListener('click', audioPlay, false);

	// var pauseButton = document.getElementById('pause');
	// pauseButton.addEventListener('click', audioPause, false);

	initMp3Player();
}

function audioPlay(){
	//button switch
	if (audio.paused){
		audio.play();
		document.getElementById('play').innerText = "||";
	} else {
		audio.pause();
		document.getElementById('play').innerText = ">";

	}
}

// function audioPause(){
// 	audio.pause();
// }


function initMp3Player(){ 
	context = new AudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('eq'); 
	ctx = canvas.getContext('2d'); // Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio); 
	source.connect(analyser); 
	analyser.connect(context.destination); 
	frameLooper(); 
}

//This will animate our grapics in the canvas. 
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){ 
	window.requestAnimationFrame(frameLooper); 
	fbc_array = new Uint8Array(analyser.frequencyBinCount); 
	analyser.getByteFrequencyData(fbc_array); 
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

	var my_gradient=ctx.createLinearGradient(0,0,170,0);
	my_gradient.addColorStop(0,"#00CED1");
	my_gradient.addColorStop(0.7,"greenyellow");
	my_gradient.addColorStop(1,"cyan");
	ctx.fillStyle=my_gradient;
	// ctx.fillStyle = '#00CED1'; // Color of the bars
	//The number of bars to render
	bars = 100; 
	//Loop for 10 times to space the bars. 
	for (var i = 0; i < bars; i++) { 
		bar_x = i * 3; 
		bar_width = 2; 
		bar_height = -(fbc_array[i] / 2); // fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height); 
	} 
}






























