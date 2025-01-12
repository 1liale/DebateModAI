import { useVoiceAssistant, BarVisualizer } from '@livekit/components-react';
import { CatVisualizer } from '@/components/CatVisualizer';

interface SimpleVoiceAssistantProps {
  custom_variant?: 'popcat' | 'bar';
}

export function SimpleVoiceAssistant({ custom_variant = 'popcat' }: SimpleVoiceAssistantProps) {
  const { state, audioTrack } = useVoiceAssistant();
  
  const catStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: 'hsl(var(--muted))',
    color: 'var(--foreground)',
  };

  const barStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className="absolute top-4 left-4 z-50 rounded-lg border-2 border-gray-200 shadow-sm w-[100px] h-[100px] overflow-hidden">
      {custom_variant === 'popcat' ? (
        <CatVisualizer 
          state={state}
          trackRef={audioTrack}
          threshold={0.1}
          style={catStyles}
        />
      ) : (
        <BarVisualizer
            state={state}
            barCount={7}
            trackRef={audioTrack}
            style={barStyles}
        />
      )}
    </div>
  );
} 