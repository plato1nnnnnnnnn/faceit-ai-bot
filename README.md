# Документация по монорепозиторию Faceit AI Bot

- Структура папок и сервисов
- Инструкции по запуску для каждого приложения
- Описание API и интеграций
- TODO: добавить схемы, примеры запросов, описание архитектуры

## Local run & build instructions

Frontend (Next.js):

- Install JS dependencies (already done in the devcontainer):
	npm install

- Development server:
	npm run dev

- Build for production:
	npm run build

- Run production server:
	npm run start

If you want a webpack-only bundle for extension assets:
	npm run webpack:build


Backend (FastAPI):

The backend is a small FastAPI app in `main.py`.

- Create and activate the project's virtualenv (the devcontainer already configures `.venv`).

- Install Python dependencies (if not already):
	/workspaces/faceit-ai-bot/.venv/bin/python -m pip install -r requirements.txt

- Run in development with uvicorn:
	/workspaces/faceit-ai-bot/.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000

- Health checks:
	GET http://127.0.0.1:8000/
	GET http://127.0.0.1:8000/health


Notes
- Next.js was configured to use Babel (there is a `.babelrc`). If you prefer SWC, remove or adapt `.babelrc` and ensure Next's SWC dependencies are available.
- If you need systemd/Docker compose wiring for production, I can add a `docker-compose` service and a simple Dockerfile for the backend.

## Docker and tests

Build and run services with Docker Compose:

```bash
docker compose up --build
```

This will bring up:
- `db` — Postgres on 5432
- `api` — FastAPI backend on 8000
- `web` — Next.js frontend on 3000

Run backend unit tests locally (venv must be active):

```bash
/workspaces/faceit-ai-bot/.venv/bin/python -m pip install -r requirements.txt
/workspaces/faceit-ai-bot/.venv/bin/python -m pip install pytest httpx
/workspaces/faceit-ai-bot/.venv/bin/pytest -q
```


Environment and secrets
-----------------------

This repo expects runtime configuration via environment variables. For local development:

- Copy `.env.example` to `.env` and update values (do NOT commit `.env` with secrets).
- Use the `.env` file to run docker compose locally; services are configured to read `env_file: ./.env`.

Recommended variables (see `.env.example`):

- `DATABASE_URL` — postgres connection string for the dev database.
- `SECRET_KEY` — secret for cryptographic operations.
- `NODE_ENV` — set to `production` in production builds.

For production, store secrets in a secret manager and supply them from your platform (Kubernetes secrets, cloud secret managers, or CI/CD secret injection). Never commit secrets to git.

## Deployment to reg.ru (Debian VPS)

You said you have a VPS on Debian — below are minimal steps to prepare the server and the GitHub Actions workflow provided in `.github/workflows/deploy-to-regru.yml` will perform deploys by SSH when you push to `main`.

Required GitHub repository secrets (add these in the repository Settings → Secrets):

- `VPS_SSH_PRIVATE_KEY` — the private SSH key for the deploy user (keep it secret).
- `VPS_HOST` — the IP or hostname of your VPS (e.g. `123.45.67.89`).
- `VPS_USER` — SSH username on the VPS (e.g. `deploy`).
- `VPS_DEPLOY_PATH` — the path on the VPS where the repository should be located (default: `/var/www/faceit-ai-bot`).
- `VPS_SSH_PORT` — optional SSH port (defaults to `22`).

Server preparation (minimum):

1. Create a deploy user and add the public key to `/home/<user>/.ssh/authorized_keys`.
2. Install Docker Engine and Docker Compose on Debian (follow Docker's official Debian guide).
3. Give the deploy user permission to run Docker commands (add to the `docker` group):

	sudo usermod -aG docker <deploy-user>

4. Optionally install Git and clone the repo into `VPS_DEPLOY_PATH` or let the workflow clone it on the first deploy.
5. Ensure `docker compose` is available and working for the deploy user (log in via SSH and run `docker compose ps`).

How the workflow works:

- On push to `main` the workflow will check out the repo, load the private SSH key from GitHub Secrets and SSH to `${VPS_USER}@${VPS_HOST}`. It runs `git pull` in `${VPS_DEPLOY_PATH}` (or clones if the path is empty) and then runs `docker compose up -d --build` to build and start services.

Security notes:

- Use a dedicated, least-privileged deploy user rather than `root` when possible.
- Consider restricting the SSH key to only allow from GitHub Actions IPs or use a separate CI deploy key.

If you want, I can also:

- Add an alternative workflow to push Docker images to GitHub Container Registry and have the VPS pull images instead of building on the server.
- Add an extra step to the workflow to run database migrations on the VPS before bringing services up.

Ubuntu setup script

There's a helper script `scripts/setup-ubuntu.sh` that prepares a fresh Ubuntu LTS server (installs Docker, docker-compose plugin, creates a deploy user and optionally adds a public key).

Usage (run as root or with sudo on the VPS):

```bash
sudo bash setup-ubuntu.sh deploy /path/to/your/public_key.pub
```

This will create the `deploy` user, install Docker and the Compose plugin, add the public key to `/home/deploy/.ssh/authorized_keys` (if provided), and add the user to the `docker` group.

Ubuntu quick checklist (post-setup)

- Reboot or re-login the `deploy` user so group membership takes effect, or run `newgrp docker`.
- Firewall: allow only required ports (SSH, and HTTP/HTTPS if needed):

	sudo ufw allow OpenSSH
	sudo ufw allow 80/tcp
	sudo ufw allow 443/tcp
	sudo ufw enable

- Reverse proxy & TLS (recommended): install nginx and certbot and configure a reverse proxy for Next.js (port 3000) and the API (port 8000), then use certbot to get LetsEncrypt certificates.
- Security: consider disabling password authentication for SSH and keep only key-based login for the `deploy` user.




