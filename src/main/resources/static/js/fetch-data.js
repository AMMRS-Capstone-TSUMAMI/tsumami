
/**
 * Given an object containing all the required data for a given page, fetch all the needed data and return it as properties to pass to a view.
 * @param state
 * @param request
 * @returns {Promise<{}>}
 */
export default function fetchData(state, request) {
    const promises = [];
    //TODO: this needs to be moved to a prop file or env variable
    const baseUri = BACKEND_HOST_URL;

    console.log("got to fetch data");
    console.log(request);
    for (let pieceOfState of Object.keys(state)) {

        let endpointURL = state[pieceOfState];
        // only prepend baseUri to endpointURL IF it does not start with "http"
        if(endpointURL.substring(0, 4) !== "http") {
            endpointURL = baseUri + endpointURL;
        }

        console.log(endpointURL);
        promises.push(
            fetch(endpointURL, request)
                .then(function (res) {
                    return res.json();
                }));
    }
    return Promise.all(promises).then(propsData => {
        const props = {};
        Object.keys(state).forEach((key, index) => {
            props[key] = propsData[index];
        });
        return props;
    });
}