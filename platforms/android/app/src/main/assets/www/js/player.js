// Play audio
//
var my_media = null;
var isPlaying = 0;
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
    isPlaying = 1;

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
                console.log("Error getting pos=" + e);
                isPlaying = 0
            }
        );
    }, 1000);

    $('.play').click(function(){
        var hola = my_media;
        if(my_media != null){ // is playing
            my_media.stop();
            my_media.release();
            my_media = null;
            playerStatusTittle("Detenido");
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
        console.log('starting')
            break;
        case 2: // Running
        $('.play').attr('src', 'img/pause_button.png');
        playerStatusTittle('Reproduciendo');
        console.log('Running')
        songInfoMessage("Transmisión en vivo");
            break;    
        case 3: // Paused
        $('.play').attr('src', 'img/play_button.png');
        playerStatusTittle("Detenido");
        console.log('Paused')
        isPlaying = 0
            break;
        case 4:  // Stoped
        $('.play').attr('src', 'img/play_button.png');
        playerStatusTittle("Detenido");
        isPlaying = 0
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

// Pause audio
//
function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}

// Stop audio
//
function stopAudio() {
    if (my_media) {
        my_media.stop();
    }
}

function playerStatusTittle(messages) {
    $('.player_status').text(messages);
}

function songInfoMessage(messages) {
    $('.song').text(messages);
}