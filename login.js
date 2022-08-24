const login = async (username, password) => {
  const res = await fetch("https://scratch.mit.edu/login/", {
      headers: {
          "x-csrftoken": "a",
          "x-requested-with": "XMLHttpRequest",
          "Cookie": "scratchcsrftoken=a;scratchlanguage=en;",
          "referer": "https://scratch.mit.edu"
      },
      body: JSON.stringify({ username, password, useMessages: true }),
      method: "POST"
  })
  if(res.status === 200) {
    const session = res.headers.get("set-cookie").match(/\"(.*)\"/g)[0];
    console.log("s");
    return session;
  }
}

exports.login=login;  