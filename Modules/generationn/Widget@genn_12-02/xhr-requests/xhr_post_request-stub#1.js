var xhr = new XMLHttpRequest();

// Replace <SuiteScript Service File> with the file name 
// of the SuiteScript Service
xhr.open('POST', 'services/<SuiteScript Service File>');

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
