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

    ,   validation: {
            color: {required: true, msg: 'Color is required'}
        ,   size: {required: true, msg: 'Size is required'}
        ,   shape: {required: true, msg: 'Shape is required'}
        }

        // Retrieve id of customer: for use by list, listCoded, 
        // get, and create methods
    ,   getCustomerId: function()
        {
            // get id of logged in shopper and set as search criteria
            var customerFields = customer.getFieldValues(['internalid']);
            console.log('Customer Fields', JSON.stringify(customerFields));
            var customerId = customerFields.internalid;

            return customerId;
        }
        // method to get data
    ,   get: function (id)
        {
            console.log('Widget model', 'get');

            var recWidget = nlapiLoadRecord('customrecord_gen_widget', id);
            var color = recWidget.getFieldValue('custrecord_gen_widget_color');
            var size = recWidget.getFieldValue('custrecord_gen_widget_size');
            var shape = recWidget.getFieldText('custrecord_gen_widget_shape');

            var customerId = recWidget.getFieldValue('custrecord_gen_widget_customer');
            if (customerId != this.getCustomerId()) {
                throw forbiddenError;
            }

            var widget = {
                color: color
            ,   size: size
            ,   shape: shape
            ,   internalid: id
            };

            console.log('widget data', JSON.stringify(widget));

            return widget;
        }
        // method to get list of widget records
    ,   list: function ()
        {
            console.log('Widget model', 'list');

            // load Saved Search, returning nlobjSearch
            var search = nlapiLoadSearch('customrecord_gen_widget',
                                         'customsearch_gen_get_all_widgets');

            var customerId = this.getCustomerId();

            var filters = [];
            filters[0] = new nlobjSearchFilter
                ('custrecord_gen_widget_customer', null, 'anyof', customerId);

            search.addFilters(filters);

            // execute Saved Search, returning nlobjSearchResultSet
            var resultSet = search.runSearch();

            var widgets = []; // declare array holding set of widgets

            // forEachResult loops through result set, passing in nlobjSearchResult
            // to the callback function
            resultSet.forEachResult(function(searchResult){

                // add to widgets array
                widgets.push({
                    color: searchResult.getValue('custrecord_gen_widget_color')
                ,   size: searchResult.getValue('custrecord_gen_widget_size')
                ,   shape: searchResult.getText('custrecord_gen_widget_shape')
                ,   internalid: searchResult.getId()                
                });

                return true; // continue iteration; required!
            });

            console.log('widget records', JSON.stringify(widgets));

            return widgets;
        }
        // method to get list of widget records via coded search
    ,   listCoded: function ()
        {
            console.log('Widget model', 'listCoded');

            var columns = [];
            columns[0] = new nlobjSearchColumn('custrecord_gen_widget_color');
            columns[1] = new nlobjSearchColumn('custrecord_gen_widget_size');
            columns[2] = new nlobjSearchColumn('custrecord_gen_widget_shape');

            var customerId = this.getCustomerId();

            var filters = [];
            filters[0] = new nlobjSearchFilter
                ('custrecord_gen_widget_customer', null, 'anyof', customerId);

            search = nlapiCreateSearch('customrecord_gen_widget', filters, columns);

            // execute Saved Search, returning nlobjSearchResultSet
            var resultSet = search.runSearch();

            var widgets = []; // declare array holding set of widgets

            // forEachResult loops through result set, passing in nlobjSearchResult
            // to the callback function
            resultSet.forEachResult(function(searchResult){

                // add to widgets array
                widgets.push({
                    color: searchResult.getValue('custrecord_gen_widget_color')
                ,   size: searchResult.getValue('custrecord_gen_widget_size')
                ,   shape: searchResult.getText('custrecord_gen_widget_shape')
                ,   internalid: searchResult.getId()                
                });

                return true; // continue iteration; required!
            });

            console.log('widget records', JSON.stringify(widgets));

            return widgets;
        }
        // method to add a widget
    ,   create: function(data) {
            console.log('Widget model', 'create');

            this.validate(data); // execution validations

            var recWidget = nlapiCreateRecord('customrecord_gen_widget');
            recWidget.setFieldValue('custrecord_gen_widget_color', data.color);
            recWidget.setFieldValue('custrecord_gen_widget_size', data.size);
            recWidget.setFieldValue('custrecord_gen_widget_shape', data.shape);

            var customerId = this.getCustomerId();
            recWidget.setFieldValue('custrecord_gen_widget_customer',customerId);

            // add widget; internal id of new widget is returned
            var internalId = nlapiSubmitRecord(recWidget);
            console.log('New widget internal id', internalId);

            data.internalid = internalId; // update response data with internal id

            return data;            
        }
        // method to update a widget
    ,   update: function(id, data) {
            console.log('Widget model', 'update');

            this.validate(data); // execution validations

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
        // method to update a widget, based on exercise 4 in module 12
    ,   updateAlt: function(id, data) {
            console.log('Widget model', 'updateAlt');

            this.validate(data); // execution validations

            var fields = [
            ,   'custrecord_gen_widget_color'
            ,   'custrecord_gen_widget_size'
            ,   'custrecord_gen_widget_shape'
            ];

            var values = [
            ,   data.color
            ,   data.size
            ,   data.shape
            ]

            nlapiSubmitField('customrecord_gen_widget', id, fields, values);

            data.internalid = id;

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
