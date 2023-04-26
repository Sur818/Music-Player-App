const wrapper = document.querySelector(".main-container"),
musicImg = wrapper.querySelector(".music-section img"),
musicName = wrapper.querySelector(".music-section .song-title"),
musicArtist = wrapper.querySelector(".music-section .artist-name");
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector("#play-pause-btn"),
prevBtn = wrapper.querySelector("#prev-btn"),
nextBtn = wrapper.querySelector("#next-btn");
musicList = wrapper.querySelector("#music-list"),
musicDown = wrapper.querySelector("#volume-down");
const seek_slider=wrapper.querySelector(".seek_slider");
let curr_time=wrapper.querySelector(".current-time");
let total_duration=wrapper.querySelector(".total-duration");
let curr_track=mainAudio;
let allMusic = [
    {
      name: "Harley Bird - Home",
      artist: "Jordan Schor",
      img: "music-1",
      src: "music-1"
    },
    {
      name: "Ikson Anywhere – Ikson",
      artist: "Audio Library",
      img: "music-2",
      src: "music-2"
    },
    {
      name: "Achha Sila - Diya",
      artist: "B-praak Nikhil-Vinay",
      img: "music-3",
      src: "music-3"
    },
    {
      name: "Tip - Tip Barsa pani",
      artist: "Alka Yagini Udit-Narayan",
      img: "music-4",
      src: "music-4"
    },
    {
      name: "Mere - Yaaraa",
      artist: "Arijit Singh Neeti-Mohan",
      img: "music-5",
      src: "music-5"
    },
    {
      name: "Chann - Di Kudi",
      artist: "Momin Ali Wajid",
      img: "music-6",
      src: "music-6"
    },
];

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;
console.log(musicIndex);


window.addEventListener("load", ()=>{
    loadMusic(musicIndex); 
    playingNow();
    pauseMusic();
  });


  function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
    playingNow();
    reset();
    updateTimer = setInterval(setUpdate, 1000);
  }
  



function prevMusic(){
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  playMusic();
  loadMusic(musicIndex);
}

function nextMusic(){
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  playMusic();
  loadMusic(musicIndex);
}

  prevBtn.addEventListener("click", ()=>{
    prevMusic();
    playingNow();
  });



  nextBtn.addEventListener("click", ()=>{
    nextMusic();
    playingNow();
  });

  function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("span").innerText = "pause";
    musicImg.classList.add("anime");
    mainAudio.play();
  }
 
  function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("span").innerText = "play_arrow";
    musicImg.classList.remove("anime");
    mainAudio.pause();
  }

  playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingNow();
  });
 

const ulTag = wrapper.querySelector("ul");
    for (let i = 0; i <allMusic.length; i++) {
      let liTag = `<li onclick="clicked(this)" li-index="${i + 1}">
                    <div class="row">
                      <span>${allMusic[i].name}</span>
                      <p>${allMusic[i].artist}</p>
                    </div>
                    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                  </li>`;
      ulTag.insertAdjacentHTML("beforeend", liTag);
      let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; 
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}



  musicList.addEventListener("click", (e)=> {
    playingNow();
  document.querySelector(".music-list").classList.toggle('show-music-list');
  var closeIcon= document.querySelector(".music-list #close-icon");
  closeIcon.addEventListener("click", ()=>{
    document.querySelector(".music-list").classList.remove('show-music-list');
  });
});




function playingNow(){
  const allLiTags = ulTag.querySelectorAll("li");
  for(let j=0;j<allLiTags.length;j++){
    let audioTag =allLiTags[j].querySelector(".audio-duration");
    if(allLiTags[j].classList.contains('playing')){
      allLiTags[j].classList.remove('playing');
      let adDuration=audioTag.getAttribute("t-duration");
      audioTag.innerText=adDuration;
    }
    if(allLiTags[j].getAttribute('li-index')==musicIndex){
      allLiTags[j].classList.add('playing');
      if (mainAudio.paused && mainAudio.currentTime >= 0 && !mainAudio.ended) {
        audioTag.innerText='paused';
    } else {
      audioTag.innerText='playing';
    }
      
    }
    allLiTags[j].setAttribute('onclick','clicked(this)');
  }
}


function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex=getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}


  musicDown.addEventListener("click", ()=>{
  const volume_slider=wrapper.querySelector(".volume-controller");
  volume_slider.classList.toggle("show_volumeBar");
  });


  function setVolume(){
    const volume_sliderBar=wrapper.querySelector(".volume-controller .volume_slider");
    const volume_icon=wrapper.querySelector("#volume-down span");
    mainAudio.volume=volume_sliderBar.value/100;
    if(mainAudio.volume==0.01){
      mainAudio.volume=0;
    }
    if(mainAudio.volume<0.45 && mainAudio.volume!=0 ){
      volume_icon.innerText="volume_down"; 
    }
    else if(mainAudio.volume>=0.45){
      volume_icon.innerText="volume_up";
    }
    if(mainAudio.volume==0.000){
      volume_icon.innerText="volume_off"; 
    }
  }



  function seekTo(){
    curr_track=mainAudio;
    console.log(curr_track);
    let seekto = curr_track.duration * (seek_slider.value/100);
    curr_track.currentTime = seekto;
  }


  function setUpdate(){
    let seekPosition=0;
    if(!isNaN(curr_track.duration)){
      seekPosition=curr_track.currentTime*(100/curr_track.duration);
      seek_slider.value=seekPosition;
     
      let currentMinutes=Math.floor(curr_track.currentTime/60);
      let currentSeconds=Math.floor(curr_track.currentTime-currentMinutes*60);
      let durationMinutes=Math.floor(curr_track.duration/60);
      let durationSeconds=Math.floor(curr_track.duration-durationMinutes*60);
      if(currentSeconds<10){
        currentSeconds="0"+ currentSeconds;
      }
      if(durationSeconds<10){
        durationSeconds="0"+ durationSeconds;
      }
      if(currentMinutes<10){
        currentMinutes+"0"+currentMinutes;
      }
      if(durationMinutes<10){
        durationMinutes+"0"+durationMinutes;
      }
      curr_time.textContent=currentMinutes+":"+currentSeconds;
      total_duration.textContent=durationMinutes+":"+durationSeconds;
      console.log(total_duration.textContent);
    }
  }
  
function reset(){
  curr_time.textContent="00:00";
  total_duration.textContent="00:00";
  seek_slider.value=0;
}

mainAudio.addEventListener('ended', ()=>{
nextMusic();
})



  

