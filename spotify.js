define([
    'plugins/spotify/store',
    'plugins/spotify/controls/playlistcontext',
    'plugins/spotify/controls/trackcontext',
    'plugins/spotify/controls/playlist',
    'plugins/spotify/views/playqueue', 
    'plugins/spotify/views/playlist',
    'plugins/spotify/views/artist',
    'plugins/spotify/views/album',
    'plugins/spotify/views/label',
    'plugins/spotify/views/user',
    'plugins/spotify/views/country',
    'plugins/spotify/views/genre',
    'plugins/spotify/views/curator',
    'plugins/spotify/views/audiobook'
    ], function (
        store,
        SPPlaylistContextElement,
        SPTrackContextElement,
        SPPlaylistElement,
        SPPlayQueueViewElement,
        SPPlaylistViewElement,
        SPArtistViewElement,
        SPAlbumViewElement,
        SPLabelViewElement,
        SPUserViewElement,
        SPCountryViewElement,
        SPGenreViewElement,
        SPCuratorViewElement,   
        SPAudioBookViewElement
        ) {
            document.registerElement('sp-playlist', SPPlaylistElement);
            document.registerElement('sp-playlistcontext', SPPlaylistContextElement);
            document.registerElement('sp-trackcontext', SPTrackContextElement);
            document.addEventListener('viewstackloaded', () => {
            GlobalViewStack.registeredViews.push({
                tag: 'sp-startview',
                regex: /^bungalow:internal:start$/g
            });
            GlobalViewStack.registeredViews.push({
                tag: 'sp-playlistview',
                regex: /^bungalow:user:([0-9a-zA-Z]+):playlist:([0-9a-zA-Z]+)$/g
            });
            GlobalViewStack.registeredViews.push({
                tag: 'sp-playlistview',
                regex: /^bungalow:country:([0-9a-zA-Z]+):top:([0-9a-zA-Z]+)$/g
            });
            GlobalViewStack.registeredViews.push({
                tag: 'sp-playqueueview',
                regex: /^bungalow:internal:playqueue$/g
            });
             GlobalViewStack.registeredViews.push({
                tag: 'sp-artistview',
                regex: /^bungalow:artist:([0-9a-zA-Z]+)$/g
            });
            GlobalViewStack.registeredViews.push({
                tag: 'sp-albumview',
                regex: /^bungalow:album:([0-9a-zA-Z]+)$/g
            });
             GlobalViewStack.registeredViews.push({
                tag: 'sp-labelview',
                regex: /^bungalow:label:([0-9a-zA-Z]+)$/g
            });
             GlobalViewStack.registeredViews.push({
                tag: 'sp-userview',
                regex: /^bungalow:user:([0-9a-zA-Z]+)$/g
            });
            GlobalViewStack.registeredViews.push({
                tag: 'sp-countryview',
                regex: /^bungalow:country:([0-9a-zA-Z]+)$/g
            });
             GlobalViewStack.registeredViews.push({
                tag: 'sp-genreview',
                regex: /^bungalow:genre:([0-9a-zA-Z]+)$/g
            });
             GlobalViewStack.registeredViews.push({
                tag: 'sp-curatorview',
                regex: /^bungalow:curator:([0-9a-zA-Z]+)$/g
            });
            GlobalViewStack.registeredViews.push({
                tag: 'sp-audiobookview',
                regex: /^bungalow:book:([0-9a-zA-Z]+):audio$/g
            });
            GlobalViewStack.registeredViews.push({
                tag: 'sp-appviewstackview',
                regex: /^bungalow:app:(.*)$/g
            });
        });
})