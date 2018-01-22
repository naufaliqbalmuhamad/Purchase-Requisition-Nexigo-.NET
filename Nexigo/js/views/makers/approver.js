nexigo.widget({
    text: 'SCM APPROVER',
    toolbars: [
    ],
    views: [
        {
            type: 'panel',
            inline: true,
            name: 'SinglePanel',
            text: 'REQUEST SUMMARY',
            collapsible: true,
            offset: 1,
            fields: [
                {
                    type: 'grid',
                    text: 'Table',
                    name: 'gridCustomer',
                    onDblClick: 'doubleClick',
                    options: {
                        sortable: true,
                        selectionMode: 'singlerow',
                        selectable: 'single',
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
                        //{
                        //    name: 'Manager',
                        //    text: 'Manager Approval',
                        //    type: 'text',
                        //},
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
                        },
                        {
                            name: 'Disapproved',
                            text: 'Disapproved',
                            type: 'fileLink',
                            width: 65,
                            template: '<a href="javascript:void(0);" onclick = "xg.call(\'Disapproved\',\'#: TaskId #\');" target="_blank">Disapproved</a>'
                            //template: '<button class="xg-btn has-icon xg-btn-default" onclick = "xg.call(\'All\',\'#: VendorId #\');">Edit</button>'
                        },
                        {
                            name: 'Edit',
                            text: 'Edit',
                            type: 'fileLink',
                            width: 65,
                            template: '<a href="javascript:void(0);" onclick = "xg.call(\'Edit\',\'#: TaskId #\');" target="_blank">Edit</a>'
                            //template: '<button class="xg-btn has-icon xg-btn-default" onclick = "xg.call(\'All\',\'#: VendorId #\');">Edit</button>'
                        }

                    ]
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
                        readonly: true,
                        cols: 6
                    }, {
                        name: 'Name',
                        text: 'Requester Name',
                        readonly: true,
                        cols: 6
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
                        readonly: true,
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
                        readonly: true,
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
                        readonly: true,
                        data: {
                            url: 'http://localhost:31602/api/Request/readPlant',
                            method: 'POST'
                        },
                        cols: 6,
                    }, {
                        name: 'BudgetSource',
                        text: 'Budget Source',
                        readonly: true,
                        data: {
                            url: 'http://localhost:31602/api/Request/readBudget',
                            method: 'POST'
                        },
                        cols: 5,
                    },
                    {
                        name: 'Currency',
                        text: 'Currency',
                        readonly: true,
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
        },
        {
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
                    readonly: true,
                    text: 'Item Text',
                    type: 'text',
                    cols: 6,
                }]
            }, {
                type: 'fieldRow',
                fields: [{
                    name: 'MaterialGroup',
                    text: 'Material Group',
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
                    type: 'textarea',
                    readonly: true,
                }]
            },
            {
                type: 'fieldRow',
                fields: [{
                    name: 'Qty',
                    text: 'Quantity',
                    readonly: true,
                    type: 'text',
                    cols: 3,
                }, {
                    name: 'QtySatuan',
                    //type: 'select',
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
                    type: 'text',
                    cols: 3,
                }]
            },
            ]
        },
        {
            type: 'panel',
            inline: true,
            name: 'SinglePanel',
            text: 'APPROVER COMMENT',
            collapsible: true,
            offset: 1,
            fields: [{
                type: 'fieldRow',
                fields: [{
                    name: 'Comment',
                    type: 'textarea',
                    cols: 12
                }],
            }],
        },
        {
            type: 'panel',
            inline: true,
            offset: 5,
            fields: [
                {
                    type: 'buttons',
                    buttons: [
                        { text: 'Approve', icon: 'fa-check', stretch: true, cols: 3, action: 'Approved', name: 'Approve', cssClass: 'xg-btn-success' },
                        { text: 'Disapprove', icon: 'fa-close', stretch: true, cols: 3, cssClass: 'xg-btn-danger', name: 'Disapprove', action: 'Disapproved' },
                        { text: 'Edit', icon: 'fa-pencil-square-o', stretch: true, cols: 3, cssClass: 'xg-btn-info', name: 'Edit', action: 'Edit' },
                    ]
                },
            ]
        },
    ],
    functions: {
        init: function (xg, callback) {
            //var filter = {
            //    field: 'ApproveStatus',
            //    operator: 'eq',
            //    value: 'Edit'
            //};
            //xg.grid.instance('gridCustomer').dataSource.filter(filter)
            $('.menu').removeClass('hide');
            if (window.Jabatan !== "Approver") {
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
            //if (xg.grid.getSelectedRow('gridCustomer')[0].Manager === "Read") {
            //    $('[xg-field="ApproveStatus"]').addClass('hide');
            //    $('[xg-field="Update"]').addClass('hide');
            //} else {
            //    $('[xg-field="ApproveStatus"]').removeClass('hide');
            //    $('[xg-field="Update"]').removeClass('hide');
            //}
            window.ProcessId = fieldRow.ProcessId;
            window.TaskId = fieldRow.TaskId;
            xg.populate(fieldRow);
            console.log(fieldRow);
        },

        submit: function () {
            var req = xg.serialize();
            xg.loading.show();
            xg.ajax({
                url: 'http://localhost:31602/api/Approver/updateApprover',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    xg.loading.hide();
                    xg.grid.refresh('gridCustomer');
                    alert("Update sukses");
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
            //req.TaskId = value;
            req.TaskId = window.TaskId;
            req.ProcessId = window.ProcessId;
            xg.ajax({
                url: 'http://localhost:31602/api/Approver/SubmitTaskApprove',
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
                    alert("Approved");
                }
            });
        },

        Disapproved: function (value) {
            xg.loading.show();
            var req = xg.serialize();
            req.Action = "Disapproved";
            req.Email = window.Email;
            //req.TaskId = value;
            req.TaskId = window.TaskId;
            req.ProcessId = window.ProcessId;
            xg.ajax({
                url: 'http://localhost:31602/api/Approver/SubmitTaskDisapprove',
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
                    alert("Disapproved");
                }
            });
        },

        Edit: function (value) {
            xg.loading.show();
            var req = xg.serialize();
            req.Action = "Edit";
            req.Email = window.Email;
            //req.TaskId = value;
            req.TaskId = window.TaskId;
            req.ProcessId = window.ProcessId;
            xg.ajax({
                url: 'http://localhost:31602/api/Approver/SubmitTaskEdit',
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
                    alert("Sent back to Requester")
                }
            });
        }
    }
})