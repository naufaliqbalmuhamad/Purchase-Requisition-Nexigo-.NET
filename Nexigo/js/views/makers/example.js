var data = [
    {
        text: 'bababa',
        value: 'haoubc'
    },
    {
        text: 'sfefef',
        value: 'seveev'
    },
    {
        text: 'laalalal',
        value: 'aalalal'
    }
];

nexigo.widget({
    text: 'BIODATA',
    toolbars: [

    ],
    views: [
        {
            type: 'row',
            panels: [{
                name: 'panel1',
                text: 'Full Panel with Row',
                fields: [
                    {
                        name: 'Input',
                        type: 'text',
                        text: 'Ini Input 1',
                        cols: 3,
                        required: true
                    },
                    {
                        name: 'Tanggal',
                        type: 'picker',
                        text: 'Tanggal',
                        cols: 3,
                        required: true
                    },
                    {
                        name: 'Email_1',
                        text: 'Email(readonly)',
                        type: 'email',
                        readonly: true,
                        cols: 4
                    },
                    {
                        name: 'DropDown',
                        text: 'Dropdown',
                        placeholder: '--select--',
                        type: 'select',
                        cols: 4,
                        //data: [
                        //    {
                        //        text: 'data1',
                        //        value: 'bebaaas'
                        //    },
                        //    {
                        //        text: 'data2',
                        //        value: 'bebebebe'
                        //    },
                        //    {
                        //        text: 'data3',
                        //        value: 'aalmal'
                        //    }
                        //]
                        data: 'http://localhost:31602/api/Makers/getData',
                        onChange: function (value) {
                            alert(value);
                            xg.populate({ Input: 'Yayaya' });
                        }
                    },
                    {
                        name: 'radio',
                        text: 'Radio Button',
                        type: 'radio',
                        data: data
                    },
                    {
                        type: 'content',
                        content: '<input type="text", name="Firstname", value="Mickey">'
                    },
                    {
                        type: 'button',
                        name: 'Alert',
                        text: 'Alert',
                        action: function () {
                            alert('ini alert')
                            xg.populate({ Input: 'jajajaja' })
                        }
                    },
                    {
                        type: 'button',
                        name: 'Save',
                        text: 'Save Data',
                        action: 'Save'
                    },
                    {
                        name: 'TableGrid',
                        type: 'grid',
                        text: 'Grid',
                        fields: [
                            {
                                name: 'No',
                                text: 'No',
                                type: 'string'
                            },
                            {
                                name: 'Nama',
                                text: 'Nama',
                                type: 'string'
                            },
                            {
                                name: 'NIM',
                                text: 'NIM',
                                type: 'string'
                            }
                        ],
                        //data: [
                        //    {
                        //        No: '1',
                        //        Nama: 'Nanau',
                        //        NIM: '1313'
                        //    },
                        //    {
                        //        No: '2',
                        //        Nama: 'Juiui',
                        //        NIM: '6756'
                        //    }
                        //]
                        data: 'http://localhost:31602/api/Makers/gridData'
                    }
                ]
            }]
        }
    ],
    functions: {

        doubleClick: function (row) {
            xg.loading.show();
            console.log(row);
            xg.populate(row);
            var data = xg.serialize();
            window.ProcessID = row.ProcessID;
            xg.loading.hide();
        },

        Save: function () {
            alert("Save Data");
        },

        //save: function () {
        //    var req = xg.serialize();
        //    xg.ajax({
        //        url: 'http://localhost:31602/api/CRUD/Create',
        //        type: 'POST',
        //        data: JSON.stringify(req),
        //        contentType: "application/json; charset=utf-8",
        //        success: function (data) {
        //            xg.loading.show();
        //            console.log(data);
        //            xg.loading.hide();
        //        },
        //        complete: function () {
        //            console.log("complete");
        //        }
        //    });
        //},


        init: function (xg, callback) {
            //alert('test');

            //xg.ajax({
            //    url: 'http://localhost:31602/api/employee/EmployeeList',
            //    data: {},
            //    type: 'POST',
            //    //dataType: 'json',
            //    contentType: "application/json; charset=utf-8",
            //    success: function (data) {
            //        console.log(data);
            //    },
            //    complete: function () {
            //        console.log("complete");
            //    }
            //});
            $('[xg-field="save"]').hide();
            callback();
        }
    }
});

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
                name: 'Requester',
                text: 'Requester Name',
                inputKey: '[a-z]',
                readonly: true,
                cols: 6,
            }, {
                name: 'Payroll',
                text: 'Payroll Number',
                inputKey: '[0-9]',
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
                cols: 6,
            }, {
                name: 'BPM-Id',
                text: 'BPM Process ID',
                inputKey: 'N/A',
                readonly: true,
                cols: 6
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'BPM-Number',
                text: 'BPM PR Number',
                placeholder: "N/A",
                readonly: true,
                cols: 6,
            }, {
                name: 'BPM-Id',
                text: 'SAP PR Number',
                placeholder: 'N/A',
                readonly: true,
                cols: 6
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Company',
                text: 'Company',
                placeholder: "-- select --",
                type: 'select',
                cols: 6,
            }, {
                name: 'Location',
                text: 'Propose Receiving Material Location',
                type: 'text',
                cols: 6
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Plant',
                text: 'Plant',
                placeholder: "-- select --",
                type: 'select',
                cols: 3,
            }, {
                name: 'BudgetSource',
                text: 'Budget Source',
                placeholder: "-- select --",
                type: 'select',
                cols: 4,
                offset: 3,
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Currency',
                text: 'Currency',
                placeholder: "-- select --",
                type: 'select',
                cols: 3,
            }],
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Date',
                text: 'Expected Date',
                type: 'picker',
                content: 'Pilih Tanggal',
                required: true,
                cols: 6
            }],
        },
        ]
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
                name: 'Requester',
                text: 'Justification',
                type: 'textarea',
            }],
        }],
    },
    {
        type: 'panel',
        inline: true,
        name: 'SinglePanel',
        text: 'Item',
        collapsible: true,
        offset: 1,
        fields: [{
            type: 'fieldRow',
            fields: [{
                name: 'Requester',
                text: 'Item Text',
                type: 'text',
                cols: 7,
            }]
        }, {
            type: 'fieldRow',
            fields: [{
                name: 'Material Group',
                text: 'Material Group',
                placeholder: "-- select --",
                type: 'select',
                cols: 6,
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Description',
                text: 'Description',
                placeholder: "",
                cols: 10,
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Quantity',
                text: 'Quantity',
                placeholder: "",
                type: 'text',
                cols: 2,
            }, {
                name: 'x',
                type: 'select',
                placeholder: "-- select --",
                cols: 3
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Estimated Price',
                text: 'Estimated Price',
                placeholder: "",
                type: 'text',
                cols: 2,
            }, {
                name: 'Nominal',
                type: 'text',
                placeholder: "0",
                cols: 3
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Total EP',
                text: 'Total Estimated Price',
                placeholder: "0",
                type: 'text',
                cols: 3,
            }],
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Cost Center',
                text: 'Cost Center',
                type: 'text',
                icon: 'fa-lock',
                required: true,
                cols: 3
            }, {
                name: 'Cost Center',
                type: 'text',
                icon: 'fa-lock',
                required: true,
                cols: 4
            }]
        },
        {
            type: 'fieldRow',
            fields: [{
                name: 'Material Picture',
                text: 'Material Picture',
                placeholder: "",
                type: 'text',
                cols: 10,
            }, {
                type: 'buttons',
                name: 'button',
                text: 'Browse..',
                action: '',
            }],
        },
        {
            type: 'fieldRow',
            offset: 4,
            fields: [{
                name: 'Total EP',
                placeholder: 'Please attach 1 (one) small picture of material if available.',
                text: ' ',
                cols: 6,
                offset: 3,
                readonly: true,
            }],
        },
        {
            type: 'fieldRow',
            fields: [
                { type: 'button', text: 'Add', stretch: true, cols: 1, offset: 4, },
                { type: 'button', text: 'Reset', stretch: true, cols: 1 },
                { type: 'button', text: 'Upload...', cols: 1, stretch: true }
            ]
        },
        {
            type: 'fieldRow',
            fields: [
                { type: 'button', text: 'Material Info', stretch: true, cols: 3 },
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
                pageable: true,
                selectable: 'single',
            },
            fields: [
                {
                    name: 'No',
                    text: 'No',
                    type: 'text',
                },
                {
                    name: 'ItemDetail',
                    text: 'Item Detail',
                    type: 'text',
                },
                {
                    name: 'Est-Price',
                    text: 'Est. Price',
                    type: 'text',
                },
                {
                    name: 'Qty',
                    text: 'Qty',
                    type: 'text',
                },
                {
                    name: 'Unit',
                    text: 'Unit',
                    type: 'text',
                },
                {
                    name: 'Sub-Total',
                    text: 'Sub Total',
                    type: 'text',
                },
                {
                    name: 'Action',
                    text: 'Action',
                    type: 'text',
                }
            ],
        }]
    },
    {
        type: 'panel',
        inline: true,
        name: 'SinglePanel',
        text: 'COMMENTS HISTORY',
        collapsible: true,
        offset: 1,
        fields: [{
            type: 'panel',
            inline: true,
            name: 'SinglePanel',
            text: 'WRITE YOUR COMMENTS',
            fields: [{
                type: 'fieldRow',
                fields: [{
                    name: 'Comments',
                    type: 'textarea',
                }],
            }],
        },],
    },
    ],
    functions: {
        Save: function () {
            alert("Save Data");
        },
        //doubleClick: function (row) {
        //    xg.loading.show();
        //    console.log(row);
        //    xg.populate(row);
        //    var data = xg.serialize();
        //    window.ProcessID = row.ProcessID;
        //    xg.loading.hide();
        //},

        //save: function () {
        //    var req = xg.serialize();
        //    xg.ajax({
        //        url: 'http://localhost:31602/api/CRUD/Create',
        //        type: 'POST',
        //        data: JSON.stringify(req),
        //        contentType: "application/json; charset=utf-8",
        //        success: function (data) {
        //            xg.loading.show();
        //            console.log(data);
        //            xg.loading.hide();
        //        },
        //        complete: function () {
        //            console.log("complete");
        //        }
        //    });
        //},


        init: function (xg, callback) {
            //alert('test');

            //xg.ajax({
            //    url: 'http://localhost:31602/api/employee/EmployeeList',
            //    data: {},
            //    type: 'POST',
            //    //dataType: 'json',
            //    contentType: "application/json; charset=utf-8",
            //    success: function (data) {
            //        console.log(data);
            //    },
            //    complete: function () {
            //        console.log("complete");
            //    }
            //});
            $('[xg-field="save"]').hide();
            callback();
        }
    }
});

