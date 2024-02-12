import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import io from "socket.io-client";

const socketEndpoint = "https://f37c-114-48-56-200.ngrok-free.app";

export default function App() {
  const [time, setTime] = useState(null);

  const handleSendWebSocketMessage = () => {
    const socket = io(socketEndpoint, {
      transports: ["websocket"],
    });
    socket.emit("button-clicked", { message: "Button clicked!" });
    socket.on("time-msg", (data) => {
      setTime(new Date(data.time).toString());
      socket.removeAllListeners();
      socket.disconnect();
    });
  };

  const handleResetTime = () => {
    setTime(null); // 時間をリセット
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
        Server time
      </Text>
      <Text style={styles.paragraph}>{time}</Text>
      {/* ボタンを中央に表示 */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSendWebSocketMessage}
      >
        <Text style={styles.buttonText}>Send WebSocket Message</Text>
      </TouchableOpacity>
      {/* リセットボタン */}
      <TouchableOpacity
        style={[styles.buttonContainer, styles.resetButton]} // 黒色のボタンと同じ大きさで赤色に設定
        onPress={handleResetTime}
      >
        <Text style={styles.buttonText}>Reset Time</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "red", // 赤色に設定
  },
});
