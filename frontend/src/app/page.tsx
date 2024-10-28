'use client'

import { useState } from 'react'
import { RoomEntryModal } from '@/components/custom/RoomEntryModal'
import { VideoConference } from '@/components/custom/VideoConference'

export default function Home() {
  const [roomId, setRoomId] = useState<string | null>(null)

  const handleJoinRoom = (id: string) => {
    setRoomId(id)
  }

  const handleLeaveRoom = () => {
    setRoomId(null)
  }

  return (
    <main>
      <RoomEntryModal 
        open={!roomId} 
        onJoinRoom={handleJoinRoom} 
      />
      {roomId && (
        <VideoConference 
          roomId={roomId}
          onLeaveRoom={handleLeaveRoom}
        />
      )}
    </main>
  )
}