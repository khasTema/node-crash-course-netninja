const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    // set header content type
    res.setHeader('Content-Type', 'text/html')

    //routing
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200 
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200 
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end()
            break;
        default:
            path += '404.html';
            res.statusCode = 404
            break 
    }


    // send HTML file

    fs.readFile(path,  (err, data) => {
        if(err) {
            console.log(err)
            res.end()
        } else {
            // res.write(data)
            // since we send only one thind we can do this directly into end
            res.end(data)
        }

    })
   
   
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on prot 3000')
})