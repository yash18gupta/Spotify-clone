console.log("Welcome to spotify!")

//Intialising elements
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Song-1", filePath: "songs/1.mp3" ,coverName: "images/1.jpg"},
    {songName: "Song-2", filePath: "songs/2.mp3" ,coverName: "images/2.jpg"},
    {songName: "Song-3", filePath: "songs/3.mp3" ,coverName: "images/3.jpg"},
    {songName: "Song-4", filePath: "songs/4.mp3" ,coverName: "images/4.jpg"},
    {songName: "Song-5", filePath: "songs/5.mp3" ,coverName: "images/5.jpg"},
    {songName: "Song-6", filePath: "songs/6.mp3" ,coverName: "images/6.jpg"},
    {songName: "Song-7", filePath: "songs/7.mp3" ,coverName: "images/7.jpg"},
    {songName: "Song-8", filePath: "songs/8.mp3" ,coverName: "images/8.jpg"},
    {songName: "Song-9", filePath: "songs/9.mp3" ,coverName: "images/9.jpg"},
    {songName: "Song-10", filePath: "songs/10.mp3" ,coverName: "images/10.jpg"},
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverName;
    element.getElementsByClassName("songName")[0].innerHTML= songs[i].songName;
});
masterPlay.addEventListener("click",function(){
    if(audioElement.paused ||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener("timeupdate",function(){
    //Update seekBar

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change",function(){
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = 'songs/'+(songIndex+1)+'.mp3'
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = 'songs/'+(songIndex+1)+'.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'songs/'+(songIndex+1)+'.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})