function windowSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    return {
        with: w,
        height: h
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function AddReadMore() {
    //This limit you can set after how much characters you want to show Read More.
    var carLmt = 200;
    // Text to show when text is collapsed
    var readMoreTxt = " ... Mostrar más";
    // Text to show when text is expanded
    var readLessTxt = " Mostrar menos";
 
 
    //Traverse all selectors with this class and manupulate HTML part to show Read More
    $(".addReadMore").each(function() {
        if ($(this).find(".firstSec").length)
            return;
 
        var allstr = $(this).html();
        if (allstr.length > carLmt) {
            var firstSet = allstr.substring(0, carLmt);
            var secdHalf = allstr.substring(carLmt, allstr.length);
            var strtoadd = firstSet + "<span class='SecSec'>" + secdHalf + "</span><span class='readMore'  title='Click to Show More'>" + readMoreTxt + "</span><span class='readLess' title='Click to Show Less'>" + readLessTxt + "</span>";
            $(this).html(strtoadd);
        }
 
    });
    //Read More and Read Less Click Event binding
    $(".readMore,.readLess").click(function() {
        $(this).closest(".addReadMore").toggleClass("showlesscontent showmorecontent");
    });
}

function runAppInBackground() {
    cordova.plugins.backgroundMode.setDefaults({
        title: 'Elohim Radio',
        text: 'Alabando Al Rey',
        icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap
        color: 'ed0003', // hex format like 'F14F4D'
        resume: true,
        silent: true 
    });

    cordova.plugins.backgroundMode.enable();
   // cordova.plugins.backgroundMode.overrideBackButton();

    cordova.plugins.backgroundMode.overrideBackButton();
    
    cordova.plugins.backgroundMode.on('activate', function () {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
    });

    cordova.plugins.backgroundMode.on('deactivate', function () {
        //cordova.plugins.notification.badge.clear();
    });
}

//$(function() {
    //Calling function after Page Load
  //  AddReadMore();
//});
 