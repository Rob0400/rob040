export const appName = 'Rob04 Connect';
export type UserId = string;
export type ChatId = string;

export interface UserProfile {
  id: UserId;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  publicKey?: string; // base64
}

export type MessageType = 'text' | 'image' | 'video' | 'status' | 'system';

export interface MessagePayload {
  id: string;
  chatId: ChatId;
  senderId: UserId;
  createdAt: string; // ISO
  type: MessageType;
  text?: string;
  mediaUrl?: string;
  e2e?: boolean;
}

export interface SmartReplySuggestion {
  text: string;
  confidence: number; // 0..1
}

export const brand = {
  colors: {
    primary: '#6C63FF',
    primaryAccent: '#7B7BFF',
    secondary: '#4C1D95',
    glow: '#00E5FF',
    darkBg: '#0B0B1A',
  },
};
