# A sample repo to explain Aspnet Core concurrent requests

This repository contains a simple ASP.NET Core application that demonstrates the practical impact of using synchronous vs. asynchronous methods in web development.


## Overview
When developing web applications with ASP.NET Core, you often encounter both synchronous and asynchronous versions of the same method, as well as the `await` keyword and `.Result`. In this example we will explore the real-world impact of using these different approaches.

When an ASP.NET Core process starts, it spawns a variable number of threads to handle incoming HTTP requests. Typically, each thread is dedicated to a single request and remains busy until it finishes processing. However, some calls, like those involving external resources such as databases, file systems, or APIs, can be time-consuming.

Synchronous calls are those in which the thread handling the request waits until the operation is complete. This means that each synchronous request keeps a thread busy for the entire duration of its execution, preventing it from handling other requests in the meantime.

On the other hand, using asynchronous counterparts allows the thread to be free to perform other tasks and return to handle the request when external resource operations are completed.

## The experiment
To demonstrate the impact of using synchronous vs. asynchronous methods, we will use a simple ASP.NET Core application configured to have only 2 threads. The application exposes two "slow" endpoints that respond after waiting for 2 seconds, one using a synchronous approach and the other using an asynchronous approach.

The experiment involves calling the slow endpoint in an attempt to saturate the available threads while simultaneously calling a fast endpoint to measure its performance. We then compare the measurements between the synchronous and asynchronous scenarios.


## Getting Started
To run this project, you'll need to have .NET Core installed on your system and k6 load testing tool.

1. Clone this repository to your local machine.

1. Open a terminal or command prompt and navigate to the project's root directory.

1. Start the ASP.NET Core application with the command `dotnet run`

1. Start the load test with `k6 run load-test.js`

## Results

The relevant rows in the k6 output are pasted below

     counter_short_while_async......: 234633 3609.183591/s
     counter_short_while_sync.......: 14     0.215352/s
     duration_long_async............: avg=2000.572133 min=2000.106 med=2000.298  max=2002.974 p(90)=2001.0472 p(95)=2002.1006
     duration_long_sync.............: avg=2216.385821 min=2000.77  med=2001.0635 max=3001.164 p(90)=2853.9955 p(95)=2950.27365
     duration_short_while_async.....: avg=0.092862    min=0.058    med=0.083     max=9.642    p(90)=0.124     p(95)=0.147
     duration_short_while_sync......: avg=2216.385857 min=852.12   med=2000.957  max=4157.027 p(90)=2852.798  p(95)=3405.7115

## Conclusion
As observed from the benchmark results, asynchronous programming provides significant performance and scalability benefits compared to synchronous programming. It allows your application to handle a larger number of requests concurrently, making it the preferred approach for web development tasks that involve external resources.

By choosing the asynchronous approach, you enable your application to efficiently utilize its resources and ensure better responsiveness to users' requests.

Now you understand not only the advantages but also the reasons behind using asynchronous programming in your ASP.NET Core applications. Happy coding!




