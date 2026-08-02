const API_URL =
"https://raw.githubusercontent.com/Ardapala/RadioPlayer/main/turkey.json";


const channelsBox = document.getElementById("channels");
const searchInput = document.getElementById("search");
const player = document.getElementById("player");


let channels = [];


// GitHub'dan kanalları çek
async function loadChannels(){

    try {

        const response = await fetch(API_URL);

        channels = await response.json();

        showChannels(channels);

        console.log("Kanallar yüklendi:", channels);

    } catch(error){

        console.error("Kanal yükleme hatası:", error);

        channelsBox.innerHTML =
        "<h3>Kanal listesi yüklenemedi</h3>";
    }

}



// Kanalları ekrana bas
function showChannels(list){

    channelsBox.innerHTML = "";


    list.forEach(channel => {


        const card = document.createElement("div");

        card.className = "channel";


        card.innerHTML = `

            <img src="${channel.logo}" 
            onerror="this.src='https://via.placeholder.com/80'">

            <h3>${channel.name}</h3>

            <small>${channel.group}</small>

        `;


        card.onclick = () => {

            playChannel(channel);

        };


        channelsBox.appendChild(card);


    });

}



// Kanal oynat
function playChannel(channel){

    console.log("Açılıyor:", channel.name);


    player.src = channel.stream;

    player.play();


}



// Arama
searchInput.addEventListener("input",()=>{


    const text = searchInput.value.toLowerCase();


    const filtered = channels.filter(channel =>

        channel.name
        .toLowerCase()
        .includes(text)

    );


    showChannels(filtered);


});



loadChannels();