# SQE Technical Test

## Overview

This repository contains an automated test solution for the technical exercise using:

- **Playwright + TypeScript**
- **API testing** against Swagger Petstore
- **UI testing** against Sauce Demo
- **HTML reporting** with Playwright
- **GitHub Actions** for CI execution

The implementation is intentionally limited to the scope of the tech test. It includes three representative API scenarios and one representative UI scenario, with design decisions, coverage rationale, and prioritised future scenarios documented in `docs/TEST_DESIGN.md`.

---

## Tech Stack

- **Playwright**
- **TypeScript**
- **Node.js**
- **npm**

---

## Project Structure Summary

- `tests/api` contains API test coverage
- `tests/ui` contains UI test coverage
- `src/api` contains reusable API client code
- `src/pages` contains page objects for UI interactions
- `src/flows` contains reusable user journey flows
- `src/data` contains test data builders/factories
- `src/config` contains environment/config handling
- `docs` contains supporting design rationale and additional future test scenarios

---

## Prerequisites

Make sure the following are installed locally:

- **Node.js** version 18 or above
- **npm**
- A supported browser environment for Playwright

You can check installed versions with:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
npx playwright install
```

---

## Configuration

Create a local `.env` file in the project root based on `.env.example`.
The username and password are provided in the .env.example file.

### Example `.env`

```env
SAUCE_BASE_URL=https://www.saucedemo.com
PETSTORE_BASE_URL=https://petstore.swagger.io/v2
SAUCE_USERNAME=<username>
SAUCE_PASSWORD=<password>
```

### Notes

- `.env` is used for local execution
- `.env` is excluded from source control via `.gitignore`
- `.env.example` is included to show the required variable names

---

## Running the Tests

### Run all tests

```bash
npm test
```

### Run API tests only

```bash
npm run test:api
```

### Run UI tests only

```bash
npm run test:ui
```

### Run tests in headed mode

```bash
npm run test:headed
```

---

## Reporting

Playwright generates an HTML report after execution.

To open the report locally:

```bash
npm run report
```

### The report provides

- test execution summary
- pass/fail results
- failure details
- trace, video, and screenshot attachments where available

---

## GitHub Actions

This repository includes a GitHub Actions workflow for continuous integration.

### What the workflow does

On push or pull request, GitHub Actions will:

- check out the repository
- install Node dependencies
- install Playwright browsers
- run the automated test suite
- upload the Playwright HTML report as a workflow artifact

---

## Implemented Test Coverage

### API

1. The implemented API scenario validates creation and retrieval of a Petstore order using the Swagger Petstore API.
2. Retrieve an order using a non-existent ID.
3. Submit a POST request with an empty body.

### UI

The implemented UI scenario validates a standard user checkout flow in Sauce Demo:

- login
- add item to basket
- open cart
- enter checkout details
- complete order
- verify success confirmation

---

## Design Notes

Further detail on approach, prioritised additional scenarios, negative coverage, API-vs-UI rationale, and trade-offs is documented in `docs/TEST_DESIGN.md`.