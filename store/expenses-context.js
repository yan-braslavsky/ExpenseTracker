import { createContext } from "react";
import { useReducer } from "react";
import React from "react";
// import { DUMMY_EXPENSES } from "../data/dummy-data";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ id, description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

function expensesReducer(expenses, action) {
  switch (action.type) {
    case "ADD":
      return [ action.payload,...expenses];
    case "DELETE":
      return expenses.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updatableExpenseIndex = expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatedExpenses = [...expenses];
      updatedExpenses[updatableExpenseIndex] = {
        ...updatedExpenses[updatableExpenseIndex],
        ...action.payload,
      };
      return updatedExpenses;

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    default:
      return expenses;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expense) => {
    dispatch({ type: "ADD", payload: expense });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expense) => {
    dispatch({ type: "UPDATE", payload: { id, ...expense } });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  }

  const context = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={context}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
