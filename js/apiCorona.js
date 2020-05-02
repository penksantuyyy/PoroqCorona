const caseHeading_div = document.querySelector(".case__heading--title");
const confirmed_h2 = document.querySelector(".case__card--confirmed h2");
const treatment_h2 = document.querySelector(".case__card--treatment h2");
const recover_h2 = document.querySelector(".case__card--recover h2");
const died_h2 = document.querySelector(".case__card--died h2");

const regionContainer_div = document.querySelector(".region__cardContainer");
const region_form = document.querySelector(".region__search");
const regionName_h3 = document.querySelector(".region__card--heading h3");
const regionDate_p = document.querySelector(".region__card--heading p");
const positif_h2 = document.querySelector(".region__card--confirmed h2");
const sembuh_h2 = document.querySelector(".region__card--recover h2");
const meninggal_h2 = document.querySelector(".region__card--died h2");

// SIDEBAR SELECTOR
// 1
const region_1_prov = document.querySelector(".region__cardSide--1 h4");
const region_1_posi = document.querySelector(".region__cardSide--1 .positif");
const region_1_sembu = document.querySelector(".region__cardSide--1 .sembuh");
const region_1_meni = document.querySelector(".region__cardSide--1 .meninggal");

// 2
const region_2_prov = document.querySelector(".region__cardSide--2 h4");
const region_2_posi = document.querySelector(".region__cardSide--2 .positif");
const region_2_semb = document.querySelector(".region__cardSide--2 .sembuh");
const region_2_meni = document.querySelector(".region__cardSide--2 .meninggal");

// 3
const region_3_prov = document.querySelector(".region__cardSide--3 h4");
const region_3_posi = document.querySelector(".region__cardSide--3 .positif");
const region_3_semb = document.querySelector(".region__cardSide--3 .sembuh");
const region_3_meni = document.querySelector(".region__cardSide--3 .meninggal");

// DATA NASIONAL
const getCoronaApi = async () => {
  const response = await fetch("https://kawalcovid19.harippe.id/api/summary");
  const data = await response.json();

  return data;
};

const UpdateUI = (data) => {
  const { confirmed, treatment, recover, died } = data;

  confirmed_h2.textContent = confirmed;
  treatment_h2.textContent = treatment;
  recover_h2.textContent = recover;
  died_h2.textContent = died;
};

const getDataCorona = (data) => {
  const confirmed = data.confirmed.value;
  const treatment = data.activeCare.value;
  const recover = data.recovered.value;
  const died = data.deaths.value;

  return { confirmed, treatment, recover, died };
};

getCoronaApi()
  .then((data) => getDataCorona(data))
  .then((data) => UpdateUI(data))
  .catch((err) => console.log(err));

// DATA PER DAERAH
const getCoronaApiProvinsi = async () => {
  const response = await fetch(
    "https://api.kawalcorona.com/indonesia/provinsi/"
  );
  const data = await response.json();

  return data;
};

const getDataCoronaProvinsi = (data, input) => {
  let dataProv = data.find((dataQue) => {
    const provinsi = dataQue.attributes.Provinsi;

    if (provinsi.toLowerCase().includes(input)) {
      return { dataQue };
    }
  });

  return dataProv;
};

const UpdateUIDaerah = (data) => {
  const dataKu = Object.values(data);

  // Tanggalan
  const date = new Date();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dinoIki = `
    ${date.getDay()}
    ${monthNames[date.getMonth()]}
    ${date.getFullYear()} |
    ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}
  `;

  dataKu.filter((data) => {
    regionName_h3.textContent = data.Provinsi;
    regionDate_p.textContent = dinoIki;
    positif_h2.textContent = data.Kasus_Posi;
    sembuh_h2.textContent = data.Kasus_Semb;
    meninggal_h2.textContent = data.Kasus_Meni;
  });

  if (regionContainer_div.classList.contains("d-none")) {
    regionContainer_div.classList.remove("d-none");
  }
};

region_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const regionResult = region_form.daerah.value.trim().toLowerCase();
  region_form.reset();

  getCoronaApiProvinsi()
    .then((data) => getDataCoronaProvinsi(data, regionResult))
    .then((data) => UpdateUIDaerah(data))
    .catch((err) => console.log(err));
});

// SIDEBAR UPDATE
const UpdateUISidebar = (data) => {
  // const { provinsi, positif, sembuh, meninggal } = data;
  // console.log(data[0]);
  // data.forEach((datas) => {});
  region_1_prov.innerHTML = `<h4>${data[0].provinsi}</h4>`;
  region_1_posi.innerHTML = `<p class="positif">Positif : ${data[0].positif}</p>`;
  region_1_sembu.innerHTML = `<p class="sembuh">Sembuh : ${data[0].sembuh}</p>`;
  region_1_meni.innerHTML = `<p class="meninggal">Meninggal : ${data[0].meninggal}</p>`;

  region_2_prov.innerHTML = `<h4>${data[1].provinsi}</h4>`;
  region_2_posi.innerHTML = `<p class="positif">Positif : ${data[1].positif}</p>`;
  region_2_semb.innerHTML = `<p class="sembuh">Sembuh : ${data[1].sembuh}</p>`;
  region_2_meni.innerHTML = `<p class="meninggal">Meninggal : ${data[1].meninggal}</p>`;

  region_3_prov.innerHTML = `<h4>${data[2].provinsi}</h4>`;
  region_3_posi.innerHTML = `<p class="positif">Positif : ${data[2].positif}</p>`;
  region_3_semb.innerHTML = `<p class="sembuh">Sembuh : ${data[2].sembuh}</p>`;
  region_3_meni.innerHTML = `<p class="meninggal">Meninggal : ${data[2].meninggal}</p>`;
};

const getDataCoronaSidebar = (data) => {
  // console.log(data);

  const dataSide = data.slice(0, 3);

  const mappedDataSide = dataSide.map((data) => {
    const provinsi = data.attributes.Provinsi;
    const positif = data.attributes.Kasus_Posi;
    const sembuh = data.attributes.Kasus_Semb;
    const meninggal = data.attributes.Kasus_Meni;

    return { provinsi, positif, sembuh, meninggal };
  });

  return mappedDataSide;
};

getCoronaApiProvinsi()
  .then((data) => getDataCoronaSidebar(data))
  .then((data) => UpdateUISidebar(data))
  .catch((err) => console.log(err));
