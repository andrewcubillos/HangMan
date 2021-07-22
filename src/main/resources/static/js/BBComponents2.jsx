class Editor extends React.Component {
    render() {
        return (
                <div>
                    
                   
                    <div id="toolstatus"></div>
                    
                    <div id="container"></div>
                    <WBCanvas />
                   
                    <div id="info"></div>
                </div>
                );
    }
}
let palabraw1,palabraw2,palabraw3;
let input1,input2,input3;
let button1,button2, button3;

class WBCanvas extends React.Component {
    
    constructor(props) {
        
        super(props);
        this.comunicationWS =
                new WSBBChannel(BBServiceURL(),
                        (msg) => {
                var obj = JSON.parse(msg);
                         console.log("On func call back ", obj);
                        this.drawEllipse(obj.xi, obj.yi,obj.color1,obj.color2,obj.color3);
                        this.drawLine(obj.x1, obj.y1,obj.x2, obj.y2,obj.color1,obj.color2,obj.color3);
                        this.drawWord(obj.mst,obj.xx,obj.yy);
                        this.drawText(obj.txt,obj.x,obj.y);
                        this.doCommand(obj.cmd);
                        
                });
        
        this.myp5 = null;
        this.state = {loadingState: 'Loading Canvas ...'};
        let wsreference = this.comunicationWS; 
        let wrong1=0;
        let wrong2=0;
        let wrong3=0;
        
        
        
        this.sketch = function (p) {
            
            let color1 = 125;
            let color2 = 50;
            let color3 = 0;
            
            let yi=105;
            let y2=130;
            let y3=240;
            let y4=160;
            let y5=290;
            let palabram1;
            let palabram2;
            let palabram3;
            
         
            
            p.setup = () => {
                
                p.createCanvas(1000, 580);
                p.background(0,255,255);
                p.textSize(47);
                p.noStroke();
                p.fill(0);
                palabraw1=p.createElement('h2', '');
                palabraw2=p.createElement('h2', '');
                palabraw3=p.createElement('h2', '');
                palabram1=p.createElement('h2', '');
                palabram1.position(40, 490);
                palabram2=p.createElement('h2', '');
                palabram2.position(340, 490);
                palabram3=p.createElement('h2', '');
                palabram3.position(640, 490);
                
                p.strokeWeight(10);
                p.stroke(color1,color2,color3);
                p.line(40, 30, 40, 370);         
                p.line(40, 30, 260, 30);
                p.line(40, 100, 100, 30);
                p.strokeWeight(4);
                p.line(250, 30, 250, 90);
                p.strokeWeight(10);
                
                p.stroke(color3,color1,color2);
                p.line(340, 30, 340, 370);         
                p.line(340, 30, 560, 30);
                p.line(340, 100, 400, 30);
                p.strokeWeight(4);
                p.line(550, 30, 550, 90);
                p.strokeWeight(10);
                
                p.stroke(color2,color3,color1);
                p.line(640, 30, 640, 370);         
                p.line(640, 30, 860, 30);
                p.line(640, 100, 700, 30);
                p.strokeWeight(4);
                p.line(850, 30, 850, 90);
                p.strokeWeight(10);
                
                input1 = p.createInput();
                input1.position(40, 580);
                input2 = p.createInput();
                input2.position(340, 580);
                input3 = p.createInput();
                input3.position(640, 580);
              
                button1=p.createButton("submit");
                button1.position(40+input1.width, 580);
                
                
                button2=p.createButton("submit");
                button2.position(340+input2.width, 580);
           
                
                button3=p.createButton("submit");
                button3.position(640+input3.width, 580);
                
                
                
            };
            
            
            p.draw = () => {    
                 
                 button2.mousePressed(ahorcar2);
                 button1.mousePressed(ahorcar1);
                 button3.mousePressed(ahorcar3);
                
               
            };
            function ahorcamiento(x1,x2,x3,x4,x5,c1,c2,c3,wrong){
                p.strokeWeight(2);
                p.stroke(c1,c2,c3);
                p.fill(0,255,255);
                if (wrong===0){
                    
                    p.ellipse(x1,yi,50,50);
                    wsreference.sendelipse(x1,yi,c1,c2,c3);
                }
                else if(wrong===1){
                   
                    p.line(x1, y2, x1, y3);   
                    wsreference.sendeline(x1,y2,x1,y3,c1,c2,c3);
                    
                }
                else if(wrong===2){
                   
                    p.line(x1, y2, x2, y4);   
                    wsreference.sendeline(x1,y2,x2,y4,c1,c2,c3);
                    
                }
                else if(wrong===3){
                   
                    p.line(x1, y2, x3, y4);   
                    wsreference.sendeline(x1,y2,x3,y4,c1,c2,c3);
                    
                }
                else if(wrong===4){
                   
                    p.line(x1, y3, x4, y5);   
                    wsreference.sendeline(x1,y3,x4,y5,c1,c2,c3);
                    
                }
                else if(wrong===5){
                   
                     p.line(x1, y3, x5, y5);   
                    wsreference.sendeline(x1,y3,x5,y5,c1,c2,c3);
                    p.textSize(40);
                    p.noStroke();
                    p.fill(0);
                    p.text('you lose!', x1-200, 200);
                    wsreference.sendetext('you lose!', x1-200, 200);
                    inhabilitar(x1);
                    //p.line(x1, yi-10, x1+20, y2-30);   
                    //wsreference.sendeline(x1, yi-10, x1+20, y2-30,c1,c2,c3);
                    //p.line(x1+20, yi-10, x1, y2-30);   
                    //wsreference.sendeline(x1+20, yi-10, x1, y2-30,c1,c2,c3);
                    
                }
                
                
            }
            function palabra(L,P,N,X1,X2,X3,X4,X5,C1,C2,C3,W,wx){
               let posicion1;
               let posicion2;
                if(buscar(L,N)===false){
                    if(W==="wrong1"){
                        W=wrong1;
                        wrong1++;}
                    if(W==="wrong2"){
                        W=wrong2;
                        wrong2++;}
                    if(W==="wrong3"){
                        W=wrong3;
                        wrong2++;}
                    ahorcamiento(X1,X2,X3,X4,X5,C1,C2,C3,W);
                    
                }
                else{
                    var word=mostrar(L,N);
                    if (!word.includes("-")){
                        p.textSize(40);
                        p.stroke(50,205,50);
                        p.fill(0);
                        p.text('you won!', X1-200, 200);
                        wsreference.sendetext('you won!', X1-200, 200);
                        p.noStroke();
                        p.fill(0);
                        if(X1===250){
                            posicion1=550;
                            posicion2=850;
                        }
                        else if(X1===550){
                            posicion1=250;
                            posicion2=850;
                        }
                        else if(X1===850){
                            posicion1=250;
                            posicion2=550;
                            
                        }
                        p.text('you lose!', posicion1-200, 200);
                        p.text('you lose!', posicion2-200, 200);
                        wsreference.sendecommand("delete");
                        wsreference.sendetext('you lose!', posicion1-200, 200);
                        wsreference.sendetext('you lose!', posicion2-200, 200);
                        p.removeElements();
                    }
                    
                    P.html(word); 
                    wsreference.sendeword(word,wx,490);
                    
                }
                   
            }
            function ahorcar1(){
                palabra(input1.value(),palabram1,0,250,220,280,220,280,color1,color2,color3,"wrong1",40);
                input1.value('');
            };
            function ahorcar2(){
                palabra(input2.value(),palabram2,1,550,520,580,520,580,color3,color1,color2,"wrong2",340);
                input2.value('');
            
            };
            function ahorcar3(){
                palabra(input3.value(),palabram3,2,850,820,880,820,880,color2,color3,color1,"wrong3",640);
                input3.value('');
             
            };
            
            
            
            
                
        };
    }
    
    drawEllipse(x,y,color1,color2,color3) {
        
            inhabilitar(x);
            this.myp5.stroke(color1,color2,color3);
            this.myp5.fill(0,255,255);
            this.myp5.ellipse(x, y, 50, 50);
    }
    drawLine(x1,y1,x2,y2,color1,color2,color3) {
            inhabilitar(x1);
            this.myp5.stroke(color1,color2,color3);
            this.myp5.line(x1, y1, x2, y2);
    }
    drawText(p,x,y){
            this.myp5.textSize(40);
            this.myp5.noStroke();
            this.myp5.fill(0);
            this.myp5.text(p, x, y);
    }
    doCommand(cmd){
        if (cmd==="delete"){
            this.myp5.removeElements();
        }
    }
    drawWord(p,x,y) {
                
                this.myp5.textSize(47);
                this.myp5.noStroke();
                this.myp5.fill(0);
                
                if (x===40){
                    inhabilitar(x);
                    palabraw1.position(x, y);
                    palabraw1.html(p);  
                }
                else if(x===340){
                    inhabilitar(x);
                    palabraw2.position(x, y);
                    palabraw2.html(p);   
                }
                else if(x===640){
                    inhabilitar(x);
                    palabraw3.position(x, y);
                   palabraw3.html(p);   
                }
    }
    
    componentDidMount() {
        
        this.myp5 = new p5(this.sketch, 'container');
        this.setState({loadingState: 'Canvas Loaded'});
    }
    
    render()
    {
        return(
                <div>
                
                </div>);
    }
}
function inhabilitar(x){
        
        if (x===40 || x===250){
            input1.attribute('disabled', '');
            button1.attribute('disabled', '');    
        }
        else if(x===340 || x===550){
            input2.attribute('disabled', '');
            button2.attribute('disabled', '');
        }
        else if(x===640 || x===850){
            input3.attribute('disabled', '');
            button3.attribute('disabled', '');
        }
    }
const paises=paisses();
const animales=animals();
const words= new Array();
const palabrass= new Array();
var pais1 = paises[Math.floor(Math.random()*paises.length)];
var pais2 = paises[Math.floor(Math.random()*paises.length)];
var pais3 = paises[Math.floor(Math.random()*paises.length)];
   console.log(pais1);
   console.log(pais2);
   console.log(pais3);
words.push(Array.from(pais1));
words.push(Array.from(pais2));
words.push(Array.from(pais3));
 
palabrass.push(new Array(words[0].length));
palabrass.push(new Array(words[1].length));
palabrass.push(new Array(words[2].length));
palabrass[0].fill("-");
palabrass[1].fill("-");
palabrass[2].fill("-");

Array.prototype.getDuplicates = function () {
    var duplicates = {};
    for (var i = 0; i < this.length; i++) {
        if(duplicates.hasOwnProperty(this[i])) {
            duplicates[this[i]].push(i);
        } else if (this.lastIndexOf(this[i]) !== i) {
            
            duplicates[this[i]] = [i];
        }
    }
   
    return duplicates;
    
    
};
function buscar(lt,num) {
    var bool=true;
    bool=words[num].includes(lt);
    return bool;
    }



function mostrar(letra,num){
        
        
        let pos;
        try{
            let duplicate=words[num].getDuplicates()[letra];
            console.log(duplicate);
            if(duplicate.length>0) duplicate.forEach(element => palabrass[num][element]=letra);
            console.log(palabrass);
        }catch(e){
            pos=words[num].indexOf(letra);
            
            palabrass[num][pos]=letra;
        }
        return palabrass[num].join('');
    }
    


// Retorna la url del servicio. Es una función de configuración.
function BBServiceURL() {
    var host = window.location.host;
    var url = 'wss://' + (host) + '/bbService';
    console.log("URL Calculada: " + url);
    return url;
}
class WSBBChannel {
    constructor(URL, callback) {
        this.URL = URL;
        this.wsocket = new WebSocket(URL);
        this.wsocket.onopen = (evt) => this.onOpen(evt);
        this.wsocket.onmessage = (evt) => this.onMessage(evt);
        this.wsocket.onerror = (evt) => this.onError(evt);
        this.receivef = callback;
    }
    onOpen(evt) {
        console.log("In onOpen", evt);
    }
    onMessage(evt) {
        console.log("In onMessage", evt);
        // Este if permite que el primer mensaje del servidor no se tenga encuenta.
                // El primer mensaje solo confirma que se estableció la conexión.
                // De ahí en adelante intercambiaremos solo puntos(x,y) con el servidor
                if (evt.data != "Connection established.") {
        this.receivef(evt.data);
    }
    }
    onError(evt) {
        console.error("In onError", evt);
    }
    sendelipse(xi, yi,color1,color2,color3) {
        let msg = '{ "xi": ' + (xi) + ', "yi": ' + (yi)  +  ', "color1": ' + (color1)+', "color2": ' + (color2)+', "color3": ' + (color3)+ "}";
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }
    sendeline(x1, y1,x2,y2,color1,color2,color3) {
        let msg = '{ "x1": ' + (x1) + ', "y1": ' + (y1)  +', "x2": ' + (x2)  +', "y2": ' + (y2)  +  ', "color1": ' + (color1)+', "color2": ' + (color2)+', "color3": ' + (color3)+ "}";
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }
    sendeword(mst,xx,yy) {
	let msg = '{ "mst": ' + JSON.stringify(mst) + ', "xx": ' + (xx)  +', "yy": ' + (yy)+  "}";
       
        console.log("sending: ",  msg);
        this.wsocket.send( msg);
    }
    sendetext(txt,x,y) {
	let msg = '{ "txt": ' + JSON.stringify(txt) + ', "x": ' + (x)  +', "y": ' + (y)+  "}";
       
        console.log("sending: ",  msg);
        this.wsocket.send( msg);
    }
    sendecommand(cmd) {
	let msg = '{ "cmd": ' + JSON.stringify(cmd) + "}";
       
        console.log("sending: ",  msg);
        this.wsocket.send( msg);
    }
    
}
ReactDOM.render(
        <Editor name="Andres"/>,
        document.getElementById('root')
        );




function paisses(){
    const countryList = [
	"afghanistan",
	"albania",
	"algeria",
	"andorra",
	"angola",
	"argentina",
	"armenia",
	"aruba",
	"australia",
	"austria",
	"azerbaijan",
	"bahrain",
	"bangladesh",
	"barbados",
	"belarus",
	"belgium",
	"belize",
	"benin",
	"bermuda",
	"bhutan",
	"botswana",
	"brazil",
	"bulgaria",
	"burundi",
	"cambodia",
	"cameroon",
	"canada",
	"chad",
	"chile",
	"china",
	"colombia",
	"croatia",
	"cuba",
	"cyprus",
	"czechia",
	"denmark",
	"dominica",
	"ecuador",
	"egypt",
	"eritrea",
	"estonia",
	"eswatini",
	"ethiopia",
	"fiji",
	"finland",
	"france",
	"gabon",
	"georgia",
	"germany",
	"ghana",
	"gibraltar",
	"greece",
	"greenland",
	"guatemala",
	"guinea",
	"guyana",
	"haiti",
	"honduras",
	"hungary",
	"iceland",
	"india",
	"indonesia",
	"iraq",
	"ireland",
	"israel",
	"italy",
	"jamaica",
	"japan",
	"jersey",
	"jordan",
	"kazakhstan",
	"kenya",
	"kiribati",
	"kuwait",
	"kyrgyzstan",
	"latvia",
	"lebanon",
	"lesotho",
	"liberia",
	"libya",
	"liechtenstein",
	"lithuania",
	"luxembourg",
	"macao",
	"madagascar",
	"malawi",
	"malaysia",
	"maldives",
	"mali",
	"malta",
	"martinique",
	"mauritania",
	"mauritius",
	"mayotte",
	"mexico",
	"monaco",
	"mongolia",
	"mozambique",
	"myanmar",
	"nepal",
	"nicaragua",
	"nigeria",
	"niue",
	"norway",
	"oman",
	"pakistan",
	"panama",
	"paraguay",
	"peru",
	"poland",
	"portugal",
	"qatar",
	"romania",
	"rwanda",
	"samoa",
	"senegal",
	"serbia",
	"singapore",
	"slovakia",
	"slovenia",
	"spain",
	"suriname",
	"sweden",
	"switzerland",
	"taiwan",
	"tajikistan",
	"thailand",
	"uganda",
	"ukraine",
	"uruguay",
	"uzbekistan",
	"vanuatu",
	"vietnam",
	"yemen",
	"zambia",
	"zimbabwe"

];
    return countryList;
}
function animals(){
    const animalNames = ["Cat","Cattle","Dog","Donkey","Goat","Horse","Pig","Rabbit","Aardvark","Albatross","Alligator","Alpaca","Amphibian","Anaconda","Angelfish","Anglerfish","Ant","Ape","Aphid","Armadillo","Asp","Baboon","Badger","Bandicoot","Barnacle","Barracuda","Basilisk","Bass","Bat","Bear","Beaver","Bedbug","Bee","Beetle","Bird","Bison","Blackbird","Boa","Boar","Bobcat","Bobolink","Bonobo","Booby","Bovid","Bug","Butterfly","Buzzard","Camel","Canid","Capybara","Cardinal","Caribou","Cat","Catshark","Caterpillar","Catfish","Cattle","Centipede","Cephalopod","Chameleon","Cheetah","Chickadee","Chicken","Chimpanzee","Chinchilla","Chipmunk","Clam","Clownfish","Cobra","Cockroach","Cod","Condor","Constrictor","Coral","Cougar","Cow","Coyote","Crab","Crane","Crawdad","Crayfish","Cricket","Crocodile","Crow","Cuckoo","Cicada","Damselfly","Deer","Dingo","Dinosaur","Dog","Dolphin","Donkey","Dormouse","Dove","Dragonfly","Dragon","Duck","Eagle","Earthworm","Earwig","Echidna","Eel","Egret","Elephant","Elk","Emu","Ermine","Falcon","Ferret","Finch","Firefly","Fish","Flamingo","Flea","Fly","Flyingfish","Fowl","Fox","Frog","Gamefowl","Galliform","Gazelle","Gecko","Gerbil","Gibbon","Giraffe","Goat","Goldfish","Goose","Gopher","Gorilla","Grasshopper","Grouse","Guan","Guanaco","Guineafowl","Gull","Guppy","Haddock","Halibut","Hamster","Hare","Harrier","Hawk","Hedgehog","Heron","Herring","Hippopotamus","Hookworm","Hornet","Horse","Hoverfly","Hummingbird","Hyena","Iguana","Impala","Jackal","Jaguar","Jay","Jellyfish","Junglefowl","Kangaroo","Kingfisher","Kite","Kiwi","Koala","Koi","Krill","Ladybug","Lamprey","Landfowl","Lark","Leech","Lemming","Lemur","Leopard","Leopon","Limpet","Lion","Lizard","Llama","Lobster","Locust","Loon","Louse","Lungfish","Lynx","Macaw","Mackerel","Magpie","Mammal","Manatee","Mandrill","Marlin","Marmoset","Marmot","Marsupial","Marten","Mastodon","Meadowlark","Meerkat","Mink","Minnow","Mite","Mockingbird","Mole","Mollusk","Mongoose","Monkey","Moose","Mosquito","Moth","Mouse","Mule","Muskox","Narwhal","Newt","Nightingale","Ocelot","Octopus","Opossum","Orangutan","Orca","Ostrich","Otter","Owl","Ox","Panda","Panther","Parakeet","Parrot","Parrotfish","Partridge","Peacock","Peafowl","Pelican","Penguin","Perch","Pheasant","Pig","Pigeon","Pike","Pinniped","Piranha","Planarian","Platypus","Pony","Porcupine","Porpoise","Possum","Prawn","Primate","Ptarmigan","Puffin","Puma","Python","Quail","Quelea","Quokka","Rabbit","Raccoon","Rat","Rattlesnake","Raven","Reindeer","Reptile","Rhinoceros","Roadrunner","Rodent","Rook","Rooster","Roundworm","Sailfish","Salamander","Salmon","Sawfish","Scallop","Scorpion","Seahorse","Shark","Sheep","Shrew","Shrimp","Silkworm","Silverfish","Skink","Skunk","Sloth","Slug","Smelt","Snail","Snake","Snipe","Sole","Sparrow","Spider","Spoonbill","Squid","Squirrel","Starfish","Stingray","Stoat","Stork","Sturgeon","Swallow","Swan","Swift","Swordfish","Swordtail","Tahr","Takin","Tapir","Tarantula","Tarsier","Termite","Tern","Thrush","Tick","Tiger","Tiglon","Toad","Tortoise","Toucan","Trout","Tuna","Turkey","Turtle","Tyrannosaurus","Urial","Vicuna","Viper","Vole","Vulture","Wallaby","Walrus","Wasp","Warbler","Weasel","Whale","Whippet","Whitefish","Wildcat","Wildebeest","Wildfowl","Wolf","Wolverine","Wombat","Woodpecker","Worm","Wren","Xerinae","Yak","Zebra","Alpaca","Cat","Cattle","Chicken","Dog","Donkey","Ferret","Gayal","Goldfish","Guppy","Horse","Koi","Llama","Sheep","Yak"];
    return animalNames;
}