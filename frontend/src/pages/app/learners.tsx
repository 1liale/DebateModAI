import { TypographyH2, TypographyLarge } from "@/components/base/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LearnersPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-2 mb-8">
        <TypographyH2>Learners</TypographyH2>
        <TypographyLarge className="text-muted-foreground">
          Manage and track learner progress
        </TypographyLarge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Learners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Learners content coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 