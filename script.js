const btntambah = document.getElementById("btntambah");
const listbuku = document.getElementById("listbuku");
const totalbuku = document.getElementById("totalbuku");

btntambah.addEventListener("click", tambahbuku);

// Menampilkan semua data dari Firestore
function tampilkanBuku() {
    listbuku.innerHTML = "";
    let jumlahbuku = 0;

    db.collection("buku").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>📖 ${data.judul}</h3>
                <p><b>Penulis :</b> ${data.penulis}</p>
                <p><b>Kategori :</b> ${data.kategori}</p>
                <p><b>Tahun :</b> ${data.tahun}</p>
                <p><b>Status :</b> ${data.status}</p>
            `;

            listbuku.appendChild(card);
            jumlahbuku++;
        });

        totalbuku.innerText = jumlahbuku;
    })
    .catch((error) => {
        console.error(error);
    });
}

// Tambah buku
function tambahbuku() {
    const judul = document.getElementById("judul").value;
    const penulis = document.getElementById("penulis").value;
    const kategori = document.getElementById("kategori").value;
    const tahun = document.getElementById("tahun").value;
    const status = document.getElementById("status").value;

    if (judul === "" || penulis === "" || kategori === "" || tahun === "") {
        alert("Lengkapi semua data!");
        return;
    }

    db.collection("buku").add({
        judul: judul,
        penulis: penulis,
        kategori: kategori,
        tahun: tahun,
        status: status
    })
    .then(() => {
        // Kosongkan form
        document.getElementById("judul").value = "";
        document.getElementById("penulis").value = "";
        document.getElementById("kategori").value = "";
        document.getElementById("tahun").value = "";
        document.getElementById("status").selectedIndex = 0;

        // Refresh daftar
        tampilkanBuku();
    })
    .catch((error) => {
        console.error(error);
    });
}

// Tampilkan data saat halaman dibuka
tampilkanBuku();
