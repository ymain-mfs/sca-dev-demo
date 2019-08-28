var xhr = new XMLHttpRequest();

// Replace <SuiteScript Service File> with the file name 
// of the SuiteScript Service
xhr.open('DELETE', 'services/Widget.Service.ss?internalid=4');

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();