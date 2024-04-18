import axios from "axios";

const API_URL =
  "https://expense-app-7692d-default-rtdb.europe-west1.firebasedatabase.app/";
const TABLE = "expenses";
const URL = `${API_URL}${TABLE}.json`;

export async function storeExpense(expense) {
  const response = await axios.post(URL, {
    amount: expense.amount.value,
    date: expense.date.value.toISOString(),
    description: expense.description.value,
  });
  const id = response.data.name;
  console.log("storeExpense", response.data.name);
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(URL);
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function deleteExpense(expenseID) {
  return axios.delete(`${API_URL}${TABLE}/${expenseID}.json`);
}

export function updateExpense(expenseID, expense) {
  return axios.put(`${API_URL}${TABLE}/${expenseID}.json`, expense);
}
