import logoImg from "../../assets/logo.svg";
import { BsHandbag } from "react-icons/bs";

import styles from "./styles.module.scss";

export function Header() {
	return (
		<header className={styles.header_container}>
			<div className="wrap">
				<a href="/">
					<img src={logoImg} alt="Logomarca Liven Store Test" />
				</a>

				<a href="/cart" className={styles.container_bag}>Carrinho <BsHandbag size={32} className={styles.icon_bag} /></a>
			</div>
		</header>
	);
}
