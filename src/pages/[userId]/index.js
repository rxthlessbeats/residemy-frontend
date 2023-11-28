import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import Cookies from 'js-cookie';

const now = new Date();

const Page = () => {
  const userId = Cookies.get('id');

  return (
  <>
    <Head>
      <title>
        我的韌學堂總覽
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
        <div>
          <Typography variant="h4">
            韌學堂總覽
          </Typography>
        </div>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                // {
                //   name: 'Last year',
                //   data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                // }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['PDF', 'AUDIO', 'VIDEO']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: '5e887ac47eed253091be10cb',
                  createdAt: subDays(subHours(now, 7), 1).getTime(),
                  name: 'UNISON_analysis_to_model_and_reduce_step',
                  type: 'pdf',
                  size: '8.9MB'
                },
                {
                  "id": "5e887b209c28ac3dd97f6db5",
                  "createdAt": subDays(subHours(now, 1), 2).getTime(),
                  "name": "Melodic_Tune_238",
                  "type": "mp3",
                  "size": "5.2MB"
                },
                {
                  "id": "5e887b7602bdbc4dbb234b27",
                  "createdAt": subDays(subHours(now, 4), 2).getTime(),
                  "name": "Data_Insight_764",
                  "type": "pdf",
                  "size": "3.7MB"
                },
                {
                  "id": "5e86809283e28b96d2d38537",
                  "createdAt": subDays(subHours(now, 11), 2).getTime(),
                  "name": "Rhythmic_Journey_591",
                  "type": "mp3",
                  "size": "8.1MB"
                },
                {
                  "id": "5e86805e2bafd54f66cc95c3",
                  "createdAt": subDays(subHours(now, 7), 3).getTime(),
                  "name": "Project_Overview_302",
                  "type": "pdf",
                  "size": "4.4MB"
                },
                {
                  "id": "5e887a1fbefd7938eea9c981",
                  "createdAt": subDays(subHours(now, 5), 4).getTime(),
                  "name": "Harmonic_Series_489",
                  "type": "mp3",
                  "size": "6.3MB"
                },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
        </Stack>
      </Container>
    </Box>
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
