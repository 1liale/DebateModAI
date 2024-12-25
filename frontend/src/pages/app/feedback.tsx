import { TypographyH2, TypographyLarge } from "@/components/base/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-2 mb-8">
        <TypographyH2>Feedback</TypographyH2>
        <TypographyLarge className="text-muted-foreground">
          Review and manage debate feedback
        </TypographyLarge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Feedback content coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 