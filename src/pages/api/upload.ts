import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('file');

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return new Response("Hello, world!");
}