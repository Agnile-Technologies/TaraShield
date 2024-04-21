# TaraShield - Threat Analysis and Risk Assessment (TARA) Desktop Application

TaraShield is a desktop application designed to facilitate Threat Analysis and Risk Assessment (TARA) in compliance with the ISO 21434 standard. It provides a comprehensive solution for managing cybersecurity risks in automotive systems, leveraging a modular architecture with cross-platform support through the Electron framework, and employing web technologies for a rich user interface.

## Overview

The application utilizes Electron for desktop functionality, React for building the user interface, Redux for state management, and Node.js for backend operations. The modular architecture allows for scalable and maintainable code structure, supporting various functionalities from project management to risk assessment and reporting. Data is stored locally in structured JSON files, ensuring easy access and manipulation.

## Features

- **Project Management:** Create, open, and manage TARA projects with ease.
- **Threat Identification:** Document potential threats and link them to assets and damage scenarios.
- **Risk Assessment:** Utilize a risk matrix to assess and prioritize risks, selecting appropriate risk treatment decisions.
- **Security Goals:** Define security goals based on assessed risks to guide mitigation strategies.
- **Attack Trees:** Visualize potential attack paths and methods through interactive attack trees.
- **Management Summary:** Generate comprehensive summary reports for management or audit purposes.

## Getting Started

### Requirements

- Node.js
- npm or yarn
- Electron

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build the project for production:
   ```bash
   npm run build
   ```

### License

Copyright (c) 2024. All rights reserved.