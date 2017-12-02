define(['controls/view', 'plugins/spotify/controls/trackcontext', 'plugins/spotify/store'], function (SPViewElement, SPTrackContextElement, store) {
    class SPPlaylistViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            
            this.classList.add('sp-view');
            if (!this.header) {
                this.header = document.createElement('sp-header');
                this.header.setAttribute('size', 128);
                this.appendChild(this.header);
            }
            
            if (!this.trackcontext) {
                this.trackcontext = document.createElement('sp-trackcontext');
                this.appendChild(this.trackcontext);
                this.trackcontext.setAttribute('fields', 'name,artists,album,user,added_at');
                this.trackcontext.setAttribute('headers', 'true');
                this.trackcontext.header = (this.header);
                this.trackcontext.view = (this);

            }

            

        }
        acceptsUri(uri) {
            return /^bungalow:user:(.*):playlist:([a-zA-Z0-9]+)$/.test(uri);
        }
        activate() {
            super.activate();
            this.trackcontext.activate();
            if (this.state == null)
                return;
            this.header.setState(this.state);
            window.GlobalTabBar.setState({
                object: this.state,
                objects: [{
                    name: 'Playlist'
                }]
            });
        }
        navigate(uri) {
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName === 'uri') {

                if (newVal in store.state) {
                    this.setState(store.state[newVal]);
                    return;
                }
                this.trackcontext.setAttribute('uri', newVal + ':track');
                let result = await store.request('GET', newVal);
                this.trackcontext.playlist = result;

                this.state = result;
               /* this.state.features = result.tracks.objects.map((o) => {
                    return o.artists[0]
                });
                if (this.state.features.length > 0) {
                    this.managerDivider.removeAttribute('hidden');
                     this.state.features.slice(0, 6).map((obj) => {
                         let a = document.createElement('sp-link');
                         a.style.display = 'inline-block';
                         a.style.textAlign = 'center';
                         a.setAttribute('uri', obj.uri);
                         let image = document.createElement('sp-image');
                        image.setState(obj);
                       
                        image.style.display = 'inline-block';
                        a.appendChild(image);
                        a.innerHTML += '<br><span>' + obj.name + '</span>';
                         this.manager.appendChild(a);
                           image.style.height = '32pt';
                         image.style.width = '32pt';
                     })
                }*/
                window.GlobalTabBar.setState({
                    object: this.state,
                    objects: [{
                        name: 'Playlist'
                    }]
                });
                this.activate();
            }
        }
    }

    document.registerElement('sp-playlistview', SPPlaylistViewElement);
    return SPPlaylistViewElement;
})