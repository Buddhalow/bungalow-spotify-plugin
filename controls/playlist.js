define(['controls/resource', 'plugins/spotify/controls/trackcontext', 'plugins/spotify/controls/list'], function (SPResourceElement, SPTrackContextElement, SPListElement) {

    function swatchToColor(color) {
        return 'rgba(' + color.rgb[0] + ',' + color.rgb[1] + ',' + color.rgb[2] + ', 0.3)';
    }


    function rgbToRgba(rgb, alpha) {
        let str = 'rgba';
        let tf = rgb.split('(')[1].split(')')[0].split(',');
        str += '(' + tf + ',' + alpha + ')';
        return str;

    }

    return class SPPlaylistElement extends SPListElement {
        setState(object) {
            super.setState(object);
            this.renderTable(object, this.getAttribute('data-context-artist-uri'));
        }
        renderTable(obj, dataContextUri) {
            
            this.table = document.createElement('sp-trackcontext');
            this.table.addEventListener('rendered', () => {
      
                this.style.display = 'flex';
               
            })
            if (this.hasAttribute('fields')) {
                this.table.setAttribute('fields', this.getAttribute('fields'));
            } else {
                this.table.setAttribute('fields', 'name,artists,album,user,added_at');
            }
            if (dataContextUri != null)
                this.table.setAttribute('data-context-artist-uri', dataContextUri);
            this.table.setAttribute('uri', obj.uri + ':track');
            this.querySelector('.contents').appendChild(this.table);
         
          
        }
    }

})