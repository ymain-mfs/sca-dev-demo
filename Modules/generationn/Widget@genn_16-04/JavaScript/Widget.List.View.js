define(
    'Widget.List.View'
,   [   'widget_list.tpl'
    ,   'Backbone'
    ]
,   function (
        widget_list_tpl
    ,   Backbone
    )
{
    'use strict';

    return Backbone.View.extend({

        template: widget_list_tpl

    ,   attributes: { 'class': 'WidgetListView' }

    ,   initialize: function () 
        {

        }

    ,   getSelectedMenu: function ()
        {
            return 'widgetmenu';
        }

    ,   getBreadcrumbPages: function ()
        {
            return {
                text: 'Widgets'
            };
        }

    ,   getContext: function ()
        {
            return {
                pageHeader: 'My Widgets'
            ,   numberWidgets: this.collection.length
            ,   collection: this.collection
            };
        }
    });
});