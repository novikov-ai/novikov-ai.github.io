## About

[Here](https://novikov-ai.github.io/) my blog lives, explore it!

How to add new post:

~~~bash
export SLUG="simple-programming-illusion"
export YEAR="2024"
export MONTH="september"

hugo new posts/$YEAR/$MONTH/$SLUG.md --kind post_en &&
hugo new ../ru/posts/$YEAR/$MONTH/$SLUG.md --kind post_ru
~~~