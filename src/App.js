import logo from './logo.svg';
import './App.css';
import Broad from './pages/Broad';
import Broads from './pages/Broads';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout isDark={true}><Broads /></Layout>
  },
  {
    path: "/broad/:id",
    element: <Layout><Broad /></Layout>
  }
]);



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
