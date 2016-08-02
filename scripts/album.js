// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumBeatles = {
     title: 'Magical Mystery Tour',
     artist: 'The Beatles',
     label: 'Capitol Records',
     year: '1967',
     albumArtUrl: 'assets/images/album_covers/12.png',
     songs: [
         { title: 'Magical Mystery Tour', duration: '2:51' },
         { title: 'Fool on the Hill', duration: '3:02' },
         { title: 'Flying', duration: '2:17'},
         { title: 'Blue Jay Way', duration: '3:57' },
         { title: 'Your Mother Should Know', duration: '2:31'},
         { title: 'I Am the Walrus', duration: '4:37'}
     ]
 };

var allAlbums = [albumPicasso, albumMarconi, albumForeigner];

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return $(template);
 };

var setCurrentAlbum = function(album) {
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // #3
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

function findParentByClassName (element, className) {
    if (element) { // element exists
        var currentElement = element.parentElement;
        if (currentElement == null) {
            alert("No parent found");
        }
        while (currentElement != className && currentElement !== null) {
            currentElement = currentElement.parentElement; // set to new parent
        }
        return currentElement;
    }
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;

 window.onload = function() {
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

    var clickHandler = function(targetElement) {
        var songItem = getSongItem(targetElement);  

        if (currentlyPlayingSong === null) {
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }
    };
     
      songListContainer.addEventListener('mouseover', function(event) {
         // #1
         if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
            var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }             
         }
     });
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // #1
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
         songRows[i].addEventListener('click', function(event) {
             // Event handler call
             clickHandler(event.target);
         });
     }
 };

var albumToggle = document.getElementsByClassName('album-cover-art')[0];
albumToggle.addEventListener("click", function(event) {
    var curAlbum = document.getElementsByClassName('album-view-artist')[0].innerText;
    if (curAlbum == 'The Beatles') {
        setCurrentAlbum(albumPicasso);
    } else if (curAlbum == 'Guglielmo Marconi') {
        setCurrentAlbum(albumBeatles);
    } else if (curAlbum == 'Pablo Picasso') {
        setCurrentAlbum(albumMarconi);
    }
});

