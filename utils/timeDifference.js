export default function timeAgo(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s ago";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "min ago";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "h ago";
  }
  if (secondsPast <= 2628000) {
    return parseInt(secondsPast / 86400) + "d ago";
  }
  if (secondsPast <= 31536000) {
    return parseInt(secondsPast / 2628000) + "mo ago";
  }
  if (secondsPast > 31536000) {
    return parseInt(secondsPast / 31536000) + "y ago";
  }
}
