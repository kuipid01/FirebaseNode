const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./service.json');
const cors = require('cors');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const app = express();
app.use(cors());
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.get('/api/users', (req, res) => {
    admin.auth().listUsers()
      .then((userListResult) => {
        const users = userListResult.users.map((userRecord) => ({
          uid: userRecord.uid,
          email: userRecord.email,
          // Include any other user properties you need
        }));
        res.json(users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
      });
  });