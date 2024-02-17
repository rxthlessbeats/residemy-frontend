import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PPTCard } from 'src/sections/companies/ppt-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Page = () => {
  const [ppts, setPpts] = useState([]);
  const router = useRouter();
  const { id, title, forumDescription } = router.query;

  useEffect(() => {
    // Fetch the PPTs when the component mounts and whenever 'id' changes
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forums/${id}/documents/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setPpts(data);
        })
        .catch((error) => {
          console.error('Error fetching PPTs:', error);
        });
    }
  }, [id, title]);

  return (
    <>
      <Head>
        <title>
          研討會 - {title}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  研討會 - {title}
                </Typography>
                <Typography variant="body1">
                  {forumDescription}
                </Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            <CompaniesSearch />
            <Grid
              container
              spacing={3}
            >
              {ppts.map((ppt) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={ppt.id}
                >
                  <PPTCard 
                    ppt={ppt} 
                    forumTitle={title}
                  />
                </Grid>
              ))}
            </Grid>
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

