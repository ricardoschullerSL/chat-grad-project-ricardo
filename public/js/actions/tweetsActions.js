
export function fetchTweets() {
    return {
        type: "FETCH_TWEETS_FULFILLED",
        payload: {
            tweets: ["Hello", "These", "are", "tweets"]
        }
    }
}
