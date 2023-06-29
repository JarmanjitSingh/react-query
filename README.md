#Project setup

i. npm i json-server and make db.json
ii. add script in pacakge.json "serve-json": "json-server --watch db.json --port 4000" and check this link in the browser http://localhost:4000/superheroes
iii. make components and routing then fetch data in superhero component by traditional way

#fetching data with useQuery
i. install react-query package then setup react-query in app comp. by destructuring QueryClient, QueryClientProvider and wrap app in it. now you are able to use hooks provided by react-query
ii. now in RQ comp. destructure useQuery hook. this hook needs atleast 2 arguments one is unique key and second is the function who will return a promise so we call a api in it and return and this will give us a isLoading and data object so we dont need to manage states separtely.

#Error Handling

1. destructre isError and error and then if(isError) then show error.message

#React Query Devtools

1. destructure ReactQueryDevtools in App comp and add it before closing tag of QueryClientProvider with prop initialIsOpen={false} this will prevent to open by default
   2.check in the browser

#Query cache

1. so react query provides caching out of the box by default the result cached for five minutes. to check this go to the browser in network throtlling to fast 3g then go the traditional link it will showing loading first no matter how many times you visit link but when you visit RQ link it will showing only first time loading then not. make sure to hard refresh before this.
2. if the data has been changed in the db then it will show first cached data then update the new data so the loading is not showing even the data changed this will be the great user experiencd to track this console.log({isLoading, isFetching})
3. the default time of cacheing of 5 min which is really good but if you want to change that time then pass the third argrument as object of the usequery hook and you can pass the multiple options for it so one of them is cacheTime: 5000 you can set time in miliseonds.
   note: the caching time calculate when you leave the page where data will be fetched.

#Stale Time

1. stale time is :- query makes again network request time so by default it is 0 second. but if we know that our data is not changeable as much fast from database then we can set the stale time to make a network request again. for example if we set the staleTime arguemnt in the useQuery hooks third argument and set the time is 30000 secs then if we go to home page and then visit the RQ page then it will not make the network request again and it will showing the cahced data.
2. stale time calucalte when first time fetched data
3. stale means: when status is stale i.e every time you visit page it makes new request after displaying cached data.

#Refetch defaults

1. react query provide some more default value:
   -- first is : refetchOnMount => by default it is true so when our component mounts then fetching data or network request makes every time when our component mount. so if we can set it false then it will not fetch data on every mount
   -- second is : refetchOnWindowFocus => by default it is true and it means when you tab looses focus and then in focus then it will fetching a data in background again even your refetchOnMount is false.

#Polling

1. Polling : is when you want to automatic refetch data on every fixed interval of time for example if data will change in every 2 seconds then it will refetching the data in every two seconds and updating the ui so for it we have a refetchInterval property if we set it 2000 then it will fetching data after every two seconds refetchInterval: 2000. by defaults it is false
2. But it will be on pause when window looses the focus so for it we have refetchIntervalInBackground if we set it true then it will refetching even window looses focus.

#useQuery on click (if you dont want to fetch data on component mount);

1. so first inform to usequery to dont fetch data on mount by adding enabled: false in the object
2. add a button and onclick it pass refetch desutructure it from the useQuery hook
3. if want to see loading onevery click of button then add if (loading || isFetching) return <h3>loading...</h3>

#Success and Error Callback

1. for that you can make two functions for success and for error and in the userQuery object you can pass onSuccess: successfunction, onError: ErrorFunction.

#Data Transformation
now we are fetching all data but showing only heroname so with the select property we can only recieve a array of hero names and then able to map only on it this is called data transformation

#Custom Query hook -- (if we want to use same query in multiple component then dont want to refetch same data again)

1. create a separate hooks folder > create a file for the query filename starts with use
2. cut and paste useQuery hook in the function and return it.
3. onError and onsuccess function passsed as an argument for different component and now we can use it multiple times.

#Query By Id

1. make a new component where you can show the single hero details <HeroDetailPage />.
2. In our hook comment code of select arguement because we need id in data.
3. In RQ comp. add Link tag to navigate to the dynamic route with the id.
4. create new query hook useHeroDetail and use it in the details comp.
   note-I => we can add arrow function in the hook to pass id to the fetch function.
   note-II => we pass and array ["super-heros", id] like this because with this query will cached the data with the reference of id and then if we again visit same id then it showing the cached data so i dont want to refetch the data or make to request to the server i will do this refetchOnMount: false, so it will showing only fetched or cached data.
   note-III => instead of arrow function for passing the id the the fetched function you can write only fetchSuperHero because rquery automatically passing the id to the fetcher function and you can receive the parameter in the function as {queryKey} the queryKey has the array we can passed to the useQuery hook so the id will be at the index of 1

   and in the fetcher function you can do this
   const fetchSuperHero = ({queryKey}) => {
   const id = queryKey[1]
   return axios.get(`http://localhost:4000/superheroes/${id}`);
   };

#Parallel Queries - (two queries in one component)
1. make new component for parallel queries
2. make a new array of freinds in the db
3. add two queries in the component so the question how to handle both datas and other properties so we can do that with aliases like data: freinds and data: superheros

#dynamic parallel queries 
(suppose you are selecting the multiple superheros from the table and want to fetch multiple superheros then use useQueries )
1. make a new component for dynamkc parallel queries
2. set the path of the component and the two fixed ids of component recieves in the app componentb and you can recieve this in dynamicParallel component
3. use useQueries hook first you can map on the ids then return object first key of object is query id and second is the function and this useQuery returns the queryResults so log it in console

#dependent Queries 
(suppose if want to fetch second query based on the first result)
1. add two more datas in db users and channels.
2. create dependent queries component which will recieve the hard coded email from app component as a prop
3. then fetching as previous and destructuring data as alias user and store it in the variable of channel id with condition if user ? then .data.channelId
4.after that we can write the second query but it will executed as when the component mounted so we can use the enabled property with double negation channel id it will convert the value to the boolean which is what the enabled property expects


#Initial query data -- useQueryClient

for eg. if i fetched a allPolicies data then we fetched a single policy data then we saw a loading text even we fetched all policies so with it we can initial show the data from all policies. this all about query we dont need to touch component.
1. import and call useQueryClient hook in the useSuperHerosData.js .
2. in the object of query we have a initialData property and this is a function and passed the key of exisiting data of super-heros in the getQueryData

#Paginated Queries
1. setup a colors array of object in the db.json
2. make a component PaginatedQueriesPage. make a query and hit the rq-paginated path now we need to do pagination .
3. we need to know that the json server is supporting the pagination out of the box.
 like http://localhost:4000/colors?_limit=2&_page=1
4. now we need to maintain a page state so using useState hook and passed to a query in array of key and number.
5. add previous and next buttons
6. your are noticing when user click on next then it shows loading text so for outcome from this we can pass in the useQuery the object of property keepPreviousData is true now when you click on the next button it will showing the same page data untill the data has been fetched.
7. if you want to showing loading below it then you can using the isFetching like below the buttons {isFetching && "loading"}

#Infinite Queries - useInfiniteQuery
1. setup a new page like the pagination page without prev, next button and useState,
2. import and use useInfiniteQuery hook instead of useQuery 
3. destructure pageParam in the fetch function and set its default value 1
4. in options the property getNextPageParam is a function which receives two parameters lastPage and pages. we dont need lastPage param so we write underscore in starting like _lastPage and write a some login in this function.
5. getNextPageParam function gives us a propery hasNextPage which will be true or false so we can destructure it
6. add a load more button which is disabled when !hasNextPage and onclick it we can call fetchNextPage we can destructure it
7. for showing fetching text we can destructure two more properties isFetching and isFetchingNextPage
8. hit this url rq-infinte you can see the error because useInfiniteQuery is gives us a data in different way so we can use data?pages and in map function instead of color we have group and index

#Mutations -- useMutation hook -- for create,update and delete data
1. some code setup in the RQsuperherospage. NOTE:- json server also support post requests and write db files
2. now go the the useSuperHerosData hook and import useMutation and make a new function for it. and pass it the function that make the post request.
3. now you can able to import and use it in the component. so it will return the many values but we can destructure mutate from it that will actually call the hook 
4. in the handleAddHeroClick make a variable and store the name and alterego in the object and the pass that variable in the mutate function.
5. Note :- if there is many mutations than u can use alias like mutate: addHero 
6. now go to the browser and this will add the data in the db. 
7. add the fetch button below it so the added data can desplayed after add.
8. note:- this also return the same values like useQuery hook of isLoading, isError, error etc

#Query Invalidation
in above we need to refetch manually when user added. but we want when mutation success then automatic refetch the super-heros key
1. in the useSuperHerosData query in the mutation function you can call the useQueryClient hook. that will holds the key
2. so the object as the second argument of the mutation hook we can onsuccess property that will be a function here we can use client hook . query  invalidation and pass it the key of query who we want to fetch



