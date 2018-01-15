nexigo.widget({
    text: 'PURCHASE REQUEST',
    toolbars: [],
    views: [
        {
            type: 'panel',
            inline: true,
            name: 'SinglePanel',
            text: 'REQUEST HISTORY',
            collapsible: true,
            offset: 1,
            fields: [
                {
                    type: 'grid',
                    text: 'Table',
                    name: 'gridCustomer',
                    onDblClick: 'doubleClick',
                    options: {
                        sortable: false,
                        editable: false,
                        filterable: true,
                        //pageable: true,
                        selectable: 'single',
                    },
                    fields: [
                        {
                            name: 'Name',
                            text: 'Requester',
                            type: 'text',
                        },
                        {
                            name: 'ItemText',
                            text: 'Item Detail',
                            type: 'text',
                        },
                        {
                            name: 'EstPrice',
                            text: 'Est. Price',
                            type: 'text',
                        },
                        {
                            name: 'Qty',
                            text: 'Qty',
                            type: 'text',
                        },
                        {
                            name: 'QtySatuan',
                            text: 'Satuan',
                            type: 'text',
                        },
                        {
                            name: 'MaterialGroup',
                            text: 'Material Group',
                            type: 'text',
                        },
                        {
                            name: 'Subtotal',
                            text: 'Sub Total',
                            type: 'text',
                        },
                        {
                            name: 'ApproveStatus',
                            text: 'Approve Status',
                            type: 'text',
                        },
                        {
                            name: 'Manager',
                            text: 'Manager Status',
                            type: 'text',
                        },
                        {
                            name: 'Owner',
                            text: 'Agreement',
                            type: 'text',
                        }
                    ],
                    data: 'http://localhost:31602/api/Request/readAll',
                }]
        }],
    functions: {
        init: function (xg, callback) {
            var filter = {
                field: 'Owner',
                operator: 'eq',
                value: 'Finished'
            };
            xg.grid.instance('gridCustomer').dataSource.filter(filter);
            $('.menu').removeClass('hide');
            callback();
        }
    }
})