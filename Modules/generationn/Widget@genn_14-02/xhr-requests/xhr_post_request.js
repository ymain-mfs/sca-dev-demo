var data = {
    color: 'Orange'
,   size: 'Extra Small'
,   shape: 1
};

var xhr = new XMLHttpRequest();

xhr.open('POST', 'services/Widget.Service.ss');

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify(data));