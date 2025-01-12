import {
  GridLayout,
  ParticipantTile,
  useTracks,
  FocusLayout
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { Track, RoomEvent } from "livekit-client";
import { Spinner } from "@/components/ui/spinner";

export const VideoConference = () => {
  const [trackReady, setTrackReady] = useState(false);
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: false },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    {
      onlySubscribed: false,
      updateOnlyOn: [RoomEvent.TrackSubscribed, RoomEvent.TrackUnsubscribed],
    }
  );

  useEffect(() => {
    // Add a small delay to ensure proper track initialization
    const timer = setTimeout(() => {
      setTrackReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      setTrackReady(false);
    };
  }, []);

  if (!trackReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100% - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
};
