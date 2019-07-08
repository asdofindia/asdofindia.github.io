---
layout: post
title: "Collaborative data exploration (in R)"
date: 2019-07-05 17:49 +0530
tags:
  - code
  - data-science
  - freedom
  - science
  - research
---

##### You have collected a lot of data (whatever be your field). You have done your own exploratory analyses on this and perhaps even published a few papers. What next? #####

There is unquestionable value in collaboration. But collaboration is not easy to do. It requires multiple things to work seamlessly together. Collaboration in the field of software development is currently enabled by the following:

* open sourcing of code - allowing anyone to get a copy of the work that needs to be collaboratively improved
* git - a version control system that allows easy management of different versions of work
* easily reproducible development ecosystem - the hardware, the software, everything is easily available
* online tools that allow communication - github, gitlab, with tracking of issues, merge requests, etc.

**How would this look like in the field of data exploration?**

Explorative data analysis is much like software development, with two major additions. Those are

* The input - that is the data
* The output - insights gained from the data

In contrast with the software development where the input and output does not affect collaboration at all, in exploratory data analysis, these become critical elements of collaboration.

**So, how do we do collaboration with data projects?**

## Data ##

Making data available for collaborators is critical. How to do this?

### Raw download ###

After cleaning, anonymizing, etc. data can be made available for download in a suitable format (like csv or json). This can go on a website of the research team and/or many open data repositories that have been built for the purpose.

### API ###

If the data can have use in multiple programmable environments (for example, drug-drug interactions that could be used in a electronic medical record software; or population data of each district in a country that could be used to build a general knowledge app), there maybe value in providing an API out of the data. This will depend a lot on the structure and size of the data. It also requires setting up a server and programming the backend, then maintaining the backend.

## Code ##

Analyzing data is fun, but there is sometimes lot of code that can be reused in various kinds of analysis. Your collaborator may have found an interesting variation of an analysis you have done and may want to quickly test out the variation. Access to the code that powers various analyses significantly improves the speed of such quick testing. How to share code, though?

### Code sharing platforms ###

Using code sharing platforms like github or gitlab is an obvious way, but may create unnecessary barriers for scripts used in data analysis as most often individual snippets work independent of each other and can be shared standalone (as described below).

### Gists that go along with output/visualizations ###

Any kind of analysis that is done can be displayed along with the source code such that people can directly access the source code. [Literate programming](https://remi-daigle.github.io/2017-CHONe-Data/Rmarkdown.nb.html) is a fun addition to this kind of work. The essential point here is that since collaboration is taking place on analysis and not necessarily on the entire dataset, each analysis can stand alone as an independent collaborative project. The way this would work in practical terms is perhaps the researcher setting up a website with all the various visualizations/outputs and corresponding code with some kind of feedback mechanism to improve the analysis. (More on feedback in the next section)

## Feedback (Accepting contributions) ##

Github, gitlab, etc shines in this department. People can directly implement the change they want to see on the website and ask you to incorporate that change. Incorporation of that change also would be very easily done through web interfaces.

But, sometimes, feedback can even be taken through comments/emails/any other form of reaching out to the original author.

## Output ##

We have sort of covered what to do with the output of analyses in the previous sections. Output has to go on a website. It will have to accompany the code that generated that output. There should be an easy way for an outsider to contribute to improving that analysis (reachable from the website itself).

## Tools ##

Is there a way to do all/most of these easily?

Well, one obvious way if you are using R for analysis is **[Shiny](https://shiny.rstudio.com/)**. Shiny can create interactive applications that run on the web.

**[Dash](https://dash.plot.ly/)** is an option if you are working in python. [Bokeh](https://bokeh.pydata.org/en/latest/) seems to be another option.

## Conclusion ##

All the above is from purely the perspective of collaborating on exploratory data analyses. There are many more things that can be done with available data (like policy interventions). This, therefore, is not an exhaustive analysis of the situation.
