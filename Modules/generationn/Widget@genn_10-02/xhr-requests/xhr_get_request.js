var xhr = new XMLHttpRequest();

// Replace <SuiteScript Service File> with the file name 
// of the SuiteScript Service
xhr.open('GET', 'services/Widget.Service.ss?internalid=77');

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();