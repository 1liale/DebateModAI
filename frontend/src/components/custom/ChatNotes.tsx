import { useState } from 'react'

interface Message {
  id: string
  sender: string
  text: string
  timestamp: Date
}

interface ChatNotesProps {
  onSendMessage?: (message: string) => void
  onNotesChange?: (notes: string) => void
}

export function ChatNotes({ onSendMessage = () => {}, onNotesChange = () => {} }: ChatNotesProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat')
  const [messages, setMessages] = useState<Message[]>([{
    id: '1730087644868',
    sender: 'peer',
    text: 'hello',
    timestamp: new Date()
  },
  {
    id: '1730087644869',
    sender: 'User',
    text: 'hello',
    timestamp: new Date()
  },
  {
    id: '1730087644867',
    sender: 'peer',
    text: 'hello',
    timestamp: new Date()
  }

])
  const [notes, setNotes] = useState<string>('')

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'User', // You might want to make this configurable
      text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    onSendMessage(text)
  }

  return (
    <div className="h-full bg-gray-900 border-l border-gray-700">
      <div className="flex border-b border-gray-700">
        <button
          className={`flex-1 py-3 px-4 ${
            activeTab === 'chat' ? 'bg-gray-800 text-white' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button
          className={`flex-1 py-3 px-4 ${
            activeTab === 'notes' ? 'bg-gray-800 text-white' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
      </div>

      <div className="h-[calc(100%-3.5rem)] flex flex-col">
        {activeTab === 'chat' ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex w-full items-start gap-2 ${
                    message.sender === 'User' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div 
                    className={`w-[70%] rounded-lg p-3 ${
                      message.sender === 'User' 
                        ? 'bg-gray-700' 
                        : 'bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                      <span>{message.sender}</span>
                      <span>{message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}</span>
                    </div>
                    <div className="text-white">{message.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700">
              <input
                type="text"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
                placeholder="Type a message..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage((e.target as HTMLInputElement).value)
                    ;(e.target as HTMLInputElement).value = ''
                  }
                }}
              />
            </div>
          </>
        ) : (
          <div className="h-full p-4">
            <textarea
              className="w-full h-full bg-gray-800 text-white rounded-lg p-4 resize-none"
              placeholder="Take notes here..."
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value)
                onNotesChange?.(e.target.value)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
