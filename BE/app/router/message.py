import json
from typing import List
from fastapi import WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi import APIRouter

from BE.app.service.websocket_manager import ConnectionManager
from BE.app.service.message import MessageService
from BE.app.service.workspace_member import WorkspaceMemberService
from BE.app.domain.message import Message
from BE.app.schema.message.message_update_request import MessageUpdateRequest
from BE.app.schema.message.messages_response import MessageSchema, MessagesResponse

router = APIRouter()
connection = ConnectionManager()
message_service = MessageService()
workspace_member_service = WorkspaceMemberService()



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
            var workspace_id = 1;
            var tab_id = 1;
            var client_id = Date.now(); 
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:8000/ws/${workspace_id}/${tab_id}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                const payload = {
                    sender_id: "4e7e765b-5688-11f0-bb98-0242ac110002",
                    content: input.value
                }
                ws.send(JSON.stringify(payload))
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""

@router.get("/workspaces/{workspace_id}/tabs/{tab_id}/messages", response_model=MessagesResponse)
async def find_all_messages(workspace_id: int, tab_id: int) -> MessagesResponse:
    rows = await message_service.find_all_messages(tab_id)
    messages = [MessageSchema.from_row(row) for row in rows]
    return MessagesResponse(messages=messages)

@router.patch("/workspaces/{workspace_id}/tabs/{tab_id}/messages/{message_id}", status_code=204)
async def modify_message(workspace_id: int, tab_id: int, message_id: int, request: MessageUpdateRequest) -> None:
    sender_id = request.sender_id
    new_content = request.new_content
    workspace_member = workspace_member_service.get_member_by_id(sender_id)
    
    data = {
        "type": "update",
        "sender_id": sender_id,
        "nickname": workspace_member[0][3],
        "message_id": message_id,
        "new_content": new_content
    }

    await message_service.modify_message(message_id, new_content)
    await connection.broadcast(workspace_id, tab_id, data)

@router.post("/workspaces/{workspace_id}/tabs/{tab_id}/messages/{message_id}", status_code=204)
async def delete_message(workspace_id: int, tab_id: int, message_id: int) -> None:
    data = {
        "type": "delete",
        "message_id": message_id
    }

    await message_service.delete_message(message_id)
    await connection.broadcast(workspace_id, tab_id, data)

@router.get("/ws")
async def get():
    return HTMLResponse(html)

@router.websocket("/ws/{workspace_id}/{tab_id}")
async def websocket_endpoint(websocket: WebSocket, workspace_id: int, tab_id: int):
    workspace_member = None
    await connection.connect(workspace_id, tab_id, websocket)
    try:
        while True:
            raw_data = await websocket.receive_text()
            data = json.loads(raw_data)
            sender_id = data.get("sender_id")
            content = data.get("content")
            workspace_member = workspace_member_service.get_member_by_id(sender_id)
            nickname = workspace_member[0][3]
            await connection.broadcast(workspace_id, tab_id, f"#{nickname}: {content}")
            await message_service.save_message(tab_id, sender_id, content)
    except WebSocketDisconnect:
        connection.disconnect(workspace_id, tab_id, websocket)
        await connection.broadcast(workspace_id, tab_id, f"#{nickname}님이 나갔습니다.")
