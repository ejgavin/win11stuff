import React, { useEffect, useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [disableScroll, setDisableScroll] = useState(false);
  const [addSandbox, setAddSandbox] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let dest = params.get("destination");
    const cors = params.get("cors") === "true";
    const stay = params.get("stay");
    const redirectStop = params.get("redirectstop") === "true";

    if (dest) {
      if (!/^https?:\/\//i.test(dest)) {
        dest = "https://" + dest;
      }

      if (cors) {
        dest = `https://corsstuff.vercel.app/api/proy?url=${encodeURIComponent(dest)}`;
      }

      // Disable scrolling for specific sites when stay=true
      if (
        stay === "true" &&
        (dest.includes("easyfun.gg") || dest.startsWith("https://roblx-ten.vercel.app"))
      ) {
        setDisableScroll(true);
      }

      // Apply sandbox for inv.nadeko.net if redirectstop is true
      if (redirectStop && dest.includes("inv.nadeko.net")) {
        setAddSandbox(true);
      }

      setUrl(dest);
    }
  }, []);

  if (!url) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          color: "#555",
        }}
      >
        <div>
          <h2>No destination set</h2>
          <p>
            Add{" "}
            <code style={{ backgroundColor: "#eee", padding: "2px 4px" }}>
              ?destination=example.com
            </code>{" "}
            to the URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <iframe
        src={url}
        title="Proy Frame"
        style={{
          border: "none",
          width: "98vw",
          height: "98vh",
        }}
        scrolling={disableScroll ? "no" : "yes"}
        sandbox={addSandbox ? "allow-forms allow-scripts" : undefined}
      />
    </div>
  );
}

export default App;

