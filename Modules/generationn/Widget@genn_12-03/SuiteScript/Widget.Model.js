define('Widget.Model', ['SC.Model', 'Application'], function (SCModel, Application)
{
    'use strict';

    Application.on('before:Widget.get', function (modelDefinition){
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
            console.log('Widget model', 'get');

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

            console.log('widget data', JSON.stringify(widget));

            return widget;
        }
        // method to add a widget
    ,   create: function(data) {
            console.log('Widget model', 'create');

            var recWidget = nlapiCreateRecord('customrecord_gen_widget');
            recWidget.setFieldValue('custrecord_gen_widget_color', data.color);
            recWidget.setFieldValue('custrecord_gen_widget_size', data.size);
            recWidget.setFieldValue('custrecord_gen_widget_shape', data.shape);

            // add widget; internal id of new widget is returned
            var internalId = nlapiSubmitRecord(recWidget);
            console.log('New widget internal id', internalId);

            data.internalid = internalId; // update response data with internal id

            return data;            
        }
        // method to update a widget
    ,   update: function(id, data) {
            console.log('Widget model', 'update');

            var recWidget = nlapiLoadRecord('customrecord_gen_widget', id);
            recWidget.setFieldValue('custrecord_gen_widget_color', data.color);
            recWidget.setFieldValue('custrecord_gen_widget_size', data.size);
            recWidget.setFieldValue('custrecord_gen_widget_shape', data.shape);

            // update widget; internal id of updated widget is returned
            var internalId = nlapiSubmitRecord(recWidget);
            console.log('Updated widget internal id', internalId);

            data.internalid = internalId; // update response data with internal id

            return data;            
        }
        // method to delete a widget
    ,   remove: function (id)
        {
            console.log('Widget model', 'remove');

            var internalId = nlapiDeleteRecord('customrecord_gen_widget', id);

            console.log('internalId of deleted widget', internalId);

            var result = {
                message: 'deletion okay for record with internal id: ' + internalId
            };

            return result;
        }
    });
});