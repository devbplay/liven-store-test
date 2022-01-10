import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import api from "../../services/api";
import styles from "./styles.module.scss";

export interface ProductProps {
	id: string;
	name: string;
	price: string;
	stock: number;
	image: string;
	createdAt: string;
}

export function ProductsList() {
	const [products, setProducts] = useState<ProductProps[]>([]);
	const { handleAddItem } = useCart();

	useEffect(() => {
		api.get("product")
			.then(response => {
				const { data } = response;

				setProducts(data);
			})
			.catch(error => {
				console.log(error);

				toast('🦄 Ops! Algo deu errado!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	}, []);

	return (
		<div className={styles.product_list_container}>
			<div className="wrap">
				<h2 className={styles.title_list}>Lista de produtos</h2>
			</div>

			<div className="wrap">
				{
					products.map(product => (
						<div className={styles.product_container} key={product.id}>
							<img src={product.image} alt={product.name} />

							<h3 className={styles.title_product}>{product.name}</h3>
							<p className={styles.price_product}>{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
								}).format(+product.price)
							}</p>

							<button type="button" className="btn add" onClick={() => handleAddItem(product.id)}>Adicionar</button>
						</div>
					))
				}
			</div>
		</div>
	)
}