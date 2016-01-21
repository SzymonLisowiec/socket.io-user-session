# socket.io-user-session

## Fast example

```
var port = 8222;
var sessions = {}; //sessions storage

var io = require('socket.io')(port);
var userSession = require('socket.io-user-session');

io.on('connection', function(socket){
    userSession(io, socket, sessions, function(io, socket, session){
        
        session.data.uid = 1; //save to session data
        
        ...
        
    });
});
```

## userSession construct
### userSession(io, socket, sessions, callback[, sessionIdPattern]);
io - (Object) socket.io
socket - (Object) socket received after connection with client
sessions - (Object) sessions storage
callback - (Function) further actions; callback(io, socket, session, clearsocket)
sessionIdPattern - [Optional](String) Random string to create sessionId; Default: Math.random().toString(16).slice(2)+(new Date()).getTime().toString()

## License
MIT
