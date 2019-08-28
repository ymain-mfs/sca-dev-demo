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

    ,   events: {
            'click [data-action="remove"]': 'removeWidget'
        }

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

    ,   removeWidget: function (e)
        {
            e.preventDefault();

            var id = jQuery(e.target).data('id'); 
            this.collection.get(id).destroy({ wait: true });
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