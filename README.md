
<p align="left" style="margin-left:0">
<img style="vertical-align: middle;" src="https://api.geniex.tech/gnx_logo.png" alt="genieXLogo" height=40 />
<span style="font-size: 2em; font-weight: bold; vertical-align: middle; margin-left:10px"> GenieX Foodpanda Plugin Deployment Setup</span>
</p>
In this guide, you will learn how to set up and deploy the backend service with a MySQL database. By the end, you’ll have a robust environment that runs in the background and persists even after system reboots.

## ✅ What You’ll Accomplish

1. 🔐 **Configure Environment Variables**  
   Set up the necessary environment variables to establish a secure connection between the backend and the MySQL database.

2. 📦 **Install PM2 and Project Dependencies**  
   Install PM2, a production process manager for Node.js applications, along with other required dependencies.

3. 🛠️ **Initialize the MySQL Database**  
   Run provided scripts to create the MySQL database.

4. 🗃️ **Apply Database Migrations**  
   Execute migration scripts to generate the required tables and schema structure in the MySQL database.

5. 🖥️ **Enable Persistent Background Deployment**  
   Configure a system task using PM2 to ensure the backend service runs in the background and automatically restarts after a system reboot.

---
<details open>
<summary><h2>🚀Production Environment</h2></summary>

## 🔐 Configure Environment Variables

### 1. Copy and Rename `.env.example.production`  to `./backend/.env`.

**🪟 For Powershell or CMD, run:**
```powershell
copy .env.example.production backend\.env
``` 

**🐚 For Bash, run:**
```bash
cp .env.example.production backend/.env 
```

### 2. Enter `MySQL credentials` and `JWT Token Secrets`.
#### 🔗[JWT Secret Key Generator](https://jwtsecrets.com/#generator) - Use this to generate secret keys.
- For `JWT_Secret` and `JWT_REFRESH_TOKEN` use **128 bits**.
- For `FOODPANDA_CLIENT_SECRET` use at least **32 bits**.

## 📦 Install PM2 and Project Dependencies

### 1. Install `PM2` globally
**Open `powershell` and run:**
```powershell
npm install -g pm2
```
*For more information on PM2. Read their documentation [here.](https://pm2.io/docs/runtime/guide/installation)*

### 2. Install Project Dependencies
**In `root` directory, run:** 
```bash
cd backend
```
**In `backend` directory, run:** *(For production, omit devDependencies using --omit=dev)*
```bash
npm install --omit=dev
```

## 🛠️ Initialize the MySQL Database

### 1. Create `foodpanda` schema.

**In `backend` directory, run:**
```bash
npm run db:create
```

## 🗃️ Apply Database Migrations

### 1. Run `migration` scripts
**In `backend` directory, run:**
```bash
npm run db:migrate
```

## 🖥️ Enable Persistent Background Deployment

### 1. Run `powershell` as Administrator.


### 2. Go to project's root directory `./foodpanda`.
**In `powershell`, run:**
```powershell
pm2 start ecosystem.config.js --only production --env production
```
*Note: ecosystem.config.js should be in current directory.*

**ℹ️ You should see something like this:**

![pm2 preview](https://api.geniex.tech/assets/images/pm2-preview.png)

### 3. Save `PM2` process.
**In `powershell`, run:**
```powershell
pm2 save
```

**ℹ️ You should see something like this:**

![pm2 save preview](https://api.geniex.tech/assets/images/pm2-save-preview.png)

### 4. Create a task in `Task Scheduler` to run `PM2` in the background.

<details open><summary><b>General Tab</b></summary>

![General Tab](https://api.geniex.tech/assets/images/general-tab.png)
</details>

<details open><summary><b>Triggers Tab</b></summary>

![Triggers Tab](https://api.geniex.tech/assets/images/trigger-tab.png)
</details>

<details open><summary><b>Actions Tab</b></summary>

<b>Program script:</b> C:\Users\YOUR-USER\AppData\Roaming\npm\pm2.cmd 
<i>(or wherever the pm2.cmd is located)</i><br>
<b>Argument: </b> resurrect

![Actions tab](https://api.geniex.tech/assets/images/actions-tab.png)

</details>

<details open> <summary><b>Conditions Tab</b></summary>

![Conditions tab](https://api.geniex.tech/assets/images/conditions-tab.png)
</details>


## ✅ Conclusions & Final Notes
🎉 Congratulations! You've successfully set up and deployed the `production environment`. The plugin should now be live, optimized, and ready to handle orders from **Foodpanda**.

📌 Make sure to:
- Monitor logs and performance metrics regularly.
- Secure your environment variables and secrets.
- Document any additional configurations or deployment changes for future reference.

</details>

---

📬 **Need Help or Have Questions?**
Feel free to reach out to me at emingala02@gmail.com -- I'm happy to assist with any concerns or clarifications.

