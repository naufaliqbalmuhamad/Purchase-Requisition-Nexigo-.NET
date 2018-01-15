nexigo.widget({
    text: 'Login',
    toolbars: [

    ],
    views: [
        {
            text: 'Login',
            cols: 4,
            offset: 4,
            clasContent: 'login',
            fields: [
                { name: 'Username', text: 'Username', required: true },
                { name: 'Password', type: 'password', text: 'Password', required: true }
            ]
        },
        {
            cols: 4,
            offset: 4,
            fields: [
                {
                    type: 'button',
                    name: 'Login',
                    text: 'Login',
                    stretch: true,
                    action: function () {
                        if (xg.validate()) {
                            var User = {};
                            xg.loading.show();
                            var req = xg.serialize();
                            xg.ajax({
                                url: 'http://localhost:31602/api/Login/readData',
                                data: JSON.stringify(req),
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                success: function (user) {
                                    xg.loading.hide();
                                    if (user === "Error") {
                                        alert("Username atau Password salah")
                                    };
                                    console.log(user);
                                    User = user;
                                    window.Jabatan = User.Jabatan;
                                    window.Email = User.Email;
                                },
                                complete: function () {
                                    xg.loading.hide();
                                    if (User.Jabatan === "Requester") {
                                        console.log(User.Jabatan)
                                        xg.navigate('makers/requester');
                                    }
                                    else if (User.Jabatan === "Approver") {
                                        console.log(User.Jabatan);
                                        xg.navigate('makers/approver');
                                    }
                                    else if (User.Jabatan === "Manager") {
                                        console.log(User.Jabatan);
                                        xg.navigate('makers/manager');
                                    }
                                    else if (User.Jabatan === "Owner") {
                                        console.log(User.Jabatan);
                                        xg.navigate('makers/owner')
                                    }
                                    else {
                                        alert("Tidak ada");
                                    }
                                }
                            });
                        } else {
                            alert("Isi username dan password")
                        }
                        
                    }
                }
            ]
        }
    ],
    functions: {
        init: function (xg, callback) {
            $('.menu').addClass('hide');
            $(document).keyup(function (event) {
                if (event.keyCode === 13) {
                    $('[xg-field="Login"]').click();
                }
            });
        }
    }
});
