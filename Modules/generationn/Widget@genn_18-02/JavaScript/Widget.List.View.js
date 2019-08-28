define(
    'Widget.List.View'
,   [   'widget_list.tpl'
    ,   'Backbone'
    ,   'Backbone.CompositeView'
    ,   'Backbone.CollectionView'
    ,   'RecordViews.View'
    ]
,   function (
        widget_list_tpl
    ,   Backbone
    ,   BackboneCompositeView
    ,   BackboneCollectionView
    ,   RecordViewsView
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
            BackboneCompositeView.add(this);
        }

    ,   childViews: {
            'Widgets.Collection': function ()
            {

                var records_collection = 
                    new Backbone.Collection(this.collection.map(function (widget)
                {
                    return new Backbone.Model({
                        title: 'Widget ' + widget.get('internalid')
                    ,   detailsURL: '#/widgetlist/' + widget.get('internalid')
                    ,   internalid: widget.get('internalid')
                    ,   showInModal: true
                    ,   generateRemoveButton: true

                    ,   columns: [
                            {
                                label: 'Color'
                            ,   type: 'color'
                            ,   name: 'color'
                            ,   value: widget.get('color')
                            }
                        ,   {
                                label: 'Size'
                            ,   type: 'size'
                            ,   name: 'size'
                            ,   value: widget.get('size')
                            }
                        ,   {
                                label: 'Shape'
                            ,   type: 'shape'
                            ,   name: 'shape'
                            ,   value: widget.get('shape')
                            }
                        ]
                    });
                }));

                return new BackboneCollectionView(
                {
                    childView: RecordViewsView
                ,   collection: records_collection
                ,   viewsPerRow: 1
                });
            }
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