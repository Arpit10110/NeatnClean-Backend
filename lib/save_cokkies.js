
export const savecokkeies = async(token,res) =>{
    try {
            res.cookie("token",token,{
                maxAge:10 * 24 * 60 * 60 * 1000,
                httpOnly:true,
                secure:true,
                 domain: "neatnclean.net",
                sameSite:"none",
                path: '/'
            })
            res.cookie("access_token",token,{
                maxAge:10 * 24 * 60 * 60 * 1000,
                httpOnly:false,
                secure:true,
                 domain: "neatnclean.net",
                sameSite:"none",
                path: '/'
            })
            // res.cookie("token",token,{
            //     maxAge:10 * 24 * 60 * 60 * 1000,
            //     httpOnly:true,
            //     secure:Prod=="Production",
            //     sameSite:Prod=="Production"?"none":"Lax",
            //     path: '/'
            // })
            // res.cookie("access_token",token,{
            //     maxAge:10 * 24 * 60 * 60 * 1000,
            //     httpOnly:false,
            //     secure:Prod=="Production",
            //     sameSite:Prod=="Production"?"none":"Lax",
            //     path: '/'
            // })
            return res.json({
                success:true,
                message:"Logged in successfully",
            })
    } catch (error) {
        return res.json({
            success:false,
            error:error
        })
    }
}