// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'GRY'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Intender usted Mr ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 350, body: error.toString() }
  }
}

export default handler;
