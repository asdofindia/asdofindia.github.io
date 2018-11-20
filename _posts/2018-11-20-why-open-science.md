---
title: Why Open Science
tags:
  - free-culture
  - science
  - research
---

##### A Classic Example of Why Open Science is the Best for Humankind #####

I have previously written about [my obsession with free knowledge](https://blog.learnlearn.in/2017/08/free-knowledge.html). All the code I produce are open source by default (unless my client wants it to be proprietary). Many people ask me why I stand for [radical openness](http://www.unhcr.org/innovation/radical-openness/).

The answer is: because it is the best way for humankind.

Take this example. While doing a brainstorming session for [One Health AMR](https://onehealthamr.in/), we came across a study titled "Precision identification of diverese blood stream pathogens in the gut microbiome". It was interesting because the study apparently found out that gut microbiome can be the source of pathogens for blood stream infections.

I was curious to know more about it. Now, this study is cutting edge and done very recently. It is highly possible it has not been published yet. Fortunately though, the author had [uploaded a copy to a pre-print archive](https://www.biorxiv.org/content/biorxiv/early/2018/05/02/310441.full.pdf). (+10 points for open access)

When going through it, I found that they had used a software called StrainSifter for tracking bacterial strains through metagenomes. For the uninitiated, metagenome is genomics of a given sample from an environment which might contain a lot of genes from different organisms. It is possible in these days of "next-generation sequencing" to know the entire genomic data of any sample. For example, if you take a sample of stool and do a run on it, you can see all the different organisms' genomic data. This is metagenomics.

The problem though is when you have the entire genome, sifting through it to find out the strains of organisms that you are interested in becomes difficult. This is not a simple pattern matching exercise because you do not know the exact genomic sequence that you are looking for (thanks to error-prone reproduction and evolution there is variations everywhere). Bioinformatics tools use reference data of strains and compare strains for similarity to solve this.

But StrainSifter, apparently, does direct matching of strains using the pattern of single nucleotide variations. This works without a reference database.

Now here is the most interesting part. StrainSifter is a pipeline of various different open-source tools. And the author has uploaded StrainSifter itself [on the internet](https://github.com/tamburinif/StrainSifter).

That reduces at least a couple of month's work for any future researcher who is working on similar problems. For example, if we try to look for resistance genes in humans and nearby animal/environment samples to see if perhaps humans got the resitance genes from animals, we can straightaway use StrainSifter to compare the two metagenomics data.

In programming, there is a concept - "Do not reinvent the wheel". It holds good for science as well. When a researcher does science they are moving forward. When a researcher does open science, they are moving the entire ecosystem forward.