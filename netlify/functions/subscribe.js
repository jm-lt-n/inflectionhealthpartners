exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body);

  const response = await fetch('https://api.beehiiv.com/v2/publications/pub_a10a2657-e4b6-4743-903e-ee2e2661a27a/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`
    },
    body: JSON.stringify({
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      utm_source: 'agency-rn-calculator',
      utm_medium: 'website',
      utm_campaign: 'rn-cost-calculator'
    })
  });

  const data = await response.json();
  console.log('Beehiiv status:', response.status);
  console.log('Beehiiv response:', JSON.stringify(data));
  
  return {
    statusCode: response.status,
    body: JSON.stringify(data)
  };
};
