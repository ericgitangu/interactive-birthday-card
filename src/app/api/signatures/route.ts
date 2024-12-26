import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(request: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cardId, signature, comment } = await request.json();

    if (!cardId || !signature || !comment) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userName = session.user?.name || 'Anonymous';

    try {
        // Check for existing signatures
        const existingSignatures = await redis.lrange(`card:${cardId}:signatures`, 0, -1);
        // console.log('Checking signatures for:', userName);
        // console.log('Existing signatures:', existingSignatures);

        const hasSignedAlready = existingSignatures.some(sig => {
            // No need to parse, sig is already an object
            const name = typeof sig === 'object' && sig !== null ? (sig as { name: string }).name : '';
            // console.log('Comparing:', name, 'with:', userName);
            return name.trim().toLowerCase() === userName.trim().toLowerCase();
        });

        console.log('Has signed already:', hasSignedAlready);

        if (hasSignedAlready) {
            return NextResponse.json(
                { error: "Thank you, but we've already received your wishes!" },
                { status: 409 }
            );
        }

        const entry = {
            name: userName,
            signature,
            comment,
            createdAt: new Date().toISOString(),
        };

        await redis.rpush(`card:${cardId}:signatures`, JSON.stringify(entry));
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Error processing signature:', error);
        return NextResponse.json({ error: 'Failed to save signature' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('cardId');

    if (!cardId) {
        return NextResponse.json({ error: 'Card ID not specified' }, { status: 400 });
    }

    try {
        const signatures = await redis.lrange(`card:${cardId}:signatures`, 0, -1);

        // Parse JSON and convert createdAt to Date object
        const formattedSignatures = signatures.map((sig, index) => {
            const parsedSig = typeof sig === 'string' ? JSON.parse(sig) : sig;
            return {
                id: index,
                ...parsedSig,
                createdAt: new Date(parsedSig.createdAt) // Convert ISO string to Date object
            };
        });

        return NextResponse.json(formattedSignatures);
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ error: `Failed to load signatures for ${cardId}` }, { status: 500 });
    }
}
