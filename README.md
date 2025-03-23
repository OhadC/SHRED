<a href="https://chromewebstore.google.com/detail/shred/lkdhepgfcenmcehhjiongbcokflijana">
    <p align="center">
        <img src="assets/icon.png" alt="Extension Icon" width="100" height="100">
    </p>
</a>

<h1 align="center">SHRED: A Chrome Extension for Guitar Tabs</h1>

[![Install SHRED](https://img.shields.io/badge/Chrome%20Web%20Store-Install-blue?style=for-the-badge&logo=googlechrome)](https://chromewebstore.google.com/detail/shred/lkdhepgfcenmcehhjiongbcokflijana)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)
- [License](#license)

## Overview

SHRED is a Chrome extension designed to help guitarists quickly find essential information about songs while streaming music. It seamlessly integrates with **Spotify, Tidal, and YouTube Music**, providing:

- **Tuning Information**
- **Difficulty Level**
- **Guitar Tab Links**

SHRED is an open-source project aimed at enhancing the learning experience for guitarists by simplifying the process of finding relevant song details.

## Installation

### Prerequisites

Before installing, ensure you have the following installed:

- [pnpm](https://pnpm.io/) (install globally with npm i -g pnpm if needed)
- [Node.js](https://nodejs.org/) (recommended version: 18+)

### Steps to Install

1. Clone the repository:
    ```sh
    git clone https://github.com/OhadC/SHRED.git
    cd SHRED
    ```
2. Install dependencies:
    ```sh
    pnpm install
    ```
3. Build the extension:
    ```sh
    pnpm build
    ```
4. Load into Chrome:
    - Open `chrome://extensions/`.
    - Enable **Developer mode** (top-right corner).
    - Click **Load unpacked** and select the `dist` folder inside the project.

## Usage

1. Open **Spotify**, **Tidal**, or **YouTube Music**.
2. Play any song.
3. Click the **SHRED** extension icon in your Chrome toolbar or open Picture-in-Picture mode.
4. Instantly view tuning, difficulty, and tab links.

## Technology Stack

SHRED is built using modern web technologies for efficiency and maintainability:

- [Plasmo](https://www.plasmo.com/) – Extension framework
- [React](https://react.dev/) – UI library
- [TanStack Query](https://tanstack.com/query) – Data fetching & caching
- [tsyringe](https://github.com/microsoft/tsyringe) – Dependency injection
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript

## Contributing

We welcome contributions! If you would like to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Submit a pull request for review.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

For feedback or suggestions, feel free to open an issue.

🚀 Happy shredding! 🎸
