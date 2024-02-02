//checks amount of available actions left to the user and deductes 1 action for loading the users
async function performAction() {
  const url = "http://localhost:8000/users";

  //fetch the user that is doing the action with a filter which is his name
  const respUser = await fetch(
    `${url}?fullName=${sessionStorage["username"]}`,
    {
      method: "GET",
      headers: { "x-access-token": sessionStorage["accessToken"] },
    }
  );
  const userRaw = await respUser.json();
  const user = userRaw[0];

  //take the date of the action (todays day)
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  // If user does not have a date set or the date is not today, reset actions and set the date
  if (!user.date || user.date !== formattedDate) {
    // Update user object after resetting actions
    user.numOfActions = user.maxNumOfActions;
    user.date = formattedDate;
  }

  //if no more actions left then remove token and return to login page (logout)
  if (user.numOfActions == 0) {
    sessionStorage.removeItem("accessToken");
    location.href = "login.html";
  } else {
    //update the user with one action less to use
    const obj = {
      fullName: user.fullName,
      maxNumOfActions: user.maxNumOfActions,
      numOfActions: user.numOfActions - 1,
      date: formattedDate,
    };

    await fetch(`${url}/${user._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage["accessToken"],
      },
      body: JSON.stringify(obj),
    });

    //print users data on a json (log)
    await fetch(`${url}/log`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage["accessToken"],
      },
      body: JSON.stringify(obj),
    });
  }
}
