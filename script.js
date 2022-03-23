console.log('Welcome to Spotify');
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Insane - AP Dhillon", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Let Me Love You - Justin Bieber", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Faded - Alan Walker", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Mann Mera - Gajendra Verma", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Perfect - Ed Sheeran", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Closer - The Chainsnokers", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Senorita - Camila Cabello and Shawn Mendes", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Prada - Jass Manak", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Blinding Lights - The Weeknd", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Arrogant - AP Dhillon", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// audioElement.play()

// Handle play/pause click on master button
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){       // if song is paused or not yet started, then play it.
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');              // change play to pause button when song is played.
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;                                      // make the gif visible when played
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;                                      // to make the gif invisible when paused
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);  // how much percentage of song is already played.
    myProgressBar.value = progress;                       
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();                                          // initially all buttons would be play buttons
        songIndex = parseInt(e.target.id);                       // e.target gives the element which gets clicked
        if(audioElement.paused || audioElement.currentTime <= 0){
            e.target.classList.remove('fa-play-circle');         // remove play sign and add pause sign when clicked
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;       // to play the correct song when clicked
            masterSongName.innerText = songs[songIndex].songName;  
            audioElement.currentTime = 0;                        // as song is changed, new song starts
            audioElement.play();
            gif.style.opacity = 1; 
            masterPlay.classList.remove('fa-play-circle');       // also remove play sign and add pause sign to master button when small buttons are clicked
            masterPlay.classList.add('fa-pause-circle');
        }else{
            e.target.classList.remove('fa-pause-circle');        // remove play sign and add pause sign when clicked
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0; 
            masterPlay.classList.remove('fa-pause-circle');      // also remove play sign and add pause sign to master button when small buttons are clicked
            masterPlay.classList.add('fa-play-circle');
        }
    })
})

// on clicking the next button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;   
    masterSongName.innerText = songs[songIndex].songName;       
    audioElement.currentTime = 0;                        
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');       
    masterPlay.classList.add('fa-pause-circle');
})

// on clicking the previous button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex < 0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;    
    masterSongName.innerText = songs[songIndex].songName;   
    audioElement.currentTime = 0;                        
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');       
    masterPlay.classList.add('fa-pause-circle');
})