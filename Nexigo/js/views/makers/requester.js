nexigo.widget({
    text: 'PURCHASE REQUEST',
    toolbars: [
    ],
    views: [{
        type: 'panel',
        inline: true,
        name: 'SinglePanel',
        text: 'REQUESTER INFORMATION',
        collapsible: true,
        offset: 1,
        fields: [{
            type: 'fieldRow',
            fields: [{
                name: 'Email',
                text: 'Requester Email',
                //inputKey: '[0-9]',
                readonly: true,
                cols: 6
            },{
                name: 'Name',
                text: 'Requester Name',
                readonly: true,
                cols: 6,
            }, {
                name: 'Payroll',
                text: 'Payroll Number',
                readonly: true,
                cols: 6
            }]
        }, {
            type: 'fieldRow',
            fields: [{
                name: 'RequesterPosition',
                text: 'Requester Position',
                placeholder: "-- select --",
                type: 'select',
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
                type: 'select',
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
                cols: 6
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Plant',
                text: 'Plant',
                placeholder: "-- select --",
                data: {
                    url: 'http://localhost:31602/api/Request/readPlant',
                    method: 'POST'
                },
                type: 'select',
                cols: 3,
            }, {
                name: 'BudgetSource',
                text: 'Budget Source',
                placeholder: "-- select --",
                type: 'select',
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
                type: 'select',
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
                data: {
                    url: 'http://localhost:31602/api/Request/readMaterial',
                    method: 'POST',
                },
                type: 'select',
                cols: 6,
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Description',
                text: 'Description',
                placeholder: '--- Write Here ---',
                cols: 10,
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Qty',
                text: 'Quantity',
                placeholder: '--- Qty ---',
                type: 'text',
                cols: 3,
            }, {
                name: 'QtySatuan',
                type: 'select',
                placeholder: "-- select --",
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
                placeholder: "0",
                type: 'text',
                cols: 3,
            }],
        },
        {
            type: 'fieldRow',
            offset: 8,
            fields: [        {
            name: 'ApproveStatus',
            text: 'Status',
            readonly: true,
            offset: 8,
            type: 'text',
            cols: 4,
                }
            ]
        },
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
                    name: 'Edit',
                    text: 'Edit',
                    type: 'fileLink',
                    width: 65,
                    template: '<a href="javascript:void(0);" onclick = "xg.call(\'Edit\',\'#: TaskId #\');" target="_blank">Edit</a>'
                    //template: '<button class="xg-btn has-icon xg-btn-default" onclick = "xg.call(\'All\',\'#: VendorId #\');">Edit</button>'
                }
            ],
        }, {
            type: 'fieldRow',
            fields: [
                { type: 'button', text: 'Submit', stretch: true, cols: 12, action: 'submit', name: 'Submit'},
                { type: 'button', text: 'Update', stretch: true, cols: 12, action: 'update', name: 'Update', hide: true },
                { type: 'button', text: 'Delete', stretch: true, cols: 12, action: 'delete', name: 'Delete', hide: true },
                { type: 'button', text: 'Create', stretch: true, cols: 12, action: 'create', name: 'Create', hide: true },
            ]
        }],
    }],
    functions: {
        init: function (xg, callback) {
            $('.menu').removeClass('hide');
            xg.ajax({
                url: 'http://localhost:31602/api/Request/readRequester/?Jabatan=' + window.Jabatan,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    console.log(result);
                    if (window.Jabatan !== "Requester") {
                        xg.navigate('makers/login');
                    };
                    var temp = JSON.parse(result);
                    xg.populate({
                        Name: temp.User.Name,
                        Jabatan: temp.User.Jabatan,
                        Payroll: temp.User.Payroll,
                        Email: temp.User.Email,
                        Id: temp.User.Id
                    })
                },
                complete: function () {
                    console.log("complete");
                    xg.loading.hide();
                },
            });
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

        submit: function () {
            var req = xg.serialize();
            xg.loading.show();
            xg.ajax({
                url: 'http://localhost:31602/api/Request/Create',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                    xg.grid.refresh('gridCustomer')
                    xg.loading.hide();
                },
                complete: function () {
                    console.log("complete");
                    xg.loading.hide();

                }
            });
        },

        create: function () {
            $('[xg-field="Submit"]').removeClass('hide');
            $('[xg-field="Create"]').addClass('hide');
            $('[xg-field="Update"]').addClass('hide');
            $('[xg-field="Delete"]').addClass('hide');
            xg.populate({ ApproveStatus: null });        
        },

        doubleClick: function (fieldRow) {
            //xg.loading.show();
            window.ProcessId = fieldRow.ProcessId;
            xg.populate(fieldRow);
            if (xg.serialize().ApproveStatus === "Approved") {
                $('[xg-field="Submit"]').addClass('hide');
                $('[xg-field="Update"]').addClass('hide');
                $('[xg-field="Delete"]').addClass('hide');
                $('[xg-field="Create"]').removeClass('hide');
            } else if (xg.serialize().ApproveStatus === "Edit") {
                $('[xg-field="Submit"]').addClass('hide');
                $('[xg-field="Delete"]').addClass('hide');
                $('[xg-field="Update"]').removeClass('hide');
                $('[xg-field="Create"]').removeClass('hide');
            } else if (xg.serialize().ApproveStatus === "Disapproved") {
                $('[xg-field="Submit"]').addClass('hide');
                $('[xg-field="Update"]').addClass('hide');
                $('[xg-field="Delete"]').removeClass('hide');
                $('[xg-field="Create"]').removeClass('hide');
            } else {
                $('[xg-field="Submit"]').addClass('hide');
                $('[xg-field="Update"]').removeClass('hide');
                $('[xg-field="Delete"]').removeClass('hide');
                $('[xg-field="Create"]').removeClass('hide');
            }
            console.log(fieldRow);
        },

        Edit: function (value) {
            xg.loading.show();
            var req = xg.serialize();
            req.Action = "Edit";
            req.Email = window.Email;
            req.TaskId = value;
            req.ProcessId = window.ProcessId;
            xg.ajax({
                url: 'http://localhost:31602/api/Request/updateData',
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

        delete: function () {
            //var req = xg.serialize();
            //var Id = req.Name;
            var Id = xg.grid.getSelectedRow('gridCustomer')[0].Id; 
            xg.ajax({
                url: 'http://localhost:31602/api/Request/deleteData?Id=' + Id,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    alert("Sukses");
                    xg.grid.refresh('gridCustomer');
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                }
            });
        }
    }
})