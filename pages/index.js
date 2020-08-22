import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
	const [p1, setP1] = useState({ name: '', elo: 1000, provisional: false });
	const [p2, setP2] = useState({ name: '', elo: 1000, provisional: false });
	const [winner, setWinner] = useState('p1');
	const [result, setResult] = useState(null);

	return (
		<div className={styles.main}>
			<Head>
				<title>ELO Calculator</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.row}>
				<div className={styles.card}>
					<div>
						<label htmlFor="name-1">Name for P1</label>
						<br />
						<input type="text" id="name-1" placeholder="Name" onChange={(evt) => setP1({ name: evt.target.value, elo: p1.elo })} value={p1.name} />
					</div>
					<div>
						<label htmlFor="name-1">ELO Rating for P1</label>
						<br />
						<input
							type="text"
							id="elo-1"
							placeholder="ELO Rating"
							onChange={(evt) => {
								const strElo = evt.target.value;
								const elo = parseInt(strElo);
								setP1({ name: p1.name, elo: strElo === '' ? '' : Number.isNaN(elo) ? p1.elo : elo });
							}}
							value={p1.elo}
						/>
					</div>
					<div>
						<label htmlFor="winner-1">Winner</label>
						<input type="checkbox" id="winner-1" checked={winner === 'p1'} onChange={() => setWinner(winner === 'p1' ? 'p2' : 'p1')} />
						<label htmlFor="provisional-1">Provisional?</label>
						<input type="checkbox" id="provisional-1" checked={p1.provisional} onChange={() => setP1({ ...p1, provisional: !p1.provisional })} />
					</div>
				</div>
				<div className={styles.card}>
					<div>
						<label htmlFor="name-2">Name for P2</label>
						<br />
						<input type="text" id="name-2" placeholder="Name" onChange={(evt) => setP2({ name: evt.target.value, elo: p2.elo })} value={p2.name} />
					</div>
					<div>
						<label htmlFor="name-2">ELO Rating for P2</label>
						<br />
						<input
							type="text"
							id="elo-2"
							placeholder="ELO Rating"
							onChange={(evt) => {
								const strElo = evt.target.value;
								const elo = parseInt(strElo);
								setP2({ name: p2.name, elo: strElo === '' ? '' : Number.isNaN(elo) ? p2.elo : elo });
							}}
							value={p2.elo}
						/>
					</div>
					<div>
						<label htmlFor="winner-2">Winner</label>
						<input type="checkbox" id="winner-2" checked={winner === 'p2'} onChange={() => setWinner(winner === 'p2' ? 'p1' : 'p2')} />
						<label htmlFor="provisional-2">Provisional?</label>
						<input type="checkbox" id="provisional-2" checked={p2.provisional} onChange={() => setP2({ ...p2, provisional: !p2.provisional })} />
					</div>
				</div>
			</div>
			<div className={styles.center}>
				<button
					onClick={() => {
						const eloOlda = p1.elo;
						const score = winner === 'p1' ? 1 : 0;
						const eloOldb = p2.elo;
						const eloNewa = eloOlda + (p1.provisional ? 32 : 64) * (score - 1 / (1 + 10 ** ((eloOldb - eloOlda) / 400)));
						const eloNewb = eloOldb + (p2.provisional ? 32 : 64) * (1 - score - 1 / (1 + 10 ** ((eloOlda - eloOldb) / 400)));

						setResult([eloNewa, eloNewb]);
					}}>
					{!result ? 'Calculate' : 'Recalculate'}
				</button>
				{result && (
					<div>
						<div>
							<h4>{p1.name}:</h4>
							{result[0]}
						</div>
						<div>
							<h4>{p2.name}:</h4>
							{result[1]}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
