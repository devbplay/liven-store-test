import { CartProvider } from "./hooks/useCart";
import { Header } from "./components/Header";
import MyRoutes from "./routes";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header />
      <MyRoutes />
    </CartProvider>
  );
}

export default App;
