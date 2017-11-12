define(['plugins/spotify/controls/resource', 'plugins/spotify/store'], function (SPResourceElement, store) {

    return class SPItemElement extends SPResourceElement {
        acceptsUri(uri) {
            return uri === 'bungalow:internal:start';
        }
        render(state) {
           this.innerHTML = '<sp-link uri="' + state.uri + '"><sp-image src="' + state.images[0].uri + '"></sp-image></sp-link>';
           this.innerHTML += '<br>';
           this.innerHTML +='<sp-link uri="' + state.uri + '">' + state.name + '</sp-link>';
        }
        setState(obj) {
            this.render(obj);
        }
    }
  
});