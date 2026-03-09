# Test Design

## Approach

I chose **Playwright with TypeScript** because it allows both **API** and **UI** automation in one toolset. For this exercise, that kept the setup simple and made the project easier to design and run.

For the **UI design**, I used a simple page object model with a small flow layer. The page objects keep locators and page-level actions in one place, while the flow layer keeps the end-to-end user journey readable. For the **API side**, I used a small client class and a test data factory so that the test itself stays focused on intent rather than request construction.


---

## Framework Structure

The project is organised so that API and UI concerns are separated clearly:

- `tests/api` contains API tests
- `tests/ui` contains UI tests
- `src/api` contains reusable API client code
- `src/pages` contains page objects
- `src/flows` contains reusable user journeys
- `src/data` contains test data builders/factories
- `src/config` contains environment configuration

---

## Implemented API positive Scenario

### Scenario selected
Create an order in Swagger Petstore and then retrieve it by ID.

### Why I chose it
I chose this scenario because it covers more than a simple single request. It exercises both creation and retrieval of data, which gives a more meaningful check of the endpoint behaviour. It also provides a good base for discussing the negative and boundary scenarios I would add next.

### What it validates
This test validates that:
- a valid order can be created successfully
- the response status is correct
- key fields in the response match the submitted payload
- the order can be retrieved afterwards using its ID
- the retrieved data is consistent with the original request

### Why it fits the exercise
For a single implemented API scenario, this gives a good amount of value without becoming too large for the scope of the task.

## Implemented API Negative Scenario 1

### Scenario selected
Retrieve an order using a non-existent ID.

### Why I chose it
Any endpoint that accepts an ID needs to handle missing resources correctly.
This checks the API returns 404 rather than an empty 200 or unexpected error.

### What it validates
- a non-existent order ID returns a 404
- the API does not silently succeed for missing data

---

## Implemented API Negative Scenario 2 (Highlights a bug in the API)

### Scenario selected
Submit a POST request with an empty body.

### Why I chose it
The API should reject a request with no required fields. During execution the
Petstore accepted the empty payload and returned 200 — which is a contract
violation.

### What it validates
- the API responds without throwing an unhandled error
- the response is valid JSON

### Note
 The test documents current behaviour and highlights a validation gap.


---

## Implemented UI Scenario

### Scenario selected
Complete a standard user checkout flow in Sauce Demo.

### Why I chose it
I chose the checkout flow rather than just a login test because it covers a broader end-to-end journey. In one test, it exercises authentication, product interaction, cart navigation, form completion, and order confirmation.

### What it validates
This test validates that:
- a standard user can log in successfully
- an item can be added to the cart
- the user can move through the cart and checkout pages
- checkout details can be entered successfully
- the order can be completed
- the success confirmation is displayed

### Why it fits the exercise
For a single UI test, I wanted something that represented real user value. A checkout journey gives broader confidence in the application flow than a smaller login-only test.

---

## Positive and Negative Test Thinking

The implemented tests focus on both positive and negative paths. The positive
scenario validates the happy path end to end. The two negative API scenarios
cover a missing resource and a malformed request. Further negative and edge
case scenarios are documented below in priority order.

My approach was to:
- implement one meaningful happy-path and two negative API scenarios
- implement one meaningful happy-path UI scenario
- document the most useful negative and edge cases I would add next
- explain which of those would be better covered at API level rather than UI level

---

## Additional API Scenarios in Priority Order

If I had more time, these are the API scenarios I would add next.

### 1. Boundary testing for fields such as `id` and `quantity`
This would cover negative numbers, zero, very large numbers, and other edge cases.

### 2. Delete an order and confirm it is no longer retrievable
This would extend the coverage to another e2e scenario

### 3. Delete a nonexistent order
This would help understand how the API handles invalid delete operations.

---

## Additional UI Scenarios in Priority Order

If I had more time, these are the UI scenarios I would add next.

### 1. Invalid login credentials
This is one of the most important negative user journeys and should be covered early.

### 2. Locked-out user behaviour
This is useful because it checks a specific business rule rather than just bad credentials.

### 3. Checkout validation errors
This would cover missing mandatory fields and validation messages on the checkout form.

### 4. Add and remove items from the cart
This would increase confidence in cart behaviour and state changes.

### 5. Logout or session behaviour
This would check whether the application handles session state correctly.

---

## API vs UI Test strategy

UI tests should be kept to a minimum as they are top heavy and requires lot of maintenance.Anything that can be validated at the API layer should be done using API tests as its faster and more stable.

### UI tests are most useful for:
- critical end-to-end user journeys
- visible browser behaviour
- navigation and page flow
- checking that important features are connected correctly

### API tests are more suitable for:
- input validation
- error handling
- boundary value testing
- malformed requests
- high volumes of negative scenarios

The reason is that API tests are usually faster, less brittle, and easier to diagnose. Many negative scenarios can technically be forced through the UI, but that usually makes them slower and harder to maintain. For that reason, if this suite were expanded, I would keep the UI suite focused on a smaller number of important user journeys and place more validation-heavy coverage at the API layer.

---

## Reporting and Execution

The project is designed to be easy to run and review. It includes:
- standard npm commands for execution
- Playwright HTML reporting
- GitHub Actions for CI execution

This means the tests can be run locally with simple commands and also reviewed through the CI workflow.

---

## Trade-offs and Challenges

The biggest trade-off was the time limit. Because the exercise is intentionally small, I chose to prioritise:
- one meaningful API scenario
- one meaningful UI journey
- clear structure
- readable code
- documentation of future priorities

rather than trying to build a wider suite.

I also kept the framework deliberately simple. For a technical test like this, I felt it was better to show good judgment and maintainability than to add extra abstraction that was not really needed.

---

## What I Would Add Next with More Time

If I had more time, the next improvements I would make are:

1. Add the prioritised negative API scenarios listed above.
2. Add invalid login and locked-out user UI tests.
3. Add checkout form validation coverage.
4. Strengthen assertions around API responses and UI state.
5. Add tagging or filtering options for different test groups.
6. Better management of secrets by moving the secrets from github secrets env variables to AWS secrets manager or K8 secrets.
7. Improve CI reporting further if needed.
8. Add further abstraction layer for better readability for non technical users to outlay the tests.

---

## Summary
This solution is designed to be a simple maintenable framework having both UI and API tests in a single project.The two implemented tests provide representative API and UI coverage, while the additional prioritised scenarios show how the suite would be expanded to cover more negative cases, edge conditions, and risk areas.