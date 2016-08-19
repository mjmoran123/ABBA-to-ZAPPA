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
			$('#artist-list').prepend("<li> START:   " + startArtist.name + " - </li>");
			currentArtist = startArtist;
		} else {
			goalArtist = new Artist($button.text(), $button.attr('id'));
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


			getRelatedArtists(currentArtist, function(relatedArtists) {
					makeOptionButtons(relatedArtists);
					addCurrentArtistHeader(currentArtist);
					if (checkForWin(relatedArtists, goalArtist)) {
						var chainLength = $('#artist-list').children().length - 1;
						var winHeader = "<h3> Congratulations! You connected" + startArtist.name + " to " + goalArtist.name + " in " + chainLength + " moves</h3>"; 
						$('#current-header').after(winH3);
					}
	      });

			}
	});

	$('#related-artist-buttons').on('click', 'button', function(event) {
					var $button = $(this);
					currentArtist.id = $button.attr('id');
					currentArtist.name = $button.text();
					$('.button-li').remove();
					$('#artist-list').children().first().after("<li>" + currentArtist.name + " - </li>");


					getRelatedArtists(currentArtist, function(relatedArtists) {
					makeOptionButtons(relatedArtists);
					addCurrentArtistHeader(currentArtist);
					if (checkForWin(relatedArtists, goalArtist)) {
						var chainLength = $('#artist-list').children().length - 1;
						var winHeader = "<h3> Congratulations! You connected" + startArtist.name + " to " + goalArtist.name + " in " + chainLength + " moves</h3>"; 
						$('#current-header').after(winH3);
					}
	      });



	});





					
});
