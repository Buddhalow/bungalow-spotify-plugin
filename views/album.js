define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
    class SPAlbumViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            this.classList.add('sp-view');
            this.innerHTML = '<div class="bg-mask"></div>';
            this.header = document.createElement('sp-header');
            this.header.view = this;
            this.appendChild(this.header);
            this.albumTab = document.createElement('sp-tabcontent');
            this.appendChild(this.albumTab);
            
            this.albumTab.setAttribute('label', _e('Overview'));
            this.albumTab.setAttribute('data-tab-id', 'overview');
            
            this.albumTab.albumView = document.createElement('sp-trackcontext');
            this.albumTab.albumView.setAttribute('fields', 'p,name,duration,popularity,artists');
            this.albumTab.appendChild(this.albumTab.albumView);
            this.albumTab.albumView.showCopyrights = true;
            this.albumTab.albumView.view = this;
            this.albumTab.contentHook = document.createElement('sp-hook');
            this.albumTab.contentHook.setAttribute('data-hook-id', 'albumview');
            this.albumTab.appendChild(this.albumTab.contentHook);
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
                newVal = 'spotify:' + newVal.split(':').splice(1).join(':');
                this.header.setAttribute('uri', newVal);
                this.albumTab.albumView.setAttribute('uri', newVal + ':track');
                super.afterLoad();
                this.setState(this.obj);
            }
        }
        setState(state) {
            this.state = state;
            this.render();
        }
        async render() {
            this.header.setState(this.obj);
            
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