class GetApi {
  constructor() {
    this.summaryURI = "https://kawalcovid19.harippe.id/api/summary";
    this.provSummary = "https://api.kawalcorona.com/indonesia/provinsi/";
  }
  // DATA NASIONAL
  async getCoronaApi() {
    const response = await fetch(this.summaryURI);
    const data = await response.json();

    return data;
  }

  // DATA PER DAERAH
  async getCoronaApiProvinsi() {
    const response = await fetch(this.provSummary);
    const data = await response.json();

    return data;
  }
}
