import { useRouter } from 'next/router';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {
    Box,
    Button,
    Container,
    Pagination,
    Stack,
    SvgIcon,
    Typography,
    Paper,
    Card,
    CardContent,
    Divider,
    Unstable_Grid2 as Grid
} from '@mui/material';

import { useState, useRef, useEffect } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import { alpha } from '@mui/material/styles';
import { neutral } from '@/theme/colors';
import DownloadIcon from '@mui/icons-material/Download';

import { Document, Page as PdfPage, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

const Page = () => {
  const router = useRouter();
  const { pptId, doc_url, title, forumTitle, } = router.query;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // const containerRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function sanitizeFilename(text) {
    return text
      .toString() 
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '') 
      .replace(/[^a-z0-9_]/gi, '_') 
      .replace(/\s+/g, '_') 
      .replace(/_{2,}/g, '_') 
      .replace(/^_+|_+$/g, ''); 
  }

  const pdfViewerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      pdfViewerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setFullScreen(true);
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      // This function will be called when fullscreen mode is entered or exited.
      // The document.fullscreenElement will be null if exited fullscreen.
      if (!document.fullscreenElement) {
        setFullScreen(false); // Ensure state is updated when exiting full screen
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <>
      <Head>
        <title>研討會簡報 - {title}</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">{forumTitle} - {title}</Typography>
            </Stack>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderColor: "darkdivider" }} variant="outlined">
              <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: '0 !important' }}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1,  backgroundColor: alpha(neutral[900], 0.005), }}>
                  <Button startIcon={<FullscreenIcon />} color="primary" onClick={toggleFullscreen}>
                    Fullscreen
                  </Button>
                  <Button startIcon={<DownloadIcon />} color="primary" onClick={() => {
                    const link = document.createElement('a');
                    link.href = `${process.env.NEXT_PUBLIC_API_URL}${doc_url}`;
                    link.setAttribute('download', `${sanitizeFilename(forumTitle + '_' + title)}.pdf`); 
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}>
                    Download
                  </Button>
                </Box>
                <Divider sx={{ borderColor: "divider" }}/>
                <Box 
                  ref={pdfViewerRef} 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'scroll', 
                    backgroundColor: alpha(neutral[900], 0.03), 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    maxHeight: '70vh'}}>
                  <Document file={`${process.env.NEXT_PUBLIC_API_URL}${doc_url}`} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from({ length: numPages }, (_, index) => (
                      <Paper key={index} elevation={2} sx={{ my: 2, width: 'auto', }}>
                        <PdfPage 
                          pageNumber={index + 1} 
                          scale={0.9} 
                          width={fullScreen ? window.innerWidth : undefined}/>
                      </Paper>
                    ))}
                  </Document>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;