const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileUploadHelper = require('../../helpers/fileUploadHelper');

exports.index = async (req, res) => {
    try{
        res.render('index');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      } 
}

exports.upload = async (req, res) => {
    try {
        // Call the file upload helper to handle file upload
        console.log(req.files[0]);
        const result = await fileUploadHelper.uploadFile(req.files[0], '../public');

        if (result.success) {
            // Respond with a success message
            res.status(200).json({ message: 'File uploaded successfully.', filePath: result.filePath });
        } else {
            // Respond with an error message
            res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}