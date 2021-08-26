export default function Home({isFirstTimeVisitor}) {
  return (
    <div>
      {isFirstTimeVisitor || 'first_time_visitor=true'}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context;

  const requestCookies = req.headers.cookie?.split(';')

  const isFirstTimeVisitor = requestCookies ? requestCookies.find((c) => c === 'first_time_visitor=false') : null;
  
  if (!isFirstTimeVisitor) {
    res.setHeader('Set-Cookie', ['first_time_visitor=false'])
  }
  return {
    props: {
      isFirstTimeVisitor
    }
  }
}