
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function(jsonData) {
        this.receivedEvent('deviceready');
        playAudio("http://178.32.62.172:8067/stream");

        // Push notifications 
          window.plugins.OneSignal
            .startInit("540d061e-1d21-4ba3-b28b-c64b8b7b85f7")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();

            runAppInBackground();
            
            // Register the event listener
        document.addEventListener("backbutton", onBackKeyPressed, false);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

function onBackKeyPressed(){
 //alert(cordova.plugins.backgroundMode.isActive())
}

var notificationOpenedCallback = function (jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
};

app.initialize();

