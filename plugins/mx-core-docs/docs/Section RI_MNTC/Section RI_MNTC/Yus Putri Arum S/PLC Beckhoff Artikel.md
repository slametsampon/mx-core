
---
title: 'Arsitektur dan Implementasi Beckhoff CX9020 Sebagai Kontroler PLC Industri'
date: '2026-13-02'
tags: ['PLC', 'beckhoff', 'TwinCAT', 'otomasi', 'industri']
draft: true
summary: 'Beckhoff CX9020 merupakan embedded PC controller berbasis ARM Cortex-A8 1 GHz yang dirancang untuk aplikasi otomasi industri modern'
---

# Pendahuluan

Dalam evolusi sistem otomasi industri modern, kebutuhan terhadap kontroler yang kuat, fleksibel, namun tetap ringkas semakin meningkat. Industri proses, manufaktur, hingga sistem energi menuntut perangkat kontrol yang tidak hanya mampu menjalankan logika kontrol secara real-time, tetapi juga mendukung komunikasi jaringan industri berkecepatan tinggi, integrasi sistem monitoring, serta kemudahan ekspansi Input/Output (I/O).

Beckhoff Automation menjawab tantangan tersebut melalui pengembangan seri Embedded Personal Computer (PC) CX, salah satunya adalah Beckhoff CX9020. Perangkat ini merupakan Programmable Logic Controller (PLC) berbasis arsitektur embedded yang menggabungkan performa komputasi tinggi dengan desain kompak untuk pemasangan pada Deutsches Institut für Normung (DIN) rail. CX9020 dirancang untuk menangani tugas kontrol mesin dan proses, komunikasi I/O terdistribusi, serta integrasi sistem otomasi berbasis Ethernet for Control Automation Technology (EtherCAT) dan Bus Terminal (K-Bus) dalam satu platform terpadu.

Berbasis prosesor Advanced RISC Machine (ARM) dan sistem operasi real-time yang terintegrasi dengan TwinCAT Automation Software, CX9020 mampu menjalankan fungsi kontrol PLC, komunikasi industri (seperti Modbus Transmission Control Protocol/Internet Protocol (TCP/IP), Ethernet/IP, atau Open Platform Communications (OPC)), serta fungsi visualisasi dan data handling secara simultan. Integrasi antara hardware dan software ini menjadikan CX9020 tidak hanya berfungsi sebagai PLC konvensional, tetapi juga sebagai embedded PC yang mendukung konsep Industrial Internet of Things (IIoT) dan Industry 4.0.

---

# Spesifikasi
<img 
  src="https://i.imgur.com/DBONq8F.png"
  alt="Spesifikasi CX9020"
  width="600"
/>



## Technical Data CX9020

| Parameter | Spesifikasi |
|------------|-------------|
| Processor | ARM Cortex™-A8, 1 GHz |
| Number of Cores | 1 |
| Flash Memory | 2× microSD slot (512 MB included) |
| Main Memory | 1 GB DDR3 Random Access Memory (RAM) (not expandable) |
| Persistent Memory | 128 KB Non-Volatile Random Access Memory (NOVRAM) |
| Interfaces | 2× RJ45 10/100 Mbit/s (internal switch), 1 × DVI-D, 4 × USB 2.0, 1 × optional interface |
| Diagnostics Light Emitting Diode (LED) | 1× power, 1 × TC status, 2 × flash access, 2 × bus status |
| Clock | Internal battery-backed clock for time and date (battery exchangeable) |
| Operating System | Windows Embedded Compact 7 |
| Control Software | TwinCAT Runtime |
| I/O Connection | E-bus / K-bus |
| Power Supply | 24 V DC (-15%/+20%) |
| Max Power Consumption | 5 W |
| Max Power Consumption (with loading Uninterruptible Power Supply (UPS)) | 9 W |
| Dimensions (Width x Height x Depth) | 84 × 99 × 91 mm |
| Weight | ±590 g |
| Protection Class | IP20 |
| Operating/Storage Temperature | -25°C hingga +60°C |
| Approvals | CE, UL, ATEX, IECEx |

---

# Arsitektur Sistem

## 1. Unit Pemrosesan Utama

Inti dari CX9020 adalah prosesor ARM Cortex-A8 dengan kecepatan 1 GHz yang menyediakan performa cukup untuk berbagai kontrol gerak. Prosesor ini memiliki satu core dan dirancang untuk operasi real-time dalam lingkungan otomasi. Memory utama terdiri dari 1 GB DDR3 RAM, sedangkan penyimpanan data sistem menggunakan dua slot untuk kartu microSD, dengan slot pertama biasanya berisi modul memori sistem dan slot kedua untuk penyimpanan tambahan. 

## 2. Memori Non-Volatile

Selain RAM dan slot microSD, CX9020 juga dilengkapi 128 kB NOVRAM sebagai memori non-volatile untuk menyimpan konfigurasi penting dan data status bila terjadi pemadaman. NOVRAM ini menjaga data kritis tetap aman tanpa ketergantungan pada penyimpanan utama

## 3. Sistem Operasi & Runtime

Sistem operasi yang mendukung perangkat ini adalah Microsoft Windows Embedded Compact 7, yang memungkinkan aplikasi tingkat tinggi berjalan bersamaan dengan logika PLC. Dengan bantuan TwinCAT automation software, CX9020 dapat digunakan sebagai PLC berbasis IEC 61131-3, serta menjalankan kontrol gerak (motion control) dan bahkan fungsi visualisasi langsung dari controller.

---

# Antarmuka dan Konektivitas

CX9020 menawarkan antarmuka komunikasi yang lengkap dan fleksibel:

- 2× port Ethernet (10/100 Mbit/s) yang tersambung melalui switch internal untuk mempermudah topologi jaringan tanpa perangkat tambahan. 
- 4× port USB 2.0 untuk periferal komunikasi dan pemrograman. 
- 1× DVI-D untuk koneksi HMI atau monitor visualisasi lokal. 
- Antarmuka opsi tambahan (mis. serial, fieldbus) dapat diintegrasikan sesuai kebutuhan spesifik sistem otomasi.
Unit ini juga mendukung pengenalan otomatis sistem I/O E-bus atau K-bus, sehingga modul terminal Beckhoff dapat langsung dikenali dan dihubungkan tanpa konfigurasi manual yang rumit.
---

# Kinerja dan Lingkungan Operasi

CX9020 dikembangkan untuk aplikasi industri yang menuntut keandalan dan daya tahan. Dirancang dengan sistem pasif (fanless), unit ini menawarkan operasi yang stabil di rentang temperatur -25 °C sampai +60 °C, memungkinkan pemasangan di lingkungan yang berat sekalipun. Proteksi IP20 serta kepatuhan terhadap standar EMC dan uji getaran juga memastikan keandalan dalam kondisi pabrik yang keras.

# Fungsi Kontrol dan Ekspansi

Dengan platform TwinCAT, CX9020 tidak hanya menjalankan fungsi PLC standar, tetapi juga dapat menjalankan motion control dan sistem kontrol tertanam lainnya. Modularitasnya memungkinkan ekspansi melalui jaringan EtherCAT dan terminal modular untuk menambah I/O digital/analog, komunikasi bus tambahan, serta perangkat kontrol khusus lainnya. 

## A. Arsitektur I/O

Berbeda dengan PLC konvensional yang umumnya memiliki sejumlah input dan output bawaan (onboard I/O), Beckhoff CX9020 dirancang sebagai embedded PC controller tanpa I/O internal tetap. Perangkat ini menyediakan analog input, digital input, analog output, maupun digital output secara onboard. Seluruh fungsi I/O diperoleh melalui sistem terminal modular eksternal. Sistem seperti ini merupakan bagian dari filosofi PC-based control yang dikembangkan oleh Beckhoff Automation di mana kontroler berfungsi sebagai unit pemrosesan pusat, sementara I/O dibangun secara modular sesuai kebutuhan aplikasi.

## B. Sistem Ekspansi I/O

Ekspansi I/O pada CX9020 dilakukan melaui dua sistem utama milik Beckhoff:

1. EtherCAT Terminal (EL Series)  
Terminal seri EL menggunakan E-bus berbasis EtherCAT sebagai backplane internal. Sistem ini menawarkan komunikasi real-time.  

Contoh konfigurasi terminal:
- EL1008 – 8 Digital Input (24 VDC)
- EL2008 – 8 Digital Output (24 VDC)
- EL3004 – 4 Analog Input (0–10 V / 4–20 mA tergantung tipe)
- EL4004 – 4 Analog Output

Terminal ini dapat disusun berderet pada DIN rail dan terhubung langsung ke CX9020 melalui kopler EtherCAT.

2. Bus Terminal (KL Series)  
Seri KL menggunakan K-bus sebagai sistem komunikasi internal. Meskipun merupakan generasi sebelumnya, seri ini tetap kompatibel dan digunakan pada banyak sistem otomasi yang sudah ada

## C. Kapasitas dan Skalabilitas I/O

Karena tidak memiliki batas I/O onboard, kapasitas sistem CX9020 ditentukan oleh:
- Jumlah terminal yang dipasang
- Kapasitas suplai daya terminal
- Beban pemrosesan CPU
- Konfigurasi runtime TwinCAT

Dalam praktik industri, satu sistem dapat dengan mudah menangani:
- Ratusan digital I/O
- Puluhan hingga ratusan analog I/O
- Beberapa sumbu motion control

Jaringan EtherCAT sendiri secara teoritis mampu menangani hingga puluhan ribu node, meskipun batas aktual bergantung pada desain sistem dan waktu siklus yang diinginkan.

Dengan demikian, CX9020 bersifat highly scalable modular control platform, berbeda dengan PLC fixed-I/O yang kapasitasnya terbatas oleh jumlah terminal bawaan.

## D. Kompatibilitas Ekspansi

Ekspansi CX9020 menggunakan terminal proprietary Beckhoff (EL/KL series). Sistem ini tidak bersifat universal dalam arti dapat langsung menggunakan modul I/O dari merek PLC lain tanpa perangkat tambahan.

Namun demikian, karena berbasis EtherCAT dan Ethernet industri, CX9020 dapat berkomunikasi dengan berbagai perangkat pihak ketiga melalui protokol seperti:
- Modbus Transmission Control Protocol (TCP)
-	Ethernet Industrial Protocol (EtherNet/IP)
-	Process Field Network (PROFINET) - melalui modul atau gateway
-	Controller Area Network open (CANopen)
-	Process Field Bus (PROFIBUS) - melalui interface tambahan)


## E. Bahasa Pemrograman

CX9020 mendukung standar IEC 61131-3 melalui TwinCAT, sehingga menyediakan berbagai bahasa pemrograman industri:

- Ladder Diagram (LD)  
Digunakan untuk logika interlock dan kontrol berbasis relay.

- Function Block Diagram (FBD)  
Umum digunakan untuk kontrol analog dan PID.

- Structured Text (ST)  
Cocok untuk algoritma kompleks, perhitungan matematis, dan manipulasi data.

- Sequential Function Chart (SFC)  
Digunakan untuk sistem berbasis state machine atau urutan proses.

- Continuous Function Chart (CFC)
digunakan untuk pemrograman berbasis blok bebas (continuous function diagram style).

# Implementasi Industri & Aplikasi

CX9020 telah digunakan dalam berbagai aplikasi otomasi, dari mesin industri berukuran kecil hingga sistem kontrol terdistribusi di fasilitas manufaktur besar. Beberapa skenario aplikasi umum meliputi:

- Otomasi mesin produksi — logika PLC dan jaringan I/O terdistribusi via EtherCAT.
- Kontrol gerak & robotik — integrasi fungsi motion control dengan antarmuka HMI.
- Bangunan pintar & sistem energi — kontrol HVAC, pencahayaan, dan monitoring sistem.
- Sistem pemantauan terintegrasi — visualisasi dan data logging langsung dari controller. 

---

# Kesimpulan

CX9020 adalah contoh nyata bagaimana sebuah controller industri modern dapat menggabungkan kekuatan komputasi ARM Cortex-A8 dengan fleksibilitas dan integrasi jaringan untuk memenuhi kebutuhan otomasi yang kompleks. Dirancang sebagai controller yang ringkas namun lengkap, CX9020 tidak hanya berperan sebagai PLC tradisional tetapi juga sebagai embedded PC serbaguna dalam ekosistem otomasi Beckhoff. Dukungan software TwinCAT dan struktur hardware yang modular menjadikan CX9020 pilihan utama untuk instalasi industri yang menuntut performa, fleksibilitas, dan keandalan tinggi.