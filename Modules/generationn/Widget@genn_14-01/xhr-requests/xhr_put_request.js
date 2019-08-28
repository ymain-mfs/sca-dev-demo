var data = {
    color: 'Purple'
,   size: 'Extra Large'
,   shape: 3
};

var xhr = new XMLHttpRequest();

xhr.open('PUT', 'services/Widget.Service.ss?internalid=5');

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify(data));