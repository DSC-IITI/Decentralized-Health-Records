

---

# Healthcare Management Smart Contract

## Overview
This project implements a healthcare management system on the Ethereum blockchain using Solidity and Hardhat. It allows patients to register, update their medical records, book appointments with doctors, and allows doctors to manage appointments and availability.

## Features
- **Patient Management:**
  - Register patients with basic information.
  - Update personal details and medical records.
- **Doctor Management:**
  - Register doctors with professional details.
  - Update personal and professional details.
- **Appointment System:**
  - Patients can book appointments with available doctors.
  - Doctors can view and manage their appointments.
- **Record Keeping:**
  - Add medical records for patients including reasons and IPFS links.
- **Access Control:**
  - Ownership control using the Ownable pattern.
  - Role-based access to functions (e.g., only doctors can set their availability).

## Project Structure
- **`Record.sol`:** Main smart contract containing all the functionalities.
- **`Ownable.sol`:** Contract implementing ownership functionality.

## Dependencies
- Solidity ^0.8.7
- Hardhat

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git
   cd repository
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Compile contracts and deploy using Hardhat:
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network localhost
   ```
2. Run the application:
   ```bash
   npx run dev
   ```
   This command starts the application and allows interactions with the deployed contracts.



