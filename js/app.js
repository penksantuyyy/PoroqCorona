const caseHeading_div = document.querySelector(".case__heading--title"),
  confirmed_h2 = document.querySelector(".case__card--confirmed h2"),
  treatment_h2 = document.querySelector(".case__card--treatment h2"),
  recover_h2 = document.querySelector(".case__card--recover h2"),
  died_h2 = document.querySelector(".case__card--died h2"),
  regionContainer_div = document.querySelector(".region__cardContainer"),
  region_form = document.querySelector(".region__search"),
  regionName_h3 = document.querySelector(".region__card--heading h3"),
  regionDate_p = document.querySelector(".region__card--heading p"),
  positif_h2 = document.querySelector(".region__card--confirmed h2"),
  sembuh_h2 = document.querySelector(".region__card--recover h2"),
  meninggal_h2 = document.querySelector(".region__card--died h2");

class DataCorona {
  getDataCorona = (data) => {
    const confirmed = data.confirmed.value,
      treatment = data.activeCare.value,
      recover = data.recovered.value,
      died = data.deaths.value;

    return { confirmed, treatment, recover, died };
  };

  getDataCoronaProvinsi = (data, input) => {
    let dataProv = data.find((dataQue) => {
      const provinsi = dataQue.attributes.Provinsi;

      if (provinsi.toLowerCase().includes(input)) {
        return { dataQue };
      }
    });

    return dataProv;
  };

  getDataCoronaSidebar = (data) => {
    const dataSide = data.slice(0, 3);

    const mappedDataSide = dataSide.map((data) => {
      const provinsi = data.attributes.Provinsi,
        positif = data.attributes.Kasus_Posi,
        sembuh = data.attributes.Kasus_Semb,
        meninggal = data.attributes.Kasus_Meni;

      return { provinsi, positif, sembuh, meninggal };
    });

    return mappedDataSide;
  };
}

class UpdateUI {
  UpdateUISummary = (data) => {
    const { confirmed, treatment, recover, died } = data;

    confirmed_h2.textContent = confirmed;
    treatment_h2.textContent = treatment;
    recover_h2.textContent = recover;
    died_h2.textContent = died;
  };

  UpdateUIDaerah = (data) => {
    const dataKu = Object.values(data);

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

  // SIDEBAR UPDATE
  UpdateUISidebar = (data) => {
    const imgSidebar = document.querySelectorAll(".region__cardSide--img img"),
      provinsi_h4 = document.querySelectorAll(".region__cardSide--text h4"),
      positif_p = document.querySelectorAll("p.positif"),
      sembuh_p = document.querySelectorAll("p.sembuh"),
      meninggal_p = document.querySelectorAll("p.meninggal");

    imgSidebar.forEach((img, index) => {
      img.setAttribute("src", `images/${data[index].provinsi}.png`);
    });

    provinsi_h4.forEach((h4, index) => {
      h4.textContent = data[index].provinsi;
    });

    positif_p.forEach((positif, index) => {
      positif.textContent = `Positif : ${data[index].positif}`;
    });

    sembuh_p.forEach((sembuh, index) => {
      sembuh.textContent = `Sembuh : ${data[index].sembuh}`;
    });

    meninggal_p.forEach((meninggal, index) => {
      meninggal.textContent = `Meninggal : ${data[index].meninggal}`;
    });
  };
}

// Get Corona API
const apiCorona = new GetApi();
const dataCorona = new DataCorona();
const updateUI = new UpdateUI();

region_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const regionResult = region_form.daerah.value.trim().toLowerCase();
  region_form.reset();

  apiCorona
    .getCoronaApiProvinsi()
    .then((data) => dataCorona.getDataCoronaProvinsi(data, regionResult))
    .then((data) => updateUI.UpdateUIDaerah(data))
    .catch((err) => console.log(err));
});

apiCorona
  .getCoronaApi()
  .then((data) => dataCorona.getDataCorona(data))
  .then((data) => updateUI.UpdateUISummary(data))
  .catch((err) => console.log(err));

apiCorona
  .getCoronaApiProvinsi()
  .then((data) => dataCorona.getDataCoronaSidebar(data))
  .then((data) => updateUI.UpdateUISidebar(data))
  .catch((err) => console.log(err));
