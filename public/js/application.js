$(document).ready(function() {

	$('#search-form').on('submit', function(event) {
		event.preventDefault();
		var $search = $(this);
		var artistQuery = $search.serialize();
		var url = "https://api.spotify.com/v1/search?" + artistQuery + "&type=artist";
		var request = $.ajax({
			url: url
		});
		request.done(function(response) {
			var searchResults = response;
			//console.log(searchResults.artists.items[0].name);
			var results = [];
			for(var i = 0; i < 10; i++) {
				var name = searchResults.artists.items[i].name; 
				var id = searchResults.artists.items[i].id;
				results.push({name : id});
			}
			console.log(results);
		});
	});
});
