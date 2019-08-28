function service (request, response){

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

    response.setContentType('JSON');
    response.write(JSON.stringify(widgets));
}