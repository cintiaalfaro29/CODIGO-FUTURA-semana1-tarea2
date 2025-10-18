/* 🔍 Ejercicio 3: Monitor de Balances */

//IMPORTACIONES
import { Horizon } from "@stellar/stellar-sdk";

//CONFIGURACION
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

//reemplazar con la public que quieras consultar
const PUBLIC_KEY = [
  "GDUGUGNQD4FI4CJURBLXKUOGF6TZ2QMJXMBSK56WEHXO7ZYY7RTMI3NJ",
  //cuenta 1
  "GBUJWZI6SLOHTSHKOSRLUF6V5AFLC2CG3NCTB5ZDHRQO5CE4BN2VQ3UX",
  //cuenta 2
  "GCVQ6EGIAFLISJ5GB4OD5AZ3VRLPEJTHT6OSZGQLRJNUCC5CTMUKFPCI"
  //cuenta 3
];

//FUNCION PRINCIPAL
async function consultarBalanceTruslineSequenceNumber(publicKey) {
  try {
    console.log(`Consultando cuenta: ${publicKey.substring(0, 8)}...`);
    const cuenta = await server.loadAccount(publicKey);

    console.log("---> INFORMACION DE CUENTA");
    console.log(`ID cuenta: ${cuenta.id}`);
    console.log(`Sequence Number: ${cuenta.sequenceNumber()}`);

    cuenta.balances.forEach((balance, index) => {
      if (balance.asset_type === `native`) {
        console.log(`${index + 1}. XLM (Lumens):`);
        console.log(`Balance de XLM: ${balance.balance} XLM`);

        const baseReserve = 0.5;
        const subentryReserve = cuenta.subentry_count * 0.5;
        const totalReserve = baseReserve + subentryReserve;
        const available = parseFloat(balance.balance) - totalReserve;

        console.log(`Bloqueado: ${totalReserve.toFixed(7)} XLM`);
        console.log(`Disponible: ${available.toFixed(7)} XLM`);

        const trusline = cuenta.balances.filter(b => b.asset_type !== 'native').length;

        console.log(`Trusline activos: ${trusline}`);

      } else {
        console.log(`${index + 1}. ${balance.asset_code}:`);
        console.log(`Balance: ${balance.balance}`);
        console.log(`Emisor: ${balance.asset_issuer.substring(0, 8)}...`);
      }
    });
    return cuenta;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("❌ Cuenta no encontrada");
      console.log("Posibles causas:");
      console.log("- La cuenta nunca fue creada/fondeada");
      console.log("- Error de tipeo en la public key");
    } else {
      console.error("❌ Error:", error.message);
    }
    throw error;
  }
}
async function consultarPorCuentas(listaPublickey) {
  for (const publicKey of listaPublickey) {
      await consultarBalanceTruslineSequenceNumber(publicKey)
  }
}
consultarPorCuentas(PUBLIC_KEY);
