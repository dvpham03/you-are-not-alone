import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  PanResponder, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  Modal,
  SafeAreaView
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define types for our data
interface Connection {
  id: string;
  name: string;
  age?: number;
  story: string;
  avatar: string | null;
}

// Mock data for potential connections
const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    story: 'I lost my mother to cancer last year. It was a difficult journey, but I\'ve learned to find strength in the memories we shared. I\'m looking to connect with others who understand this kind of loss.',
    avatar: null,
  },
  {
    id: '2',
    name: 'Michael',
    age: 34,
    story: 'After my divorce, I struggled with depression for a long time. Therapy helped me rebuild my life, and now I want to support others going through similar experiences.',
    avatar: null,
  },
  {
    id: '3',
    name: 'Emma',
    age: 25,
    story: 'Living with anxiety has been challenging, especially during the pandemic. I\'ve found that talking to others who understand helps me feel less alone.',
    avatar: null,
  },
  {
    id: '4',
    name: 'David',
    age: 31,
    story: 'I was diagnosed with PTSD after serving in the military. Connecting with others who have similar experiences has been crucial to my recovery journey.',
    avatar: null,
  },
  {
    id: '5',
    name: 'Jessica',
    age: 29,
    story: 'My brother\'s suicide left a void in my life that I\'m still learning to navigate. I hope to connect with others who understand this specific type of grief.',
    avatar: null,
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default function ConnectionsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // State for connections and modal
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedConnection, setMatchedConnection] = useState<Connection | null>(null);
  
  // Animation values
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });
  
  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;
  
  // Force swipe in a direction
  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };
  
  // Reset card position
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };
  
  // Handle swipe completion
  const onSwipeComplete = (direction: 'right' | 'left') => {
    const item = connections[0];
    direction === 'right' ? handleConnect(item) : handleSkip(item);
    
    position.setValue({ x: 0, y: 0 });
    setConnections((prevConnections) => prevConnections.slice(1));
  };
  
  // Handle connecting with a user
  const handleConnect = (connection: Connection) => {
    // In a real app, this would send a connection request to the backend
    console.log('Connecting with:', connection.name);
    
    // Simulate a match (30% chance)
    if (Math.random() < 0.3) {
      setMatchedConnection(connection);
      setShowMatchModal(true);
    }
  };
  
  // Handle skipping a user
  const handleSkip = (connection: Connection) => {
    console.log('Skipping:', connection.name);
  };
  
  // Get card style based on position
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };
  
  // Render a connection card
  const renderCard = (connection: Connection) => {
    if (!connection) return null;
    
    return (
      <Animated.View
        key={connection.id}
        style={[getCardStyle(), styles.cardStyle]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.card, { backgroundColor: isDark ? '#222' : '#fff' }]}>
          <View style={styles.cardHeader}>
            {connection.avatar ? (
              <Image source={{ uri: connection.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: isDark ? '#444' : '#ddd' }]}>
                <Text style={[styles.avatarText, { color: isDark ? '#fff' : '#000' }]}>
                  {connection.name.charAt(0)}
                </Text>
              </View>
            )}
            <View style={styles.nameContainer}>
              <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>
                {connection.name}
              </Text>
              {connection.age && (
                <Text style={[styles.age, { color: isDark ? '#ccc' : '#666' }]}>
                  {connection.age}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.storyContainer}>
            <Text style={[styles.storyLabel, { color: isDark ? '#ccc' : '#666' }]}>
              Their Story
            </Text>
            <Text style={[styles.story, { color: isDark ? '#fff' : '#000' }]}>
              {connection.story}
            </Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.connectButton, { backgroundColor: isDark ? '#fff' : '#000' }]}
              onPress={() => forceSwipe('right')}
            >
              <Ionicons name="heart" size={30} color={isDark ? '#000' : '#fff'} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.skipButton, { backgroundColor: isDark ? '#444' : '#f0f0f0' }]}
              onPress={() => forceSwipe('left')}
            >
              <Ionicons name="close" size={30} color={isDark ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };
  
  // Render the match modal
  const renderMatchModal = () => {
    if (!matchedConnection) return null;
    
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showMatchModal}
        onRequestClose={() => setShowMatchModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#222' : '#fff' }]}>
            <Text style={[styles.matchTitle, { color: isDark ? '#fff' : '#000' }]}>
              It's a Match!
            </Text>
            
            <View style={styles.matchProfiles}>
              <View style={styles.matchProfile}>
                {matchedConnection.avatar ? (
                  <Image source={{ uri: matchedConnection.avatar }} style={styles.matchAvatar} />
                ) : (
                  <View style={[styles.matchAvatarPlaceholder, { backgroundColor: isDark ? '#444' : '#ddd' }]}>
                    <Text style={[styles.avatarText, { color: isDark ? '#fff' : '#000' }]}>
                      {matchedConnection.name.charAt(0)}
                    </Text>
                  </View>
                )}
                <Text style={[styles.matchName, { color: isDark ? '#fff' : '#000' }]}>
                  {matchedConnection.name}
                </Text>
              </View>
              
              <View style={styles.matchProfile}>
                <View style={[styles.matchAvatarPlaceholder, { backgroundColor: isDark ? '#444' : '#ddd' }]}>
                  <Text style={[styles.avatarText, { color: isDark ? '#fff' : '#000' }]}>
                    You
                  </Text>
                </View>
                <Text style={[styles.matchName, { color: isDark ? '#fff' : '#000' }]}>
                  You
                </Text>
              </View>
            </View>
            
            <Text style={[styles.matchMessage, { color: isDark ? '#ccc' : '#666' }]}>
              You and {matchedConnection.name} have connected based on your shared experiences.
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.keepBrowsingButton, { backgroundColor: isDark ? '#444' : '#f0f0f0' }]}
                onPress={() => setShowMatchModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: isDark ? '#fff' : '#000' }]}>
                  Keep Browsing
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.startChatButton, { backgroundColor: isDark ? '#fff' : '#000' }]}
                onPress={() => {
                  setShowMatchModal(false);
                  // In a real app, this would navigate to the chat with this user
                  console.log('Starting chat with:', matchedConnection.name);
                }}
              >
                <Text style={[styles.modalButtonText, { color: isDark ? '#000' : '#fff' }]}>
                  Start Chatting
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#111' : '#f9f9f9' }]}>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>
          Connections
        </Text>
      </View>
      
      <View style={styles.cardContainer}>
        {connections.map((connection, index) => {
          if (index === 0) {
            return renderCard(connection);
          }
          return null;
        })}
      </View>
      
      {connections.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="people" size={60} color={isDark ? '#666' : '#999'} />
          <Text style={[styles.emptyStateText, { color: isDark ? '#ccc' : '#666' }]}>
            No more connections to show
          </Text>
          <Text style={[styles.emptyStateSubtext, { color: isDark ? '#999' : '#999' }]}>
            Check back later for new matches
          </Text>
        </View>
      )}
      
      {renderMatchModal()}
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
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 250, // Reduced height to ensure buttons are visible
  },
  card: {
    flex: 1,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  nameContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  age: {
    fontSize: 20,
    marginTop: 2,
  },
  storyContainer: {
    flex: 1,
    marginBottom: 20,
  },
  storyLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  story: {
    fontSize: 18,
    lineHeight: 28,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Changed from space-around to space-between
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20, // Added padding to position buttons at edges
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  connectButton: {
    borderWidth: 1,
    borderColor: '#000',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  matchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  matchProfiles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  matchProfile: {
    alignItems: 'center',
  },
  matchAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  matchAvatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  keepBrowsingButton: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  startChatButton: {
    borderWidth: 1,
    borderColor: '#000',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
