var toggleSearchers = function() {
		$('form').each(function(){
		if ($(this).hasClass('hidden')) {
			$(this).removeClass('hidden');
			$(this)[0].reset();
		} else {
			$(this).addClass('hidden');
		}
		});
	}

	function Artist(name, id) {
		this.name = name,
		this.id = id
	}

	var makeLi = function(artist) {
		var li = "<li id='" + artist.id + "'>" + artist.name + "</li>";
		return li;
	}

	var startGame = function() {

	}

	var getRelatedArtists = function(artist, doneFunc) {
		var url = "https://api.spotify.com/v1/artists/" + artist.id + "/related-artists";
		var artistArray = [];
		var request = $.ajax({
			url: url
		});
		request.done(function(response) {
			var relatedArtistData = response['artists'];
			for(var index = 0; index < relatedArtistData.length; index++) {
				var name = relatedArtistData[index].name;
				var id = relatedArtistData[index].id;
				artistArray.push(new Artist(name, id));
			}
			doneFunc(artistArray);
		});
		return null;
	}

	var makeOptionButtons = function(relatedArtistArray) {
		for(var index = 0; index < relatedArtistArray.length; index++) {
			var artist = relatedArtistArray[index];
			var button = "<li class='button-li'><button id='"+ artist.id + "'>" + artist.name + "</button></li>";
			$('#related-button-list').append(button);
		}
	}

	var addCurrentArtistHeader = function(artist) {
		$('#current-header').text("Current Artist:  " + artist.name);
	}