const express = require('express')

const nodemailer = require("nodemailer")

async function sendMail(mailSender, listmail , assignment) {
    console.log('Hello elo')
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wendydarling1215@gmail.com', // generated ethereal user
            pass: 'onbyvskabveufadg', // generated ethereal password
        },
    });
    // send mail with defined transport object
    const msg = {
        from: mailSender.prenom + " "+ mailSender.nom, // Adresse de l'expéditeur
        to: listmail.join(','), // Liste des destinataires
        subject: "Nouvelle assignment du "+assignment+" disponible sur la plateforme étudiante", // Ligne d'objet
        html: `
            <p>Bonjour à tous,</p>
            <p>Je vous informe qu'une nouvelle assignment a été mise en ligne sur la plateforme étudiante/prof. Merci de bien vouloir vérifier la plateforme dès que possible pour prendre connaissance des détails et des instructions.</p>
            <p>
                <a href="https://frontendmbdsassignementapplication.onrender.com/login" style="
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                    background-color: #007BFF;
                    text-decoration: none;
                    border-radius: 5px;
                    text-align: center;
                ">Ouvrir la plateforme</a>
            </p>
            <p>N'hésitez pas à me contacter si vous avez des questions ou des difficultés.</p>
            <p>Bonne journée à tous,</p>
        `
    };
    const info = transporter.sendMail(msg, function (error, ifon) {
        console.log("Vo anomboka")
        if (error) {
            console.log("TSY METY")
            console.log(error)
        } else {
            console.log("METY")
            console.log(" email send " + info.response)
        }
    });
}

exports.sendMail = sendMail;