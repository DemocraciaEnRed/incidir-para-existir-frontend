export default function(number: number) : string {
  if (number < 10) return `0000${number}`
  if (number < 100) return `000${number}`
  if (number < 1000) return `00${number}`
  if (number < 10000) return `0${number}`
  return number.toString()
}
