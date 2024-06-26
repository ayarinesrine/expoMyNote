// import React, { useEffect, useState } from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import {
//   GestureHandlerRootView,
//   TouchableOpacity,
// } from "react-native-gesture-handler";
// import { Appbar } from "react-native-paper";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// interface Note {
//   id: string;
//   date: string;
//   title: string;
//   content: string;
//   importance: string;
// }

// const NoteScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { noteId } = route.params as { noteId: string };
//   const [note, setNote] = useState<Note | null>(null);
//   const getTextColorByImportance = (importance: string) => {
//     return importance === "Important" ? "#fff" : "#114B5F";
//   };
//   const getColorByImportance = (importance: string) => {
//     switch (importance) {
//       case "Reminder":
//         return "#7EE4EC";
//       case "Normal":
//         return "#FFD4CA";
//       case "Important":
//         return "#F45B69";
//       default:
//         return "#7EE4EC";
//     }
//   };

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const storedNotes = await AsyncStorage.getItem("notes");
//         if (storedNotes) {
//           const notes: Note[] = JSON.parse(storedNotes);
//           const currentNote = notes.find((n) => n.id === noteId);
//           if (currentNote) {
//             setNote(currentNote);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load note.", error);
//       }
//     };

//     fetchNote();
//   }, [noteId]);

//   const goBack = () => {
//     navigation.goBack();
//   };

//   const handleSave = () => {
//     Alert.alert("Save", "Note saved successfully.");
//   };

//   const handleDelete = async () => {
//     try {
//       const storedNotes = await AsyncStorage.getItem("notes");
//       if (storedNotes) {
//         const notes: Note[] = JSON.parse(storedNotes);
//         const filteredNotes = notes.filter((n) => n.id !== noteId);
//         await AsyncStorage.setItem("notes", JSON.stringify(filteredNotes));
//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error("Failed to delete note.", error);
//     }
//   };

//   if (!note) {
//     return (
//       <SafeAreaProvider>
//         <Appbar.Header>
//           <Appbar.BackAction onPress={goBack} />
//           <Appbar.Content
//             title="Note"
//             subtitle="Subtitle"
//             titleStyle={styles.noteTitle}
//           />
//         </Appbar.Header>
//         <View style={styles.container}>
//           <Text>Loading...</Text>
//         </View>
//       </SafeAreaProvider>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <Appbar.Header>
//           <Appbar.BackAction onPress={goBack} />
//           <Appbar.Content
//             title="Note"
//             subtitle="Subtitle"
//             titleStyle={styles.noteTitle}
//           />
//           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//             <MaterialCommunityIcons
//               name="border-color"
//               size={22}
//               color="white"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.saveButton} onPress={handleDelete}>
//             <MaterialCommunityIcons name="delete" size={22} color="white" />
//           </TouchableOpacity>
//         </Appbar.Header>
//         <View style={styles.container}>
//           <View
//             style={[
//               styles.innerContent,
//               { backgroundColor: getColorByImportance(note.importance) },
//             ]}
//           >
//             <View style={styles.dateTag}>
//               <Text style={styles.dateText}>Date: {note.date}</Text>
//             </View>
//             <View>
//               <Text
//                 style={[
//                   styles.noteTitleText,
//                   { color: getTextColorByImportance(note.importance) },
//                 ]}
//               >
//                 Title: {note.title}
//               </Text>
//             </View>
//             <View>
//               <Text
//                 style={[
//                   styles.noteContentText,
//                   { color: getTextColorByImportance(note.importance) },
//                 ]}
//               >
//                 Content: {note.content}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     backgroundColor: "white",
//   },
//   innerContent: {
//     flex: 1,
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: "#114B5F",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     margin: 5,
//     paddingVertical: 20,
//   },
//   dateTag: {
//     width: 150,
//     backgroundColor: "#114B5F",
//     borderRadius: 7,
//     padding: 10,
//     position: "absolute",
//     top: 12,
//     right: 12,
//   },
//   dateText: {
//     color: "#fff",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   noteTitle: {
//     fontWeight: "bold",
//     color: "#114B5F",
//   },
//   saveButton: {
//     backgroundColor: "#114B5F",
//     padding: 10,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   noteTitleText: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "black",
//     marginTop: 50,
//   },
//   noteContentText: {
//     fontSize: 18,
//     color: "black",
//     marginTop: 20,
//   },
// });

// export default NoteScreen;

import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
  importance: string;
}

const NoteScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params as { noteId: string };
  const [note, setNote] = useState<Note | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const getTextColorByImportance = (importance: string) => {
    return importance === "Important" ? "#fff" : "#114B5F";
  };

  const getColorByImportance = (importance: string) => {
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

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes) {
          const notes: Note[] = JSON.parse(storedNotes);
          const currentNote = notes.find((n) => n.id === noteId);
          if (currentNote) {
            setNote(currentNote);
          }
        }
      } catch (error) {
        console.error("Failed to load note.", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      let notes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];
      const noteIndex = notes.findIndex((n) => n.id === noteId);

      if (noteIndex !== -1 && note) {
        notes[noteIndex] = note;
      } else if (note) {
        notes.push(note);
      }

      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      setSaveModalVisible(true);
    } catch (error) {
      console.error("Failed to save note.", error);
    }
  };

  const handleDelete = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        const notes: Note[] = JSON.parse(storedNotes);
        const filteredNotes = notes.filter((n) => n.id !== noteId);
        await AsyncStorage.setItem("notes", JSON.stringify(filteredNotes));
        navigation.goBack();
      }
    } catch (error) {
      console.error("Failed to delete note.", error);
    }
  };

  if (!note) {
    return (
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content
            title="Note"
            subtitle="Subtitle"
            titleStyle={styles.noteTitle}
          />
        </Appbar.Header>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content
            title="Note"
            subtitle="Subtitle"
            titleStyle={styles.noteTitle}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <MaterialCommunityIcons
              name="border-color"
              size={22}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setDeleteModalVisible(true)}
          >
            <MaterialCommunityIcons name="delete" size={22} color="white" />
          </TouchableOpacity>
        </Appbar.Header>
        <View style={styles.container}>
          <View
            style={[
              styles.innerContent,
              { backgroundColor: getColorByImportance(note.importance) },
            ]}
          >
            <View style={styles.dateTag}>
              <Text style={styles.dateText}>Date: {note.date}</Text>
            </View>
            <View>
              <Text
                style={[
                  styles.noteTitleText,
                  { color: getTextColorByImportance(note.importance) },
                ]}
              >
                Title: {note.title}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.noteContentText,
                  { color: getTextColorByImportance(note.importance) },
                ]}
              >
                Content: {note.content}
              </Text>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => {
            setDeleteModalVisible(!deleteModalVisible);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Confirm Delete</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to delete this note?
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setDeleteModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonDelete]}
                  onPress={() => {
                    setDeleteModalVisible(false);
                    handleDelete();
                  }}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={saveModalVisible}
          onRequestClose={() => {
            setSaveModalVisible(!saveModalVisible);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Save Note</Text>
              <Text style={styles.modalMessage}>Note saved successfully.</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setSaveModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  innerContent: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#114B5F",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 5,
    paddingVertical: 20,
  },
  dateTag: {
    width: 150,
    backgroundColor: "#114B5F",
    borderRadius: 7,
    padding: 10,
    position: "absolute",
    top: 12,
    right: 12,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  noteTitle: {
    fontWeight: "bold",
    color: "#114B5F",
  },
  saveButton: {
    backgroundColor: "#114B5F",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  noteTitleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginTop: 50,
  },
  noteContentText: {
    fontSize: 18,
    color: "black",
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#114B5F",
  },
  modalButtonDelete: {
    backgroundColor: "#F45B69",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NoteScreen;
