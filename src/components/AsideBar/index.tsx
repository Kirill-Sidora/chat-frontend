import { useState, type ReactElement } from "react";

const AsideBar = (): ReactElement => {
    const [searchTerm, setSearchTerm] = useState<string | number>("Search");
    const handleSubmit = (): void => {};
    return (
        <div className="aside-bar-container">
            <h3>Поиск сообщений</h3>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Введите текст сообщения..."
                    autoFocus
                />
                <button type="submit">Найти</button>
            </form>
        </div>
    );
};
export default AsideBar;
