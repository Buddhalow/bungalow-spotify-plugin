define(['controls/view', 'plugins/spotify/store', 'plugins/spotify/controls/resourcetabledatasource', 'plugins/spotify/designers/resourcetabledesigner'], function (SPViewElement, store, SPResourceTableDataSource, SPResourceTableDesigner) {
    return class SPPlaylistListViewElement extends SPViewElement {
        async createdCallback() {
            super.createdCallback();
            this.innerHTML = '<sp-divider>' + 'Playlists featuring this artist' + ' (Powered by Google Custom Search API)</sp-divider>';
            this.playlistsList = document.createElement('sp-resourcecontext');
            this.playlistsList.setAttribute('headers', true);
            this.appendChild(this.playlistsList);
        }
        attachedCallback() {
        }
        get view() {
            return this.playlistsList.view;
        }
        set view(value) {
            this.playlistsList.view = value;
        }
        get header() {
            return this.playlistsList.header;
        }
        set header(value) {
            this.playlistsList.header = value;
        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName == 'uri') {
                this.playlistsList.setAttribute('uri', newVal + ':playlist');
                
            }
        }
    }
});