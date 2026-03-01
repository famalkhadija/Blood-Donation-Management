export default function Button({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
    >
      {text}
    </button>
  );
}