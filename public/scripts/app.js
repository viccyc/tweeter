/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 
$(document).ready(function(){
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // function takes in a tweet object and is responsible for returning a tweet
  // <article> element containing the entire HTML structure of the tweet.
  function createTweetElement(tweetData, daysAgo) {
    var $tweet = `<section class="new-tweets">
                  <article class="article">
                    <header class="article-header">
                        <img class="tweetImage" src=${tweetData.user.avatars.small}></img>    
                        <h1 class="h1Id">${tweetData.user.name}</h1>
                        <span class="tweetName">${tweetData.user.handle}</span>
                    </header>
                    <div class="tweetText">${escape(tweetData.content.text)}</div>
                    <footer class="article-footer">
                        <div class="tweetDays">${daysAgo}</div>
                        <div class="tweetFlags">
                        <a href="#"><i class="far fa-flag"></i></a>
                        <a href="#"><i class="fas fa-retweet"></i></a>
                        <a href="#"><i class="fas fa-heart"></i></a>
                      </div>                   
                    </footer>
                  </article>
                </section>`;
    return $tweet;
  }

  function renderTweets(data) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (tweetId in data) {
      var tweet = data[tweetId];
      createIndividTweet(tweet);
    }
  }

  function createIndividTweet(data) {
    var daysAgo = moment(data.created_at).fromNow();
    // Construct the html
    var tweetHtml = createTweetElement(data, daysAgo);
    // Append to the list
    $('#tweets-container').prepend(tweetHtml)
  }

  var loadTweets = function() {
  //Ajax GET request to /tweets and receive the array of tweets as JSON.
    $.get("/tweets", function(data, status){
      renderTweets(data);
      $(".tweetFlags").css({ opacity: 0 });

      $(".new-tweets").mouseenter(function() {
        $(this).children('article').children('.article-footer').children('.tweetFlags').css(({ opacity: 1 }));
      });

      $("article").mouseleave(function() {
        $(this).children('.article-footer').children('.tweetFlags').css(({ opacity: 0 }));
      });
    });
  };

  loadTweets();

  const showflashMsg = function(flashMessage) {
    $(".flashMessage").text(flashMessage);
    ($(".flashMessage").css('color', 'red'));
  };

  $("input[type=submit]").click(function() {
    const tweetText = $("#textAreaId").val();
    event.preventDefault();

    let flashMessage = "";
    
    if (!tweetText || tweetText === null) {
      flashMessage = 'There\'s no tweet to submit!';
      showflashMsg(flashMessage);
    } else if ($(".counter").text() < 0) {
      flashMessage = '140 chars max please';
      showflashMsg(flashMessage);
    } else {
      let queryString = $("#textAreaId").serialize();
      $.post("/tweets", queryString)
      .done(function(response) {
          createIndividTweet(response);
          $("#textAreaId").val('');
      }).fail(function(err) {
        console.log("failed", err);
      }).always(function() {
      });

    }      
  });

  $("#textAreaId").click(function() {
    ($(".flashMessage").css('color', '#eee'));
  });

  $(".compose").hover(function() {
    $(this).css({color: '#0a0a0a'});
  });

  $(".compose").mouseleave(function() {
    $(this).css({color: '#20bf9d'});
  });

  $(".compose").click(function() {
    if ($('.new-tweet').is(":visible")) {
      $('.new-tweet').slideUp();
    } else {
      $('.new-tweet').slideDown();
      $("#textAreaId").focus();
    }
  });
});