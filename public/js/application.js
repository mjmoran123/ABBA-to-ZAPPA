$(document).ready(function() {
	var startFlag;
	var goalFlag;
	var startArtist;
	var goalArtist;
	var currentArtist;
	var winFlag;

	toggleSearchers();
	$('#current-header').hide();
	$('#search-result-buttons').show();
	$('#related-artist-buttons').hide();
	$('.win').hide();

	$('#main-header').on('click', 'h1', function() {
		$header = $(this);
		if ($header.hasClass('skrillex')) {
			$(this).text("ABBA to ZAPPA");
			$(this).removeClass('skrillex');
		}
		else {
			$(this).text("6 dGrZz of SkR!LLeX!!!");
			$(this).addClass('skrillex');
		}
	});

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
			console.log(startArtist.name);
			console.log(startArtist.id);
			startFlag = 1;
			$('#artist-list').prepend("<li class='endpoint'> START:   " + startArtist.name + "</li><br>");
			currentArtist = startArtist;
		} else {
			goalArtist = new Artist($button.text(), $button.attr('id'));
			console.log(goalArtist.name);
			console.log(goalArtist.id);
			$('#artist-list').append("<li class='endpoint'> GOAL:   " + goalArtist.name + "</li>");
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
					$('#current-header').show();
					
	      });

			}
	});



	$('#related-artist-buttons').on('click', 'button', function(event) {
					//console.log(startArtist.name);
					var $button = $(this);
					currentArtist = new Artist($button.text(), $button.attr('id'));
					$('.button-li').remove();
					$('#artist-list').children().last().before("<li class='path-li'>" + currentArtist.name + "</li><br>");

					if (currentArtist.id === goalArtist.id) {
						$(".win").remove();
						var chainLength = (($('#artist-list').children().length - 1) / 2 ) - 1;
						var winHeader = "<p class='win'> Congratulations! You connected " + startArtist.name + " to " + goalArtist.name + " in " + chainLength + " moves!</p>"; 
						$('#current-header').after(winHeader);
						$('#current-header').hide();
						$('.win').show();
						var data = {startArtist, goalArtist, chainLength};
						console.log(data);
						var request = $.ajax({
							url: "/challenges",
							method: "POST",
							data: data
						});
					} 
					else {
						getRelatedArtists(currentArtist, function(relatedArtists) {
						makeOptionButtons(relatedArtists);
						addCurrentArtistHeader(currentArtist);
					});
	      	}
	});
	document.getElementById('challenge-selector').onchange = function(event) {
		$("current-header").empty();
		$("current-header").hide();
		$(".win").hide();
		$('ul').empty();
    var url = $("option:selected").attr("href");
    var request = $.ajax({
      url: url,
      dataType: 'json'
    });

    request.done(function(response) {
      console.log(response.start_id);
      console.log(response.end_name)
      
      // $('.form').hide();
      startArtist = new Artist(response.start_name, response.start_id);
      startFlag = 1;
      $('#artist-list').append("<li class='endpoint'> START:   " + startArtist.name + "</li><br>");
      currentArtist = startArtist;
      goalArtist = new Artist(response.end_name, response.end_id);
      goalFlag = 1;
      $('#artist-list').append("<li class='endpoint'> GOAL:   " + goalArtist.name + "</li>");
      $('.form').hide();
      $('#search-result-buttons').hide();
      $('#related-artist-buttons').show();
      getRelatedArtists(currentArtist, function(relatedArtists) {
          makeOptionButtons(relatedArtists);
          addCurrentArtistHeader(currentArtist);
          $('#current-header').show(); 
        });
    });
    // window.location.href = this.children[this.selectedIndex].getAttribute('href');
	}
	$("tr:even").css("background-color", "#FAFA05");
});//document ready close
