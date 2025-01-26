import { fetchBundles } from 'bundles-manager/fetchBundles';

export async function GET() {
  fetchBundles();
  return Response.json({ message: 'Hello, World!' });
}
