import { useState, useCallback, useEffect } from "react";
import { TypographyH2 } from "@/components/base/Typography";
import { Card } from "@/components/ui/card";
import { getAllPosts } from "@/server/resolver/blog";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/server/resolver/blog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/base/Cards";

// SearchBar component
function SearchBar() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        type="text"
        placeholder="Search blogs"
        className="w-full pl-10 bg-background/50 border-border/50"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export default function LearningPage() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Categories"]);

  const categories = [
    "All Categories",
    "Videos",
    "Articles",
    "Beginner",
    "Intermediate",
    "Advanced"
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev => {
      if (category === "All Categories") {
        // If "All Categories" is clicked, toggle between all categories and none
        return prev.includes("All Categories") ? [] : categories;
      } else {
        // Remove "All Categories" when selecting specific categories
        let newCategories = prev.filter(c => c !== "All Categories");
        
        if (prev.includes(category)) {
          newCategories = newCategories.filter(c => c !== category);
        } else {
          newCategories.push(category);
        }

        // If all specific categories are selected, add "All Categories"
        if (newCategories.length === categories.length - 1) {
          return categories;
        }
        
        return newCategories;
      }
    });
  };

  const fetchPosts = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getAllPosts(page);
      
      if (page === 1) {
        setPosts(response.data);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
      }
      
      setMeta(response.meta);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const loadMorePosts = () => {
    if (meta && currentPage < meta.pagination.pageCount) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  const featuredPost = posts[0];
  const topPosts = posts.slice(1, 5); // Get next 3 posts for the right column
  const remainingPosts = posts.slice(5); // Rest of the posts for the grid below

  console.log(posts);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex flex-col gap-8 justify-center items-center max-w-7xl mx-auto">
        <div className="w-full text-center space-y-2">
          <Badge variant="secondary">Lessons</Badge>
          <TypographyH2>Learning Resources Curated Just for You</TypographyH2>
        </div>

        <SearchBar />

        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "rounded-full text-sm whitespace-nowrap",
                selectedCategories.includes(category) && "bg-accent text-accent-foreground"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {isLoading && posts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="w-8 h-8" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top section with two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column - Featured post */}
              {featuredPost && (
                <div>
                  <Badge variant="secondary" className="mb-3">Featured</Badge>
                  <BlogCard 
                    title={featuredPost.attributes.title}
                    description={featuredPost.attributes.description}
                    publishedAt={featuredPost.attributes.publishedAt}
                    imageUrl={getStrapiMedia(featuredPost.attributes.cover.data?.attributes.url) || ''}
                    href={`/app/posts/${featuredPost.attributes.slug}`}
                    variant="vertical"
                  />
                </div>
              )}

              {/* Right column - List of horizontal cards */}
              <div>
                <Badge variant="secondary" className="mb-3">Top Content</Badge>
                <div className="grid grid-rows-4 gap-2">
                  {topPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      title={post.attributes.title}
                      description={post.attributes.description}
                      publishedAt={post.attributes.publishedAt}
                      imageUrl={getStrapiMedia(post.attributes.cover.data?.attributes.url) || ''}
                      href={`/app/posts/${post.attributes.slug}`}
                      variant="horizontal"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Grid of remaining posts */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.attributes.title}
                  description={post.attributes.description}
                  publishedAt={post.attributes.publishedAt}
                  imageUrl={getStrapiMedia(post.attributes.cover.data?.attributes.url) || ''}
                  href={`/app/posts/${post.attributes.slug}`}
                />
              ))}
            </div>

            {meta && currentPage < meta.pagination.pageCount && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  onClick={loadMorePosts}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner className="w-4 h-4 mr-2" /> : null}
                  Load more articles
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 