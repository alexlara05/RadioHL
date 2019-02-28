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
            var messageHour = localeDateTime.split(',')[1];
            var html = '';
            if(m.text != undefined && m.name != undefined){
                html += '<div class="user">';
                html += '<img class="user_avatar" src="'+(m.photo != '' && m.photo != undefined ? m.photo : 'img/no_photo.png')+'">';
                html += '<div class="user_name" style="color:'+m.ucolor+'">'+m.name+'</div>';
                html += '</div>';
                
                html += '<div class="chat_text_bubble">';
                    html += '<div class="message_text">'+m.text+'</div>';
                    html += '<div class="message_date">hoy'+messageHour+'</div>';
                    html += '<div style="clear:both"></div>'
                html += '</div>';
                $('#output').append(html);
                window.scrollTo(0,$(document).height());
            }
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
        var lsName = localStorage.getItem('ls_user_name');
        // If input has text
        if(input.value.trim() != '' && lsName != ''){
            p.publish({
                channel : channel, 
                message : {
                    uid: localStorage.getItem('ls_user_id'),
                    ucolor: localStorage.getItem('ls_user_color'),
                    name: lsName,
                    photo: localStorage.getItem('ls_user_photo'), 
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
    }

    // Get messages
    p.history({ channel: channel, include_token: true }, function (result) {
      if (status.error) {
        console.log("history call failed -> ", status);
      } else {
        result[0].forEach(function (m, index) {
            if(m.message.text != undefined && m.message.name != undefined){
                var html = '';
                console.log(index);
                var t = m.timetoken;
                var d = new Date(t/10000);
                var localeDateTime = d.toLocaleString('en');
                let todayDate = new Date().toLocaleDateString('en');
                $today = new Date();
                $yesterday = new Date($today);
                $yesterday.setDate($today.getDate() - 1);
                let yesterdayDate = $yesterday.toLocaleDateString();
    
                if(m.message.text != undefined && m.message.name != undefined){
                    html += '<div class="user">';
                    html += '<img class="user_avatar" src="'+m.message.photo+'">';
                    html += '<div class="user_name" style="color:'+m.message.ucolor+'">'+m.message.name+'</div>';
                    html += '</div>';
                    var messageDate = localeDateTime.split(',')[0];
                    var messageHour = localeDateTime.split(',')[1];
                    html += '<div class="chat_text_bubble">';
                        html += '<div class="message_text">'+m.message.text+'</div>';
                        html += '<div class="message_date">'+(messageDate == todayDate ? 'hoy'+ messageHour : (messageDate == yesterdayDate ? 'ayer' + messageHour : localeDateTime))+'</div>';
                        html += '<div style="clear:both"></div>'
                    html += '</div>';
                    $('#output').append(html);
                    window.scrollTo(0,$(document).height());
                }
            }
        });

      }
    });

})();

$('#input').focus(function() {
    var ls_user_name = localStorage.getItem('ls_user_name');
    var ls_uid = localStorage.getItem('ls_uid');
    if(ls_user_name == undefined && ls_uid == undefined){
      $('.profile_page_container').show("slow");
    }
  });

  // Go back localStorage profile info chat
  $('.go_gack').click(function() {
    $('.profile_page_container').hide("slow");
  });

  // Acept button localStorage profile info chat
  $('.ls_acept').click(function() {
      var userInput =  $('#user_name');
      var userInputPhoto =  $('#user_photo');
      if(userInput.val().trim() != ''){
        localStorage.setItem('ls_user_name', userInput.val().trim());
        localStorage.setItem('ls_user_photo', userInputPhoto.val().trim());
        localStorage.setItem('ls_user_id', uuidv4());
        localStorage.setItem('ls_user_color', getRandomColor());
        $('.profile_page_container').hide("slow");
      }
  });

  // Update name and photo
  $('.change_name').click(function() {
    $('.profile_page_container').show("slow");
    $('#user_name').val(localStorage.getItem('ls_user_name'));
    $('#user_photo').val(localStorage.getItem('ls_user_photo'));
  });