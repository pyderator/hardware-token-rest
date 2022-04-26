export const createHexArray = (secret: string) => {
  var char_array = secret.split("");
  var charcode_array = char_array.map(function (c) {
    return c.charCodeAt(0);
  });
  var hex_array = "{";
  for (let i = 0; i < charcode_array.length; i++) {
    if (i > 0) hex_array += ", ";
    hex_array += "0x" + charcode_array[i].toString(16);
  }
  hex_array += "}";
  return hex_array;
};
