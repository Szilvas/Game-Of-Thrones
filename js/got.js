const GotCharacters = {
  data: [],
  init() {
    this.findAll();
  },

  findAll() {
    const request = new XMLHttpRequest(); // asszinkron működik
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        this.setData(request.responseText);
      }
    };
    request.open('GET', '/json/got.json');
    request.send();
  },

  setData(userData) {
    console.log('hello');
    // callback;
    this.data = JSON.parse(userData);
    this.data = Array.from(this.data.filter(aliveCharacters => aliveCharacters.dead !== true)
      .sort((x, y) => {
        if (x.name === y.name) {
          return 0;
        }
        if (x.name > y.name) {
          return 1;
        }
        return -1;
      }));
    console.log(this.data);
    this.showAll();
    // this.clickCharacterName();
  },

  showAll() {
    let gotTemp = '';
    this.data.forEach((item, i) => {
      gotTemp += `<div class="persons">
                    <img class="personsPhoto" src="/${item.portrait}" 
                        onclick="GotCharacters.showCharacterData(${i})" alt="${item.name}">
                    <div class="personsName" 
                       onclick="GotCharacters.showCharacterData(${i})" >${item.name}</div>
                    </div> `;
      document.querySelector('.mainLeft-container').innerHTML = gotTemp;
    });
  },

  showCharacterData(i) {
    let characterTemp = '';
    characterTemp += `<div class = "personDetails">
      <img class="personsDetailPhoto" src="/${this.data[i].picture}">
      <div display: inline-block>
      <div class = "personsDetailName" >${this.data[i].name} </div>`;

    if (this.data[i].house != null) {
      characterTemp += ` <img class="personsHousePhoto" src="/assets/houses/${this.data[i].house}.png"></div>`;
    }
    characterTemp += `<div class="bio" >${this.data[i].bio}</div>
        </div>`;
    document.querySelector('.details').innerHTML = characterTemp;
  },


  search() {
    const searchBox = document.querySelector('#search');
    let characterIndex = '';
    for (let index = 0; index < this.data.length; index += 1) {
      const element = this.data[index];
      if (element.name.toLowerCase() === searchBox.value.toLowerCase()) {
        characterIndex = index;
      }
    }
    if (characterIndex === '') {
      console.log('Character is not found');
    } else {
      this.showCharacterData(parseInt(characterIndex, 10));
    }
  },
};
GotCharacters.init();
