export async function GET() {
  return new Response(JSON.stringify({ message: "You are authenticated!" }), { status: 200 });
}
