import React from "react";
import { View, StyleSheet,Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

function ExpensesOutput({ expenses , expensesPeriod,fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  // let content = <ExpensesList expenses={expenses} />;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText:{
    color: GlobalStyles.colors.primary100,
    textAlign: "center",
    fontSize: 16,
    marginTop: 24
  }
});
