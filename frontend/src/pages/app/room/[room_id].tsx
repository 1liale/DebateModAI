import { useRouter } from 'next/router';

export default function RoomPage() {
  const router = useRouter();
  const { room_id } = router.query;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Room: {room_id}</h1>
      <p>Welcome to the room!</p>
    </div>
  );
}
