import { useRouter } from 'next/navigation'

// pages/api/line-login.js
export default function handler(req, res) {
    const router = useRouter();

    const clientId = "2001460355";
    const redirectUri = encodeURIComponent(`https://learn.residemy.org/auth/line-callback`);
    const state = 'randomString'; // This should be a random, unguessable string for security
    const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=profile%20openid`;
//                        `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=12345abcde&scope=openid%20email&nonce=09876xyz

    router.push(lineAuthUrl);
  }
  