const { createContext, useState, useContext } = require('react');

const ConversationContext = createContext(null);

export const ConversationProvider = ({ children }) => {
    const [selectedConversationId, setSelectedConversationId] = useState('');
    return (
        <ConversationContext.Provider value={{ selectedConversationId, setSelectedConversationId }}>
            {children}
        </ConversationContext.Provider>
    );
};

export const useConversation = () => useContext(ConversationContext);
