import React, { useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { Card, Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

interface CardItem {
  id: string;
  date: string;
  title: string;
  content: string;
  importance: string;
}

const DashboardScreen: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const fetchNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        setCards(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes.", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, [])
  );

  const navigateToNoteScreen = (noteId: string) => {
    navigation.navigate("Note", { noteId });
  };

  const navigateToFormScreen = () => {
    navigation.navigate("Form");
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const renderCardContent = (content: string) => {
    const maxLength = 50;
    return truncateText(content, maxLength);
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

  const screenWidth = Dimensions.get("window").width;
  const cardContainerWidth = screenWidth * 0.9;

  const getTextColorByImportance = (importance: string) => {
    return importance === "Important" ? "#fff" : "#114B5F";
  };

  const renderItem = ({ item }: { item: CardItem }) => (
    <TouchableOpacity onPress={() => navigateToNoteScreen(item.id)}>
      <View style={[styles.cardContainer, { width: cardContainerWidth }]}>
        <Card
          style={[
            styles.card,
            { backgroundColor: getColorByImportance(item.importance) },
          ]}
        >
          <View style={styles.dateTag}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          <Card.Content>
            <Text
              style={[
                styles.cardTitle,
                { color: getTextColorByImportance(item.importance) },
              ]}
            >
              Title: {item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={[
                styles.cardContent,
                { color: getTextColorByImportance(item.importance) },
              ]}
            >
              Content: {renderCardContent(item.content)}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.Content
            titleStyle={styles.dashboardTitle}
            title="Dashboard"
            subtitle="Subtitle"
          />
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="plus"
              style={styles.addButton}
              onPress={navigateToFormScreen}
            />
          </View>
        </Appbar.Header>

        <FlatList
          data={cards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scrollViewContainer}
          ListEmptyComponent={
            <Text style={styles.noCardsMessage}>No cards available</Text>
          }
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 40,
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingVertical: 40,
    alignItems: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: "100%",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#114B5F",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    position: "relative",
  },
  dashboardTitle: {
    fontWeight: "bold",
    color: "#114B5F",
    marginTop: 10,
  },
  dateTag: {
    width: 100,
    backgroundColor: "#114B5F",
    borderRadius: 7,
    padding: 5,
    position: "absolute",
    top: -12,
    right: -12,
  },
  dateText: {
    color: "#fff",
    textAlign: "center",
  },
  cardTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    fontSize: 18,
    color: "#114B5F",
    fontWeight: "bold",
  },
  noCardsMessage: {
    fontSize: 18,
    color: "#114B5F",
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#114B5F",
    padding: 7,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    color: "white",
    fontSize: 30,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default DashboardScreen;
