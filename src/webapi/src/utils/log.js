export const log = (...args) => {
    const newLogData = Array.prototype.map
        .call(args, function (msg) {
            if (msg instanceof Error) {
                msg = 'Error: ' + msg.message;
            } else if (typeof msg !== 'string') {
                msg = JSON.stringify(msg, null, 2);
            }
            return msg + '\r\n';
        })
        .reduce((c, n) => c + n, '');

    console.log(newLogData);
};
