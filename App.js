/**
 * App.js - Assistente Acadêmico (interface estilo chat de mensagens).
 */
import React from "react";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatScreen from "./src/screens/ChatScreen";

function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
