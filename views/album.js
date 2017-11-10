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
                this.innerHTML = '';
                this.albumView = document.createElement('sp-playlist');
                this.albumView.setAttribute('fields', 'p,name,duration,popularity,artists');
                this.appendChild(this.albumView);
                this.albumView.showCopyrights = true;
                this.albumView.view = this;
                let album = await store.request('GET', newVal);
                this.albumView.setAttribute('uri', newVal);
                this.setState(album);
                this.contentHook = document.createElement('sp-hook');
                this.contentHook.setAttribute('data-hook-id', 'albumview');
                this.appendChild(this.contentHook);
            }
        }
        setState(state) {
            this.state = state;
            this.render();
        }
        render() {
            GlobalTabBar.setState({
                object: this.state,
                objects: [
                    {
                        id: 'overview',
                        name: _('Overview')
                    }
                ]
            })
        }
    }

    document.registerElement('sp-albumview', SPAlbumViewElement);
    return SPViewElement;
});