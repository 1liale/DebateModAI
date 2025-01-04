import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { 
  TypographyH1, 
  TypographyH2, 
  TypographyH3, 
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyInlineCode
} from "@/components/base/Typography";

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  return (
    <section className="rich-text py-6">
      <Markdown 
        remarkPlugins={[remarkGfm, remarkBreaks]} 
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => <TypographyH1 className="mb-6">{children}</TypographyH1>,
          h2: ({ children }) => <TypographyH2 className="mb-4 mt-8">{children}</TypographyH2>,
          h3: ({ children }) => <TypographyH3 className="mb-4 mt-6">{children}</TypographyH3>,
          h4: ({ children }) => <TypographyH4 className="mb-3 mt-6">{children}</TypographyH4>,
          p: ({ children }) => <TypographyP className="mb-4">{children}</TypographyP>,
          blockquote: ({ children }) => <TypographyBlockquote className="my-6">{children}</TypographyBlockquote>,
          code: ({ children }) => <TypographyInlineCode>{children}</TypographyInlineCode>,
        }}
      >
        {data.body}
      </Markdown>
    </section>
  );
}