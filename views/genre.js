define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
	   class SPGenreViewElement extends SPViewElement {
        async createdCallback() {
            super.createdCallback();
              
            this.header = document.createElement('sp-header');
            this.appendChild(this.header);
            this.classList.add('sp-view');
            this.overview = document.createElement('sp-tabcontent');
            this.appendChild(this.overview);
            this.overview.setAttribute('data-tab-id', 'overview');

            this.state = {
                
            };
            if (!this.albumsDivider) {
            this.overview.albumsDivider = document.createElement('sp-divider');
            this.overview.albumsDivider.innerHTML = 'Public playlists';
            this.overview.appendChild(this.overview.albumsDivider);
            }
            if (!this.overview.albumList) {
                this.overview.albumList = document.createElement('sp-playlistcontext');
                this.overview.appendChild(this.overview.albumList);
            }
        
        }
        acceptsUri(uri) {
            return new RegExp(/^bungalow:genre:(.*)$/g).test(uri);
        }
        navigate(uri) {
                
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName == 'uri') {
                
              let result = await store.request('GET', newVal);
                
              this.setState(result);    
              this.overview.albumList.setAttribute('uri', newVal + ':playlist');
            }
        }
        setState(state) {
            this.header.setState(state);
        }
    }

    document.registerElement('sp-genreview', SPGenreViewElement);
    return SPGenreViewElement;
})