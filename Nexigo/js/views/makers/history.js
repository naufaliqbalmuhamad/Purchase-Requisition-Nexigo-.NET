nexigo.widget({
    text: 'HISTORY',
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
                    sourceOptions: {
                        pageSize: 10
                    },
                    options: {
                        pageable: true,
                        sortable: true,
                        selectionMode: 'singlerow',
                        autoheight: true,
                    },
                    fields: [
                        {
                            name: 'Id',
                            text: 'Request Id',
                            type: 'text',
                        },
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
                            text: 'Quantity',
                            type: 'text',
                        },
                        {
                            name: 'QtySatuan',
                            text: 'Unit',
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
            $('.menu').removeClass('hide');
            callback();
        }
    }
})