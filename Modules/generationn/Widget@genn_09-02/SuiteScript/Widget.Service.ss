function service (request, response){

    if (request.getMethod() == 'GET') {

        var internalId = request.getParameter('internalid');

        nlapiLogExecution('DEBUG', 'internal ID', internalId);

        var widgets = [
            {   color: 'Red'
            ,   size: 'Small'
            ,   shape: 'Circular'
            }
        ,   {   color: 'Blue'
            ,   size: 'Medium'
            ,   shape: 'Rectangular'
            }
        ]

        nlapiLogExecution('DEBUG', 'widget data', JSON.stringify(widgets));

        response.setContentType('JSON');
        response.write(JSON.stringify(widgets));
    }    
}