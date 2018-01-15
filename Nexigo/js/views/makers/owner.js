nexigo.widget({
    text: 'PURCHASE REQUEST',
    toolbars: [
    ],
    views: [
        {
            type: 'panel',
            inline: true,
            name: 'SinglePanel',
            text: 'REQUESTER SUMMARY',
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
                            name: 'Manager',
                            text: 'Manager Status',
                            type: 'text',
                        },
                        {
                            name: 'TaskId',
                            text: 'Task Id',
                            type: 'text',
                        },
                        {
                            name: 'ProcessId',
                            text: 'Process Id',
                            type: 'text',
                        },
                        {
                            name: 'Approved',
                            text: 'Approved',
                            type: 'fileLink',
                            width: 65,
                            template: '<a href="javascript:void(0);" onclick = "xg.call(\'Approved\',\'#: TaskId #\');" target="_blank">Approved</a>'
                            //template: '<button class="xg-btn has-icon xg-btn-default" onclick = "xg.call(\'All\',\'#: VendorId #\');">Edit</button>'
                        }
                    ],
                }]
        },
        {
            type: 'panel',
            inline: true,
            name: 'SinglePanel',
            text: 'REQUESTER INFORMATION',
            collapsible: true,
            offset: 1,
            fields: [
                {
                    type: 'fieldRow',
                    fields: [{
                        name: 'Id',
                        text: 'Request Id',
                        //inputKey: '[0-9]',
                        readonly: true,
                        cols: 6
                    }, {
                        name: 'Name',
                        text: 'Requester Name',
                        //inputKey: '[a-z]',
                        readonly: true,
                        cols: 6,
                    }, {
                        name: 'Payroll',
                        text: 'Payroll Number',
                        //inputKey: '[0-9]',
                        readonly: true,
                        cols: 6
                    }]
                }, {
                    type: 'fieldRow',
                    fields: [{
                        name: 'RequesterPosition',
                        text: 'Requester Position',
                        placeholder: "-- select --",
                        readonly: true,
                        //type: 'select',
                        data: {
                            url: 'http://localhost:31602/api/Request/readPosition',
                            method: 'POST'
                        },
                        cols: 6,
                    }, {
                        name: 'BPM-Id',
                        text: 'BPM Process ID',
                        placeholder: 'N/A',
                        readonly: true,
                        cols: 6
                    }]
                },
                {
                    type: 'fieldRow',
                    fields: [{
                        name: 'AsalCompany',
                        text: 'Company',
                        placeholder: "-- select --",
                        readonly: true,
                        //type: 'select',
                        data: {
                            url: 'http://localhost:31602/api/Request/readCompany',
                            method: 'POST'
                        },
                        cols: 6,
                    }, {
                        name: 'Location',
                        text: 'Propose Receiving Material Location',
                        type: 'text',
                        required: true,
                        readonly: true,
                        cols: 6
                    }]
                },
                {
                    type: 'fieldRow',
                    fields: [{
                        name: 'Plant',
                        text: 'Plant',
                        placeholder: "-- select --",
                        readonly: true,
                        data: {
                            url: 'http://localhost:31602/api/Request/readPlant',
                            method: 'POST'
                        },
                        //type: 'select',
                        cols: 6,
                    }, {
                        name: 'BudgetSource',
                        text: 'Budget Source',
                        placeholder: "-- select --",
                        readonly: true,
                        //type: 'select',
                        data: {
                            url: 'http://localhost:31602/api/Request/readBudget',
                            method: 'POST'
                        },
                        cols: 4,
                        offset: 3,
                    },
                    {
                        name: 'Currency',
                        text: 'Currency',
                        //type: 'select',
                        readonly: true,
                        //inputKey: '[0-9]',
                        data: {
                            url: 'http://localhost:31602/api/Request/readCurrency',
                            method: 'POST',
                        },
                        cols: 6
                    },
                    {
                        type: 'fieldRow',
                        fields: [{
                            name: 'Date',
                            text: 'Expected Date',
                            type: 'picker',
                            placeholder: '--- Pick A Date ---',
                            readonly: true,
                            required: true,
                            cols: 6
                        }],
                    },
                    ]
                }],
        },
        {
            type: 'panel',
            inline: true,
            name: 'SinglePanel',
            text: 'HEADER INFORMATION',
            collapsible: true,
            placeholder: '--- Write Here ---',
            offset: 1,
            fields: [{
                type: 'fieldRow',
                fields: [{
                    name: 'SinglePanel',
                    readonly: true,
                    text: 'Justification',
                    type: 'textarea',
                }],
            }],
        }, {
            type: 'panel',
            inline: true,
            name: 'SinglePanel',
            text: 'ITEM',
            collapsible: true,
            offset: 1,
            fields: [{
                type: 'fieldRow',
                fields: [{
                    name: 'ItemText',
                    placeholder: '--- Write Here---',
                    readonly: true,
                    text: 'Item Text',
                    type: 'text',
                    cols: 7,
                }]
            }, {
                type: 'fieldRow',
                fields: [{
                    name: 'MaterialGroup',
                    text: 'Material Group',
                    placeholder: "-- select --",
                    readonly: true,
                    data: {
                        url: 'http://localhost:31602/api/Request/readMaterial',
                        method: 'POST',
                    },
                    //type: 'select',
                    cols: 6,
                }]
            },
            {
                type: 'fieldRow',
                fields: [{
                    name: 'Description',
                    text: 'Description',
                    placeholder: '--- Write Here ---',
                    readonly: true,
                    cols: 10,
                }]
            },
            {
                type: 'fieldRow',
                fields: [{
                    name: 'Qty',
                    text: 'Quantity',
                    placeholder: '--- Qty ---',
                    readonly: true,
                    type: 'text',
                    cols: 3,
                }, {
                    name: 'QtySatuan',
                    //type: 'select',
                    placeholder: "-- select --",
                    readonly: true,
                    data: {
                        url: 'http://localhost:31602/api/Request/readQuantity',
                        method: 'POST',
                    },
                    cols: 3
                }]
            },
            {
                type: 'fieldRow',
                fields: [{
                    name: 'EstPrice',
                    text: 'Estimated Price',
                    readonly: true,
                    placeholder: "0",
                    type: 'text',
                    cols: 3,
                }],
            }, {
                type: 'fieldRow',
                fields: [{
                    name: 'Owner',
                    text: 'Agreement',
                    type: 'radio',
                    cols: 4,
                    data: [{
                        text: 'Agree',
                        value: 'Finished'
                    }]
                }]
            },
            {
                type: 'fieldRow',
                fields: [
                    { type: 'button', text: 'Submit', stretch: true, cols: 12, action: 'update', name: 'Update' }
                ]
            }],
        }],
    functions: {
        init: function (xg, callback) {
            //var filter = {
            //    field: 'Manager',
            //    operator: 'eq',
            //    value: 'Read'
            //};
            //xg.grid.instance('gridCustomer').dataSource.filter(filter);
            $('.menu').removeClass('hide');
            if (window.Jabatan !== "Owner") {
                xg.navigate('makers/login');
            }
            if (window.Email) {
                xg.loading.show();
                $.get('http://localhost:31602/api/Approver/GetTaskList?Email=' + window.Email, function (result) {
                    console.log(result);
                    if (result.success) {
                        xg.each(result.data, function (item, index) {
                            xg.grid.addRow('gridCustomer', item);
                        });
                        xg.loading.hide();
                    }
                })
            }
            else {
                xg.navigate("makers/login");
                xg.loading.hide();
            }
            callback();
        },

        doubleClick: function (fieldRow) {
            xg.populate(fieldRow);
            console.log(fieldRow);
            window.ProcessId = fieldRow.ProcessId;
        },

        update: function () {
            var req = xg.serialize();
            xg.loading.show();
            xg.ajax({
                url: 'http://localhost:31602/api/Owner/updateData',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                    xg.loading.hide();
                    xg.grid.refresh('gridCustomer');
                    alert("Agreed");
                    xg.navigate('makers/history');
                },
                complete: function () {
                    console.log("complete");
                }
            });
        },

        Approved: function (value) {
            xg.loading.show();
            var req = xg.serialize();
            req.Action = "Approved";
            req.Email = window.Email;
            req.TaskId = value;
            req.ProcessId = window.ProcessId;
            xg.ajax({
                url: 'http://localhost:31602/api/Owner/SubmitTaskOwner',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                    xg.loading.hide();
                },
                complete: function () {
                    console.log("complete");
                    xg.loading.hide();
                    xg.navigate("makers/login");
                }
            });
        },
    }
})