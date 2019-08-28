define('Widget.Router'
,   [   'Widget.List.View'
    ,   'Backbone'
    ]
,   function (
        WidgetListView
    ,   Backbone
    )
{
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'widgetlist': 'widgetList'
        }

    ,   initialize: function (application)
        {
            this.application = application;
        }

    ,   widgetList: function ()
        {
            var view = new WidgetListView({
                application: this.application
            });

            view.showContent();
        }
    });
});
