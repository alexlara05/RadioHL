(function() {

    var output = PUBNUB.$('output'), 
        input = PUBNUB.$('input'), 
        button = PUBNUB.$('button'),
        presence = PUBNUB.$('presence');

    var channel = 'Channel-8q8k0tpmv';

    var p = PUBNUB.init({
        subscribe_key: 'sub-c-dfb4dafe-3193-11e9-abbd-facdde0fb9a0',
        publish_key:   'pub-c-7d967ce6-121b-4c1d-bf7a-79e771a1328c',
        secretKey:     'sec-c-YTNhNTE1MDItZGZmYS00ZWZmLWJiYmMtNWY3OThkODQ1MDNh'
    });

    p.subscribe({
        channel  : channel,
        withPresence: true,
        callback : function(m, e, c) { 
            var t = e[1];
            var d = new Date(t/10000);
            var localeDateTime = d.toLocaleString('en');

           // $('#output').append(html);

            window.scrollTo(0, $(document).height());
        },
        presence: function(m){
            if(m.occupancy > 1) {
                presence.textContent = m.occupancy + ' personas en linea';
            } else {
                presence.textContent = 'No hay más personas en linea';
            }
        }
    });

    p.bind('keyup', input, function(e) {
        (e.keyCode || e.charCode) === 13 && publish()
    });

    p.bind('click', button, publish);

    // Send message
    function publish() {
        p.publish({
            channel : channel, 
            message : {
                avatar: 'https://nellyrac.com/img/UserNoSign.png', 
                text: input.value
            }, 
            x : (input.value='')
        },
        function(status, response){
                if (status.error) {
                // handle error
                    console.log(status)
                } else {
                    console.log("Mensaje publicado")
                }
            }   
        );
    }

    // Get messages
    p.history({ channel: channel }, function (result) {
        var wSize = windowSize();
      if (status.error) {
        console.log("history call failed -> ", status);
      } else {
        var t = result[1];
            var d = new Date(t/10000);
            var localeDateTime = d.toLocaleString();

        result[0].forEach(function (m, index) {
          
           // $('#output').append(html);
            window.scrollTo(0,$(document).height());
        });

        
      }
    });

})();
