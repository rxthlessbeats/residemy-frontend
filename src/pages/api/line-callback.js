// pages/api/line-callback.js
export default async function handler(req, res) {
  const { code, state } = req.query;

  // Verify the state parameter for security
  // ...

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', `${process.env.NEXT_PUBLIC_BASE_URL}/api/line-callback`);
    params.append('client_id', process.env.NEXT_PUBLIC_LINE_CLIENT_ID);
    params.append('client_secret', process.env.LINE_CHANNEL_SECRET);

    const response = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const { access_token } = data;

    // Use the access token to fetch user data or other operations

    res.redirect('/'); // Redirect to a main page
  } catch (error) {
    console.error('Error during LINE callback:', error);
    res.redirect('/404'); // Redirect to an error 404 page
  }
}