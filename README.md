BE Demo untuk CRUD User
Menggunakan Express sederhana belum ada middleware & auth
DB Menggunakan Firebase

Menajalankan BE : npm start
Sudah include config vercel.json bisa langsung di deploy ke vercel

End Point:
GET /api/users => Menampilkan List User
GET /api/users/:id => Menampilkan Detail User berdasarkan parameter id
POST /api/users => Create User
PUT /api/users/:id => Edit User berdasarkan parameter id
Delete /api/users/:id => Menghapus User berdasarkan parameter id

User Property
{
id: "UserID",
Name: "Nama User",
age: 28 // Umur,
location: "kota",
jobTitle: "Profesi / Pekerjaan",
desc: "deskripsi pekerjaan"
}
