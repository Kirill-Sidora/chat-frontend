import CustomButton from "@components/CustomButton";
import MessageSearchBar from "@components/MessageSearchBar";
import SearchedMessages from "@components/SearchedMessages/indes";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useState, type ReactElement } from "react";
import { TClientMessage } from "@app-types/message";
import "./style.css";

const AsideBar = (): ReactElement => {
    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<TClientMessage[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { messages } = useChatDataContext();

    const textButton = !isAsideOpen ? "Open" : "Close";

    const handleSearch = (query: string): void => {
        if (!query.trim()) {
            return;
        }

        const results: TClientMessage[] = messages.filter((message) =>
            message.text.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
    };

    const handleCloseAside = (): void => {
        setIsAsideOpen(!isAsideOpen);
    };

    return (
        <div className="aside-bar-container">
            <CustomButton type="close-aside" onClick={handleCloseAside}>
                {textButton}
            </CustomButton>
            {isAsideOpen && (
                <div className="aside-bar">
                    <div className="aside-header-block">
                        <h3 className="aside-header">Search messages</h3>
                    </div>
                    <div className="search-bar">
                        <MessageSearchBar
                            onSearch={handleSearch}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>
                    <SearchedMessages
                        searchResults={searchResults}
                        searchQuery={searchQuery}
                    />
                </div>
            )}
        </div>
    );
};

export default AsideBar;
