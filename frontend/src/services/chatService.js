import instance from "../utils/axiosCustomize";

// Conversation services
export const getConversationByChatSessionId = async (chatSessionId) => {
  return await instance.get(`api/v1/conversation/${chatSessionId}`);
};

export const postConversation = async (data) => {
  return await instance.post(`api/v1/conversation`, data);
};

// Chat sessions services
export const postChatSession = async (data) => {
  return await instance.post(`api/v1/chat-sessions`, data);
};

export const getChatSessionById = async (chatSessionId) => {
  return await instance.get(`api/v1/chat-sessions/${chatSessionId}`);
};

export const getChatSessions = async (userId, page, limit) => {
  try {
    const response = await instance.get(
      `api/v1/chat-sessions/user/${userId}?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    throw error;
  }
};

export const updateChatSession = async (id, data) => {
  try {
    const response = await instance.put(`api/v1/chat-sessions/${id}`, data);
    console.log("Chat session updated:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating chat session:", error);
    throw error;
  }
};

export const updateThreadIdChatSession = async (id, data) => {
  return await instance.put(`api/v1/chat-sessions/thread/${id}`, data);
};

export const removeChatSession = async (id) => {
  try {
    await instance.delete(`api/v1/chat-sessions/${id}`);
  } catch (error) {
    console.error("Error deleting chat session:", error);
    throw error;
  }
};

// Add total service
export const getTotalChatSessions = async (userId) => {
  try {
    const response = await instance.get(
      `api/v1/chat-sessions/user/${userId}/total`
    );
    console.log("Total chat sessions:", response.totalChatSessions);
    return response.totalChatSessions;
  } catch (error) {
    console.error("Error fetching total chat sessions:", error);
    throw error;
  }
};

// Get list of images
export const getImageMessagesByUserId = async (userId) => {
  try {
    const response = await instance.get(`api/v1/chat-sessions/image-messages/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching image messages:", error);
    throw error;
  }
};
