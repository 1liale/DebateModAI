import { formatDate } from '@/lib/utils/date';
import { getPostBySlug } from "@/server/resolver/blog";
import {
  TypographyH1,
  TypographyLead,
  TypographyMuted,
} from "@/components/base/Typography";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Clock, User } from "lucide-react";
import { GetServerSideProps } from "next";
import { postRenderer } from "@/lib/utils/post-renderer";

interface Block {
  type: string;
  body?: string;
  text?: string;
  level?: number;
  image?: {
    url: string;
  };
  caption?: string;
}

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    blocks: Block[];
    publishedAt: string;
    updatedAt: string;
  };
}

// Helper function to estimate read time
const calculateReadTime = (content?: Block[]) => {
  const wordsPerMinute = 200;
  let textContent = "";

  // Extract text from different block types
  content?.forEach((block) => {
    if (block.body) textContent += block.body + " ";
    if (block.text) textContent += block.text + " ";
  });

  const words = textContent.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return readTime;
};

// Add type for server-side props
interface BlogPostProps {
  post: Article | null;
}

// Convert to SSR using getServerSideProps
export const getServerSideProps: GetServerSideProps<BlogPostProps> = async ({
  params,
}) => {
  try {
    const slug = params?.slug as string;
    const post = await getPostBySlug(slug);
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      props: {
        post: null,
      },
    };
  }
};

// Update component to receive props from getServerSideProps
export default function BlogPost({ post }: BlogPostProps) {
  if (!post) return null;

  const readTime = calculateReadTime(post.attributes.blocks);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6 justify-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app/learning">Learning</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.attributes.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="space-y-4">
            {/* <Badge variant="secondary">
              {post.attributes.category?.data?.attributes?.name}
            </Badge> */}

            <TypographyH1>{post.attributes.title}</TypographyH1>

            <div className="flex flex-col gap-4 items-center">
              {/* Created and Updated */}
              <div className="flex items-center gap-6 text-muted-foreground">
                <TypographyMuted className="text-base">
                  Created: {formatDate(post.attributes.publishedAt)}
                </TypographyMuted>
                <TypographyMuted className="text-base">
                  Updated: {formatDate(post.attributes.updatedAt)}
                </TypographyMuted>
              </div>
              {/* Author and Read Time */}
              <div className="flex items-center gap-6 text-muted-foreground">
                {post.attributes.authorsBio?.data && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <TypographyMuted className="text-base">
                      {post.attributes.authorsBio.data.attributes.name}
                    </TypographyMuted>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <TypographyMuted className="text-base">{readTime} min read</TypographyMuted>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.attributes.cover?.data && (
            <div className="relative aspect-[16/9] w-3/4 mx-auto overflow-hidden rounded-lg">
              <Image
                src={post.attributes.cover.data.attributes.url}
                alt={post.attributes.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <TypographyLead>{post.attributes.description}</TypographyLead>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-5xl mx-auto">
            <div className="dark:text-gray-100 text-left">
              {post.attributes.blocks?.map((block, index) =>
                postRenderer(block, index)
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
