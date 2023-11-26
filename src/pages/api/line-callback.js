// pages/api/line-callback.js
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { code, state } = req.query;

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

    // Fetch the user profile using the access token
    try {
      const userProfileResponse = await fetch('https://api.line.me/v2/profile', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });

      if (!userProfileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userProfile = await userProfileResponse.json();
      console.log(userProfile);

      res.setHeader('Set-Cookie', [
        `token=${access_token}; HttpOnly; Path=/; Max-Age=${60 * 60}`,
        // `token=${access_token}; Path=/; Max-Age=${60 * 60}`,
        `id=${userProfile.userId}; Path=/;`,
        `name=${userProfile.name}; Path=/;`,
        `pic=${userProfile.pictureUrl}; Path=/;`
      ]);
      res.redirect('/login-loading');

      // const csrftoken = req.headers['X-CSRFToken']; 

      // POST to Django to Neo4j
      fetch('http://127.0.0.1:8000/store_line_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          userId: userProfile.userId,
          displayName: userProfile.displayName,
          pictureUrl: userProfile.pictureUrl
        })
      });

    } catch (error) {
      console.error('Error fetching user profile or storing data:', error);
      res.redirect('/404');
      return;
    }

  } catch (error) {
    console.error('Error during LINE callback:', error);
    res.redirect('/404');
    return;
  }
}