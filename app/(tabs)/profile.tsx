import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // State for user info
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [story, setStory] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Handle profile image selection
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    // TODO: Implement save functionality
    console.log('Saving profile:', { name, age, gender, location, story, profileImage });
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Profile Picture Section */}
      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImagePlaceholder, { backgroundColor: isDark ? '#333' : '#eee' }]}>
            <Ionicons name="person" size={60} color={isDark ? '#999' : '#666'} />
          </View>
        )}
        <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
          <Text style={[styles.changePhotoText, { color: isDark ? '#fff' : '#000' }]}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      
      {/* User Info Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>User Information</Text>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Name or Nickname *</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#333' : '#f5f5f5',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#444' : '#ddd'
            }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={isDark ? '#999' : '#999'}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Age (optional)</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#333' : '#f5f5f5',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#444' : '#ddd'
            }]}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            placeholderTextColor={isDark ? '#999' : '#999'}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Gender Identity (optional)</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#333' : '#f5f5f5',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#444' : '#ddd'
            }]}
            value={gender}
            onChangeText={setGender}
            placeholder="Enter your gender identity"
            placeholderTextColor={isDark ? '#999' : '#999'}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Location (optional)</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#333' : '#f5f5f5',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#444' : '#ddd'
            }]}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
            placeholderTextColor={isDark ? '#999' : '#999'}
          />
        </View>
      </View>
      
      {/* Story Submission Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>Your Story</Text>
        <Text style={[styles.storyDescription, { color: isDark ? '#ccc' : '#666' }]}>
          Share your personal experience. This will help you connect with others who have gone through similar situations.
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.storyInput, { 
              backgroundColor: isDark ? '#333' : '#f5f5f5',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#444' : '#ddd'
            }]}
            value={story}
            onChangeText={setStory}
            placeholder="Write your story here..."
            placeholderTextColor={isDark ? '#999' : '#999'}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />
          <Text style={[styles.wordCount, { color: isDark ? '#999' : '#666' }]}>
            {story.length} characters
          </Text>
        </View>
      </View>
      
      {/* Save Button */}
      <TouchableOpacity 
        style={[styles.saveButton, { backgroundColor: isDark ? '#fff' : '#000' }]}
        onPress={handleSaveProfile}
      >
        <Text style={[styles.saveButtonText, { color: isDark ? '#000' : '#fff' }]}>
          Save Profile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  storyDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  storyInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
    minHeight: 200,
  },
  wordCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 