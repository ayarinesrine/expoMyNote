// import React, { useEffect, useState } from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import {
//   GestureHandlerRootView,
//   TouchableOpacity,
// } from "react-native-gesture-handler";
// import { Appbar, Card } from "react-native-paper";
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
//           <View style={styles.innerContent}>
//             <View style={styles.dateTag}>
//               <Text style={styles.dateText}>Date: {note.date}</Text>
//             </View>
//             <View>
//               <Text style={styles.noteTitleText}>Title: {note.title}</Text>
//             </View>
//             <View>
//               <Text style={styles.noteContentText}>
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
//     paddingHorizontal: 5,
//     paddingVertical: 20,
//     backgroundColor: "white",
//   },
//   innerContent: {
//     flex: 1,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: "red",
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
//   card: {
//     flex: 1,
//     width: "100%",
//     borderRadius: 8,
//     elevation: 3,
//     position: "relative",
//     padding: 20,
//   },
//   cardContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
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
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Appbar, Card } from "react-native-paper";
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

  const handleSave = () => {
    Alert.alert("Save", "Note saved successfully.");
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
          <TouchableOpacity style={styles.saveButton} onPress={handleDelete}>
            <MaterialCommunityIcons name="delete" size={22} color="white" />
          </TouchableOpacity>
        </Appbar.Header>
        <View style={styles.container}>
          <View style={styles.innerContent}>
            <View style={styles.dateTag}>
              <Text style={styles.dateText}>Date: {note.date}</Text>
            </View>
            <View>
              <Text style={styles.noteTitleText}>Title: {note.title}</Text>
            </View>
            <View>
              <Text style={styles.noteContentText}>
                Content: {note.content}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  innerContent: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "red",
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
  card: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    elevation: 3,
    position: "relative",
    padding: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default NoteScreen;
