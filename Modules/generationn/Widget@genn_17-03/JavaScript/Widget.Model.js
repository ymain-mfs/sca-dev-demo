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
	});
});
