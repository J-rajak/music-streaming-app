const TextInput = ({ label, placeholder, value, setValue }) => {
  return (
    <div>
      {/* // <div className="textInputDiv flex flex-col space-y-2 w-full">
    //   <label for={label} className="font-semibold">
    //     {label}
    //   </label> */}
      <input
        type="password"
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
