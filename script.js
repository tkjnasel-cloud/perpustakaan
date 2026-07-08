const btntambah = document.getElementById("btntambah");
const listbuku = document.getElementById("listbuku");
const totalbuku = document.getElementById("totalbuku")

let jumlahbuku = 0

// tombol tambah buku
btntambah.addEventListener("click", tambahbuku);

function tambahbuku() {
    const judul = document.getElementById("judul").value;
    const penulis = document.getElementById("penulis").value;
    const kategori = document.getElementById("kategori").value;
    const tahun = document.getElementById("tahun").value;
    const status = document.getElementById("status").value;

    //validasi
    if (
        judul === "" ||
        penulis === "" ||
        kategori === "" ||
        tahun === ""
    ) {
        alert("lengkapi semua data buku!");
        return;
    }

    // meanamnbahkan ke firebase
    db.collection("buku").add({
        judul: judul,
        penulis: penulis,
        kategori: kategori,
        tahun: tahun,
        status: status
    })
    .then((docRef) => {
    console.log("Berhasil disimpan:", docRef.id);
    })
    .catch((error) => {
    console.error("Error:", error);
    });
    //membuat card buku
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3> 📖 ${judul}</h3>

         <p><b>Penulis :</b> ${penulis}</p>

        <p><b>Kategori :</b> ${kategori}</p>

        <p><b>Tahun :</b> ${tahun}</p>

        <p><b>Status :</b> ${status}</p>

        <div class="aksi">

            <button class="hapus">
                🗑 Hapus
            </button>

        </div>
    `;

    //tombol hapus

    card.querySelector(".hapus").addEventListener("click", function() {
        card.remove();
        jumlahbuku --;
        totalbuku.innerText = jumlahbuku;
    });

    //tampilkan buku
    listbuku.appendChild(card);
    jumlahbuku++;
    totalbuku.innerText = jumlahbuku;

    //kosongkan form
    document.getElementById("judul").value = "";
    document.getElementById("penulis").value = "";
    document.getElementById("kategori").value = "";
    document.getElementById("tahun").value = "";
    document.getElementById("status").selectedIndex = 0;
}    
