/* 🔍 Ejercicio 3: Monitor de Balances */

//IMPORTACIONES
import { Horizon } from "@stellar/stellar-sdk";

//CONFIGURACION
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

//publickey que quieras consultar
const PUBLIC_KEY = [
  "GDUGUGNQD4FI4CJURBLXKUOGF6TZ2QMJXMBSK56WEHXO7ZYY7RTMI3NJ",
  //cuenta 1
  "GBUJWZI6SLOHTSHKOSRLUF6V5AFLC2CG3NCTB5ZDHRQO5CE4BN2VQ3UX",
  //cuenta 2
  "GCVQ6EGIAFLISJ5GB4OD5AZ3VRLPEJTHT6OSZGQLRJNUCC5CTMUKFPCI",
  //cuenta 3
];

//FUNCION PRINCIPAL
async function consultarBalanceTruslineSequenceNumber(publicKey) {
  try {
    console.log(`\nConsultando cuenta: ${publicKey.substring(0, 8)}...`);

    //cargando informacion de la cuenta...
    const cuenta = await server.loadAccount(publicKey);

    //obtenemos datos claves SequenceNumber, Trustlines, XLM
    const sequence = cuenta.sequenceNumber(); //número de secuencia actual. Contador que mantiene el orden de las transacciones en una cuenta
    const trustlines = cuenta.balances.filter(
      (b) => b.asset_type !== "native"
    ).length; //filtra(.balances) los que NO son XLM ¿cuántos activos hay?
    const xlm = cuenta.balances.find((b) => b.asset_type === "native"); //xlm disponible

    //informacion principal
    console.log(`ID cuenta: ${cuenta.id}`);
    console.log(`Sequence Number: ${sequence}`);

    //balance de xlm
    if (xlm) {
      const baseReserve = 0.5;
      const subentryReserve = cuenta.subentry_count * 0.5;
      const totalReserve = baseReserve + subentryReserve;
      const available = parseFloat(xlm.balance) - totalReserve;

      console.log(`Balance de XLM: ${xlm.balance} XLM`);
      console.log(`Bloqueado: ${totalReserve.toFixed(7)} XLM`);
      console.log(`Disponible: ${available.toFixed(7)} XLM`);
    } else {
      console.log("La cuenta NO tiene balance de XLM");
    }

    //Truslines
    console.log(`Trustline: ${trustlines}\n`);
    //Tokens externos
    if (trustlines > 0) {
      console.log("Trusline activos confiables:");
      cuenta.balances.forEach((balance, index) => {
        if (balance.asset_type !== "native") {
          console.log(`  ${index + 1}. ${balance.asset_code}`); //nombre del token(.asset_code)
          console.log(`    Balance: ${balance.balance}`); //balance del token
          console.log(`    Emisor: ${balance.asset_issuer.substring(0, 8)}...`); //quien lo emitió
        }
      });
    }
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
async function consultarPorCuentas(listaDePublickey) {
  console.log("\n=== MONITOR DE CUENTAS ===");
  for (const publicKey of listaDePublickey) {
    await consultarBalanceTruslineSequenceNumber(publicKey);
  }
}
consultarPorCuentas(PUBLIC_KEY);
