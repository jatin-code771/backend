import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    // 1. extract token from request of the user APi call (from cookies)

    const accessToken=req.cookies.accessToken
    const refreshtoken=req.cookies.refreshtoken


    //sbse pehle check kro access toekn ->direct Login
    // check access nhi h ..... refresh check -> naya access or refresh dedo
    // dono nhi h -> user se bolo login kre 


    if(!accessToken){
      if(!refreshtoken){
        return res.status(401).json({
          status:false,
          message:"Unauthorized access",
        });
      }

      // refresh token hai

      const refreshDecoded= jwt.verify(refreshtoken,process.env.REFRESHTOKEN_SECRET);
        console.log(refreshDecoded.id);
    }












    // console.log(req.cookies);
    // let token = req.cookies?.token;

    // console.log("Token Found: ", token ? "YES" : "NO");
// 2 check if token already exists


  //   if (!token) {
  //     console.log("NO token");
  //     return res.status(401).json({
  //       success: false,
  //       message: "Authentication failed",
  //     });
  //   }

  //   // 3 verify the token
  //   const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  //   console.log("decoded data: ", decoded);
  //   req.user = decoded;
    
  // next();














  } catch (error) {
    console.log("Auth middleware failure");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }

};
 