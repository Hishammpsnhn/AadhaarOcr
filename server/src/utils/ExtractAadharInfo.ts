type AadhaarInfo = {
  name: string | null;
  dob: string | null;
  gender: string | null;
  aadhaarId: string | null;
  validAadhar: boolean;
};

function extractAadhaarInfo(text: string): AadhaarInfo | null {
  console.log(text);
  const hasIndia = /\b(India|Aadhaar)\b/i.test(text);

  if (!hasIndia) {
    return null;
  }
  const aadhaarIdMatch = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/);
  const dobMatch = text.match(
    /(?:DOB|Birth|D0B)[^\d]*(\d{2}\/\d{2}\/\d{4}|\d{4})/i
  );
  const nameMatch = text.match(/[A-Z][a-z]+\s[A-Z][a-z]+/);
  const genderMatch = text.match(/\b(Male|Female)\b/i);
  console.log(hasIndia);

  return {
    name: nameMatch?.[0] ?? null,
    dob: dobMatch?.[1] ?? null,
    gender: genderMatch?.[0] ?? null,
    aadhaarId: aadhaarIdMatch?.[0] ?? null,
    validAadhar: hasIndia,
  };
}
export default extractAadhaarInfo;
