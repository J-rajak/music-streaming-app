const TextInput = ({ label, placeholder }) => {
  return (
    <div className="textInputDiv flex flex-col space-y-2 w-full">
      <label for={label} className="font-semibold">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        className="p-3 border border-gray-600 border-solid rounded placeholder-gray-400"
        id={label}
      ></input>
    </div>
  );
};

export default TextInput;
