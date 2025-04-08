# Project Overview
Use this guide to build the following mobile app. You Are Not Alone is a mobile application designed to connect individuals through shared personal experiences, particularly those involving emotional struggles. Inspired by platforms like Bumble, the app focuses on fostering empathy and support by matching users based on the content and themes of their submitted stories.

Users create a profile and submit a personal story related to challenges such as grief, trauma, illness, or stress. These stories are categorized using a language model-based classification system, which enables the app to suggest meaningful connections with others who have gone through similar experiences.

# You Are Not Alone – Frontend Requirements

A mobile app with a sleek, modern design inspired by **Bumble**, using a **black-and-white theme**. The app has **three main tabs**: **Profile**, **Connections**, and **Chats**.

---

## General Design Requirements
- **Color Scheme**: Black-and-white theme with grayscale gradients for depth and accessibility.
- **Typography**: Clean, sans-serif font with clear visual hierarchy.
- **Animations**: Smooth transitions, subtle card animations.
- **Responsiveness**: Scales across Android and iOS devices.

---

## App Layout & Navigation
- **Bottom Navigation Bar**:
  - **Left tab**: `Profile`
  - **Middle tab (default)**: `Connections`
  - **Right tab**: `Chats`
- Tabs display minimalist icons with labels.
- Active tab indicated by a thin white underline.

---

## Connections Tab (Middle)
Main discovery screen showing potential matches based on story categorization.

- **Card Stack UI** (Bumble-style):
  - Includes:
    - Username or pseudonym
    - Summary of story (first few lines)
    - Swipe right to connect, left to skip

- **Connection Confirmation Modal**:
  - Pops up when both users connect
  - Options to start chatting or return to browsing

---

## Profile Tab (Left)
User profile setup and story submission.

- **User Info Section**:
  - Fields:
    - Name or nickname
    - Age (optional)
    - Gender identity (optional)
    - Location (optional)

- **Story Submission**:
  - Text input for story (with word limit)

- **Profile Picture**:
  - Upload avatar or use placeholder

- **Save Button**:
  - Validates and submits profile/story to backend

---

## Chats Tab (Right)
Messaging interface for connected users.

- **Chat List View**:
  - Shows:
    - User profile name/picture
    - Last message preview
    - Timestamp

- **Chat Window**:
  - Standard messaging UI:
    - Bubble style (dark on white)
    - Text input + send button
