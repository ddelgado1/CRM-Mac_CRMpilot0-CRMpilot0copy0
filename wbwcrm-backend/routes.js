// import * as fs from 'fs';


// export const requestHandler = (req, res) => {
//     const url = req.url;
//     const method = req.method;
//     res.setHeader('Content-Type', 'text/html ');
//     if (url === '/'){
//         res.write('<html>');
//         res.write('<head><title>Enter message</title></head>');
//         res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>');
//         res.write('</html>');
//         return res.end();
//     } 
//     if (url === '/message' && method === 'POST'){
//         const body = []; // An empty array that we push an element on to to get user info
//         req.on('data', (chunk) => {
//             console.log("This is the chunk " + chunk)
//             body.push(chunk);
//         })
//         req.on('end', () => {
//             console.log('comes second')
//             const parsedBody = Buffer.concat(body).toString();
//             console.log(parsedBody + "parsedBody")
//             const message = parsedBody.split('=')[1]; //Because parsedBody looks like "message=<text>," we literally just have to brute force this by splitting
//             fs.writeFileSync('./mesage.txt', message);
//             res.statusCode = 302;
//             return res.end();
//         })
    
//     }
//     res.write('<html>');
//     res.write('<body><h1>Howdy</h1></body>');
//     res.write('</html>');
//     res.end();
// };


// // export default requestHandler;
export const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html ');
    if (url === '/'){
        res.write('<html>');
        res.write('<p>This is dummy code</p>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="user_name">Username: </input>');
        res.write('<button type="submit">Send</button>');
        res.write('</form>')
        res.write('</html>');
        console.log('hi');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            return res.end();
        });
    }
    res.write('<html>');
    res.write('<body><h1>Howdy</h1></body>');
    res.write('</html>');
    res.end();
}