define(['controls/view', 'plugins/spotify/store', 'plugins/spotify/delegates/resourcetabledelegate', 'plugins/spotify/controls/resourcetabledatasource', 'plugins/spotify/designers/resourcetabledesigner'], function (SPViewElement, store, SPResourceTableDelegate, SPResourceTableDataSource, SPResourceTableDesigner) {
    return class SPPlaylistListViewElement extends SPViewElement {
        async createdCallback() {
            super.createdCallback();
            this.playlistsList = document.createElement('sp-resourcecontext');
            this.playlistsList.setAttribute('showcolumnheaders', true);
            this.playlistsList.delegate = new SPResourceTableDelegate();
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