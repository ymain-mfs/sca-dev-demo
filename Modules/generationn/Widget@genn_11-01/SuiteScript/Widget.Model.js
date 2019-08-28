define('Widget.Model', ['SC.Model'], function (SCModel)
{
    'use strict';

    return SCModel.extend({
        name: 'Widget'

        // method to get data
    ,   get: function (id)
        {
            nlapiLogExecution('DEBUG', 'Widget model', 'get');

            var recWidget = nlapiLoadRecord('customrecord_gen_widget', id);
            var color = recWidget.getFieldValue('custrecord_gen_widget_color');
            var size = recWidget.getFieldValue('custrecord_gen_widget_size');
            var shape = recWidget.getFieldText('custrecord_gen_widget_shape');

            var widget = {
                color: color
            ,   size: size
            ,   shape: shape
            ,   internalid: id
            };

            nlapiLogExecution('DEBUG', 'widget data', JSON.stringify(widget));

            return widget;
        }
    
    });
});