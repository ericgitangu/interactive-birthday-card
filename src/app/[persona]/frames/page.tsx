'use client';

import React from 'react';
import DynamicFrames from '@/components/DynamicFrames';
import { useParams } from 'next/navigation';

const FramesPage: React.FC = () => {
    const params = useParams();
    return <DynamicFrames persona={params.persona as string} />;
};

export default FramesPage;
