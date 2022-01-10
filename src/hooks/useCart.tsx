import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useLocalStorage } from "./useLocalStorage";

interface BagProductsProps {
	id: string;
	name: string;
	price: string;
	stock: number;
	image: string;
	createdAt: string;
	qty: number;
}

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: BagProductsProps[];
  handleAddItem: (productId: string) => Promise<void>;
  handleRemoveItem: (productId: string) => void;
  handleUpdateQtyProduct: (productId: string, newQty: number) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
	const [storedCart, setStoredCart] = useLocalStorage("@liven_store_test:cart");
  const [cart, setCart] = useState<BagProductsProps[]>(storedCart ? storedCart : []);

  async function handleAddItem(productId: string) {
    try {
      const isProductInCart = cart.find(product => product.id === productId);

			const { data: product } = await api.get<BagProductsProps>(`product/${productId}`);

			if (!isProductInCart) {
				if (product.stock > 0) {
					setCart([...cart, { ...product, qty: 1 }]);
					setStoredCart([...cart, { ...product, qty: 1 }]);

					toast('🦄 Produto Adicinado!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});

					return;
				}
			} else {
				if (product.stock > 0) {
					const updatedCart = cart.map(item => item.id === productId ? {
						...item,
						qty: Number(item.qty) + 1
					} : item);

					setCart(updatedCart);
					setStoredCart(updatedCart);

					toast('🦄 Produto Atualizado!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});

					return;
				}
			}
    } catch (err) {
      console.log(err);
    }
  };

  function handleRemoveItem(productId: string) {
    try {
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
			setStoredCart(updatedCart);

			toast('🦄 Produto removido!', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
    } catch (err) {
      console.log(err);
    }
  };

  async function handleUpdateQtyProduct(productId: string, newQty: number) {
		if (newQty === 0) {
			return;
		}

    try {
      const updatedCart = cart.map(item => item.id === productId ? {
        ...item,
        qty: newQty
      } : item);
      setCart(updatedCart);
			setStoredCart(updatedCart);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, handleAddItem, handleRemoveItem, handleUpdateQtyProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
