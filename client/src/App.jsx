import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'
import useMediaQuery from './hooks/useMediaQuery.js'

import Desktop from './pages/Desktop';
import Touch from './pages/Touch';

function App() {
  const isDesktop = useMediaQuery('(min-width: 960px)');
  console.log(isDesktop)
  return (
    <>
      {isDesktop ? <Desktop/> : <Touch/>}
    </>
  )
}

export default App