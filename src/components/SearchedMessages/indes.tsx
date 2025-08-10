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
    searchQuery,
}: ISearchedMessages): ReactElement => {
    if (!searchQuery.trim()) {
        return (
            <div className="search-placeholder">
                <p>Введите запрос для поиска сообщений</p>
            </div>
        );
    }
    if (searchResults.length === 0) {
        return (
            <div className="no-results">
                <p>Сообщения не найдены</p>
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
