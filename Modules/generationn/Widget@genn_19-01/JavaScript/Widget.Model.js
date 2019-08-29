define('Widget.Model'
,	[	'Backbone'
	]
,	function (
		Backbone
	)
{
	'use strict';

	return Backbone.Model.extend(
	{
        urlRoot: 'services/Widget.Service.ss'

    ,   validation: {
            color: {required: true, msg: 'Color is required'}
        ,   size: {required: true, msg: 'Size is required'}
        ,   shape: {required: true, msg: 'Shape is required'}
        }

	});
});
