# Engineering Article Template — EAT-E (LOCKED)

Setiap artikel engineering **WAJIB mengikuti urutan tetap berikut**:

```text
1. Model
2. Parameter
3. Graph
4. Example Calculation
5. Engineering Insight
```

Urutan **tidak boleh diubah**.

Tidak boleh menambahkan bab lain sebelum, di tengah, atau setelah struktur ini.

---

# Struktur Artikel (WAJIB)

Gunakan format berikut **secara persis**.

```md
## Topic

### Model

$$
equation
$$

### Parameter

| Parameter | Description | Typical Value / Unit |
| --------- | ----------- | -------------------- |

### Graph

(jelaskan hubungan variabel dalam grafik)

### Example Calculation

Input data

calculation

result

### Engineering Insight

Interpretasi engineering maksimum 3 kalimat.
```

---

# 1. Model

Model adalah **persamaan matematis yang menjelaskan fenomena fisika**.

Format:

```md
### Model

$$
equation
$$
```

Contoh:

$$
L_{10} = \left(\frac{C}{P}\right)^p
$$

Model harus berasal dari:

- physics
- mechanics
- thermodynamics
- electrical law
- reliability model
- fluid mechanics
- tribology
- control theory

Artikel **tidak boleh tanpa model**.

---

# 2. Parameter

Parameter menjelaskan variabel dalam model.

Format tabel wajib:

| Parameter | Description | Typical Value / Unit |
| --------- | ----------- | -------------------- |

Contoh:

| Parameter | Description             | Typical Value / Unit |
| --------- | ----------------------- | -------------------- |
| C         | dynamic load rating     | kN                   |
| P         | equivalent bearing load | kN                   |
| p         | exponent                | 3 (ball bearing)     |

Jika memungkinkan sertakan:

- unit
- nilai praktis di industri

---

# 3. Graph

Graph menjelaskan **hubungan antar variabel** yang tidak langsung terlihat dari persamaan.

Format:

```md
### Graph

(deskripsi hubungan variabel)
```

Contoh hubungan:

| Graph            | Fungsi               |
| ---------------- | -------------------- |
| Load vs Life     | fatigue behaviour    |
| Stribeck curve   | lubrication regime   |
| Bathtub curve    | failure rate vs time |
| Stress vs Strain | material behaviour   |
| Pump curve       | head vs flow         |

Graph tidak harus berupa gambar; cukup menjelaskan hubungan variabel secara jelas.

Contoh:

```
Bearing life decreases rapidly as load increases.
Log-log relationship: L ∝ P^-p
```

---

# 4. Example Calculation

Contoh perhitungan adalah **bagian paling penting**.

Format wajib:

```text
Input data
```

kemudian lakukan substitusi ke model.

Contoh:

```
C = 40 kN
P = 10 kN
p = 3
```

Substitusi:

$$
L_{10} = (40/10)^3
$$

Hasil:

```
L10 = 64
```

Artinya:

```
bearing life = 64 × basic rating life
```

Example calculation harus menunjukkan:

```
input → substitution → result
```

---

# 5. Engineering Insight

Bagian ini adalah **interpretasi engineering dari hasil model**.

Batas maksimum:

```
3 kalimat
```

Tujuan:

```
menghubungkan matematika dengan keputusan engineering
```

Contoh:

```
Doubling load reduces bearing life eight times.
Small overload drastically shortens bearing life.
Load control is critical for rotating equipment reliability.
```

Tidak boleh menjadi narasi panjang.

---

# Kriteria Artikel Engineering Valid

Artikel dianggap valid jika memiliki minimal:

```
1 Model matematis
1 Example Calculation
```

Jika dua elemen ini tidak ada, artikel biasanya hanya narasi.

---

# Prinsip Engineering Writing

Artikel harus mengikuti pola engineering:

```
physics
→ variable
→ behaviour
→ calculation
→ engineering interpretation
```

Bukan:

```
fenomena
→ cerita
→ deskripsi
```

---

# Batas Panjang Artikel

Target panjang artikel:

```
400 – 700 kata
```

Lebih panjang dari ini biasanya berarti narasi berulang.

Engineer lebih mudah memahami:

```
equation
parameter
graph
calculation
```

daripada paragraf panjang.

---

# Domain yang Dapat Menggunakan Template Ini

Template ini berlaku untuk seluruh disiplin engineering:

### Mechanical

- bearing
- bolt preload
- shaft stress
- gear fatigue
- lubrication

### Electrical

- Ohm law
- motor current
- short circuit current
- transformer loading
- cable voltage drop

### Instrumentation

- control valve flow coefficient
- orifice flow equation
- transmitter signal scaling

### Process

- pump head
- pressure drop
- heat transfer

### Reliability

- failure rate
- MTBF
- Weibull distribution

---

# Prinsip Penting

Artikel engineering harus mengandung:

```
Model → Parameter → Relationship → Calculation → Insight
```

Tanpa model dan perhitungan, artikel berubah menjadi narasi.

Template **EAT-E** dirancang untuk memastikan artikel tetap **analytical engineering**.

---

# Template Copy-Paste (FINAL)

Gunakan template ini setiap membuat artikel.

```md
## Topic

### Model

$$
equation
$$

### Parameter

| Parameter | Description | Typical Value / Unit |
| --------- | ----------- | -------------------- |

### Graph

(deskripsi hubungan variabel dalam grafik)

### Example Calculation

Input data

(substitusi ke persamaan)

hasil perhitungan

### Engineering Insight

Interpretasi engineering maksimum 3 kalimat.
```

---
