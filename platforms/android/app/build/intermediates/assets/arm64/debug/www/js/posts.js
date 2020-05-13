// Initialize Firebase
var config = {
  apiKey: "AIzaSyAlQEybBWhlG1rw24zGnu-OV9ZdJd2ft1o",
  authDomain: "adonairadio-74d74.firebaseapp.com",
  databaseURL: "https://adonairadio-74d74.firebaseio.com",
  projectId: "adonairadio-74d74",
  storageBucket: "adonairadio-74d74.appspot.com",
  messagingSenderId: "373473229173",
  appId: "1:373473229173:web:13883a8695631ca29fbb3c",
  measurementId: "G-JPSHY4S859"
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

  function getAds() {
    var adsRef = db.ref("ads/1");
    adsRef.on("value", function(snapshot){
      $('.ads').empty();
      var ads = snapshot.val();
      $('.ads').append(ads.body.trim());
    });
  }
  getPosts();
  getAds()