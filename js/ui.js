
//* >>> This is a utility class is used for : 
  // - Displaying games list 
  // - Displaying game details
  // - Hisd / Show sections
class UI {


  showLoading() {
    // This function used to show the loading
    document.getElementById("loader").classList.remove("d-none");
    document.getElementById("loader").classList.add("d-flex");
  }

  hideLoading() {
    // This function used to hide the loading
    document.getElementById("loader").classList.remove("d-flex");
    document.getElementById("loader").classList.add("d-none");
  }

  showGamesView() {
    // This function used to show the games view (games section)
    document.getElementById("gamesView").classList.remove("d-none");
    document.getElementById("gamesView").classList.add("d-block");
  }

  hideGamesView() {
    // This function used for hidding the games view (games section)
    document.getElementById("gamesView").classList.remove("d-block");
    document.getElementById("gamesView").classList.add("d-none");
  }


  showGamesDetailsView() {
    // This function used to show the games details view (games deatils section)
    document.getElementById("gamesDetailsView").classList.remove("d-none");
    document.getElementById("gamesDetailsView").classList.add("d-block");
  }

  hideGamesDetailsView() {
    // This function used for hidding the games details view (games deatils section)
    document.getElementById("gamesDetailsView").classList.remove("d-block");
    document.getElementById("gamesDetailsView").classList.add("d-none");
  }


  displayData(dataList) {

    let htmlBox = ``;

    for (let i = 0; i < dataList.length; i++) {
      htmlBox += `
             <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="card bg-transparent text-white" role="button" data-id="${dataList[i].id}">
                  <div class="card-body-wrapper p-1 p-sm-3">
                    <img src="${dataList[i].thumbnail}" class="card-img-top" alt="${dataList[i].title} image">
                    <div class="card-body mt-2">
                      <div class="d-flex justify-content-between align-items-center flex-wrap">
                        <p class="card-title">${dataList[i].title.slice(0, 20)}</p>
                        <p><span class="badge custom-badge p-2">Free</span></p>
                      </div>
                      <p class="card-body text-center opacity-50">${dataList[i].short_description.slice(0, 40)}...</p>  
                  </div>
                 
                  </div>
                  <div class="card-footer d-flex justify-content-between flex-wrap">
                    <span class="badge footer-badge-color mb-1 mb-sm-0">${dataList[i].genre}</span>
                    <span class="badge footer-badge-color mb-1 mb-sm-0">${dataList[i].platform}</span>
                  </div>
                </div>
              </div>
            `;
    }

    document.getElementById("gamesAllData").innerHTML = htmlBox;

  }

  displayDetails(dataObj) {
    let htmlBox = `
            <div class="col-md-4">
                <figure class="rounded rounded-3 overflow-hidden">
                  <img src="${dataObj.thumbnail}" class="w-100" alt="${dataObj.title} image">
                </figure>
              </div>
              <div class="col-md-8">
                <h3>Title: <span>${dataObj.title}</span></h3>
                <p>Category:<span class="ms-1 badge text-bg-info">${dataObj.genre}</span></p>
                <p>Platform:<span class="ms-1 badge text-bg-info">${dataObj.platform}</span></p>
                <p>Status:<span class="ms-1 badge text-bg-info">${dataObj.status}</span></p>
                <p>${dataObj.description}</p>
                <a href="${dataObj.game_url}" target="_blank" class="btn btn-outline-warning">Show Game</a>
              </div>
        `;

    document.getElementById("gameDetailsData").innerHTML = htmlBox;
  }
}

export { UI };