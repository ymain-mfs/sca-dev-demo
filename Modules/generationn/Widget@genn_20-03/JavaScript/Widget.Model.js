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
            color: {required: true, msg: _('Color is required').translate()}
        ,   size: {required: true, msg: _('Size is required').translate()}
        ,   shape: {required: true, msg: _('Shape is required').translate()}
        }

	});
});
