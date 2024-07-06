"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import { UI } from "./ui.js";

class GameDetails{

    constructor(id){
        this.id = id;
        this.ui = new UI(); // Create instance from ui, so we can hid / show / display
        this.getGameDetails(id); // Get the game details by the given id
        this.addCloseBtnEvent(); // Add close action for close icon in the game details screen
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
                this.ui.displayDetailsOfObj(gameObj); // dispaly the game details
                this.ui.hideLoading(); // Hide loading after getting the data
                this.ui.showGameDetailsView(); // Show the game details screen             
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
            this.ui.hideGameDetailsView(); // hide the game details
            this.ui.showGamesLisView(); // show the current games list view
       })
    }

}

export { GameDetails };