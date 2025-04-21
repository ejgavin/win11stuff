import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [disableScroll, setDisableScroll] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let dest = params.get("destination");
    const cors = params.get("cors") === "true";
    const stay = params.get("stay");
    const blockAds = params.get("ads") === "true";

    if (dest) {
      if (!/^https?:\/\//i.test(dest)) {
        dest = "https://" + dest;
      }

      if (cors) {
        dest = `https://corsstuff.vercel.app/api/proy?url=${encodeURIComponent(dest)}`;
      }

      if (
        stay === "true" &&
        (dest.includes("easyfun.gg") || dest.startsWith("https://roblx-ten.vercel.app"))
      ) {
        setDisableScroll(true);
      }

      if (blockAds) {
        injectAdBlockCSS();
      }

      setUrl(dest);
    }
  }, []);

  const injectAdBlockCSS = () => {
    const style = document.createElement("style");
    style.innerHTML = `/* your adblock CSS here */`;
    document.head.appendChild(style);
  };

  if (!url) {
    return (
      <div className="no-destination">
        <div>
          <h2>No destination set</h2>
          <p>
            Add{" "}
            <code>?destination=example.com</code>{" "}
            to the URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="simple-browser">
      <iframe
        src={url}
        title="Proy Frame"
        scrolling={disableScroll ? "no" : "yes"}
        sandbox="allow-scripts allow-presentation allow-same-origin"
      />
    </div>
  );
}

export default App;
