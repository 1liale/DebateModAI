import { TypographyH2, TypographyLarge } from "@/components/base/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicsPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-2 mb-8">
        <TypographyH2>Debate Topics</TypographyH2>
        <TypographyLarge className="text-muted-foreground">
          Explore and practice with various debate topics
        </TypographyLarge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Topics content coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 