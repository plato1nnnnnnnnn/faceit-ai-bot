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


Server preparation (minimum):

1. Create a deploy user and add the public key to `/home/<user>/.ssh/authorized_keys`.
2. Install Docker Engine and Docker Compose on Debian (follow Docker's official Debian guide).
3. Give the deploy user permission to run Docker commands (add to the `docker` group):

	sudo usermod -aG docker <deploy-user>

4. Optionally install Git and clone the repo into `VPS_DEPLOY_PATH` or let the workflow clone it on the first deploy.
5. Ensure `docker compose` is available and working for the deploy user (log in via SSH and run `docker compose ps`).

How the workflow works:


Security notes:


 If you want, I can also:
 
 Deploy key (private repo) instructions
 
 If your repository is private, the recommended approach is to create a repository Deploy key and let the VPS use it to `git clone git@github.com:owner/repo.git`.
 
 1. On your local machine, create a new SSH key pair for deploy:
 
 ```bash
 ssh-keygen -t ed25519 -C "deploy@your-vps" -f /tmp/faceit_deploy_key -N ""
 ```
 
 2. Copy the public key (`/tmp/faceit_deploy_key.pub`) to the repository Settings → Deploy keys → Add deploy key. Give it read access.
 
 3. Add the private key (`/tmp/faceit_deploy_key`) as a repository secret named `REPO_SSH_PRIVATE_KEY`.

5. In GitHub repository Settings → Secrets, add the secret `REPO_SSH_PRIVATE_KEY` and paste the **private** key contents.

Notes:

- The workflow will copy the private key to the VPS into `/home/<deploy>/.ssh/repo_deploy_key` and configure an SSH `Host github.com` entry so that `git clone git@github.com:owner/repo.git` uses that key. The key is not stored permanently by the workflow (it is moved into the deploy user's `~/.ssh`) and permissions are set to `600`.
- For extra safety, prefer adding the public key as a repository Deploy key (Settings → Deploy keys) and keep the private key in GitHub Secrets with `read` access only in Actions.
- If you prefer the server to manage its own deploy key (instead of transferring from CI), follow these steps on the server:

	- Generate key on the server: `ssh-keygen -t ed25519 -f ~/.ssh/repo_deploy_key -N ""`
	- Copy the public key (`~/.ssh/repo_deploy_key.pub`) into Repo Settings → Deploy keys.
	- Then the workflow will automatically use SSH cloning without transferring the key from CI.


Ubuntu setup script

There's a helper script `scripts/setup-ubuntu.sh` that prepares a fresh Ubuntu LTS server (installs Docker, docker-compose plugin, creates a deploy user and optionally adds a public key).

Usage (run as root or with sudo on the VPS):

```bash
sudo bash setup-ubuntu.sh deploy /path/to/your/public_key.pub
```

This will create the `deploy` user, install Docker and the Compose plugin, add the public key to `/home/deploy/.ssh/authorized_keys` (if provided), and add the user to the `docker` group.

Ubuntu quick checklist (post-setup)


	sudo ufw allow OpenSSH
	sudo ufw allow 80/tcp
	sudo ufw allow 443/tcp
	sudo ufw enable





