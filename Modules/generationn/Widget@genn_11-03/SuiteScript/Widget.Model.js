define('Widget.Model', ['SC.Model', 'Application'], function (SCModel, Application)
{
    'use strict';

    Application.on('before:Widget.get',  function (modelDefinition){
        console.log('before event', 'Widget.get');
    });

    Application.on('after:Widget.get', function (modelDefinition, resultData){
        console.log('after event', 'Widget.get');
        console.log('after event - method results', JSON.stringify(resultData));
    });

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