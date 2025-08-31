# 📚 Book Library Project

This project is a **basic web application** that works as a personal **book library**.  
It fetches data from the **Google Books API** and allows users to:

- 🔍 Search books through the API.  
- 📥 Add selected books to their personal library.  
- ⭐ Mark or unmark books as favorites.  
- 🗑️ Remove books from the library.  
- 🔑 Use basic authentication to manage user access.  

The app is split into two main folders: **front-end** and **back-end**.

## 🎥 Demo

👉 [Watch the demo video here](https://www.linkedin.com/feed/update/urn:li:activity:7231616935044497409)

---

## 🚀 Run locally


```bash
# Back-end (Django API)
cd back-end
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # http://localhost:8000

# Front-end (React + Vite)
cd front-end
npm install
npm run dev  # http://localhost:5173
