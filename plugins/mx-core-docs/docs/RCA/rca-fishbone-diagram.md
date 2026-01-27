---
title: Fishbone Diagram sebagai Alat Eksplorasi Penyebab dalam Root Cause Analysis Berbasis RBM
authors: ['sam']
date: '2023-10-26'
tags:
  [
    'fishbone-diagram',
    'diagram-ishikawa',
    'root-cause-analysis',
    'rca-modular',
    'risk-based-maintenance',
    'troubleshooting-industri',
    'pemeliharaan-pabrik-petrokimia',
    'cause-exploration',
    'maintenance-engineering',
    'process-safety-boundary',
  ]
draft: false
summary: Fishbone Diagram (Diagram Ishikawa) merupakan alat eksplorasi penyebab dalam proses Root Cause Analysis (RCA) yang digunakan setelah suatu masalah dinyatakan layak dianalisis secara formal dan diklasifikasikan sebagai kompleksitas rendah hingga menengah dalam kerangka Risk-Based Maintenance (RBM). Metode ini berfungsi untuk mengidentifikasi dan mengelompokkan penyebab potensial secara sistematis melalui pendekatan 5M + 1E, tanpa bertujuan menetapkan akar penyebab final. Dalam industri petrokimia, Fishbone Diagram efektif untuk mencegah bias analisis awal dan mendukung diskusi lintas fungsi. Namun, penggunaannya harus dibatasi oleh stop rule yang jelas, agar tidak disalahgunakan pada masalah berisiko tinggi atau process safety.
---

**_Fishbone Diagram sebagai Alat Eksplorasi Penyebab dalam Root Cause Analysis Berbasis RBM_**

---

- [🔰 Prolog – Posisi Artikel dalam Ekosistem Root Cause Analysis (RCA)](#-prolog--posisi-artikel-dalam-ekosistem-root-cause-analysis-rca)
- [🧠 Pengenalan Fishbone Diagram (Kontekstual \& Terbatas)](#-pengenalan-fishbone-diagram-kontekstual--terbatas)
- [🧠 Posisi Fishbone Diagram dalam Ekosistem Root Cause Analysis (RCA)](#-posisi-fishbone-diagram-dalam-ekosistem-root-cause-analysis-rca)
- [⚙️ Karakter Masalah yang Cocok untuk Fishbone Diagram](#️-karakter-masalah-yang-cocok-untuk-fishbone-diagram)
- [🧩 Fishbone Diagram sebagai Alat Eksplorasi (Bukan Penetap Akar)](#-fishbone-diagram-sebagai-alat-eksplorasi-bukan-penetap-akar)
- [🧱 Struktur 5M + 1E dalam Konteks Industri Petrokimia](#-struktur-5m--1e-dalam-konteks-industri-petrokimia)
  - [**Man (Manusia)**](#man-manusia)
  - [**Method (Metode)**](#method-metode)
  - [**Machine (Mesin / Peralatan)**](#machine-mesin--peralatan)
  - [**Material**](#material)
  - [**Measurement (Pengukuran)**](#measurement-pengukuran)
  - [**Environment (Lingkungan)**](#environment-lingkungan)
- [🛑 Stop Rule – Kapan Fishbone Diagram Harus Dihentikan](#-stop-rule--kapan-fishbone-diagram-harus-dihentikan)
- [🔍 Case Study Aplikatif – Penggunaan Fishbone Diagram yang Tepat](#-case-study-aplikatif--penggunaan-fishbone-diagram-yang-tepat)
  - [Deskripsi Masalah](#deskripsi-masalah)
  - [RBM Gate – Evaluasi Awal Risiko dan Kompleksitas](#rbm-gate--evaluasi-awal-risiko-dan-kompleksitas)
  - [Keputusan Metode](#keputusan-metode)
  - [Eksplorasi Fishbone Diagram (Ringkas)](#eksplorasi-fishbone-diagram-ringkas)
  - [Hasil Analisis Fishbone](#hasil-analisis-fishbone)
  - [Keputusan Akhir dan Tindakan](#keputusan-akhir-dan-tindakan)
- [🔗 Integrasi Fishbone Diagram dengan Metode RCA Lain](#-integrasi-fishbone-diagram-dengan-metode-rca-lain)
- [🎯 Penegasan Akhir](#-penegasan-akhir)
- [📚 Referensi Teknis](#-referensi-teknis)

---

## 🔰 Prolog – Posisi Artikel dalam Ekosistem Root Cause Analysis (RCA)

Artikel ini disusun sebagai **bagian dari seri modular Root Cause Analysis (RCA)** yang dikembangkan dalam kerangka **Risk-Based Maintenance (RBM)** untuk mendukung praktik pemeliharaan dan pengambilan keputusan teknis di industri petrokimia. Peran artikel ini **bersifat spesifik dan terbatas**, yaitu membahas **Fishbone Diagram sebagai alat eksplorasi penyebab**, bukan sebagai panduan pemilihan metode RCA secara menyeluruh.

Perlu ditegaskan sejak awal bahwa artikel ini **bukan entry point RCA** dan **bukan alat untuk menentukan metode RCA yang akan digunakan**. Fishbone Diagram digunakan **setelah** suatu permasalahan:

- dinyatakan **layak dinaikkan ke RCA formal**, dan
- diklasifikasikan sebagai masalah dengan **tingkat kompleksitas rendah hingga menengah**, berdasarkan evaluasi risiko dan struktur kegagalan.

Dalam konteks tersebut, Fishbone Diagram berfungsi sebagai **cause exploration tool**, dengan tujuan utama untuk:

- memperluas hipotesis penyebab secara sistematis,
- mencegah bias analisis yang terlalu cepat mengarah pada satu dugaan penyebab,
- serta menyiapkan dasar yang rasional untuk **melanjutkan analisis ke metode lain** atau **menghentikan analisis pada level yang proporsional**.

Fishbone Diagram **tidak dimaksudkan** untuk digunakan sebagai alat:

- analisis process safety,
- pemetaan dan evaluasi barrier keselamatan,
- maupun penetapan keputusan akhir dalam RCA.

Penggunaan Fishbone Diagram di luar batas perannya tersebut berpotensi menghasilkan analisis yang **tidak sebanding dengan risiko**, baik dalam bentuk analisis yang terlalu dangkal untuk masalah kritikal maupun analisis yang berlebihan untuk masalah operasional sederhana.

Oleh karena itu, untuk memahami secara utuh **kapan Fishbone Diagram tepat digunakan**, **mengapa metode ini dipilih**, dan **mengapa metode lain tidak digunakan**, pembaca **wajib merujuk terlebih dahulu** ke artikel induk berikut:

👉 _Panduan Troubleshooting & Pemilihan Metode RCA Berbasis Risk-Based Maintenance (RBM)_

Tanpa kerangka pengambilan keputusan yang disediakan oleh artikel induk tersebut, penerapan Fishbone Diagram berisiko tereduksi menjadi **sekadar aktivitas brainstorming**, tanpa kendali risiko, tanpa batas eskalasi yang jelas, dan tanpa keterkaitan yang kuat dengan tujuan utama RCA, yaitu pengendalian risiko dan peningkatan keandalan sistem secara berkelanjutan.

---

## 🧠 Pengenalan Fishbone Diagram (Kontekstual & Terbatas)

Fishbone Diagram dikenal secara luas sebagai **Diagram Ishikawa** atau **Cause-and-Effect Diagram**, yaitu alat bantu visual yang digunakan untuk **memetakan kemungkinan penyebab suatu masalah secara terstruktur dan sistematis**. Representasi grafis berbentuk “tulang ikan” digunakan untuk mengelompokkan berbagai faktor penyebab ke dalam kategori tertentu, sehingga hubungan antara masalah utama (_effect_) dan faktor-faktor penyebabnya dapat dilihat secara menyeluruh.

![fishbone-diagram-1](/static/images/artikel/fishbone-diagram-1.jpg)

Dalam konteks Root Cause Analysis (RCA), Fishbone Diagram **bukan metode untuk menemukan akar penyebab final**. Peran utamanya adalah:

- mengidentifikasi **penyebab-penyebab potensial**,
- membuka ruang eksplorasi faktor teknis dan non-teknis,
- serta membantu tim memahami **kompleksitas awal suatu masalah** sebelum dilakukan analisis lanjutan.

Dengan kata lain, Fishbone Diagram menjawab pertanyaan _“apa saja yang mungkin berkontribusi terhadap masalah ini?”_, bukan _“inilah akar penyebab yang pasti”_.

Di industri petrokimia, Fishbone Diagram umumnya digunakan pada **tahap awal RCA**, khususnya ketika:

- penyebab kegagalan **belum jelas**,
- bukti teknis **belum cukup untuk langsung menunjuk satu mekanisme kegagalan**,
- dan masalah masih berada pada kelas kompleksitas rendah hingga menengah.

Pada kondisi tersebut, Fishbone Diagram berperan penting dalam **menyusun hipotesis awal secara terkontrol**, sebelum tim memutuskan apakah analisis perlu diperdalam menggunakan metode lain seperti FTA, FMEA, atau RCFA.

Kekuatan utama Fishbone Diagram terletak pada kemampuannya untuk:

- memfasilitasi diskusi lintas fungsi antara operasi, maintenance, instrumentasi & elektrikal, serta engineering,
- mencegah analisis yang terlalu sempit atau bias terhadap satu disiplin tertentu sejak awal,
- dan membantu tim melihat masalah sebagai hasil interaksi berbagai faktor, bukan kegagalan tunggal yang berdiri sendiri.

Namun demikian, Fishbone Diagram memiliki **keterbatasan mendasar** yang harus dipahami secara eksplisit. Metode ini:

- tidak menunjukkan hubungan logika sebab–akibat secara kuantitatif atau struktural,
- tidak melakukan penilaian risiko atau konsekuensi kegagalan,
- serta tidak mengevaluasi potensi eskalasi keselamatan atau kegagalan barrier.

Oleh karena itu, Fishbone Diagram **tidak boleh diperlakukan sebagai alat analisis risiko maupun alat pengambilan keputusan akhir**. Nilai utamanya justru terletak pada fungsinya sebagai **alat eksplorasi awal yang terkontrol**, yang membantu memastikan bahwa analisis lanjutan—jika diperlukan—dibangun di atas pemahaman masalah yang utuh dan tidak bias.

---

## 🧠 Posisi Fishbone Diagram dalam Ekosistem Root Cause Analysis (RCA)

Dalam kerangka Root Cause Analysis (RCA) berbasis **Risk-Based Maintenance (RBM)**, Fishbone Diagram menempati posisi yang **spesifik dan terdefinisi dengan jelas**, yaitu pada **fase eksplorasi penyebab**, bukan pada fase pengambilan keputusan akhir. Posisi ini penting untuk dipahami agar Fishbone Diagram digunakan secara tepat dan tidak melampaui batas fungsinya.

Fishbone Diagram dirancang untuk menjawab pertanyaan dasar berikut:

- _“Apa saja kemungkinan penyebab yang dapat berkontribusi terhadap masalah ini?”_

Pertanyaan tersebut bersifat eksploratif dan bertujuan membuka spektrum penyebab yang mungkin, baik dari sisi manusia, metode, peralatan, material, pengukuran, maupun lingkungan. Pada tahap ini, fokus analisis adalah **kelengkapan dan keseimbangan sudut pandang**, bukan penentuan prioritas atau tingkat keparahan.

Sebaliknya, Fishbone Diagram **tidak dirancang untuk menjawab** pertanyaan-pertanyaan berikut:

- _“Mana penyebab yang paling kritis atau paling berisiko?”_
- _“Apakah kondisi ini aman secara process safety dan barrier keselamatan?”_

Pertanyaan-pertanyaan tersebut berada di luar cakupan Fishbone Diagram dan hanya dapat dijawab melalui metode yang memiliki kemampuan penilaian risiko, logika kegagalan, atau evaluasi konsekuensi, seperti FMEA, FTA, Bowtie, atau RCFA.

Dalam **alur RCA berbasis RBM**, posisi Fishbone Diagram berada di antara dua tahapan penting:

- **Sebelum Fishbone Diagram**
  Dilakukan **RBM gate** dan **klasifikasi kompleksitas masalah**, untuk memastikan bahwa:

  - masalah memang layak dianalisis menggunakan RCA formal, dan
  - tingkat risiko serta struktur kegagalan berada pada kelas yang sesuai untuk eksplorasi awal.

- **Sesudah Fishbone Diagram**
  Hasil eksplorasi digunakan sebagai dasar untuk:

  - memvalidasi atau mengeliminasi hipotesis penyebab,
  - menentukan apakah analisis cukup dihentikan pada level ini,
  - atau **meningkatkan analisis ke metode lain** yang lebih sesuai dengan risiko dan kompleksitas masalah.

Dengan demikian, Fishbone Diagram **harus selalu diperlakukan sebagai alat sementara**, bukan sebagai alat final dalam proses RCA. Nilainya terletak pada kemampuannya membantu tim **memahami ruang masalah secara utuh**, sehingga keputusan untuk berhenti atau melanjutkan analisis dapat diambil secara rasional dan sepadan dengan risiko yang dihadapi.

---

## ⚙️ Karakter Masalah yang Cocok untuk Fishbone Diagram

Fishbone Diagram efektif digunakan pada **kelas masalah tertentu** yang memiliki karakteristik spesifik. Penentuan kecocokan ini **bukan berdasarkan preferensi metode**, melainkan berdasarkan **profil risiko dan struktur masalah** dalam kerangka **Risk-Based Maintenance (RBM)**.

Fishbone Diagram **cocok diterapkan** pada masalah operasional yang memenuhi kriteria berikut:

- **Profil risiko keselamatan rendah hingga menengah**, di mana:

  - tidak terdapat indikasi langsung terhadap keselamatan personel,
  - tidak ada potensi eskalasi cepat ke insiden besar.

- **Tidak melibatkan loss of containment**, baik aktual maupun potensial, sehingga:

  - tidak ada pelepasan fluida berbahaya atau mudah terbakar,
  - tidak memerlukan investigasi berbasis process safety.

- **Tidak melibatkan kegagalan barrier keselamatan**, seperti:

  - safety interlock,
  - protective system,
  - atau lapisan proteksi lain yang bersifat kritikal.

Selain itu, Fishbone Diagram tepat digunakan pada masalah yang memiliki karakter berikut:

- **Gejala kegagalan terlihat secara operasional**, misalnya:

  - penurunan performa,
  - fluktuasi parameter,
  - atau degradasi kondisi peralatan.

- **Penyebab belum terkonfirmasi secara teknis**, sehingga:

  - belum tersedia bukti kuat untuk menunjuk satu mekanisme kegagalan,
  - analisis awal masih memerlukan eksplorasi hipotesis.

- **Terdapat dugaan lebih dari satu faktor penyebab**, baik dari sisi manusia, metode, peralatan, material, pengukuran, maupun lingkungan, sehingga pendekatan satu dimensi berisiko menimbulkan bias.

Fishbone Diagram juga sesuai untuk masalah yang:

- **belum menunjukkan pola kegagalan sistemik yang berat**, seperti kegagalan laten berulang lintas unit atau lintas fungsi,
- **belum memerlukan redesign teknis atau perubahan kebijakan besar**, termasuk perubahan filosofi operasi atau strategi pemeliharaan tingkat tinggi.

Sebaliknya, perlu ditegaskan bahwa Fishbone Diagram **tidak cocok** dan **tidak boleh dipaksakan** untuk digunakan pada kondisi berikut:

- **Insiden process safety**, atau kejadian yang berpotensi mengancam keselamatan, lingkungan, dan integritas proses.
- **Kegagalan interlock, permissive logic, atau sistem proteksi**, yang memerlukan analisis berbasis logika kegagalan dan evaluasi barrier.
- **Peralatan single-train atau aset kritikal** dengan risiko eskalasi tinggi, di mana kesalahan analisis dapat berdampak langsung terhadap keselamatan dan kontinuitas operasi.

Dengan memahami karakter masalah yang tepat, Fishbone Diagram dapat digunakan secara **efektif, proporsional, dan defensible**, tanpa menurunkan kualitas keputusan RCA maupun mengaburkan fokus terhadap pengendalian risiko.

---

## 🧩 Fishbone Diagram sebagai Alat Eksplorasi (Bukan Penetap Akar)

Fishbone Diagram digunakan dalam proses RCA untuk **mengeksplorasi ruang penyebab**, bukan untuk menetapkan kesimpulan akhir mengenai akar masalah. Peran utamanya adalah membantu tim menyusun **peta awal kemungkinan penyebab** secara sistematis, sehingga analisis lanjutan dapat dilakukan berdasarkan pemahaman yang utuh dan tidak bias.

Dalam praktiknya, Fishbone Diagram digunakan untuk:

- **Mengumpulkan kemungkinan penyebab**
  Fishbone memungkinkan tim mengidentifikasi berbagai faktor yang secara potensial berkontribusi terhadap suatu masalah, tanpa terlebih dahulu membatasi analisis pada satu dugaan penyebab tertentu.

- **Mengelompokkan faktor lintas domain**
  Penyebab-penyebab potensial dikelompokkan ke dalam domain yang relevan—seperti manusia, metode, peralatan, material, pengukuran, dan lingkungan—agar interaksi antar faktor dapat dipahami secara lebih terstruktur.

- **Membuka ruang diskusi teknis berbasis fakta lapangan**
  Fishbone mendorong diskusi lintas fungsi yang berfokus pada kondisi aktual di lapangan, data operasional, dan pengalaman teknis, bukan pada asumsi atau preferensi individu.

Namun demikian, Fishbone Diagram **tidak boleh digunakan untuk**:

- **Langsung menyatakan akar penyebab final**, tanpa adanya proses validasi teknis, pengujian hipotesis, atau pembuktian berbasis data.
- **Menetapkan corrective action berskala besar**, seperti perubahan desain, modifikasi sistem, atau revisi kebijakan, apabila rekomendasi tersebut belum didukung oleh analisis yang sepadan dengan tingkat risiko.

Kesalahan umum dalam penggunaan Fishbone Diagram adalah memperlakukannya sebagai **alat penentu keputusan**, padahal metode ini tidak dirancang untuk menilai risiko, keparahan, maupun konsekuensi kegagalan.

Oleh karena itu, **output Fishbone Diagram yang benar** seharusnya berupa:

- **Daftar penyebab potensial yang terstruktur**, bukan kesimpulan final.
- **Indikasi pola dominan atau kluster penyebab**, yang membantu tim memfokuskan perhatian pada area tertentu.
- **Dasar yang rasional untuk mengambil keputusan lanjutan**, apakah analisis:

  - dihentikan karena masalah telah dipahami dan risikonya terkendali, atau
  - dilanjutkan ke metode lain yang lebih sesuai dengan kompleksitas dan risiko masalah.

Dengan memahami Fishbone Diagram sebagai **alat eksplorasi**, bukan sebagai **penetap akar masalah**, organisasi dapat menjaga kualitas RCA tetap tajam, proporsional, dan selaras dengan prinsip Risk-Based Maintenance.

---

## 🧱 Struktur 5M + 1E dalam Konteks Industri Petrokimia

Dalam penerapan Fishbone Diagram, struktur **5M + 1E** digunakan sebagai kerangka pengelompokan penyebab potensial agar proses eksplorasi berjalan **lengkap, seimbang, dan tidak bias terhadap satu disiplin tertentu**. Pada industri petrokimia, setiap elemen 5M + 1E memiliki karakteristik khas yang perlu dipahami secara kontekstual.

### **Man (Manusia)**

Faktor manusia mencakup aspek kompetensi, perilaku, dan konsistensi pelaksanaan pekerjaan, antara lain:

- **Kompetensi operator**, termasuk pemahaman terhadap proses, peralatan, dan kondisi abnormal.
- **Variasi praktik antar shift**, yang dapat menyebabkan perbedaan cara operasi, inspeksi, atau penanganan gangguan.
- **Disiplin terhadap prosedur**, khususnya dalam mengikuti SOP start-up, shutdown, dan respons terhadap deviasi proses.

Dalam Fishbone Diagram, faktor _Man_ tidak dimaksudkan untuk menunjuk kesalahan individu, melainkan untuk mengidentifikasi **potensi kelemahan sistem kerja dan pengendalian operasional**.

---

### **Method (Metode)**

Faktor metode berkaitan dengan kejelasan, kecukupan, dan relevansi prosedur yang digunakan, meliputi:

- **SOP yang tidak eksplisit atau ambigu**, sehingga membuka ruang interpretasi berbeda di lapangan.
- **Prosedur start-up dan shutdown** yang tidak sepenuhnya mencerminkan kondisi aktual peralatan atau perubahan proses.
- **Interval inspeksi yang tidak berbasis risiko**, misalnya inspeksi dilakukan berdasarkan kebiasaan waktu, bukan berdasarkan criticality dan kondisi operasi.

Pada tahap Fishbone, faktor _Method_ membantu mengungkap apakah masalah berakar pada **cara kerja yang ditetapkan**, bukan semata pada pelaksanaannya.

---

### **Machine (Mesin / Peralatan)**

Faktor mesin mencakup kondisi fisik dan karakteristik teknis peralatan, antara lain:

- **Kondisi mekanik aktual**, seperti keausan, misalignment, atau degradasi performa.
- **Toleransi desain**, yang mungkin masih berada dalam batas spesifikasi namun mendekati limit operasional.
- **Degradasi komponen**, baik yang bersifat gradual maupun akibat kondisi operasi tertentu.

Fishbone Diagram pada domain _Machine_ berfungsi untuk mengidentifikasi **indikasi awal kegagalan teknis**, tanpa langsung menyimpulkan mekanisme kegagalan fisik yang memerlukan RCFA.

---

### **Material**

Faktor material berhubungan dengan kesesuaian dan kualitas material yang digunakan dalam operasi dan pemeliharaan, meliputi:

- **Spesifikasi pelumas**, termasuk viskositas, aditif, dan kecocokan dengan temperatur operasi.
- **Kualitas spare part**, baik dari sisi material, manufaktur, maupun kesesuaian dengan spesifikasi desain.
- **Kompatibilitas material**, terutama pada lingkungan kimia agresif atau temperatur ekstrem.

Pada tahap eksplorasi, faktor _Material_ membantu membedakan apakah masalah berkaitan dengan **kualitas atau kecocokan material**, bukan semata kondisi peralatan.

---

### **Measurement (Pengukuran)**

Faktor pengukuran berkaitan dengan ketersediaan, keandalan, dan pemanfaatan data, antara lain:

- **Sensor yang tidak ditrending**, sehingga perubahan kondisi hanya diketahui secara sporadis.
- **Inspeksi yang hanya bersifat visual**, tanpa dukungan data kuantitatif.
- **Data yang tidak dikaitkan dengan kondisi operasi**, misalnya parameter dicatat tetapi tidak dianalisis terhadap beban, temperatur, atau mode operasi.

Fishbone Diagram pada domain _Measurement_ sering mengungkap bahwa masalah bukan terletak pada prosesnya, melainkan pada **keterbatasan visibilitas kondisi aktual**.

---

### **Environment (Lingkungan)**

Faktor lingkungan mencakup kondisi sekitar peralatan dan area kerja yang dapat mempengaruhi operasi, antara lain:

- **Panas radiasi** dari peralatan lain atau proses di sekitarnya.
- **Vibrasi sekitar**, baik dari peralatan berdekatan maupun dari struktur pendukung.
- **Kondisi area kerja**, seperti akses terbatas, paparan cuaca, atau kebersihan area.

Dalam konteks petrokimia, faktor _Environment_ sering bersifat **kontributor tidak langsung**, namun dapat mempercepat degradasi atau memperburuk kondisi operasi jika tidak diidentifikasi sejak awal.

---

## 🛑 Stop Rule – Kapan Fishbone Diagram Harus Dihentikan

Fishbone Diagram **bukan metode yang digunakan tanpa batas**. Dalam kerangka Root Cause Analysis (RCA) berbasis **Risk-Based Maintenance (RBM)**, harus terdapat **aturan penghentian (stop rule)** yang jelas untuk menentukan kapan eksplorasi penyebab dengan Fishbone **tidak lagi memadai** dan analisis **wajib ditingkatkan** ke metode lain yang lebih sesuai.

Fishbone Diagram **harus dihentikan** dan **eskalasi metode dilakukan** apabila selama proses eksplorasi ditemukan satu atau lebih kondisi berikut:

- **Lebih dari satu jalur sebab yang saling bergantung**, di mana:

  - penyebab tidak berdiri sendiri,
  - hubungan antar faktor tidak lagi bersifat sederhana,
  - dan kegagalan hanya terjadi ketika beberapa kondisi terpenuhi secara bersamaan.
    Kondisi ini menunjukkan bahwa struktur kegagalan **tidak lagi linear**, sehingga Fishbone tidak mampu menjelaskan hubungan sebab–akibat secara memadai.

- **Keterlibatan sistem proteksi atau logika operasi**, termasuk:

  - interlock,
  - permissive,
  - maupun override operator.
    Kehadiran elemen-elemen ini menandakan bahwa kegagalan telah menyentuh **ranah sistem dan kontrol**, yang memerlukan analisis berbasis logika kegagalan, bukan sekadar pengelompokan penyebab.

- **Kegagalan tetap terjadi meskipun corrective action telah dilakukan**, yang menunjukkan bahwa:

  - tindakan korektif hanya mengatasi gejala,
  - akar penyebab belum tersentuh,
  - atau terdapat kegagalan laten yang belum teridentifikasi.
    Pada kondisi ini, melanjutkan Fishbone hanya akan mengulang eksplorasi tanpa menghasilkan pemahaman baru.

- **Terdapat potensi eskalasi risiko** terhadap:

  - keselamatan personel,
  - lingkungan,
  - atau integritas proses.
    Begitu potensi eskalasi teridentifikasi, Fishbone Diagram **tidak lagi memadai** karena metode ini tidak memiliki mekanisme untuk menilai konsekuensi dan barrier keselamatan.

Apabila satu atau lebih kondisi di atas terpenuhi, maka Fishbone Diagram **harus dihentikan secara disiplin**, dan analisis **ditingkatkan** sesuai karakter masalah, yaitu:

- **Fault Tree Analysis (FTA)**
  digunakan apabila diperlukan pemahaman tentang **logika kegagalan sistem**, interaksi antar kondisi, dan kombinasi event yang menyebabkan kegagalan.

- **Root Cause Failure Analysis (RCFA)**
  digunakan apabila fokus analisis bergeser ke **mekanisme kegagalan fisik**, degradasi material, atau kegagalan teknis mendalam pada komponen kritikal.

Stop rule ini berfungsi sebagai **pengaman metodologis**, memastikan bahwa Fishbone Diagram digunakan **cukup jauh untuk memberikan nilai**, namun **dihentikan tepat waktu** sebelum menghasilkan analisis yang tidak proporsional terhadap risiko. Dengan disiplin ini, kualitas RCA tetap terjaga, keputusan teknis tetap defensible, dan fokus organisasi tetap pada pengendalian risiko yang nyata.

---

## 🔍 Case Study Aplikatif – Penggunaan Fishbone Diagram yang Tepat

Bagian ini menyajikan contoh penerapan Fishbone Diagram yang **proporsional dan tepat sasaran** dalam konteks industri petrokimia, dengan tujuan menunjukkan **bagaimana metode ini digunakan**, **mengapa dipilih**, serta **mengapa tidak ditingkatkan ke metode lain**.

### Deskripsi Masalah

Pada salah satu unit proses, teridentifikasi kondisi **kenaikan temperatur bearing pompa** yang terjadi secara sporadis selama operasi normal. Karakteristik masalah yang diamati adalah sebagai berikut:

- kenaikan temperatur tidak bersifat kontinu,
- tidak menyebabkan pompa mengalami trip,
- tidak memicu alarm process safety atau sistem proteksi lainnya.

Secara operasional, kondisi ini menimbulkan kekhawatiran terhadap keandalan jangka menengah, namun **belum menunjukkan indikasi kegagalan kritikal**.

---

### RBM Gate – Evaluasi Awal Risiko dan Kompleksitas

Sesuai dengan kerangka **Risk-Based Maintenance (RBM)**, dilakukan evaluasi awal untuk menentukan kelayakan metode analisis:

- **Risiko keselamatan**: rendah
  Tidak terdapat potensi langsung terhadap keselamatan personel atau lingkungan.

- **Equipment criticality**: menengah
  Pompa bukan merupakan single-train critical equipment dan masih memiliki margin operasional.

- **Indikasi kegagalan sistemik**: belum ada
  Tidak ditemukan pola kegagalan berulang lintas unit atau keterlibatan sistem proteksi.

Berdasarkan evaluasi tersebut, masalah dinyatakan **layak dianalisis dengan RCA ringan**, tanpa perlu langsung menggunakan metode analisis mendalam.

---

### Keputusan Metode

Dengan mempertimbangkan profil risiko dan kompleksitas masalah, **Fishbone Diagram dipilih sebagai metode eksplorasi awal**, dengan tujuan:

- mengidentifikasi kemungkinan penyebab lintas domain,
- mencegah fokus analisis yang terlalu sempit,
- dan menentukan apakah analisis perlu ditingkatkan atau cukup dihentikan pada tahap ini.

---

### Eksplorasi Fishbone Diagram (Ringkas)

Hasil eksplorasi penyebab menggunakan struktur **5M + 1E** dirangkum sebagai berikut:

- **Man**
  Variasi praktik pelumasan antar shift, khususnya dalam frekuensi dan metode aplikasi.

- **Method**
  SOP pemeliharaan tidak secara eksplisit mewajibkan verifikasi temperatur bearing setelah start-up.

- **Machine**
  Kondisi alignment pompa masih dalam batas spesifikasi, namun mendekati nilai toleransi maksimum.

- **Material**
  Spesifikasi grease yang digunakan kurang optimal untuk temperatur operasi aktual.

- **Measurement**
  Temperatur bearing hanya diperiksa secara periodik, tanpa sistem trending yang memadai.

- **Environment**
  Terdapat radiasi panas dari peralatan di sekitar pompa yang meningkatkan beban termal lokal.

---

### Hasil Analisis Fishbone

Dari eksplorasi tersebut diperoleh beberapa temuan penting:

- tidak ditemukan indikasi kegagalan fatal atau mekanisme kegagalan fisik yang jelas,
- pola dominan mengarah pada kombinasi faktor **Method, Measurement, dan Environment**,
- tidak terdapat trigger yang mengindikasikan keterlibatan process safety atau barrier keselamatan.

Hasil ini menunjukkan bahwa masalah lebih bersifat **operasional dan prosedural**, bukan kegagalan teknis mendalam.

---

### Keputusan Akhir dan Tindakan

Berdasarkan hasil Fishbone Diagram dan evaluasi terhadap **stop rule**, diputuskan bahwa:

- analisis **tidak perlu ditingkatkan ke RCFA atau FTA**,
- Fishbone Diagram telah memberikan pemahaman yang cukup untuk mengambil tindakan perbaikan yang proporsional.

Tindakan yang dilakukan meliputi:

- **revisi SOP** untuk memasukkan verifikasi temperatur bearing pasca-start,
- **penambahan sistem trending temperatur** untuk pemantauan kondisi secara berkelanjutan,
- **pemasangan shielding panas lokal** untuk mengurangi pengaruh radiasi panas lingkungan.

> Studi kasus ini menunjukkan bahwa Fishbone Diagram dapat **menyelesaikan masalah pada level yang tepat**, menghasilkan keputusan teknis yang efektif, dan **mencegah over-analysis** pada masalah dengan risiko yang terkendali.

---

## 🔗 Integrasi Fishbone Diagram dengan Metode RCA Lain

Fishbone Diagram **tidak berdiri sendiri** dalam praktik Root Cause Analysis (RCA) yang matang. Nilai utamanya muncul ketika digunakan **sebagai bagian dari rangkaian metode**, bukan sebagai alat tunggal yang dipaksakan untuk menjawab seluruh pertanyaan analisis.

Dalam ekosistem RCA berbasis **Risk-Based Maintenance (RBM)**, posisi dan peran masing-masing metode dapat dipahami sebagai berikut:

- **Fishbone Diagram → Eksplorasi Penyebab**
  Digunakan untuk memperluas hipotesis penyebab secara terstruktur pada tahap awal analisis. Fishbone membantu memastikan bahwa faktor manusia, metode, peralatan, material, pengukuran, dan lingkungan **tidak terlewatkan**, namun **tidak menetapkan keputusan akhir**.

- **FMEA (Failure Mode and Effects Analysis) → Prioritisasi Risiko**
  Digunakan setelah penyebab potensial teridentifikasi, untuk menilai **tingkat risiko** dari masing-masing mode kegagalan dan menentukan fokus mitigasi berdasarkan dampak dan kemungkinan terjadinya.

- **FTA (Fault Tree Analysis) → Logika Kegagalan Sistem**
  Digunakan ketika kegagalan melibatkan **kombinasi kondisi**, interlock, permissive, atau hubungan sebab–akibat yang tidak linear. FTA menjawab pertanyaan _bagaimana sistem gagal_ melalui struktur logika yang eksplisit.

- **RCFA (Root Cause Failure Analysis) → Mekanisme Kegagalan Fisik**
  Digunakan ketika diperlukan pemahaman mendalam mengenai **mekanisme degradasi atau kerusakan komponen**, berbasis bukti fisik, inspeksi detail, dan analisis teknis mendalam.

- **Bowtie Analysis → Manajemen Risiko dan Barrier Keselamatan**
  Digunakan untuk memetakan hubungan antara ancaman, _top event_, konsekuensi, serta barrier preventif dan mitigatif, khususnya dalam konteks **process safety dan major accident hazard**.

Dalam struktur ini, Fishbone Diagram **selalu berada di hulu analisis**, berfungsi sebagai alat eksplorasi dan penyaringan awal. Fishbone **bukan alat hilir** untuk menetapkan akar penyebab final, bukan alat penilaian risiko, dan bukan dasar keputusan keselamatan.

Dengan disiplin integrasi seperti ini, setiap metode RCA digunakan **pada konteks yang tepat**, menghasilkan analisis yang proporsional terhadap risiko, serta keputusan teknis yang dapat dipertanggungjawabkan secara operasional, engineering, dan governance.

---

## 🎯 Penegasan Akhir

Fishbone Diagram **bukan alat serbaguna** yang dapat digunakan untuk seluruh kelas masalah. Nilai dan efektivitasnya **sangat bergantung pada ketepatan konteks penggunaan**, bukan pada kelengkapan diagram atau banyaknya faktor yang dicantumkan.

Fishbone Diagram memiliki nilai tinggi **hanya jika digunakan pada kelas masalah yang tepat**, yaitu masalah dengan risiko keselamatan rendah hingga menengah, kompleksitas terbatas, dan tanpa indikasi kegagalan sistemik atau process safety.

Dalam kerangka **Risk-Based Maintenance (RBM)**, Fishbone harus dipahami sebagai:

- **alat bantu berpikir (thinking aid)** untuk eksplorasi penyebab,
- **bukan alat penetap keputusan akhir**,
- dan **bukan pengganti analisis berbasis risiko dan struktur kegagalan**.

Keputusan dalam RCA **tidak ditentukan oleh metode**, melainkan oleh:

- tingkat risiko yang dihadapi,
- struktur sebab–akibat kegagalan,
- serta implikasi keselamatan, lingkungan, dan integritas proses.

Fishbone Diagram yang **diposisikan secara benar** dalam ekosistem RCA akan:

- menghemat waktu analisis dengan membatasi eksplorasi pada level yang relevan,
- mencegah **over-analysis** pada masalah berisiko rendah,
- menjaga fokus RCA tetap tajam, terarah, dan **defensible** dalam review teknis maupun audit.

Sebaliknya, Fishbone yang digunakan tanpa kerangka keputusan RBM berisiko berubah menjadi diskusi panjang tanpa kendali risiko, yang tidak memberikan nilai tambah terhadap keandalan maupun keselamatan operasi.

---

## 📚 Referensi Teknis

1. **ISO 55000 Series** – _Asset Management: Overview, Principles and Terminology_
   Menjadi dasar pengelolaan aset dan pengambilan keputusan berbasis risiko.

2. **IEC 60812** – _Failure Modes and Effects Analysis (FMEA and FMECA)_
   Standar internasional untuk analisis mode kegagalan dan prioritisasi risiko.

3. **API RP 580 & API RP 581** – _Risk-Based Inspection_
   Referensi utama untuk pendekatan berbasis risiko dalam pengelolaan integritas aset industri proses.

4. **CCPS (AIChE)** – _Guidelines for Investigating Chemical Process Incidents_
   Panduan investigasi insiden proses kimia dengan fokus keselamatan dan pembelajaran organisasi.

5. **API RP 754** – _Process Safety Performance Indicators_
   Standar indikator kinerja keselamatan proses untuk industri petrokimia dan migas.

6. **NASA Root Cause Analysis Handbook**
   Referensi metodologis RCA yang menekankan disiplin analisis dan pengambilan keputusan berbasis bukti.

7. **UK Health and Safety Executive (HSE)** – _Root Cause Analysis Guidance_
   Panduan RCA dengan perspektif keselamatan, human factors, dan sistem manajemen.

8. **SMRP Best Practices** – _Maintenance & Reliability Body of Knowledge_
   Rujukan praktik terbaik pemeliharaan dan keandalan industri.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
