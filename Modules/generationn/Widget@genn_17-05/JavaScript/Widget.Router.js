define('Widget.Router'
,   [   'Widget.List.View'
    ,   'Widget.Edit.View'
    ,   'Widget.Model'
    ,   'Backbone'
    ,   'Profile.Model'
    ]
,   function (
        WidgetListView
    ,   WidgetEditView
    ,   WidgetModel
    ,   Backbone
    ,   ProfileModel
    )
{
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'widgetlist': 'widgetList'
        ,   'widgetlist/new': 'newWidget'
        ,   'widgetlist/:id': 'editWidget'
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

            // On any change to collection: automatically refresh display of widgets
            view.collection.on('reset destroy change add', function ()
            {
                var model = arguments[0];               
                var collection = this.collection;
                
                var widget, shape;
                for (var i=0; i < collection.models.length; i++){
                    widget = collection.models[i];
                    if (widget.get('internalid') == model.get('internalid')) {
                        for (var j=0; j < SC.ENVIRONMENT.WIDGET_SHAPES.length; j++){
                            shape = SC.ENVIRONMENT.WIDGET_SHAPES[j];
                            if (shape.internalid == model.get('shape')){
                                widget.set('shape', shape.name);
                            }
                        }
                    }
                }

                var currentView = this.application.getLayout().currentView;

                if (currentView instanceof WidgetListView || currentView instanceof WidgetEditView)
                {
                    this.widgetList();
                }

            }, this);           

            view.showContent();
        }

    ,   newWidget: function ()
        {
            var view = new WidgetEditView({
                application: this.application
            ,   collection: this.collection
            ,   model: new WidgetModel()
            });

            // On change to new model: add it to the collection 
            view.model.on('change', function (model)
            {
                view.collection.add(model);
            }, this);           
            
            view.showContent();
        }

    ,   editWidget: function (id)
        {
            var view = new WidgetEditView({
                application: this.application
            ,   collection: this.collection
            ,   model: this.collection.get(id)
            });     

            view.showContent();
        }
    });
});
