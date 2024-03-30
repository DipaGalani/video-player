const playerContainer = document.querySelector(".player");
const videoElement = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.querySelector("#play-btn");
const volumeIcon = document.querySelector("#volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTimeEl = document.querySelector(".time-elapsed");
const durationEl = document.querySelector(".time-duration");
const playbackRate = document.querySelector("select");
const fullScreenBtn = document.querySelector(".full-screen");

// Global Variables
let lastVolume = 1;
let isFullScreen = false;

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlayPause() {
  if (videoElement.paused) {
    videoElement.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    videoElement.pause();
    showPlayIcon();
  }
}
// Progress Bar ---------------------------------- //
function displayVideoDuration(videoDuration) {
  const minutes = Math.floor(videoDuration / 60);
  let seconds = Math.floor(videoDuration % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  const { currentTime, duration } = videoElement;
  const progressPercentage = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  currentTimeEl.textContent = `${displayVideoDuration(currentTime)} /`;
  durationEl.textContent = ` ${displayVideoDuration(duration)}`;
}

function setProgress(evt) {
  const newTime = evt.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  videoElement.currentTime = newTime * videoElement.duration;
}

// Volume Controls --------------------------- //
function setVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  videoElement.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-mute");
  }
  lastVolume = volume;
}

function muteUnmute() {
  if (videoElement.volume) {
    lastVolume = videoElement.volume;
    videoElement.volume = 0;
    volumeBar.style.width = 0;
  } else {
    videoElement.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

// Change Playback Speed -------------------- //
function setPlaybackRate(evt) {
  videoElement.playbackRate = evt.target.value;
  console.log(evt.target.value);
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(player) {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.webkitRequestFullscreen) {
    /* Safari */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) {
    /* IE11 */
    player.msRequestFullscreen();
  }
  videoElement.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  videoElement.classList.remove("video-fullscreen");
}

function toggleFullScreen() {
  if (!isFullScreen) {
    openFullscreen(playerContainer);
  } else {
    closeFullscreen();
  }
  isFullScreen = !isFullScreen;
}

// Event Listeners
playBtn.addEventListener("click", togglePlayPause);
videoElement.addEventListener("click", togglePlayPause);
videoElement.addEventListener("ended", showPlayIcon); // show play icon when the video has ended
videoElement.addEventListener("timeupdate", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", setVolume);
volumeIcon.addEventListener("click", muteUnmute);
playbackRate.addEventListener("change", setPlaybackRate);
fullScreenBtn.addEventListener("click", toggleFullScreen);
