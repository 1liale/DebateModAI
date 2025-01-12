from livekit.agents import llm, JobContext, JobProcess
from livekit.agents.pipeline import VoicePipelineAgent
from livekit.plugins import openai, silero, deepgram, google
from dotenv import load_dotenv
import os
import json

load_dotenv()

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()

class BasicAgent:
    def __init__(self, ctx: JobContext):
        # Initial context for the debate moderator
        self.initial_ctx = llm.ChatContext().append(
            role="system",
            text="""You are a debate participant. Your role is to:
            1. Present clear and logical arguments
            2. Respond thoughtfully to other participants' points
            3. Support claims with relevant examples and evidence
            4. Maintain a respectful and professional tone
            5. Be open to different perspectives while defending your position
            6. You should use short and concise responses that is suitabe for a debate setting
            7. Avoiding usage of unpronouncable punctuation, readable text only.
            
            Engage in constructive dialogue and avoid confrontational language.
            Use short and concise responses, and avoid unpronounceable punctuation.
            """
        )
        
        # Topic will be set via callback before LLM processing
        self.debate_topic = None
        
        self.agent = VoicePipelineAgent(
            vad=ctx.proc.userdata["vad"],
            stt=deepgram.STT(model="nova-2-general"),
            llm=openai.LLM(model="gpt-4o-mini"),
            tts=google.TTS(
                voice_name="en-US-Wavenet-J",
                credentials_info=json.loads(os.getenv('GOOGLE_APPLICATION_CREDENTIALS_JSON'))
            ),
            chat_ctx=self.initial_ctx,
            allow_interruptions=True,
        )

    def get_agent(self):
        return self.agent 