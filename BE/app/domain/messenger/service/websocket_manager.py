from fastapi import WebSocket
from typing import Dict, List

class ConnectionManager:
    def __init__(self):
        self.activate_connections: Dict[str, List[WebSocket]] = {}
    
    async def connect(self, channel_id: str, websocket: WebSocket):
        await websocket.accept()
        if channel_id not in self.activate_connections:
            self.activate_connections[channel_id] = []
        self.activate_connections[channel_id].append(websocket)
    
    def disconnect(self, channel_id: str, websocket: WebSocket):
        self.activate_connections[channel_id].remove(websocket)
        if not self.activate_connections[channel_id]:
            del self.activate_connections[channel_id]
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
    
    async def broadcast(self, channel_id: str, message: str):
        for connection in self.activate_connections.get(channel_id, []):
            await connection.send_text(message)