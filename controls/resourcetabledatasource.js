define(['controls/tabledatasource', 'plugins/spotify/store'], function (SPTableDataSource, store) {
	return class SPResourceTableDataSource extends SPTableDataSource {
        constructor(uri, q, fields, limit = 28) {
            super();
            this.uri = uri;
            this.q = q;
            this.limit = limit;
            if (limit) {
                this.limitRows = true;
            }
            this.objects = [];
            this.offset = -limit;
            this.fields = fields;
            this.loaded = false;
        }
        async refresh() {
            this.rows = [];
            let count = this.offset + this.limit;
            this.offset = 0;
            for (let i = 0; i < count; i+= this.limit) {
                let result = await store.request('GET', this.uri, {q: this.q, limit: this.limit, offset: this.offset}, null, false);
                if (!!result && 'objects' in result && result.objects instanceof Array)
                this.objects = result.objects;
            }
            if (this.onchange instanceof Function) {
                this.onchange.call(this);
                this.loaded = true;
            }
        }
        async fetchNext() {
            this.offset += this.limit;
            if (this.offset > 0) {
                debugger;
            }
            let result = await store.request('GET', this.uri, {q: this.q, limit: this.limit, offset: this.offset});
            if (!!result && 'objects' in result && result.objects instanceof Array)
            this.objects = result.objects;
            if (this.uri != null) {
            
            }
            if (this.onchange instanceof Function) {
                this.onchange.call(this);
            }
        }
        get canReorderRows() {
            return true;
        }
        async reorderRows(indicies, newPos) {
            let data = {range_start: indicies[0], range_length: indicies[indicies.length - 1], insert_before: newPos};
     
            let result = await store.request('PUT', this.uri, {}, data);
            this.refresh();
        }
        getNumberOfRows(row) {
            if (!row) {
                if (this.table.maxRows > 0 && this.table.maxRows < this.objects.length)
                    return this.table.maxRows;
                return this.objects.length;
            }
        }
        getRowAt(index, row) {
            return this.objects[index];
        }
        get numberOfColumnHeaders () {
            return this.fields.length;
        }
        getColumnAt(pos) {
            return this.fields[pos];
        }
    }
})