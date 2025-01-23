export default function(dateString: string) : string {
  const dateObject: Date = new Date(dateString)
  // Return in YYYY-MM-DD HH:MM format
  return dateObject.toISOString().slice(0, 16).replace('T', ' ')
}