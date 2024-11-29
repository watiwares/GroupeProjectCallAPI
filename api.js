export async function fetchPosts(){

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`Network response is NOT ok! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data fetched successfully:',data);
        return data;
        

} catch (error) {
    console.error('Error fetching data', error);
    throw  Error
}
}