define('Widget.Collection'
,   [  'Widget.Model'
    ,  'Backbone'
    ]
,   function (
        Model
    ,   Backbone
    )
{
    'use strict';

    return Backbone.Collection.extend(
    {
        model: Model
    });
});
