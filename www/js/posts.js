// Initialize Firebase
var config = {
    apiKey: "AIzaSyAkhPZ2c6KW1YGGxemtffJo-u-4uuaG2os",
    authDomain: "camara809onesignalpush.firebaseapp.com",
    databaseURL: "https://camara809onesignalpush.firebaseio.com",
    projectId: "camara809onesignalpush",
    storageBucket: "camara809onesignalpush.appspot.com",
    messagingSenderId: "784237596940"
  };
  firebase.initializeApp(config);
  var db = firebase.database();
  var jsonData = [];
  var html = '';

  function getPosts(){
    var posts = db.ref("posts/");
 /*   posts.orderByChild("date").limitToFirst(50).on("child_added", function(data){
      var post = data.val();
      console.log("Added " + post)
      // this method iterate each post
      jsonData.push({
          id : data.child("id").val(),
          title : data.child("title").val(),
          author : data.child("author").val(),
          date : data.child("date").val(),
          status : data.child("status").val()
        });
    }); */

    posts.on("value", function(snapshot) {
        $('.posts').empty();
        html = '';
        jsonData = [];
          snapshot.forEach(function(data) {
            // Itero y agrego objetos a jsonData array para luego recorrer y ordenar
            var post = data.val();
            jsonData.push({
              id : post.id,
              title : post.title,
              author : post.author,
              img_iframe: post.img_iframe,
              date : post.date,
              body : post.body,
              status : post.status
            });
        });

        jsonData.reverse().forEach(function(data) {
          var post = data;
          if(post.status == "Publicado"){
              html += '<div class="post">'
                html += '<div class="post_img_iframe">'+post.img_iframe+'</div>';
                html += '<div class="post_author">';
                    html += '<div class="author">';
                    html += '<img src="img/no_photo.png" alt="Author"> <div class="name">'+post.author+'</div>';
                    html += '</div>' // end author
                    html += '<div class="post_date">'+post.date+'</div><div style="clear:both"></div>';
                html += '</div>'; // End post_author
                html += '<div class="post_title">'+post.title+'</div>';
                html += '<div class="post_body addReadMore showlesscontent">'+post.body+'</div>';
              html += '</div>'; // End Post
          }
        });

      $('.posts').prepend(html);
      AddReadMore();
    });

    // On change
    posts.on("child_changed", function(snapshot) {
      var changedPost = snapshot.val();
      console.log("The updated post title is " + changedPost.title);
    });
  }

  getPosts()