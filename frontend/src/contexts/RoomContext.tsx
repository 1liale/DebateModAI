import { createContext, useContext, useState, useEffect } from 'react';

interface RoomContextType {
  activeRoom: string | null;
  activeUsername: string | null;
  setActiveRoom: (room: string | null) => void;
  setActiveUsername: (username: string | null) => void;
}

const RoomContext = createContext<RoomContextType | null>(null);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [activeUsername, setActiveUsername] = useState<string | null>(null);

  useEffect(() => {
    // Restore room state from localStorage on mount
    const savedRoom = localStorage.getItem('activeRoom');
    const savedUsername = localStorage.getItem('activeUsername');
    if (savedRoom) setActiveRoom(savedRoom);
    if (savedUsername) setActiveUsername(savedUsername);
  }, []);

  const handleSetActiveRoom = (room: string | null) => {
    setActiveRoom(room);
    if (room) {
      localStorage.setItem('activeRoom', room);
    } else {
      localStorage.removeItem('activeRoom');
    }
  };

  const handleSetActiveUsername = (username: string | null) => {
    setActiveUsername(username);
    if (username) {
      localStorage.setItem('activeUsername', username);
    } else {
      localStorage.removeItem('activeUsername');
    }
  };

  return (
    <RoomContext.Provider 
      value={{ 
        activeRoom, 
        activeUsername, 
        setActiveRoom: handleSetActiveRoom,
        setActiveUsername: handleSetActiveUsername
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
} 