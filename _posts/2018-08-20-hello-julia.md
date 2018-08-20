---
layout: post
title: "Hello Julia!"
tags: ["code", "julia"]
---

##### Solving the eight queens chess puzzle as a hello world program in julia #####

As [Julia hit 1.0](https://julialang.org/blog/2018/08/one-point-zero) this month there has been an understandable excitement about the language with even my guide and mentor [Dr Anantha Kumar](https://www.researchgate.net/profile/Anantha_S_R) asking me if I will [switch to Julia from R/Python](https://qz.com/1360318/is-julia-a-good-alternative-to-r-and-python-for-programmers/). 

I then read about Julia and found many of its features really interesting (like `missing`, `end`, optional typing, and [others](https://docs.julialang.org/en/stable/))

As I reached [exercise 2.42 in SICP](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-15.html) today I decided to program in Julia for the first time.

## Hello, world! ##

Julia is available in the official repository of arch linux and others. (The version in arch is now 0.7 due to technical issues and has been flagged out of date). Once installed, the REPL can be invoked with `julia` command. It is useful for interactively running things.

`julia scriptname.jl` can run scripts just like python.

Now, I had to find solutions to the [eight queens puzzle](https://en.wikipedia.org/wiki/Eight_queens_puzzle). For those who don't know, the challenge is to keep 8 queens on the chess board such that nobody is in line of sight of anyone else.

The first thing I tried to get right was representing the board and queens in a 2D array.

### Array ###

I would need an 8x8 array with each cell representing whether that position on the chess board has a queen or not. Boolean seems to be the right type for this.

Of course we can manually create it

```julia
[
    false false false false false false false false;
    false false false false false false false false;
    false false false false false false false false;
    false false false false false false false false;
    false false false false false false false false;
    false false false false false false false false;
    false false false false false false false false;
    false false false false false false false false;
]
```

(Notice the space between each false and the `;` separating each array)

But the programmatic way to do it is much simple `falses(8,8)`. More such tricks at [construction of multidimensional arrays](https://docs.julialang.org/en/stable/manual/arrays/#Construction-and-Initialization-1)

Interestingly these two ways of creating arrays produce two different kinds of arrays. The first method produces an array of type `8×8 Array{Bool,2}` while the latter produces `8×8 BitArray{2}`. BitArray is stored in bits compared to Bool Array and therefore saves space. There are [other differences](https://stackoverflow.com/a/29628572) as well.

Now we can place queens by setting cells to true.

### Functions ###

To do anything useful, we have to start creating functions. In Julia, you create functions like thus:

```julia
function add(x, y)
    x + y
end
```

You can use `return` to specifically return value if you don't want the last expression to be returned.

Though I have indented code like python, the whitespace does not really matter thanks to `end` keyword. So you could write the add function like:

```julia
function add(x,y);x+y;end
```
and it would still work


### Printing ###
Now I wanted to be able to print the board nicely. So I created a function printboard.

```julia
function printboard(board)
    # to print board
end
```

For printing, we have three (actually more) commands that are useful:
* [println()](https://docs.julialang.org/en/stable/base/io-network/#Base.println) works like python's print. It will print all the arguments and then a newline.
* [print()](https://docs.julialang.org/en/stable/base/io-network/#Base.print) is same as `println` except it won't print a newline at the end
* [@printf()](https://docs.julialang.org/en/stable/stdlib/Printf/#Printf.@printf) is like C's printf and supports printing formatted string. (You will need to put `using Printf` at the top to use this (like `import` in python))

Example:
```julia
# All the following produce the same output
julia> print(1, '\n')
1

julia> println(1)
1

julia> using Printf; Printf.@printf('%d\n', 1)
1

```

### Looping ###
Both [`while` and `for` loops](https://docs.julialang.org/en/stable/manual/control-flow/#man-loops-1) are similar to their python counterparts except they end with `end` like most things in julia.

I used `for` for the printboard function

```julia
function printboard(board)
    print("===============\n")
    for row in 1:8
        for column in 1:8
            if board[row, column] == true
                print("X ")
            else
                print("- ")
            end
        end
        print("\n")
    end
    print("===============\n")
end
```

### Conditionals ###
If you saw the use of if in the previous block, good, else, see. Over.

Read more in the [official documentation](https://docs.julialang.org/en/stable/manual/control-flow/#man-conditional-evaluation-1)

### Short-circuit evaluations ###

[`&&` and `||`](https://docs.julialang.org/en/stable/manual/control-flow/#Short-Circuit-Evaluation-1) work just like you would expect them to. We will use `&&` for ensuring several criteria are met in the following part of the algorithm.

### Algorithm ###
What we have is computing power. But if we go full brute force and generate all the possible permutations of where 8 queens can be and which ones are right solutions, we would be making it very hard for the computer. Instead we can use a few properties of the chess board and queen piece to simplify this process.

**Each column can have only 1 queen**

This means that we can solve column by column wherein we put the first queen in any row of column 1, then move on to the second column where we place the queen in a row such that it doesn't affect the previous queen and then repeat this process. It paves way for an iterative solution.

First, though, we need to create a few functions which will check if a queen can safely be placed in a given cell. 

We need to check if the row we are going to place the queen in already has another queen.

```julia
function rowfree(board, cell)
    for i in 1:8
        if board[cell[1], i] == true
            return false
        end
    end
    return true
end
```

`function rowfree(board, cell)`

Although we haven't typed it, this function should be called with two parameters. The first is the state of the board (the 8x8 array), then the cell which we want to check for safely keeping another queen. I chose this cell to be passed in as a tuple, eg `(1,1)` is the top-left cell.


`for i in 1:8`

Let us iterate through values of i from 1 to 8

`if board[cell[1], i] == true`

We are checking only the row in which the cell is. And that is given by cell[1]. We need to check each column in that row to see if there is a queen there and this is accomplished by `i` which we are iterating from 1 to 8.

If we find another queen at any point we `return false` to signal the row isn't free. If at the end of checking 8 columns there is no queen anywhere we `return true`.

**Diagonals also need to be clear**

This is slightly more complicated. We need to check in four directions from any given cell. Top left, top right, bottom left, and bottom right.

(Note: Since we are going from left to right, it is enough that we check only top-left and bottom-left directions, but to enable people to place a queen anywhere as a starting point, we check all directions)

```julia
function diagonalsfree(board, cell)
    return (
        topleftfree(board, cell)
        && bottomleftfree(board, cell)
        && toprightfree(board, cell)
        && bottomrightfree(board, cell))
end
```

This is where we create a general function that can go in any direction based on the direction offset we decide.

```julia
function checkdiagonal(board, cell, offsetx, offsety)
    x = cell[1] + offsetx
    y = cell[2] + offsety
    while (0 < x && x < 9 && 0 < y && y < 9)
        if board[x, y] == true
            return false
        end
        x = x + offsetx
        y = y + offsety
    end
    return true
end
```

This function takes the board's state, the cell we are checking and the direction as parameter (indicated by offset in x axis and offset in y axis)

We are using the comparison operator `<`, also `&&` to make sure all criteria are met.

Then we define all the four function calls for all directions.

```julia
function topleftfree(board, cell)
    checkdiagonal(board, cell, -1, -1)
end

function bottomleftfree(board, cell)
    checkdiagonal(board, cell, 1, -1)
end

function toprightfree(board, cell)
    checkdiagonal(board, cell, -1, 1)
end

function bottomrightfree(board, cell)
    checkdiagonal(board, cell, 1, 1)
end
```

A cell is safe if row and diagonals are free
```julia
function cellsafe(board, cell)
    return (
        diagonalsfree(board, cell) 
        && rowfree(board, cell) 
        )
end
```

Julia [does not support `?` in function names](https://github.com/JuliaLang/julia/issues/22025).

Now our final iterative function to conclude the algorithm:

```julia
function findRestQueens!(board, column = 1)
    if column == 9
        global solutions
        solutions = solutions + 1
        println("Solution ", solutions)
        printboard(board)
        println()
        return true
    end
    if columnfree(board, column)
        for row in 1:8
            if(cellsafe(board, (row, column)))
                guessboard = copy(board)
                guessboard[row, column] = true
                findRestQueens!(guessboard, column + 1)
            end
        end
        return false
    else
        findRestQueens!(board, column + 1)
    end
end
```

Like in python we can give default value for argument. Here, we are assigning column to 1 unless explicitly stated so computer starts at the left-most column.

We are naming the function with a `!` because it is the [prescribed style](https://docs.julialang.org/en/stable/manual/style-guide/#Append-!-to-names-of-functions-that-modify-their-arguments-1) for functions that mutate their arguments.

As it is an iterative function, we need an exit condition. And if column is 9, we can exit as we have placed all the 8 queens. See the use of `global` keyword which will append to a global count of how many solutions we have discovered. Then we print the solution we have discovered.

The rest of the function is the iterative part which I hope is error-free (I have done enough trial and errors to get it to a state where it is producing all the 92 solutions).

An important line is `guessboard = copy(board)`. This is required because of this:

```julia
julia> a = [1, 1]
2-element Array{Int64,1}:
 1
 1

julia> b = a
2-element Array{Int64,1}:
 1
 1

julia> b[1] = 2
2

julia> b
2-element Array{Int64,1}:
 2
 1

julia> a
2-element Array{Int64,1}:
 2
 1
```

It is now possible to get our 92 solutions.

```julia
board = falses(8,8)
findRestQueens!(board)
```

We can place a few queens manually as well

```julia
board = falses(8,8)
board[3, 3] = true
findRestQueens!(board)
```

### Command line argumens ###
What if we need to allow placing queens from the command line?

The `ARGS` global constant becomes useful in that case. Command line parameters are passed as array of strings named ARGS. If we call our script as `julia queens.jl 1 2 3 4` the ARGS would be `String["1", "2", "3", "4"]`.

To parse numbers from this we will have to use the function `x -> parse(Int, x)`

(Note: This is another way of defining a function. As we don't name it, it is called an "anonymous function" also known as "lambda function")

We can map that function to the ARGS array like `map(x -> parse(Int, x), ARGS)`. This will create another array with parse applied to each element.

Putting all of it together, we have

```julia
arguments = map(x -> parse(Int, x), ARGS)
arglength = length(arguments)
cells = floor(Int, arglength / 2)
if arglength > 0
    if arglength % 2 == 0
        for i in 1:cells
            cell = (arguments[i * 2 - 1], arguments[i * 2])
            if(cellsafe(board, cell))
                board[cell[1], cell[2]] = true
                println("Set a starting queen at: ", cell)
            else
                println("Invalid starting position. Can't set queen at ", cell)
                board[cell[1], cell[2]] = true
                printboard(board)
                println()
                exit()
            end
        end
        println("Starting position is:")
        println("=====================")
        printboard(board)
        println()
    else
        print("You need to enter cells that are checked as args. Eg: `julia queens.jl 1 1 3 4` if the top left cell and the cell two rows below and 3 rows to the right of it is taken already")
        exit()
    end
end
```

We have added a few conditions and operations to ensure there are the right number of arguments, check if those positions are valid, place queens in those positions, and find corresponding solutions.

The `exit()` function allows aborting the script halfway through.

We did not use our global variable solutions. Let us use it

```julia
if solutions > 0
    if solutions == 1
        printstyled("Found the only solution", color=:cyan)
    else
        printstyled("Found ", solutions, " solutions", color=:green)
    end
else
    printstyled("Unfortunately no solutions exist for this starting combination", color=:red)
end
```

The `printstyled` function allows printing colourful output to terminal. But this works only with `--color=yes` flag on while invoking julia. We can alias julia to that `alias julia='julia --color=yes'` to avoid repeating color flag.

<script src="https://asciinema.org/a/197172.js" id="asciicast-197172" data-loop="1" data-t="3" data-autoplay="1" async></script>

## Conclusion ##
I have put the code in a repo in [julia subgroup of learnlearnin group on gitlab](https://gitlab.com/learnlearnin/julia/8-queens). (Did you know gitlab allowed subgroups of subgroups upto 20 levels deep!?). Feel free to hack around.

This was written in Julia 0.6 and then modified for 0.7, while reading manual for version 1.0. Please [let me know if](../about/#contact) there are any errors.

Julia is quite interesting. It has quite a few [packages for data science](https://ucidatascienceinitiative.github.io/IntroToJulia/#Packages-to-Explore) and others. Arrays start at 1 even. Take a look.