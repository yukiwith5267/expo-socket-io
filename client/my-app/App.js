import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const socketEndpoint = "https://be76-114-48-56-200.ngrok-free.app/control_servo";

export default function App() {
  const handleSendWebSocketMessage = async () => {
    try {
      const response = await fetch(socketEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command: 'toggle',
          parameter: 'default',
          commandType: 'command',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send POST request');
      }

      console.log('POST request successfully sent');
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSendWebSocketMessage}
      >
        <Text style={styles.buttonText}>Send POST Request</Text>
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
});
