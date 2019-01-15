"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePort = (val) => {
    return (typeof val === 'string') ? parseInt(val) : val;
};
exports.onError = (server) => {
    return (error) => {
        let port = server.address().port;
        if (error.syscall !== 'listen')
            throw error;
        let bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
};
exports.onListening = (server) => {
    return () => {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `http://${addr.address}:${addr.port}`;
        console.log(`Listening at ${bind}...`);
    };
};
exports.handleError = (error) => {
    let errorMessage = `${error.name}: ${error.message}`;
    let env = process.env.NODE_ENV;
    if (env !== 'test' && env !== 'pipelines') {
        console.log(errorMessage);
    }
    return Promise.reject(new Error(errorMessage));
};
exports.throwError = (condition, message) => {
    if (condition) {
        throw new Error(message);
    }
};
exports.JWT_SECRET = process.env.JWT_SECRET;
