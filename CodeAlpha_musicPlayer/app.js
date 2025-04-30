const songs = [
    {
        name: "Hum Aapke",
        artist: "Unknown Artist",
        file: "song/hum aapke.mp3",
        cover: "image/2.jpg"
    },
    {
        name: "Ishq",
        artist: "Unknown Artist",
        file: "song/ishq.mp3",
        cover: "image/1.webp"
    },
    {
        name: "Kaun Tujhe",
        artist: "Unknown Artist",
        file: "song/Kon Tujhe.mp3",
        cover: "image/2.jpg"
    },
    {
        name: "Veer Zaara",
        artist: "Unknown Artist",
        file: "song/veer zaara.mp3",
        cover: "image/4.jpg"
    }
];

const audio = document.getElementById('audio');
const playBtn = document.querySelector('.playBtn');
const backwardBtn = document.querySelector('.backwardBtn');
const forwardBtn = document.querySelector('.forwardBtn');
const musicName = document.querySelector('.musicName');
const artistName = document.querySelector('.artistName');
const seekBar = document.querySelector('.seekBar');
const currentTimeEl = document.querySelector('.currentTime');
const durationTimeEl = document.querySelector('.durationTime');

let currentSongIndex = 0;
let isPlaying = false;
let updateTimer;

function loadSong(index) {
    const song = songs[index];
    audio.src = song.file;
    musicName.textContent = song.name;
    artistName.textContent = song.artist;
    seekBar.value = 0;
    currentTimeEl.textContent = "00:00";
    durationTimeEl.textContent = "00:00";

    const disk = document.querySelector('.disk');
    disk.style.backgroundImage = `url('${song.cover}')`;
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
    startUpdateTimer();
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
    clearInterval(updateTimer);
}

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

function startUpdateTimer() {
    updateTimer = setInterval(() => {
        seekBar.value = audio.currentTime;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }, 500);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
}

audio.addEventListener('loadedmetadata', () => {
    seekBar.max = audio.duration;
    durationTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
    nextSong();
});

seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

playBtn.addEventListener('click', togglePlayPause);
forwardBtn.addEventListener('click', nextSong);
backwardBtn.addEventListener('click', prevSong);

// Initialize player
loadSong(currentSongIndex);
