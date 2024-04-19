// db.js

const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const uri = 'mongodb+srv://user_eldi:mbds2024@cluster0.wneoyrq.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);
    console.log('Connexion réussie à MongoDB');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
};

module.exports = connectToDatabase;
