import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export const Calendar = ({date, setDate}: {date: DateRange | undefined, setDate: (date: DateRange | undefined) => void}) => {
  return (
    <Card>
      <CardContent className="p-3">
        <ShadcnCalendar
          className={cn(
            "w-full h-full flex",
            // Selected date styling
            "[&_button[aria-selected]]:bg-purple-600 [&_button[aria-selected]]:text-white",
            "[&_button[aria-selected]:hover]:bg-purple-500 [&_button[aria-selected]:hover]:text-white",
            "[&_button[aria-selected]]:dark:bg-purple-500 [&_button[aria-selected]]:dark:text-white",
            // Remove or override the cell background
            "[&_td:has([aria-selected])]:bg-transparent",
            // Today's date styling
            "[&_.rdp-day_button.rdp-day_today]:bg-purple-100",
            "[&_.rdp-day_button.rdp-day_today]:dark:bg-purple-900/20",
            // General hover states
            "[&_.rdp-day_button:hover]:bg-purple-100",
            "[&_.rdp-day_button:hover]:dark:bg-purple-900/20",
            // Navigation buttons
            "[&_.rdp-nav_button]:hover:bg-purple-100",
            "[&_.rdp-nav_button]:dark:hover:bg-purple-900/20",
            // Month/year select
            "[&_select:focus]:bg-purple-50",
            "[&_select:focus]:dark:bg-purple-900/20",
            // Calendar head (weekday names)
            "[&_thead_th]:text-purple-600",
            "[&_thead_th]:dark:text-purple-400"
          )}
          classNames={{
            months:
              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-4 w-full flex flex-col",
            table: "w-full h-full border-collapse space-y-1",
            head_row: "",
            row: "w-full mt-2",
            button: "w-4 h-4 m-1",
          }}
          mode="range"
          selected={date}
          onSelect={setDate}
          showOutsideDays={true}
        />
      </CardContent>
    </Card>
  );
};
