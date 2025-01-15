import asyncio
import logging
from dotenv import load_dotenv
from livekit import rtc
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    WorkerOptions,
    cli,
    metrics,
)
from voice_agent import BasicAgent, prewarm

load_dotenv()
logger = logging.getLogger("debate-agent")


async def entrypoint(ctx: JobContext):
    # Create debate agent instance
    debate = BasicAgent(ctx)
    agent = debate.get_agent()

    logger.info(f"connecting to room {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    # wait for the first participant to connect
    participant = await ctx.wait_for_participant()
    logger.info(f"starting debate moderator for participant {participant.identity}")

    agent.start(ctx.room, participant)

    usage_collector = metrics.UsageCollector()

    @agent.on("metrics_collected")
    def _on_metrics_collected(mtrcs: metrics.AgentMetrics):
        metrics.log_metrics(mtrcs)
        usage_collector.collect(mtrcs)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"\nUsage: ${summary}\n")

    ctx.add_shutdown_callback(log_usage)

    # listen to incoming chat messages
    chat = rtc.ChatManager(ctx.room)

    async def answer_from_text(txt: str):
        chat_ctx = agent.chat_ctx.copy()
        chat_ctx.append(role="user", text=txt)
        stream = agent.llm.chat(chat_ctx=chat_ctx)
        await agent.say(stream)

    @chat.on("message_received")
    def on_chat_received(msg: rtc.ChatMessage):
        if msg.message:
            asyncio.create_task(answer_from_text(msg.message))

    logger.info(f"Debate topic: {ctx.room}")
    await agent.say(
        f"Welcome to your freestyle debate practice session. I will be your debate partner. The topic for today is {ctx.room.metadata}. To start the debate, select your side and click the 'Start' button below.", allow_interruptions=False
    )

    @ctx.room.on("participant_disconnected")
    async def on_participant_disconnected(participant):
        # Check if there are any human participants left
        human_participants = [p for p in ctx.room.participants.values() if not p.is_agent]
        if not human_participants:
            logger.info("All human participants have left, closing room")
            await ctx.room.close()


if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
        ),
    )
