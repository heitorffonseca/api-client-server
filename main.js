const app = document.getElementById('app');


const fillMaps = async maps => {

    const apikey = 'YOUR_API_KEY';

    const platform = new H.service.Platform({ apikey });
    const defaultLayers = platform.createDefaultLayers();
    
    for (let elementMap of maps) {

        const map = await new H.Map(elementMap, defaultLayers.vector.normal.map);

        const iconMarker = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';

        const lat = await elementMap.getAttribute('data-lat'), lng = await elementMap.getAttribute('data-lng');

        const icon = await new H.map.Icon(iconMarker), coords = { lat, lng }, marker = await new H.map.Marker(coords, { icon });

        map.addObject(marker);
        map.setCenter(coords);

    }

};

const fillCard = async data => {
    let card = '';

    for (let user of data) {

        card += '<div class="col-md-12 p-2"><div class="card"><div class="card-body">';
        card += `<h5 class="card-title">${user.name}</h5>`;
        card += `<p class="card-text">E-mail: ${user.email}</p>`;
        card += `<p class="card-text">Telefone: ${user.phone}</p>`;
        card += `<p class="card-text">Empresa: ${user.company.name}</p>`;
        card += `<p class="card-text">Logradouro: ${user.address.street}</p>`;
        card += `<p class="card-text">Complemento: ${user.address.suite}</p>`;
        card += `<p class="card-text">Cidade: ${user.address.city}</p>`;
        card += `<div class='map' data-lat='${user.address.geo.lat}' data-lng='${user.address.geo.lng}'></div>`;
        card += '</div></div></div>';
    }

    app.innerHTML = card;

    await fillMaps(document.getElementsByClassName('map'));
}

const getUsers = async () => {

    try {

        const response = await fetch('http://localhost:3000/');
        const data = await response.json();

        await fillCard(data)
        
    } catch (error) {

        console.error(error)        
    
    }

}

getUsers();
