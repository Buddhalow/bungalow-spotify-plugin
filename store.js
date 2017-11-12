define(['events'], function(EventEmitter) {
    
    /**
     * Data store for application
     **/
    return new (class Store extends EventEmitter {
        constructor() {
            super();
            this.services = {
            };
            this.state = {};
            if (false)
             this.heart = setInterval(async () => {
             this.state.player = await this.getCurrentTrack();
             this.emit('change');
    
             }, 1000);
            this.discoveredTracks = JSON.parse(localStorage.getItem('discoveredTracks')) || {
                objects: []
            };
        }
    
        getDiscoveredTracks(track, playlist=null) {
            let results = this.discoveredTracks.objects.filter((t) => t.uri == track.uri);
            if (playlist != null)
                results = results.filter((t) => {
                    return t.playlists.filter((o) => o.uri == playlist.uri).length > 0
                });
            return results;
    
        }
        hasDiscoveredTrack(track, playlist=null) {
            return this.getDiscoveredTracks(track, playlist).length > 0;
        }
        discoverTrack(track, playlist=null, position=-1, played=false) {
            track.playlists = [];
            track.played = played;
            if (playlist != null) {
                if(!playlist.positions) {
                    playlist.positions = [];
                }
                playlist.positions.push({
                    position: position,
                    time: new Date()
                });
                track.playlists.push(playlist);
            }
            this.discoveredTracks.objects.push(track);
            //    localStorage.setItem('discoveredTracks', JSON.stringify(this.discoveredTracks));
        }
       
    
        /**
         * Save state
         **/
        saveState() {
            //   localStorage.setItem('store', JSON.stringify(this.state));
        }
    
        /**
         * Load state
         **/
        loadState() {
            if (!localStorage.getItem('store'))
                return {};
    
            return JSON.parse(localStorage.getItem('store'));
        }
    
        async playPause() {
            this.state.player = await this.getCurrentTrack();
            let result = null;
            if (this.state.player.is_playing) {
                result = await this.request('PUT', 'spotify:me:player:pause');
            } else {
                result = await this.request('PUT', 'spotify:me:player:play');
            }
            this.state.player = await this.getCurrentTrack();
            this.emit('change');
        }
    
        /**
         * Set state for resource
         **/
        setState(uri, state) {
            this.state[uri] = state;
            this.emit('change');
            this.saveState();
        }
        async play(context) {
    
    
            let result = await this.request('PUT', 'spotify:me:player:play', {}, context, false);
            this.state.player = await this.getCurrentTrack();
            this.emit('change');
    
        }
        async playTrack(track, context) {
            await this.request('PUT', 'spotify:me:player:play', {}, {
                context_uri: context.uri,
                uris: [track.uri]
            });
        }
        async playTrackAtPosition(position, context) {
            await this.request('PUT', 'spotify:me:player:play', {}, {
                context_uri: context.uri,
                position: {
                    offset: position
                }
            });
        }
        async getCurrentTrack() {
            let result = await this.request('GET', 'spotify:me:player:currently-playing', null, null, false);
    
            return result;
        }
        async request(method, uri, params, payload, cache=true) {
            if (!uri) return;
            let strongUri = (uri + '?' + (params instanceof Object ? serializeObject(params) : ''));
            if (strongUri in this.state && method == "GET" && cache) {
                   
                return this.state[strongUri];
            }
            try {
                let esc = encodeURIComponent
                let query = params ?  Object.keys(params)
                        .map(k => esc(k) + '=' + esc(params[k]))
                        .join('&') : '';
    
                if (uri == null) return;
                var url = uri;
                if (uri.indexOf('bungalow:') == 0 || uri.indexOf('spotify:') == 0) {
                    url = '/api/spotify/' + url.split(':').slice(1).join('/') + '?' + query;
                    
                    let result
                    if (method === 'GET') {
                        result = await fetch(url, {
                            credentials: 'include',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'GET',
                        }).then((e) => {
                            if (e.status < 200 || e.status > 299) {
                                alert(e.status);
                            }
                            return e.json()
                            
                        
                        });
                    } else {
                        result = await fetch(url, {
                            credentials: 'include',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: method,
                            body: JSON.stringify(payload)
                        }).then((e) => {
                            if (e.status < 200 || e.status > 299) {
                                alert(e.status);
                            }
                            return e.json()
                            
                        });
                    }
                    
                    if ('objects' in result) {
                        for (let obj of result.objects) {
                            let bungalowUri = obj.uri;
                            this.state[bungalowUri] = obj;
                            if (obj.type == 'album') {
                                
                                if ('tracks' in obj) {
                                    let trackset = {
                                        objects: []
                                    };
                                    for (let track of obj.tracks.objects) {
                                        this.state[track.uri] = track;
                                        trackset.objects.push(track);
                                    }
                                    this.state[obj.uri + ':track?offset=0&limit=0'] = trackset;
                                }
                            }  
                        }
                    }
                    this.setState(uri, result);
    
    
                    return result;
    
                }
                if (uri in this.state)
                    return this.state[uri];
                
                let result = await fetch(url, {credentials: 'include', mode: 'cors'}).then((e) => e.json());
                this.setState(uri, result);
    
                return result;
            } catch (e) {
                alert("An error occured " + e);
            }
        }
    
        /**
         * Get album by ID
         **/
        async getAlbumById(id) {
            let uri = 'spotify:album:' + id;
            let result = await fetch('/api/spotify/album/' + id, {credentials: 'include', mode: 'cors'}).then((e) => e.json())
            this.setState(uri, result);
            return result;
        }
        async getArtistById(id) {
            let uri = 'spotify:artist:' + id;
            let result = await fetch('/api/spotify/artist/' + id, {credentials: 'include', mode: 'cors'}).then((e) => e.json());
            this.setState(uri, result);
            return result;
        }
        login() {
            return new Promise((resolve, reject) => {
                var loginWindow = window.open('/api/spotify/music/login');
    
                var t = setInterval(() => {
                    if (!loginWindow) {
                        clearInterval(t);
                        resolve(true);
                    }
                });
            });
        }
    
    });
    
})