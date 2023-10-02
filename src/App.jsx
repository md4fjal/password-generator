import { useEffect, useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passRef = useRef(null)

  const passGen = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*"

    for(let i=1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  const copyPassToClip = useCallback(() => {
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,3) for select in range
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passGen()
  }, [length, numberAllowed, charAllowed, passGen])

  return (
    <div className="mainContainer">
      <div className="content">
        <h1>Password Generator</h1>
        <div className="pass">
          <input type="text" placeholder="Password" value={password} readOnly ref={passRef} />
          <button onClick={copyPassToClip}>Copy</button>
        </div>
        <div className="range">
          <div>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length} </label>
          </div>

          <div>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
            <label>Numbers</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} />
            <label>Charecters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
