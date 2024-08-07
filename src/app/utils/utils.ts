export function epochToDate(epoch: number): string {
  // Create a new Date object using the epoch value
  const date = new Date(epoch * 1000);

  // Format the date to a readable string
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  return formattedDate;
}

export function getCurrentDateTime(): string {
  const now = new Date();

  return now.toISOString();
}

export function timeAgo(dateTimeString: string): string {
  const givenDateTime = new Date(dateTimeString);
  const currentDateTime = new Date();
  const differenceInMilliseconds =
    currentDateTime.getTime() - givenDateTime.getTime();

  const minutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
}
