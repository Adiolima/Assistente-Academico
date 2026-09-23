import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import ChatsListScreen from "../screens/ChatsListScreen";
import ChatScreen from "../screens/ChatScreen";
import UpdatesScreen from "../screens/UpdatesScreen";
import CommunitiesScreen from "../screens/CommunitiesScreen";
import CallsScreen from "../screens/CallsScreen";
import BottomTabs from "../components/BottomTabs";

export default function AppNavigator() {
  const [tab, setTab] = useState("chats");
  const [openChat, setOpenChat] = useState(null);
  const [listTick, setListTick] = useState(0);

  const handleOpenChat = useCallback((contact) => {
    setOpenChat(contact);
  }, []);

  const handleBack = useCallback(() => {
    setOpenChat(null);
    setListTick((n) => n + 1);
  }, []);

  if (openChat) {
    return <ChatScreen contact={openChat} onBack={handleBack} />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.page}>
        {tab === "chats" ? (
          <ChatsListScreen onOpenChat={handleOpenChat} refreshKey={listTick} />
        ) : null}
        {tab === "updates" ? <UpdatesScreen /> : null}
        {tab === "communities" ? <CommunitiesScreen /> : null}
        {tab === "calls" ? <CallsScreen /> : null}
      </View>
      <BottomTabs active={tab} onChange={setTab} unreadChats={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  page: { flex: 1 },
});
