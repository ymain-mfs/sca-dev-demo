function service (request, response){

    // gain access to methods on Application object
    var Application = require('Application');

    try {
        if (request.getMethod() == 'GET') {
       
            // replace with object to send to frontend
            Application.sendContent({});
        }
    }
    catch (e) {
        // exceptions handled uniformly through Application object
        Application.sendError(e);
    }
}