define(['controls/tabledelegate'], function (SPTableDelegate) {
    return class SPResourceTableDelegate extends SPTableDelegate {
        onItemDblClick(tr) {
            let id = tr.getAttribute('data-uri');
        }
    }
})