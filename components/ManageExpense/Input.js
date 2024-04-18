import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label,syle, textInput,invalid }) {
  const inputStyles = [styles.input];

  if (textInput && textInput.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if(invalid){
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer,syle]}>
      <Text style={[styles.label,invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput  style={inputStyles} {...textInput} />
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel:{
    color: GlobalStyles.colors.error500,
  },
  invalidInput:{
    borderColor: GlobalStyles.colors.error500,
    borderWidth: 2,
    backgroundColor: GlobalStyles.colors.error50,
  }
});
