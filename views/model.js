define(
    [
        'controls/tabledesigner',
        'plugins/parse/datasources/parsedatasource',
        'controls/view'
    ], function (
        SPTableDesigner, 
        SPViewElement
    ) {
    return class SPModelViewElement extends SPViewElement {
            get dataSource() {
                return this.listView.dataSource;
            }
            set dataSource(value) {
                this.listView.dataSource = value;
                this.form.dataSource = value;
            }
            get dataSource() {
                return this.listView.dataSource;
            }
            set designer(value) {
                this.listView.designer = value;
            }
            get designer() {
                return this.listView.designer;
            }
            get model() {
                return this.getAttribute('model');
            }
            set model(value) {
                this.setAttribute('model', value);
            }
            createdCallback() {
                super.createdCallback();
                this.content = document.createElement('div');
                this.classList.add('sp-view');
                this.section = document.createElement('sp-tabcontent');
                this.editSection = document.createElement('sp-tabcontent');
                this.section.setAttribute('data-tab-id', 'overview');
                this.appendChild(this.section);
                
                
                this.header = document.createElement('sp-header');
                this.header.setAttribute('size', 128);
                
                this.listView =  document.createElement('sp-table');
                this.section.appendChild(this.header);
                if (this.content instanceof Node)
                this.section.appendChild(this.content);
                this.containerElement = document.createElement('div');
                this.containerElement.classList.add('container');
                this.section.appendChild(this.containerElement);
                this.containerElement.appendChild(this.listView);
                this.listView.header = this.header;
                this.listView.view = this;
                this.listView.emptyText = this.emptyText;
                var self = this;
                this.listView.delegate = {
                    onRowDoubleClick(row, obj) {
                        var dialog = document.createElement('sp-modal');
                            dialog.label = _e('Edit') + ' ' + this.model;
                            
                        document.body.appendChild(dialog);
                        dialog.navigate(row.uri);
                        dialog.show();
                    },
                    onRowSingleClick() {
                        
                    }
                };
                this.containerElement = document.createElement('div');
                this.containerElement.classList.add('container');
                this.editSection.appendChild(this.containerElement);
                this.form = document.createElement('sp-form');
                this.form.label = _e('Edit') + ' ' + this.model;
                this.containerElement.appendChild(this.form);
                this.editSection.style.display = 'none';
               
                    
                
            }
            activate() {
                super.activate();
                try {
                 GlobalTabBar.setState({
                    objects: [{
                        id: 'overview',
                        name: _e(this.label)
                    }],
                    add: {
                        uri: this.uri.split(':')[0] + ':' + this.uri.split(':')[1] + ':add'
                    }
                }); 
                } catch (e) {
                    
                }
            }
            attributeChangedCallback(attrName, oldVal, newVal) {
                if (attrName === 'uri') {
                    
                    this.innerHTML = '';
                    if (newVal === this.uri.split(':')[0] + this.uri.split(':')[1]) {
    
                        this.header.setState({
                            type: this.type,
                            name: _e(this.label),
                            uri: this.uri.split(':')[0] + ':' + this.uri.split(':')[1],
                            type: this.model,
                            description: this.description,
                            buttons: [{
                                label: _('Add'),
                                icon: 'plus',
                                onClick: (e) => {
                                    var dialog = document.createElement('sp-modal');
                                    dialog.label = _e('Add') + ' ' + this.model;
                                    document.body.appendChild(dialog);
                                      dialog.show();
                                  dialog.navigate(this.uri.split(':')[0] + ':' + this.uri.split(':')[1] + ':add');
                                  
                                }
                            }]
                        });
                        this.listView.setAttribute('uri', newVal);
                    } else {
                        this.section.style.display = 'none';
                        this.editSection.style.display = 'block';
                        let uri = newVal.split(':');
                        let id = uri[2];
                        this.form.setAttribute('data-object-id', id);
                        
                    }
                }
            }
            refresh() {
                let uri =this.getAttribute('uri');
                if (!!uri)
                this.attributeChangedCallback('uri', null, uri);
            }
        };

})