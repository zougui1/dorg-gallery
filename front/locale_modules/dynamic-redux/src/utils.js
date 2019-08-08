const inArray = (needle, haystack) => {
  for (let i = 0, len = haystack.length; i < len; i++) {
    if(haystack[i].toLowerCase() === needle.toLowerCase()) return true;
  }
  return false;
}

exports.inArray = inArray;
