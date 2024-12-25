import { TypographyH2, TypographyLarge } from "@/components/base/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog } from "lucide-react";

export default function InstructorsPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-2 mb-8">
        <TypographyH2>Instructors</TypographyH2>
        <TypographyLarge className="text-muted-foreground">
          Manage instructors and their assignments
        </TypographyLarge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Instructors content coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 