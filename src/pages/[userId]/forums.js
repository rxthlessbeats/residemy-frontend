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
import { ForumCard } from 'src/sections/companies/forum-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { useState, useEffect } from 'react';

// const Forum = [
//   {
//     // id: '2569ce0d517a7f06d3ea1f24',
//     createdAt: '30/11/2023',
//     description: '2023.11.30',
//     // logo: '/assets/logos/logo-dropbox.png',
//     title: 'Enterprise ​​​Resilience Forum',
//     downloads: '594'
//   },
//   {
//     // id: 'ed2b900870ceba72d203ec15',
//     createdAt: '29/11/2023',
//     description: '2023.11.29',
//     // logo: '/assets/logos/logo-medium.png',
//     title: 'National Resilience Forum',
//     downloads: '625'
//   },
// ];

const Page = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum_list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as needed
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setForums(data);
        // console.log(forums);
      })
      .catch(error => console.error('Error fetching forums:', error));
  }, []);
  
  return (
    <>
      <Head>
        <title>
          研討會簡報
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
                  研討會簡報
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
              {forums.map((forum) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={forum.id}
                >
                  <ForumCard forum={forum} />
                </Grid>
              ))}
            </Grid>
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={1}
                size="small"
              />
            </Box> */}
          </Stack>
        </Container>
      </Box>
    </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
