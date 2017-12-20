define([
    'plugins/spotify/store',
    'plugins/spotify/components/playlistlist',
    'plugins/spotify/controls/playlistcontext',
    'plugins/spotify/controls/trackcontext',
    'plugins/spotify/controls/resourcecontext',
    'plugins/spotify/controls/playlist',
    'plugins/spotify/controls/trackcontrols',
    'plugins/spotify/views/playqueue', 
    'plugins/spotify/views/track', 
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
        SPPlayqueueViewElement,
        SPTrackViewElement,
        SPPlaylistViewElement,
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
            document.registerElement('sp-spotifycategoryview', SPCategoryViewElement);
            document.registerElement('sp-spotifyalbumview', SPAlbumViewElement);
            document.registerElement('sp-spotifyartistview', SPArtistViewElement);
            document.registerElement('sp-spotifycountryview', SPCountryViewElement);
            document.registerElement('sp-spotifycuratorview', SPCuratorViewElement);
            document.registerElement('sp-spotifylabelview', SPLabelViewElement);
            document.registerElement('sp-spotifyplaylistview', SPPlaylistViewElement);
            document.registerElement('sp-spotifyplayqueueview', SPPlayqueueViewElement);           
            document.registerElement('sp-spotifytrackview', SPTrackViewElement);
            document.registerElement('sp-spotifyuserview', SPUserViewElement);
            document.addEventListener('hook_footer', (e) => {
                document.querySelector('sp-hook[data-hook-id="footer"]').appendChild(document.createElement('sp-trackcontrols'));
            })
            document.addEventListener('mainmenuload', (e) => {
                let menu = document.createElement('sp-menu');
                let sidebarmenu = document.querySelector('sp-sidebarmenu');
                menu.setAttribute('id', 'spotify-menu');
                sidebarmenu.label = document.createElement('label');
                sidebarmenu.label.innerHTML = _e('Spotify');
                
                var addPlaylistButton = document.createElement('button');
                addPlaylistButton.innerHTML = '<i class="fa fa-plus"></i> New Playlist';
                addPlaylistButton.addEventListener('click', (e) => {
                    
                    var form = document.createElement('form');
                    form.innerHTML = '<input type="text" name="name"><button type="submit" hidden>';
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        form.parentNode.removeChild(form);
                        $.ajax({
                            method: 'POST',
                            url: '/api/spotify/me/playlist',
                        
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({
                                name: form.elements['name'].value
                            })
                        }).then((result) => {
                            alert('Playlist created');
                            GlobalViewStack.navigate(result.uri);
                        }, (error) => {
                            console.log(error);
                        })
                    });
                    form.style.position = 'fixed';
                    form.style.left = e.target.getBoundingClientRect().left + 'px';
                    form.style.top = e.target.getBoundingClientRect().top + 'px';
                    document.body.appendChild(form);
                });
                sidebarmenu.appendChild(sidebarmenu.label);
                sidebarmenu.appendChild(addPlaylistButton);
                sidebarmenu.appendChild(menu);
                var data =  [
                    {
                        name: _e('Library'),
                        uri: 'spotify:internal:library'
                    }
                ];
                
                $.getJSON('/api/spotify/me/playlist?offset=0&limit=50', function (result) {
                    result.objects.map(function (playlist) {
                        data.push(playlist);
                        
                    });
                    
                    menu.dataSource = new SPMenuDataSource(
                       data
                    );
                });
                menu.dataSource = new SPMenuDataSource(
                   data
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
                    regex: /^spotify:(start|internal:start)$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifysearchview',
                    regex: /^spotify:search:(.*)$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyplaylistview',
                    regex: /^spotify:user:([0-9a-zA-Z]+):playlist:([0-9a-zA-Z]+)$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyplaylistview',
                    regex: /^spotify:internal:library$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyplaylistview',
                    regex: /^spotify:(country|artist):([0-9a-zA-Z]+):top:([0-9a-zA-Z]+)$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyplayqueueview',
                    regex: /^spotify:internal:playqueue$/
                });
                 GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyartistview',
                    regex: /^spotify:artist:([0-9a-zA-Z]+)$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyalbumview',
                    regex: /^spotify:album:([0-9a-zA-Z]+)$/
                });
                 GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifylabelview',
                    regex: /^spotify:label:([0-9a-zA-Z]+)$/
                });
                 GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyuserview',
                    regex: /^spotify:user:([0-9a-zA-Z]+)$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifycountryview',
                    regex: /^spotify:country:([0-9a-zA-Z]+)$/
                });
                 GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifycategoryview',
                    regex: /^spotify:category:([0-9a-zA-Z]+)$/
                });
                 GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifycuratorview',
                    regex: /^spotify:curator:([0-9a-zA-Z]+)$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyaudiobookview',
                    regex: /^spotify:book:([0-9a-zA-Z]+):audio$/
                });
                GlobalViewStack.registeredViews.push({
                    tag: 'sp-spotifyappviewstackview',
                    regex: /^spotify:app:(.*)$/
                });
            });
    }
)