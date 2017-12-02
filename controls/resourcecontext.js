define([
    'controls/table',
    'plugins/spotify/store',
    'plugins/spotify/designers/resourcetabledesigner',
    'plugins/spotify/controls/resourcetabledatasource',
    'plugins/spotify/delegates/resourcetabledelegate'
    ], function (
        SPTableElement, 
        store,
        SPResourceTableDesigner,
        SPResourceTableDataSource,
        SPResourceTableDelegate
    ) {
    return class SPResourceContextElement extends SPTableElement {
        createdCallback() {
            super.createdCallback();
            this.fields = ['name', 'user'];
            this.attributeChangedCallback('uri', null, this.getAttribute('uri'));
            this.attributeChangedCallback('fields', null, this.getAttribute('fields'));
            this.created2 = true;
            this.delegate = new SPResourceTableDelegate(this);
            
            
            store.on('change', () => {
                $('tr').removeClass('sp-current-track');
                if ('player' in store.state)
                $('tr[data-uri="' + store.state.player.item.uri + '"').addClass('sp-current-track');
            })
        }
        get maxRows() {
            return this.getAttribute('data-max-rows') || 50;
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName == 'fields') {
                if (!!newVal)
                    this.fields = newVal.split(',');
            }
            if (attrName == 'uri') {
                if (newVal == null) return;
                this.designer = new SPResourceTableDesigner();
            
                this.delegate = new SPResourceTableDelegate();
                this.dataSource = new SPResourceTableDataSource(newVal, this.query, this.fields, 10);
                    
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