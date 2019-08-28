function service (request, response){

    if (request.getMethod() == 'GET') {

        var internalId = request.getParameter('internalid');
        nlapiLogExecution('DEBUG', 'internal id', internalId);

        // Execute "get" method off of Widget model
        var Widget = require('Widget.Model');
        var widget = Widget.get(internalId);

        response.setContentType('JSON');
        response.write(JSON.stringify(widget));
    }
}