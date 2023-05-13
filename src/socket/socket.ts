import { Server } from "socket.io"
import { server } from "..";
import { SocketClient } from ".";
import { MessageInfoDTO } from "../dto";

console.log("Setup socket...");
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
let clients: SocketClient[] = [];

io.on("connection", (socket) => {
    console.log("one connection to socket...");

    socket.on("init", (userId) => {
        console.log("init socket with userId: " + userId);
        const client: SocketClient = {
            socket: socket,
            data: {
                userId: userId
            }
        };
        clients.push(client);
        socket.on("disconnect", () => {
            console.log("disconnect socket with userId: " + userId);
            clients = clients.filter((c) => c.data.userId !== userId);
        })
    });

    socket.on("send message", (receiveUserId: String, conversationId: String, message: MessageInfoDTO) => {
        const client = clients.find((c) => c.data.userId === receiveUserId);
        if(typeof client !== "undefined"){
            client.socket.emit("have message", conversationId, message);
        }
    });
});