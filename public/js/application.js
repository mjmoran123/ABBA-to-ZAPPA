$(document).ready(function() {
	var startFlag;
	var goalFlag;
	var currentArtist;
	
	toggleSearchers();

	$('.forms').on('submit', '.form', function(event) {
		event.preventDefault();
		var $search = $(this);
		var artistQuery = $search.serialize();
		var url = "https://api.spotify.com/v1/search?" + artistQuery + "&type=artist";
		var whichEnd;
		if ($search.hasClass('start')) {
			whichEnd = 'start';
		} else {
			whichEnd = 'goal';
		}
		var request = $.ajax({
			url: url
		});

		request.done(function(response) {
			var searchResults = response;
			$('.button').hide();
			for(var i = 0; i < 10; i++) {
				var artistButton = "<li class='button-li'><button id='"+ searchResults.artists.items[i].id + "' class='button " + whichEnd + "'>" + searchResults.artists.items[i].name + "</button></li>"
				$('#button-list').append(artistButton);
			}
		});	
	});

	$('.search-result-buttons').on('click', '.button', function(event) {
		$button = $(this)
		if ($button.hasClass('start')) {
			var startArtist = new Artist($button.text(), $button.attr('id'));
			startFlag = 1;
			$('#artist-list').prepend("<li>" + startArtist.name + "</li>");
		} else {
			var goalArtist = new Artist($button.text(), $button.attr('id'));
			goalFlag = 1;
			$('#artist-list').append("<li>" + goalArtist.name + "</li>");
		}
		$('.button-li').hide();
		if (!startFlag || !goalFlag) {
			toggleSearchers();
		} else {
			$('form').hide();
			startGame();
		}

	});

	


});
