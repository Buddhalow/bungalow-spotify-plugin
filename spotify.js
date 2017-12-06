define([
    'plugins/spotify/store',
    'plugins/spotify/components/playlistlist',
    'plugins/spotify/controls/playlistcontext',
    'plugins/spotify/controls/trackcontext',
    'plugins/spotify/controls/resourcecontext',
    'plugins/spotify/controls/playlist',
    'plugins/spotify/controls/trackcontrols',
    'plugins/spotify/views/playqueue', 
    'plugins/spotify/views/playlist',
    'plugins/spotify/views/artist',
    'plugins/spotify/views/album',
    'plugins/spotify/views/label',
    'plugins/spotify/views/user',
    'plugins/spotify/views/country',
    'plugins/spotify/views/category',
    'plugins/spotify/views/curator',
    'plugins/spotify/views/audiobook',
    'plugins/spotify/views/search',
    'plugins/spotify/views/start',
    'controls/menudatasource'
    ], function (
        store,
        SPPlaylistListElement,
        SPPlaylistContextElement,
        SPTrackContextElement,
        SPResourceContextElement,
        SPPlaylistElement,
        SPTrackControlsElement,
        SPPlaylistViewElement,
        SPPlayQueueViewElement,
        SPArtistViewElement,
        SPAlbumViewElement,
        SPLabelViewElement,
        SPUserViewElement,
        SPCountryViewElement,
        SPCategoryViewElement,
        SPCuratorViewElement,   
        SPAudioBookViewElement,
        SPSpotifySearchViewElement,
        SPSpotifyStartViewElement,
        SPMenuDataSource
        ) {
            document.registerElement('sp-playlist', SPPlaylistElement);
            document.registerElement('sp-playlistlist', SPPlaylistListElement);
            document.registerElement('sp-playlistcontext', SPPlaylistContextElement);
            document.registerElement('sp-resourcecontext', SPResourceContextElement);
            document.registerElement('sp-trackcontext', SPTrackContextElement);
            document.registerElement('sp-trackcontrols', SPTrackControlsElement);
            document.registerElement('sp-spotifysearchview', SPSpotifySearchViewElement);
            document.registerElement('sp-spotifystartview', SPSpotifyStartViewElement);
            document.registerElement('sp-categoryview', SPCategoryViewElement);
            document.addEventListener('hook_footer', (e) => {
                document.querySelector('sp-hook[data-hook-id="footer"]').appendChild(document.createElement('sp-trackcontrols'));
            })
            document.addEventListener('mainmenuload', (e) => {
                let menu = document.createElement('sp-menu');
                let sidebarmenu = document.querySelector('sp-sidebarmenu');
                sidebarmenu.label = document.createElement('label');
                sidebarmenu.label.innerHTML = _e('Spotify');
                sidebarmenu.appendChild(sidebarmenu.label);
                sidebarmenu.appendChild(menu);
                menu.dataSource = new SPMenuDataSource(
                    [
                        {
                            name: _e('Library'),
                            uri: 'bungalow:internal:library'
                        },
                        {
                            name: _e('Dr. Sounds'),
                            uri: 'spotify:artist:2FOROU2Fdxew72QmueWSUy'
                        }
                    ]
                );
           });
           document.addEventListener('hook_startview', (e) => {
               let hook = document.querySelector('sp-hook[data-hook-id="startview"]');
               let view = document.createElement('sp-spotifystartview');
               hook.appendChild(view);
               
           })
           document.addEventListener('hook_searchview', (e) => {
               if (e.data instanceof Object) {
                   let hook = document.querySelector('sp-hook[data-hook-id="searchview"]');
                   
                   let search = hook.querySelector('sp-spotifysearchview[uri="' + e.data.uri + '"]');
                    if (!search) {
                        search = document.createElement('sp-spotifysearchview');
                        hook.appendChild(search);
                        search.setAttribute('uri', e.data.uri);
                        $(search).show();
                    } else {
                        $(search).show();
                    }
               }
           })
            document.addEventListener('hook_album', (e) => {
               if (e.data instanceof Object) {
                   let hook = document.querySelector('sp-hook[data-hook-id="searchview"]');
                   
                   let search = hook.querySelector('sp-spotifysearchview[uri="' + e.data.uri + '"]');
                    if (!search) {
                        search = document.createElement('sp-spotifysearchview');
                        hook.appendChild(search);
                        search.setAttribute('uri', e.data.uri);
                        $(search).show();
                    } else {
                        $(search).show();
                    }
               }
           })
            document.addEventListener('viewstackloaded', () => {
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-startview',
                    regex: /^bungalow:(start|internal:start)$/g
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-searchview',
                    regex: /^bungalow:search:(.*)$/g
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-playlistview',
                    regex: /^bungalow:user:([0-9a-zA-Z]+):playlist:([0-9a-zA-Z]+)$/g
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-playlistview',
                    regex: /^bungalow:internal:library$/g
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-playlistview',
                    regex: /^bungalow:(country|artist):([0-9a-zA-Z]+):top:([0-9a-zA-Z]+)$/g
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
                    tag: 'sp-categoryview',
                    regex: /^bungalow:category:([0-9a-zA-Z]+)$/g
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
    }
)