export function allAccess  (req, res)  {
    res.status(200).json("Public Content.");
  };
  
  export function userBoard  (req, res)  {
    res.status(200).json("User Content.");
  };
  
  export function adminBoard (req, res) {
    res.status(200).json("Admin Content.");
  };
  