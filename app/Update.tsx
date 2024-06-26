import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
  importance: string;
}

const UpdateScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params as { noteId: string };

  const [note, setNote] = useState<Note>({
    id: noteId,
    date: "",
    title: "",
    content: "",
    importance: "Reminder", // Default importance value
  });

  useEffect(() => {
    // Load note data based on noteId from AsyncStorage or other data source
    const loadNote = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes) {
          const notes: Note[] = JSON.parse(storedNotes);
          const foundNote = notes.find((n) => n.id === noteId);
          if (foundNote) {
            setNote(foundNote);
          }
        }
      } catch (error) {
        console.error("Error loading note:", error);
      }
    };

    loadNote();
  }, [noteId]);

  const handleUpdateNote = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        const notes: Note[] = JSON.parse(storedNotes);
        const updatedNotes = notes.map((n) =>
          n.id === note.id ? { ...n, ...note } : n
        );
        await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
        navigation.goBack();
      }
    } catch (error) {
      console.error("Failed to update note.", error);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNote((prevNote) => ({
        ...prevNote,
        date: selectedDate.toISOString().split("T")[0],
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Note</Text>
        <TouchableOpacity onPress={handleUpdateNote} style={styles.saveButton}>
          <MaterialCommunityIcons
            name="content-save-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.innerContent,
            { backgroundColor: getBackgroundColor(note.importance) },
          ]}
        >
          <TouchableOpacity
            onPress={showDatePickerModal}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>Date : {note.date}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(note.date)}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={note.title}
            onChangeText={(text) =>
              setNote((prevNote) => ({ ...prevNote, title: text }))
            }
          />
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="Content"
            multiline
            value={note.content}
            onChangeText={(text) =>
              setNote((prevNote) => ({ ...prevNote, content: text }))
            }
          />
          <Picker
            style={styles.picker}
            selectedValue={note.importance}
            onValueChange={(itemValue, _itemIndex) =>
              setNote((prevNote) => ({ ...prevNote, importance: itemValue }))
            }
          >
            <Picker.Item label="Reminder" value="Reminder" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Important" value="Important" />
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getBackgroundColor = (importance: string) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#114B5F",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  saveButton: {
    padding: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContent: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    margin: 20,
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
    paddingHorizontal: 10,
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
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
  picker: {
    borderWidth: 4,
    height: 50,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    fontWeight: "bold",
    color: "#114B5F",
    borderColor: "#114B5F",
    fontSize: 16,
  },
});

export default UpdateScreen;
