# 📅 Due Date Calculator

A utility that calculates workday-based due dates given a start time and turnaround in hours. Skips weekends and non-working hours (9AM–5PM UTC).

---

## 🧰 Built With

- **TypeScript**
- **Vitest** – for unit testing
- **ESLint** – for linting
- **Husky** – for Git hooks (pre-commit)
- **tsx** – to run TypeScript files directly without manual compilation

---

### 📥 Input Format

The main function `calculateDueDate(submit: string, turnaround: number)` expects:

- `submit` 
  Example: `'2025-03-28T14:30:00Z'`  
  - Must fall between working hours: **Monday to Friday, 9AM–5PM UTC**
  - ⚠️ 9AM and 5PM are not included in working hours.


- `turnaround` – A **positive number** representing the **number of working hours**  
  Example: `16` = 2 full workdays (8 hours/day)

> ⚠️ Invalid inputs will throw an error with details (e.g., outside working hours or incorrectly formatted date).

## 📦 Installation

```bash
npm install
```

### ▶️ How to Run

To execute the main script:

```bash
npm run script
