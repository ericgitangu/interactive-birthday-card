'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Signature {
  name: string;
  signature: string;
  comment: string;
  createdAt: string;
}

const HomePage: React.FC = () => {
  const params = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [shareLink, setShareLink] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setShareLink(`${window.location.origin}/${params.persona}/signatures`);

    // Auto-play video
    const video = videoRef.current;
    if (video) {
      video.play();
    }

    // Fetch signatures
    const fetchSignatures = async () => {
      try {
        const response = await fetch(`/api/signatures?cardId=${params.persona}`);
        if (!response.ok) {
          throw new Error('Failed to fetch signatures');
        }
        const data = await response.json();
        setSignatures(data);
      } catch (error) {
        console.error('Error fetching signatures:', error);
      }
    };

    fetchSignatures();
  }, [params.persona]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'rowNumber',
      headerName: '#',
      width: 50,
      sortable: false,
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'signature',
      headerName: 'Signature',
      flex: 1,
      renderCell: (params) => (
        <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1em' }}>
          {params.row.name}
        </span>
      )
    },
    { field: 'comment', headerName: 'Message', flex: 2 },
    { field: 'createdAt', headerName: 'Signed At', flex: 1, type: 'string' },
  ];

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/family_birthday.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          padding: 2
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            marginBottom: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Welcome, {session?.user?.name || 'Guest'}!
        </Typography>

        <Button
          variant="contained"
          sx={{
            marginBottom: 2,
            backgroundColor: '#ff6f61',
            '&:hover': { backgroundColor: '#ff3d3d' },
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
          onClick={() => router.push(`/${params.persona}/cake`)}
        >
          Start the Celebration
        </Button>

        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          Share this link to invite others to sign {params.persona}&apos;s card:
        </Typography>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          marginBottom: 2
        }}>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: 'rgba(245, 245, 245, 0.9)',
              padding: 2,
              borderRadius: '8px',
              wordWrap: 'break-word',
              maxWidth: '80%',
              color: '#000',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {shareLink}
          </Typography>
          <IconButton
            onClick={handleCopyClick}
            sx={{
              backgroundColor: 'rgba(245, 245, 245, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(245, 245, 245, 0.7)',
              },
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="Link copied to clipboard!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: '#4CAF50',
              color: 'white',
            }
          }}
        />

        {/* Signatures Table */}
        <Box sx={{ height: 400, width: '100%', marginTop: 4, backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          <DataGrid
            rows={signatures.map((sig, index) => ({
              id: index,
              rowNumber: index + 1,
              name: sig.name,
              signature: <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.2em' }}>{sig.name}</span>,
              comment: sig.comment,
              createdAt: new Date(sig.createdAt).toLocaleString(),
            }))}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-root': {
                fontFamily: "'Roboto', sans-serif",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
