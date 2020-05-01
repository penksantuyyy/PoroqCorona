const people = [
  {
    nama: "Apenk",
    umur: 20,
  },
  { nama: "John", umur: 30 },
];

localStorage.setItem("nama", JSON.stringify(people));

localStorage.getItem("nama");
