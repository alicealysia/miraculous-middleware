import {createTransport, TransportOptions, Transporter} from 'nodemailer'

let _transport: Transporter;
const getTransport = () => {
    if (_transport) {
        return _transport;
    }
    _transport = createTransport({
        host: 'localhost',
        secure: false,
        port: 1025,
        tls: {
            rejectUnauthorized: false
        }
    });
    return _transport;
}

export default getTransport()
