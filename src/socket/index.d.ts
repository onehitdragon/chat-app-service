import { Socket } from "socket.io"

interface SocketClientData{
    userId: string
}

interface SocketClient{
    socket: Socket,
    data: SocketClientData
}