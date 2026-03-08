# SQE Technical Test

This repository contains:
- UI automation using Playwright
- API automation using Playwright request context
- GitHub Actions execution
- reporting and test design notes

## Run locally

```bash
npm install
npx playwright install
npx playwright test

## Configuration

Create a local `.env` file based on `.env.example`.

Example:

SAUCE_USERNAME=<username>
SAUCE_PASSWORD=<password>

`.env` is excluded from source control via `.gitignore`.