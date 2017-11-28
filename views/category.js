define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
	   class SPCategoryViewElement extends SPViewElement {
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
            /*if (!this.overview.albumList) {
                this.overview.albumList = document.createElement('sp-playlistcontext');
                this.overview.appendChild(this.overview.albumList);
            }*/
            this.overview.releaseFlow = document.createElement('sp-flow');
            this.overview.appendChild(this.overview.releaseFlow);
        
        }
        acceptsUri(uri) {
            return new RegExp(/^bungalow:category:(.*)$/g).test(uri);
        }
        navigate(uri) {
                
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName == 'uri') {
                
              let result = await store.request('GET', newVal);
              this.overview.releaseFlow.setAttribute('uri', newVal + ':playlist');  
              this.setState(result);    
            }
        }
        setState(state) {
            this.state = state;
            this.header.setState(state);
            this.render();
        }
        render() {
            
        }
    }

    return SPCategoryViewElement;
})