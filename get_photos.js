function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/photoslibrary.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyALrrLo03P2_jU4pEb6yRYGW8ZNN1w7wXs");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

function fetchPhotosFromAlbum(albumId) {
    return gapi.client.photoslibrary.mediaItems.search({
        resource: {
            albumId: albumId,
            pageSize: 3 // Number of photos to fetch
        }
    }).then(function(response) {
        const photos = response.result.mediaItems;
        const photoContainer = document.getElementById('photo-galleries');
        photoContainer.innerHTML = ''; // Clear any existing photos
        
        photos.forEach(photo => {
            const photoDiv = document.createElement('div');
            photoDiv.classList.add('photo');

            const img = document.createElement('img');
            img.src = photo.baseUrl + '=w200-h200';
            img.alt = photo.filename;

            photoDiv.appendChild(img);
            photoContainer.appendChild(photoDiv);
        });
    });
}

function initClient() {
    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "885432245652-b7rpo1j1kjotlhthq0n1snulamh1p8d2.apps.googleusercontent.com"}).then(function () {
            authenticate().then(loadClient).then(function() {
                // Replace 'YOUR_ALBUM_ID' with the actual album ID
                fetchPhotosFromAlbum(albumId);
            });
        });
    });
}

// Ensure the Google API client library is loaded and initialized properly
document.addEventListener('DOMContentLoaded', function() {
    initClient();
});