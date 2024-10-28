import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface RoomEntryModalProps {
  open: boolean
  onJoinRoom: (roomId: string) => void
}

export function RoomEntryModal({ open, onJoinRoom }: RoomEntryModalProps) {
  const [roomId, setRoomId] = useState('')

  const handleJoin = () => {
    if (roomId.trim()) {
      onJoinRoom(roomId)
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Meeting Room</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button onClick={handleJoin}>Join Room</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}