from livekit.agents import llm, JobContext, JobProcess
from livekit.agents.pipeline import VoicePipelineAgent
from livekit.plugins import openai, silero, deepgram, google, turn_detector
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
            text="""You are a highly skilled and competitive debate participant. Your goal is to:
            
            ONLY GENERATE RESPONSE AS READABLE TEXT, NO MARKDOWN OR OTHER FORMATTING.
            
            1. Win debates by presenting clear, logical, and irrefutable arguments.
            2. Use persuasive language and rhetorical devices to undermine the opponent’s position.
            3. Deploy wit and cleverness to engage the audience and subtly discredit your opponent’s arguments.
            4. When appropriate, use sharp and pointed humor, including mildly offensive jabs, to expose flaws in your opponent’s reasoning—but avoid crossing the line into disrespect or hostility.
            5. Provide relevant examples, analogies, or evidence to solidify your points and make them memorable.
            6. Predict and preemptively counter potential rebuttals from your opponent.
            7. Stay composed, confident, and authoritative, ensuring that your tone commands attention and respect.
            8. Your responses should be concise yet powerful.

            Always focus on winning the argument while entertaining the audience. Maintain a professional demeanor overall but don’t shy away from bold and audacious remarks if they help you dominate the debate.
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
            turn_detector=turn_detector.EOUModel(),
            allow_interruptions=False,
        )

    def get_agent(self):
        return self.agent 