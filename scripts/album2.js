var albumPicasso = {
	title: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [{
		title: 'Blue',
		duration: '4:26'
	}, {
		title: 'Green',
		duration: '3:14'
	}, {
		title: 'Red',
		duration: '5:01'
	}, {
		title: 'Pink',
		duration: '3:21'
	}, {
		title: 'Magenta',
		duration: '2:15'
	}]
};

var albumMarconi = {
	title: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1909',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [{
		title: 'Hello, Operator',
		duration: '1:01'
	}, {
		title: 'Ring, ring, ring',
		duration: '5:01'
	}, {
		title: 'Fits in your pocket',
		duration: '3:21'
	}, {
		title: 'Can you hear me now?',
		duration: '3:14'
	}, {
		title: 'Wrong phone number',
		duration: '2:15'
	}]
};

var albumForeigner = {
	title: 'Agent Provocateur',
	artist: 'Foreigner',
	label: 'Studio',
	year: '1984',
	albumArtUrl: 'assets/images/album_covers/18.png',
	songs: [{
		title: 'Tooth and Nail',
		duration: '3:54'
	}, {
		title: 'That was Yesterday',
		duration: '3:50'
	}, {
		title: 'I Want To Know What Love Is',
		duration: '3:21'
	}, {
		title: 'Growing Up the Hard Way',
		duration: '3:14'
	}, {
		title: 'Reaction to Action',
		duration: '2:15'
	}, {
		title: 'Reaction to Action',
		duration: '2:15'
	}]
};

var allAlbums = [albumPicasso, albumMarconi, albumForeigner];

var createSongRow = function(songNumber, songName, songLength) {
	var template =
		'<tr class="album-view-song-item">' +
		' <td class="song-item-number" id="song-item-' + songNumber + '" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
		' <td class="song-item-title" data-song-number="' + songNumber + '">' + songName + '</td>' +
		' <td class="song-item-duration" data-song-number="' + songNumber + '">' + songLength + '</td>' +
		'</tr>';

	return template;

};




var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {

	albumTitle.firstChild.nodeValue = album.title;
	albumArtist.firstChild.nodeValue = album.artist;
	albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
	//set attribute because album object does not include img tag
	albumImage.setAttribute('src', album.albumArtUrl);

	albumSongList.innerHTML = '';

	for (var i = 0; i < album.songs.length; i++) {
		albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
	}
};

var findParentByClassName = function(name) {

};

//wanted to create an outside function here to pass
//into eventlistener;

//var changeAlbum = function() {
//
//    var allAlbums = [albumPicasso, albumMarconi, albumForeigner];
//    count = 0;
//    setCurrentAlbum(allAlbums[count]);
//    count++;
//    console.log(count);
//
//};

//Elements with listeners
var songListContainer = document.getElementsByClassName("album-view-song-list")[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = function(songNum) {
	songNum = songNum || '';
	return '<a class="album-song-button" data-song-number="'+songNum+'"><span class="ion-play" data-song-number="'+songNum+'"></span></a>';
}
var pauseButtonTemplate = function(songNum) {
	songNum = songNum || '';
	return '<a class="album-song-button" data-song-number="'+songNum+'"><span class="ion-pause" data-song-number="'+songNum+'"></span></a>';
}

// Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {
	//    onload, sets the current album viewing album.html.  allAlbums array created globally above.
	setCurrentAlbum(allAlbums[0]);
	//sets a count variable to hold a position within event Handler below
	count = 1;
	//albumImage, selected from document.getElementsByCLassName above, adds an event to listen for upon a click
	albumImage.addEventListener("click", function(event) {
		//onclick, setCurrentAlbum becomes the second album within array
		setCurrentAlbum(allAlbums[count]);
		//after click, count increase by 1
		count++;
		//then if count is the same as the array length, resets count back to 0
		if (count == allAlbums.length) {
			count = 0;
		}
	});

	songListContainer.addEventListener('mouseover', function(event) {
		//see createSongRow template above
    var songNumber = event.srcElement.getAttribute('data-song-number');
		if (event.target.parentElement.className === 'album-view-song-item') {
			//selects only the song item numbers innerHTML and displays the button
			var numberCell = event.target.parentElement.querySelector('.song-item-number');
      if (songNumber !== currentlyPlayingSong) {
			     numberCell.innerHTML = playButtonTemplate(songNumber);
      }
			// numberCell.getElementsByClassName('ion-play')[0].setAttribute('data-song-number', );
		}
	});
    
    var clickEventHandler = function(event) {
      console.log(event);
				// Event handler call
				var songNum = event.srcElement.getAttribute('data-song-number');
				var songItem = document.getElementById('song-item-' + songNum);

				if (currentlyPlayingSong === null) {
					songItem.innerHTML = pauseButtonTemplate(songNum);
				currentlyPlayingSong = songNum;
			} else if (currentlyPlayingSong === songNum) {
				songItem.innerHTML = playButtonTemplate(songNum);
				currentlyPlayingSong = null;

			} else if (currentlyPlayingSong !== songNum) {
				var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
				currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
				songItem.innerHTML = pauseButtonTemplate(songNum);
				currentlyPlayingSong = songNum;
			}
		}
    
	for (var i = 0; i < songRows.length; i++) {

		songRows[i].addEventListener('mouseleave', function(event) {
			this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
		});

		songRows[i].addEventListener('click', clickEventHandler);
}


};