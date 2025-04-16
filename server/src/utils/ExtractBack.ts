type AadhaarInfo = {
  address: string | null;
  aadhaarId: string | null;
};

function extractBackAadhaarInfo(text: string): AadhaarInfo | null {
  const hasIndia = /\b(India|Aadhaar)\b/i.test(text);

  if (!hasIndia) {
    return null;
  }
  const uidMatch = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/);

  const lines = text.split("\n");
  let addressLines = [];
  let capture = false;

  for (let line of lines) {
    if (line.includes("Address:")) {
      capture = true;
    }
    let validStr = "";
    let valid = line.split(" ");
    for (let str of valid) {
      if (str.length >= 6) {
        validStr += str + " ";
      }
    }

    if (capture) {
      addressLines.push(validStr.trim());
      if (line.includes("DIST:")) break;
    }
  }

  let address = addressLines
    .filter((line) => line.trim() !== "")
    .join(" ")
    .replace(/["'“‘”’]/g, "")
    .replace(/Address:/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    address,
    aadhaarId: uidMatch?.[0] ?? null,
  };
}
export default extractBackAadhaarInfo;
