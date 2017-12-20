define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
    class SPCountryViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            this.classList.add('sp-view');
            this.header = document.createElement('sp-header');
            this.appendChild(this.header);
            this.albumsDivider = document.createElement('sp-divider');
            this.albumsDivider.innerHTML = 'Top Tracks';
            this.appendChild(this.albumsDivider);
            this.topTracks = document.createElement('sp-playlist');
            this.appendChild(this.topTracks);
            this.created = true;
        
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName == 'uri') {

                let result = await store.request('GET', newVal);
                this.setState({
                    object: result
                });
                this.topTracks.setAttribute('uri', newVal + ':top:5');
                
                this.activate();
            }
        }
        setState(state) {
            this.header.setState(state);
            debugger;
        }
        activate() {
            super.activate();
            GlobalTabBar.setState({
                objects: [{
                    id: 'overview',
                    name: _e('Overview')
                }]
            })
        }
    }

    return SPCountryViewElement;
})