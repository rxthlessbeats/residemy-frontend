// pages/api/line-callback.js
import axios from 'axios';

export default async function handler(req, res) {
  const { code, state } = req.query;

  // Verify the state parameter for security

  try {
    const response = await axios.post('https://api.line.me/oauth2/v2.1/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.BASE_URL}/api/line-callback`,
      client_id: "2001460355",
      client_secret: process.env.LINE_CHANNEL_SECRET,
    });

    const { access_token } = response.data;

    // Use the access token to fetch user data or other operations

    res.redirect('/success'); // Redirect to a success page
  } catch (error) {
    console.error('Error during LINE callback:', error);
    res.redirect('/error'); // Redirect to an error page
  }
}
