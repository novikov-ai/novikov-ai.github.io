---
title: Такой Fizz Buzz вы точно не видели! 
slug: creative-fizz-buzz-solutions-go                 
date: 2024-10-21T09:27:27+03:00
draft: false                                 
params:
  author: Александр Новиков                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [interview, algo, go]         
weight: 10
layout: custom-layout                                   
---

Надеюсь, все знакомы с этой задачей, но если нет, то можно прочитать [статью](https://habr.com/ru/articles/298134/) для контекста и попробовать себя на [литкоде](https://leetcode.com/problems/fizz-buzz/) (задача уровня easy). 

В феврале этого года я создал репозиторий [fizz-buzz-world](https://github.com/novikov-ai/fizz-buzz-world), который оформил так, чтобы в него можно было легко контрибьютить: написал несколько своих решений, добавил простых тестов на логику и организовал понятный ридми-файл с призывом добавлять свои реализации классической задачи. 

Цель была простая - собирать нетривиальные решения Fizz Buzz на Go. 

### Решаем без ифов

Например, вот несколько моих решений без единого if'а: 

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

А вот еще одно: 

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

Очевидно, что на собеседовании лучше обойтись [классическим вариантом](https://github.com/novikov-ai/fizz-buzz-world/blob/main/implementations/classic/fizz_buzz.go), чтобы не пугать интервьюера (ведь ему это еще проверять). 

### Счастливое число

На прошлой неделе репозиторий fizz-buzz-world обогатился новым решением. 

Хочу выразить признательность автору: [пул-реквест](https://github.com/novikov-ai/fizz-buzz-world/pull/4) был отлично оформлен и задокументирован, а предлагаемое решение крайне неочевидное и очень интересное. Подробнее читайте в [ридми](https://github.com/novikov-ai/fizz-buzz-world/blob/main/implementations/lucky_number/README.md) от него. 

В основе реализации лежит "счастливое число" (не путать с [числом](https://en.wikipedia.org/wiki/Lucky_number) из теории чисел), которое подсчитано для данной задачи, и в Go версии 1.23.2 оно равно: **176064004**

Зная его, решение выглядит следующим образом: 

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

### Раскрываем магию

Чтобы реализовать подобное решение, в первую очередь, нам важно иметь возможность создавать генератор псевдослучайных чисел. 

На помощь приходит [random seed](https://en.wikipedia.org/wiki/Random_seed), который обозначает число, на основании которого генератор всегда производит одну и ту же пвсевдослучайную последовательность.

В Go есть функция [rand.NewSource](https://pkg.go.dev/math/rand). С ней мы можем задать нужный нам "seed". Это и будет нашим "счастливым числом".

Основной задачей становится поиск такого числа. Полная реализация доступна [здесь](https://github.com/novikov-ai/fizz-buzz-world/blob/main/implementations/lucky_number/cmd/calculate.go), мы лишь рассмотрим одну функцию, из которой станет понятна идея дальнейшего решения:

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

"yep" - массив, который содержит правильные индексы ответов первых 15 итераций. Если по указанному индексу выбрать строку из массива возможных вариантов: {"", Fizz, Buzz, FizzBuzz}, то мы получим корректное значение на выбранном шаге, а именно:

~~~go
// ["", "", "Fizz", "", "Buzz", "Fizz", "", "", "Fizz", "Buzz", "", "Fizz", "", "", "FizzBuzz"]
~~~

То есть нам нужно подобрать такое число, при котором на каждой итерации для первых 15 элементов мы "случайно" будем получать правильный ответ, а вернее индекс, по которому сможет найти ответ.

Когда нужное число подобрано, то нам остается лишь записать ответ для этих итераций, а затем повторно сгенерировать "произвольную" последовательность, которая фактически ее продублирует, а мы повторим данную историю еще столько раз, сколько нам потребуется. 

Реинициализируем рандомайзер с заданным сидом каждые 15 итераций (внимание на "if i%15 == 1"):

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

Такой вот интересный подход к решению задачи. Конечно, выглядит как некий хак, но правильный ответ мы получаем, хоть и нетривиально. 

### Поделитесь своим решением

Если у вас есть интересные идеи как еще можно решить Fizz Buzz, то предлагаю [контрибьютить](https://github.com/novikov-ai/fizz-buzz-world?tab=readme-ov-file#how-to-contribute). 

Пишите на других языках, но знаете оригинальный метод решения? Создавайте issue - будем переводить ваше решение на Go и собирать самые безумные решения этой задачи вместе ;) 

*Читайте оригинальный пост и присоединяйтесь к обсуждению в Телеграм: [@time2code](https://t.me/time2code/308)*