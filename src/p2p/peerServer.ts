import { PeerServer } from "peer";

console.log("Peer listening on 9000...");
const peerServer = PeerServer({
    port: 9000,
    allow_discovery: true
});