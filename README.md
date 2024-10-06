## About

[Here](https://novikov-ai.github.io/) my blog lives, explore it!

How to add a new post:

~~~bash
export SLUG="why-brain-avoids-complex-tasks-how-to-get-it-to-work"
export YEAR="2024"
export MONTH="october"

hugo new posts/$YEAR/$MONTH/$SLUG.md --kind post_en &&
hugo new ../ru/posts/$YEAR/$MONTH/$SLUG.md --kind post_ru
~~~