define(['controls/resource'], function (SPResourceElement) {
    return class SPSearchHeaderElement extends SPResourceElement {
        createdCallback() {
            super.createdCallback();
            let innerHTML = _.unescape(document.querySelector('#searchHeaderTemplate').innerHTML);
            this.template = _.template(innerHTML);
        
        }
        render() {
            if (!!this.template) {
                let html = this.template(this.state);    
                this.innerHTML = html;
            }
        }
    }
});