# NEWS AGGREGATOR APP

## Its for Innoscripta Company FrontEndDev Position Remote Job offer assessment process.

### Important Notes:

from the provided list of 7 APIs, only "NewsAPI" and "The Guardian" resources were available and the rest of the list are not correct!
some options like "BBC NEWS API" or "CredNews" do not exist at all! and some others like "OpenNews" only have enterprise and paid subscriptions.

I first searched and investigated myself and when realized that apparently there are no serices (at least suitable for a FREE NEWS AGGREGATOR app) from bbc, newscred and opennews; i asked it from Chatgpt-v4 to make sure that its right...

#### About NewsCred:

-Me: is there any news api named like: newscred or news cred?
-ChatGPT: Yes, there is an API known as NewsCred, which is a part of a larger platform called Welcome Software (formerly known as NewsCred). NewsCred started as a content marketing and licensing platform that aggregated content from various publishers for use in marketing and corporate communications. Over time, it has evolved to offer a broader range of content marketing services and software solutions.

Welcome Software, including what was previously part of NewsCred, provides tools that help companies manage marketing campaigns, workflows, and content distribution. If you're interested in using NewsCred for accessing news or content as part of a broader marketing strategy, you might explore the features offered by Welcome Software.

Their platform might still provide access to a wide range of licensed content, useful for businesses seeking to enhance their content marketing efforts. However, if your primary interest is in directly fetching news articles for a news aggregator, you might be better served by other dedicated news APIs that focus specifically on news aggregation and distribution.

-Me: is it suitable for development use?
-ChatGPT: Welcome Software (formerly NewsCred) is primarily designed for content marketing and enterprise-level marketing operations, rather than for typical development use like building a news aggregator. Its features focus more on marketing campaign management, content curation, workflow automation, and analytics rather than simply providing news feeds.

#### About BBC:

-Me: does bbc news has an api?
-ChatGPT: BBC News itself does not provide a public API that gives direct access to its news content. While BBC once offered some RSS feeds and other data services, these have mostly been restricted or integrated into their internal platforms, and they don't provide a full-fledged API for developers to access news articles programmatically.

#### About OpenNews:

-Me: is opennews api suitable for using as a source for a free small news aggragator app?
-ChatGPT: Yes, the OpenNews API could be suitable for use in a small, free news aggregator app. It is freely available with no limit on usage, gathers data from various articles using a scraping tool, and is built on Laravel 8. This makes it potentially useful for developers looking for an unrestricted source of news data for aggregation purposes. However, ensure its data sources and scraping methods align with your legal and ethical requirements for content usage.

-Me: i dont want to install anything in my machine. i want to use the api only as a rest api endpoint to send http request and give the answer. is it possible with opne news?
-ChatGPT: The OpenNews API is designed for deployment on your local environment, and it doesn't provide a hosted REST API endpoint directly accessible over the internet. To use it as a REST API without installing it on your machine, you would need access to a deployed version of it online. However, the documentation does not indicate any publicly available hosted endpoint. You may need to deploy it to a cloud service yourself or find a similar API that is already hosted and available for public use.

==========================================================================

#### Other Considerations:

And from the API list provided to me, no 7 is repetitive! no 7 is NewsAPI.org that was counted as the first option in no 1.

so with these considerations, only the options: "NewsAPI" and "The guardian" and "The NewYork Times" remain. I used the two first ones in the
app but for NYTimes, as you can see yourself in its docs, there is a legacy and inconsistent API for NYTimes but it really cant be used as a resource for a dynamic code. the endpoint for the sections or categories are totally different from each other and from the base endpoint.
i implemented a dynamic structure and logic for simply adding the new standard Rest API resources to the app by adding it to a config file but it
requires a standard REST API with standard endpoints and all other parameters as query params at the end of base endpoint, not different endpoints for (as example) categories of news... so the NYTimes API also cant be used in my news app and only 2 options (NewsAPI & the Guardian) could be used.

other considerations is that none of these two used APIs has the ability to filter for authors. in fact they even dont has any endpoint or parameter for getting the list of authors so FILTERING BY AUTHORS that was requested in the Challenge IS NOT POSSIBLE!

NewsAPI has a static list of categories and the Guardian has a specific endpoint for getting categories dynamically. so i implemented a dynamic way of loading categories based on config file. so maybe the categories are static and specified in the config file or maybe have an endpoint for getting from an API. i implemented both these scenarios.

also NewsAPI has two endpoints: everything & top-headlines. between these two, one has the parameter for querying category (top-headlines) and doesnt have the query for filtering by date and another one is wise versa! so i implemented filtering by date selectable based on the config file and there i specified whether the source has ability to filter by date or not and based on that, i rendered inputs for date or not.

and at last i used redux persist for persisting the user specified filters and theme mode between page reloads. the better way for this is by saving the user preferences into the project backend but there was no backend in this project so i used redux persist to save them temporarily inside browser local storage.
