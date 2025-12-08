function normalizeString(value) {
    if (!value) return "";
    return String(value).toLowerCase().trim();
  }
  
  function parseCSVList(value) {
    if (!value) return []; 
  
    return String(value)
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);
  }
  
  
  module.exports = {
    normalizeString,
    parseCSVList
  };
  