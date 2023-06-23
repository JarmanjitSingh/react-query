#Project setup

i. npm i json-server and make db.json
ii. add script in pacakge.json "serve-json": "json-server --watch db.json --port 4000" and check this link in the browser http://localhost:4000/superheroes
iii. make components and routing then fetch data in superhero component by traditional way

#fetching data with useQuery

i. install react-query package then setup react-query in app comp. by destructuring QueryClient, QueryClientProvider and wrap app in it. now you are able to use hooks provided by react-query
ii. now in RQ comp. destructure useQuery hook. this hook needs atleast 2 arguments one is unique key and second is the function who will return a promise so we call a api in it and return and this will give us a isLoading and data object so we dont need to manage states separtely.

#Error Handling
1. destructre isError and error and then if(isError) then show error.message