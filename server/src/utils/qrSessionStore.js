const crypto = require('crypto');

const sessions = new Map();

const createSession = ({ teacherId, classId, subjectId, expiresInMinutes = 10 }) => {
  const token = crypto.randomBytes(12).toString('hex');
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  const session = { token, teacherId, classId, subjectId, expiresAt };
  sessions.set(token, session);
  return session;
};

const getSession = (token) => {
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return session;
};

const revokeSession = (token) => sessions.delete(token);

module.exports = { createSession, getSession, revokeSession };
