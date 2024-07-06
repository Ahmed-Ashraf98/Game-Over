"use strict"; // Defines that JavaScript code should be executed in "strict mode"

import { UI } from "./ui.js";
import { GameDetails } from "./details.js";

class Games{

    constructor(category){
        this.ui = new UI();  // Create instance from ui
        this.getGamesByCategory(category);
        this.addNavEvents();
    }

    async getGamesByCategory(category){
        
        const baseUrl = "https://free-to-play-games-database.p.rapidapi.com/api"; 
        const apiKey = "228e12081dmshf28115fb9df7ac2p189652jsn154d42a77d09";
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key':apiKey,
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        let endPoint ="games";
        let queryParams = `category=${category}`;

        try{
       
            this.ui.hideGamesView();
            this.ui.showLoading();
           
            let response = await fetch(`${baseUrl}/${endPoint}?${queryParams}`,options);
    
            if (response.ok) { // if response is OK, then display data
                let gamesList = await response.json();
        
                this.ui.displayData(gamesList); // dispaly the games list based on the clicked link
                this.ui.hideLoading();
                this.ui.showGamesView();
                this.addCardsEvents(); // Add click events for the created cards, so we can click on any card to display the game details
                
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

    addNavEvents(){
        // This function to add the "click" events for all navbar links 
       document.querySelectorAll(".category-link").forEach((element)=>{
            element.addEventListener("click",(event)=>{
                event.preventDefault(); // to prevent refresh when click on the link
                console.log("Current Link is : ",element.id)
                this.markEleAsActive(element); // Mark the clicked link as active and the others will be in-active
                this.getGamesByCategory(element.id) // dispaly the games list based on the clicked link
            })
       })
    }




    addCardsEvents(){
       // This function to add the "click" events for all created cards
       // This event will enable [ click to show game details feature ] which allow us to display more details on the clciked game 

        document.querySelectorAll(".card").forEach((card)=>{
            card.addEventListener("click",()=>{

                // 1- Call Hide Home / Games section function
                this.ui.hideGamesView();
                // 2- Show Loading
                this.ui.showLoading();
                // 3- Create instance from GameDetails
                new GameDetails(card.getAttribute("data-id"));

            })
        })

    }

    markEleAsActive(tragetEle){
        // This function to mark the link as active when its clicked
        // Other links will be in-active

        // 1- Make sure to remove the active class from the previous link by looping on all links
        document.querySelectorAll(".category-link").forEach((element)=>{
            element.classList.remove("active");
        })

        // 2- Add active class to the clicked link
        tragetEle.classList.add("active");
    }

}

export { Games };