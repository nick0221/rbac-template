# RBAC Template (Laravel + Inertia + React)

A modern **Role-Based Access Control (RBAC) starter template** built with **Laravel**, **Inertia.js**, and **React**, using **Spatie Laravel-Permission** for roles and permissions.

This template provides a solid foundation for building admin panels or internal tools with:

- Role & permission management
- Page-based access control
- Permission-driven sidebar & footer navigation
- Clean separation between backend authorization and frontend UI

---

## ✨ Features

- 🔐 Role & Permission management (Spatie)
- 📄 Page-based permission mapping
- 🧭 Permission-driven sidebar & footer navigation
- ⚡ Laravel + Inertia + React setup
- 🎨 Shadcn/UI components
- 🔄 Centralized permission sharing via Inertia
- 🧱 Scalable RBAC architecture

---

## 🛠 Tech Stack

- **Backend:** Laravel
- **Frontend:** React + Inertia.js
- **Auth / RBAC:** Spatie Laravel-Permission
- **UI:** Tailwind CSS + shadcn/ui
- **Database:** MySQL / SQLite
- **Build Tool:** Vite

---

## 📦 Requirements

Make sure you have the following installed:

- PHP 8.4+
- Composer
- Node.js 22+
- NPM / PNPM / Yarn

---

## 🚀 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/nick0221/rbac-template.git
cd rbac-template
```

### 2️⃣ Install backend dependencies

```bash
cd rbac-template
```

### 3️⃣ Install frontend dependencies

```bash
npm install
# or
pnpm install
```

### 4️⃣ Environment setup

Copy the example environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database in `.env`

```bash
DB_DATABASE=rbac_template
DB_USERNAME=root
DB_PASSWORD=
```

### 5️⃣ Run migrations & seeders

```bash
php artisan migrate --seed

```

> Seeders will create default roles, permissions, and pages.

### 6️⃣ Build frontend assets

```bash
npm run dev

```

### 7️⃣ Start the Laravel server

```bash
php artisan serve

```

Visit the app at:

```bash
php artisan serve

```

---

### 🔑 Default Roles & Permissions

Example roles:

- super-admin
- manager
- user

Permissions are mapped to pages and automatically control:

- Route access
- Sidebar visibility
- Footer navigation visibility

### 🧭 Navigation & Permissions

Navigation items are filtered server-side and shared via Inertia:

```bash
allowedPages: ['dashboard', 'users', 'roles']

```

> The frontend only renders links the user is authorized to see.

No role checks in React.
No duplicated permission logic.

---

### 🧠 RBAC Flow

```bash
User
 ↓
Roles (Spatie)
 ↓
Permissions
 ↓
Pages
 ↓
Inertia shared props (allowedPages)
 ↓
Sidebar / Footer UI

```

---

### 🧪 Development Notes

- Permissions are single source of truth
- Frontend UI is fully permission-driven
- Safe for strict TypeScript mode
- Easy to extend with:
    - Submenus
    - Feature flags
    - Multi-role users

### 📌 Future Improvements

- Permission caching
- Audit logs
- Route auto-guarding
- Organization / tenant support

---

## 📄 License

This project is open-sourced under the MIT license.

### 🙌 Credits

Built with ❤️ using:

- Laravel
- Inertia.js
- React
- Spatie Laravel-Permission
- shadcn/ui
