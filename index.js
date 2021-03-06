var crypto = require('crypto');
module.exports = function(io, socket, sessions, callback, sessionIdPattern, sessionId, clearsocket){
    clearsocket = socket;
    sessionId = null;
    if(!sessionIdPattern)
        sessionIdPattern = Math.random().toString(16).slice(2)+(new Date()).getTime().toString();
    
    socket.on('check session', function(sessionId){
        if(sessionId && sessions[sessionId] == undefined)
            sessionId = null;

        if(sessionId){
            sessions[sessionId].sockets.push(socket.id);
        }else{
            while(sessionId == null || sessions[sessionId] != undefined){
                sessionId = crypto.createHash('sha1').update(sessionIdPattern, 'utf8').digest('hex');
            }
            sessions[sessionId] = {
                id: sessionId,
                sockets: [socket.id],
                data: {}
            };
            socket.emit('new session', sessionId);
        }
        
        socket.join(sessionId);
        socket.privemit = socket.emit;
        socket.emit = function(a, b, c, d, e){
            io.to(sessionId).emit(a, b, c, d, e);
        };
        callback(io, socket, sessions[sessionId], clearsocket);
    });
};
