define([
    'controls/table',
    'plugins/spotify/designers/resourcetabledesigner',
    'plugins/bungalow/datasources/restdatasource',
    'plugins/spotify/controls/tracktabledelegate'
    ], function (
        SPTableElement, 
        SPResourceTableDesigner,
        SPRestDataSource,
        SPTrackTableDelegate
    ) {
    return class SPResourceContextElement extends SPTableElement {
        createdCallback() {
            super.createdCallback();
            this.columnheaders = ['icon', 'name', 'user'];
            this.created2 = true;
            this.designer = new SPResourceTableDesigner();
            this.dataSource = new SPRestDataSource('', this.query, this.fields, this.maxRows);
            this.delegate = new SPTrackTableDelegate(this);
            this.delegate = new SPTrackTableDelegate();
            this.attributeChangedCallback('uri', null, this.getAttribute('uri'));
            this.attributeChangedCallback('fields', null, this.getAttribute('fields'));
        }
    };
})