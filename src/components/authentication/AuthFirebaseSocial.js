import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AuthFirebaseSocials({ google, twitter, facebook }) {
  const { loginWithGoogle, loginWithFaceBook, loginWithTwitter } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginTwitter = async () => {
    try {
      await loginWithTwitter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        {google && <Button fullWidth size="large" color="inherit" variant="outlined" startIcon={<Icon icon={googleFill} color="#DF3E30" height={24} />} onClick={handleLoginGoogle}>
          Sign in with google 
        </Button>}
        
        {facebook && <Button fullWidth size="large" color="inherit" variant="outlined" startIcon={ <Icon icon={facebookFill} color="#1877F2" height={24} />} onClick={handleLoginFaceBook}>
          Sign in with facebook
        </Button>}
        
        {twitter && <Button fullWidth size="large" color="inherit" variant="outlined" startIcon={<Icon icon={twitterFill} color="#1C9CEA" height={24} />} onClick={handleLoginTwitter}>
          Sign in with twitter
        </Button>}
        
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
