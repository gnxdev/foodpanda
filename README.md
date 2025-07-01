
<p align="left" style="margin-left:0">
<img style="vertical-align: middle;" src="https://private-user-images.githubusercontent.com/208609144/460832960-7d99bf15-a135-41a8-8bbd-00a51d9675f5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTEzMzc1NTAsIm5iZiI6MTc1MTMzNzI1MCwicGF0aCI6Ii8yMDg2MDkxNDQvNDYwODMyOTYwLTdkOTliZjE1LWExMzUtNDFhOC04YmJkLTAwYTUxZDk2NzVmNS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcwMVQwMjM0MTBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mZTg3YjIzYTdmN2UzM2E0MjdlNmEyYzRjNTJkNGNkZWNhZDZkNDNiNjhlYjFmNDZlNzRmOWM4ZGViMDFhYjY3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.k3dKL65B-DdJ7R7iLQAYU91aC17BAErj0nXhrxlHQKU" alt="genieXLogo" height=40 />
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
<details>
<summary><h2>🚀Production Environment</h2></summary>

## 🔐 Configure Environment Variables

### 1. Copy `.env.example.production`  to `/backend` and rename it to `.env`

```powershell
# Powershell or CMD command 
copy .env.example.production backend\.env
``` 

```bash
# bash command 
cp .env.example.production backend/.env 
```

## 📦 Install PM2 and Project Dependencies

### 1. Install PM2 globally
```bash
npm install -g pm2
```
*For more information on PM2. Read their documentation [here.](https://pm2.io/docs/runtime/guide/installation)*

### 2. Install Project Dependencies
**Go to ./backend directory:**
```bash
cd backend
```
**Install packages using npm:**
```bash
npm install --production
```
</details>