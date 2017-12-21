define(['controls/view', 'plugins/spotify/controls/trackcontext', 'plugins/spotify/store'], function (SPViewElement, SPTrackContextElement, store) {
    class SPPlaylistViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            
            this.classList.add('sp-view');
            this.header = document.createElement('sp-header');
            this.header.setAttribute('size', 128);
            this.appendChild(this.header);
        
    
            this.trackcontext = document.createElement('sp-trackcontext');
            this.trackcontext.setAttribute('expands', 'true');
            this.appendChild(this.trackcontext);
            this.trackcontext.setAttribute('columnheaders', 'name,artists,album,user,added_at');
            this.trackcontext.setAttribute('headers', 'true');
            this.trackcontext.header = (this.header);
            this.trackcontext.view = (this);

        

            

        }
        invalidate() {
            this.invalid = true;
        }
        insertUri(uri, data) {
            this.trackcontext.insertObjectsAt([{
                name: '',
                uri: uri
            }], 0);
        }
        acceptsUri(uri) {
            return /^spotify:user:(.*):playlist:([a-zA-Z0-9]+)$/.test(uri);
        }
        activate() {
            super.activate();
            if (this.invalid) {
                this.invalid = false;
                this.setAttribute('uri', this.getAttribute('uri'));
            }
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
                newVal = 'spotify:' + newVal.split(':').splice(1).join(':');
                this.trackcontext.setAttribute('showcolumnheaders', 'true');
                this.trackcontext.setAttribute('uri', newVal + ':track');
                this.header.setAttribute('uri', newVal);
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
            }
        }
    }

    return SPPlaylistViewElement;
})