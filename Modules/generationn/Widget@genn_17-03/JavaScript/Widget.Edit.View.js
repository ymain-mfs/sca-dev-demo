define(
    'Widget.Edit.View'
,   [   'widget_edit.tpl'
    ,   'Backbone'
    ]
,   function (
        widget_edit_tpl
    ,   Backbone
    )
{
    'use strict';

    return Backbone.View.extend({

        template: widget_edit_tpl

    ,   events: {
            'submit form': 'saveForm'
        }

    ,   initialize: function (options)
        {
            this.title = this.model.isNew() ? 'Add Widget' : 'Edit Widget';
        }

    ,   render: function ()
        {
            Backbone.View.prototype.render.apply(this, arguments);
        }

    ,   getContext: function ()
        {
            return {
                isWidgetNew: this.model.isNew()
            ,   color: this.model.get('color')
            ,   size: this.model.get('size')
            ,   shape: this.model.get('shape')
            };
        }
    });
});
