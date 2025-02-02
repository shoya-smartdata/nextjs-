require('dotenv').config();
const express = require('express');
const connectDB = require('./db/database');
const authRoutes = require('./routes/AuthRoutes/authRoutes');
const CustomerRouter = require('./routes/customerRouts/customeRoutess');
const leadRoute = require('./routes/LeadsRoutes/leadRoutes');
const adminRouter = require('./routes/adminRoutes/adminRoutes');

const app = express();

// Connect Database
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use('/api/customer', CustomerRouter);
app.use('/api/lead', leadRoute);
app.use('/api/admin', adminRouter);

// Protected Route Example
app.get('/api/protected', (req, res) => {
  res.json({ msg: 'Protected route accessed' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));