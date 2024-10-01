// src/utils.js
export const mapClaimsToUser = (decodedToken) => {
    return {
      username: decodedToken.name || decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: decodedToken.email || decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role: decodedToken.role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    };
  };
  