/* 🚀 Ejercicio 1: Creación Masiva de Cuentas */

import { Keypair } from "@stellar/stellar-sdk";

import fs from "fs";
const cuentas = [];

//FUNCION PRINCIPAL
async function crearCuenta() {
  console.log("Generando nuevas cuentas...");
  console.log("Generando nuevos par de llaves...");

  for (let i = 1; i <= 5; i++) {
    const pair = Keypair.random();
    cuentas.push({
      CUENTA: `${i}`,
      PUBLICKEY: pair.publicKey(),
      SECRETKEY: pair.secret(),
    });
    console.log(`Cuenta ${i} creada exitosamente :D`);
    console.log("PUBLIC KEY (puedes compartir): ");
    console.log(pair.publicKey());
    console.log("SECRET KEY (NUNCA COMPARTIR): ");
    console.log(pair.secret());

    //fondear con Friendbot
    console.log("Fondeando con Friendbot...");
    try {
      //await (detiene la ejecucion del código) espera el resultado de una promesa dentro de una funcion async
      const response = await fetch(
        `https://friendbot.stellar.org/?addr=${pair.publicKey()}`
      );
      const result = await response.json();

      if (result.successful || response.ok) {
        console.log("¡Cuenta fondeada con 10.000 XLM!");
        console.log("Transaction hash", result.hash);
      }
    } catch (error) {
      //try{codigo que puede fallar}catch(error){que hacer si falla}
      console.error("❌ ERROR AL FONDEAR:", error.message);
    }
    console.log("IMPORTANTE: guarda estas llaves en un lugar seguro");
  }
  fs.writeFileSync("cuentas.json", JSON.stringify(cuentas, null, 2));
}
crearCuenta();
