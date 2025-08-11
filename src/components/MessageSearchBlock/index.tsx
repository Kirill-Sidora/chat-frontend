import SearchedMessages from "@components/SearchedMessages/indes";
import { useState, type ReactElement, FormEvent, useEffect } from "react";
import { TClientMessage, ITextMessage } from "@app-types/message";
import { useChatDataContext } from "@contexts/СhatDataContext";
import "./style.css";

const MessageSearchBlock = (): ReactElement => {
    const [searchResults, setSearchResults] = useState<TClientMessage[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const { messages } = useChatDataContext();

    useEffect(() => {
        setSearchResults([]);
        setIsSearched(false);
    }, [searchQuery]);

    const handleSearch = (query: string): void => {
        if (!query.trim()) {
            return;
        }

        const results: TClientMessage[] = messages.filter(
            (message): message is ITextMessage =>
                "text" in message &&
                message.text.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
        setIsSearched(true);
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    return (
        <div className="aside-bar">
            <div className="search-bar">
                <form
                    onSubmit={handleSubmit}
                    className="message-search-form primary-text"
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        autoFocus
                    />
                </form>
            </div>
            {!searchQuery.trim() ? (
                <div className="search-placeholder primary-text">
                    <p>Enter a query to search messages</p>
                </div>
            ) : !isSearched ? (
                <div className="search-placeholder primary-text">
                    <p>Press Enter to search messages</p>
                </div>
            ) : (
                <SearchedMessages
                    searchResults={searchResults}
                    searchQuery={searchQuery}
                />
            )}
        </div>
    );
};
export default MessageSearchBlock;
