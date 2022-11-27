/**
 * It takes a file, sends it to cloudinary, and returns the url of the image
 * @param {any} file - The image file that you want to upload.
 * @returns The url of the image that was uploaded to cloudinary.
 */
export async function imageUploadToCloudinary(
  file: any,
  cloudinaryAPI: string | undefined,
) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'bookstore');

  /* Sending the image to cloudinary and getting the url back. */
  const data = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryAPI}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  ).then((res) => res.json());

  return data.secure_url;
}
