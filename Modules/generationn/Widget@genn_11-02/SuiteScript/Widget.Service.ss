function service (request, response){

	var Application = require('Application');

	try {
	    if (request.getMethod() == 'GET') {
	
	        var internalId = request.getParameter('internalid');
	        console.log('internal id', internalId);
	
	        // Execute "get" method off of Widget model
	        var Widget = require('Widget.Model');
	
	        Application.sendContent(Widget.get(internalId));
	    }
	}
	catch (e) {
		Application.sendError(e);
	}
}