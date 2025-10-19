# 📝 SEMANA 1 TAREA CLASE 2 - FUNDAMENTOS DE PROGRAMACIÓN STELLAR

## 📚 REQUISITOS

- **Node.js** 22.20.0 o superior 
- **npm** 
- **Cuenta en Stellar Testnet** 

### 🎓 Objetivos Principales
- **Consolidar** los conocimientos de JavaScript + Stellar SDK
- **Ganar confianza** trabajando con transacciones blockchain
- **Prepararte** para el desafío de Smart Contracts en Rust
- **Desarrollar muscle memory** con los patrones esenciales de Stellar

## 📂 EJERCICIOS DESARROLLADOS

### 🚀 Ejercicio 1: Creación Masiva de Cuentas
**Archivo:** `crear-cuenta.js`  
**Objetivo:** Modificar el script para crear 5 cuentas automáticamente

**Requisitos:**
- Usar un bucle `for` para generar 5 keypairs
- Cada cuenta debe ser fondeada con Friendbot
- Mostrar en consola: public key, secret key y balance inicial de cada una
- Guardar toda la información en un array

### 🚀 Ejercicio 2: Sistema de Pagos Automatizado
**Archivo:** `cenviar-pago.js`  
**Objetivo:** Crear un sistema que envíe pagos a múltiples destinos

**Requisitos:**
- Enviar 2 XLM a 3 cuentas diferentes en una sola ejecución
- Cada pago debe tener un memo único identificando el número de transacción
- Verificar que cada transacción fue exitosa antes de proceder con la siguiente
- Mostrar el hash de cada transacción para seguimiento

### 🔍 Ejercicio 3: Monitor de Balances
**Archivo:** `consultar-balance.js`  
**Objetivo:** Desarrollar un monitor que verifique balances de múltiples cuentas

**Requisitos:**
- Aceptar un array de public keys como entrada
- Mostrar para cada cuenta:
  - Balance de XLM
  - Número de trustlines activos
  - Sequence number actual
- Formatear la salida de manera legible

## 📚 RECURSOS ADICIONALES

### Documentación técnica

- **Stellar SDK JS:** https://stellar.github.io/js-stellar-sdk/
- **Stellar CLI:** https://developers.stellar.org/docs/tools/cli/stellar-cli
- **Soroban Docs:** https://developers.stellar.org/docs/build/smart-contracts
- **Horizon API:** https://developers.stellar.org/api/horizon

### Herramientas útiles

- **Laboratory:** https://laboratory.stellar.org
- **StellarExpert:** https://stellar.expert/explorer/testnet
- **Friendbot:** https://friendbot.stellar.org


## 🦈 SOBRE EL CURSO: CÓDIGO FUTURA | TIBURONAS BUILDERS 2025

**Organizado por:**  
💙 Buen Día Builders 

**Mentoras:**
    🌟 Elisa Araya  
    🌟 Tatiana Borda