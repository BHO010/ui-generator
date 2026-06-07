# React UI Generator

## Installation Guide

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/BHO010/ui-generator.git
   ```

2. **Setup both backend and frontend**

   Refer to their individual README.md file

---

## Backend

A REST API built with **Express** and **TypeScript** that accepts a natural-language prompt and returns a generated React component. The generation pipeline is orchestrated with **LangGraph**, running through a planner → generator → validator → fixer loop against a local **Ollama** model. Exposes both a standard `POST /api/generate` endpoint and a streaming `POST /api/generate/stream` endpoint (Server-Sent Events). OpenAPI docs are served at `/api-docs`.

See [backend/README.md](backend/README.md) for setup and configuration details.

---

## Frontend

A browser-based tool built with **React 19**, **Vite**, and **TypeScript** that lets users enter a natural-language prompt and view the generated React component in a live preview alongside its source code. Uses **Redux Toolkit** (with RTK Query) for state and API calls, **styled-components** for styling, and the **LifeSG React Design System** for UI components and theming.

See [frontend/README.md](frontend/README.md) for setup and configuration details.

---
