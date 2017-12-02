define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
    class SPAlbumViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            this.classList.add('sp-view');
        }
        acceptsUri(uri) {
            return /^bungalow:album:(.*)$/.test(uri);
        }
        navigate() {

        }
        activate() {
            super.activate();
            this.render();
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName === 'uri') {
                this.obj = await store.request('GET', newVal);
                this.setState(this.obj);
                this.playlistsTab.playlistsList.setAttribute('uri', newVal);
            }
        }
        setState(state) {
            this.state = state;
            this.render();
        }
        async render() {
            this.innerHTML = '<div class="bg-mask"></div>';
            this.header = document.createElement('sp-header');
            this.header.setState(this.obj);
            this.header.view = this;
            this.appendChild(this.header);
            this.albumTab = document.createElement('sp-tabcontent');
            this.playlistsTab = document.createElement('sp-tabcontent');
            this.playlistsTab.setAttribute('label', _e('Playlists'));
            this.playlistsTab.setAttribute('data-tab-id', 'playlists');
            this.appendChild(this.albumTab);
            this.appendChild(this.playlistsTab);
            
            this.albumTab.setAttribute('label', _e('Overview'));
            this.albumTab.setAttribute('data-tab-id', 'overview');
            
            this.albumTab.albumView = document.createElement('sp-trackcontext');
            this.albumTab.albumView.setAttribute('fields', 'p,name,duration,popularity,artists');
            this.albumTab.appendChild(this.albumTab.albumView);
            this.albumTab.albumView.showCopyrights = true;
            this.albumTab.albumView.view = this;
            this.albumTab.albumView.setAttribute('uri', this.getAttribute('uri') + ':track');
            this.playlistsTab.playlistsList = document.createElement('sp-playlistlist');
            this.playlistsTab.appendChild(this.playlistsTab.playlistsList);
            this.playlistsTab.style.display = 'none';
            this.albumTab.contentHook = document.createElement('sp-hook');
            this.albumTab.contentHook.setAttribute('data-hook-id', 'albumview');
            this.albumTab.appendChild(this.albumTab.contentHook);
            GlobalTabBar.setState({
                object: this.state,
                objects: [
                    {
                        id: 'overview',
                        name: _('Overview')
                    },
                    {
                        id: 'playlists',
                        name: _('Playlists')
                    }
                ]
            })
        }
    }

    document.registerElement('sp-albumview', SPAlbumViewElement);
    return SPViewElement;
});