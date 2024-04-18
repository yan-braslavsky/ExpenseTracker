import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpensesScreen() {
  const context = useContext(ExpensesContext);
  return <ExpensesOutput fallbackText={"No registered expenses found"} expenses={context.expenses} expensesPeriod="Total" />;
}

export default AllExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
