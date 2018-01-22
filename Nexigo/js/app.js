var db = {
    menu: [
        {
            text: "Home",
            icon: "fa-home",
            link: "makers/login"
        },
        {
          text: 'History',
          icon: 'fa-history',
          link: 'makers/history'
        }
    ],
};




(function () {
    nexigo.config.widgetView = '[data-name=content]';
    nexigo.config.jqxlibbase = 'libs/jqx/';
    nexigo.config.kendolibbase = 'libs/kendo/';
    nexigo.config.viewBasePath = '';
    nexigo.config.viewDefault = 'makers/login';
    nexigo.menu('[class="sg-header-menu"]', {
        theme: 'ccai',
        data: db.menu,
        onClick:
        function (name, link) {
            if (link === 'showcode') {
                var url = window.location.hash.substr(1) || 'text';
                $('body').addClass('show-code-editor');
                $.get('js/views/' + url + '.js', function (r) {
                    $('body').addClass('show-code-editor');
                    ace.edit('code-editor').getSession().setValue(r);
                })
            }
            else {
                xg.navigate(link);
            }
        }
    });

    var url = window.location.hash.substr(1) || nexigo.config.viewDefault || 'home';
    if (url !== 'showcode') {
        if (window.location.hash.substr(1) === url) xg.loadPage(url);
        else xg.navigate(url);
    };

    nexigo.auth.config.loginPage = 'demo/text';
}());

(function () {
    var editor = ace.edit('code-editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');

    $('#close-code-editor').on('click', function () {
        $('body').removeClass('show-code-editor');
        eval(editor.getValue());
    })
}());
