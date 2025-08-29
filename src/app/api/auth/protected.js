export default async function handler(request, response) {
    const token = request.cookies['authentication'];

    return res.json({ data: 'secret stuff' });
}