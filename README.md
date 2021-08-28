# REST Demo User

BE Demo untuk CRUD User
Menggunakan Express sederhana belum ada middleware & auth
DB Menggunakan Firebase

## Getting Started

### Installing

Cloning the project.

```
git clone https://github.com/skipfortoday/user-express.git user-express
```

Access the project directory.

```
cd user-express
```

Install dependencies.

```
yarn install
```

Serve with at http://localhost:3000.

```
yarn dev
```

## Additional Component

Ready to Deploy on Vercel (inculded vercel config)

---

### END POINT

Menampilkan List User

```
GET /api/users
```

Menampilkan Detail User berdasarkan parameter id

```
GET /api/users/:id
```

Membuat User

```
POST /api/users
```

Edit User berdasarkan parameter id

```
PUT /api/users/:id
```

Menghapus User berdasarkan parameter id

```
Delete /api/users/:id
```

## User Props

{
id: "UserID",
Name: "Nama User",
age: 28 // Umur,
location: "kota",
jobTitle: "Profesi / Pekerjaan",
desc: "deskripsi pekerjaan"
}

---

## Thanks

for boilerplate express ready deploy to vercel
https://github.com/hatuanem199801/express-vercel.git"
