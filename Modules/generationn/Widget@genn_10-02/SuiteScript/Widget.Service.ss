function service (request, response){

    if (request.getMethod() == 'GET') {

        var internalId = request.getParameter('internalid');

        nlapiLogExecution('DEBUG', 'internal ID', internalId);

/*
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
*/



        var widgetRecord = nlapiLoadRecord('customrecord_gen_widget', internalId);
        var color = widgetRecord.getFieldValue('custrecord_gen_widget_color');
        var size = widgetRecord.getFieldValue('custrecord_gen_widget_size');
        var shape = widgetRecord.getFieldText('custrecord_gen_widget_shape');
        
        
        

        widget = {
            color: color,
            size: size,
            shape: shape,
            internalId: internalId
        };

        nlapiLogExecution('DEBUG', 'widget data', JSON.stringify(widget));

        response.setContentType('JSON');
        response.write(JSON.stringify(widget));
    }    
}