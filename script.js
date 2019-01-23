var audio, playbtn, mutebtn, seekslider, volumeslider, seeking, seekto, curtimetext, durtimetext, speedlist;
// Resolve browser MP3 incompatibility
var ext = "mp3";
var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("firefox") != -1 || agent.indexOf("opr") != -1) {
  ext = "ogg";
}

const initAudioPlayer = () => {
  audio = new Audio();
  audio.src = `./audio/dance_tune.${ext}`;
  audio.play();

  //Set object references
  playbtn = document.querySelector('#playpausebtn');
  mutebtn = document.querySelector('#mutebtn');
  seekslider = document.querySelector('#seekslider');
  volumeslider = document.querySelector('#volumeslider');
  curtimetext = document.querySelector('#curtimetext');
  durtimetext = document.querySelector('#durtimetext');
  speedlist = document.querySelector('#speedlist');
  //Event handlers
  playbtn.addEventListener('click', () => playPause());
  mutebtn.addEventListener('click', () => mute());
  rewindbtn.addEventListener('click', () => rewind());

  seekslider.addEventListener('mousedown', (event) => {
    seeking = true;
    seek(event);
  });
  seekslider.addEventListener('mousemove', (event) => {
    seek(event)
  });
  seekslider.addEventListener('mouseup', (event) => seeking = false);

  volumeslider.addEventListener('mousemove', () => {
    // volume values are between 0 and 1 so divide value by 100
    audio.volume = volumeslider.value / 100;
  })
  audio.addEventListener('timeupdate', () => seektimeupdate());
  speedlist.addEventListener('change', () => changeSpeed());
  //Functions
  const playPause = () => {
    if (audio.paused) {
      audio.play();
      playbtn.style.background = "url(./images/pause.png) no-repeat";
    } else {
      audio.pause();
      playbtn.style.background = "url(./images/play.png) no-repeat";
    }
  }

  const mute = () => {
    if (audio.muted) {
      audio.muted = false
      mutebtn.style.background = "url(./images/unmuted.png) no-repeat";
    } else {
      audio.muted = true;
      mutebtn.style.background = "url(./images/muted.png) no-repeat";
    }
  }

  const rewind = () => {
    audio.currentTime = 0;
  }

  const seek = (event) => {
    if (seeking) {
      seekslider.value = event.clientX - seekslider.offsetLeft;
      seekto = audio.duration * (seekslider.value/ 100);
      audio.currentTime = seekto;
    }
  }

  const seektimeupdate = () => {
    let newtime = audio.currentTime * (100 / audio.duration);
    seekslider.value = newtime;
    // initialize seconds and minutes for display
    let curmins = Math.floor(audio.currentTime / 60);
    let cursecs = Math.floor(audio.currentTime - curmins * 60);
    let durmins = Math.floor(audio.duration / 60);
    let dursecs = Math.floor(audio.duration - durmins * 60);
    // format with leading '0' if single digit number
	  if(cursecs < 10){ cursecs = `0${cursecs}`; }
    if(dursecs < 10){ dursecs = `0${dursecs}`; }
    if(curmins < 10){ curmins = `0${curmins}`; }
    if(durmins < 10){ durmins = `0${durmins}`; }
    // Format time display
	  curtimetext.innerHTML = `${curmins}:${cursecs}`;
    durtimetext.innerHTML = `${durmins}:${dursecs}`;
  }

  const changeSpeed = (event) => audio.playbackRate = event.target.value;
  
}



window.addEventListener('load', initAudioPlayer);
