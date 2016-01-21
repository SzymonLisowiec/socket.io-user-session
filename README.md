# socket.io-user-session

## Fast example
###### Server-side:
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
###### Client-side:
```
var config = {
    url: 'http://mypage.com',
    port: 8222,
    cookiename: 'usersession'
};
var cookies = myCookies(); //My JavaScript library [myCookies](https://github.com/SzymonLisowiec/myCookies)
var socket = io.connect(config.url+':'+config.port, {'sync disconnect on unload': true});

var sessionId = cookies.cookieValue(cookiename);

socket.emit('check session', sessionId);
socket.on('new session', function(sessionId){
	cookies.setCookie(cookiename, sessionId);
});
```

## userSession construct
#### userSession(io, socket, sessions, callback[, sessionIdPattern]);
###### io - (Object) socket.io
###### socket - (Object) socket received after connection with client
###### sessions - (Object) sessions storage
###### callback - (Function) further actions; callback(io, socket, session, clearsocket)
###### sessionIdPattern - (String)(Optional) Random string to create sessionId;
Default sessionIdPattern:
```
Math.random().toString(16).slice(2)+(new Date()).getTime().toString()
```

## License
MIT
