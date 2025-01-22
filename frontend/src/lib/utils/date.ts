import { format } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "MMMM d, yyyy");
}; 