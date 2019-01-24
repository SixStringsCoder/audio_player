const initAudioPlayer = () => {
  var audio, ext, agent, mylist, playbtn, mutebtn, backbtn, forwardbtn,
      seekslider, volumeslider, seeking=false, seekto, curtimetext, durtimetext,
      speedlist, directory, playlist, playlist_status;

  directory = "audio/";
  playlist = ["dance_tune", "drum_roll", "coins_slot_machine"];
  let playlist_index = 0;
  // Resolve browser MP3 incompatibility
  ext = "mp3";
  agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf("firefox") != -1 || agent.indexOf("opr") != -1) {
    ext = "ogg";
  }

  //Set object references
  mylist = document.querySelector('#mylist');
  playbtn = document.querySelector('#playpausebtn');
  mutebtn = document.querySelector('#mutebtn');
  backbtn = document.querySelector('#backbtn');
  forwardbtn = document.querySelector('#forwardbtn');
  seekslider = document.querySelector('#seekslider');
  volumeslider = document.querySelector('#volumeslider');
  curtimetext = document.querySelector('#curtimetext');
  durtimetext = document.querySelector('#durtimetext');
  speedlist = document.querySelector('#speedlist');
  playlist_status = document.querySelector('#playlist_status');


  // Audio Object
  audio = new Audio();
  audio.src = `./${directory}/${playlist[playlist_index]}.${ext}`;
  //Updates timebox after audio's metadata has loaded preventing 'NaN' from showing

  audio.loop = false;
  audio.play();
  playlist_status.innerHTML = `Track ${playlist_index+1}: ${playlist[playlist_index]}`

  //Event handlers
  mylist.addEventListener('change', () => selectTrack(event));
  playbtn.addEventListener('click', () => playPause());
  mutebtn.addEventListener('click', () => mute());
  backbtn.addEventListener('dblclick', () => rewind());
  backbtn.addEventListener('click', () => backOneTrack());
  forwardbtn.addEventListener('click', () => fwdOneTrack());

  seekslider.addEventListener('mousedown', (event) => {
    seeking = true;
    seek(event);
  });
  seekslider.addEventListener('mousemove', (event) => {
    seek(event)
  });
  seekslider.addEventListener('mouseup', (event) => seeking = false);

  volumeslider.addEventListener('mousemove', (event) => {
    // volume values are between 0 and 1 so divide value by 100
    audio.volume = event.target.value / 100;
  })

  speedlist.addEventListener('change', () => changeSpeed());

  audio.addEventListener('loadedmetadata', () => seektimeupdate());
  audio.addEventListener('timeupdate', () => seektimeupdate());
  audio.addEventListener('ended', () =>  autoSwitchTrack());

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
    seekslider.value = newtime || 0;

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

  const changeSpeed = () => audio.playbackRate = speedlist.value;

  const selectTrack = (event) => {
    let trackID = event.target.children.id;
    audio.src = `./${directory}/${event.target.value}.${ext}`;
    playlist_status.innerHTML = `${event.target.children[2].innerHTML}`;
    console.log(event, trackID);
  }

  const autoSwitchTrack = () => {
    if (playlist_index === playlist.length-1) {
      playlist_index = 0;
    } else {
      playlist_index += 1;
    }
    audio.src = `./${directory}/${playlist[playlist_index]}.${ext}`;
    playlist_status.innerHTML = `Track ${playlist_index+1}: ${playlist[playlist_index]}`;
    audio.play();
  }

  const backOneTrack = () => {
    if (playlist_index === 0) {
       playlist_index = playlist.length-1;
     } else {
       playlist_index -= 1;
     }
     audio.src = `./${directory}/${playlist[playlist_index]}.${ext}`;
     playlist_status.innerHTML = `Track ${playlist_index+1}: ${playlist[playlist_index]}`;
     playbtn.style.background = "url(./images/pause.png) no-repeat";
     audio.play();
  }
  const fwdOneTrack = () => {
    if (playlist_index === playlist.length-1) {
      playlist_index = 0;
    } else {
      playlist_index += 1;
    }
    audio.src = `./${directory}/${playlist[playlist_index]}.${ext}`;
    playlist_status.innerHTML = `Track ${playlist_index+1}: ${playlist[playlist_index]}`;
    playbtn.style.background = "url(./images/pause.png) no-repeat";
    audio.play();
  }

}


window.addEventListener('load', initAudioPlayer);
