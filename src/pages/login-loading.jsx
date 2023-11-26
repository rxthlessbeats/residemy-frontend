import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/use-auth'; 
import Cookies from 'js-cookie';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoginLoadingPage = ({token}) => {
  const router = useRouter();
  const { signIn, isAuthenticated } = useAuth();
  const userId = Cookies.get('id');
  
  useEffect(() => {
    if (token && !isAuthenticated) {
      try {
        signIn({ id: userId, token });
        router.push(`/${userId}/`); 
      } catch (error) {
        console.error('Login error:', error);
        router.push('/auth/login'); 
      }
    };
  }, [userId, token]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies['token'];
  // const userId = req.cookies['id'];

  return { props: { token } };
}

export default LoginLoadingPage;
