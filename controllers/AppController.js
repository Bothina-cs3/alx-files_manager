import dbClient from '../utils/db.js'; // DB Client to interact with MongoDB
import Redis from 'ioredis'; // Redis client for checking Redis status

// Create a new Redis client to connect to Redis
const redisClient = new Redis();

class AppController {
  // GET /status
  static async getStatus(req, res) {
    try {
      const redisStatus = await redisClient.ping() === 'PONG'; // Check Redis connection
      const dbStatus = dbClient.isAlive(); // Check DB connection

      res.status(200).json({
        redis: redisStatus,
        db: dbStatus
      });
    } catch (err) {
      res.status(500).json({ error: 'Error checking status' });
    }
  }

  // GET /stats
  static async getStats(req, res) {
    try {
      const nbUsers = await dbClient.nbUsers(); // Get number of users from DB
      const nbFiles = await dbClient.nbFiles(); // Get number of files from DB

      res.status(200).json({
        users: nbUsers,
        files: nbFiles
      });
    } catch (err) {
      res.status(500).json({ error: 'Error fetching stats' });
    }
  }
}

export default AppController;
