import { TypographyH2, TypographyLarge } from "@/components/base/Typography";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import faqIllustration from "@/public/images/faq.svg";
export default function FAQPage() {
  const faqs = [
    {
      question: "What is DebateModAI?",
      answer: "DebateModAI is an AI-powered platform designed to assist in moderating online debates and discussions. It helps maintain civil discourse, fact-check arguments, and ensure productive conversations."
    },
    {
      question: "How does DebateModAI moderate discussions?",
      answer: "DebateModAI uses advanced natural language processing to analyze comments in real-time, detecting potential violations of debate rules, logical fallacies, and uncivil behavior. It provides warnings and suggestions to help keep discussions on track."
    },
    {
      question: "Can DebateModAI fact-check arguments?",
      answer: "Yes, DebateModAI can analyze claims made during debates and cross-reference them with reliable sources to help verify factual accuracy. However, it's important to note that it serves as an assistant rather than the final authority."
    },
    {
      question: "Is DebateModAI biased?",
      answer: "DebateModAI is designed to be politically neutral and focuses on the structure and civility of debates rather than taking sides. It evaluates arguments based on logical consistency and factual accuracy rather than ideological positions."
    },
    {
      question: "Can I customize the moderation rules?",
      answer: "Yes, platform administrators can customize moderation parameters, including tolerance levels for different types of content, specific terms or phrases to flag, and the strictness of fact-checking requirements."
    },
    {
      question: "What languages does DebateModAI support?",
      answer: "Currently, DebateModAI primarily supports English, with plans to expand to other major languages in the future. We're constantly working on improving our language capabilities."
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="max-w-xl lg:flex-1">
            <TypographyH2>Frequently Asked Questions</TypographyH2>
            <TypographyLarge className="text-muted-foreground mt-3">
              Have questions? Here you'll find the answers most valued by our users, along with access to step-by-step instructions and support.
            </TypographyLarge>
          </div>
          
          <div className="hidden lg:block relative w-80 h-64 transform rotate-[6deg] transition-transform duration-300">
            <Image 
              src={faqIllustration}
              alt="Frequently Asked Questions illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <Card className="container mx-auto max-w-5xl mb-16 bg-card">
        <CardContent className="pt-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
