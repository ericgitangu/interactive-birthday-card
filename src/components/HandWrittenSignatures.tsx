import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface SignatureData {
    name: string;
    signature: string;
    comment: string;
    createdAt: string;
}

const HandwrittenSignatures: React.FC<{ cardId: string }> = ({ cardId }) => {
    const [signatures, setSignatures] = useState<SignatureData[]>([]);

    useEffect(() => {
        const fetchSignatures = async () => {
            const res = await fetch(`/api/signatures?cardId=${cardId}`);
            const data = await res.json();
            setSignatures(data);
        };

        fetchSignatures();
    }, [cardId]);

    return (
        <Box>
            {signatures.map((sig, idx) => (
                <Box
                    key={idx}
                    sx={{
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: '1.5rem',
                        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                        marginBottom: 2,
                    }}
                >
                    {`Signed by: ${sig.name}`}
                </Box>
            ))}
        </Box>
    );
};

export default HandwrittenSignatures;
