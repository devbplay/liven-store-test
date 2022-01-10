import Lottie from "lottie-react-web";
import animation from "../../assets/animation.json";

import styles from "./styles.module.scss";

export function NoResults() {
	return (
		<div className={styles.no_results_container}>
			<div className="wrap">
				<h2>Nada por aqui...</h2>

				<Lottie
					options={{
						animationData: animation,
					}}
					width={500}
				/>
			</div>
		</div>
	)
}