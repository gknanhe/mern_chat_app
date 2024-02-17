import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;

export const useTokenStore = create((set) => ({
  token: null, // Initial token state
  setToken: (newToken) => set((state) => ({ token: newToken })),
}));
