import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
// import Link from 'next/link';
import { useRouter } from 'next/router';

export const ForumCard = (props) => {
  const { forum } = props;
  const router = useRouter();
  const { userId } = router.query;

  const recordClick = async () => {
    // Make an API call to record the click
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum-record-click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          forumId: forum.id,
        }),
      });
    } catch (error) {
      console.error('Error recording click:', error);
    }
  };

  const handleClick = () => {
    recordClick();
    router.push({
      pathname: `/${userId}/forums/${forum.id}`,
      query: { title: forum.title, forumDescription: forum.description },
    });
  };

  return (
    <div onClick={handleClick} style={{ textDecoration: 'none' }} >
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
              src={`${process.env.NEXT_PUBLIC_API_URL}${forum.logo_url}`}
              variant="square"
            />
          </Box>
          <Typography
            align="center"
            gutterBottom
            variant="h5"
          >
            {forum.title}
          </Typography>
          {/* <Typography
            align="center"
            variant="body1"
          >
            {forum.description}
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
              Uploaded at {forum.upload_time}
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
              {forum.click_count} 
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

ForumCard.propTypes = {
  forum: PropTypes.object.isRequired
};