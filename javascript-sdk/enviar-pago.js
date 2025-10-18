/* 🚀 Ejercicio 2: Sistema de Pagos Automatizado */

//IMPORTACIONES
import {
  Keypair,
  Horizon,
  TransactionBuilder, 
  Networks,
  Operation,
  Asset, 
  BASE_FEE, 
  Memo, 
} from "@stellar/stellar-sdk";

//CONFIGURACIÓN
/* conectamos con el servidor de Horizon de Tesnet */
const server = new Horizon.Server("https://horizon-testnet.stellar.org");
//Network passphrase (identifica la red)
const networkpassphrase = Networks.TESTNET;

const SECRET_KEY = "SXXX..."; //tu secret key(cambiar por .env)
const DESTINATARIOS = [
  {
    publicKey: "GDUGUGNQD4FI4CJURBLXKUOGF6TZ2QMJXMBSK56WEHXO7ZYY7RTMI3NJ",
    memo: "pago a cuenta 1",
  }, //cuenta 1
  {
    publicKey: "GBUJWZI6SLOHTSHKOSRLUF6V5AFLC2CG3NCTB5ZDHRQO5CE4BN2VQ3UX",
    memo: "pago a cuanta 2",
  }, //cuenta 2
  {
    publicKey: "GCVQ6EGIAFLISJ5GB4OD5AZ3VRLPEJTHT6OSZGQLRJNUCC5CTMUKFPCI",
    memo: "pago a cuenta 3",
  }, //cuenta 3
];

async function enviarPago(destino, amount, memo) {
  try {
    console.log("Iniciando el pago...");

    //paso 1: cargamos nuestra cuenta
    const sourceKeys = Keypair.fromSecret(SECRET_KEY);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    
    if (parseFloat(sourceAccount.balances[0].balance) < amount) {
      throw new Error("Balance insuficiente");
    }
    console.log(`Balance actual: ${sourceAccount.balances[0].balance} XLM`);

    //paso 2: se construye la transaccion
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkpassphrase,
    })

      .addOperation(
        Operation.payment({
          destination: destino,
          asset: Asset.native(),
          amount: amount.toString(),
        })
      )
      .addMemo(memo ? Memo.text(memo) : Memo.none())
      .setTimeout(30)
      .build();

    //paso 3: firmar
    transaction.sign(sourceKeys);

    //paso 4: enviar
    const result = await server.submitTransaction(transaction);
    console.log("¡PAGO EXITOSO!");
    console.log(`Enviaste ${amount} XLM`);
    console.log(`Destinatario ${destino}`);
    console.log(`Hash: ${result.hash}`);
    return result;
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    throw error;
  }
}

async function sistemaDePagos() {
  const monto = 2;
  for (let i = 0; i < DESTINATARIOS.length; i++) {
    const destino = DESTINATARIOS[i];
    await enviarPago(destino.publicKey, monto, destino.memo);
  }
  console.log("Todos los pagos fueron enviados con éxito.")
}

sistemaDePagos();
