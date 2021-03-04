import { calcWPM } from "lib";
import { useEffect, useRef, useState } from "react";
import TimerForm from "./TimerForm";

function Main() {
  const [secsRemaining, setSecsRemaining] = useState(null);
  const [currentMsg, setCurrentMsg] = useState("");

  // Keep a reference in between the renders
  const textareaRef = useRef();
  const startingSecs = useRef();

  useEffect(() => {
    // Run the timer as long as there are secsRemaining
    if (secsRemaining) {
      // We are creating a new interval every second...
      const intervalID = setInterval(() => {
        setCurrentMsg(() =>
          secsRemaining ? `${secsRemaining - 1} second(s) remain!` : null
        );
        setSecsRemaining((prev) => prev - 1);
      }, 1000);

      // Clean up the current interval to avoid memory leaks
      return () => clearInterval(intervalID);
    } else {
      setCurrentMsg(
        () => `${calcWPM(textareaRef.current.value, startingSecs.current)} WPM`
      );
      textareaRef.current.blur();
      textareaRef.current.disabled = true;
    }
  }, [secsRemaining]);

  function handleSubmit(event) {
    event.preventDefault();

    const secs = Number(event.target.elements[0].value);

    setSecsRemaining(secs);
    startingSecs.current = secs;
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  }

  return (
    <main className="flex flex-col gap-4 items-center mx-auto w-96">
      <TimerForm handler={handleSubmit} />
      <p className="text-2xl">{currentMsg}</p>
      <textarea
        className="bg-gray-200 h-48 w-96 focus:bg-gray-900"
        disabled
        ref={textareaRef}
      />
    </main>
  );
}

export default Main;
