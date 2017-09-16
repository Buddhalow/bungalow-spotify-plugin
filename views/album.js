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
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName === 'uri') {
                this.obj = await store.request('GET', newVal);
                this.innerHTML = '';
                this.albumView = document.createElement('sp-playlist');
                this.appendChild(this.albumView);
                this.albumView.showCopyrights = true;
                this.albumView.view = this;
                this.albumView.setAttribute('uri', newVal);
            }
        }
    }

    document.registerElement('sp-albumview', SPAlbumViewElement);
    return SPViewElement;
});