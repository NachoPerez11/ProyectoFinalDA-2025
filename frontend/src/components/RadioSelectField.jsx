export default function RadioSelectField({
  label,
  name,
  value,      // Espera un string ej: "admin"
  onChange,   // Devuelve un string
  options,
}) {
  return (
    <div className="multi-select-container">
      <span className="field-label">{label}</span>
      
      <div className="options-grid">
        {options.map((option) => {
          // Comparamos valor exacto
          const isSelected = value === option.value;
          
          return (
            <label 
              key={option.value} 
              className={`option-card ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={(e) => onChange(e.target.value)}
              />
              <span className="option-text">{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}