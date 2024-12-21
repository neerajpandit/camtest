// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const mkdirp = require('mkdirp');  // Ensure uploads directory exists

// const app = express();
// const PORT = 3000;

// // Set up body-parser to handle JSON data (for image upload)
// app.use(bodyParser.json({ limit: '50mb' }));

// // Serve static files (HTML pages and images)
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve images from uploads

// // Ensure 'uploads' directory exists
// mkdirp.sync(path.join(__dirname, 'uploads'));

// // Route to handle image upload from the client
// app.post('/upload', (req, res) => {
//     const imageData = req.body.imageData;

//     // Check if image data exists
//     if (!imageData) {
//         return res.status(400).send('No image data received');
//     }

//     // Strip base64 prefix
//     const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

//     // Generate a unique file name based on timestamp
//     const filePath = path.join(__dirname, 'uploads', `user_image_${Date.now()}.png`);

//     // Write the image to the file system
//     fs.writeFile(filePath, base64Data, 'base64', (err) => {
//         if (err) {
//             console.error('Error saving image:', err);
//             return res.status(500).send('Error saving the image');
//         }
//         console.log(`Image saved to: ${filePath}`);
//         res.send('Image uploaded successfully');
//     });
// });

// // Route to get a list of all uploaded images for admin view
// app.get('/admin/images', (req, res) => {
//     const imagesDir = path.join(__dirname, 'uploads');
//     fs.readdir(imagesDir, (err, files) => {
//         if (err) {
//             return res.status(500).send('Error reading image directory');
//         }
//         const imageFiles = files.filter(file => file.endsWith('.png'));
//         res.json(imageFiles);  // Return list of image filenames
//     });
// });

// // Route to serve the admin page
// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin.html'));
// });

// // Serve the HTML page for camera capture
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mkdirp = require('mkdirp');  // Ensure uploads directory exists

const app = express();
const PORT = 3000;

// Set up body-parser to handle JSON data (for image upload)
app.use(bodyParser.json({ limit: '50mb' }));

// Serve static files (HTML pages and images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve images from uploads

// Ensure 'uploads' directory exists
mkdirp.sync(path.join(__dirname, 'uploads'));

// Route to handle image upload from the client
app.post('/upload', (req, res) => {
    const imageData = req.body.imageData;

    // Check if image data exists
    if (!imageData) {
        return res.status(400).send('No image data received');
    }

    // Strip base64 prefix
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

    // Generate a unique file name based on timestamp
    const filePath = path.join(__dirname, 'uploads', `user_image_${Date.now()}.png`);

    // Write the image to the file system
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).send('Error saving the image');
        }
        console.log(`Image saved to: ${filePath}`);
        res.send('Image uploaded successfully');
    });
});

// Route to get a list of all uploaded images for admin view
app.get('/admin/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'uploads');  // Path to the uploads folder
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading image directory');
        }
        const imageFiles = files.filter(file => file.endsWith('.png'));  // Filter .png files
        res.json(imageFiles);  // Send the list of image filenames as a JSON response
    });
});

// Route to serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Serve the HTML page for camera capture
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
