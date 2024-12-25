import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const persona = searchParams.get('persona');

    if (!persona) {
        return NextResponse.json({ error: 'Persona not specified' }, { status: 400 });
    }

    try {
        // Define the prefix for persona-specific images
        const prefix = `${persona}/`; // Folder structure: persona/image1.jpeg/ persona/image2.jpeg/ persona/image3.jpeg/
        const result = await list({ prefix });

        if (!result.blobs || result.blobs.length === 0) {
            return NextResponse.json({ error: `No images found for ${persona}` }, { status: 404 });
        }

        // Extract URLs from the blobs
        const images = result.blobs.map((blob) => blob.url);

        return NextResponse.json(images);
    } catch (error) {
        console.error(`Error fetching images for ${persona}:`, error);
        return NextResponse.json({ error: `Could not load images for ${persona}` }, { status: 500 });
    }
}
