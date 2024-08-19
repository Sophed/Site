let config = {
    "lanyard": "https://api.lanyard.rest/v1/users/441666718507597834"
}

const PREFIX = "+ "
const ARTIST_LENGTH = 20
const SONG_LENGTH = 20

function stat() {
    $.getJSON(config.lanyard, (data) => {
        data = data.data;
        track = "https://open.spotify.com/track/" + data.spotify?.track_id;
        if (data.listening_to_spotify == true) {

            artist = String(data.spotify.artist).split("; ")[0].substring(0, ARTIST_LENGTH)
            if (artist.length == ARTIST_LENGTH && data.spotify.artist.length != ARTIST_LENGTH) {
                artist += "...";
            }
            song = String(data.spotify.song).split(" (f")[0].substring(0, SONG_LENGTH) // this is intended to remove things like (feat. artist) from titles, not perfect but pretty good
            if (song.length == SONG_LENGTH && data.spotify.song.length != SONG_LENGTH) {
                song += "...";
            }

            str = String(`${PREFIX}listening to <b>${song}</b> by <strong>${artist}</strong>`).toLowerCase();
            $("#status").html(`<a href="${track}" target="_blank">${str}`)

            return
        }
        if (data.discord_status == "dnd" || data.discord_status == "online" || data.discord_status == "idle") {
            $("#status").html(`${PREFIX}online`)
        } else if(data.discord_status == "offline") {
            $("#status").html(`${PREFIX}offline`)
        }
    })
}
$("#status").html(`${PREFIX}loading...`)
stat();
setInterval(() => {stat()}, 5000)