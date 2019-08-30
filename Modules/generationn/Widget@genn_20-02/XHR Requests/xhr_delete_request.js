var xhr = new XMLHttpRequest();

xhr.open('DELETE', 'services/Widget.Service.ss?internalid=4');

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
