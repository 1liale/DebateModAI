export const SegmentedProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
    return (
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              index <= currentStep
                ? "bg-primary"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
    );
  };