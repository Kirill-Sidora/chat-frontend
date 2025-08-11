import SearchedMessages from "@components/SearchedMessages/indes";
import { useState, type ReactElement, FormEvent, useEffect } from "react";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { isValidMessage } from "@utils/constants";
import { ITextMessage } from "@app-types/message";
import "./style.css";

const MessageSearchBlock = (): ReactElement => {
    const [searchResults, setSearchResults] = useState<ITextMessage[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const { messages } = useChatDataContext();

    useEffect(() => {
        setSearchResults([]);
        setIsSearched(false);
    }, [searchQuery]);

    const handleSearch = (query: string): void => {
        if (!isValidMessage(query)) {
            return;
        }

        const results: ITextMessage[] = messages.filter(
            (message): message is ITextMessage =>
                "text" in message &&
                message.text.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
        setIsSearched(true);
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        handleSearch(searchQuery);
    };

    return (
        <div className="message-search-block">
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

            {!searchQuery.trim() && (
                <div className="search-placeholder primary-text">
                    <p>Enter a query to search messages</p>
                </div>
            )}
            {searchQuery.trim() && !isSearched && (
                <div className="search-placeholder primary-text">
                    <p>Press Enter to search messages</p>
                </div>
            )}
            {searchQuery.trim() && isSearched && (
                <SearchedMessages
                    searchResults={searchResults}
                    searchQuery={searchQuery}
                />
            )}
        </div>
    );
};
export default MessageSearchBlock;
