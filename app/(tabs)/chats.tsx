import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define types for our data
interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string | null;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

// Mock data for chat list
const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Sarah',
    lastMessage: 'Thank you for sharing your story. It really resonated with me.',
    timestamp: '10:30 AM',
    avatar: null,
  },
  {
    id: '2',
    name: 'Michael',
    lastMessage: 'I understand what you\'re going through. It gets better with time.',
    timestamp: 'Yesterday',
    avatar: null,
  },
  {
    id: '3',
    name: 'Emma',
    lastMessage: 'Have you tried talking to a counselor? It helped me a lot.',
    timestamp: '2 days ago',
    avatar: null,
  },
];

// Mock data for messages in a chat
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi there! I read your story about grief and wanted to connect.',
    sender: 'them',
    timestamp: '10:15 AM',
  },
  {
    id: '2',
    text: 'Thank you for reaching out. It means a lot to me.',
    sender: 'me',
    timestamp: '10:20 AM',
  },
  {
    id: '3',
    text: 'I lost my father last year, and I know how difficult it can be.',
    sender: 'them',
    timestamp: '10:25 AM',
  },
  {
    id: '4',
    text: 'Thank you for sharing that. How are you coping now?',
    sender: 'me',
    timestamp: '10:30 AM',
  },
];

export default function ChatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // State for chat list and active chat
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  
  // Handle selecting a chat
  const handleSelectChat = (chat: Chat) => {
    setActiveChat(chat);
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    // In a real app, this would send the message to a backend
    console.log('Sending message:', messageText);
    
    // Clear the input
    setMessageText('');
  };
  
  // Render a chat list item
  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity 
      style={[styles.chatItem, { backgroundColor: isDark ? '#222' : '#f9f9f9' }]}
      onPress={() => handleSelectChat(item)}
    >
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: isDark ? '#444' : '#ddd' }]}>
            <Text style={[styles.avatarText, { color: isDark ? '#fff' : '#000' }]}>
              {item.name.charAt(0)}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeaderRow}>
          <Text style={[styles.chatName, { color: isDark ? '#fff' : '#000' }]}>
            {item.name}
          </Text>
          <Text style={[styles.chatTime, { color: isDark ? '#999' : '#666' }]}>
            {item.timestamp}
          </Text>
        </View>
        <Text 
          style={[styles.lastMessage, { color: isDark ? '#ccc' : '#666' }]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  // Render a message in the chat window
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessage : styles.theirMessage,
      { backgroundColor: item.sender === 'me' 
        ? (isDark ? '#444' : '#e6f7ff') 
        : (isDark ? '#333' : '#f0f0f0') 
      }
    ]}>
      <Text style={[styles.messageText, { color: isDark ? '#fff' : '#000' }]}>
        {item.text}
      </Text>
      <Text style={[styles.messageTime, { color: isDark ? '#999' : '#999' }]}>
        {item.timestamp}
      </Text>
    </View>
  );
  
  // If a chat is selected, show the chat window
  if (activeChat) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        {/* Chat Header */}
        <View style={[styles.chatHeaderContainer, { backgroundColor: isDark ? '#111' : '#f9f9f9' }]}>
          <TouchableOpacity onPress={() => setActiveChat(null)}>
            <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            {activeChat.avatar ? (
              <Image source={{ uri: activeChat.avatar }} style={styles.headerAvatar} />
            ) : (
              <View style={[styles.headerAvatarPlaceholder, { backgroundColor: isDark ? '#444' : '#ddd' }]}>
                <Text style={[styles.avatarText, { color: isDark ? '#fff' : '#000' }]}>
                  {activeChat.name.charAt(0)}
                </Text>
              </View>
            )}
            <Text style={[styles.headerName, { color: isDark ? '#fff' : '#000' }]}>
              {activeChat.name}
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
        
        {/* Messages */}
        <FlatList
          data={mockMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          inverted={false}
        />
        
        {/* Message Input */}
        <View style={[styles.inputContainer, { backgroundColor: isDark ? '#111' : '#f9f9f9' }]}>
          <TextInput
            style={[styles.messageInput, { 
              backgroundColor: isDark ? '#333' : '#fff',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#444' : '#ddd'
            }]}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor={isDark ? '#999' : '#999'}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, { backgroundColor: isDark ? '#fff' : '#000' }]}
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={20} color={isDark ? '#000' : '#fff'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // Otherwise, show the chat list
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#111' : '#f9f9f9' }]}>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>
          Chats
        </Text>
      </View>
      
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatList: {
    padding: 8,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatTime: {
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
  },
  messagesContainer: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  messageInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 