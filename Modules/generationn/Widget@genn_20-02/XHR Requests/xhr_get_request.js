var xhr = new XMLHttpRequest();

xhr.open('GET', 'services/Widget.Service.ss?internalid=1');

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
