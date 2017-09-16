define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
	class SPCuratorViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            this.classList.add('sp-view');
            this.header = document.createElement('sp-header');
            this.appendChild(this.header);
        
        }
        activate() {
            this.header.tabBar.setState({
                object: this.state,
                objects: [
                    {
                        id: 'overview',
                        name: 'Overview'
                    },
                    {
                        id: 'playlists',
                        name: 'Playlists'
                    }
                ]
            })
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName == 'uri') {
                
                let result = await store.request('GET', newVal);
                this.state = result;
                this.header.setAttribute('uri', newVal);
                this.activate();
            }
        }
        
    }

    document.registerElement('sp-curatorview', SPCuratorViewElement);
    return SPCuratorViewElement;
})