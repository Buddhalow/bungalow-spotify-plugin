define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
    class SPArtistViewElement extends SPViewElement {
        async createdCallback() {
            super.createdCallback();
            
            this.state = {
                artist: null,
                albums: []
            }
            this.innerHTML = '<div class="bg-mask"></div>';
            this.header = document.createElement('sp-header');
            this.appendChild(this.header);
            
            this.classList.add('sp-view');
            
            this.overviewTab = document.createElement('sp-tabcontent');
            this.overviewTab.setAttribute('data-tab-id', 'overview');
            this.appendChild(this.overviewTab);
            this.overviewTab.topTracksDivider = document.createElement('sp-divider');
            this.overviewTab.topTracksDivider.innerHTML = _e('Top Tracks');
        
            this.overviewTab.appendChild(this.overviewTab.topTracksDivider);
            this.overviewTab.toplist = document.createElement('sp-playlist');
            this.overviewTab.appendChild(this.overviewTab.toplist);
            
            this.aboutTab = document.createElement('sp-tabcontent');
            this.aboutTab.aboutElement = document.createElement('sp-about');
            this.aboutTab.appendChild(this.aboutTab.aboutElement);
            this.aboutTab.setAttribute('data-tab-id', 'about');
            this.appendChild(this.aboutTab);
            this.playlistsTab = document.createElement('sp-tabcontent');
            this.playlistsTab.setAttribute('data-tab-id', 'playlists');
            this.appendChild(this.playlistsTab);
            this.playlistsTab.playlistsList = document.createElement('sp-playlistlist');
            this.playlistsTab.appendChild(this.playlistsTab.playlistsList);
            
            this.playlistsTab.playlistsList.view = this;
            this.playlistsTab.playlistsList.header = this.header;
        }
        async createReleaseSection(name, uri, release_type) {
            
            let singlesDivider = document.createElement('sp-divider');
            singlesDivider.setAttribute('data-uri', uri + ':' + release_type);
            singlesDivider.innerHTML = name;
            singlesDivider.style.display = 'block';
            this.overviewTab.appendChild(singlesDivider);
          /*  
            let releaseList = document.createElement('sp-playlistcontext');
            releaseList.setAttribute('fields', 'p,name,duration,popularity,artists');
            releaseList.setAttribute('data-context-artist-uri', uri);
            releaseList.setAttribute('data-max-rows', '5');
            */
            let releaseFlow = document.createElement('sp-flow');
            this.overviewTab.appendChild(releaseFlow);
            releaseFlow.setAttribute('uri', uri + ':' + release_type);
            
        }
        acceptsUri(uri) {
            return new RegExp(/^bungalow:artist:(.*)$/g).test(uri);
        }
        navigate(uri) {
                
        }
        activate() {
            super.activate({
                object: this.state,
                objects: [
                    {
                        id: 'overview',
                        name: _('Overview')
                    },
                    {
                        id: 'about',
                        name: _('About')
                    }
                ]
            });
            GlobalTabBar.setState({
                  object: this.state,
                objects: [
                    {
                        id: 'overview',
                        name: _('Overview')
                    }/*,
                    {
                        id: 'related_artist',
                        name: _('Related artists')
                    },
                    {
                        id: 'about',
                        name: _('About')
                    }*/,
                    {
                        id: 'playlists',
                        name: _e('Playlists (Powered by Google)')
                    }
                ]
            })
            this.header.tabBar.setState({
                object: this.state,
                objects: [
                    {
                        id: 'overview',
                        name: _('Overview')
                    }/*,
                    {
                        id: 'about',
                        name: _('About')
                    }*/,
                    {
                        id: 'playlists',
                        name: _e('Playlists (Powered by Google)')
                    }
                ]
            });
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName == 'uri') {
                newVal = 'spotify:' + newVal.split(':').splice(1).join(':');
                this.overviewTab.toplist.setAttribute('data-context-artist-uri', newVal);
                this.overviewTab.toplist.columnheaders=['p','name','popularity','duration','artists'];
                if (newVal in store.state) {
                    this.setState(store.state[newVal]);
                    return;
                }
                
                let result = await store.request('GET', newVal);
                GlobalTabBar.setState({
                    object: this.state,
                    objects: [
                        {
                            id: 'overview',
                            name: _('Overview')
                        },
                        {
                            id: 'related_artist',
                            name: _('Related artists')
                        },
                        {
                            id: 'about',
                            name: _('About')
                        }
                    ]
                })
                this.overviewTab.toplist.setAttribute('uri', newVal + ':top:5');
                this.state = result;
                
                this.createReleaseSection(_('Singles'), newVal, 'single');
                this.createReleaseSection(_('Albums'), newVal, 'album');
                
               
                this.aboutTab.aboutElement.setAttribute('uri', newVal + ':about');
                
                
                this.playlistsTab.playlistsList.setAttribute('uri', newVal);
                this.playlistsTab.header = this.header;
                 super.afterLoad();
                this.setState(this.state);
                this.activate();
                
            }
        }
        setState(state) {
            this.header.setState(state);
        }
    }
    document.registerElement('sp-artistview', SPArtistViewElement);

});