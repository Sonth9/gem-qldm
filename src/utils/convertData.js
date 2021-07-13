export function objectTrim(obj) {
  for (var propName in obj) {
    if (typeof obj[propName] == "string") {
      obj[propName] = obj[propName].trim();
    }
  }

  return obj;
}

export function stringToSlug(title, prefix = "-") {
  let slug = "";
  // Change to lower case
  var titleLower = title.toLowerCase();
  // Letter "e"
  slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ|ë/gi, "e");
  // Letter "a"
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ|ä/gi, "a");
  // Letter "o"
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ|ö/gi, "o");
  // Letter "u"
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự|ü|û/gi, "u");
  // Letter "d"
  slug = slug.replace(/ì|í|ỉ|ĩ|ị|ï|î/gi, "i");

  slug = slug.replace(/ý|ỳ|ỹ|ỵ|ỷ/gi, "y");

  slug = slug.replace(/ç/gi, "c");

  slug = slug.replace(/đ/gi, "d");
  // Trim the last whitespace
  slug = slug.replace(/\s*$/g, "");
  // Change whitespace to "-"
  slug = slug.replace(/\s+/g, prefix);

  return slug;
}
