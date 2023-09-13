import { FormGroup, Input, InputGroup } from "reactstrap";

import InputAddon from "./InputAddon";

function InputBox({
  placeholder,
  type = "text",
  addonText,
  addonIcon,
  addonStyle,
  value,
  onChange,
  options,
  name,
  readonly,
  title,
  multiple,
  accept,
  disabled,
  label,
  valid
}) {
  return (
    <FormGroup className={`mb-3`}>
      {label && <label className="text-sm">{label}</label>}
      <InputGroup className="input-group-alternative">
        <InputAddon text={addonText} icon={addonIcon} styles={addonStyle} />
        {type === "select" ? (
          <Input
            type={type}
            value={value}
            onChange={onChange}
            className={`form-control ${valid && `is-${valid}`}`}
            name={name}
            readOnly={readonly ? true : false}
            disabled={disabled}
          >
            {options.map((option, index) => (
              <option value={option.value} key={index}>
                {option.text}
              </option>
            ))}
          </Input>
        ) : type === "file" ? (
          <Input
            type={type}
            filename={value}
            onChange={onChange}
            name={name}
            readOnly={readonly ? true : false}
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            className={`form-control ${valid && `is-${valid}`}`}
          />
        ) : (
          <Input
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            readOnly={readonly ? true : false}
            title={title}
            disabled={disabled}
            className={`${valid && `is-${valid}`}`}
          />
        )}
      </InputGroup>
    </FormGroup>
  );
}

export default InputBox;
