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

    socket.on("init", (userId: string) => {
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

    socket.on("send message", (receiveUserId: string, conversationId: string, message: MessageInfoDTO) => {
        const client = clients.find((c) => c.data.userId === receiveUserId);
        if(typeof client !== "undefined"){
            client.socket.emit("have message", conversationId, message);
        }
    });

    socket.on("call video", (callerPeerId: string, receiveUserId: string) => {
        const client = clients.find((c) => c.data.userId === receiveUserId);
        const caller = clients.find((c) => c.socket.id === socket.id);
        if(typeof client !== "undefined" && typeof caller !== "undefined"){
            client.socket.emit("have video call", callerPeerId, caller.data.userId);
        }
        else{
            socket.emit("client offline");
        }
    });

    socket.on("answer video call", (answererPeerId: string, receiveUserId: string) => {
        const client = clients.find((c) => c.data.userId === receiveUserId);
        const answerer = clients.find((c) => c.socket.id === socket.id);
        if(typeof client !== "undefined" && typeof answerer !== "undefined"){
            client.socket.emit("accept video call", answererPeerId, answerer.data.userId);
        }
        else{
            socket.emit("client offline");
        }
    });
});