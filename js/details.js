"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import { UI } from "./ui.js";

class GameDetails{

    constructor(id){
        this.id = id;
        this.ui = new UI();
        this.getGameDetails(id);
        this.addCloseBtnEvent();
    }   


    async getGameDetails(id){
        const baseUrl = "https://free-to-play-games-database.p.rapidapi.com/api"; 
        const apiKey = "228e12081dmshf28115fb9df7ac2p189652jsn154d42a77d09";
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key':apiKey,
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        let endPoint ="game";
        let queryParams = `id=${id}`;

        try{

            let response = await fetch(`${baseUrl}/${endPoint}?${queryParams}`,options);
    
            if (response.ok) { // if response is OK, then display data
                let gameObj = await response.json();
   
                console.log(gameObj);
                this.ui.displayDetails(gameObj); // dispaly the games list based on the clicked link
                this.ui.hideLoading();
                this.ui.showGamesDetailsView();                
              } else {
                console.log(response);
                // Custom message for failed HTTP codes
                if (response.status === 404) throw new Error('404, Not found');
                if (response.status === 500) throw new Error('500, internal server error');
                // For any other server error
                throw new Error(response.status);
              }
        } catch (error) {
              console.error('Fetch', error);
        }
    }

    addCloseBtnEvent(){
        // This function to add close event when user click on X icon to close the game details
       document.getElementById("closeBtn").addEventListener("click",()=>{
            this.ui.hideGamesDetailsView(); // hide the game details
            this.ui.showGamesView(); // show the current games list view
       })
    }

}

export { GameDetails };