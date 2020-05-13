
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
        
        playAudio("http://178.32.62.172:8059/stream");

        // Push notifications 
          window.plugins.OneSignal
            .startInit("071e7868-cf05-41e4-a6b5-8fda70c6a2a0")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();

            runAppInBackground();
            excludeAppFromBatterySaver();

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

