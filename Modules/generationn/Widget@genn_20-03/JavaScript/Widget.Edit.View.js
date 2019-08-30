define(
    'Widget.Edit.View'
,   [   'widget_edit.tpl'
    ,   'Backbone'
    ,   'Backbone.FormView'
    ]
,   function (
        widget_edit_tpl
    ,   Backbone
    ,   BackboneFormView
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
            this.title = this.model.isNew() ?
                _('Add Widget').translate() : _('Edit Widget').translate();

            BackboneFormView.add(this);
        }

    ,   bindings: {
            '[name="color"]': 'color'
        ,   '[name="size"]': 'size'
        //, '[name="shape"]': 'shape'
        }

    ,   render: function ()
        {
            Backbone.View.prototype.render.apply(this, arguments);
        }

    ,   getContext: function ()
        {
            var widgetShapes = SC.ENVIRONMENT.WIDGET_SHAPES;

            var model = this.model;

            for (var i=0; i < widgetShapes.length; i++){
                if (widgetShapes[i].name == model.get('shape')) {
                    widgetShapes[i].isSelected = true;
                } else {
                    widgetShapes[i].isSelected = false;
                }
            }

            return {
                isWidgetNew: this.model.isNew()
            ,   color: this.model.get('color')
            ,   size: this.model.get('size')
            ,   shape: this.model.get('shape')
            ,   widgetShapes: widgetShapes
            };
        }
    });
});
