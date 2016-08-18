$(document).ready(function() {
	var startFlag;
	var goalFlag;
	var startArtist;
	var goalArtist;
	var currentArtist;
	var winFlag;

	toggleSearchers();
	$('#search-result-buttons').show();
	$('#related-artist-buttons').hide();

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
				var artistButton = "<li class='button-li'><button id='"+ searchResults.artists.items[i].id + "' class='button " + whichEnd + "'>" + searchResults.artists.items[i].name + "</button></li>";
				$('#search-button-list').append(artistButton);
			}
		});	
	});

	$('#search-result-buttons').on('click', '.button', function(event) {
		$button = $(this)
		if ($button.hasClass('start')) {
			startArtist = new Artist($button.text(), $button.attr('id'));
			startFlag = 1;
			$('#artist-list').prepend("<li> START:   " + startArtist.name + "</li>");
		} else {
			goalArtist = new Artist($button.text(), $button.attr('id'));
			console.log(goalArtist.name);
			$('#artist-list').append("<li> GOAL:   " + goalArtist.name + "</li>");
			goalFlag = 1;
		}
		$('.button-li').hide();
		if (!startFlag || !goalFlag) {
			toggleSearchers();
		} else {
			$('.form').hide();
			$('#search-result-buttons').hide();
			$('#related-artist-buttons').show();
			currentArtist = startArtist;
			while (!winFlag) {
				//$('.button-li').show();
				getRelatedArtists(currentArtist, function(relatedArtists) {
					makeOptionButtons(relatedArtists);
					addCurrentArtistHeader(currentArtist);
				});

				
				winFlag = 1;

			}
			
		}

	});

	


});
