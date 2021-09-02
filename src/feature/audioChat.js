import Peer from 'peerjs';
const peer = new Peer('pick-an-id');

const conn = peer.connect('another-peers-id');
conn.on('open', () => {
    conn.send('hi!');
});

peer.on('connection', (conn) => {
    conn.on('data', (data) => {
        // Will print 'hi!'
        console.log(data);
    });
    conn.on('open', () => {
        conn.send('hello!');
    });
});

navigator.mediaDevices.getUserMedia({ video: false, audio: true }, (stream) => {
    const call = peer.call('another-peers-id', stream);
    call.on('stream', (remoteStream) => {
        // Show stream in some <video> element.
    });
}, (err) => {
    console.error('Failed to get local stream', err);
});

peer.on('call', (call) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }, (stream) => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (remoteStream) => {
            // Show stream in some <video> element.
        });
    }, (err) => {
        console.error('Failed to get local stream', err);
    });
});