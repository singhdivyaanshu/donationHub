const message = require('../models/contactSchema')
const validator = require("deep-email-validator");

async function isEmailValid(email){
    const isValid = await validator.validate(email);
    return isValid;
}

function mailer (form) {
    let email = form.email;
    let message = form.message;
    let name = form.name;
    let type = form.userType;
    let nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'donatenowindia@gmail.com',
            pass: 'bpivvgxqpkvduyex'
        }
    });

    let mailOptions = {
        from: 'donatenowindia@gmail.com',
        to: 'donatenowindia@gmail.com',
        subject: 'Message from user',
        text:  `New message from ${name} with email ${email} and type ${type} and message ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return error;
        }else{
            return "Email sent";
        }
    });
}



exports.sendmessage = async(req,res) => {
   
    let newmessage = new message(req.body);

    const {valid, reason, validators} = await isEmailValid(req.body.email);

    if(valid){
    newmessage.save()
        .then((doc)=>{
            // console.log(doc)
            mailer(req.body);
            res.status(200).send({msg: "message sent successfully...... Sucess"})

        })
        .catch(async(err)=>{

            if(err.message.includes("dup"))
            {
                const email = req.body.email;
                const mess = req.body.message;
                mailer(req.body);

                message.updateOne({email: email},{$push: {message: mess}},(err,doc)=>{
                    if(err){
                        res.status(200).send({msg: "Message update failed......", errMsg: err.message})
                        
                    }else{
                        res.status(200).send({msg: "Message updated successfully...... Sucess"})
                    }
                })

            }
            else
            res.status(200).send({msg: "Message sent failed......", errMsg: err.message})
        })
    }
    else
    {
        res.status(200).send({msg: "Email is not valid", errMsg: validators[reason].reason});
    }

}

