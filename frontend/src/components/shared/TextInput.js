const TextInput = ({
  label,
  placeholder,
  className,
  value,
  setValue,
  labelClassName,
}) => {
  return (
    <div>
    {/* // <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}> */}
      {/* <label for={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label> */}
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full p-4 text-lg rounded-sm bg-black"
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default TextInput;
