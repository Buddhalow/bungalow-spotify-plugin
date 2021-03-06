define(['controls/view', 'plugins/spotify/store'], function (SPViewElement, store) {
    class SPPlayqueueViewElement extends SPViewElement {
        createdCallback() {
            super.createdCallback();
            this.classList.add('sp-view');
            if (!this.header) {
                this.header = document.createElement('sp-header');
                this.appendChild(this.header);
            }
            if (!this.trackcontext) {
                this.trackcontext = document.createElement('sp-trackcontext');
                this.appendChild(this.trackcontext);
            }

        }
        acceptsUri(uri) {
            return /^bungalow:internal:playqeueue$/.test(uri);
        }
        navigate() {

        }
        async attributeChangedCallback(attrName, oldVal, newVal) {
            if (!newVal) return;
            if (attrName === 'uri') {
                this.trackcontext.setAttribute('uri', newVal + ':track');

                if (newVal in store.state) {
                    this.header.setState(store.state[newVal]);
                    return;
                }
                let result = await store.request('GET', newVal);
                this.header.setState(result);
            }
        }
    }

    return SPPlayqueueViewElement;
})