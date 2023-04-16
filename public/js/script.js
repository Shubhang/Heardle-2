let songs;
let currentSong;
let attempts;
let duration;

async function fetchSongs() {
  const response = await fetch('/songs.json');
  songs = await response.json();
}

function populateSongOptions() {
  const songSelect = document.getElementById('songGuess');
  songSelect.innerHTML = '';
  songs.forEach(song => {
    const option = document.createElement('option');
    option.value = song.title;
    option.innerText = song.title;
    songSelect.appendChild(option);
  });
}

function playAudioSnippet() {
    const audio = document.getElementById('audioSnippet');
    audio.src = `/songs/${currentSong.file}`;
    audio.play();
  
    if (duration) {
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, duration * 1000);
    }
  }
  
  function newGame() {
    attempts = 6;
    duration = 3; // Initial duration in seconds
    currentSong = songs[Math.floor(Math.random() * songs.length)];
    document.getElementById('gameStatus').innerText = '';
    populateSongOptions();
  }
  
  function handleGuess(e) {
    e.preventDefault();
    const guess = document.getElementById('songGuess').value;
    const gameStatus = document.getElementById('gameStatus');
    attempts--;
  
    if (guess === currentSong.title) {
      gameStatus.innerText = 'Congratulations! You guessed the correct song!';
      document.getElementById('guessForm').removeEventListener('submit', handleGuess);
    } else {
      duration += 2; // Increase duration by 2 seconds after each incorrect guess
      gameStatus.innerText = `Incorrect! You have ${attempts} attempts remaining.`;
    }
  
    if (attempts === 0) {
      gameStatus.innerText = `Game over! The correct song was ${currentSong.title}.`;
      document.getElementById('guessForm').removeEventListener('submit', handleGuess);
    }
  }
    
    document.addEventListener('DOMContentLoaded', async () => {
    await fetchSongs();
    newGame();
    document.getElementById('guessForm').addEventListener('submit', handleGuess);
    
});
    
    