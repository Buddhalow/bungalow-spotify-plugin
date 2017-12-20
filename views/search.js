define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
    class SPSearchViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            this.classList.add('sp-view');
            //this.innerHTML = "<div style='padding: 13pt'><h3>Search results for '<span id='q'>'</span>";
            this.header = document.createElement('sp-header');
            //this.appendChild(this.header);
            this.trackcontext = document.createElement('sp-trackcontext');
            this.trackcontext.setAttribute('expands', 'true');
            this.appendChild(this.trackcontext);
                
            this.trackcontext.setAttribute('showcolumnheaders', 'true');
            this.trackcontext.header = (this.header);
            this.trackcontext.view = this.getParentElementByClass('sp-view');
            

        }
        activate() {
            let uri = ''
            if (this.hasAttribute('uri')) {
                uri = this.getAttribute('uri');
            } else {
                uri = "spotify:search"
            }
            let query = uri .substr('spotify:search:'.length);
            
            
            this.header.tabBar.setState({
                id: query,
                uri: uri,
                name: query,
                type: 'search',
                objects: [{
                    name: _e('Search'),
                    id: 'search'
                }]
            })
        }
        acceptsUri(uri) {
            return /^spotify:search:(.*)$/.test(uri);
        }
        navigate() {

        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName === 'uri') {
                let query = newVal.substr('spotify:search:'.length).split(/\:/)[0];
                this.trackcontext.query = query;
                this.trackcontext.setAttribute('uri', 'spotify:search:' + query + ':track');
               /* let tracks = await $.getJSON('/api/spotify/search/' + query + '/track');
                let albums = await $.getJSON('/api/spotify/search/' + query + '/release');
                let artists = await $.getJSON('/api/spotify/search/' + query + '/artist');
                this.querySelector('sp-spotifysearchheader').state = ({
                    tracks: tracks,
                    artists: artists,
                    albums: albums
                });*/
            }
        }
    }
    return SPSearchViewElement;
});