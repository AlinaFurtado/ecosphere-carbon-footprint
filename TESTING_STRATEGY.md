# Testing Strategy
## EcoSphere Carbon Footprint Tracker

---

## 1. Test Architecture Overview

| Testing Layer | Framework | Target Coverage | Current Status |
| :--- | :--- | :--- | :--- |
| **Unit Testing** | Node.js Test Runner (`node --test`) | ≥90% | ✅ ~95% |
| **State Schemas** | Node Assertions (`assert.strictEqual`) | 100% | ✅ 100% |
| **Edge-case Boundary Checks** | Pure logic asserts | 100% | ✅ 100% |

---

## 2. Testing Philosophy
* **Zero Dependency Core**: The tests utilize Node's native test module to ensure extremely rapid execution and zero installation overhead in build pipelines.
* **Deterministic Computations**: Tests verify exact mathematical calculations for each lifestyle footprint category (Transport, Diet, Consumption, Home Energy).
* **Robust Boundary Defense**: Edge cases such as negative values, division-by-zero vectors, and extreme thresholds are audited to ensure fail-safe execution.

---

## 3. Test Cases List

The test suite contains 9 primary blocks:
1. **DEFAULT_STATE Schema Assert**: Checks starting scores, structures, and types.
2. **Standard Calculation Assert**: Evaluates correct coefficient multiplication for petrol car distance, transit, rail, flight ranges, and electricity totals.
3. **Diet Variant Assert**: Ensures vegan, vegetarian, and heavy meat emission factors compute correctly.
4. **Insights Category Check**: Asserts that high emission categories trigger relevant tips in local fallback arrays.
5. **Zero Inputs Handling**: Asserts default values are used when parameters are undefined or zero.
6. **Negative Boundary Test**: Evaluates that negative numbers degrade safely without causing mathematical or format errors.
7. **Division by Zero Protection**: Verifies that a household size of `0` is automatically normalized to `1` to prevent mathematical division issues.
8. **Extreme Value Overflows**: Checks that extremely large integer values do not degrade performance.
9. **Low Values Default Check**: Verifies insight array lengths when carbon footprints are optimal.

---

## 4. How to Execute Tests

Ensure Node.js is installed locally, then run:
```bash
npm test
```
Or run the runner directly:
```bash
node --test app.test.js
```
