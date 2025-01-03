import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselProps {
  children: React.ReactNode;
  itemCount: number;
  showControls?: boolean;
  className?: string;
}

export const PrimaryCarousel = ({
  children,
  itemCount,
  showControls = true,
  className = "",
}: CarouselProps) => {
  return (
    <div className={`relative px-4 ${className}`}>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {React.Children.map(children, (child) => (
            <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && itemCount > 3 && (
          <>
            <CarouselPrevious className="hidden md:flex ml-3 w-8 h-8" />
            <CarouselNext className="hidden md:flex mr-3 w-8 h-8" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export const SecondaryCarousel = ({
  children,
  itemCount,
  showControls = true,
  className = "",
}: CarouselProps) => {
  return (
    <div className={`relative ${className}`}>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent className="flex gap-3">
          {React.Children.map(children, (child) => (
            <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && itemCount > 3 && (
          <>
            <CarouselPrevious className="hidden md:flex ml-3 w-8 h-8" />
            <CarouselNext className="hidden md:flex mr-3 w-8 h-8" />
          </>
        )}
      </Carousel>
    </div>
  );
};
