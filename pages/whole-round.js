import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/WholeRound.module.css';
import { calculateElo } from '../utils/utils';

export default function WholeRound() {
	const [phase, setPhase] = useState(1);
	const [contestants, setContestants] = useState([]);
	const [name, setName] = useState('');
	const [elo, setElo] = useState(1000);
	const [provisional, setProvisional] = useState(false);
	const [contestantIndex, setContestantIndex] = useState(0);

	switch (phase) {
		case 1:
			return (
				<div className={styles.main}>
					<Head>
						<title>ELO Calculator | Contestant Input</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<h1>Input Contestants</h1>
					<div>
						<label htmlFor="name">Name: </label>
						<input id="name" value={name} onChange={(evt) => setName(evt.target.value)} placeholder="Name" />
					</div>
					<div>
						<label htmlFor="elo">ELO Rating: </label>
						<input
							id="elo"
							value={elo}
							onChange={(evt) => {
								const strElo = evt.target.value;
								const newElo = parseInt(strElo);
								setElo(strElo === '' ? '' : Number.isNaN(newElo) ? elo : newElo);
							}}
							placeholder="ELO Rating"
						/>
					</div>
					<div>
						<label htmlFor="provisional">Provisional</label>
						<input type="checkbox" checked={provisional} onChange={() => setProvisional(!provisional)} />
					</div>
					<button
						onClick={() => {
							setContestants([
								...contestants,
								{
									name,
									elo,
									provisional,
									rounds: [
										{ opponent: '', win: false, eloAfter: null },
										{ opponent: '', win: false, eloAfter: null },
										{ opponent: '', win: false, eloAfter: null }
									]
								}
							]);
							setName('');
							setElo(1000);
							setProvisional(false);
						}}>
						Add Contestant
					</button>
					<div className={styles.row}>
						{contestants.map(({ name, elo, provisional }, i) => (
							<div className={styles.card} key={i}>
								<h4>{name}</h4>
								<code>{elo}</code>
								{provisional && <p>Provisional</p>}
								<br />
								<button onClick={() => setContestants(contestants.filter((_, ci) => i !== ci))}>Remove</button>
							</div>
						))}
					</div>
					<button onClick={() => setPhase(2)}>Next Step &gt;</button>
				</div>
			);
		case 2:
			return (
				<div className={styles.main}>
					<Head>
						<title>ELO Calculator | Contestant Input</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<h1>Assign Matches</h1>
					<div className={styles.card}>
						<h3>{contestants[contestantIndex].name}</h3>
						<div>
							<h4>Round 1:</h4>
							<select
								value={contestants[contestantIndex].rounds[0].opponent}
								onChange={(evt) => {
									const newContestants = [...contestants];
									newContestants[contestantIndex].rounds[0] = { ...newContestants[contestantIndex].rounds[0], opponent: evt.target.value };
									setContestants(newContestants);
								}}>
								<option value=""></option>
								{contestants
									.filter((_, i) => i !== contestantIndex)
									.map((contestant, i) => (
										<option value={contestant.name} key={i}>
											{contestant.name}
										</option>
									))}
							</select>
							<div>
								<input
									type="checkbox"
									checked={contestants[contestantIndex].rounds[0].win}
									onChange={() => {
										const newContestants = [...contestants];
										newContestants[contestantIndex].rounds[0] = {
											...newContestants[contestantIndex].rounds[0],
											win: !contestants[contestantIndex].rounds[0].win
										};
										setContestants(newContestants);
									}}
								/>
								Win?
							</div>
						</div>
						<div>
							<h4>Round 2:</h4>
							<select
								value={contestants[contestantIndex].rounds[1].opponent}
								onChange={(evt) => {
									const newContestants = [...contestants];
									newContestants[contestantIndex].rounds[1] = { ...newContestants[contestantIndex].rounds[1], opponent: evt.target.value };
									setContestants(newContestants);
								}}>
								<option value=""></option>
								{contestants
									.filter((_, i) => i !== contestantIndex)
									.map((contestant, i) => (
										<option value={contestant.name} key={i}>
											{contestant.name}
										</option>
									))}
							</select>
							<div>
								<input
									type="checkbox"
									checked={contestants[contestantIndex].rounds[1].win}
									onChange={() => {
										const newContestants = [...contestants];
										newContestants[contestantIndex].rounds[1] = {
											...newContestants[contestantIndex].rounds[1],
											win: !contestants[contestantIndex].rounds[1].win
										};
										setContestants(newContestants);
									}}
								/>
								Win?
							</div>
						</div>
						<div>
							<h4>Round 3:</h4>
							<select
								value={contestants[contestantIndex].rounds[2].opponent}
								onChange={(evt) => {
									const newContestants = [...contestants];
									newContestants[contestantIndex].rounds[2] = { ...newContestants[contestantIndex].rounds[2], opponent: evt.target.value };
									setContestants(newContestants);
								}}>
								<option value=""></option>
								{contestants
									.filter((_, i) => i !== contestantIndex)
									.map((contestant, i) => (
										<option value={contestant.name} key={i}>
											{contestant.name}
										</option>
									))}
							</select>
							<div>
								<input
									type="checkbox"
									checked={contestants[contestantIndex].rounds[2].win}
									onChange={() => {
										const newContestants = [...contestants];
										newContestants[contestantIndex].rounds[2] = {
											...newContestants[contestantIndex].rounds[2],
											win: !contestants[contestantIndex].rounds[2].win
										};
										setContestants(newContestants);
									}}
								/>
								Win?
							</div>
						</div>
					</div>
					<div className={styles.row}>
						<button onClick={() => setContestantIndex(contestantIndex - 1)} disabled={contestantIndex === 0}>
							&lt;
						</button>
						<button onClick={() => setContestantIndex(contestantIndex + 1)} disabled={contestantIndex === contestants.length - 1}>
							&gt;
						</button>
					</div>
					<button onClick={() => setPhase(3)}>Next Step &gt;</button>
				</div>
			);
		case 3:
			return (
				<div className={styles.main}>
					<div className={styles.row}>
						{contestants.map((contestant, i) => (
							<div
								key={i}
								className={styles.card}
								onClick={() => {
									setPhase(2);
									setContestantIndex(i);
								}}>
								<h3>{contestant.name}</h3>
								<code>Starting Elo: {contestant.elo}</code>
								{contestant.provisional && <p>Provisional</p>}
								<div>
									<h4>{contestant.rounds[0].opponent}:</h4>
									{contestant.rounds[0].win ? 'Win' : 'Loss'} |{' '}
									{contestant.rounds[0].eloAfter && <code>Elo: {contestant.rounds[0].eloAfter}</code>}
								</div>
								<div>
									<h4>{contestant.rounds[1].opponent}:</h4>
									{contestant.rounds[1].win ? 'Win' : 'Loss'} |{' '}
									{contestant.rounds[1].eloAfter && <code>Elo: {contestant.rounds[1].eloAfter}</code>}
								</div>
								<div>
									<h4>{contestant.rounds[2].opponent}:</h4>
									{contestant.rounds[2].win ? 'Win' : 'Loss'} |{' '}
									{contestant.rounds[2].eloAfter && <code>Elo: {contestant.rounds[2].eloAfter}</code>}
								</div>
							</div>
						))}
					</div>
					<button
						onClick={() => {
							const newContestants = [...contestants];

							for (const round of [0, 1, 2]) {
								newContestants.forEach((contestant) => {
									const opponent = newContestants.find((c) => c.name === contestant.rounds[round].opponent);

									const elo = round === 0 ? contestant.elo : contestant.rounds[round - 1].eloAfter;
									const opponentElo = round === 0 ? opponent.elo : opponent.rounds[round - 1].eloAfter;

									const [after, oppAfter] = calculateElo(
										elo,
										opponentElo,
										contestant.provisional,
										opponent.provisional,
										contestant.rounds[round].win ? 1 : -1
									);
									contestant.rounds[round].eloAfter = Math.round(after);
									opponent.rounds[round].eloAfter = Math.round(oppAfter);
								});
							}

							setContestants(newContestants);
						}}>
						Calculate
					</button>
				</div>
			);
	}
}
