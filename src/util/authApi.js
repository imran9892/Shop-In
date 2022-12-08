export const signupUser = async (user) => {
  const responseData = {
    data: null,
    status: false,
    error: null,
  };
  try {
    //Add user to Auth

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          displayName: user.name,
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const tokenData = await response.json();
    if (!response.ok) {
      responseData.error = tokenData.error;
      return responseData;
    }

    //Add user to database with uid or localId as key
    const { localId, displayName, email, expiresIn, idToken } = tokenData;
    const responseAddUser = await fetch(
      `${process.env.REACT_APP_FIREBASE_DATABASE}/users/${localId}.json/?auth=${idToken}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: displayName,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const addUserData = await responseAddUser.json();
    console.log(addUserData);
    responseData.error = addUserData.error;
    if (!responseAddUser.ok) {
      const delUser = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({ idToken }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const delUserData = await delUser.json();
      console.log(delUserData);
      return responseData;
    }
    const expireDate = new Date(new Date().getTime() + +expiresIn * 1000);
    tokenData.expiresIn = expireDate.toISOString();
    responseData.data = tokenData;
    responseData.status = true;
    return responseData;
  } catch (err) {
    responseData.error = err;
    return responseData;
  }
};

export const loginUser = async (user) => {
  const responseData = {
    data: null,
    status: false,
    error: null,
  };
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const loginData = await response.json();
    if (!response.ok) {
      responseData.error = loginData.error.message;
      return responseData;
    }
    const { expiresIn } = loginData;
    const expireDate = new Date(new Date().getTime() + +expiresIn * 1000);
    loginData.expiresIn = expireDate.toISOString();
    responseData.data = loginData;
    responseData.status = true;
    return responseData;
  } catch (err) {
    responseData.error = err;
    return responseData;
  }
};

export const deleteUser = async ({ idToken, uid }) => {
  const responseData = {
    data: null,
    status: false,
    error: null,
  };
  try {
    //delete user from database
    const deleteResponse = await fetch(
      `${process.env.REACT_APP_FIREBASE_DATABASE}/users/${uid}.json/?auth=${idToken}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deleteData = await deleteResponse.json();
    if (!deleteResponse.ok) {
      console.log(deleteData);
      responseData.error = deleteData.error;
      return responseData;
    }
    //delete user from Auth
    const responseAuth = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({ idToken }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deleteAuth = await responseAuth.json();
    if (!responseAuth.ok) {
      responseData.error = deleteAuth.error.message;
      return responseData;
    }

    responseData.status = true;
    responseData.data = { deleteData, deleteAuth };
    return responseData;
  } catch (err) {
    responseData.error = err;
    return responseData;
  }
};
