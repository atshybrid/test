import axios from "axios";

const baseURL = "http://epaper.dialereasy.in:8000";

function fetchData(url) {
    const instance = axios.create();
    // In the case of the url fetch link (E.g. next page data fetch link)
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return instance.get(url); // if the url already contains https:// or http://
    } else {
        // in the case of normal fetch with base URL
        instance.defaults.baseURL = baseURL;
        return instance.get(url);
    }
}

export default fetchData;