define('Widget'
,   [   'Widget.Router'
    ]
,   function (
        Router
    )
{
    'use strict';

    return  {
        MenuItems: {
            parent: 'settings'
        ,   id: 'widgetmenu'
        ,   name: _('Widget List').translate()
        ,   url: 'widgetlist'
        ,   index: 0
        }

    ,   mountToApp: function (application)
        {
            return new Router(application);
        }
    };
});
