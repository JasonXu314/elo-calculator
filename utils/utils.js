export function calculateElo(eloOlda, eloOldb, aProvisional, bProvisional, score) {
	const eloNewa = eloOlda + (bProvisional ? 32 : 64) * (score - 1 / (1 + 10 ** ((eloOldb - eloOlda) / 400)));
	const eloNewb = eloOldb + (aProvisional ? 32 : 64) * (1 - score - 1 / (1 + 10 ** ((eloOlda - eloOldb) / 400)));

	return [eloNewa, eloNewb];
}
