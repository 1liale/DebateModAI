import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import Fuse from 'fuse.js';

interface SearchBarProps {
  posts: any[];
  setShowSearch: (isShow: boolean) => void;
  onResults: (results: any[]) => void;
}

export function BlogSearch({ posts, setShowSearch, onResults }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebounce(searchTerm, 300);

  const handleSearch = useCallback((term: string) => {
    if (!term.trim()) {
      onResults(posts);
      return;
    }

    const fuseOptions = {
      keys: [
        { name: 'attributes.title', weight: 0.6 },
        { name: 'attributes.description', weight: 0.3 },
        { name: 'attributes.authorsBio.data.attributes.name', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 3,
      ignoreLocation: true,
      findAllMatches: false,
      useExtendedSearch: false,
      distance: 100,
    };

    const fuse = new Fuse(posts, fuseOptions);
    const searchResults = fuse.search(term);
    const filteredResults = searchResults.map(result => result.item);
    onResults(filteredResults);
  }, [posts, onResults]);

  useEffect(() => {
    setShowSearch(debouncedTerm !== "");
    handleSearch(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs"
        className="w-full pl-10 bg-background/50 border-border/50"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
} 