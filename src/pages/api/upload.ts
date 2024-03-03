import type { APIRoute } from "astro";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET
});

const uploadStream = async (buffer: Uint8Array, options: { 
  folder: string 
}): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary
      .uploader
      .upload_stream(options, (error, result) => {
        if (result) return resolve(result);
        reject(error);
      }).end(buffer);
  })
};

/**
 * Handles the POST request to upload a file and return the result.
 * @param {Request} request - The incoming request object.
 * @returns {Response} - The response object containing the uploaded file details.
 */
export const POST: APIRoute = async ({ request }) => {
  // Get form data from the request
  const formData = await request.formData();
  // Get the 'file' from the form data
  const file = formData.get('file') as File;

  // If 'file' is not found, return an error response
  if (file === null) {
    return new Response('File not found', { status: 400 });
  };

  // Convert the file to an ArrayBuffer and then to a Uint8Array
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  // Upload the file as a stream to the 'pdf' folder
  const result = await uploadStream(uint8Array, {
    folder: 'pdf',
  });

  // Destructure the result to get the asset id, secure URL, and number of pages
  const {
    asset_id: id,
    secure_url: url,
    pages
  } = result;

  // Simulate delay for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return a response with the uploaded file details in JSON format
  return new Response(JSON.stringify({ 
    id, 
    url, 
    pages 
  }));
}