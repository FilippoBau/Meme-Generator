

function BackgroundImage(id, path, name, ntextmax, css) {
    this.id= id;
    this.path = path; //path immagine
    this.name = name; //title immagine
    this.ntextmax = ntextmax; //numero campi di testo massimi per l'immagine
    this.position = css;
}


function Memeconstr(id, base, title, idCreator, creator, font, color, text1=null, text2=null, text3=null, protect=false) {
    this.id = id;
    this.base = base; //backgroundImage
    this.title= title; //titolo meme
    this.idCreator = idCreator;
    this.creator = creator;
    this.font = font;
    this.color = color;
    this.text1 = text1;
    this.text2 = text2;
    this.text3 = text3;
    this.protect = protect;
}

/*
const images = [];

const bim0 = new BackgroundImage(0, "Allegri", "images/allegri.jpg", 2, "");
const bim1 = new BackgroundImage(1, "Messi", "images/messi.jpg", 2, "");
const bim2 = new BackgroundImage(2, "Balotelli", "images/balotelli.jpg", 1, "");
const bim3 = new BackgroundImage(3, "Mazzarri", "images/mazzarri.jpg", 1, "");
const bim4 = new BackgroundImage(4, "Buffon", "images/buffon.jpg", 3, "");
const bim5 = new BackgroundImage(5, "Ronaldo", "images/ronaldo.jpg", 3, "");

images.push(bim0);
images.push(bim1);
images.push(bim2);
images.push(bim3);
images.push(bim4);
images.push(bim5);
*/

export {BackgroundImage, Memeconstr};