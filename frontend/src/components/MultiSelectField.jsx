export default function MultiSelectField({
  label,
  name,
  value,
  onChange,
  options,
  ...props
}) {
  return <>
    <fieldset>
        <legend>{label}</legend>
        {options.map(option => (
            <label>
                <input type="checkbox" 
                    name={name}
                    checked={value?.includes(option.value)}
                    onChange={e => {
                        const newValue = e.target.checked? [...(value || []), option.value]:
                            (value || []).filter(v => v !== option.value);
                        onChange(newValue);
                    }} />
            </label>
        ))}
    </fieldset>
  </>
}