import { useState, useCallback, useEffect } from "react";

const App = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = useCallback(() => {
    let newPassword = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumbers) characters += "0123456789";
    if (includeSpecialChars) characters += "~!@#$%^&*()-_+=[]{}|;:',.<>?/";

    for (let i = 1; i <= passwordLength; i++) {
      const charIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters.charAt(charIndex);
    }

    setGeneratedPassword(newPassword);
  }, [passwordLength, includeNumbers, includeSpecialChars, setGeneratedPassword]);

  useEffect(() => {
    generatePassword();
  }, [passwordLength, includeNumbers, includeSpecialChars]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="h-screen bg-gray-800 flex flex-col justify-center items-center">
      <h1 className="text-red-400 text-3xl mb-10">Unique Password Generator</h1>
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-8">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={generatedPassword}
            placeholder="Generating Password"
            readOnly
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-indigo-500"
          />
          <button
            className="px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="range"
            className="cursor-pointer"
            min={6}
            max={30}
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          <label className="text-gray-400">Length ({passwordLength})</label>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            defaultChecked={includeNumbers}
            id="number"
            onClick={() => {
              setIncludeNumbers((prevIncludeNumbers) => !prevIncludeNumbers);
            }}
          />
          <label htmlFor="number" className="text-gray-400">
            Include Numbers
          </label>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            defaultChecked={includeSpecialChars}
            id="char"
            onClick={() => {
              setIncludeSpecialChars((prevIncludeSpecialChars) => !prevIncludeSpecialChars);
            }}
          />
          <label htmlFor="char" className="text-gray-400">
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
