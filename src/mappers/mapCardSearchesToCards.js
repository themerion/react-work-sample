export function mapCardSearchesToCards(searches) {
    // Making the assumption that backend will send in the same order all the time.
    return searches.map(x => ({
        imageUri: getImageUri(x.image?.uri),
        title: x.name,
        categories: x.categories.map(cat => cat.name),

        experts: x.experts.map(expert => ({
            name: expert.firstName + " " + expert.lastName,
            title: expert.title,
            company: expert.company
        }))
    }));
}

function getImageUri(uri) {
    const url = new URL(uri); 
    url.pathname = "resize/250x" + url.pathname;
    return url.toString();
}