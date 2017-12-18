$(document).ready(function(){ 
    
        //Global Variables
        //----------------------------------------------------------
        var topics = ['Game of Thrones','SNL','Even Stevens', 'Modern Family', 'Saved By the Bell', 'The Office', 'Judge Judy', 'House of Cards','Seinfield'];
        var searchWord = [];
        
        //AJAX
        //----------------------------------------------------------
        function displayGifs() {
        
            var apiKey = "dc6zaTOxFJmzC";
            var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + searchWord + "&limit=10&rating=pg&api_key=" + apiKey;
            
    
            $.ajax({url: giphyURL, method: 'GET'}).done(function(response) {
                //clear gifs from webpage
                $('#gifs').empty();
    
            
                for(var i=0; i<10; i++) {
                    var image = response.data[i].images.fixed_height_still.url;
                    var animated = response.data[i].images.fixed_height.url;
                    var rating = '<p>Rating: ' + response.data[i].rating.toUpperCase();
                    var gifImage = $('<img>');
                    var gifWrapper = $('<div/>');
                    
                
                    gifWrapper.addClass('gifWrapper');
                    gifImage.addClass('gifs');
                    gifImage.attr('src', image)
                    gifWrapper.attr('id', "gifWrap" + [i])
                    gifImage.attr('data-still', image);
                    gifImage.attr('data-animate', animated);
                    gifImage.attr('data-state', 'still');
    
                
                    $('#gifs').append(gifWrapper);
                    $('#gifWrap' + [i]).append(rating);
                    $('#gifWrap' + [i]).append(gifImage);
                    
                    
                }
                
            
                $('.gifs').on('click', function() {
                    var state = $(this).attr('data-state');
    
                    if ( state == 'still'){
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    }
                    else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                })
    
            })
                
        };
    
        
        //Functions
        //--------------------------------------------------------------
    
        //creates buttons and gives them a class
        function buildButtons() {
            //empty buttons from #gifButtons div
            $('#pageButtons').empty();
            //repopulate buttons in topics array
            for(var i = 0; i < topics.length; i++) {
                var button = $('<button/>');
                //concatinates multiple words with + using .join()
                button.data('query', topics[i].split(' ').join('+'))
                button.addClass('TVshowBTNs');
                button.data('name', topics[i]);
                button.text(topics[i]);
                $('#pageButtons').append(button);
                
            }
            $('.TVshowBTNs').on("click", function() {
                var value = $(this).data('query').trim();
                searchWord = [];
                searchWord.push(value);
                displayGifs();
    
        })
        };
    
        //User Interaction
        //----------------------------------------------------------------
        //builds the initial site sports buttons
        buildButtons();
    
        //on click to create new sports topic button
        $('#addGif').on('click', function() {
            //gets the value of #gif-input and trims the word, pushes to topics
            for(var i=0; i<topics.length; i++) {
            var tvShow = $('#gif-input').val().trim();
            topics.push(tvShow);
            buildButtons();
            //clear input field
            $('#gif-input').val('');
            return false;
            }
            
        })
    });