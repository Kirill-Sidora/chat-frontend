import React from "react";
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
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasBeenTouched, setHasBeenTouched] = React.useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value, name);
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (!hasBeenTouched) {
            setHasBeenTouched(true);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const getPlaceholderClass = () => {
        if (value) return "has-value";
        if (isFocused) return "focused";
        if (hasBeenTouched) return "touched";
        return "untouched";
    };

    return (
        <div className="custom-input-container">
            <input
                type="text"
                className={`custom-input ${className} ${invalid ? "invalid" : ""} ${
                    disabled ? "disabled" : ""
                } placeholder-${getPlaceholderClass()}`}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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