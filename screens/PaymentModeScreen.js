// PaymentModeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { useNavigation } from "@react-navigation/native";

export default function PaymentModeScreen() {
  const [selectedTab, setSelectedTab] = useState("pay");
  const [isFrozen, setIsFrozen] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [cardData, setCardData] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    generateFakeCard();
  }, []);

  const generateFakeCard = () => {
    setCardData({
      number: faker.finance.creditCardNumber("#### #### #### ####"),
      expiry: "01/28",
      cvv: faker.finance.creditCardCVV(),
      name: faker.name.fullName(),
      avatar: faker.image.avatar(),
    });
  };

  const toggleFreeze = () => {
    Animated.timing(fadeAnim, {
      toValue: isFrozen ? 1 : 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsFrozen(!isFrozen);
  };

  const CardFront = () => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>YOLO</Text>
        <Image source={{ uri: cardData.avatar }} style={styles.avatar} />
      </View>
      <Text style={styles.cardNumber}>{cardData.number}</Text>
      <View style={styles.rowBetween}>
        <Text style={styles.cardDetail}>expiry {cardData.expiry}</Text>
        <Text style={styles.cardDetail}>cvv {isFrozen ? "***" : cardData.cvv}</Text>
      </View>
      <Text style={styles.copyText}>copy details</Text>
      <Text style={styles.cardFooter}>RuPay PREPAID</Text>
    </Animated.View>
  );

  const CardMasked = () => (
    <Animated.View style={[styles.card, styles.cardMasked]} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>select payment mode</Text>
      <Text style={styles.subtitle}>
        choose your preferred payment method to make payment.
      </Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "pay" && styles.activeTab]}
          onPress={() => setSelectedTab("pay")}
        >
          <Text style={[styles.tabText, selectedTab === "pay" && styles.activeTabText]}>pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "card" && styles.activeTab]}
          onPress={() => setSelectedTab("card")}
        >
          <Text style={[styles.tabText, selectedTab === "card" && styles.activeTabText]}>card</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardLabel}>YOUR DIGITAL DEBIT CARD</Text>

      <View style={styles.cardContainer}>
        {selectedTab === "card" ? <CardFront /> : <CardMasked />}
        <TouchableOpacity onPress={toggleFreeze} style={styles.freezeBtn}>
          <Ionicons name="snow" size={20} color="white" />
          <Text style={styles.freezeText}>{isFrozen ? "unfreeze" : "freeze"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}> 
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("YoloPay")}> 
          <Ionicons name="qr-code-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Genie")}> 
          <Ionicons name="sparkles" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    color: "white",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  activeTabText: {
    color: "red",
  },
  cardLabel: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 10,
  },
  cardContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    width: 250,
    height: 160,
    borderRadius: 16,
    backgroundColor: "#1e1e1e",
    padding: 15,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  cardMasked: {
    backgroundColor: "#333",
    opacity: 0.6,
  },
  cardTitle: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardNumber: {
    color: "white",
    fontSize: 18,
    letterSpacing: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDetail: {
    color: "#aaa",
    fontSize: 12,
  },
  copyText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  cardFooter: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  freezeBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  freezeText: {
    color: "red",
    marginLeft: 5,
    fontSize: 14,
  },
  navbar: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
