define([
    'controls/table',
    'plugins/spotify/controls/tracktabledesigner',
    'plugins/spotify/controls/tracktabledatasource',
    'plugins/spotify/controls/tracktabledelegate'
    ], function (
        SPTableElement, 
        SPTrackTableDesigner,
        SPTrackTableDataSource,
        SPTrackTableDelegate
    ) {
    return class SPTrackContextElement extends SPTableElement {
        createdCallback() {
            super.createdCallback();
            this.fields = ['name', 'version', 'artists', 'album'];
            this.attributeChangedCallback('uri', null, this.getAttribute('uri'));
            this.attributeChangedCallback('fields', null, this.getAttribute('fields'));
            this.created2 = true;
            this.delegate = new SPTrackTableDelegate(this);
            
            

        }
        get maxRows() {
            return this.getAttribute('data-max-rows') || 28;
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName == 'fields') {
                if (!!newVal)
                    this.fields = newVal.split(',');
            }
            if (attrName == 'uri') {
                this.designer = new SPTrackTableDesigner();
                this.delegate = new SPTrackTableDelegate();
                this.dataSource = new SPTrackTableDataSource(newVal, this.query, this.fields, this.maxRows);
                this.fetchNext();
            }
        }
        render() {
            super.render();
           if (!this.getAttribute('headers')) {
                this.table.thead.setAttribute('hidden', 'true');

            } else {
                if (this.table.thead.hasAttribute('hidden'))
                this.table.thead.removeAttribute('hidden');
                
            }
        }
    }
})