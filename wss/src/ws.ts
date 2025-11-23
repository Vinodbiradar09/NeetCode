import express, { json } from "express";
import WebSocket , {WebSocketServer} from "ws";
import { redis } from "../../worker/dist/consumer.js";

const app = express();
const server = app.listen(8081 , ()=>{
    console.log("websocket server is running on 8081 port");
})

const clients = new Map<string , WebSocket>();

const wss = new WebSocketServer({server});

wss.on("connection" , (ws : WebSocket , req)=>{
    ws.on("error" , (error)=>{
        console.log("error in the socket instances" ,error )
    })
    const url = new URL(req.url ?? "" , `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");
    if(!userId){
        ws.close(1008 , "userId is required");
        return;
    }
    console.log(`user is connected ${userId}`);
    clients.set(userId , ws);

    ws.on('close' , ()=>{
        clients.delete(userId);
        console.log(`user disconnected ${userId}`);
    })
    ws.on("message" , (data , isBinary)=>{
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(data , {binary : isBinary});
            }
        })
    })

    ws.send("hello from the websocket server");
})

redis.subscribe("submission-results", (err, count) => {
  if (err) console.error("Redis subscription error:", err);
  else console.log(`Subscribed to ${count} channel(s)`);
});

redis.on("message" , (channel , message)=>{
    console.log("channel and message" , channel , message);
    try {
        const parsed = JSON.parse(message);
        const {problemId, userId, res } = parsed;
        if(!userId || !res || !problemId){
            return null;
        }
        const ws = clients.get(userId);
        if(!ws || ws.readyState !== WebSocket.OPEN){
            console.log("client is not online");
            return "client is not online";
        }
        ws.send(JSON.stringify({type : "submission-result" , userId , problemId , data : res}));
    } catch (error) {
        console.log("failed to parse redis message");
    }
})
