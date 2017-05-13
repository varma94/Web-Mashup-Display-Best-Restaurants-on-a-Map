# Web-Mashup-Display-Best-Restaurants-on-a-Map
The application will be displaying best restaurants depending on search term

API Used:
1) Google Maps
2) Yelp

The HTML page has three sections:
1) A search text area to put search terms with a button "Find".
2) A Google map of size 600*500 pixels, initially centered at (32.75, -97.13) with zoom level 16.
3) A text display area.

What does the project do ?

- When you write some search terms in the search text area, say "Buffet", it will find the 10 best restaurants in the map area that match the search terms. They may be less than 10 (including zero) sometimes. 
- The map will display the location of these restaurants as map overlay markers with labels from 1 to 10. 
- The text display area will display various information about these restaurants. 
- The list will be an ordered list from 1 to 10 that correspond to the best 10 matches. 
- Each list item in the display area will include the following information about the restaurant: 
  - The image "image_url", the "name" as a clickable "url" to the Yelp page of this restaurant
  - The image "rating_img_url" (1-5 stars), and the "snippet_text". 
  - When you search for new terms, it will clear the display area and all the map overlay markers, and will create new ones based on the new search.
