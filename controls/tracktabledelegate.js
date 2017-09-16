define(['plugins/spotify/store'], function (store) {
    class SPTrackTableDelegate {
        async onRowClick(tr, row) {
        }
        async onRowDoubleClick(tr, row) {
            await store.playTrack(row, tr.getAttribute('data-context-uri'));
        }
    }
    return SPTrackTableDelegate;
})