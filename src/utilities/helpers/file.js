import fs from 'fs';
import path from 'path';

const ensureFileExists = (filePath, defaultData = {}) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
};

const readJSON = (filePath) => {
  ensureFileExists(filePath, {});
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeJSON = (filePath, data) => {
  ensureFileExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getUserData = (filePath, userId, defaultTemplate) => {
  const data = readJSON(filePath);
  if (!data.users) data.users = {};
  if (!data.users[userId]) {
    data.users[userId] = { ...defaultTemplate };
    writeJSON(filePath, data);
  }
  return data.users[userId];
};

const updateUserData = (filePath, userId, updateCallback) => {
  const data = readJSON(filePath);
  if (!data.users) data.users = {};
  if (!data.users[userId]) return false;
  updateCallback(data.users[userId]);
  writeJSON(filePath, data);
  return true;
};

export { readJSON, writeJSON, getUserData, updateUserData };
