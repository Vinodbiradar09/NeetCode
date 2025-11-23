export function connectionWs(userId : string){
    const ws = new WebSocket(`ws://localhost:8081?userId=${userId}`);
    ws.onopen = ()=> console.log("wss connected");
    return ws;
}