import './App.css';
import {Routes,Route} from 'react-router-dom'
import FrontPage from './component/FrontPage'
import { Success } from './component/Success';
import { Failure } from './component/Failure';
import { Dashboard } from './component/Dashboard';
function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' element = {<FrontPage/>} />
        <Route path='/success' element = {<Success/>}/>
        <Route path='/failure' element = {<Failure/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
      </Routes>
    </div>
  );
}
export default App;