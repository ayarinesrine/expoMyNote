import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Appbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

const FormScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [content, setContent] = useState("");
  const [importance, setImportance] = useState("Reminder");

  const _goBack = () => {
    navigation.goBack();
  };

  const _handleSave = async () => {
    try {
      const note = {
        id: uuid.v4(),
        title: title,
        date: date.toISOString().split("T")[0],
        content: content,
        importance: importance,
      };

      const existingNotes = await AsyncStorage.getItem("notes");
      const parsedNotes = existingNotes ? JSON.parse(existingNotes) : [];
      parsedNotes.push(note);

      await AsyncStorage.setItem("notes", JSON.stringify(parsedNotes));
      navigation.goBack();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const getBackgroundColor = (importance: any) => {
    switch (importance) {
      case "Reminder":
        return "#7EE4EC";
      case "Normal":
        return "#FFD4CA";
      case "Important":
        return "#F45B69";
      default:
        return "#7EE4EC";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "white" }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Form" titleStyle={styles.formTitle} />
        <TouchableOpacity style={styles.saveButton} onPress={_handleSave}>
          <MaterialCommunityIcons
            name="content-save-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={importance}
            style={styles.picker}
            onValueChange={(itemValue, _itemIndex) => setImportance(itemValue)}
          >
            <Picker.Item label="Reminder" value="Reminder" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Important" value="Important" />
          </Picker>
        </View>

        <View
          style={[
            styles.innerContent,
            { backgroundColor: getBackgroundColor(importance) },
          ]}
        >
          <TouchableOpacity
            onPress={showDatePickerModal}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>
              Date : {date.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="Content"
            multiline
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContent: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#114B5F",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 20,
    paddingVertical: 20,
  },
  input: {
    fontSize: 16,
    color: "#114B5F",
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  dateInput: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#114B5F",
    fontWeight: "bold",
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: "#114B5F",
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#114B5F",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    fontWeight: "bold",
    color: "#114B5F",
    borderColor: "#114B5F",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#114B5F",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    color: "#fff",
    fontSize: 30,
  },
  formTitle: { fontWeight: "bold", color: "#114B5F", fontSize: 26 },
});

export default FormScreen;
