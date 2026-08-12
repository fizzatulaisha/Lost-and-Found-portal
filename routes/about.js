const express = require("express");
const router = express.Router();

const transporter = require("../config/nodemailer");







// router.post("/", async (req, res) => {

//     console.log("Contact route hit");
//     console.log(req.body);

//     res.send("working");

// });

// module.exports = router;









router.post("/", async (req,res)=>{

    const {name,email,subject,message} = req.body;


    try{

        await transporter.sendMail({

            from: process.env.ADMIN_EMAIL,

            to: process.env.ADMIN_EMAIL,
            
    replyTo: email,

            subject: subject,

            html: `
                <h2>New Lost & Found Message</h2>

                <p><b>Name:</b> ${name}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Message:</b></p>

                <p>${message}</p>
            `
        });


        req.flash(
            "success",
            "Your message has been sent successfully!"
        );

        res.redirect("/about");


    }catch(err){

        console.log(err);

        req.flash(
            "error",
            "Message could not be sent"
        );

        res.redirect("/about");
    }

});


module.exports = router;