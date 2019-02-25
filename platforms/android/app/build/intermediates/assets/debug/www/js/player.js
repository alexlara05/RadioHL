// Play audio
//
var my_media = null;
function playAudio(url) {

    if (my_media == null) {
        // Play the audio file at url
        var my_media = new Media(url,
            // success callback
            onSuccess,
            // error callback
            onError,
            // Media status
            status_change
        );
    }

    // Play audio
    my_media.play();

    // Update media position every second
    var mediaTimer = setInterval(function () {

        // get media position
        my_media.getCurrentPosition(
            // success callback
            function (position) {
                if (position > -1) {
                    $('.current_seconds').text(position + 's')
                }
            },
            // error callback
            function (e) {
                console.log("Error getting position=" + e);
            }
        );
    }, 1000);

    $('.play').click(function(){
        if(my_media != null){ // is playing
            my_media.stop();
            my_media.release();
            my_media = null;
            clearInterval(mediaTimer);
            playerStatusTittle("Detenido");
            MusicControls.updateIsPlaying(false);
        }else{
            my_media = new Media(url,
                // success callback
                onSuccess,
                // error callback
                onError,
                // Media status
                status_change
            );
            my_media.play();
        }
    });
}

function status_change(code) {
    switch (code) {
        case 0: // None
            console.log(code)
            break;
        case 1: // starting
        $('.play').attr('src', 'img/loader.gif');
        playerStatusTittle('Cargando...');
        songInfoMessage("Un momento por favor");
        console.log('Player starting')
            break;
        case 2: // Running
            $('.play').attr('src', 'img/pause_button.png');
            playerStatusTittle('Reproduciendo');
            console.log('Player rRunning')
            songInfoMessage("Transmisión en vivo");

            setMusicControls(); // Set music controls on status bar
            break;    
        case 3: // Paused
        $('.play').attr('src', 'img/play_button.png');
        playerStatusTittle("Detenido");
        console.log('Paused')
            break;
        case 4:  // Stoped
        $('.play').attr('src', 'img/play_button.png');
        playerStatusTittle("Detenido");
            console.log(code)
            break;    
    
        default:
            break;
    }
}

function onSuccess() { 
    console.log("playAudio():Audio Success"); 
}

function onError (err) { 
    if(err){ // An error ocurred
        $('.play').attr('src', 'img/play_button.png');
        //my_media.release();
        console.log(err);
        playerStatusTittle("Detenido")
    }
}

function playerStatusTittle(messages) {
    $('.player_status').text(messages);
}

function songInfoMessage(messages) {
    $('.song').text(messages);
}

// MUSIC CONTROLS
function setMusicControls() {
    // Music controls show player on status bar
    MusicControls.create({
        track : 'CAMARA 809 FM',
        artist      : 'Transmisión en vivo',
        cover       : 'logo_for_music_controls.png',
        isPlaying   : true,
        dismissable : true,	
        hasPrev   : false,
        hasNext   : false,
        hasClose  : true,
        ticker	  : 'Now playing "Time is Running Out"'
    }, function(success){
        console.log('Music Controls : '+success);
    },function(error){
        console.log('Music Controls ERROR : '+error);
    });
    // Register callback
    MusicControls.subscribe(events);
    
    // Start listening for events
    // The plugin will run the events function each time an event is fired
    MusicControls.listen();
}
function events(action) {
 
    const message = JSON.parse(action).message;
      switch(message) {
          case 'music-controls-next':
              // Do something
              break;
          case 'music-controls-previous':
              // Do something
              break;
          case 'music-controls-pause':
          $('.play').click();
          MusicControls.updateIsPlaying(false); // toggle the play/pause notification button
          console.log('paused press')
              // Do something
              break;
          case 'music-controls-play':
          $('.play').click();
          MusicControls.updateIsPlaying(true);
          console.log('play press')
              // Do something
              break;
          case 'music-controls-destroy':
              navigator.app.exitApp(); // Close app
              break;
   
          // External controls (iOS only)
          case 'music-controls-toggle-play-pause' :
              // Do something
              break;
          case 'music-controls-seek-to':
              const seekToInSeconds = JSON.parse(action).position;
              MusicControls.updateElapsed({
                  elapsed: seekToInSeconds,
                  isPlaying: true
              });
              // Do something
              break;
   
          // Headset events (Android only)
          // All media button events are listed below
          case 'music-controls-media-button' :
              // Do something
              break;
          case 'music-controls-headset-unplugged':
              // Do something
              break;
          case 'music-controls-headset-plugged':
              // Do something
              break;
          default:
              break;
      }
  }

