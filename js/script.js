
var Song = function(path){
  this.src = path;
};

class Jukebox{
  constructor(){
    this.player = document.createElement('AUDIO');
    this.playlist = [];
    this.playlist.push(new Song('music/Roots-Manuva-Movements.mp3'));
  }

  ShowPlaylist(){
    document.getElementById('playlist').innerHTML = '';
    this.playlist.forEach(function(current, index){
      var html = '<div id="song-@id@">@path@</div>';
      html = html.replace('@id@', index);
      html = html.replace('@path@', current.src);
      document.getElementById('playlist').insertAdjacentHTML('beforeend', html);
    });
  }
  appendFile(){
    this.player.src = this.playlist[0].src;
    document.getElementById('audio').appendChild(this.player);
    this.setCurrent();
  }
  setNewSong(){
    this.player.src = this.playlist[this.playlist.length - 1].src;
  }
  setSong(path){
    this.player.src = path;
    this.setCurrent();
  }
  setCurrent(){
    var path = document.getElementById('audio').childNodes[0].src;
    path = path.split('/');
    path = 'music/' + path[path.length -1];
    var sources = [];
    this.playlist.forEach(function(current){
      sources.push(current.src);
    });
    document.getElementById('song-' + sources.indexOf(path)).classList.add('current');
  }
  play(){
    this.player.play();
  }
  pause(){
    this.player.pause();
  }
  stop(){
    this.player.pause();
    this.player.currentTime = 0;
  }
  upload(){
    var newPath = document.getElementById('upload').value;
    newPath = newPath.split('\\');
    newPath = 'music/' + newPath[newPath.length - 1];
    this.playlist.push(new Song(newPath));
    this.ShowPlaylist();
    this.setNewSong();
    this.setCurrent();
  }
}

function init(){
  var jukebox = new Jukebox();
  jukebox.ShowPlaylist();
  jukebox.appendFile();
  // event handlers
  document.getElementById('play').addEventListener('click', function(){
    jukebox.play();
  });
  document.getElementById('pause').addEventListener('click', function(){
    jukebox.pause();
  });
  document.getElementById('stop').addEventListener('click', function(){
    jukebox.stop();
  });
  document.getElementById('upload').addEventListener('change', function(){
    jukebox.upload();
  });

  document.getElementById('playlist').addEventListener('click', function(event){
    var allSongs = document.getElementById('playlist').childNodes;
    allSongs.forEach(function(current){
      current.classList.remove('current');
    });
    jukebox.setSong(event.srcElement.innerHTML);
  });
}
init();
