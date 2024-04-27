import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import TransferMoney from './pages/TransferMoney';
import PaymentStatus from './pages/PaymentStatus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/transfer' element={<TransferMoney />} />
        <Route path='/paymentstatus' element={<PaymentStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
