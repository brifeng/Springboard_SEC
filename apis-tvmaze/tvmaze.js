/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
    // TODO: Make an ajax request to the searchShows api.  Remove
    // hard coded data.

    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
    const showData = [];

    for (show of res.data) { // for each search result
        if (show.show.image) { // if the search result has an image, use that image
            showData.push({
                id: show.show.id,
                name: show.show.name,
                summary: show.show.summary,
                image: show.show.image.medium,
            })
        } else { // otherwise, if no image, use generic image
            showData.push({
                id: show.show.id,
                name: show.show.name,
                summary: show.show.summary,
                image: "https://tinyurl.com/tv-missing",
            })
        }
    }
    return showData; // return array of search results containing ID, name, summary, and image
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
    const $showsList = $("#shows-list");
    $showsList.empty(); // clear out shows-list "section", in case shows from a different search were already populated

    for (let show of shows) {
        let $item = $( // below code provided, except added img to top of card and episode button to bottom
            `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
            <div class="card" data-show-id="${show.id}">
                <img class="card-img-top" src="${show.image}">
                <div class="card-body">
                    <h5 class="card-title">${show.name}</h5>
                    <p class="card-text">${show.summary}</p>
                    <button class="btn btn-info episodes">Episodes</button>
                </div>
            </div>
        </div>
      `);

        $showsList.append($item);
    }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
    evt.preventDefault();

    let query = $("#search-query").val();
    if (!query) return; // if search is blank, do nothing

    $("#episodes-area").hide();

    let shows = await searchShows(query); // search shows by search input

    populateShows(shows); // populateShows using search result from searchShows()


    const showsList = document.querySelector('#shows-list');
    showsList.addEventListener('click', function(e) { // add event listener to shows-list "section"
        e.preventDefault();
        if (e.target.tagName === "BUTTON") { // delegate event listener to only action if a button is clicked (within shows-list "section")
            clickEpisodesBtn(e); // handle episodes button click specific to which button was clicked
        }
    });
});

async function clickEpisodesBtn(e) {
    e.preventDefault();

    const showId = e.target.parentElement.parentElement.dataset.showId; //retrieve showId from show in search result
    let episodes = await getEpisodes(showId);
    populateEpisodes(episodes); // populate episodes section of the show that was clicked

    $('#episodes-area').show(); // unhide episodes-area "section" that was hidden
}


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
    // TODO: get episodes from tvmaze
    //       you can get this by making GET request to
    //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

    const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`); // get request to API for episodes list, given the showId
    const episodes = res.data;
    return episodes; // return episodes list in an array
    // TODO: return array-of-episode-info, as described in docstring above
}

function populateEpisodes(episodes) {
    const $episodesList = $("#episodes-list");
    $episodesList.empty(); // clear out episodes-list "section", in case episodes from a different show were already populated

    for (let epi of episodes) {
        let $item = $( // create li element for each episode
            `<li><b>${epi.name}</b>, Season ${epi.season}, Episode ${epi.number}</li>
        `);

        $episodesList.append($item); // append each li to episodes-list "section", which is a ul element
    }
}