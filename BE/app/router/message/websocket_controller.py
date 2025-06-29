from fastapi import WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi import APIRouter

from BE.app.service.message.websocket_manager import ConnectionManager

router = APIRouter(prefix="/ws")
connection = ConnectionManager()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var client_id = Date.now()
            var channel_id = 'test1'
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:8000/ws/${client_id}?channel_id=${channel_id}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""

@router.get("/")
async def get():
    return HTMLResponse(html)

@router.websocket("/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket, 
    channel_id: str,
    client_id: int,
):
    await connection.connect(channel_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await connection.broadcast(channel_id, f"Client #{client_id}: {data}")
    except WebSocketDisconnect:
        connection.disconnect(channel_id, websocket)
        await connection.broadcast(channel_id, f"#{client_id}님이 나갔습니다.")
