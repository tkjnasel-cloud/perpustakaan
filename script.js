const btntambah = document.getElementById("btntambah");
const listbuku = document.getElementById("listbuku");
const totalbuku = document.getElementById("totalbuku");

btntambah.addEventListener("click", tambahBuku);

// =======================
// TAMPILKAN DATA
// =======================
function tampilkanBuku() {
    listbuku.innerHTML = "";
    let jumlah = 0;

    db.collection("buku").get().then((querySnapshot) => {

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

                <div class="aksi">

                    <button class="edit">
                        ✏ Edit
                    </button>

                    <button class="hapus">
                        🗑 Hapus
                    </button>

                </div>
            `;

            // =======================
            // HAPUS
            // =======================

            card.querySelector(".hapus").addEventListener("click", () => {

                if (confirm("Yakin ingin menghapus buku ini?")) {

                    db.collection("buku").doc(doc.id).delete()

                    .then(() => {

                        tampilkanBuku();

                    });

                }

            });

            // =======================
            // EDIT
            // =======================

            card.querySelector(".edit").addEventListener("click", () => {

                const judulBaru = prompt("Judul", data.judul);
                if (judulBaru === null) return;

                const penulisBaru = prompt("Penulis", data.penulis);
                if (penulisBaru === null) return;

                const kategoriBaru = prompt("Kategori", data.kategori);
                if (kategoriBaru === null) return;

                const tahunBaru = prompt("Tahun", data.tahun);
                if (tahunBaru === null) return;

                const statusBaru = prompt(
                    "Status",
                    data.status
                );

                if (statusBaru === null) return;

                db.collection("buku")
                    .doc(doc.id)
                    .update({

                        judul: judulBaru,
                        penulis: penulisBaru,
                        kategori: kategoriBaru,
                        tahun: tahunBaru,
                        status: statusBaru

                    })

                    .then(() => {

                        tampilkanBuku();

                    });

            });

            listbuku.appendChild(card);

            jumlah++;

        });

        totalbuku.innerText = jumlah;

    });

}

// =======================
// TAMBAH BUKU
// =======================

function tambahBuku() {

    const judul = document.getElementById("judul").value;
    const penulis = document.getElementById("penulis").value;
    const kategori = document.getElementById("kategori").value;
    const tahun = document.getElementById("tahun").value;
    const status = document.getElementById("status").value;

    if (
        judul == "" ||
        penulis == "" ||
        kategori == "" ||
        tahun == ""
    ) {

        alert("Lengkapi semua data!");

        return;

    }

    db.collection("buku")

        .add({

            judul: judul,
            penulis: penulis,
            kategori: kategori,
            tahun: tahun,
            status: status

        })

        .then(() => {

            document.getElementById("judul").value = "";
            document.getElementById("penulis").value = "";
            document.getElementById("kategori").value = "";
            document.getElementById("tahun").value = "";
            document.getElementById("status").selectedIndex = 0;

            tampilkanBuku();

        })

        .catch((error) => {

            console.error(error);

        });

}

// =======================
// LOAD AWAL
// =======================

tampilkanBuku();
