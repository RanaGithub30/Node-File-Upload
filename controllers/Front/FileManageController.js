const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileUploadHelper = require('../../helpers/fileUploadHelper');

exports.index = async (req, res) => {
    try{
        res.render('index');
    }
    catch (error) {
        req.flash('error_msg', error);
        req.redirect('/');
      } 
}

exports.upload = async (req, res) => {
    try {
        // Call the file upload helper to handle file upload
        const result = await fileUploadHelper.uploadFile(req.files[0], '../public');

        if (result.success) {
            // Respond with a success message
            req.flash('success_msg', 'File uploaded successfully.');
            res.redirect('/');
        } else {
            // Respond with an error message
            req.flash('error_msg', result.message);
            req.redirect('/');
        }
    } catch (error) {
        req.flash('error_msg', error);
        req.redirect('/');
    }
}