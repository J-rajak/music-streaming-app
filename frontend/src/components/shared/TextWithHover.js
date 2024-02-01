const TextWithHover = ({ displayText, active }) => {
  return (
    <div className="flex items-center justify-start cursor-pointer">
      <div
        className={`${
          active ? "text-black" : "text-white"
        } text font-medium hover:text-black`}
      >
        {displayText}
      </div>
    </div>
  );
};

export default TextWithHover;
