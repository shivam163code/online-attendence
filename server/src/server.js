require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const createApp = require('./app');

process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/attendance_db';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'dev_attendance_secret_change_me';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
process.env.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const PORT = process.env.PORT || 5000;
const app = createApp();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  socket.emit('connected', { message: 'Realtime channel ready' });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other server process or set a different PORT.`);
    process.exit(1);
  }

  console.error('Server error:', error.message);
  process.exit(1);
});

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.locals.io = io;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
