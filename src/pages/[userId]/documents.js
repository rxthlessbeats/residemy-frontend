import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
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
  {
    "id": "5e887d0b3d090c1b8f162003",
    "createdAt": subDays(subHours(now, 15), 4).getTime(),
    "name": "Research_File_865",
    "type": "pdf",
    "size": "2.9MB"
  },
  {
    "id": "5e88792be2d4cfb4bf0971d9",
    "createdAt": subDays(subHours(now, 2), 5).getTime(),
    "name": "Symphonic_Exploration_324",
    "type": "mp3",
    "size": "7.8MB"
  },
  {
    "id": "5e8877da9a65442b11551975",
    "createdAt": subDays(subHours(now, 8), 6).getTime(),
    "name": "Documentary_Summary_410",
    "type": "pdf",
    "size": "1.5MB"
  },
  {
    "id": "5e8680e60cba5019c5ca6fda",
    "createdAt": subDays(subHours(now, 1), 9).getTime(),
    "name": "Audio_Reflection_673",
    "type": "mp3",
    "size": "9.0MB"
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          我的文件
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
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  文件庫
                </Typography>
                <Stack
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
                    匯入
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    匯出
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  上傳檔案
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
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
