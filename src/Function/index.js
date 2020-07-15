exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ source: 'users', event }),
      isBase64Encoded: false,
  };
};
