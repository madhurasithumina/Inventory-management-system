
import './App.css';
import Header from './component/Header';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import AddInventoryItem from './component/AddItem';
import InventoryManagement from './component/UpdateItem';
import UpdateInventoryItem from './component/Itemdetails';
import AllItems from './component/Allitems';


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/add" element={<AddInventoryItem/>} />
        <Route path="/update/:id" element={<InventoryManagement/>}/>
        <Route path="/details" element={<UpdateInventoryItem/>}/>
        <Route path='/allItems' element={<AllItems/>}/>
        <Route path='/itemHome' element={<itemHome/>}/>
      </Routes>
    </Router>
  );
}
export default App;
