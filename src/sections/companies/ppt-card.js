import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
// import Link from 'next/link';
import { useRouter } from 'next/router';

export const PPTCard = (props) => {
  const { ppt, forumTitle } = props;
  const router = useRouter();
  const { userId } = router.query;

  const recordClick = async () => {
    // Make an API call to record the click
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/record-click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pptId: ppt.id,
        }),
      });
    } catch (error) {
      console.error('Error recording click:', error);
    }
  };

  const handleClick = () => {
    recordClick();
    router.push({
      pathname: `/${userId}/ppts/${ppt.id}`,
      query: { title: ppt.title, doc_url: ppt.document_url, forumTitle: forumTitle },
    });
  };

  return (
    <div onClick={handleClick} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'filter 0.2s', 
          '&:hover': {
            filter: 'brightness(0.95)', 
          },
          cursor: 'pointer',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
            }}
          >
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_URL}${ppt.snapshot_url}`}
              variant="square"
              sx={{
                width: 320, 
                height: 180, 
              }}
            />
          </Box>
          <Typography
            align="center"
            gutterBottom
            variant="h5"
          >
            {ppt.title}
          </Typography>
          {/* <Typography
            align="center"
            variant="body1"
          >
            {ppt.description}
          </Typography> */}
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <ClockIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
            >
              {ppt.upload_time}
            </Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <VisibilityIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
            >
              {ppt.click_count} 
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

PPTCard.propTypes = {
  ppt: PropTypes.object.isRequired
};
