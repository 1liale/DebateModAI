import { TypographyH2, TypographyLarge } from "@/components/base/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function LearningPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-2 mb-8">
        <TypographyH2>Learning Progress</TypographyH2>
        <TypographyLarge className="text-muted-foreground">
          Track your learning journey and achievements
        </TypographyLarge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Path</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Learning content coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 