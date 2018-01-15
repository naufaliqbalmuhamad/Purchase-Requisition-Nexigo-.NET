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
                fields:[]
            }]
        }
    ],
    functions: {

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