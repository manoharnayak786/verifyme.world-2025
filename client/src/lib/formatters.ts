import { format, parseISO } from "date-fns";

export function formatDate(dateString: string): string {
  if (!dateString) return "N/A";
  try {
    return format(parseISO(dateString), "MMM d, yyyy");
  } catch (e) {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return "N/A";
  try {
    return format(parseISO(dateString), "MMM d, yyyy • h:mm a");
  } catch (e) {
    return dateString;
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "valid":
    case "success":
      return "bg-accent/10 text-accent border-accent/20";
    case "revoked":
    case "failed":
      return "bg-red-500/10 text-red-500 border-red-500/20"; // Using red for revoked/failed
    case "expired":
      return "bg-warning/10 text-warning border-warning/20";
    case "pending":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
}

export function getStatusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
