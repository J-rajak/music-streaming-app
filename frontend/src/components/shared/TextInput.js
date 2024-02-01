const TextInput = ({ label, placeholder, className }) => {
  return (
    <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
      <label for={label} className="font-semibold">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-3 border border-gray-600 border-solid rounded placeholder-gray-400"
        id={label}
      ></input>
    </div>
  );
};

export default TextInput;
