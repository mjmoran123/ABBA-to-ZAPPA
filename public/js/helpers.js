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