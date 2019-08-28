function service (request, response){

    var Application = require('Application');

    try {

        var Widget = require('Widget.Model');

        if (request.getMethod() == 'GET') {

            var internalId = request.getParameter('internalid');
            console.log('internal id', internalId);

            // execute "get" method off Widget model to retrieve a widget        
            Application.sendContent(Widget.get(internalId));

        } else if (request.getMethod() == 'POST'){
            
            console.log('request body', request.getBody());
            var data = JSON.parse(request.getBody());

            Application.sendContent(Widget.create(data));        
        } else if (request.getMethod() == 'PUT'){

            var internalId = request.getParameter('internalid');
            console.log('internal id', internalId);
            
            console.log('request body', request.getBody());
            var data = JSON.parse(request.getBody());

            Application.sendContent(Widget.update(internalId, data));        
        }
    }
    catch (e) {
        Application.sendError(e);
    }
}