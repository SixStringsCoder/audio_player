var audio, playbtn, mutebtn, seekslider, volumeslider, seeking, seekto;

const initAudioPlayer = () => {
  audio = new Audio();
  audio.src = "./audio/dance_tune.mp3";
  audio.play();

  //Set object references
  playbtn = document.querySelector('#playpausebtn');
  mutebtn = document.querySelector('#mutebtn');
  seekslider = document.querySelector('#seekslider');
  volumeslider = document.querySelector('#volumeslider');
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
    console.log(volumeslider.value, event.target.value);
  })

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
}



window.addEventListener('load', initAudioPlayer);
