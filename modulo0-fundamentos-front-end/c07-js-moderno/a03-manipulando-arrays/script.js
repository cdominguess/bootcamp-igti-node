// 1. for ... of

for (let item of usPresidents) {
  //console.log(item.president);
}

// 2. forEach
usPresidents.forEach((item, index) => {
  //console.log(`${index}: ${item.president}`);
});


// 3. map
let names = usPresidents.map((item) => item.president);
//console.log(names);

// 4. filter
let republicans = usPresidents
  .filter((item) => item.party == "Republican")
  .map((item) => item);
//console.log(republicans);

// 5. find - retorna o elemento encontrado do array somente
let p1 = usPresidents.find((item) => item.party == "Republican");
//console.log(p1);

// 6. sort - itera o array todo comparando os itens, sempre o atual com o anterior até finalizar
usPresidents.sort((item1, item2) => {
  if (item1.birth_year < item2.birth_year) {
    return 1;
  } else if (item1.birth_year > item2.birth_year) {
    return -1;
  } else {
    return 0;
  }
});

console.log(usPresidents);