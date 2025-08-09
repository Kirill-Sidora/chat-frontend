import { ChatDataContext } from "src/contexts/СhatDataContext";
import { useContext } from "react";

export const useChatDataContext = () => {
    const context = useContext(ChatDataContext);
    if (!context) {
        throw new Error(
            "useChatDataContext must be used within ChatDataProvider"
        );
    }
    return context;
};
