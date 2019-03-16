
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
        playAudio("http://178.32.62.172:8092/stream");

        // Push notifications 
          window.plugins.OneSignal
            .startInit("b21b0835-850c-459a-8054-a97d408ff4da")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

var notificationOpenedCallback = function (jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
};

app.initialize();

