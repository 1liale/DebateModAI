import * as React from 'react';
import { useMultibandTrackVolume } from '@livekit/components-react';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { useMaybeTrackRefContext } from '@livekit/components-react';
import type { AgentState } from '@livekit/components-react';

export interface CatVisualizerProps extends React.HTMLProps<HTMLDivElement> {
  state?: AgentState;
  trackRef?: TrackReferenceOrPlaceholder;
  /** Volume threshold to trigger mouth movement (0-1) */
  threshold?: number;
}

export const CatVisualizer = React.forwardRef<HTMLDivElement, CatVisualizerProps>(
  function CatVisualizer(
    { state, trackRef, threshold = 0.1, className = '', ...props }: CatVisualizerProps,
    ref,
  ) {
    const [catState, setCatState] = React.useState<'idle' | 'open'>('idle');
    let trackReference = useMaybeTrackRefContext();

    if (trackRef) {
      trackReference = trackRef;
    }

    // We'll use just one band for simple volume detection
    const volumeBands = useMultibandTrackVolume(trackReference, {
      bands: 1,
    //   smoothing: 0.9,
    });

    React.useEffect(() => {
      const volume = volumeBands[0] || 0;
      
      // Simplified threshold check for smoother transitions
      if (volume > threshold) {
        setCatState('open');
      } else {
        setCatState('idle');
      }
    }, [volumeBands, threshold]);

    return (
      <div 
        ref={ref} 
        {...props} 
        className={`cat-visualizer ${className}`}
        data-lk-va-state={state}
      >
        <img
          src={`/images/cat-${catState}.png`}
          alt={`Cat ${catState}`}
          className="w-full h-full object-contain transition-all duration-150"
        />
      </div>
    );
  },
); 