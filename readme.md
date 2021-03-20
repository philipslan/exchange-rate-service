# Exchange Rate Service

Please implement REST & GraphQL endpoints for the service providing currency rates. 

The service should return the rate between pairs, you can use https://fixer.io/ as an oracle. 

The service should implement caching in order to avoid constant requests to the oracle, the cache should be updated every 1 hour in the background. 
The following currencies should always be in cache and updated on a regular basis(1 hour)
1) USD-SGD, SGD-USD
2) USDK-HKD, HKD-USD

Other pairs could be updated upon accepting requests. 

Preferable stack:
1) NodeJS, Typescript, Scala

Please be creative and show the best practices that you use in your daily practice.

The assiment will be evaluated based on:
1) Code quality
2) Test coverage
3) Following good practices 
4) Extensibility
