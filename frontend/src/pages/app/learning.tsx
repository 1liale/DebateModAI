import { useState, useEffect } from "react";
import { TypographyH2 } from "@/components/base/Typography";
import { getAllPosts } from "@/server/resolver/blog";
import { getStrapiMedia } from "@/server/resolver/blog";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/base/Cards";
import { BlogSearch } from "@/components/blog/Search";

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Add type for props
interface LearningPageProps {
  initialPosts: any[];
  initialMeta: Meta;
}

// Modify component to accept props
export default function LearningPage({
  initialPosts: posts,
}: LearningPageProps) {
  const [filteredPosts, setFilteredPosts] = useState<any[]>(posts);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    setFilteredPosts(posts);
  }, []);

  const featuredPost = filteredPosts[0];
  const topPosts = filteredPosts.slice(1, 5);
  const remainingPosts = filteredPosts.slice(5);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex flex-col gap-8 justify-center items-center max-w-7xl mx-auto">
        <div className="w-full text-center space-y-2">
          <Badge variant="secondary">Lessons</Badge>
          <TypographyH2>Learning Resources Curated Just for You</TypographyH2>
        </div>

        <BlogSearch posts={posts} setShowSearch={setShowSearchResults} onResults={setFilteredPosts} />

        <div className="space-y-6 w-full">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No articles found matching your search.
              </p>
            </div>
          ) : (
            <>
              {!showSearchResults && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Featured post */}
                  {featuredPost && (
                    <div className="h-full">
                      <Badge variant="secondary" className="mb-3">
                        Featured
                      </Badge>
                      <BlogCard
                        title={featuredPost.attributes.title}
                        description={featuredPost.attributes.description}
                        publishedAt={featuredPost.attributes.publishedAt}
                        imageUrl={
                          getStrapiMedia(
                            featuredPost.attributes.cover.data?.attributes.url
                          ) || ""
                        }
                        href={`/app/posts/${featuredPost.attributes.slug}`}
                        variant="vertical"
                        author={
                          featuredPost.attributes.authorsBio?.data?.attributes
                            ? {
                                name: featuredPost.attributes.authorsBio.data
                                  .attributes.name,
                                avatar:
                                  getStrapiMedia(
                                    featuredPost.attributes.authorsBio.data
                                      .attributes.avatar?.data?.attributes?.url
                                  ) || undefined,
                              }
                            : undefined
                        }
                      />
                    </div>
                  )}

                  {/* Top posts */}
                  <div className="h-full">
                    <Badge variant="secondary" className="mb-3">
                      Top Content
                    </Badge>
                    <div className="grid grid-rows-4 gap-2 h-[calc(100%-2rem)]">
                      {topPosts.map((post) => (
                        <BlogCard
                          key={post.id}
                          title={post.attributes.title}
                          description={post.attributes.description}
                          publishedAt={post.attributes.publishedAt}
                          imageUrl={
                            getStrapiMedia(
                              post.attributes.cover.data?.attributes.url
                            ) || ""
                          }
                          href={`/app/posts/${post.attributes.slug}`}
                          variant="horizontal"
                          author={
                            post.attributes.authorsBio?.data?.attributes
                              ? {
                                  name: post.attributes.authorsBio.data
                                    .attributes.name,
                                  avatar:
                                    getStrapiMedia(
                                      post.attributes.authorsBio.data.attributes
                                        .avatar?.data?.attributes?.url
                                    ) || undefined,
                                }
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining posts */}
              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {(showSearchResults ? filteredPosts : remainingPosts).map(
                  (post) => (
                    <BlogCard
                      key={post.id}
                      title={post.attributes.title}
                      description={post.attributes.description}
                      publishedAt={post.attributes.publishedAt}
                      imageUrl={
                        getStrapiMedia(
                          post.attributes.cover.data?.attributes.url
                        ) || ""
                      }
                      href={`/app/posts/${post.attributes.slug}`}
                      author={
                        post.attributes.authorsBio?.data?.attributes
                          ? {
                              name: post.attributes.authorsBio.data.attributes
                                .name,
                              avatar:
                                getStrapiMedia(
                                  post.attributes.authorsBio.data.attributes
                                    .avatar?.data?.attributes?.url
                                ) || undefined,
                            }
                          : undefined
                      }
                    />
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ssr returns first page of posts
export async function getServerSideProps() {
  try {
    const response = await getAllPosts(1);

    return {
      props: {
        initialPosts: response.data,
        initialMeta: response.meta,
      },
    };
  } catch (error) {
    console.error("Error fetching initial posts:", error);
    return {
      props: {
        initialPosts: [],
        initialMeta: {
          pagination: {
            page: 1,
            pageSize: 10,
            pageCount: 0,
            total: 0,
          },
        },
      },
    };
  }
}
