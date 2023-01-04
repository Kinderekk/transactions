import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Transactions from './pages/Transactions/Transactions';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;
