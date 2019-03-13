---
layout: post
title: "Spreadhseet pro-tip: Using countifs over multiple columns"
tags:
  - how-to
  - data-science
---

##### Countifs is a extremely versatile formula that can be used in Google Sheets to generate frequency tables and proportions of complex interrelated data. This is a short introduction to the formula and the autofill properties that are required to make it work magic #####

Spreadsheet applications like Microsoft Excel and Google Sheets have incredible features that are not obvious to everyone. Even seasoned users sometimes get stumped when a new kind of data creates a new class of problem.

Here is one such problem that I came across yesterday when trying to create antibiograms from the data of antibiotic susceptibility from an EMR. Google Sheets was used to solve this challenge.

The tables below have been simplified for the sake of clarity.

Here is the initial table:

---

**Antibiotic susceptibility pattern**

|       | **A**      | **B**       | **C**      |
|-------|:----------:|:-----------:|:----------:|
| **1** | Organism   | Ciproflox   | Ampicillin |
| **2** | Staph      | Resistant   | Resistant  |
| **3** | Staph      | Sensitive   | Resistant  |
| **4** | Staph      | Sensitive   | Sensitive  |
| **5** | E. coli    | Resistant   | Resistant  |
| **6** | E. coli    | Resistant   | Resistant  |

---

The challenge was to go from the above to a table like this:

---

**Resistance pattern** (Numbers are in percentages)

|       | **A**      | **B**       | **C**      |
|-------|:----------:|:-----------:|:----------:|
| **11** | Organism   | Ciproflox  | Ampicillin |
| **12** | Staph      | 33.3       | 66.6       |
| **13** | E. coli    | 100        | 100        |

---

This requires some formula magic to avoid repitition of text.

The spell is named `COUNTIFS`. We should start with a table like this:

|       | **A**      | **B**       | **C**      |
|-------|:----------:|:-----------:|:----------:|
| **11** | Organism   | Ciproflox  | Ampicillin |
| **12** | Staph      |            |            |
| **13** | E. coli    |            |            |

In cell `B12` then what we need to write is

```
=COUNTIFS(B$1:B$6, "Resistant", $A$1:$A$6, "="&$A12)/COUNTIF($A$1:$A$6, "="&$A12)*100
```

This can then be dragged down and then right to cells `B13`, `C12`, `C13` and the formula automatically updates to the correct value.

### Explanation ###

[`COUNTIFS`](https://support.google.com/docs/answer/3256550?hl=en-GB) is an excellent formula which does count whatever we ask it to count based on the value in other columns. Read [Google's guide](https://support.google.com/docs/answer/3256550?hl=en-GB) on what the formula exactly does.

Autofill is magic. It automatically changes the formula when we drag (or paste) formula in a new cell based on the offset. But when we want formula to refer to specific cells without changing when autofilling, we need to use the `$` sign. For example, the `B$1:B$6` when being dragged right will become `C$1:C$6`, but when it is dragged down it remains `B$1:B$6`.

`$A$1:$A$6` will remain `$A$1:$A$6` no matter which direction it is dragged.

Another interesting trick I used is the `"="&$A12`. Here the `&` tells Google Sheets to use the value from the cell that is being referenced next. The `=` is the criteria for `COUNTIF`. So, in short it translates to `"=Staph"`.

Any questions?
