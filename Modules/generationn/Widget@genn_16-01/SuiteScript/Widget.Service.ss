function service (request, response){

    var Application = require('Application');

    try {

        if (session.isLoggedIn2()) {

            var Widget = require('Widget.Model');

            if (request.getMethod() == 'GET') {

                var internalId = request.getParameter('internalid');
                console.log('internal id', internalId);

                // Execute "get" method off Widget model to retrieve a widget when internalid is present
                // Execute "list" method off Widget model to query widgets when internalid is not present     
                Application.sendContent((internalId) ? Widget.get(internalId) : Widget.listCoded());
                //Application.sendContent((internalId) ? Widget.get(internalId) : Widget.list());

            } else if (request.getMethod() == 'POST'){
                
                console.log('request body', request.getBody());
                var data = JSON.parse(request.getBody());

                Application.sendContent(Widget.create(data));        

            } else if (request.getMethod() == 'PUT'){

                var internalId = request.getParameter('internalid');
                console.log('internal id', internalId);
                
                console.log('request body', request.getBody());
                var data = JSON.parse(request.getBody());

                //Application.sendContent(Widget.update(internalId, data));        
                Application.sendContent(Widget.updateAlt(internalId, data));        

            } else if (request.getMethod() == 'DELETE'){

                var internalId = request.getParameter('internalid');
                console.log('internal id', internalId);
                
                Application.sendContent(Widget.remove(internalId));        
            }
        } else {
            Application.sendError(unauthorizedError);
        }
    }
    catch (e) {
        Application.sendError(e);
    }
}
