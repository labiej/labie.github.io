
$(document).ready(function() {
  var request = {
    headers: {
      "X-Mashape-Key": "KZ0WdcUZQlmsh2OWhqlpa0RU1ZLzp1Y5AftjsnetlvAFKvV5I1",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies',
    success: parseQuote
  };

  $quoteBtn = $('button#quote');
  $tweetBtn = $('button#tweet');

  // Get initial quote

  $.ajax(request);

  // New Quote
  $quoteBtn.click(function() {
    $quoteBtn.html('Loading...');


    $.ajax(request);

  });

  $tweetBtn.click( function() {
    window.open( $( '.send-tweet' ).attr( 'href' ) );
  });

});


function parseQuote( data ){

  //Start extracting relevant stuff
  data = JSON.parse(data);

  var quote = data.quote;
  var author = ( data.author.length > 0 ) ? data.author : "unknown";
  
  //Update fields
  $('#author').text(author);
  $('#quoteBox').text(quote);

  //Reset button color
  $quoteBtn.html('New Quote');

  //Prepare tweet
  tweet = quote + " - " + author;
  if(tweet.length > 140){
    var newLength = 134-author.length;
    tweet = quote.substr(0,newLength) + "... - " + author;
  }
  $('.send-tweet').attr('href', encodeURI("https://twitter.com/intent/tweet?text="+tweet));


}
