import { useCart } from "../hooks/useCart";
import { NoResults } from "../components/NoResults";
import { RiDeleteBin6Line } from "react-icons/ri";

import styles from "../styles/pages/cart.module.scss";

export function Cart() {
	const { cart, handleUpdateQtyProduct, handleRemoveItem } = useCart();

	return (
		<div className={styles.cart_container}>
			<h2>Seu carrinho</h2>

			<div className="wrap">
				{
					cart.length > 0 ? (
						cart.map(item => (
							<div className={styles.cart_list_container}>
								<img src={item.image} alt={item.name} />
	
								<h3>{item.name}</h3>

								<div className={styles.qty_container}>
									<button onClick={() => handleUpdateQtyProduct(item.id, item.qty - 1)}>-</button>
									<p>{item.qty}</p>
									<button onClick={() => handleUpdateQtyProduct(item.id, item.qty + 1)}>+</button>
								</div>
	
								<p className={styles.unitary_price}>{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
								}).format(+item.price)}</p>
	
								<p className={styles.total_price}>{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
								}).format(+item.price * item.qty)}</p>
	
								<div className={styles.removeIcon}>
									<RiDeleteBin6Line size={24} onClick={() => handleRemoveItem(item.id)} />
								</div>
							</div>
						))
					) : <NoResults />
				}
			</div>
		</div>
	)
}