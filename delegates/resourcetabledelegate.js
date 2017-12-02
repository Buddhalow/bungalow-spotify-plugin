define(['controls/tabledelegate'], function (SPTableDelegate) {
    return class SPResourceTableDelegate extends SPTableDelegate {
        onRowDoubleClick(tr) {
            let uri = tr.getAttribute('data-uri');
            GlobalViewStack.navigate(uri);
        }
    }
})