define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
    class SPTrackViewElement extends SPViewElement {
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
                this.setState(this.obj);
            }
        }
        setState(state) {
            this.state = state;
            this.render();
        }
        async render() {
            this.innerHTML = '<div class="bg-mask"></div>';
            this.header = document.createElement('sp-header');
            this.header.setState(this.obj);
            this.header.view = this;
            this.appendChild(this.header);
            this.albumView = document.createElement('sp-trackcontext');
            this.albumView.setAttribute('fields', 'p,name,duration,popularity,artists');
            this.appendChild(this.albumView);
            this.albumView.showCopyrights = true;
            this.albumView.view = this;
            this.albumView.setAttribute('uri', this.getAttribute('uri') + ':track');
            this.contentHook = document.createElement('sp-hook');
            this.contentHook.setAttribute('data-hook-id', 'albumview');
            this.appendChild(this.contentHook);
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

    return SPTrackViewElement;
});