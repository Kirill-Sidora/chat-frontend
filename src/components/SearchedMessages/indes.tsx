import SearchMessageCard from "@components/SearchResultCard";
import { TClientMessage } from "@app-types/message";
import { ReactElement } from "react";
import "./style.css";

interface ISearchedMessages {
    searchResults: TClientMessage[];
    searchQuery: string;
}

const SearchedMessages = ({
    searchResults,
}: ISearchedMessages): ReactElement => {
    if (searchResults.length === 0) {
        return (
            <div className="no-results">
                <p>No messages found</p>
            </div>
        );
    }
    return (
        <div className="searched-messages">
            {searchResults.map((message) => (
                <SearchMessageCard key={message.id} message={message} />
            ))}
        </div>
    );
};

export default SearchedMessages;
