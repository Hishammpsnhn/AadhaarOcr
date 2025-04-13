type AadhaarInfo = {
    name: string | null;
    dob: string | null;
    aadhaarId: string | null;
  };
  
  function extractAadhaarInfo(text: string): AadhaarInfo {
  console.log(text)
    const aadhaarIdMatch = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/);
    const dobMatch = text.match(/(?:DOB|Birth|D0B)[^\d]*(\d{2}\/\d{2}\/\d{4}|\d{4})/i);
    const nameMatch = text.match(/[A-Z][a-z]+\s[A-Z][a-z]+/); 
    return {
      name: nameMatch?.[0] ?? null,
      dob: dobMatch?.[1] ?? null,
      aadhaarId: aadhaarIdMatch?.[0] ?? null
    };
  }
  export default extractAadhaarInfo