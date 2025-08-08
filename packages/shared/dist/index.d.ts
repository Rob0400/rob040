declare const appName = "Rob04 Connect";
type UserId = string;
type ChatId = string;
interface UserProfile {
    id: UserId;
    displayName: string;
    avatarUrl?: string;
    bio?: string;
    publicKey?: string;
}
type MessageType = 'text' | 'image' | 'video' | 'status' | 'system';
interface MessagePayload {
    id: string;
    chatId: ChatId;
    senderId: UserId;
    createdAt: string;
    type: MessageType;
    text?: string;
    mediaUrl?: string;
    e2e?: boolean;
}
interface SmartReplySuggestion {
    text: string;
    confidence: number;
}
declare const brand: {
    colors: {
        primary: string;
        primaryAccent: string;
        secondary: string;
        glow: string;
        darkBg: string;
    };
};

export { type ChatId, type MessagePayload, type MessageType, type SmartReplySuggestion, type UserId, type UserProfile, appName, brand };
