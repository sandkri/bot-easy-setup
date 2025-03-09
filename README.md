
## **`.env` Setup for Discord.js Bot**

### **Required Variables**
Create a `.env` file in the root directory (outside `src/`) and add the following:

```ini
BOT_TOKEN=
CLIENT_ID=
```

> **Note:** Replace `BOT_TOKEN` with your actual bot token and `CLIENT_ID` with your bot’s application ID. These are mandatory for the bot to function.

---

## **Getting Started with DevOps (Docker & GitHub)**

### **1. Install Dependencies**
Ensure you have:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

Run:
```sh
npm install discord.js dotenv
```

### **2. Secure `.env` in Git**
Before pushing to GitHub, add `.env` to `.gitignore`:
```sh
echo ".env" >> .gitignore
```
This prevents sensitive tokens from being uploaded.

### **3. Docker Setup**
Create a `Dockerfile`:
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```
Then build and run:
```sh
docker build -t discord-bot .
docker run --env-file .env discord-bot
```

### **4. Push to GitHub**
```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
