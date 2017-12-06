define([
    'controls/table',
    'plugins/spotify/designers/tracktabledesigner',
    'plugins/bungalow/datasources/restdatasource',
    'plugins/spotify/controls/tracktabledelegate'
    ], function (
        SPTableElement, 
        SPTrackTableDesigner,
        SPRestDataSource,
        SPTrackTableDelegate
    ) {
    return class SPTrackContextElement extends SPTableElement {
        createdCallback() {
            super.createdCallback();
            this.columnheaders = ['name', 'version', 'artists', 'album'];
            this.created2 = true;
            this.designer = new SPTrackTableDesigner();
            this.dataSource = new SPRestDataSource('', this.query, this.fields, this.maxRows);
            this.delegate = new SPTrackTableDelegate(this);
            this.delegate = new SPTrackTableDelegate();
            let uri =  this.getAttribute('uri');
         
            this.attributeChangedCallback('uri', null, uri);
            this.attributeChangedCallback('fields', null, this.getAttribute('fields'));
    
        }
    }
})