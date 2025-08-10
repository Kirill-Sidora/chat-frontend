import SearchedMessages from "@components/SearchedMessages/indes";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useState, type ReactElement, FormEvent } from "react";
import { TClientMessage } from "@app-types/message";
import "./style.css";

const MessageSearchBlock = (): ReactElement => {
    const [searchResults, setSearchResults] = useState<TClientMessage[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { messages } = useChatDataContext();

    const handleSearch = (query: string): void => {
        if (!query.trim()) {
            return;
        }

        const results: TClientMessage[] = messages.filter((message) =>
            message.text.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    return (
        <div className="aside-bar">
            <div className="aside-header-block">
                <h3 className="aside-header">Search messages</h3>
            </div>
            <div className="search-bar">
                <form onSubmit={handleSubmit} className="message-search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        autoFocus
                    />
                </form>
            </div>
            <SearchedMessages
                searchResults={searchResults}
                searchQuery={searchQuery}
            />
        </div>
    );
};
export default MessageSearchBlock;
