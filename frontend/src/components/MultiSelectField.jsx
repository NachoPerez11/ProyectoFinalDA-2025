export default function MultiSelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="multi-select-container">
      <span className="field-label">{label}</span>
      
      <div className="options-grid">
        {options.map((option) => {
          const isSelected = value?.includes(option.value);
          
          return (
            <label 
              key={option.value} 
              className={`option-card ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                name={name}
                checked={isSelected}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...(value || []), option.value]
                    : (value || []).filter((v) => v !== option.value);
                  onChange(newValue);
                }}
              />
              <span className="option-text">{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}