---
title: You’ve Never Seen Fizz Buzz Like This!  
slug: creative-fizz-buzz-solutions-go                 
date: 2024-10-21T09:27:27+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [interview, algo, go]              
weight: 10
layout: custom-layout
---

Hope you’re all familiar with this problem, but if not, you can read this [article](https://wiki.c2.com/?FizzBuzzTest) for context and try it yourself on [LeetCode](https://leetcode.com/problems/fizz-buzz/) (it’s an easy-level problem).

Back in February, I created a repository called [fizz-buzz-world](https://github.com/novikov-ai/fizz-buzz-world), making it easy for others to contribute. I added a few of my own solutions, basic logic tests, and a well-organized README encouraging people to submit their own versions of this classic problem.

The goal was simple: gather creative, out-of-the-box Fizz Buzz solutions written in Go.

### Solving It Without Ifs

For example, here are a couple of my solutions that avoid using a single if:

~~~go
func (fb *FizzBuzzer) FizzBuzz() []string {
    result := make([]string, 0, fb.n)

    f := []string{"Fizz", "", ""}
    b := []string{"Buzz", "", "", "", ""}

    for i := 1; i < fb.n; i++ {
        t := f[i%3] + b[i%5]
        opts := []interface{}{i, t, t, t, t, t, t, t, t}
        printed := fmt.Sprintf("%v", opts[len(t)])

        result = append(result, printed)
    }

    return result
}
~~~

And here’s another one:

~~~go
func (fb *FizzBuzzer) FizzBuzz() []string {
    result := make([]string, fb.n)

    for i := 0; i < fb.n; i++ {
        result[i] = strconv.Itoa(i + 1)
    }

    for i := 2; i < fb.n; i += 3 {
        result[i] = "Fizz"
    }

    for i := 4; i < fb.n; i += 5 {
        result[i] = "Buzz"
    }

    for i := 14; i < fb.n; i += 15 {
        result[i] = "FizzBuzz"
    }

    return result
}
~~~

Obviously, during an interview, it’s better to stick to the [classic solution](https://github.com/novikov-ai/fizz-buzz-world/blob/main/implementations/classic/fizz_buzz.go), so you don’t confuse your interviewer (since they’ll have to check it).

### The Lucky Number

Last week, the fizz-buzz-world repo received a fascinating new solution.

Big thanks to the author: [pull request](https://github.com/novikov-ai/fizz-buzz-world/pull/4) was very well-crafted and documented. The proposed solution is incredibly non-obvious and really interesting. You can read more in his [README](https://github.com/novikov-ai/fizz-buzz-world/blob/main/implementations/lucky_number/README.md).

The core idea is based on a “lucky number” (not to be confused with the [number](https://en.wikipedia.org/wiki/Lucky_number) from number theory), which is calculated specifically for this task. In Go 1.23.2, the lucky number is: **176064004**

Knowing this, the solution looks like this:

~~~go
func (fb *FizzBuzzer) FizzBuzz() []string {
    result := make([]string, 0, fb.n)

    predefined := []string{"", "Fizz", "Buzz", "FizzBuzz"}
    var r *rand.Rand
    for i := 1; i < fb.n; i++ {
        if i%15 == 1 {
            r = rand.New(rand.NewSource(LUCKY))
        }
        index := r.Int63() % 4
        if index == 0 {
            result = append(result, strconv.Itoa(i))
        } else {
            result = append(result, predefined[index])
        }
    }

    return result
}
~~~

### Unpacking the Magic

To implement this, the first thing we need is the ability to create a random number generator.

This is where the concept of a [random seed](https://en.wikipedia.org/wiki/Random_seed) comes in—it’s a number that ensures a generator will always produce the same pseudo-random sequence.

In Go, we have the [rand.NewSource](https://pkg.go.dev/math/rand) function, which allows us to set the “seed”—in our case, this will be our “lucky number.”

The main challenge becomes finding that number. You can check the full implementation [here](https://github.com/novikov-ai/fizz-buzz-world/blob/main/implementations/lucky_number/cmd/calculate.go), but let’s walk through one function to get the core idea:

~~~go
func izLucky() bool { 
    yep := []int{0, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 0, 0, 3}
    for i := 0; i < 15; i++ {
        r := int(r.Int63() % 4)
        if yep[i] != r {
            return false
        }
    }
    return true
}
~~~

“yep” is an array that contains the correct indexes for the first 15 iterations. If you take the string from the list of possible answers: {””, Fizz, Buzz, FizzBuzz}, you’ll get the correct value at each step:

~~~go
// ["", "", "Fizz", "", "Buzz", "Fizz", "", "", "Fizz", "Buzz", "", "Fizz", "", "", "FizzBuzz"]
~~~

So, we need to find a number that will “randomly” generate the correct answer for the first 15 elements.

Once you’ve found the right number, all that’s left is to generate this sequence and then repeat it. By reinitializing the randomizer with the same seed every 15 iterations (“if i%15 == 1”), you’ll duplicate the sequence as many times as you need:

~~~go
func (fb *FizzBuzzer) FizzBuzz() []string {
    // ... 
    var r *rand.Rand
    for i := 1; i < fb.n; i++ {
        if i%15 == 1 {
            r = rand.New(rand.NewSource(176064004)) // <- lucky number
        }
        index := r.Int63() % 4
        // ... 
    }

    // ... 
}
~~~

This is an unusual approach to solving the problem. It might look like a bit of a hack, but it gets you the correct answer in a pretty clever way.

### Share Your Solution

Got more creative ideas for solving Fizz Buzz? Feel free to [contribute](https://github.com/novikov-ai/fizz-buzz-world?tab=readme-ov-file#how-to-contribute).

Don’t know Go but familiar with the original method in other languages? Create an issue, and we’ll translate your solution into Go! Let’s collect the craziest Fizz Buzz solutions together ;)

*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/308)*