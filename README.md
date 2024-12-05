# Picsee Frontend - Web Client

A modern, responsive, single-page application for the **Picsee** image-sharing and creator discovery platform, built with **React 18** and **Vite**.

---

## Overview

**Picsee Frontend** provides a fast, interactive user interface for discovering visual artwork, publishing multi-image posts, exploring tags, interacting through likes, authenticating via Google OAuth2 or email, and customizing user profiles.

> [!NOTE]
> **Educational & Demonstration Scope**: This project is developed primarily for educational, research, and portfolio demonstration purposes. While it follows solid component-driven development, state management, and modern styling practices, it is designed for learning, prototypes, and demonstration workloads.

---

## Features

- **Dynamic Visual Gallery & Feed**:
  - Multi-column masonry layout optimized for heterogeneous image aspect ratios.
  - Infinite cursor-based feed scrolling and trending query discovery (`?query=relevant`).
  - Integrated tag exploration and search.
- **Authentication & Security**:
  - Seamless Sign In and Sign Up workflows with client-side field validation.
  - One-click Google OAuth2 authentication via `@react-oauth/google`.
  - AES-encrypted password recovery token processing via `crypto-js`.
- **Media Upload Studio**:
  - Interactive drag-and-drop upload zone supporting up to 5 photos per post.
  - Per-image dynamic hashtag tagging and deletion.
  - Live client-side thumbnail preview before submission.
- **Creator Profiles**:
  - Customizable profile view with avatar uploads, bio, and social links (Instagram, Facebook, X/Twitter, LinkedIn).
  - Tabbed feeds separating published artwork and liked posts.
  - In-app password updating and profile settings.
- **Post Interactions**:
  - Real-time like toggle with optimistic UI updates.
  - Direct high-resolution image downloads with native file metadata via `js-file-download`.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Authentication**: [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
- **Cryptography**: [crypto-js](https://www.npmjs.com/package/crypto-js)
- **Icons & Styling**: [React Icons](https://react-icons.github.io/react-icons/), [Normalize.css](https://necolas.github.io/normalize.css/), Vanilla CSS Modules
- **File Utilities**: [js-file-download](https://www.npmjs.com/package/js-file-download)
- **Deployment**: [Docker](https://www.docker.com/) & [Nginx](https://www.nginx.com/)

---

## Project Structure

```text
Picsee-frontend/
├── index.html                  # HTML5 entrypoint
├── package.json                # Project manifests & dependencies
├── vite.config.js              # Vite bundler configuration
├── Dockerfile                  # Multi-stage production container
├── .env.example                # Environment variables template
└── src/
    ├── main.jsx                # Application root mount
    ├── app/                    # Router configuration & root App component
    ├── components/
    │   ├── forms/              # Sign In, Sign Up, Recover & Update Password views
    │   ├── mainview/           # Main feed container
    │   ├── navbar/             # Navigation header, search bar, and user dropdown menu
    │   ├── photos/             # Feed gallery, post cards, like/download options, upload modal
    │   ├── tags/               # Tag cloud & filtering
    │   └── user/               # Profile view, tabs, and profile editing forms
    ├── context/                # Global React context providers
    ├── hooks/                  # Custom data hooks (usePosts, useUser, useTags)
    ├── pages/                  # Top-level route pages (Home)
    └── utils/                  # Masonry column sorters, route guards, string helpers
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/suaadev/Picsee-frontend.git
cd Picsee-frontend
npm install
```

### 2. Configure Environment Variables

Copy the example configuration file and specify your backend API URL and Google OAuth Client ID:

```bash
cp .env.example .env
```

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Backend REST API base URL | `http://localhost:8000/api/v1/` |
| `VITE_SECRET_HASH` | AES Secret key for token decryption | `your_aes_secret_key` |
| `VITE_GOOGLE_CLIENT_ID`| Google OAuth2 Client ID | `your_client_id.apps.googleusercontent.com` |
| `VITE_API_ACCESS_TOKEN`| Optional fallback API token | *(empty by default)* |

### 3. Running Locally

Start the Vite development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 4. Production Build

Compile and bundle optimized static assets for production:

```bash
npm run build
```

The output bundle will be generated in the `dist/` directory.

---

## Docker Deployment

Build and run the production container using Nginx:

```bash
# Build Docker image
docker build -t picsee-frontend .

# Run container on port 80
docker run -d -p 80:80 --name picsee-web picsee-frontend
```

---

## License

This project is licensed under the [MIT License](LICENSE).
