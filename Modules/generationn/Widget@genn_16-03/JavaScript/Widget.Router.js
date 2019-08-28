define('Widget.Router'
,   [   'Widget.List.View'
    ,   'Backbone'
    ,   'Profile.Model'
    ]
,   function (
        WidgetListView
    ,   Backbone
    ,   ProfileModel
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
            this.collection = ProfileModel.getInstance().get('widgets');
        }

    ,   widgetList: function ()
        {
            var view = new WidgetListView({
                application: this.application
            ,   collection: this.collection
            });

            view.showContent();
        }
    });
});
