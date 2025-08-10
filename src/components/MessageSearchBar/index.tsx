import { FormEvent, ReactElement } from "react";

interface IMessageSearchBar {
    onSearch: (query: string) => void;
    setSearchQuery: (value: string) => void;
    searchQuery: string;
}

const MessageSearchBar = ({
    onSearch,
    searchQuery,
    setSearchQuery,
}: IMessageSearchBar): ReactElement => {
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        onSearch(searchQuery);
    };
    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите текст сообщения..."
                autoFocus
            />
            <button type="submit">Найти</button>
        </form>
    );
};

export default MessageSearchBar;
