
$(document).ready(function(){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var url =window.location.href;
  var pageTitle = document.title;
  var pageWidth = $( window ).width();
  var pageHeight = $(window).height();
  //Facebook sdk
  /*window.fbAsyncInit = function() {
    FB.init({
      appId      : '328214110894764',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   //twitter
   window.twttr = (function(d, s, id) {
   var js, fjs = d.getElementsByTagName(s)[0],
     t = window.twttr || {};
   if (d.getElementById(id)) return t;
   js = d.createElement(s);
   js.id = id;
   js.src = "https://platform.twitter.com/widgets.js";
   fjs.parentNode.insertBefore(js, fjs);

   t._e = [];
   t.ready = function(f) {
     t._e.push(f);
   };

   return t;
   }(document, "script", "twitter-wjs"));
*/
  //detect device
  var isMobile;
  if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 //|| navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    isMobile = true;
  }
 else {
    isMobile = false;
  }
  if( navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 ){
    isMacMobile = true;
  }
 else {
    isMacMobile = false;
  }
  //force landscape isMobile==true &&
  if(isMobile==true && window.innerHeight > window.innerWidth){
    $('#main-wrapper').hide();
    $('#rotate').show();
  }
  if(isMobile==true){

  }

  window.addEventListener("orientationchange", function() {
    if(isMobile==true && window.innerHeight > window.innerWidth){
      $('#main-wrapper').hide();
      $('#rotate').show();
    }else{
      $('#main-wrapper').show();
      $('#rotate').hide();
    }
  }, false);
  $(window).resize(function(){
    gridSize();
    timeSize();
    pageWidth = $( window ).width();
    pageHeight = $(window).height();
    $('.content-wrapper').css('height',pageHeight - menuHeight+'px');
    if(isMobile==true && window.innerHeight > window.innerWidth){
      $('#main-wrapper').hide();
      $('#rotate').show();
    }else{
      $('#main-wrapper').show();
      $('#rotate').hide();
    }
  });
//home grid styles
var grid;
var vCenter;
var menuHeight = $('#menu').height();
$('body').css('height',pageHeight);
function gridSize(){
  pageHeight = pageHeight-20;
  var wrapperWidth = $('#full-grid').width();
  var wrapperHeight = pageHeight - menuHeight;
  var grid = (wrapperWidth/5)-6;
  var gridLrg = (wrapperWidth/5)-2;
  var gridXL = (wrapperWidth/6)-1;
  var height = wrapperHeight/3;
  var vCenter = (height/2)-18;
  var padLeft = pageWidth-($('.grid').width()*4);
  if (wrapperWidth >1143){
    $('#main-wrapper').css({
      "padding-left": padLeft
    })
  }else{
    $('#main-wrapper').css({
      "padding-left": "0px"
    })
  }
  $('.grid').css({
    "width": grid,
    "height": height
  });
  $('.grid p').css({
    "margin-top": vCenter
  });
  $('#full-grid .pre').css({
    "width":(grid+2)*2
  });
  $('.post').css({
    "width":grid*2
  });
  $('.intro').css({
    //"width":grid*2,
    "height":height
  })
  if (grid>275){
    $('.grid').css({
      "width": grid,
      "height": height
    });
    $('.grid p').css({
      "margin-top": vCenter
    });
    $('#full-grid .pre').css({
      "width":(grid+2)*2
    });
    $('.post').css({
      "width":grid*2
    });
    $('.intro').css({
      //"width":grid*2,
      "height":height
    })
  }
  if (grid>275&&gridLrg>275){
    $('.grid').css({
      "width": grid,
      "height": height
    });
    $('.grid p').css({
      "margin-top": vCenter
    });
    $('#full-grid .pre').css({
      "width":(grid+2)*2
    });
    $('.post').css({
      "width":grid*2
    });
    $('.intro').css({
      //"width":grid*2,
      "height":height
    })
  }
  $('#main-wrapper').css({
    "margin-top": menuHeight
  });
  $('#full-grid').css({
    "margin-top": menuHeight
  })
};

function timeSize(){
  var timeWidth = $('#time').width();
  if (timeWidth > 1500){
    $('#time .month .full').show();
    $('#time .month .abr').hide();
  }else{
    $('#time .month .full').hide();
    $('#time .month .abr').show();
  }
}
gridSize();
timeSize();

var menuHeight = $('#menu').height();
$('.content-wrapper').css('height',pageHeight - menuHeight+'px');
$('.month').prepend('<div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div>');
//parse data
var l=0;
var m=0;
var z=1;
var cycle =0;
var year = $('body').attr('class');
if (year == 'all-songs'){
  for (i=0;i<data.length;i++){
    var thisYear = data[i];
    var yearName = data[i].year;
    $('#all-songs').append('<div id="'+yearName+'" class="year"><h2>'+yearName+'</h2></div>')
    for (k=0;k<thisYear.music.length;k++){
      var music = thisYear.music[k];
      var title = music.title;
      var id = music.id;
      var artist = music.artist;
      var desc = music.desc;
      var embeddable = music.embeddable;
      $('#'+yearName).append('<div class="song song-'+k+'"><h3>'+title+'</h3>'+desc+'</div>');
      if (embeddable == "no"){
          $('#'+yearName+' .song-'+k+' iframe').remove();
          $('#'+yearName+' .song-'+k+' h3').after('<a href="https://www.youtube.com/watch?v='+id+'" class="norights" target="_blank"><img style="width:100%;" src="https://img.youtube.com/vi/'+id+'/hqdefault.jpg"><p>Watch on Youtube.</p></a>');
      }else{
        $('#'+yearName+' .song-'+k+' iframe').wrap('<div class="video"><div id="video"</div>');
      }
    }
  }
}else{
  for (i=0;i<data.length;i++){
    if (year == data[i].year){
      var thisYear = data[i];
      for (j=0;j<thisYear.events.length;j++){
        var events = thisYear.events[j];
        var title = events.title;
        var date = events.date;
        var desc = events.desc;
        var titleDashed = title.replace('?','').replace('(','').replace(')','').replace('!','').replace('/','').replace(/&#39;/g,'').replace(/&ldquo;/g,'').replace(/&rdquo;/g,'').replace(/&rsquo;/g,'').replace(':','').replace('.','').replace(/<[^>]*>/g,'').replace(/\s+/g, '-').toLowerCase();
        dateSplice = date.split('-');
        var month;
        var day;
        if (dateSplice[0]==1){
          month=0;
        }else {
          month = (dateSplice[0]-1)*5.42
        }
        day = dateSplice[1]*.181
        var dateLeft = month + day + 33;
        if (pageWidth<=1280){
          var dateTop = l *45 + 310;
        }else{
          var dateTop = l * 80 + 310;
        }
        if (dateTop<80){
          z = 1
        }else if (dateTop>=80 && dateTop <145){
          z= 2
        }else if (dateTop >=145 && dateTop <250){
          z=3
        }else if (dateTop >=250 && dateTop < 300){
          z=4
        }
        if (pageWidth<=1280){
          if (dateTop>600){
            l=-1;
            z=5
            cycle+=35;
          }
        }else{
          if (dateTop>520){
            l=-1;
            z=5
            cycle+=35;
          }
        }
        dateTop = dateTop + cycle;
        if(isMobile==true){
            dateTop = dateTop - 150;
        }
        var dName = dateSplice[1];
        var mName;
        switch(dateSplice[0]){
          case "1": mName = "Jan.";break;
          case "2": mName = "Feb.";break;
          case "3": mName = "March";break;
          case "4": mName = "April";break;
          case "5": mName = "May";break;
          case "6": mName = "June";break;
          case "7": mName = "July";break;
          case "8": mName = "Aug.";break;
          case "9": mName = "Sept.";break;
          case "10": mName = "Oct.";break;
          case "11": mName = "Nov.";break;
          case "12": mName = "Dec.";
        }
        var timelineTop = ($('#time').offset().top - dateTop)-42;
        //var negTop = pageHeight - dateTop;
        var eventright = false;
        if (dateLeft > 87){
          eventright = true
          dateLeft = dateLeft-12;
        };
        var negTop = pageHeight - dateTop;
        $('#events').prepend('<div id="#'+titleDashed+'"><div class="event event-'+j+' '+titleDashed+'" full="'+i+'&'+j+'" style="display:none;left:'+dateLeft+'%;top:'+pageHeight+'px;z-index:'+z+'"><p>'+mName+' '+dName+'</p><h2>'+title+'</h2></div><div style="top:'+dateTop+'px;height:'+timelineTop+'px;left:'+dateLeft+'%;" class="event-bar"></div></div>');
        if (eventright){
          $('.'+titleDashed).addClass('eventright');
          var dateRight= 88-dateLeft;
          $('.'+titleDashed).css({'left':'','right':dateRight+'%'});
          $('.'+titleDashed).siblings().css({'left':'','right':dateRight+'%'});
        };
        $('.event-'+j).show().animate({
          top:'-='+negTop
        },1500);
        l++
      };

      for (k=0;k<thisYear.music.length;k++){
        var music = thisYear.music[k];
        var title = music.title;
        var id = music.id;
        var artist = music.artist;
        var desc = music.desc;
        var embeddable = music.embeddable;
        var titleDashed = title.replace('?','').replace('(','').replace(')','').replace('!','').replace('/','').replace(/&#39;/g,'').replace(/&ldquo;/g,'').replace(/&rdquo;/g,'').replace(/&rsquo;/g,'').replace("'",'').replace(':','').replace('.','').replace("<em>",'').replace(/\s+/g, '-').toLowerCase();
        $('#music').append('<div class="song '+titleDashed+'" full="'+i+'&'+k+'"><div class="thumb"><img src="https://img.youtube.com/vi/'+id+'/hqdefault.jpg"></div><p>'+artist+'</p><h2>'+title+'</h2><img class="play-pause" data="'+id+'" src="images/play.png"><img class="stop" data="'+id+'" src="images/pause.png" style="display:none;"></div>');
        if (embeddable == "no"){
          $('.'+titleDashed+' .play-pause').remove();
        }
        m++
      }
    }
  }
}
//youtuber appId
var player;
var overLayvideo;
var playerLoaded = false;
function musicPlayer(id) {
    player = new YT.Player('player', {
      width: '640',
      height: '390',
      videoId: id,
      playerVars:{
        'showinfo':0
      },
      events: {
            'onReady': onPlayerReady
            //'onStateChange': onPlayerStateChange
          }
    });
    playerLoaded = true;
}
function videoPlayer(id){
  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
            window.onYouTubePlayerAPIReady = function() {
                videoPlayer(id);
            };
            $.getScript('http://www.youtube.com/iframe_api');
        } else {
          overLayvideo = new YT.Player ('video',{
            videoId: id,
            playerVars:{
              'showinfo':0
            },
            events:{
              'onStateChange': onVideoPlay
            }
          })
        }
}
// autoplay video
function onPlayerReady(event) {
  event.target.playVideo();
}
// stop music when video starts
function onVideoPlay(event) {
  if (overLayvideo.getPlayerState() ==1){
      if (player){
        player.stopVideo();
      }
      $('.play-pause').show();
      $('.stop').hide();
  }
}
$('.play-pause').hover(function(){
  $(this).attr('src','images/play-hover.png');
},function(){
  $(this).attr('src','images/play.png');
})

$('.play-pause').click(function(event){
  var id = $(this).attr('data');
  if (!playerLoaded){
    musicPlayer(id);
  }else{
    player.loadVideoById(id, 0, "small");
  }
  $('.play-pause').show();
  $('.stop').hide();
  $(this).hide()
  $(this).siblings($('.stop')).show();
  $(this).parents($('.song')).siblings().removeClass('active');
  $(this).parents($('.song')).addClass('active');
  event.stopPropagation();
});
$('.stop').hover(function(){
  $(this).attr('src','images/pause-hover.png');
},function(){
  $(this).attr('src','images/pause.png');
});

$('.stop').click(function(event){
  $(this).hide();
  $(this).siblings($('.play-pause')).show();
  $(this).parents($('.song')).removeClass('active');
  player.stopVideo();
  event.stopPropagation();
});

function showOverlay(event){
  $('.event').removeClass('active');
  $('.song').removeClass('active');
  event.addClass('active');
  $('#overlay .text').html('');
  var eventNumber = event.attr('full').split('&');
  if (event.parents('div').attr('id')=='music'){
    var embeddable = data[eventNumber[0]].music[eventNumber[1]].embeddable;
    var titleOverlay =  data[eventNumber[0]].music[eventNumber[1]].title;
    var videoId = data[eventNumber[0]].music[eventNumber[1]].id;
    var desc = data[eventNumber[0]].music[eventNumber[1]].desc;
  }else{
    var embeddable = data[eventNumber[0]].events[eventNumber[1]].embeddable;
    var titleOverlay =  data[eventNumber[0]].events[eventNumber[1]].title;
    var videoId = data[eventNumber[0]].events[eventNumber[1]].video;
    var desc = data[eventNumber[0]].events[eventNumber[1]].desc;
  }
  $('#overlay').fadeOut('fast',function(){
      $('#overlay .text').html('<h3>'+titleOverlay+'</h3>'+desc);
      if (videoId){
        if (embeddable == 'no'){
          $('#overlay .text h3').after('<a href="https://www.youtube.com/watch?v='+videoId+'" class="norights" target="_blank"><img style="width:100%;" src="https://img.youtube.com/vi/'+videoId+'/hqdefault.jpg" alt="Watch on YouTube."></a>');
          $('#overlay .text iframe').remove();
        }else{
          $('#overlay .text h3').after('<div class="video"><div id="video"></div></div>');
          $('#overlay .text iframe').remove();
          videoPlayer(videoId);
        }
      }
      $('#overlay .text img').wrap('<div class="image"></div>');
      var caption = $('#overlay .text img').attr('alt');
      $('#overlay .text .image').append('<div class="caption">'+caption+'</div>');
      if ($('#overlay .text img').hasClass('portrait')){
        $('.image').addClass('portrait');
      }
  });
  $('#overlay').fadeIn('slow',function(){bodyShow = true});
}

$('#events .event').hover(function(){
  $(this).siblings().css('border-left','1px solid #fff')
},function(){
  $(this).siblings().css('border-left','0')
})
$('#events .eventright').hover(function(){
  $(this).siblings().css('border-right','1px solid #fff')
  $(this).siblings().css('border-left','0')
},function(){
  $(this).siblings().css('border-right','0')
})
function anchor(){
  var url =window.location.href;
  if (url.indexOf('#')>=0){
    var link = url.split("#");
    link = link[1].toLowerCase();
    var linkShow = $('.'+link);
    if (linkShow){
      bodyShow = false;
      showOverlay(linkShow);
    }
  }
}
anchor();
window.onhashchange = function() {
  anchor();
}
function stopMusic(){
  player.stopVideo();
}

var bodyShow
var videoOverlay = $('#overlay iframe')
$('.event').click(function(){
  bodyShow = false;
  showOverlay($(this));
});
$('.song').click(function(){
  bodyShow = false;
  showOverlay($(this));
});
$('.content-wrapper').click(function(){
  if (bodyShow){
    $('#overlay').fadeOut('fast');
    $('#overlay .text').html('');
    $('.event').removeClass('active');
    $('.song').removeClass('active')

  }
});

$('.close').click(function(){
  $('#overlay').fadeOut('fast');
  $('#overlay .text').html('');
  $('.event').removeClass('active');
  $('.song').removeClass('active')
})

$('#text').animate({
  left:'+=800'
},1500);
$('.music-wrapper').animate({
  right:'+=2000'
},1500);
//custom scrollbar
$('#text .content').perfectScrollbar();
$('#music').perfectScrollbar();
$('#overlay').perfectScrollbar();
$('.about .content-wrapper').perfectScrollbar();

});
