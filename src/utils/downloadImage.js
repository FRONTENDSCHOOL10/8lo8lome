export async function downloadImage(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}
