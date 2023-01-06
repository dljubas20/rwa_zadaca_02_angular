exports.dateFormat = async function (date, format) {
    const {default: dateFormat} = await import("/usr/lib/node_modules/dateformat/lib/dateformat.js");
    return await dateFormat(date, format);
};
