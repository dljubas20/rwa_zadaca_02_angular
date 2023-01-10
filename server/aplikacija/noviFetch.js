exports.fetch = async function (url, init) {
    const {default: fetch} = await import("/usr/lib/node_modules/node-fetch/src/index.js");
    return await fetch(url, init);
};
