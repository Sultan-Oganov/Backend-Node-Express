const http = require('http');

let requestCount = 0;
const server = http.createServer((request, response) => {

    if(request.url !== '/favicon.ico') {
        requestCount++;
        response.write('Back learn: ' + requestCount);
    }

    switch (request.url) {
        case '/students':
            response.write('Students');
            break;
        case '/':
        case '/courses':
            response.write('Front + Back');    
            break;
        default:
            response.write('404 - Not Found');    
    }
    response.end();
});

server.listen(3003);