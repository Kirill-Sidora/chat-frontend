import { useState } from "react";
import "./style.css";

interface CustomInputProps {
    disabled?: boolean;
    placeholder?: string;
    invalid?: boolean;
    value: string;
    onChange: (value: string, name?: string) => void;
    name?: string;
    className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    disabled = false,
    placeholder = "",
    invalid = false,
    value,
    onChange,
    name,
    className = "",
}) => {
    const [hasBeenTouched, setHasBeenTouched] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, name);
    };

    const handleFocus = () => {
        if (!hasBeenTouched) {
            setHasBeenTouched(true);
        }
    };

    const placeholderClass = hasBeenTouched ? "touched" : "untouched";

    const inputClassName = [
        "custom-input",
        className,
        invalid ? "invalid" : "",
        disabled ? "disabled" : "",
        `placeholder-${placeholderClass}`,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="custom-input-container">
            <input
                type="text"
                className={inputClassName}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                disabled={disabled}
                name={name}
            />
            {invalid && (
                <div className="input-error-text error-message">Invalid value</div>
            )}
        </div>
    );
};

export default CustomInput;
