
exports.login = (username, password) => {
  if (username === 'admin' && password === 'admin@123') return;
  else throw `Invalid Credentials`
}