from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from livekit import api
import json
from dotenv import load_dotenv
import os

load_dotenv()

LIVEKIT_API_KEY = os.getenv('LIVEKIT_API_KEY')
LIVEKIT_API_SECRET = os.getenv('LIVEKIT_API_SECRET')
LIVEKIT_WS_URL = os.getenv('LIVEKIT_WS_URL', 'ws://localhost:7880')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/create-room/{room_name}")
async def create_room(room_name: str):
    try:
        room = api.Room(
            name=room_name,
            empty_timeout=10 * 60,  # 10 minutes
            max_participants=4
        )
        return {"message": "Room created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-token/{room_name}/{participant_name}")
async def generate_token(room_name: str, participant_name: str):
    try:
        token = api.AccessToken()
        token.add_grant(api.VideoGrant(
            room_join=True,
            room=room_name,
            can_publish=True,
            can_subscribe=True
        ))
        token.identity = participant_name
        
        jwt_token = token.to_jwt()
        return {"token": jwt_token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
