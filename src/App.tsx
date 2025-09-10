import { Dashboard } from "./components/index"
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <>
      <Helmet>
        <title>DemoApp</title>
        <meta name="description" content="A broker dashboard application" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Dashboard />
    </>
  )
}

export default App