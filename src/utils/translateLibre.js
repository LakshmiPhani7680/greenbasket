export const translateLibre = async (text, targetLang, sourceLang = "auto") => {
  try {
    const res = await fetch("https://translate.argosopentech.com/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text"
      })
    });

    const data = await res.json();
    return data?.translatedText || "";
  } catch (error) {
    console.error("Translation error:", error);
    return "";
  }
};
