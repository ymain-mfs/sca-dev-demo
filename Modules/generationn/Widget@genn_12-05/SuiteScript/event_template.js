
// add Application object in "define" statement (both in array and parameter to function)
define('SomeData.Model', ['SC.Model', 'Application'], function (SCModel, Application)
{
    'use strict';

    // model naming convention combines model "name" and method
    Application.on('before:SomeData.method1', function (modelDefinition){
        console.log('before event', 'SomeData.method1');
    });

    return SCModel.extend({
        name: 'SomeData'

    ,   method1: function ()
        {
            return {};
        }