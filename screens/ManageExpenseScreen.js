import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";

function ManageExpenseScreen({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const expenseID = route.params?.expenseID;
  const isEditing = !!expenseID;

  const headerTitle = isEditing ? "Edit Expense" : "Add Expense";

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseID
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation, headerTitle]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(expenseID);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    console.log(isEditing ? "Updating" : "Adding");
    if (isEditing) {
      expensesCtx.updateExpense(expenseID, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ id, ...expenseData});
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        isEditing={isEditing}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />

      <View style={styles.deleteContainer}>
        {isEditing && (
          <View>
            <IconButton
              color={GlobalStyles.colors.error500}
              icon="trash"
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  button: {
    width: "40%",
  },
});
