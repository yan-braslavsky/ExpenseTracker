import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { isWithinDays } from "../util/date-util";
import { fetchExpenses } from "../util/http";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpensesScreen() {
  const context = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchAndSetExpenses() {
      const expenses = await fetchExpenses();
      context.setExpenses(expenses);
    }

    fetchAndSetExpenses();
  }, [context.expenses]);

  const recentExpenses = context.expenses.filter((expense) => {
    return isWithinDays(expense.date, 7);
  });
  return (
    <ExpensesOutput fallbackText={"No expenses for last 7 days"} expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}

export default RecentExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
