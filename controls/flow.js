define(['plugins/spotify/controls/resource', 'plugins/spotify/store'], function (SPResourceElement, store) {

    return class SPFlowElement extends SPResourceElement {
        acceptsUri(uri) {
            return uri === 'bungalow:internal:start';
        }
        render(state) {
            this.innerHTML = '';
            state.objects.map((obj) => {
                let a = document.createElement('sp-item');
                a.setState(obj);
                this.appendChild(a);
            })
        }
        setState(obj) {
            this.render(obj);
        }
    }
  
});