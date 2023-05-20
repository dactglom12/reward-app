import { Event } from "@typings/event";

const getAssignedEvents = (events: Event[]) =>
  events.filter((event) => !!event.date);
const getUnassignedEvents = (events: Event[]) =>
  events.filter((event) => !event.date);

const transform = (events: Event[]) =>
  events
    .filter((event) => !!event.date)
    .map((event) => ({
      allDay: true,
      start: event.date,
      title: event.title,
      end: event.date,
      entity: event,
    }));

const eventColors = [
  "#FF3E00", // vivid orange
  "#FFA700", // vivid yellow
  "#FFD900", // vivid yellowish green
  "#8F993E", // dark olive green
  "#00FFD4", // bright cyan
  "#00C6FB", // bright sky blue
  "#0065BD", // rich blue
  "#B5008F", // deep magenta
  "#F70202", // bright red
  "#FA6800", // bright orange
  "#F7B500", // bright yellow
  "#7FBA00", // vivid green
  "#1FAEFF", // vivid blue
  "#005CAF", // dark blue
  "#9B4F0F", // deep brown
  "#AF6E4D", // muted orange
  "#BFBFBF", // gray
  "#7B7B7B", // dark gray
  "#4C4C4C", // very dark gray
  "#FFFFFF", // white
  "#E5E5E5", // light gray
  "#F2C6FF", // light purple
  "#8CFC9D", // light green
  "#FFCCE5", // light pink
  "#FF1493", // deep pink
  "#00CED1", // dark turquoise
  "#FF69B4", // hot pink
  "#B22222", // firebrick
  "#4682B4", // steel blue
  "#2E8B57", // sea green
  "#FF8C00", // dark orange
  "#9932CC", // dark orchid
];

const isColorBright = (hexColor: string): boolean => {
  // Convert hex color to RGB values
  const rgb = [
    parseInt(hexColor.slice(1, 3), 16),
    parseInt(hexColor.slice(3, 5), 16),
    parseInt(hexColor.slice(5, 7), 16),
  ];
  // Calculate perceived brightness using the formula for relative luminance (Y)
  // Source: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
  const y = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  // If the perceived brightness is greater than 0.5, the color is considered bright
  return y > 0.5;
};

export {
  transform,
  getUnassignedEvents,
  getAssignedEvents,
  eventColors,
  isColorBright,
};
