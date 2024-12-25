import Image from "next/image";
import { SecondaryCarousel } from "@/components/base/Carousel";
import { BaseCard } from "@/components/base/Cards";

interface Testimonial {
  text: string;
  author: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    text: "This platform revolutionized my debate practice routine!",
    author: "Sarah Chen",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    text: "The AI feedback helped me improve faster than traditional methods.",
    author: "Michael Rodriguez",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    text: "An invaluable tool for debate coaches and students alike.",
    author: "Dr. Emily Watson",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    text: "The real-time analysis is incredibly accurate and helpful.",
    author: "James Park",
    image: "https://i.pravatar.cc/150?img=4",
  },
];

export const TestimonialCarousel = () => {
  return (
    <div className="w-full mx-auto px-6">
      <SecondaryCarousel itemCount={testimonials.length}>
        {testimonials.map((testimonial, index) => (
          <BaseCard
            key={index}
            variant="muted"
            className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 p-4 border-2 border-gray-200 dark:border-gray-700 shadow-md h-full"
          >
            <div className="flex flex-col items-center gap-4 p-6 h-[300px] justify-center">
              <div className="h-20 w-20 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <blockquote className="text-center">
                <p className="text-lg font-medium leading-relaxed mb-2 text-gray-900 dark:text-gray-100">
                  "{testimonial.text}"
                </p>
                <footer className="text-sm text-muted-foreground font-medium">
                  {testimonial.author}
                </footer>
              </blockquote>
            </div>
          </BaseCard>
        ))}
      </SecondaryCarousel>
    </div>
  );
};
