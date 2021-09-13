import { useState, useCallback , useEffect} from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  let logoutTimer;

  const login = useCallback((uid, token, expirationDate) => {
      var minutesAfterExpire = 10;
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
    expirationDate || new Date(new Date().getTime() + minutesAfterExpire * 60000);
    setTokenExpirationDate(tokenExpirationDate);
  
    localStorage.setItem(
  "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );


   
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);
  return { token, login, logout, userId };
};
