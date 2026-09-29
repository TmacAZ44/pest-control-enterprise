const fs = require("fs");

// Node 24 on Windows returns EISDIR from readlink for ordinary files and
// directories. Webpack treats only EINVAL as "not a symlink", so the pack
// cache snapshot fails unless those errors look like the Unix result.
function normalizeReadlinkError(error, path) {
  if (!error || error.code !== "EISDIR") return error;
  const wrapped = new Error(`EINVAL: invalid argument, readlink '${path}'`);
  wrapped.code = "EINVAL";
  wrapped.syscall = "readlink";
  wrapped.path = path;
  return wrapped;
}

const readlinkSync = fs.readlinkSync;
fs.readlinkSync = function patchedReadlinkSync(path, options) {
  try {
    return readlinkSync.call(fs, path, options);
  } catch (error) {
    throw normalizeReadlinkError(error, path);
  }
};

const readlink = fs.readlink;
fs.readlink = function patchedReadlink(path, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  return readlink.call(fs, path, options, (error, link) => {
    callback(error ? normalizeReadlinkError(error, path) : null, link);
  });
};

const promiseReadlink = fs.promises.readlink.bind(fs.promises);
fs.promises.readlink = async function patchedPromiseReadlink(path, options) {
  try {
    return await promiseReadlink(path, options);
  } catch (error) {
    throw normalizeReadlinkError(error, path);
  }
};
